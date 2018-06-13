var express = require('express');
var router = express.Router();
const pinyin = require("pinyin");
const mongoose = require("mongoose");
const cjst = require('../helpers/cjst/lib/cjst');
const Card = require('../models/cards');
const Deck = require('../models/deck');
const ejsLint = require('ejs-lint');
// var dom = require('express-dom')
// var pdf = require('express-dom-pdf');
var app = require('express')();
var phantom = require('node-phantom');

var url2pdf = require("url2pdf");


router.get('/print/:deckId/:name', function(req,res,next){
  id = req.params.deckId
  path = "/User/ayoamadi/Documents/flashcards/" + req.params.name + ".pdf"
  url = "http://localhost:3000/decks/" + id;
  url2pdf.renderPdf(url)
    .then(function (path) {
      console.log(path)
      res.sendFile(path);
    })
    .catch(function (err) {
      res.status(500).json(err);
    })
  })
// phantom.create(function (error, ph) {
//   ph.createPage(function (err, page) {
//     page.set("paperSize", { format: "A4", orientation: 'portrait', margin: '0.3175cm' });
//     page.open(url, function (err, status) {
//       page.render(name, function(){
//         console.log(name + "rendered")
//         ph.exit();

//       })
//       // do something
//     });
  // });
// });
// });

//Require
var hanzi = require("hanzi");
//Initiate
hanzi.start();

router.get('/', function(req, res, next) {

  Deck.find()
    .select("title gramorvocab createdAt")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        reports: docs.map(doc => {
          return {

            title: doc.title,
            
            gramorvocab: doc.gramorvocab,
            
            createdAt: doc.createdAt,
            
            _id: doc._id,
            
            request: {
              type: "GET",
              url: "http://localhost:3000/decks/" + doc._id
            }
          };
        })
      }
      console.log(docs);
      //   if (docs.length >= 0) {
      res.render('decks', {title: 'Decks', decks: docs} );
            //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/newdeck',function (req,res,next){

  res.render('newdeck', {title: "Create a Deck!"});

});
router.post('/', function (req, res, next) {

    const deck = new Deck({
      _id: new mongoose.Types.ObjectId(),

      title: req.body.title,

      gramorvocab: req.body.gramorvocab
    });
    deck
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Successfully created deck",
          createdArticle: {
            _id: result._id,

            title: result.title,

            gramorvocab: result.gramorvocab,

            createdAt: result.createdAt,

            request: {
              type: "GET",
              url: "http://localhost:3000/decks/" + result._id
            }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});

router.get('/:deckId', function (req, res, next){
  body = {}
  const id = req.params.deckId;
  Deck.findById(id)
    .select("title gramorvocab createdAt")
    // .populate(cards)
    .exec()
    .then(deck => {
      body.deck = deck
      console.log("From database", body.deck);
      Card.find({deck: id})
      .select("_id characters prettypinyin tone zhuyin definition")
      .then(card => {
        body.card = card
      if (body) {
        res.render('deck', {
          title: body.deck.title,
          deck: body.deck,
          card: body.card,
          request: {
            type: "GET",
            url: "http://localhost:3000/decks/" + body.deck._id
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
  })
})

router.get('/tones/:deckId', function (req, res, next) {
  body = {}
  const id = req.params.deckId;
  Deck.findById(id)
    .select("title gramorvocab createdAt")
    // .populate(cards)
    .exec()
    .then(deck => {
      body.deck = deck
      console.log("From database", body.deck);
      Card.find({ deck: id })
        .select("_id characters prettypinyin tone zhuyin definition")
        .then(card => {
          body.card = card
          if (body) {
            res.render('deckblack', {
              title: body.deck.title,
              deck: body.deck,
              card: body.card,
              request: {
                type: "GET",
                url: "http://localhost:3000/decks/" + body.deck._id
              }
            });
          } else {
            res
              .status(404)
              .json({ message: "No valid entry found for provided ID" });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ error: err });
        });
    })
})

router.get('/tones/:deckId', function (req, res, next) {
  body = {}
  const id = req.params.deckId;
  Deck.findById(id)
    .select("title gramorvocab createdAt")
    // .populate(cards)
    .exec()
    .then(deck => {
      body.deck = deck
      console.log("From database", body.deck);
      Card.find({ deck: id })
        .select("_id characters prettypinyin tone zhuyin definition")
        .then(card => {
          body.card = card
          if (body) {
            res.render('back2back', {
              title: body.deck.title,
              deck: body.deck,
              card: body.card,
              request: {
                type: "GET",
                url: "http://localhost:3000/decks/" + body.deck._id
              }
            });
          } else {
            res
              .status(404)
              .json({ message: "No valid entry found for provided ID" });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ error: err });
        });
    })
})

router.get('/tones/:deckId', function (req, res, next) {
  body = {}
  const id = req.params.deckId;
  Deck.findById(id)
    .select("title gramorvocab createdAt")
    // .populate(cards)
    .exec()
    .then(deck => {
      body.deck = deck
      console.log("From database", body.deck);
      Card.find({ deck: id })
        .select("_id characters prettypinyin tone zhuyin definition")
        .then(card => {
          body.card = card
          if (body) {
            res.render('back2back', {
              title: body.deck.title,
              deck: body.deck,
              card: body.card,
              request: {
                type: "GET",
                url: "http://localhost:3000/decks/" + body.deck._id
              }
            });
          } else {
            res
              .status(404)
              .json({ message: "No valid entry found for provided ID" });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ error: err });
        });
    })
})

router.get('/edit/:deckId', function (req, res, next) {
  console.log(req.body)
  console.log(req.params)
  body = {}
  const id = req.params.deckId;
  Deck.findById(id)
    .select("title gramorvocab createdAt")
    // .populate(cards)
    .exec()
    .then(deck => {
      body.deck = deck
      console.log("From database", body.deck);
      Card.find({ deck: id })
        .select("_id characters prettypinyin tone zhuyin definition")
        .then(card => {
// console.log(card[22].prettypinyin.toString().replace(/,/g, ' '))
const response = {
            deck: body.deck,
            card: card.map(card => {
              return {
                characters: card.characters.join(""),
                prettypinyin: card.prettypinyin.join(" "),

                tone: card.tone.join(""),
                definition: card.definition,

                label: card.label,
                
                _id: card._id,
              };
            })
          }

          if (response) {
            res.render('editcards', {
              title: response.deck.title,
              deck: response.deck,
              card: response.card,
              request: {
                type: "GET",
                url: "http://localhost:3000/decks/" + body.deck._id
              }
            });
          } else {
            res
              .status(404)
              .json({ message: "No valid entry found for provided ID" });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ error: err });
        });
    })
})

router.post('/edit/:deckId/:cardId', function (req, res, next) {
  const deckid = req.params.deckId;
  const cardid = req.params.cardId;


  Card.findById(cardid)
    .exec()
    .then(card => {
      
req.body.characters = req.body.characters.split("");
req.body.tone = req.body.tone.split("");
req.body.prettypinyin = req.body.prettypinyin.split(" ");
req.body.definition = [req.body.definition]

console.log(req.body)

      card.update({ $set: req.body })
        .exec()
        .then(result => {
          console.log(result);
          res.redirect("/decks/edit/" + deckid)
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


router.patch('/:deckId', function(req, res, next){
  const id = req.params.deckId;
  

  Deck.findById(id)
    .exec()
    .then(deck => {

      console.log(req.body);
      // const updateOps = {};
      // for (const ops of req.body) {
      //     updateOps[ops.propName] = ops.value;
      // }
      deck.update({ $set: req.body })
        .exec()
        .then(result => {
          console.log(result);
          res.status(200).json({
            message: "Report updated",
            request: {
              type: "GET",
              url: "http://localhost:3000/decks/" + result.id
            }
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete('/:deckId', function(req,res,next){


const id = req.params.deckId;

Deck.findByIdAndRemove(id)
  .exec()
  .then(result => {
    res.redirect('/decks');
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
})

router.post('/delete/:deckId/:cardId?', function (req, res, next) {
  console.log(req.params)

  const deckid = req.params.deckId;
  const cardid = req.params.cardId;

  Card.findByIdAndRemove(cardid)
    .exec()
    .then(result => {
      res.redirect("/decks/edit/" + deckid)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


router.get('/:deckId/new', function (req, res, next) {
  const id = req.params.deckId;
  Deck.findById(id)
    .select("title gramorvocab createdAt")
    // .populate(cards)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.render('newcards', {
          title: doc.title,
          deck: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/decks/" + doc._id
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });

});

router.post('/:deckId/cards', function(req,res,next){
const deck = req.params.deckId;
const vocab = req.body.characters.split(" ");
const cards = [];
const eachTone= [];

//for loop
for (let i = 0; i < vocab.length; i++) {
console.log(vocab[i]);
const zi = hanzi.definitionLookup(vocab[i], 't');
const definitions = [];
const tones = [];
const prettypinyin = String(pinyin(vocab[i])).split(",");


if(zi) {
  const eachTone = zi[0].pinyin.split(" ");
  for (let i = 0; i < zi.length; i++) {
      definitions[definitions.length] = zi[i].definition
    }

          for (let i = 0; i < eachTone.length; i++) {
            tones[tones.length] = eachTone[i].slice(-1);

            tones.slice(-vocab[i].length)
          }
        }
            const card = new Card({
              _id: new mongoose.Types.ObjectId(),
              deck: deck,

              characters: vocab[i].split(""),
              prettypinyin: prettypinyin,
              tone: tones, //for loop
              // zhuyin: String,
              definition: definitions

            });
            cards[cards.length] = card;
    }

Card.create(cards, function (err, results) {
  if (err) {
    return res.status(401).json({
      message: err
    });

  } else {
    console.log(results)
    res.send(results);
  }

  });
});

module.exports = router;
