// global session
var session = new QiSession(function(session) {
                // document.getElementById('typed').innerHTML = "Connection esterblished!";
              }, function() {
                // document.getElementById('typed').innerHTML = "Could not connect to the robot";
              });


// Subscribe to ALMemory Service
session.service("ALMemory").then(function(ALMemory) {
  // document.getElementById('typed').innerHTML = "ALMemory proxy subscription successful!";
  ALMemory.getData('list_text').then(function(list_text){

    var x = list_text;
    // number of audio file	
    var len_list_text = x.length;
    //ul element

   for (var i = 0; i < len_list_text ; i++)
	{       
		var div1 = document.createElement("div");  
    		div1.className = "responsive";

		var div2 = document.createElement("div");  
    		div2.className = "gallery";
		
		var div3 = document.createElement("div");  
		div3.className = "desc";
		var name = String(x[i]);
		div3.innerHTML = name;

 		var img = document.createElement("img");
		img.src = "text.png";
		img.setAttribute('onclick', 'javascript:myFunction(\'' + name + '\')');
		
    		div2.appendChild(img);
		div2.appendChild(div3);
		div1.appendChild(div2);
		document.body.appendChild(div1);

	}
  });

});

function myFunction(name) {
	// Subscribe to ALMemory Service
	session.service("ALMemory").then(function(ALMemory) {
  	// document.getElementById('typed').innerHTML = "ALMemory proxy subscription successful!";

    	ALMemory.raiseEvent('choose_text',String(name));
});
}





