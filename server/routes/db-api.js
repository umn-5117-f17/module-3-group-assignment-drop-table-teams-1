var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;

const checkJwt = require('../auth').checkJwt;
const fetch = require('node-fetch');

// simple API call, no authentication or user info
router.get('/unprotected', function(req, res, next) {

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
    // console.log(results);
    res.send({noteCards: results});
  });
});

router.post('/newCollection', function(req, res) {
  console.log("in new collection server");
    console.log(req.body.user);
  var newItem = {
    user: req.body.user,
    privacy: req.body.isPrivate,
    name: req.body.collectionName,
    star: false,
    originalLanguage: "",
    endingLanguage: ""
  };
  // mongo call to insert newItem
  req.db.collection('Collections').insertOne(newItem, function(err, results) {
    //res.status(200).send('success');
  });
});

router.post('/newNote', function(req,res) {
  console.log("in new note server");
  //console.log(req.body);
var keys = Object.keys( req.body.notes );
    console.log(req.body.notes[keys[0]])
  console.log(req.body);
  var keyWord = keys[0];
      var i =0;
      while(i<keys.length) {
        var newItem = {
          user: req.body.user,
          star: false,
          collection: req.body.Id,
          text: keys[i],
          translation: req.body.notes[keys[i]][1],
          picture: req.body.notes[keys[i]][0],
          originalLanguage: "undefined",
          endingLanguage: "undefined"
        }
        console.log(newItem);
        i++;
        req.db.collection('Notecards').insertOne(newItem, function(err, results) {

        })
      }
  // var newItem = {
  //   star: false,
  //   collection: req.body.collection,
  //   text: req.body.text,
  //   translation: req.body.translation,
  //   picture: req.body.picture,
  //   originalLanguage: req.body.originalLanguage,
  //   endingLanguage: req.body.endingLanguage
  // }
  //
  // req.db.collection('Notecards').insertOne(newItem, function(err, results) {
  //   //res.status(200).send('success');
  // });
});

router.get('/collections', function(req, res) {
  console.log("in the server collections");

  req.db.collection('Collections').find({"privacy": false}).toArray(function(err, results) {
    // console.log(results);
    res.send({collections: results});
  });
});

router.post('/deleteNote', function(req, res) {
  var note = req.body.Id;
  var userId = req.body.user;
  console.log("note " + note)
  console.log("user " + userId)
  req.db.collection('Notecards').deleteOne({"_id": ObjectId(note), "user": userId},function(err, results){
      //send success status to client side
      res.status(200).send('success');
    });
})

router.get('/myCollections/:nickName', function(req, res) {
  var collectionUser = req.params.nickName;
  console.log("in the server collections");
  console.log(collectionUser);
  req.db.collection('Collections').find({"user": collectionUser}).toArray(function(err, results) {
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
