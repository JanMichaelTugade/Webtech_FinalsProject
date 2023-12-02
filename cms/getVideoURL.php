<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "modelm";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

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
