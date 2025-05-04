const admin = require('firebase-admin');

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // Parse service account JSON from environment variable
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // Load from local file (for local development)
  serviceAccount = require('./firebaseServiceAccount.json');
}

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
