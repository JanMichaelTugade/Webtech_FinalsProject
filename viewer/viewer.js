var configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
};

const ws = new WebSocket("ws://" + window.location.hostname + ":8080");
const videoElement = document.getElementById('videoPlayer');
let peerConnection;

ws.addEventListener('open', function() {
  console.log('WebSocket connection established');
});

ws.addEventListener('message', async function(event) {
  const message = JSON.parse(event.data);

  if (message.offer) {
      try {
          peerConnection = new RTCPeerConnection(configuration);

          peerConnection.addEventListener('icecandidate', function(event) {
              if (event.candidate) {
                  ws.send(JSON.stringify({ ice: event.candidate }));
              }
          });
          
          peerConnection.addEventListener('track', function(event) {
              if (event.streams && event.streams[0]) {
                  videoElement.srcObject = event.streams[0];
              }
          });

          await peerConnection.setRemoteDescription(message.offer);
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          ws.send(JSON.stringify({ answer: peerConnection.localDescription }));
      } catch (error) {
          console.error('Error creating or setting up the RTCPeerConnection:', error);
      }
  } else if (message.answer) {
      try {
          await peerConnection.setRemoteDescription(message.answer);
      } catch (error) {
          console.error('Error setting remote description:', error);
      }
  } else if (message.ice) {
      try {
          await peerConnection.addIceCandidate(message.ice);
      } catch (error) {
          console.error('Error adding ICE candidate:', error);
      }
  } else if (message.type === 'customClose') {
    videoElement.srcObject = null;
    videoElement.play(); 
    location.reload();
  }
});

ws.addEventListener('close', function() {
  console.log('WebSocket connection closed');
});

ws.addEventListener('error', function(error) {
  console.error('WebSocket error:', error);
});