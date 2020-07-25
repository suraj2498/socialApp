const admin = require('firebase-admin');
const serviceAcct = require ('../service-acct/socialapp-e5130-firebase-adminsdk-uo6p6-5495e18b97.json');

admin.initializeApp({
    // credential: admin.credential.applicationDefault(),
    credential: admin.credential.cert(serviceAcct),
    storageBucket: "socialapp-e5130.appspot.com",
    databaseURL: "https://socialapp-e5130.firebaseio.com"
});

const db = admin.firestore();

module.exports = { db, admin }