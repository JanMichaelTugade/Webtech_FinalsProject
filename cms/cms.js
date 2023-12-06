console.log('Script loadedededed');
document.addEventListener("DOMContentLoaded", function () {
  $(document).ready(function () {
    $("#inputfile").change(function () {
      var formData = new FormData();
      formData.append("file", $("#inputfile")[0].files[0]);
      formData.append("submit", true);

      console.log(formData.get("file"));
      console.log(formData.get("submit"));

      $.ajax({
        url: "uploadvideo.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          console.log("Server response:", response);
          handleUploadResponse(response);
      },
      
        error: function (error) {
          console.log(error);
        },
      });
    });
  });
  fetchData(); // Move fetchData inside the DOMContentLoaded event
  getCurrentTime();
  setInterval(getCurrentTime, 1000);
});

function handleUploadResponse(response) {
  if (response === 'success') {
    alert("File uploaded successfully!");
  } else if (response === 'error') {
    alert("Error inserting details into the database");
  } else if (response === 'invalid') {
    alert("Invalid file extension");
  } else if (response === 'no_file') {
    alert("Please select a file");
  }
}


function fetchData() {
  // Use fetch API to make an asynchronous request to the server
  fetch("resultsBody.php")
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched data:", data);
      updateTable(data);
    })
    .catch((error) => console.error("Error:", error));
}

function secondsToMinutes(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function updateTable(data) {
  console.log("Updating table with data:", data);
  
  const resultsBody = document.getElementById("resultsBody");

  // Clear existing table rows
  resultsBody.innerHTML = "";

  // Loop through the fetched data and append rows to the table
  data.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td><button class="viewButton" style="font-family: Century Gothic;
    font-weight: bold;
    color: #fff;
    width: 50px;
    height: 20px;
    background-color: white;
    color: #1854a4;
    border-radius: 10px;
    border:none;
    outline: none;
    transition: transform 0.2s;"
    onclick="viewFunction('${row.contentID}')">View</button></td><td>${row.name}</td><td>${secondsToMinutes(row.duration)}</td><td>${row.contentID}</td>`;
    resultsBody.appendChild(tr);
  });
}
function viewFunction(contentID) {
  // Make an AJAX request to fetch video URL
  $.ajax({
    type: 'GET',
    url: 'getVideoURL.php',
    data: { contentID: contentID },
    success: function(response) {
      const videoURL = response;
      openVideoModal(videoURL);
    },
    error: function(error) {
      console.error('Error fetching video URL:', error);
    }
  });
}

function openVideoModal(videoURL) {
  // Check if the video exists by making a HEAD request
  $.ajax({
    type: 'HEAD',
    url: videoURL,
    success: function () {
      createVideoModal(videoURL);
    },
    error: function () {
      alert('Sorry, the selected video is not available.');
    }
  });
}

function createVideoModal(videoURL) {
  const modalHTML = `
    <div class="modal" id="videoModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Video Viewer</h5>
          </div>
          <div class="modal-body" style="display: flex; flex-direction: column; align-items: center; position: relative;">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="position: static; padding:10px; 
              background-color: red; border-radius:10px; color:white; z-index: 2;">
              <span aria-hidden="true">&times;</span>
            </button>
            <video style="max-width: 100%; max-height: 100%;" controls>
              <source src="${videoURL}" type="video/mp4">
              <!-- Your browser does not support the video tag. -->
            </video>
            
          </div>
        </div>
      </div>
    </div>
  `;

  $('body').append(modalHTML);

  // Attach click event to the close button
  $('.close').on('click', function () {
    $('#videoModal').remove();
  });
}

var timeslot = document.getElementById("addTimeslot");
var addslot = document.getElementById("addslotbtn");
var closeaddslot = document.getElementById("save-addslotbtn");
var backbutton = document.getElementById("backbtn");

function getCurrentTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  var timeString = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
  document.getElementById('time').innerHTML = timeString;
}


$.ajax({
  url: 'retrieveSchedule.php', 
  type: 'GET',
  dataType: 'json',
  success: function(data) {
      var tbody = document.getElementById('retrievedschedule'); // Correct ID here

      tbody.innerHTML = '';

      if (data.length > 0) {
          data.forEach(function(rowData) {
              var row = document.createElement('tr');

              // Modify the columns array to match the keys in your PHP response
              var columns = ['combined_name', 'livestream_startTime', 'livestream_endTime'];

              columns.forEach(function(column) {
                  var cell = document.createElement('td');
                  cell.appendChild(document.createTextNode(rowData[column]));
                  row.appendChild(cell);
              });

              tbody.appendChild(row);
          });
      } else {
          tbody.innerHTML = '<tr><td colspan="3">No data available</td></tr>';
      }
  },
  error: function(error) {
      console.log('Error fetching data:', error);
  }
});
document.addEventListener('DOMContentLoaded', function () {
  var videoPlayer = document.getElementById("videoPlayer");
  var startLiveBtn = document.getElementById("startLivebtn");
  var endLiveBtn = document.getElementById("endLivebtn");

  console.log('Event listeners attached successfully.');

  startLiveBtn.addEventListener('click', function () {
    console.log('Start Live button clicked.');

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
    console.log('End Live button clicked.');

    // Stop the video stream
    var stream = videoPlayer.srcObject;
    var tracks = stream.getTracks();

    tracks.forEach(track => track.stop());

    videoPlayer.srcObject = null;
  });
});