<?php
// Script for getting the content in the queue
require_once 'dbcon.php';

$query = "SELECT q.sched_ID, c.name AS contentName, q.position
          FROM queue q
          JOIN content c ON q.content_ID = c.contentID ORDER BY q.position";

$result = $conn->query($query);

if ($result->num_rows > 0) {
    $queueData = array();

    while ($row = $result->fetch_assoc()) {
        $queueData[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($queueData);
}


$conn->close();
?>
