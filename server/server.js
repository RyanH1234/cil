const express = require('express');
const bodyParser = require('body-parser');

const clients = require('./clients');
const timeline = require('./timeline');

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

const admin = require("firebase-admin");

let serviceAccount = process.env.SERVICE_ACCOUNT_KEY;
serviceAccount = JSON.parse(serviceAccount);

console.dir(process.env.SERVICE_ACCOUNT_KEY);
console.dir(serviceAccount);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mn-cli-cc154.firebaseio.com"
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/clients', clients);
app.use('/timeline', timeline);

var path = require('path');

const staticMiddleware = express.static('./dist');
app.use(staticMiddleware);

app.get(/.*/, function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port);
