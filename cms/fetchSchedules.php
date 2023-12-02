<?php
// Include your database connection file
require 'dbcon.php';

$query = "SELECT TIME_FORMAT(startTime, '%H:%i') AS startTime, TIME_FORMAT(endTime, '%H:%i') AS endTime FROM CONTENT WHERE startTime IS NOT NULL AND endTime IS NOT NULL";
$result = $conn->query($query);

$assignedSchedules = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $assignedSchedules[] = $row;
    }
}

// Return the assigned schedules as JSON response
header('Content-Type: application/json');
echo json_encode($assignedSchedules);
?>