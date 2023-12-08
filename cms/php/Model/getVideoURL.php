<?php
// Script for getting the content path for previewing
include 'dbcon.php';

$contentID = $_GET['contentID'];

// Use prepared statement to prevent SQL injection
$sql = "SELECT path FROM content WHERE contentID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $contentID);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $videoURL = $row['path'];
    echo $videoURL; // Output the video URL
} else {
    echo "Video not found";
}

$stmt->close();
$conn->close();
?>
