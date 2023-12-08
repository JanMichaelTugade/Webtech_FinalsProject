document.addEventListener("DOMContentLoaded", function() {
  // Fetch and play the current video on page load
  checkForVideoUpdate();

  // Set up a periodic checker (every second in this example)
  setInterval(checkForVideoUpdate, 1000); // 1000 milliseconds = 1 second
});

let currentVideoPath = ''; // Track the current video path

function checkForVideoUpdate() {
  // Fetch current time and video queue data
  fetch('get_next_content.php')
      .then(response => response.json())
      .then(data => {
          if (data.error) {
              console.error('Error:', data.error);
              return;
          }

          // Check if the returned video is different from the current video
          if (data.videos.length > 0 && data.videos[0].path !== currentVideoPath) {
              // Update the current video and play it
              currentVideoPath = data.videos[0].path;
              playVideo(data.videos, data.elapsedTime);
          }
      })
      .catch(error => console.error('Error:', error));
}

function playVideo(videos, elapsedTimestampInSeconds) {
    const videoPlayer = document.getElementById('videoPlayer');

    // Flag to check if any video is found to play
    let videoFound = false;

    // Iterate through the videos to find the current video
    for (const video of videos) {
        const videoDuration = video.duration; // Duration is already in seconds

        // Check if the elapsed time is greater than the current video's duration
        if (elapsedTimestampInSeconds > videoDuration) {
            // Subtract the duration of the current video from the elapsed time
            elapsedTimestampInSeconds -= videoDuration;
        } else {
            // Set the start time and play the video
            videoPlayer.src = video.path;
            videoPlayer.currentTime = elapsedTimestampInSeconds;
            videoPlayer.play();
            
            // Set the flag to indicate that a video is found
            videoFound = true;
            break;
        }
    }

    // If no video is found, display a message or perform an action
    if (!videoFound) {
        noVideoMessage.style.display = 'block';
    }
}