<?php
// Include your database connection file
require 'dbcon.php';

// Fetch the schedules from the content table
$query = "SELECT TIME_FORMAT(startTime, '%H:%i') AS startTime, TIME_FORMAT(endTime, '%H:%i') AS endTime FROM CONTENT WHERE startTime IS NOT NULL AND endTime IS NOT NULL";
$result = $conn->query($query);

$assignedSchedules = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $assignedSchedules[] = $row;
    }
}

// Fetch the schedules from the livestream table
$query = "SELECT TIME_FORMAT(startTime, '%H:%i') AS startTime, TIME_FORMAT(endTime, '%H:%i') AS endTime FROM livestream WHERE startTime IS NOT NULL AND endTime IS NOT NULL";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $assignedSchedules[] = $row;
    }
}

// Return the assigned schedules as JSON response
header('Content-Type: application/json');
echo json_encode($assignedSchedules);
?>