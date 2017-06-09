//Initialize Firebase
var config = {
 apiKey: "AIzaSyCV_71ZRVlkchaMIyUQYmYU5ai2Yzqwe3E",
 authDomain: "bux-project.firebaseapp.com",
 databaseURL: "https://bux-project.firebaseio.com",
 projectId: "bux-project",
 storageBucket: "bux-project.appspot.com",
 messagingSenderId: "210777973860"
};

firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

var name = $("#name");
var dest = $("#dest");
var time = $("#time");
var int = $("#int");

$("#ent").on("click", function() {

  var nameVal = name.val().trim();
  var destVal = dest.val().trim();
  var timeVal = time.val().trim();
  var intVal = int.val().trim();

  var check = [nameVal, destVal, timeVal, intVal]
  var pass = 0;
  for (var i = 0; i < check.length; i++) {
    if (check[i].length != "") {
      pass++
    }


  }      
  if (pass === check.length) {
    newData(name, dest, time, int);
  }
  else {
    alert("Please fill in all of the fields")
  } 
})


function newData(nameVal, destVal, timeVal, intVal) {
  // Append to table
  $(".table").find('tbody')
  .append($('<tr>')
    .append($('<td>'+ name + '</td><td>'+ dest + '</td><td>'+ int + '</td><td>')
      )
    );

  database.ref().child("trains").push().set({
    name: $("#name").val().trim(),
    dest: $("#dest").val().trim(),
    time: $("#time").val().trim(),
    int: $("#int").val().trim(),
  });

  name.val("");
  dest.val("");
  time.val("");
  int.val("");
};


database.ref().child("trains").on("value", function(snapshot) {
  // Log everything that's coming out of snapshot
  console.log(snapshot.val()["the big key it's showing"]);

  var data2 = JSON.stringify(snapshot.val());
  console.log(data2)

  var data = JSON.parse(data2);
  console.log(data);




})