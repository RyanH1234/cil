const express = require('express');
const router = express.Router();

const admin = require('firebase-admin');

// add timelineCard
// {
// 	"title" : <title>,
// 	"description" : <description>
// }
router.post('/:uid/add_card', function (req, res) {
  const clientID = req.params.uid;
  const newCard = req.body;

  const db = admin.database();
  const client = db.ref("clients").child(clientID);
  const timelineCards = client.child("timelineCards");

  timelineCards
    .push(newCard)
    .then((snapshot) => {
      console.dir(snapshot.key);
      res.send(snapshot.key);
    })
    .catch((err) => {
      res.send("Err, new timeline card could not be added");
    });
});

// update timelineCard title/description
// {
// 	"title": <title>
//  "description": <description>
// }
router.post('/:uid/update_card/:cid', function (req, res) {
  const updatedCard = req.body;

  const clientID = req.params.uid;
  const cardID = req.params.cid;

  const db = admin.database();

  const client = db.ref("clients").child(clientID);
  const card = client.child("timelineCards").child(cardID);

  card.update(updatedCard, (err) => {
    if (err) {
      res.send("Err, could not update timeline card");
    } else {
      res.send("Timeline card successfully updated");
    }
  })
})

// remove timelineCard
router.delete('/:uid/delete_card/:cid', function (req, res) {
  const clientID = req.params.uid;
  const cardID = req.params.cid;

  const db = admin.database();

  const client = db.ref("clients").child(clientID);
  const card = client.child("timelineCards").child(cardID);

  card
    .remove()
    .then(() => { 
      res.send("Timeline card successfully removed");
    })
    .catch(() => {
      res.send("Err, could not remove timeline card");
    });

});

// get all timeline cards for a user id
router.get('/:uid/get_all_cards', function (req, res) {
  const clientID = req.params.uid;

  const db = admin.database();

  const client = db.ref("clients").child(clientID);
  const cards = client.child("timelineCards");

  cards
    .once("value", (snapshot) => {
      const exists = (snapshot.val() !== null);

      if(exists) {
        const cards = snapshot.val();
        res.json(cards);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.send("Could not get all cards");
    })

});

module.exports = router;