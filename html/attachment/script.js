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
    var len_list_attachment = x[1].length - 1;
    img_database = [["text","text.png"], ["audio","audio.png"], ["image","image.png"], ["video","video.png"]]

    //var text_num = "Text file: "+ x[1][0];
    //var audio_num = "Audio file: " + x[1][1];
    //var image_num = "Image file: " + x[1][2];
    //var video_num = "Video file: " + x[1][3];
    var unsupport_num = "***Unsupported format file: " + x[1][4] + " ***";
    
    var div1 = document.createElement("div");
    div1.className = "responsive";

    for (var i = 0; i < len_list_attachment ; i++)
	{
    if(x[1][i] != "0") {

  		var div2 = document.createElement("div");
      		div2.className = "gallery";

  		var div3 = document.createElement("div");
  		div3.className = "desc";

		switch(i) {
		    case 0:
			div3.innerHTML =  "Teksti: " + String(x[1][i]);
			break;
		    case 1:
			div3.innerHTML =  "äänitiedosto: " + String(x[1][i]);
			break;
		    case 2:
			div3.innerHTML =  "Kuva: " + String(x[1][i]);
			break;
		    case 3:
			div3.innerHTML =  "Video: " + String(x[1][i]);
			break;
		    default:
			div3.innerHTML =  "Unidentify"
		}

   		var img = document.createElement("img");
  		img.src = img_database[i][1];

		switch(i) {
		    case 0:
			img.setAttribute('onclick','show_Text();');
    			img.onclick = function() {show_Text();};
			break;
		    case 1:
			img.setAttribute('onclick','show_Audio();');
    			img.onclick = function() {show_Audio();};
			break;
		    case 2:
			img.setAttribute('onclick','show_Image();');
    			img.onclick = function() {show_Image();};
			break;
		    case 3:
			img.setAttribute('onclick','show_Video();');
    			img.onclick = function() {show_Video();};
			break;
		    default:
			div3.innerHTML =  "Unidentify"
		}


      		div2.appendChild(img);
  		div2.appendChild(div3);

  		div1.appendChild(div2);
  		document.body.appendChild(div1);
  }
  else { continue; }

	}

    //document.getElementById("text_num").innerHTML = String(text_num);
    //document.getElementById("audio_num").innerHTML = String(audio_num);
    //document.getElementById("image_num").innerHTML = String(image_num);
    //document.getElementById("video_num").innerHTML = String(video_num);
    //document.getElementById("unsupport_num").innerHTML = String(unsupport_num);
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

function show_Video(){
// Subscribe to ALMemory Service
session.service("ALMemory").then(function(ALMemory) {
  // document.getElementById('typed').innerHTML = "ALMemory proxy subscription successful!";

    ALMemory.raiseEvent('choose_attachment',"video");
});
}

function Stop(){
// Subscribe to ALMemory Service
session.service("ALMemory").then(function(ALMemory) {
  // document.getElementById('typed').innerHTML = "ALMemory proxy subscription successful!";

    ALMemory.raiseEvent('choose_attachment',"stop");
});
}
