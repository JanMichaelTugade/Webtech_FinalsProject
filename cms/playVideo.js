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
    imageElement.src = '../Resources/EndingStreamImg.jpg';
    noVideoMessage.style.display = 'flex';
}

function checkForVideoUpdate() {
    
    // Check if stream has ended
    const currentHour = new Date().getHours();
    if (currentHour >= 23) {    // Change the time to 18 (6PM)
        displayStreamEndedMessage();
        return; // Stop further execution
    }
    
    // Fetch current time and video queue data
    fetch('get_next_content.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                return;
            }
            
            elapsedTimestampInSeconds = data.elapsedTime;
            totalElapsedTime = data.elapsedTime;
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
            currentTimeStamp = elapsedTimestampInSeconds;
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
