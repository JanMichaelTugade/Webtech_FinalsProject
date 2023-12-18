<?php
// Script for adding a video to the queue table and updating log table
require_once 'dbcon.php';

$contentID = $_POST['contentID'];

$query = "SELECT contentID FROM content WHERE name = '$contentID'";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $contentID = $row['contentID'];

    $insertQueueQuery = "INSERT INTO queue (content_ID, position)
                    SELECT '$contentID', IFNULL(MAX(position), 0) + 1
                    FROM queue";

    if ($conn->query($insertQueueQuery)) {
        
        $insertLogQuery = "INSERT INTO log (histID, date, time, fileID)
                            VALUES (LAST_INSERT_ID(), CURDATE(), CURTIME(), '$contentID')";
        
        if ($conn->query($insertLogQuery)) {
            echo "Slot added successfully and log updated!";
        } else {
            echo "Error updating log: " . $conn->error;
        }
    } else {
        echo "Error adding slot: " . $conn->error;
    }
} else {
    echo "Invalid content name! " . $contentID;
}

$conn->close();
?>