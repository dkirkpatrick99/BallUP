const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const Game = require('../../models/Game');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

router.get("/test", (req, res) => res.json({ msg: "This is the game route" }));
const validateGameInput = require('../../validation/games');

router.post('/creategame',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateGameInput(req.body);
        
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const newGame = new Game({
                user: req.user.id,
                title: req.body.title,
                location: req.body.location,
                time: req.body.time,
                game_date: req.body.game_date,
                game_set: req.body.game_set,
                teams: req.body.teams,
                teamNames: req.body.teamNames,
                players: [req.user]
            })
  
      newGame.save().then(game => res.json(game));
    }
  );



router.get('/', (req, res) => {
  
    Game.find()
        .sort({ date: -1 })
        .then(games => res.json(games))
        .catch(err => res.status(404).json({ nogamesfound: 'No games found' }));
});
  
router.get('/:id', (req, res) => {
    Game.findById(req.params.id)
        .then(game => res.json(game))
        .catch(err =>
            res.status(404).json({ nogamefound: 'No game found with that ID' })
        );
});
  
router.patch('/:id', (req, res) => {
  Game.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(game => res.json(game))
    .catch(err => res.status(404).json(err))
});

// router.delete('/:id', (req, res) => {
//   
//   Game.deleteOne({ _id: req.params.id })
//     }
// );

router.delete('/:id', function (req, res) {
  
  Game.findByIdAndRemove(req.params.id)
    .then(game => {
      res.json(game), res.sendStatus(200);
    })
});

module.exports = router;