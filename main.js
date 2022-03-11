song1hp = "";
song1ju = "";

lwy = 0;
lwx = 0;

rwy = 0;
rwx = 0;

lws = 0;
rws =0;

hp_status ="";
ju_status ="";

function setup(){
    canvas = createCanvas(450 ,390);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", getPoses);
}

function draw(){
    image(video , 0 , 0 ,450 , 390)

    hp_status = song1hp.isPlaying();
    ju_status = song1ju.isPlaying();

    if(lws>0.2){
        fill("red");
        stroke("red");
        circle(lwx , lwy , 20);
        song1ju.stop();
        if(hp_status == false){
            song1hp.play();
            document.getElementById("song").innerHTML = "Playing = Harry potter theme song"
        }
    }
    if(rws>0.2){
        fill("red");
        stroke("red");
        circle(rwx , rwy , 20);
        song1hp.stop();
        if(ju_status == false){
            song1ju.play();
            document.getElementById("song").innerHTML = "Playing = Jugnu song"
        }
    }

}
function preload(){
    song1hp = loadSound("music.mp3");
    song1ju = loadSound("jugnu.mp3");
}
function sonply(){
    song1hp.play();
}
function getPoses(results) {
    if (results.length > 0) {
        console.log(results);
        lwx = results[0].pose.leftWrist.x;
        lwy = results[0].pose.leftWrist.y;
        console.log("left wrist x = " + lwx + "left wrist y = " + lwy)

        rwx = results[0].pose.rightWrist.x;
        rwy = results[0].pose.rightWrist.y;
        console.log("right wrist x = " + rwx + "right wrist y = " + rwy)

        lws = results[0].pose.keypoints[9].score;
        console.log(lws);
        rws = results[0].pose.keypoints[10].score;
        console.log(rws);
    }

}
function modelLoaded() {
    console.log("modal loaded");
}
function sonsly(){
    song1hp.pause();
    song1ju.pause();
}
