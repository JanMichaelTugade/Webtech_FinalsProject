<?php
// Script for getting the total duration of the queue used for validation
require_once 'dbcon.php';

$query = "SELECT SUM(duration) AS total_duration FROM queue INNER JOIN content ON queue.content_ID = content.contentID";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $totalDuration = (int)$row['total_duration'];
    echo $totalDuration;
} else {
    echo "0";
}

$conn->close();
?>
