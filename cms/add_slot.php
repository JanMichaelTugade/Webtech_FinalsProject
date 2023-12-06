<?php
require_once 'dbcon.php';

$contentID = $_POST['contentID'];

// Get the contentID based on the name
$query = "SELECT contentID FROM content WHERE name = '$contentID'";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $contentID = $row['contentID'];

    $insertQuery = "INSERT INTO queue (content_ID, position)
                    SELECT '$contentID', IFNULL(MAX(position), 0) + 1
                    FROM queue";

    if ($conn->query($insertQuery)) {
        echo "Slot added successfully!";
    } else {
        echo "Error adding slot: " . $conn->error;
    }
} else {
    echo "Invalid content name! " . $contentID;
}

$conn->close();
?>
