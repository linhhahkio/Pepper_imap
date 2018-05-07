// global session
var session = new QiSession(function(session) {
                // document.getElementById('typed').innerHTML = "Connection esterblished!";
              }, function() {
                // document.getElementById('typed').innerHTML = "Could not connect to the robot";
              });

function Submit(){
// Subscribe to ALMemory Service
session.service("ALMemory").then(function(ALMemory) {
  // document.getElementById('typed').innerHTML = "ALMemory proxy subscription successful!";

    var x = document.getElementById("myForm").elements[0].value;
    //document.getElementById("date_string").innerHTML = String(x);
	  //ALMemory.insertData("date",String(x));
    ALMemory.raiseEvent('getDate',x);
});
}
