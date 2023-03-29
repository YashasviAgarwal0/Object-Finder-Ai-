s_status = "";
objects = [];

function preload()
{
    
}

function setup()
{
   canvas = createCanvas(380, 380);
   canvas.center();
   video = createCapture(VIDEO);
   video.size(380, 380);
   video.hide();
}

function draw()
{
   image(video, 0, 0, 380, 380);

   if(s_status!= "")
    {
        cc.detect(video, gotResults);
        for(var i=0;i<objects.length;i++)
        {
           document.getElementById('status').innerHTML = 'Status : Objects Detected';
           ttt = document.getElementById('on').value;
    if(objects[i].label==ttt)
    {
        document.getElementById('object_status').innerHTML = objects[i].label + ' detected.'
    }
    else
    {
        document.getElementById('object_status').innerHTML = ttt + ' not detected.'
    }
           fill('red');
           per = Math.floor(objects[i].confidence *100);
           t = objects[i].label + " " + per + " % ";
           text(t, objects[i].x+15, objects[i].y+15);
           noFill();
           stroke('red');
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function startButton()
{
    cc = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById('status').innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log('Model is Loaded!');
    s_status = true;
}

function gotResults(error, results)
{
    if(error)
    {
       console.log(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}