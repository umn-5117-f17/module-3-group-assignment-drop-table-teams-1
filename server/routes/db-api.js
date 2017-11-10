var express = require('express');
var router = express.Router();

const checkJwt = require('../auth').checkJwt;
const fetch = require('node-fetch');

// simple API call, no authentication or user info
router.get('/unprotected', function(req, res, next) {
  console.log("here in unprotected");
  req.db.collection('Collections').find().toArray(function(err, results) {
    if (err) {
      next(err);
    }

    res.json({
      todos: results
    });
  });

});

router.get('/notecards/:collect', function(req, res) {
  console.log("in the server notecard");
  var collectionId = req.params.collect;

  req.db.collection('Notecards').find({'collection': collectionId}).toArray(function(err, results) {
    console.log(results);
    res.send({noteCards: results});
  });
});

router.post('/newCollection', function(req, res) {
  console.log("in new collection server");
  // console.log(req.body);
  var newItem = {
    isPrivate: req.body.isPrivate,
    name: req.body.collectionName,
  };
  // mongo call to insert newItem
  req.db.collection('Collections').insertOne(newItem, function(err, results) {
    //res.status(200).send('success');
  });
});

router.get('/collections', function(req, res) {
  console.log("in the server collections");

  req.db.collection('Collections').find().toArray(function(err, results) {
    // console.log(results);
    res.send({collections: results});
  });
});

// checkJwt middleware will enforce valid authorization token
router.get('/protected', checkJwt, function(req, res, next) {

  req.db.collection('Notecards').find().toArray(function(err, results) {
    if (err) {
      next(err);
    }

    res.json({
      todos: results
    });
  });

  // the auth0 user identifier for connecting users with data
  console.log('auth0 user id:', req.user.sub);

  // fetch info about the user (this isn't useful here, just for demo)
  const userInfoUrl = req.user.aud[1];
  const bearer = req.headers.authorization;
  fetch(userInfoUrl, {
  	headers: { 'authorization': bearer },
  })
    .then(res => res.json())
    .then(userInfoRes => console.log('user info res', userInfoRes))
    .catch(e => console.error('error fetching userinfo from auth0'));

});

module.exports = router;
