// global session
var session = new QiSession(function(session) {
                // document.getElementById('typed').innerHTML = "Connection esterblished!";
              }, function() {
                // document.getElementById('typed').innerHTML = "Could not connect to the robot";
              });


// Subscribe to ALMemory Service
session.service("ALMemory").then(function(ALMemory) {
  // document.getElementById('typed').innerHTML = "ALMemory proxy subscription successful!";
  ALMemory.getData('list_audio').then(function(list_audio){

    var x = list_audio;
    // number of audio file
    var len_list_audio = x.length;
    //ul element
    var list = document.getElementsByTagName("UL")[0];
   for (var i = 0; i < len_list_audio ; i++)
	{
    		var li = document.createElement("li");  
    		li.className = "audio";

    		var a = document.createElement("a");
		var name = String(x[i]);
    		a.innerHTML = name;
		a.href = "#"
		a.setAttribute('onclick', 'javascript:MyFunction(\'' + name + '\')');
    		li.appendChild(a);
    		list.appendChild(li);
	}
  });

});

function MyFunction(name){
// Subscribe to ALMemory Service
session.service("ALMemory").then(function(ALMemory) {
  // document.getElementById('typed').innerHTML = "ALMemory proxy subscription successful!";

    ALMemory.raiseEvent('choose_audio',String(name));
});
}
