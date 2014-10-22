/**
 * New node file
 */
window.onload=function(){
	var blockSize=10;
	for (var i=0; i< 25;i++){
		for(var y=0; y<24; y++){
	
	  var c = document.getElementById("myCanvas");
	  var context = c.getContext("2d");

	  context.fillStyle = "#FF0000";

	  context.fillRect(i*blockSize, y+1, blockSize, blockSize);
	}
	}
};