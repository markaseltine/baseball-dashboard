var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/baseball', function (err) {
  if (err && err.message.includes('ECONNREFUSED')) {
    console.log('Error connecting to mongodb database: %s.\nIs "mongod" running?', err.message);
    process.exit(0);
  } else if (err) {
    throw err;
  } else {
    console.log('DB successfully connected.');
  }
});

var db = mongoose.connection;

var masterSchema = new mongoose.Schema(
  {
    playerID: String,
    birthYear: Number,
    birthMonth: Number,
    birthDay: Number,
    birthCountry: String,
    birthState: String,
    birthCity: String,
    deathYear: Number,
    deathMonth: Number,
    deathDay: Number,
    deathCountry: String,
    deathState: String,
    deathCity: String,
    nameFirst: String,
    nameLast: String,
    nameGiven: String,
    weight: Number,
    height: Number,
    bats: String,         
    throws: String,
    debut: String,
    finalGame: String,
    retroID: String,
    bbrefID: String
  },
  {
    collection: 'master'
  });

var Master = mongoose.model('Master', masterSchema);

var battingSchema = new mongoose.Schema(
  {
    playerID: String,
    yearID: Number,
    stint: String,
    teamID: String,
    lgID: String,
    G: Number,
    AB: Number,
    R: Number,
    H: Number,
    Double: Number,
    Triple: Number,
    HR: Number,
    RBI: Number,
    SB: Number,
    CS: Number,
    BB: Number,
    SO: Number,
    IBB: Number,
    HBP: Number,
    SH: Number,
    SF: Number,
    GIDP: Number
  },
  {
    collection: 'batting'
  });

var Batting = mongoose.model('Batting', battingSchema);

var pitchingSchema = new mongoose.Schema(
  {
    playerID: String,
    yearID: Number,
    stint: String,
    teamID: String,
    lgID: String,
    W: Number,
    L: Number,
    G: Number,
    GS: Number,
    CG: Number,
    SHO: Number,
    SV: Number,
    IPOuts: Number,
    H: Number,
    ER: Number,
    HR: Number,
    BB: Number,
    SO: Number,
    BAOpp: Number,
    ERA: Number,
    IBB: Number,
    WP: Number,
    HBP: Number,
    BK: Number,
    BFP: Number,
    GF: Number,
    R: Number,
    SH: Number,
    SF: Number,
    GIDP: Number
  },
  {
    collection: 'pitching'
  });

var Pitching = mongoose.model('Pitching', pitchingSchema);

var fieldingSchema = new mongoose.Schema(
  {
    playerID: String,
    yearID: Number,
    stint: String,
    teamID: String,
    lgID: String,
    Pos: String,
    G: Number, 
    GS: Number,
    InnOuts: Number, 
    PO: Number,
    A: Number,
    E: Number,
    DP: Number,
    PB: Number,
    WP: Number,
    SB: Number,
    CS: Number,
    ZR: Number
  },
  {
    collection: 'fielding'
  });

var Fielding = mongoose.model('Fielding', fieldingSchema);

var halloffameSchema = new mongoose.Schema(
  {
    playerID: String,      // Player ID code
    yearID: Number,        // Year of ballot
    votedBy: String,       // Method by which player was voted upon
    ballots: Number,       // Total ballots cast in that year
    needed: Number,        // Number of votes needed for selection in that year
    votes: Number,         // Total votes received
    inducted: String,      // Whether player was inducted by that vote or not (Y or N)
    category: String,      // Category in which candidate was honored
    needed_note: String    // Explanation of qualifiers for special elections
  },
  {
    collection: 'halloffame'
  });

var HallofFame = mongoose.model('HallofFame', halloffameSchema);

var managersSchema = new mongoose.Schema(
  {
    playerID: String,
    yearID: Number,
    teamID: String,
    lgID: String,
    inseason: Number, 
    G: Number,
    W: Number,
    L: Number,
    rank: Number,
    plyrMgr: String
  },
  {
    collection: 'managers'
  });

var Managers = mongoose.model('Managers', managersSchema);

var teamsSchema = new mongoose.Schema(
  {
    yearID: Number,      //   Year
    lgID: String,        //   League
    teamID: String,      //   Team
    franchID: String,    //   Franchise (links to TeamsFranchise table)
    divID: String,       //   Team's division
    Rank: Number,        //   Position in final standings
    G: Number,           //   Games played
    GHome: Number,       //   Games played at home
    W: Number,           //   Wins
    L: Number,           //   Losses
    DivWin: String,      //   Division Winner (Y or N)
    WCWin: String,       //   Wild Card Winner (Y or N)
    LgWin: String,       //   League Champion(Y or N)
    WSWin: String,       //   World Series Winner (Y or N)
    R: Number,           //   Runs scored
    AB: Number,          //   At bats
    H: Number,           //   Hits by batters
    Double: Number,      //   Doubles
    Triple: Number,      //   Triples
    HR: Number,          //   Homeruns by batters
    BB: Number,          //   Walks by batters
    SO: Number,          //   Strikeouts by batters
    SB: Number,          //   Stolen bases
    CS: Number,          //   Caught stealing
    HBP: Number,         //   Batters hit by pitch
    SF: Number,          //   Sacrifice flies
    RA: Number,          //   Opponents runs scored
    ER: Number,          //   Earned runs allowed
    ERA: Number,         //   Earned run average
    CG: Number,          //   Complete games
    SHO: Number,         //   Shutouts
    SV: Number,          //   Saves
    IPOuts: Number,      //   Outs Pitched (innings pitched x 3)
    HA: Number,          //   Hits allowed
    HRA: Number,         //   Homeruns allowed
    BBA: Number,         //   Walks allowed
    SOA: Number,         //   Strikeouts by pitchers
    E: Number,           //   Errors
    DP: Number,          //   Double Plays
    FP: Number,          //   Fielding  percentage
    name: String,        //   Team's full name
    park: String,        //   Name of team's home ballpark
    attendance: Number,  //   Home attendance total
    BPF: Number,         //   Three-year park factor for batters
    PPF: Number,         //   Three-year park factor for pitchers
    teamIDBR: String,    //   Team ID used by Baseball Reference website
    teamIDlahman45: String, //Team ID used in Lahman database version 4.5
    teamIDretro: String  //   Team ID used by Retrosheet
  },
  {
    collection: 'teams'
  });

var Teams = mongoose.model('Teams', teamsSchema);

var franchisesSchema = new mongoose.Schema(
  {
    franchID: String,      // Franchise ID
    franchName: String,    // Franchise name
    active: String,        // Whether team is currently active (Y or N)
    NAassoc: String       // ID of National Association team franchise played as
  },
  {
    collection: 'teamsfranchises'
  });

var Franchises = mongoose.model('Franchises', franchisesSchema);

var awardsSchema = new mongoose.Schema(
  {
    playerID: String,     //  Player ID code
    awardID: String,      //  Name of award won
    yearID: Number,       //  Year
    lgID: String,         //  League
    tie: String,          //  Award was a tie (Y or N)
    notes: String         //  Notes about the award
  },
  {
    collection: 'awardsplayers'
  });

var Awards = mongoose.model('Awards', awardsSchema);

module.exports = {
  Master: Master,
  Batting: Batting,
  Pitching: Pitching,
  Fielding: Fielding,
  HallofFame: HallofFame,
  Managers: Managers,
  Teams: Teams,
  Franchises: Franchises,
  Awards: Awards,
  mongoose: mongoose,
  dbMaster: db.collection('Master'),
  dbBatting: db.collection('Batting'),
  dbPitching: db.collection('Pitching'),
  dbFielding: db.collection('Fielding'),
  dbHallofFame: db.collection('HallofFame'),
  dbManagers: db.collection('Managers'),
  dbTeams: db.collection('Teams'),
  dbFranchises: db.collection('Franchises'),
  dbAwards: db.collection('Awards')
};
