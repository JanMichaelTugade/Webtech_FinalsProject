document.addEventListener("DOMContentLoaded", function () {
  $(document).ready(function () {
    $("#inputfile").change(function () {
      var formData = new FormData();
      formData.append("file", $("#inputfile")[0].files[0]);
      formData.append("submit", true);

      $.ajax({
        url: "uploadvideo.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          handleUploadResponse(response);
        },
        error: function (error) {
          console.log(error);
        },
      });
    });
  });

  fetchData(); // Move fetchData inside the DOMContentLoaded event
});

function fetchData() {
  // Use fetch API to make an asynchronous request to the server
  fetch("resultsBody.php")
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched data:", data);
      // Update the table with the fetched data
      updateTable(data);
    })
    .catch((error) => console.error("Error:", error));
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
    border-color:white;
    outline: none;
    transition: transform 0.2s;"
    onclick="viewFunction('${row.contentID}')">View</button></td><td>${row.name}</td><td>${row.startTime}</td><td>${row.contentID}</td>`;
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



function loadContentDropDown() {
  fetch("addSchedVids.php")
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched data:", data);
      // Update the table with the fetched data
      updateTable(data);

      // Clear existing options in timeslotSelection4
      const timeslotSelection4 = document.getElementById("timeslotSelection4");
      timeslotSelection4.innerHTML = "";

      // Populate dropdown options for timeslotSelection4
      data.forEach((row) => {
        addToDropdown("timeslotSelection4", row.name);
      });
    })
    .catch((error) => console.error("Error:", error));
}

function addToDropdown(dropdownId, optionText) {
  const option = document.createElement("option");
  option.innerHTML = optionText;
  document.getElementById(dropdownId).appendChild(option);
}

var timeslot = document.getElementById("addTimeslot");
var addslot = document.getElementById("addslotbtn");
var closeaddslot = document.getElementById("save-addslotbtn");
var backbutton = document.getElementById("backbtn");

addslot.addEventListener("click", () => {
  timeslot.showModal();
  loadContentDropDown();
});

closeaddslot.addEventListener("click", () => {
  timeslot.close();
});

backbutton.addEventListener("click", () => {
  timeslot.close();
});

// Add Start time for schedules
// Get the timeslotSelection2 and timeslotSelection3 select elements
const timeslotSelection2 = document.getElementById("timeslotSelection2");
const timeslotSelection3 = document.getElementById("timeslotSelection3");
var assignedSchedules = [];

// Fetch the assigned schedules data from the server using AJAX
fetch('fetchschedules.php')
  .then(response => response.json())
  .then(data => {
    assignedSchedules = data;
    const endTimes = [];

    // Generate start times and exclude existing schedules
    for (let hour = 8; hour < 18; hour++) { // Exclude the hour 18
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

        // Check if the time is already assigned in the schedules
        const isAssigned = assignedSchedules.some(schedule => {
          const scheduleStartTime = schedule.startTime.split(":");
          const scheduleEndTime = schedule.endTime.split(":");
          const scheduleStartHour = parseInt(scheduleStartTime[0]);
          const scheduleStartMinute = parseInt(scheduleStartTime[1]);
          const scheduleEndHour = parseInt(scheduleEndTime[0]);
          const scheduleEndMinute = parseInt(scheduleEndTime[1]);

          // Convert the time to minutes for comparison
          const currentTimeMinutes = hour * 60 + minute;
          const scheduleStartMinutes = scheduleStartHour * 60 + scheduleStartMinute;
          const scheduleEndMinutes = scheduleEndHour * 60 + scheduleEndMinute;

          // Check if the time is within an existing schedule
          return (
            currentTimeMinutes >= scheduleStartMinutes && currentTimeMinutes < scheduleEndMinutes
          );
        });

        // If the time is not assigned, add it as an option to the timeslotSelection2 select element
        if (!isAssigned) {
          const option = new Option(time, time);
          timeslotSelection2.add(option);
          endTimes.push(time); // Add the time to the endTimes array
        }
      }
    }

    timeslotSelection2.addEventListener("change", function() {
        const selectedStartTime = timeslotSelection2.value;
        const availableEndTimes = [];
      
        // Find the index of the selected start time in the endTimes array
        const startIndex = endTimes.indexOf(selectedStartTime);
      
        // Generate new end times based on the selected start time
        let nextEndTime = selectedStartTime;
        while (true) {
          // Increment the next end time by 30 minutes
          const endTimeHour = parseInt(nextEndTime.split(":")[0]);
          const endTimeMinute = parseInt(nextEndTime.split(":")[1]) + 30;
          if (endTimeMinute >= 60) {
            nextEndTime = `${(endTimeHour + 1).toString().padStart(2, "0")}:00`;
          } else {
            nextEndTime = `${endTimeHour.toString().padStart(2, "0")}:${endTimeMinute.toString().padStart(2, "0")}`;
          }
      
          // Check if the next end time is already assigned in the schedules
          const isAssigned = assignedSchedules.some(schedule => {
            const scheduleStartTime = schedule.startTime.split(":");
            const scheduleEndTime = schedule.endTime.split(":");
            const scheduleStartHour = parseInt(scheduleStartTime[0]);
            const scheduleStartMinute = parseInt(scheduleStartTime[1]);
            const scheduleEndHour = parseInt(scheduleEndTime[0]);
            const scheduleEndMinute = parseInt(scheduleEndTime[1]);
      
            const nextEndTimeHour = parseInt(nextEndTime.split(":")[0]);
            const nextEndTimeMinute = parseInt(nextEndTime.split(":")[1]);
            const nextEndTimeMinutes = nextEndTimeHour * 60 + nextEndTimeMinute;
      
            // Check if the next end time overlaps with an existing schedule
            return (
              nextEndTimeMinutes > scheduleStartHour * 60 + scheduleStartMinute &&
              nextEndTimeMinutes <= scheduleEndHour * 60 + scheduleEndMinute
            );
          });
      
          // If the next end time is not assigned, add it to the availableEndTimes array
          if (!isAssigned) {
            availableEndTimes.push(nextEndTime);
          }
      
          // Break the loop if the next end time is already in the database or exceeds the maximum schedule end time
          if (assignedSchedules.some(schedule => schedule.endTime === nextEndTime) || nextEndTime === "18:00") {
            break;
          }
        }
      
        // Clear the existing end time options
        timeslotSelection3.innerHTML = "";
      
        // Add the available end times as options to the timeslotSelection3 select element
        for (const time of availableEndTimes) {
          const option = new Option(time, time);
          timeslotSelection3.add(option);
        }
      });
  })
  .catch(error => {
    console.error('Error fetching assigned schedules:', error);
  });



// Add a schedule to the chosen video

// Create a function to handle adding a slot and updating the database
function addSlot() {
  // Get the selected start time, end time, and content
  var selectedStartTime = document.getElementById("timeslotSelection2").value;
  var selectedEndTime = document.getElementById("timeslotSelection3").value;
  var selectedContent = document.getElementById("timeslotSelection4").value;

  // Create an AJAX request
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "updateSchedule.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  // Send the selected values to the PHP script
  var data =
    "startTime=" +
    encodeURIComponent(selectedStartTime) +
    "&endTime=" +
    encodeURIComponent(selectedEndTime) +
    "&content=" +
    encodeURIComponent(selectedContent);
  xhr.send(data);

  // Handle the response from the PHP script
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Handle the response as needed
      var response = xhr.responseText;
      console.log(response);
      location.reload();
    }
  };

  // Close the dialog
  var dialog = document.getElementById("addTimeslot");
  dialog.close();
}
