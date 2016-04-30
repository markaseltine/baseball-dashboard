// function that support team lookup
var loadSelectedData = function () {
  var teamWon = $('#won').val();
  var teamName = $('#name').val();
  console.log(teamName);
  var teamId = $('#teamID').val();
  var teamYear = $('#year').val();
  var url = "/team/lookupSelect";
  var reqMade = false;
  if (teamWon !== null) {
    reqMade = true;
    url = url + '?' + teamWon + '=Y';
  }
  if (teamName !== "") {
    if (reqMade) {
      url = url + '&name=' + encodeURIComponent(teamName);
    } else {
      reqMade = true;
      url = url + '?name=' + encodeURIComponent(teamName);
    }
  }
  if (teamId !== "") {
    if (reqMade) {
      url = url + '&teamID=' + teamId;
    } else {
      reqMade = true;
      url = url + '?teamID=' + teamId;
    }
  }
  if (teamYear !== "") {
    if (reqMade) {
      url = url + '&yearID=' + teamYear;
    } else {
      url = url + '?yearID=' + teamYear;
    }
  }
  $("#selectedData").empty(); 
  $("#selectedData").load(url); 
};

var removeSelectedData = function () {
  $("#won").val("");
  $("#name").val("");
  $("#teamID").val("");
  $("#year").val("");
};
