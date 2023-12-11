let elapsedTimestampInSeconds;

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
    imageElement.src = '../../../../Resources/EndingStreamImg.jpg';
    noVideoMessage.style.display = 'flex';
}

function playVideo(videoPath, startTime) {
    const videoPlayer = document.getElementById('videoPlayer');
    if (videoPlayer.paused || videoPlayer.currentTime === 0) {
        videoPlayer.src = videoPath;
        videoPlayer.currentTime = startTime;
        videoPlayer.play();
    }
    // Additional logic for handling video playback if needed
}

function checkForVideoUpdate() {
    const currentTime = new Date();
    const userEndTime = document.getElementById('endTime').value;
    const userStartTime = document.getElementById('startTime').value;

    const [endHour, endMinute, endSecond] = userEndTime.split(':');
    currentTime.setHours(parseInt(endHour), parseInt(endMinute), parseInt(endSecond || 0));

    const [startHour, startMinute, startSecond] = userStartTime.split(':');
    const startTimestamp = new Date().setHours(parseInt(startHour), parseInt(startMinute), parseInt(startSecond || 0));

    const currentTimestamp = currentTime.getTime();
    const nowTimestamp = new Date().getTime();

    if (currentTimestamp <= nowTimestamp) {
        displayStreamEndedMessage();
        return;
    }

    // Check if the current time is after the start time to begin playing the video
    if (nowTimestamp >= startTimestamp && nowTimestamp < currentTimestamp) {
        // Fetch the videos from the queue and start playing the first one
        const scriptPath = window.location.pathname;
        const nextContentUrl = scriptPath.includes('cms/php/Model') ?
            'get_next_content.php' :
            '../cms/php/Model/get_next_content.php';
    
        fetch(nextContentUrl)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Error:', data.error);
                    return;
                }
    
                if (data.videos.length > 0) {
                    // Start playing the first video in the queue
                    const firstVideo = data.videos[0];
                    playVideo(firstVideo.path, firstVideo.startTimeInSeconds);
                }
            })
            .catch(error => console.error('Error:', error));
    }
}

function isEndTimeSet() {
    const endTimeInput = document.getElementById('endTime'); // Replace 'endTime' with your actual input field ID
    
    // Check if the input field has a value
    if (endTimeInput.value.trim() !== '') {
        return true;
    } else {
        // Value is not set
        return false;
    }
}

document.getElementById('setStartTime').addEventListener('click', function() {
    setTimeFormat('startTime');
});

document.getElementById('setEndTime').addEventListener('click', function() {
    setTimeFormat('endTime');
});

// function checkForVideoUpdate() {
//     // Check if stream has ended
//     const currentHour = new Date().getHours();
//     if (currentHour >= 23) {    // Change the time to 18 (6 PM)
//         displayStreamEndedMessage();
//         return;
//     }

//     // Get the current script's path
//     const scriptPath = window.location.pathname;

//     // Construct the URL for get_next_content.php based on the script's location
//     const nextContentUrl = scriptPath.includes('cms/php/Model') ?
//         'get_next_content.php' :
//         '../cms/php/Model/get_next_content.php';

//     // Perform the fetch using the dynamic URL
//     fetch(nextContentUrl)
//         .then(response => response.json())
//         .then(data => {
//             if (data.error) {
//                 console.error('Error:', data.error);
//                 return;
//             }

//             elapsedTimestampInSeconds = data.elapsedTime;
//             totalElapsedTime = data.elapsedTime;

//             updateCurrentVideo(data.videos, data.elapsedTime, data.queueDuration);

//         })
//         .catch(error => console.error('Error:', error));
// }

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
