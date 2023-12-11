<?php

require_once 'dbcon.php';

try {
    // Retrieve data from the queue table
    $query = 'SELECT sched_ID, content_ID, liveDuration FROM queue';
    $result = $conn->query($query);

    if ($result === false) {
        die('Error executing the query: ' . $conn->error);
    }

    $queue = [];

    while ($row = $result->fetch_assoc()) {
        $queue[] = $row;
    }

    // Loop through the data and transfer it to the log table
    foreach ($queue as $data) {
        // Determine if it's streamed or live based on liveDuration
        $ifLive = $data['liveDuration'] === null ? 'Streamed' : 'Live';

        // Build the INSERT query
        $insertQuery = "INSERT IGNORE INTO log (histID, date, time, fileID, ifLive) VALUES (
            '{$data['sched_ID']}', CURDATE(), CURTIME(), '{$data['content_ID']}', '$ifLive'
        )";

        // Display the query for debugging
        echo "Query to be executed: " . $insertQuery . "<br>";

        /// Execute the INSERT query
        $insertResult = $conn->query($insertQuery);
        if ($insertResult === false) {
            // Output more details about the error for debugging
            die('Error executing the insert query: ' . $conn->error . ' Query: ' . $insertQuery);
        }

    }

    echo "Data successfully transferred from queue to log.";

} catch (Exception $e) {
    // Handle any exceptions
    echo "Error: " . $e->getMessage();
}

// Close the database connection
$conn->close();
?>