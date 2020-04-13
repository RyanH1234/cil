const express = require('express');
const router = express.Router();

const admin = require('firebase-admin');

// add new client
// {
//   "name" : <name>
// }
router.post('/new_client', function (req, res) {
  const newClient = req.body;

  const db = admin.database();
  const clients = db.ref("clients");

  clients
    .push(newClient)
    .then((snapshot) => {
      res.send(snapshot.key);
    })
    .catch((err) => {
      res.send("Err, new client could not be set");
    });
});

// update client name
// {
// 	"name": <client-name>
// }
router.post('/update_client_name/:uid', function (req, res) {
  const updatedClient = req.body;

  const clientID = req.params.uid;

  const db = admin.database();
  const client = db.ref("clients").child(clientID);

  client
    .update(updatedClient)
    .then(() => {
      res.send("Client name successfully updated");
    })
    .catch((err)=> {
      res.send("Err, could not update client name");
    })
});

// get all clients
router.get('/get_all_clients', function (req, res) {
  const db = admin.database();
  const clients = db.ref("clients");

  clients
    .once("value", (snapshot) => {
      const exists = (snapshot.val() !== null);

      if (exists) {
        const clients = snapshot.val();
        res.json(clients);
      } else {
        res.json({});
      }

    })
    .catch((err) => {
      res.send("Could not get all clients");
    });
});

module.exports = router;