<?php
// Establish a MySQLi connection
$servername = "localhost";
$username = "root";
$password = "";
$database = "modelm";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die('Connect Error (' . $conn->connect_errno . ') ' . $conn->connect_error);
}

$sql = 'SELECT contentID FROM content';
$result = $conn->query($sql);

if ($result === false) {
    die('Error executing the query: ' . $conn->error);
}

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $contentID = $row['contentID'];
} else {
    echo 'No results';
}
?>
