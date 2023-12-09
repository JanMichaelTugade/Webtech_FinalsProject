document.addEventListener('DOMContentLoaded', function () {
    var videoPlayer = document.getElementById("videoPlayer");
    var startLiveBtn = document.getElementById("startLivebtn");
    var endLiveBtn = document.getElementById("endLivebtn");
  
    var liveStreamContentID = 8; // Variable to store content ID associated with the live stream
    var liveStreamStartTime = null; // Variable to store the start time of the live stream
  
    console.log('Event listeners attached successfully.');
  
    startLiveBtn.addEventListener('click', function () {
      console.log('Start Live button clicked.');
      // Record the start time of the live stream
      liveStreamStartTime = new Date().getTime();
  
      // Request access to camera and microphone
      window.navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          videoPlayer.srcObject = stream;
          videoPlayer.play();
        })
        .catch(error => {
          console.error('Error accessing media devices:', error);
          alert('There was an error accessing the camera or microphone. Please check permissions and try again.');
        });
    });
  
    endLiveBtn.addEventListener('click', function () {
      videoPlayer.pause();
      console.log('End Live button clicked.');
      
      // Stop the video stream
      var stream = videoPlayer.srcObject;
      var tracks = stream.getTracks();
  
      tracks.forEach(track => track.stop());
  
      videoPlayer.srcObject = null;
  
      // Calculate the duration of the live stream
      var liveStreamDuration = null;
      if (liveStreamStartTime !== null) {
        liveStreamDuration = Math.floor((new Date().getTime() - liveStreamStartTime) / 1000); // Duration in seconds
      }
  
      // Assuming you have a function to update the database with live stream duration
      updateDatabaseWithLiveStreamDuration(liveStreamContentID, liveStreamDuration);
    });
  
    // Function to update the database with live stream duration
    function updateDatabaseWithLiveStreamDuration(contentID, duration) {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'php/Model/save_live_duration.php');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onload = function () {
          if (xhr.status === 200) {
              console.log(xhr.responseText);
          }
      };
      xhr.send('contentID=' + encodeURIComponent(contentID) + '&duration=' + encodeURIComponent(duration));
      populateQueueTable();
      videoPlayer.currentTime = currentTimeStamp;
      videoPlayer.play();
    }
  });