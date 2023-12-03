<?php
// Include the db connection file
include 'dbcon.php';

// Retrieve the selected values from the AJAX request
$startTime = $_POST['startTime'];
$endTime = $_POST['endTime'];
$content = $_POST['content'];

// Update the start time and end time in the database
$sql = "UPDATE CONTENT SET startTime = '$startTime', endTime = '$endTime' WHERE name = '$content'";

if ($conn->query($sql) === TRUE) {
    $response = "Start time and end time updated successfully!";
} else {
    $response = "Error updating start time and end time: " . $conn->error;
}

// Close the database connection
$conn->close();

// Send a response back to the JavaScript code
echo $response;
?>