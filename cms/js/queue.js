document.addEventListener("DOMContentLoaded", function () {
    populateQueueTable();
});

const addSlotBtn = document.getElementById('addslotbtn');
const addTimeslotDialog = document.getElementById('addTimeslot');

addSlotBtn.addEventListener('click', () => {
addTimeslotDialog.showModal();
loadContentDropdown()
});

closeaddslot.addEventListener("click", () => {
    timeslot.close();
});
  
backbutton.addEventListener("click", () => {
    timeslot.close();
});

// Function for loading the drop down list of content
function loadContentDropdown() {
fetch("php/Model/loadContent.php")
    .then((response) => response.json())
    .then((data) => {
    console.log("Fetched data:", data);
    // Update the table with the fetched data
    updateTable(data);

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

// Function for adding the content to the schedule (queue)
function addSlot() {
  const selectElement = document.getElementById('timeslotSelection4');
  const contentID = selectElement.value;

  const xhrValidate = new XMLHttpRequest();
  xhrValidate.open('GET', 'php/Model/validate_queue.php');
  xhrValidate.onload = function () {
      if (xhrValidate.status === 200) {
          const totalDuration = parseInt(xhrValidate.responseText) / 60;

          const xhrGetDuration = new XMLHttpRequest();
          xhrGetDuration.open('GET', 'php/Model/get_duration.php?contentID=' + encodeURIComponent(contentID));
          xhrGetDuration.onload = function () {
              if (xhrGetDuration.status === 200) {
                  const videoDuration = parseInt(xhrGetDuration.responseText) / 60;
                  console.log("Total Duration",totalDuration);
                  if (totalDuration + videoDuration > 600) {
                      alert("The queue is full. Cannot add a video with a duration of " + videoDuration + " minutes.");
                      return;
                  }

                  // Proceed to add the slot if validation passes
                  const xhr = new XMLHttpRequest();
                  xhr.open('POST', 'php/Model/add_slot.php');
                  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                  xhr.onload = function () {
                      if (xhr.status === 200) {
                          // Handle the server response if needed
                          console.log(xhr.responseText);
                          populateQueueTable();

                          // Reload the entire page after adding the slot
                          location.reload();
                      }
                  };
                  xhr.send('contentID=' + encodeURIComponent(contentID));

                  const addTimeslotDialog = document.getElementById('addTimeslot');
                  addTimeslotDialog.close();
              } else {
                  console.error("Error fetching video duration: " + xhrGetDuration.status);
              }
          };
          xhrGetDuration.send();
      } else {
          console.error("Error validating queue: " + xhrValidate.status);
      }
  };
  xhrValidate.send();
}

// Get the contents in queue and populate it on a table
function populateQueueTable() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'php/Model/fetch_queue.php');
    xhr.onload = function () {
      if (xhr.status === 200) {
        const queueData = JSON.parse(xhr.responseText);
  
        // Clear existing table rows
        const tableBody = document.querySelector('#scheduleTable tbody');
        tableBody.innerHTML = '';
  
        // Create new table rows based on the fetched data
        queueData.forEach(function (row) {
          const newRow = document.createElement('tr');
          newRow.draggable = true; // Enable dragging for each row
          newRow.addEventListener('dragstart', handleDragStart);
          newRow.addEventListener('dragover', handleDragOver);
          newRow.addEventListener('drop', handleDrop);
          newRow.addEventListener('dragend', handleDragEnd);
  
          const cell1 = document.createElement('td');
          cell1.textContent = row.contentName;
          newRow.appendChild(cell1);
  
          const cell2 = document.createElement('td');
          cell2.textContent = row.position;
          newRow.appendChild(cell2);
  
          const cell3 = document.createElement('td');
          const deleteButton = document.createElement('button');
          deleteButton.setAttribute('type', 'button');
          deleteButton.setAttribute('onclick', 'deleteRow(' + row.position + ')');
          deleteButton.innerHTML =
            '<i style=" font-size: 15px; font-family: Century Gothic; font-weight: bold; width: 50px; height: 40px; color: #1854a4; border-radius: 20px; transition: transform 0.2s;>"</i> Delete Slot';
          cell3.appendChild(deleteButton);
          newRow.appendChild(cell3);
  
          tableBody.appendChild(newRow);
        });
      }
    };
    xhr.send();
  }
  
  let draggedRow;
  
  function handleDragStart(event) {
    event.target.classList.add('is-dragging');
    draggedRow = event.target;
    event.dataTransfer.setData('text/plain', event.target.id);
  }
  
  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }
  
  function handleDrop(event) {
    event.preventDefault();
    const targetRow = event.target.closest('tr');
    if (targetRow !== draggedRow) {
        const tableBody = targetRow.parentNode;
        const targetRowIndex = Array.from(tableBody.children).indexOf(targetRow);
        const draggedRowIndex = Array.from(tableBody.children).indexOf(draggedRow);
        tableBody.removeChild(draggedRow);
        tableBody.insertBefore(draggedRow, targetRow);

        // Get the updated positions of the rows
        const rows = Array.from(tableBody.children);
        const updatedPositions = rows.map((row, index) => ({
            sched_ID: row.id, // Assuming sched_ID is set as the id attribute of each row during population
            content_ID: row.cells[0].textContent.trim(), // Assuming content_ID is in the first cell of each row
            position: index + 1, // Adding 1 to match your 1-based position values
        }));
    }
}
  function handleDragEnd(event) {
    event.target.classList.remove('is-dragging');
    draggedRow = null;
  }

// Delete a row in the queue
function deleteRow(position) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/Model/remove_from_queue.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Handle the server response if needed
        console.log(xhr.responseText);
  
        // Refresh the table after successful deletion
        populateQueueTable();
      }
    };
    xhr.send('position=' + encodeURIComponent(position));
  }