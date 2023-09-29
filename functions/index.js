const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK (no need for credentials)
admin.initializeApp();

// Reference to the Firestore collection
const usersCollection = admin.firestore().collection("users");

// Firebase Cloud Function to find the "name" field value by document ID
exports.fetchUserNameById = functions.https.onRequest(async (req, res) => {
  try {
    const userId = req.query.userId; //

    const userDoc = await usersCollection.doc(userId).get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      if (Object.prototype.hasOwnProperty.call(userData, "name")) {
        const userName = userData.name;
        res.status(200).json({userName});
      } else {
        res.status(400).json({error: "User document"+
        "does not contain a \"name\" field."});
      }
    } else {
      res.status(404).json({error: "User document not found."});
    }
  } catch (error) {
    console.error("Error finding user by ID:", error);
    res.status(500).json({error: "Internal server error."});
  }
});

