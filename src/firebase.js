const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('../social-backend-22b0f-firebase-adminsdk-11lvo-a4f5494abe.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

exports.db = db;
