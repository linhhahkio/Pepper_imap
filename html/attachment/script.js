// global session
var session = new QiSession(function(session) {
                // document.getElementById('typed').innerHTML = "Connection esterblished!";
              }, function() {
                // document.getElementById('typed').innerHTML = "Could not connect to the robot";
              });


// Subscribe to ALMemory Service
session.service("ALMemory").then(function(ALMemory) {
  // document.getElementById('typed').innerHTML = "ALMemory proxy subscription successful!";
  ALMemory.getData('list_attachment').then(function getAttachNum(list_attachment){

    var x = list_attachment;

    var text_num = "Text file: "+ x[1][0];
    var audio_num = "Audio file: " + x[1][1];
    var image_num = "Image file: " + x[1][2];
    var unsupport_num = "***Unsupported format file: " + x[1][3] + " ***";
    
    document.getElementById("text_num").innerHTML = String(text_num);
    document.getElementById("audio_num").innerHTML = String(audio_num);
    document.getElementById("image_num").innerHTML = String(image_num);
    document.getElementById("unsupport_num").innerHTML = String(unsupport_num);
  });

});

function show_Text(){
// Subscribe to ALMemory Service
session.service("ALMemory").then(function(ALMemory) {
  // document.getElementById('typed').innerHTML = "ALMemory proxy subscription successful!";

    ALMemory.raiseEvent('choose_attachment',"text");
});
}

function show_Audio(){
// Subscribe to ALMemory Service
session.service("ALMemory").then(function(ALMemory) {
  // document.getElementById('typed').innerHTML = "ALMemory proxy subscription successful!";

    ALMemory.raiseEvent('choose_attachment',"audio");
});
}

function show_Image(){
// Subscribe to ALMemory Service
session.service("ALMemory").then(function(ALMemory) {
  // document.getElementById('typed').innerHTML = "ALMemory proxy subscription successful!";

    ALMemory.raiseEvent('choose_attachment',"image");
});
}

function Stop(){
// Subscribe to ALMemory Service
session.service("ALMemory").then(function(ALMemory) {
  // document.getElementById('typed').innerHTML = "ALMemory proxy subscription successful!";

    ALMemory.raiseEvent('choose_attachment',"stop");
});
}
