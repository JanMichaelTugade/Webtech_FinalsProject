<?php
// Fetch the duration based on the provided contentID
require_once 'dbcon.php';

if (isset($_GET['contentID'])) {
    $contentID = $_GET['contentID'];

    $query = "SELECT duration FROM content WHERE name = '$contentID'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $videoDuration = (int)$row['duration'];
        echo $videoDuration;
    } else {
        echo "0";
    }
} else {
    echo "0";
}

$conn->close();
?>
