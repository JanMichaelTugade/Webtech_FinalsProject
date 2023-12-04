<?php
include 'dbcon.php';

// Set the desired time zone
date_default_timezone_set('Asia/Singapore');

// Get the current time in the desired format
$currentTime = new DateTime();
$currentDateTime = $currentTime->format('Y-m-d H:i:s');

// Check if there is a video scheduled for the current time
$sql = "SELECT path, startTime, endTime FROM content WHERE startTime <= '$currentDateTime' AND endTime >= '$currentDateTime'";
$result = $conn->query($sql);

if ($result === false) {
    die('Error executing the query: ' . $conn->error);
}

if ($result->num_rows > 0) {
    // Output the path, startTime, and endTime of the video as a JSON response
    $row = $result->fetch_assoc();
    $videoPath = $row['path'];
    $startTime = $row['startTime'];
    $endTime = $row['endTime'];

    $response = array(
        'videoPath' => $videoPath,
        'scheduledStartTime' => $startTime,
        'scheduledEndTime' => $endTime
    );

    header('Content-Type: application/json');
    echo json_encode($response);
}
?>