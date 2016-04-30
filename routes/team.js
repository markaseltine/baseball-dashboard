var express = require('express');
var router = express.Router();
var baseballDb = require('../db/baseball');

// router to find teams that match the selectors specified
router.get('/lookupSelect', function (req, res, next) {
  baseballDb.getTeamSelect(req.query, function (err, teams) {
    if (err) {
      next(err);
    } else {
      res.render('team-selector-table', {
        title: 'Teams Selected',
        selector: JSON.stringify(req.query),
        teams: teams
      });
    }
  });
});

// router to find the players on a specific team in a specific year
//   1) use the batting table to find players that played on the  
//      team specified during the year specified
//   2) retrieve the player data for the players returned by step 1
router.get('/roster/:teamID/:yearID', function (req, res, next) {
  baseballDb.getTeamPlayers(req.params, function (err, playerData) {
    var playersArray = playerData.map(function (obj) {
      return obj.playerID;
    });
    baseballDb.getTeamRoster(playersArray, function (err, players) {
      if (err) {
        next(err);
      } else {
        res.render('team-roster-table', {
          title: 'Team Roster',
          selector: 'By Team and Year',
          players: players
        });
      }
    });
  });
});

// router to display team stats across all years
router.get('/data/:teamID', function (req, res, next) {
  baseballDb.getTeamData(req.params.teamID, function (err, results) {
    if (err) {
      next(err);
    } else {
      res.render('team-statistics', {
        title: 'Team Statistics',
        team: req.params.teamID,
        stats: results
      });
    }
  });
});

module.exports = router;
