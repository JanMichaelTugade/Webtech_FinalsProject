var configuration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};

document.addEventListener("DOMContentLoaded", function () {
  var videoPlayer = document.getElementById("videoPlayer");
  var startLiveBtn = document.getElementById("startLivebtn");
  var endLiveBtn = document.getElementById("endLivebtn");
  endLiveBtn.disabled = true;
  var liveStreamContentID = 8;
  var liveStreamStartTime = null;
  var socket = null;
  let peerConnection;

  console.log("Event listeners attached successfully.");

  startLiveBtn.addEventListener("click", function () {
    console.log("Start Live button clicked.");
    liveStreamStartTime = new Date().getTime();

  
    socket = new WebSocket("ws://" + window.location.hostname + ":8080");
    let stream;
    
    
    window.navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(function (newStream) {
        stream = newStream;
        videoPlayer.srcObject = stream;

       
        peerConnection = new RTCPeerConnection(configuration);

        
        stream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, stream);
        });

        
        peerConnection.addEventListener("icecandidate", function (event) {
          if (event.candidate) {
            socket.send(JSON.stringify({ ice: event.candidate }));
          }
        });

        
        peerConnection.addEventListener("negotiationneeded", async function () {
          const offer = await peerConnection.createOffer();
          await peerConnection.setLocalDescription(offer);
          socket.send(JSON.stringify({ offer: peerConnection.localDescription }));
        });

       
        peerConnection.addEventListener("track", function (event) {
          if (event.streams && event.streams[0]) {
            videoPlayer.srcObject = event.streams[0];
          }
        });

       
        socket.addEventListener("message", async function (event) {
          const message = JSON.parse(event.data);

          if (message.offer) {
            await peerConnection.setRemoteDescription(message.offer);
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            socket.send(
              JSON.stringify({ answer: peerConnection.localDescription })
            );
          } else if (message.answer) {
            await peerConnection.setRemoteDescription(message.answer);
          } else if (message.ice) {
            await peerConnection.addIceCandidate(message.ice);
          }
        });
      })
      .catch(function (error) {
        console.error("Error accessing media devices:", error);
      });

    startLiveBtn.disabled = true;
    if(startLiveBtn.disabled = true){
      startLiveBtn.style.backgroundColor = "gray";
      endLiveBtn.style.backgroundColor = "#083068";
    }
    endLiveBtn.disabled = false;
    
  });

  endLiveBtn.addEventListener("click", function () {
    console.log("End Live button clicked.");

    if (socket && socket.readyState === WebSocket.OPEN) {
      handleClose();
      socket.close();
    }

    if (peerConnection) {
      peerConnection.close();
      peerConnection = null;
    }

    var stream = videoPlayer.srcObject;
    var tracks = stream.getTracks();

    tracks.forEach((track) => track.stop());

    videoPlayer.srcObject = null;

    var liveStreamDuration = null;
    if (liveStreamStartTime !== null) {
      liveStreamDuration = Math.floor(
        (new Date().getTime() - liveStreamStartTime) / 1000
      ); 
    }

    updateDatabaseWithLiveStreamDuration(
      liveStreamContentID,
      liveStreamDuration
    );

    startLiveBtn.disabled = false;
    endLiveBtn.disabled = true;
    if(endLiveBtn.disabled = true){
      endLiveBtn.style.backgroundColor = "gray";
      startLiveBtn.style.backgroundColor = "#D71D1D";
    }
    videoPlayer.currentTime = 0;
    videoPlayer.play();
  });

  
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
