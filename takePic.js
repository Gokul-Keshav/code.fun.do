var NodeWebcam = require( "node-webcam" );
var opts = {
 
    width: 1280,
 
    height: 720,
 
    quality: 100,
 
    delay: 0, 
 
    saveShots: true,
 
    output: "jpeg",
 
    device: false,
 
    callbackReturn: "location",
 
    verbose: false
 
};

var Webcam = NodeWebcam.create( opts );

//Webcam.capture( "test_picture", function( err, data ) {} );
  
NodeWebcam.capture( "pictures/sample1", opts, function( err, data ) {
 
	if(!err)
		console.log("Image created");
	else
		console.log(err);
});