var videoPlayer = document.getElementById("videoPlayer");
var broadcastMonitor = document.querySelector(".broadcastMonitor");

// Canvas element for the live stream
const receivedVideoContainer = document.createElement("div");
receivedVideoContainer.id = "receivedVideoContainer";
receivedVideoContainer.style.width = "100%";
receivedVideoContainer.style.height = "auto";
receivedVideoContainer.style.display = "flex";
receivedVideoContainer.style.justifyContent = "center";
receivedVideoContainer.style.alignItems = "center";
broadcastMonitor.appendChild(receivedVideoContainer);

const receivedCanvas = document.createElement("canvas");
const receivedCtx = receivedCanvas.getContext("2d");

receivedVideoContainer.appendChild(receivedCanvas);

function handleCanvasData(canvasData) {
  const image = new Image();

  image.onload = function () {
    receivedCanvas.width = image.width;
    receivedCanvas.height = image.height;

    receivedCtx.drawImage(
      image,
      0,
      0,
      receivedCanvas.width,
      receivedCanvas.height
    );
  };
  image.src = canvasData;
}

function handleWebSocketClose() {
  if (receivedVideoContainer) {
    receivedVideoContainer.remove();
    videoPlayer.style.display = "block";
  }
}

// Establish WebSocket connection
var socket = new WebSocket("ws:localhost:8080");
socket.addEventListener("open", function (event) {
  console.log("WebSocket connection established");
});
socket.addEventListener("error", function (event) {
  console.error("WebSocket error:", event);
});
socket.addEventListener("close", function (event) {
  console.log("WebSocket connection closed");
  handleWebSocketClose();
});

// Listen for incoming messages from the WebSocket server
socket.addEventListener("message", function (event) {
  var message;
  try {
    message = JSON.parse(event.data);
  } catch (error) {
    console.error("Error parsing the incoming message:", error);
    return;
  }

  if (message.type === "canvasData") {
    videoPlayer.style.display = "none";
    receivedVideoContainer.style.display = "flex";
    var canvasData = message.data;
    handleCanvasData(canvasData);
  } else if (message.type === "streamData") {
    var canvasData = message.canvasData;
    handleCanvasData(canvasData);
  } else if (message.type === "customClose") {
    handleWebSocketClose();
  }
});
