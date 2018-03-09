const fr = require('face-recognition');
const path = require('path');
const detector = fr.FaceDetector();

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
console.log("post mahesh");

console.log("Loading ambareesh images ");
const msimg1 = fr.loadImage('pictures/ambareesh.jpg');
const msimg2 = fr.loadImage('pictures/ambareesh1.jpg');

const vimg5  = detector.detectFaces(msimg1);
const vimg6  = detector.detectFaces(msimg2);
let ambareesh_faces = [] ;
ambareesh_faces = vimg5.concat(vimg6);

console.log(" Post ambareesh faces");
const recognizer = fr.FaceRecognizer();

const numJitters = 15
recognizer.addFaces(gokul_faces, 'Gokul Keshav',numJitters);
recognizer.addFaces(mahesh_faces, 'Maheshwaran Munusamy',numJitters);
recognizer.addFaces(ambareesh_faces, 'Ambareesh Ravi',numJitters); 


console.log("running prediction");
const msimg3 = fr.loadImage('pictures/sample1.jpg');

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
console.log(predictions);
