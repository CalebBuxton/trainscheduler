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

$("#ent").on("click", function() {

  var name = $("#name").val().trim();
  var dest = $("#dest").val().trim();
  var time = $("#time").val().trim();
  var int = $("#int").val().trim();

  var check = [name, dest, time, int]
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


function newData(name, dest, time, int) {
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
};


database.ref().child("trains").on("value", function(snapshot) {
  // Log everything that's coming out of snapshot
  console.log(snapshot.val()["the big key it's showing"]);

  var data2 = JSON.stringify(snapshot.val());
  console.log(data2)

  var data = JSON.parse(data2);
  console.log(data);

})