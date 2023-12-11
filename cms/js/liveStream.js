document.addEventListener("DOMContentLoaded", function () {
  var videoPlayer = document.getElementById("videoPlayer");
  var startLiveBtn = document.getElementById("startLivebtn");
  var endLiveBtn = document.getElementById("endLivebtn");
  endLiveBtn.disabled = true;
  var liveStreamContentID = 8;
  var liveStreamStartTime = null;
  var socket = null;

  console.log("Event listeners attached successfully.");

  startLiveBtn.addEventListener("click", function () {
    console.log("Start Live button clicked.");
    liveStreamStartTime = new Date().getTime();

    window.navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoPlayer.srcObject = stream;
        videoPlayer.play();

        socket = new WebSocket("ws:localhost:8080");

        socket.addEventListener("open", function (event) {
          console.log("WebSocket connection established", event);

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = videoPlayer.videoWidth;
          canvas.height = videoPlayer.videoHeight;

          const sendCanvasData = () => {
            if (socket && socket.readyState === WebSocket.OPEN) {
              ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
              const imageData = canvas.toDataURL();
              const message = JSON.stringify({
                type: "canvasData",
                data: imageData,
              });
              socket.send(message);
              requestAnimationFrame(sendCanvasData);
            }
          };
          sendCanvasData();
        });
        socket.addEventListener("error", function (event) {
          console.error("WebSocket error:", event);
        });
        socket.addEventListener("close", function (event) {
          console.log("WebSocket connection closed");
        });
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
        alert(
          "There was an error accessing the camera or microphone. Please check permissions and try again."
        );
      });

    startLiveBtn.disabled = true;
    endLiveBtn.disabled = false;
  });

  endLiveBtn.addEventListener("click", function () {
    videoPlayer.pause();
    console.log("End Live button clicked.");
    if (socket && socket.readyState === WebSocket.OPEN) {
      handleClose();
      socket.close();
    }
    var stream = videoPlayer.srcObject;
    var tracks = stream.getTracks();

    tracks.forEach((track) => track.stop());

    videoPlayer.srcObject = null;

    var liveStreamDuration = null;
    if (liveStreamStartTime !== null) {
      liveStreamDuration = Math.floor(
        (new Date().getTime() - liveStreamStartTime) / 1000
      ); // Duration in seconds
    }

    updateDatabaseWithLiveStreamDuration(
      liveStreamContentID,
      liveStreamDuration
    );

    startLiveBtn.disabled = false;
    endLiveBtn.disabled = true;
    videoPlayer.currentTime = currentTimeStamp;
    videoPlayer.play();
  });

  // Function to update the database with live stream duration
  function updateDatabaseWithLiveStreamDuration(contentID, duration) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "php/Model/save_live_duration.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      }
    };
    xhr.send(
      "contentID=" +
        encodeURIComponent(contentID) +
        "&duration=" +
        encodeURIComponent(duration)
    );
    populateQueueTable();
  }

  function handleClose() {
    socket.send(JSON.stringify({ type: "customClose" }));
  }
});
