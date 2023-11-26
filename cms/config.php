<?php
// Establish a MySQLi connection
$servername = "localhost";
$username = "root";
$password = "";
$database = "modelm";

$conn = new mysqli($servername, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die('Connect Error (' . $conn->connect_errno . ') ' . $conn->connect_error);
}

// Your existing code to fetch playback_id
$sql = 'SELECT contentID FROM content';
$result = $conn->query($sql);

if ($result === false) {
    die('Error executing the query: ' . $conn->error);
}

if ($result->num_rows > 0) {
    // Output the playback-id
    $row = $result->fetch_assoc();
    $contentID = $row['contentID'];
} else {
    echo 'No results';
}

// No need to close the connection here; it will be closed when the script ends or explicitly closed in index.php
?>
