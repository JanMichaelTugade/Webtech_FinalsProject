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

document.getElementById('saveTimes').addEventListener('click', function() {
    var startTime = document.getElementById('startTime').value;
    var endTime = document.getElementById('endTime').value;
    
    setStartEndTime(startTime, endTime);
});

var endTime = null;
var currentTimeStamp;
var currentVideoPath = ''; 
var totalElapsedTime;

function getEndTime() {
    return $.ajax({
      url: '../cms/php/Model/getEndTime.php',
      type: 'GET',
      dataType: 'text'
    });
}

function setStartEndTime(startTime, endTime) {
    const data = {};
  
    if (startTime !== null && startTime.trim() !== '') {
      data.startTime = startTime;
    }
  
    if (endTime !== null && endTime.trim() !== '') {
      data.endTime = endTime;
    }

    if (Object.keys(data).length === 0) {
      console.log('Start and end times are empty. Skipping update.');
      return;
    }
  
    $.ajax({
      url: '../cms/php/Model/setStartEndTime.php',
      type: 'POST',
      data: data,
      success: function(response) {
        console.log('Start and end times updated successfully');
      },
      error: function(error) {
        console.error('Error updating start and end times:', error);
      }
    });
  }

function displayStreamEndedMessage() {
    const videoPlayer = document.getElementById('videoPlayer');
    const noVideoMessage = document.getElementById('noVideoMessage');
    const imageElement = document.getElementById('ImagePlaceholder');

    videoPlayer.src = "";
    imageElement.src = '../../Resources/EndingStreamImg.jpg';
    noVideoMessage.style.display = 'flex';
}

function checkForVideoUpdate() {

    getEndTime().done(function(response) {
        endTime = response;
    }).fail(function(error) {
        console.error('Error fetching end time:', error);
    });
    const currentDateTime = new Date();
    const currentTime = currentDateTime.toLocaleTimeString('en-US', { hour12: false });

    if (currentTime >= endTime) {

        displayStreamEndedMessage();
        console.log(currentHour)
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

function getVideoPath(relativePath) {
    // Get the current script's path
    const scriptPath = window.location.pathname;

    if (scriptPath.includes('viewer/')) {
        return '../cms/' + relativePath;
    }
    return relativePath;
}