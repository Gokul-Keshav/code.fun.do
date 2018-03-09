var express = require('express');
const fr = require('face-recognition');
const path = require('path');
const detector = fr.FaceDetector();
var NodeWebcam = require( "node-webcam" );
var app = express();
var bodyParser = require('body-parser');
var users_so_far =[];
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//Initial images
console.log("Loading  gokul images");
//console.log(path.resolve('pictures/virat1.jpg'));
const img1 = fr.loadImage('pictures/gokul.jpg');
const img2 = fr.loadImage('pictures/gokul1.jpg');

const vimg1  = detector.detectFaces(img1);
const vimg2  = detector.detectFaces(img2);

let  gokul_faces = [];
gokul_faces = vimg1.concat(vimg2);

console.log("Loading  mahesh images ");
const smimg1 = fr.loadImage('pictures/mahesh.jpg');
const smimg2 = fr.loadImage('pictures/mahesh1.jpg');

const vimg3  = detector.detectFaces(smimg1);
const vimg4  = detector.detectFaces(smimg2);

//const smith_faces = [ vimg3, vimg4] ;
let mahesh_faces = [];
mahesh_faces = vimg3.concat(vimg4);
console.log("Post mahesh");
/*
console.log("Loading ambareesh images ");
const msimg1 = fr.loadImage('pictures/ambareesh.jpg');
const msimg2 = fr.loadImage('pictures/ambareesh1.jpg');

const vimg5  = detector.detectFaces(msimg1);
const vimg6  = detector.detectFaces(msimg2);
let ambareesh_faces = [] ;
ambareesh_faces = vimg5.concat(vimg6);

console.log("Post ambareesh faces");

*/
const recognizer = fr.FaceRecognizer();

const numJitters = 15
recognizer.addFaces(gokul_faces, 'gokulkeshav7@gmail.com',numJitters);
recognizer.addFaces(mahesh_faces, 'mahesh1698@gmail.com',numJitters);
//recognizer.addFaces(ambareesh_faces, 'ambareesh1205@gmail.com',numJitters); 

users_so_far.push("gokulkeshav7@gmail.com");
users_so_far.push("mahesh1698@gmail.com");
//users_so_far.push("ambareesh1205@gmail.com");
console.log(users_so_far);

app.get('/index.html',function(req,res){
res.sendFile(__dirname+"/"+"Login_v10/index.html");
});



app.get('/processPost', urlencodedParser, function (req, res) {


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
  
NodeWebcam.capture( "pictures/train", opts, function( err, data ) {
 
  if(!err){
    console.log("Image created");
    console.log("processing image");
    //the prediction part

    console.log("running prediction");
    const msimg3 = fr.loadImage('pictures/train.jpg');

    const faceImage = detector.detectFaces(msimg3);
    if ( Array.isArray(faceImage)) {
        console.log("is array");
    }
    else {
        console.log("not a array");
    }

    const predictionsAll = recognizer.predict(faceImage[0]);
    console.log(predictionsAll);
    console.log("best prediction");

    const predictions = recognizer.predictBest(faceImage[0]);
    console.log(predictions["className"]);

    if(parseFloat(predictions["distance"])>0.50)
      res.end("Algo thinks you as a new user");
    else
    res.end(predictions["className"]);

    


  }
  else
    console.log(err);
});

});




app.post('/newUser', urlencodedParser, function (req, res) {

console.log('body: ' + JSON.stringify(req.body));

var got_name =String(req.body.username);
res.end(got_name)
console.log(req.body.username);

var flag = false;

for(var i=0;i<users_so_far.length;i++){

if(users_so_far[i] == got_name)
  flag = true;

}
if(flag == false){
  console.log("new user")

  users_so_far.push(got_name)

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
  
NodeWebcam.capture( "pictures/train1", opts, function( err, data ) {
 
  if(!err){
    console.log("second image created");
    console.log("Training for new user");

    const newUser1 = fr.loadImage('pictures/train.jpg');
    const newUser2 = fr.loadImage('pictures/train1.jpg');

    const vimNewUser1  = detector.detectFaces(newUser1);
    const vimNewUser2  = detector.detectFaces(newUser2);
    let new_faces = [] ;
    new_faces = vimNewUser1.concat(vimNewUser2);

    console.log("Feeding new faces");

    recognizer.addFaces(new_faces, got_name ,numJitters);
    
    console.log("New user trained");



  }
  else
    console.log(err);
});




}
else{

  console.log("old user")
  res.end("You are recognized as an old user");

  //res.send("You are recognized as old user");

}



});



var server = app.listen(1997,function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log("server running at port 1997 ");
});