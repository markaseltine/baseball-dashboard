var baseball = require('./baseball-schema');

module.exports = {

  getPlayerSelect: function (selectors, callback) {
    var selectorObject = {};
    Object.keys(selectors).forEach(function (key,index) {
      if (selectors[key] !== null) {
        selectorObject[key] = selectors[key];
      }
    });
    baseball.Master.find( selectorObject ).sort( {debut: 'asc'} ).select('playerID nameFirst nameLast bats throws debut finalGame').exec(function (error, results) {
      callback(error, results);
    });
  },

  getTeamSelect: function (selectors, callback) {
    var selectorObject = {};
    Object.keys(selectors).forEach(function (key,index) {
      if (selectors[key] !== null) {
        selectorObject[key] = decodeURIComponent(selectors[key]);
      }
    });
    baseball.Teams.find( selectorObject ).sort( { yearID: 'asc', lgID: 'asc', divID: 'asc', W: 'desc' } ).select('teamID yearID name lgID divID W L DivWin LgWin WSWin').exec(function (error, results) {
      callback(error, results);
    });
  },

  getTeamPlayers: function (selectors, callback) {
    baseball.Batting.find( selectors ).select('playerID').exec(function (error, results) {
      callback(error, results);
    });
  },

  getTeamRoster: function (playersArray, callback) {
    baseball.Master.find({ playerID: { $in: playersArray } }).sort( {nameLast: 'asc'} ).select('playerID nameFirst nameLast bats throws debut finalGame').exec(function (error, results) {
      callback(error, results);
    });
  },

  getTeamData: function (teamid, callback) {
    baseball.Teams.find( { teamID: teamid } ).select('yearID teamID G W L AB R H Double Triple HR RBI').exec(function (error, results) {
      callback(error, results);
    });
  },

  getPlayerBatting: function (playerid, callback) {
    baseball.Batting.find( { playerID: playerid } ).select('yearID teamID G AB R H Double Triple HR RBI').exec(function (error, results) {
      callback(error, results);
    });
  },

  getPlayerBattingNoTeam: function (playerid, callback) {
    baseball.Batting.find( { playerID: playerid }, { yearID: true, HR: true, _id: false } ).sort( {yearID: 'asc'} ).exec(function (error, results) {
      callback(error, results);
    });
  }

};
