song1="";
song2="";
scoreLeftWrist = 0;
scoreRightWrist = 0;
status = "";
status1 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw()
{
    image(video,0,0,600,500);
    fill("#CBC3E3");
    stroke("#CBC3E3");

    status = song1.isPlaying();

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,10);
        song2.stop();

        if(status == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "Song = Harry Potter Theme Song" ;
        }
    }
    
    status1 = song2.isPlaying();

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,10);
        song1.stop();

        if(status1 == false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "Song = Peter Pan Song" ;
        }
    }
}

function modelLoaded()
{
    console.log("PoseNet Is Initialized!");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        results[0].pose.keypoints[10].scoreLeftWrist;
        results[0].pose.keypoints[9].scoreRightWrist;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
}

function play()
{
    song1.play();
    song2.play();
}