<?php
// Replace these values with your actual database credentials
$servername = "localhost";
$username = "root";
$password = "";
$database = "modelm;

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get contentID from the GET parameters
$contentID = $_GET['contentID'];

// Fetch video URL from the database
$sql = "SELECT path FROM content WHERE contentID = $contentID"; // Assuming 'videos' is your table name
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $contentID = $row['contentID'];
} else {
    echo "Video not found";
}

$conn->close();
?>