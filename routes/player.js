var express = require('express');
var router = express.Router();
var baseballDb = require('../db/baseball');

// gets player data for players that match the selectors
router.get('/lookupSelect', function (req, res, next) {
  baseballDb.getPlayerSelect(req.query, function (err, players) {
    if (err) {
      next(err);
    } else {
      res.render('player-selector-table', {
        title: 'Players Selected',
        selector: JSON.stringify(req.query),
        players: players
      });
    }
  });
});

// gets the batting statistics for the player selected
router.get('/batting/:playerid', function (req, res, next) {
  baseballDb.getPlayerBatting(req.params.playerid, function (err, results) {
    if (err) {
      next(err);
    } else {
      res.render('player-batting-stats', {
        title: 'Player Batting Statistics',
        player: req.params.playerid,
        stats: results
      });
    }
  });
});

// displays a D3-generated bar chart of home runs for the player specified 
router.get('/hrbarchart/:playerid', function (req, res, next) {
  baseballDb.getPlayerBattingNoTeam(req.params.playerid, function (err, results) {
    if (err) {
      next(err);
    } else {
      res.render('player-homeruns-barchart', {
        title: 'Chart of Player Home Runs by Year',
        player: req.params.playerid,
        stats: results
      });
    }
  });
});

module.exports = router;
