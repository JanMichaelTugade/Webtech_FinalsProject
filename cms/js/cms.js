document.addEventListener("DOMContentLoaded", function () {
  $(document).ready(function () {
    $("#inputfile").change(function () {
      var formData = new FormData();
      formData.append("file", $("#inputfile")[0].files[0]);
      formData.append("submit", true);

      console.log(formData.get("file"));
      console.log(formData.get("submit"));

      $.ajax({
        url: "php/Model/uploadvideo.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          console.log("Server response:", response);
          handleUploadResponse(response);
          location.reload();
      },
      
        error: function (error) {
          console.log(error);
        },
      });
    });
  });
  fetchData(); 
  getCurrentTime();
  setInterval(getCurrentTime, 1000);
  populateQueueTable();
});

function handleUploadResponse(response) {
  console.log("Server response:", response);

  if (response.includes('success')) {
    alert("File uploaded successfully!");
  } else if (response.includes('error_insert')) {
    alert("Error inserting details into the database. Check server logs for more information.");
  } else if (response.includes('error_upload')) {
    alert("Error uploading the file.");
  } else if (response.includes('invalid_extension')) {
    alert("Invalid file extension");
  } else if (response.includes('no_file')) {
    alert("Please select a file");
  } else {
    alert("Unknown error. Check server logs for more information.");
  }
}



function fetchData() {
 
  fetch("php/Model/resultsBody.php")
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

function searchTable() {
  var input, filter;
  input = document.getElementById("searchfld");
  filter = input.value.toUpperCase();

  
  fetchData(filter);
}

function updateTable(data) {
  const resultsBody = document.getElementById("resultsBody");

  
  resultsBody.innerHTML = "";

 
  data.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = 
    `<td><button class="viewButton" style="
    font-family: Century Gothic; 
    font-weight: bold; 
    color: #fff; 
    width: 50px; 
    height: 20px; 
    top:0;
    background-color: white; 
    color: #1854a4;
    border-radius: 10px; 
    border:none; 
    outline: none; 
    transition: transform 0.2s;" 
    onclick="viewFunction('${row.contentID}')">View</button></td>
    <td>${row.name}</td>
    <td>${secondsToMinutes(row.duration)}</td>
    <td>${row.contentID}</td>
    <td><button class="deleteButton" style="
    font-family: Century Gothic; 
    font-weight: bold; 
    color: #fff; 
    width: 50px; 
    height: 20px; 
    top:0;
    background-color: red; 
    color: #fff;
    border-radius: 10px; 
    border:none; 
    outline: none; 
    transition: transform 0.2s;" 
    onclick="deleteFunction('${row.contentID}', '${row.name}')">Delete</button></td>`;
    resultsBody.appendChild(tr);
  });
}

function fetchData(filter) {
  fetch("php/Model/resultsBody.php")
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched data:", data);

      if (!filter) {
        updateTable(data);
      } else {
        const filteredData = data.filter(row =>
          row.name.toUpperCase().includes(filter)
        );
        updateTable(filteredData);
      }
    })
    .catch((error) => console.error("Error:", error));
}

function viewFunction(contentID) {
 L
  $.ajax({
    type: 'GET',
    url: 'php/Model/getVideoURL.php',
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

function deleteFunction(contentID, name) {
  const isConfirmed = confirm("Are you sure you want to delete this video?");

  if (isConfirmed) {
    $.ajax({
      type: 'DELETE',
      url: 'php/Model/delete_video.php',
      contentType: 'application/json',
      data: JSON.stringify({ contentID, filePath: `/videos/${name}` }),
      success: function(response) {
        console.log('Deletion response:', response);
        fetchData();
      },
      error: function(error) {
        console.error('Error deleting video:', error);
      }
    });
  }
}


function openVideoModal(videoURL) {
  
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
          <div class="modal-body" style="display: flex; flex-direction: column; align-items: center; position: absolute; top: 10%; left:20%; right:20%;">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="position: relative; left: 48%; padding:10px; 
              background-color: red; border-radius:5px;
              height:35px; color:white; z-index: 2;">
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



