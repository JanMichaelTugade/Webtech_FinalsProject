<?php

require_once 'dbcon.php';

try {
    $query = 'SELECT sched_ID, content_ID FROM queue';
    $result = $conn->query($query);

    if ($result === false) {
        die('Error executing the query: ' . $conn->error);
    }

    $queueData = [];

    while ($row = $result->fetch_assoc()) {
        $queueData[] = $row;
    }

    foreach ($queueData as $data) {
        $insertQuery = "INSERT IGNORE INTO log (histID, fileID) VALUES (
            '{$data['sched_ID']}', '{$data['content_ID']}'
        )";

        if ($conn->query($insertQuery) === false) {
            // Output more details about the error for debugging
            die('Error executing the insert query: ' . $conn->error . ' Query: ' . $insertQuery);
        }
    }

    echo "Data successfully transferred from queue to log.";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

$conn->close();
?>
