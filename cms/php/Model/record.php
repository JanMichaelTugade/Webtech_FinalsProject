<?php

require_once 'dbcon.php';

try {
    // Retrieve data from the queue table
    $query = 'SELECT sched_ID, content_ID FROM queue';
    $result = $conn->query($query);

    if ($result === false) {
        die('Error executing the query: ' . $conn->error);
    }

    $queueData = [];

    while ($row = $result->fetch_assoc()) {
        $queueData[] = $row;
    }

    // Loop through the data and transfer it to the log table
    foreach ($queueData as $data) {
        // Build the INSERT query
        $insertQuery = "INSERT IGNORE INTO log (histID, date, time, fileID) VALUES (
            '{$data['sched_ID']}', CURDATE(), CURTIME(), '{$data['content_ID']}'
        )";

        // Display the query for debugging
        echo "Query to be executed: " . $insertQuery . "<br>";

        // Execute the INSERT query
        if ($conn->query($insertQuery) === false) {
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
