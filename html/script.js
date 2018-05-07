// global session
var session = new QiSession(function(session) {
                // document.getElementById('typed').innerHTML = "Connection esterblished!";
              }, function() {
                // document.getElementById('typed').innerHTML = "Could not connect to the robot";
              });


// Subscribe to ALMemory Service
session.service("ALMemory").then(function(ALMemory) {
  // document.getElementById('typed').innerHTML = "ALMemory proxy subscription successful!";
  ALMemory.getData('mail').then(function Mail(mail){

    var x = String(mail);

    x = x.split("\n",4);
    var sender = x[0];
    var date = x[1];
    var subject = x[2];
    var message = x[3];
    var email = sender.split(" [")[1];
    sender = sender.split(" [")[0];
    email = "[" + email;
    document.getElementById("sender").innerHTML = String(sender);
    document.getElementById("email").innerHTML = String(email);
    document.getElementById("date").innerHTML = String(date);
    document.getElementById("subject").innerHTML = String(subject);
    document.getElementById("message").innerHTML = String(message);

  });

});
