const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const db = require("../firebase");

const router = express.Router();

// Get User Cart
router.get("/", authMiddleware, async (req, res) => {
    try {
        const cartDoc = await db.collection("carts").doc(req.user.id).get();
        if (!cartDoc.exists) return res.json({ items: [] });
        res.json(cartDoc.data());
    } catch (err) {
        res.status(500).json({ message: "Error fetching cart", error: err.message });
    }
});

// Add to Cart
router.post("/add", authMiddleware, async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const cartRef = db.collection("carts").doc(req.user.id);
        const cartDoc = await cartRef.get();
        let items = [];
        if (cartDoc.exists) {
            items = cartDoc.data().items || [];
        }
        const existingItem = items.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            items.push({ productId, quantity });
        }
        await cartRef.set({ userId: req.user.id, items }, { merge: true });
        res.json({ userId: req.user.id, items });
    } catch (err) {
        res.status(500).json({ message: "Error adding to cart", error: err.message });
    }
});

// Remove from Cart
router.post("/remove", authMiddleware, async (req, res) => {
    const { productId } = req.body;
    try {
        const cartRef = db.collection("carts").doc(req.user.id);
        const cartDoc = await cartRef.get();
        if (!cartDoc.exists) return res.status(404).json({ message: "Cart not found" });
        let items = cartDoc.data().items || [];
        items = items.filter(item => item.productId !== productId);
        await cartRef.set({ userId: req.user.id, items }, { merge: true });
        res.json({ userId: req.user.id, items });
    } catch (err) {
        res.status(500).json({ message: "Error removing from cart", error: err.message });
    }
});

module.exports = router;
