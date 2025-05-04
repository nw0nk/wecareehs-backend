const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccount.json');

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  console.error('Firebase admin initialization error:', error);
  process.exit(1);
}

const db = admin.firestore();
module.exports = db;
