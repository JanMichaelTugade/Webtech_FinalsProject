document.addEventListener("DOMContentLoaded", function() {
    checkForVideoUpdate();
    setInterval(checkForVideoUpdate, 500);

    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.addEventListener('play', function() {
        if (elapsedTimestampInSeconds !== undefined) {
            videoPlayer.currentTime = currentTimeStamp;
        }
    });
});

var currentTimeStamp;
let currentVideoPath = ''; 
let totalElapsedTime;

function displayStreamEndedMessage() {
    const videoPlayer = document.getElementById('videoPlayer');
    const noVideoMessage = document.getElementById('noVideoMessage');
    const imageElement = document.getElementById('ImagePlaceholder');

    videoPlayer.src = "";
    imageElement.src = '../../../Resources/EndingStreamImg.jpg';
    noVideoMessage.style.display = 'flex';
}

function checkForVideoUpdate() {
    // Check if stream has ended
    const currentHour = new Date().getHours();
    if (currentHour >= 23) {    // Change the time to 18 (6 PM)
        displayStreamEndedMessage();
        return;
    }

    // Get the current script's path
    const scriptPath = window.location.pathname;

    // Construct the URL for get_next_content.php based on the script's location
    const nextContentUrl = scriptPath.includes('cms/php/Model') ?
        'get_next_content.php' :
        '../cms/php/Model/get_next_content.php';

    // Perform the fetch using the dynamic URL
    fetch(nextContentUrl)
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
        } else {
            const videoPath = getVideoPath(video.path);

            if (currentVideoPath !== videoPath) {
                videoPlayer.src = videoPath;
                videoPlayer.currentTime = elapsedTimestampInSeconds;
                videoPlayer.play();

                currentVideoPath = videoPath;
            }
            videoFound = true;
            noVideoMessage.style.display = 'none';
            break;
        }
    }

    currentTimeStamp = elapsedTimestampInSeconds;

    // If no video found
    if (!videoFound && totalElapsedTime > queueDuration) {
        videoPlayer.src = "";
        currentVideoPath = "";
        imageElement.src = '../Resources/NoVideoFound-Furina.jpg';
        noVideoMessage.style.display = 'flex';
    }
}

function getVideoPath(relativePath) {
    // Get the current script's path
    const scriptPath = window.location.pathname;

    // If the script is in 'cms/php/Model', adjust the relative path
    if (scriptPath.includes('viewer/')) {
        return '../cms/' + relativePath;
    }

    // Otherwise, return the relative path as it is
    return relativePath;
}
