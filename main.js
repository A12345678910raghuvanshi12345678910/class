video = "";
status_js = "";
objects = [];
function preload() {
    video = createVideo("video.mp4");
    video.hide();
}
function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}
function draw() {
    image(video,0,0,480,380);
    if (status_js != "" ) {
        objectDetector.detect(video, gotResults);
        for (i = 0; i<objects.length; i++) {
            document.getElementById("status").innerHTML = "status: objects detected ";
            document.getElementById("number_of_objects").innerHTML = "number of objects detected are " + objects.length;
            fill("#8300FF");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + "  " + percent +  "  %  ", objects[i].x + 15 ,objects[i].y + 15);
            nofill();
            stroke("#8300FF");
            rect(objects[i].x, objects[i].y , objects[i].width , objects[i].height);
        }
    } 
 function gotResults(error, results) {
    if(error){
    console.log(error);
}
else{
    console.log(results);
    objects = results;

}

 }

}
function start() {
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "status: Detecting objectes";
}
function modelLoaded() {
    console.log("model loaded");
    status_js = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
