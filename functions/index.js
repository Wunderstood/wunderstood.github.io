const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.signInWithEmail = functions.https.onRequest(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the email and password if necessary
    // ...

    // Sign in with email and password using Firebase Authentication
    const userRecord = await admin.auth().signInWithEmailAndPassword(email, password);

    return res.status(200).json({ uid: userRecord.uid });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
