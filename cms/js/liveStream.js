var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
const video = document.querySelector('#myVidPlayer');

// Set canvas display to none initially
canvas.style.display = "none";

var w, h;

function snapshot() {
context.fillRect(0, 0, w, h);
context.drawImage(video, 0, 0, w, h);
canvas.style.display = "block";
}

window.navigator.mediaDevices.getUserMedia({ video: true, audio: true })
.then(stream => {
    video.srcObject = stream;
    video.onloadedmetadata = (e) => {
        video.play();
        w = video.videoWidth;
        h = video.videoHeight;
        canvas.width = w;
        canvas.height = h;
    };
})
.catch(error => {
    console.error('Error accessing media devices:', error);
    alert('There was an error accessing the camera or microphone. Please check permissions and try again.');
});