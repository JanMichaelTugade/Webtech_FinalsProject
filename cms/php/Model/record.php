<?php

require_once 'dbcon.php';

try {
   
    $query = 'SELECT sched_ID, content_ID, liveDuration FROM queue';
    $result = $conn->query($query);

    if ($result === false) {
        die('Error executing the query: ' . $conn->error);
    }

    $queue = [];

    while ($row = $result->fetch_assoc()) {
        $queue[] = $row;
    }

    
    foreach ($queue as $data) {
        
        $ifLive = $data['liveDuration'] === null ? 'Streamed' : 'Live';

       
        $insertQuery = "INSERT IGNORE INTO log (histID, date, time, fileID, ifLive) VALUES (
            '{$data['sched_ID']}', CURDATE(), CURTIME(), '{$data['content_ID']}', '$ifLive'
        )";

       
        echo "Query to be executed: " . $insertQuery . "<br>";

       
        $insertResult = $conn->query($insertQuery);
        if ($insertResult === false) {
            
            die('Error executing the insert query: ' . $conn->error . ' Query: ' . $insertQuery);
        }

    }

    echo "Data successfully transferred from queue to log.";

} catch (Exception $e) {
   
    echo "Error: " . $e->getMessage();
}


$conn->close();
?>