document.addEventListener('DOMContentLoaded', function () {
    $(document).ready(function () {
        $("#inputfile").change(function () {
            var formData = new FormData();
            formData.append('file', $('#inputfile')[0].files[0]);
            formData.append('submit', true);

            $.ajax({
                url: 'uploadvideo.php',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    handleUploadResponse(response);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        });
    });

    fetchData(); // Move fetchData inside the DOMContentLoaded event

   
});

function fetchData() {
    console.log("tite");
    // Use fetch API to make an asynchronous request to the server
    fetch('resultsBody.php')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data);
            // Update the table with the fetched data
            updateTable(data);
        })
        .catch(error => console.error('Error:', error));
}

function updateTable(data) {
    console.log('Updating table with data:', data);
    const resultsBody = document.getElementById('resultsBody');

    // Clear existing table rows
    resultsBody.innerHTML = '';

    // Loop through the fetched data and append rows to the table
    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.name}</td><td>${row.startTime}</td><td>${row.contentID}</td>`;
        resultsBody.appendChild(tr);
    });
}

<<<<<<< HEAD
var timeOptions = [];

// Define the start and end times
var startTime = new Date();
startTime.setHours(8, 0, 0); // Set the starting time to 6 am

var endTime = new Date();
endTime.setHours(18, 0, 0); // Set the ending time to 6 pm

// Define the interval in minutes
var interval = 30;

// Iterate over the time range and add options to the array
for (var time = startTime; time <= endTime; time.setMinutes(time.getMinutes() + interval)) {
  // Format the time as HH:mm
  var formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Add the formatted time to the array
  timeOptions.push(formattedTime);
}

// Update the select elements in the HTML
var selectElements = document.querySelectorAll("#startTimeSelection, #endTimeSelection");
for (var i = 0; i < selectElements.length; i++) {
  var selectElement = selectElements[i];
  
  // Remove the existing options
  selectElement.innerHTML = "";
  
  // Add the new options from the timeOptions array
  for (var j = 0; j < timeOptions.length; j++) {
    var option = document.createElement("option");
    option.value = timeOptions[j];
    option.text = timeOptions[j];
    selectElement.appendChild(option);
  }
}
=======
function loadContentDropDown() {
    fetch('resultsBody.php')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data);
            // Update the table with the fetched data
            updateTable(data);

            // Clear existing options in timeslotSelection4
            const timeslotSelection4 = document.getElementById('timeslotSelection4');
            timeslotSelection4.innerHTML = '';

            // Populate dropdown options for timeslotSelection4
            data.forEach(row => {
                addToDropdown('timeslotSelection4', row.name);
            });
        })
        .catch(error => console.error('Error:', error));
}

function addToDropdown(dropdownId, optionText) {
    const option = document.createElement('option');
    option.innerHTML = optionText;
    document.getElementById(dropdownId).appendChild(option);
}

var timeslot = document.getElementById('addTimeslot');
var addslot = document.getElementById('addslotbtn');
var closeaddslot = document.getElementById('save-addslotbtn');
var backbutton = document.getElementById('backbtn');

addslot.addEventListener('click', () => {
    timeslot.showModal();
    loadContentDropDown();
});

closeaddslot.addEventListener('click', () => {
    timeslot.close();
});

backbutton.addEventListener('click', () => {
    timeslot.close();
});
>>>>>>> b89d2146c301abe202329d1150637a1d4bc529d8
