document.addEventListener("DOMContentLoaded", function() {
    checkForVideoUpdate();
    setInterval(checkForVideoUpdate, 1000);

    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.addEventListener('play', function() {
        if (elapsedTimestampInSeconds !== undefined) {
            videoPlayer.currentTime = currentTimeStamp;
        }
    });
});

let currentTimeStamp;
let currentVideoPath = ''; 
let totalElapsedTime;

function displayStreamEndedMessage() {
    const videoPlayer = document.getElementById('videoPlayer');
    const noVideoMessage = document.getElementById('noVideoMessage');
    const imageElement = document.getElementById('ImagePlaceholder');

    videoPlayer.src = "";
    imageElement.src = '../../Resources/EndingStreamImg.jpg';
    noVideoMessage.style.display = 'flex';
}

function checkForVideoUpdate() {
    
    // Check if stream has ended
    const currentHour = new Date().getHours();
    if (currentHour >= 24) {    // Change the time to 18 (6PM)
        displayStreamEndedMessage();
        console.log(currentHour)
        return;
    }
    
    fetch('php/Model/get_next_content.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                return;
            }
            
            elapsedTimestampInSeconds = data.elapsedTime;
            totalElapsedTime = data.elapsedTime;
            console.log("Videos: ",data.videos);
            console.log("Elapesd Time: ",data.elapsedTime);
            console.log("Queue Duration: ",data.queueDuration);
            updateCurrentVideo(data.videos, data.elapsedTime, data.queueDuration);
            
        })
        .catch(error => console.error('Error:', error));
}

function updateCurrentVideo(videos, elapsedTimestampInSeconds, queueDuration) {
    const videoPlayer = document.getElementById('videoPlayer');
    const noVideoMessage = document.getElementById('noVideoMessage');
    const imageElement = document.getElementById('ImagePlaceholder');

    let videoFound = false;

    for (const video of videos) {
        const videoDuration = video.duration;

        if (elapsedTimestampInSeconds >= videoDuration) {
            elapsedTimestampInSeconds -= videoDuration;
        } else {
            if (currentVideoPath !== video.path) {
                videoPlayer.src = video.path;
                videoPlayer.currentTime = elapsedTimestampInSeconds;
                videoPlayer.play();

                currentVideoPath = video.path;
            }
            videoFound = true;
            noVideoMessage.style.display = 'none';
            break;
        }
        
    }
    currentTimeStamp = elapsedTimestampInSeconds;
    // If no video found
    if (!videoFound && totalElapsedTime > queueDuration) {
        console.log("Elasped Time", elapsedTimestampInSeconds);
        console.log("Total Queue Duration", queueDuration);
        videoPlayer.src = "";
        currentVideoPath = "";
        imageElement.src = '../Resources/NoVideoFound-Furina.jpg';
        noVideoMessage.style.display = 'flex';
    }
}