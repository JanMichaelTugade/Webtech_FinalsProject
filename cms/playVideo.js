document.addEventListener("DOMContentLoaded", function () {
    checkTimeAndPlay();
});

const startTime = new Date();
startTime.setHours(23, 0, 0); // Set the start time to 8 AM
const endTime = new Date();
endTime.setHours(1, 0, 0); // Set the end time to 6 PM

const videoPlayer = document.getElementById('videoPlayer');

// Function to play the next content from the queue
function playNextContent(content) {
    
    const contentPath = content.path;
    const contentType = content.type;
    const contentDuration = content.duration; // Assuming the duration is in seconds
  
    // Set the source and type of the video element
    videoPlayer.src = contentPath;
    videoPlayer.type = contentType;
  
    // Calculate the remaining time until the content finishes playing
    const currentTime = new Date();
    const endTime = new Date(currentTime.getTime() + (contentDuration * 1000)); // Convert duration to milliseconds and add to current time
    const remainingTime = Math.floor((endTime - currentTime) / 1000); // Convert to seconds
  
    // Set the remaining time as the duration attribute of the video element
    videoPlayer.setAttribute('duration', remainingTime);
  
    // Play the video
    videoPlayer.play();
}
  
  // Function to check the current time and play the content accordingly
  function checkTimeAndPlay() {
    const currentTime = new Date();
    if (currentTime >= startTime || currentTime <= endTime) {
        
      // Make an AJAX request to get the next content from the queue
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'get_next_content.php');
      xhr.onload = function () {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          if (response.status === 'success') {
            const content = response.content;
            playNextContent(content);
          } else {
            console.log('No more content in the queue.');
          }
        } else {
          console.log('Error occurred while getting the next content.');
        }
      };
      xhr.send();
    } else {
      console.log('Playback time not within the specified range.');
    }
  }