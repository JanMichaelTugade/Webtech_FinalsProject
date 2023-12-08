<?php
// Script for getting the contents to display in the UI
require_once 'dbcon.php';

$query = "SELECT name, duration, contentID FROM content WHERE duration IS NOT NULL";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $data = [];

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo json_encode([]);
}

$conn->close();
?>
