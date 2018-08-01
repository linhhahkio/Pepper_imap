// global session
var session = new QiSession(function(session) {
                // document.getElementById('typed').innerHTML = "Connection esterblished!";
              }, function() {
                // document.getElementById('typed').innerHTML = "Could not connect to the robot";
              });

var len_list_image;
// Subscribe to ALMemory Service
session.service("ALMemory").then(function(ALMemory) {
  // document.getElementById('typed').innerHTML = "ALMemory proxy subscription successful!";
  ALMemory.getData('list_image').then(function(list_image){

    var x = list_image;
    // number of audio file
    len_list_image = x.length;
    //ul element

   for (var i = 0; i < len_list_image ; i++)
	{

		var div2 = document.createElement("div");
    		div2.className = "gallery";

 		var img = document.createElement("img");
		img.src = String(x[i]);
    		img.id = "img" + i;
		img.setAttribute('onclick','myFunction(this);');
    		img.onclick = function() {myFunction(this);};

    		div2.appendChild(img);
		document.body.appendChild(div2);

	}

  var expandImg = document.getElementById("expandedImg");
  expandImg.src =  String(x[0]);
  expandImg.parentElement.style.display = "block";

  });
});

function subscribeToEvent(event,myFunction){
  session.service("ALMemory").then(function (ALMemory) {
  ALMemory.subscriber(event).then(function (subscriber) {
    // subscriber.signal is a signal associated to "FrontTactilTouched"
    subscriber.signal.connect(function (state) {
      if(state == 1) {myFunction();}
    });
  });
  });
};

session.subscribeToEvent = subscribeToEvent;

var index = 0;

// Subscribe to "next" event
session.subscribeToEvent("next", function() {
        index = (index + 1) % len_list_image;
        temp_id = "img" + index;
        var img = document.getElementById(temp_id);
        var expandImg = document.getElementById("expandedImg");
        expandImg.src = img.src;
        expandImg.parentElement.style.display = "block";
});

// Subscribe to "previous" event
session.subscribeToEvent("previous", function() {
        index = (index + len_list_image - 1) % len_list_image;
        temp_id = "img" + index;
        var img = document.getElementById(temp_id);
        var expandImg = document.getElementById("expandedImg");
        expandImg.src = img.src;
        expandImg.parentElement.style.display = "block";
});

session.subscribeToEvent("back", function() {
      window.history.back();
});
