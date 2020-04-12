const express = require('express');
const bodyParser = require('body-parser');

const clients = require('./clients');
const timeline = require('./timeline');

const app = express();
const port = process.env.PORT || 8080;

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mn-cli.firebaseio.com"
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/clients', clients);
app.use('/timeline', timeline);

app.listen(port);
