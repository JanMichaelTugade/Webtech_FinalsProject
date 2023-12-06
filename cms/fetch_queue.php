<?php
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

    // Return the data as a JSON response
    header('Content-Type: application/json');
    echo json_encode($queueData);
} else {
    echo "No data found.";
}

$conn->close();
?>
