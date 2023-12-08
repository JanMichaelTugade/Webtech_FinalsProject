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
            updateCurrentVideo(data.videos, data.elapsedTime, data.queueDuration);
        })
        .catch(error => console.error('Error:', error));
}

function updateCurrentVideo(videos, elapsedTimestampInSeconds, queueDuration) {
    const videoPlayer = document.getElementById('videoPlayer');

    // Flag to check if any video is found to play
    let videoFound = false;

    // Iterate through the videos to find the current video
    for (const video of videos) {
        const videoDuration = video.duration;

        if (elapsedTimestampInSeconds > videoDuration) {
            elapsedTimestampInSeconds -= videoDuration;
        } else {
            // Check if the current video path is different from the video path in the loop
            console.log(currentVideoPath);
            console.log(video.path);
            if (currentVideoPath !== video.path) {
                // Update the video
                videoPlayer.src = video.path;
                videoPlayer.currentTime = elapsedTimestampInSeconds;
                videoPlayer.play();

                // Update the current video path
                currentVideoPath = video.path;
            }

            // Set the flag to indicate that a video is found
            videoFound = true;

            // Break the loop, as we have found the current video
            break;
        }
    }

    // If no video is found and the elapsed duration exceeds the total duration of the queue
    if (!videoFound && elapsedTimestampInSeconds > queueDuration) {
        // Update the video path to blank
        videoPlayer.src = "";
        // Update the current video path to blank
        currentVideoPath = "";
    }
}