document.addEventListener("DOMContentLoaded", function () {
    populateTable();
});

const addSlotBtn = document.getElementById('addslotbtn');
const addTimeslotDialog = document.getElementById('addTimeslot');

// Handle "Add Schedule" button click
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
fetch("loadContent.php")
    .then((response) => response.json())
    .then((data) => {
    console.log("Fetched data:", data);
    // Update the table with the fetched data
    updateTable(data);

    const timeslotSelection4 = document.getElementById("timeslotSelection4");
    timeslotSelection4.innerHTML = "";

    // Manually add the "Live Stream" option
    const liveStreamOption = document.createElement("option");
    liveStreamOption.value = "Live Stream";
    liveStreamOption.text = "Live Stream";
    timeslotSelection4.appendChild(liveStreamOption);

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

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'add_slot.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Handle the server response if needed
            console.log(xhr.responseText);
            populateTable();

            // Reload the entire page after adding the slot
            location.reload();
        }
    };
    xhr.send('contentID=' + encodeURIComponent(contentID));

    const addTimeslotDialog = document.getElementById('addTimeslot');
    addTimeslotDialog.close();
}

// Get the contents in queue and populate it on a table
function populateTable() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'fetch_queue.php');
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

        // Make an AJAX request to update the positions in the database
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'update_positions.php');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log(this.response);
            } else {
                console.log("Error occurred");
            }
        };
        xhr.send(JSON.stringify(updatedPositions));
    }
}
  function handleDragEnd(event) {
    event.target.classList.remove('is-dragging');
    draggedRow = null;
  }

// Delete a row in the queue
function deleteRow(position) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'remove_from_queue.php');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Handle the server response if needed
        console.log(xhr.responseText);
  
        // Refresh the table after successful deletion
        populateTable();
      }
    };
    xhr.send('position=' + encodeURIComponent(position));
  }