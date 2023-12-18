
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

if (document.getElementById('saveTimes')) {
    document.getElementById('saveTimes').addEventListener('click', function() {
      var startTime = document.getElementById('startTime').value;
      var endTime = document.getElementById('endTime').value;
      
      setStartEndTime(startTime, endTime);
    });
  }

var endTime = null;
var currentTimeStamp;
var currentVideoPath = ''; 
var totalElapsedTime;
var tracknameElement = document.getElementById('trackname');

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

    if(tracknameElement) {
        tracknameElement.textContent = `Stream has Ended`;
    }
    videoPlayer.src = "";
    imageElement.src = '../Resources/EndingStreamImg.png';
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
        return;
    }

    
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
                videoPlayer.src = getVideoPath(video.path);
                videoPlayer.currentTime = elapsedTimestampInSeconds;
                videoPlayer.play();

                currentVideoPath = video.path;
                
               
                const videoName = getVideoName(currentVideoPath);
                if (tracknameElement) {
                    tracknameElement.textContent = `Currently Playing: ${videoName}`;
                    tracknameElement.classList.add('trackname-style');
                }
            }
            videoFound = true;
            noVideoMessage.style.display = 'none';
            break;
        }
        
    }
    currentTimeStamp = elapsedTimestampInSeconds;
    
    if (!videoFound && totalElapsedTime > queueDuration) {
        if (tracknameElement) {
            tracknameElement.textContent = `No video is currently playing`;
        }
        videoPlayer.src = "";
        currentVideoPath = "";
        imageElement.src = '../Resources/EndingStreamImg.png';
        noVideoMessage.style.display = 'flex';
    }
}

function getVideoPath(relativePath) {
    
    const scriptPath = window.location.pathname;

    if (scriptPath.includes('viewer/')) {
        return '../cms/' + relativePath;
       
    }
    return relativePath;
}

function getVideoName(currentVideoPath) {
    
    const cleanPath = currentVideoPath.replace('videos/', '');
    return cleanPath;
}
