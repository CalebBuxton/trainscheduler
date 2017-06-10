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

$("#ent").on("click", function(event) {
  event.preventDefault();
  var nameVal = $("#name").val().trim();
  var destVal = $("#dest").val().trim();
  var timeVal = $("#time").val().trim();
  var intVal = $("#int").val().trim();

  var newTrain = {
    name: nameVal,
    dest: destVal,
    time: timeVal,
    int: intVal
  }

  console.log(newTrain);

  $("#name").val("");
  $("#dest").val("");
  $("#time").val("");
  $("#int").val("");

  database.ref().push(newTrain)

//   var check = [name, dest, time, int]
//   var pass = 0;
//   for (var i = 0; i < check.length; i++) {
//     if (check[i].length != "") {
//       pass++
//   }      
// }
//   if (pass === check.length) {
//     newData(name, dest, time, int);
//   }
//   else {
//     alert("Please fill in all of the fields")
//   } 
})


  database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      // console.log(childSnapshot.val().name);
      // console.log(childSnapshot.val().role);
      // console.log(childSnapshot.val().startDate);
      // console.log(childSnapshot.val().monthlyRate);


      //1440 minutes in a day
      // var runTimes = [];
      // var startTime = childSnapshot.val().time;
      // var timeFormat = "HH:mm";
      // var convertTime = moment(startTime, timeFormat)
      // console.log(moment(startTime, timeFormat).format("hh:mm a"))
      // var interval = childSnapshot.val().int;
      // var convInt = moment(interval, "mm").format("mm");
      // console.log(convInt);

      // for (i=0; i<4; i++) {


      //   var test = moment(moment(startTime, timeFormat) + moment(interval, "m")).format("HH:mm a");
      //   startTime = test;
      //   runTimes.push(test);

      // }
      // console.log(runTimes)

      var interval = childSnapshot.val().int;
      var firstTime = childSnapshot.val().time;

      var firstConvert = moment(firstTime, "HH:mm").subtract(1, "years");

      console.log(firstConvert);

      var currentTime = moment();

      var diffTime = currentTime.diff(moment(firstConvert), "minutes");

      console.log("Difference In Time is: " + diffTime);

      var timeRemaining = diffTime % interval;
      console.log(timeRemaining)

      var minUntil = interval - timeRemaining;

      console.log("Minutes until train " + minUntil);

      var nextTrain = moment().add(minUntil, "minutes");

      console.log("Next Arrival " + moment(nextTrain).format("h:mm A"));

      //Append info to the table
      $(".table").find('tbody')
      .append($('<tr>')
        .append($('<td>'+ childSnapshot.val().name + '</td><td>'+ childSnapshot.val().dest + '</td><td>'+ childSnapshot.val().int + '</td><td>' + moment(nextTrain).format("h:mm A") + '</td><td>' + minUntil + '</td>')
          )
        );
    })

      //Data used to calc difference in months
      // var givenDate = childSnapshot.val().startDate;
      // var format = "MM/DD/YY";
      // var start = moment(givenDate, format);


      // //Difference in Months
      // console.log(moment().diff(moment(start), "months"))


// function newData(name, dest, time, int) {
//   // Append to table
//   $(".table").find('tbody')
//   .append($('<tr>')
//     .append($('<td>'+ name + '</td><td>'+ dest + '</td><td>'+ int + '</td><td>')
//       )
//     );

//   database.ref().child("trains").push().set({
//     name: $("#name").val().trim(),
//     dest: $("#dest").val().trim(),
//     time: $("#time").val().trim(),
//     int: $("#int").val().trim(),
//   });


// database.ref("/trains").on("value", function(snapshot) {
//   var trains = snapshot.child();

//   console.log(trains);
// })



// database.ref().child("trains").on("value", function(snapshot) {
//   // Log everything that's coming out of snapshot
//   console.log(snapshot.val());

//   var data2 = JSON.stringify(snapshot.val());
//   console.log(data2)

//   var data = JSON.parse(data2);
//   console.log(data);
// })
