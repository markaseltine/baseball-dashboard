// functions that support player lookup
var loadSelectedData = function () {
  var playerLast = $('#playerLast').val();
  var playerBats = $('#playerBats').val();
  var playerThrows = $('#playerThrows').val();
  var url = "/player/lookupSelect" + '?nameLast=' + playerLast;
  if (playerBats !== null) {
    url = url + '&bats=' + playerBats;
  }
  if (playerThrows !== null) {
    url = url + '&throws=' + playerThrows;
  }
  $("#selectedData").empty(); 
  $("#selectedData").load(url); 
};

var loadLastNameData = function () {
  var playerLast = $('#playerLast').val();
  var url = "/player/lookupSelect" + '?nameLast=' + playerLast;
  if (playerBats !== null) {
    url = url + '&bats=' + playerBats;
  }
  if (playerThrows !== null) {
    url = url + '&throws=' + playerThrows;
  }
  console.log(url);
  $("#selectedData").empty(); 
  $("#selectedData").load(url); 
};

var removeSelectedData = function () {
  $("#playerBats").val("");
  $("#playerThrows").val("");
  $("#playerLast").val("");
};
