const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK (no need for credentials)
admin.initializeApp();

// Reference to the Firestore collection
const usersCollection = admin.firestore().collection("users");

exports.fetchUserFieldsById = functions.https.onRequest(async (req, res) => {
  try {
    const userId = req.query.userId; //

    const userDoc = await usersCollection.doc(userId).get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      const userFields = {};

      if (Object.prototype.hasOwnProperty.call(userData, "name")) {
        userFields.name = userData.name;
      }

      if (Object.prototype.hasOwnProperty.call(userData, "email")) {
        userFields.email = userData.email;
      }

      if (Object.prototype.hasOwnProperty.call(userData, "join")) {
        userFields.join = userData.join;
      }

      res.status(200).json(userFields);
    } else {
      res.status(404).json({error: "User document not found."});
    }
  } catch (error) {
    console.error("Error finding user by ID:", error);
    res.status(500).json({error: "Internal server error."});
  }
});
