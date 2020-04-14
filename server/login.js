const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

const firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "mn-cli.firebaseapp.com",
  databaseURL: "https://mn-cli.firebaseio.com",
  projectId: "mn-cli",
  storageBucket: "mn-cli.appspot.com",
  messagingSenderId: "747749105011",
  appId: "1:747749105011:web:ea47a4f6b96c03370fb906",
  measurementId: "G-SSEZ6Z8X38"
};

firebase.initializeApp(firebaseConfig);

router.post('/', function (req, res) {
  const body = req.body;

  const email = body.email;
  const password = body.password;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((payload) => {
      res.send(payload);
    })
    .catch((err) => { 
      res.send("Err, could not sign user in");
    })
});

module.exports = router;
