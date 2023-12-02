<?php
require_once 'dbcon.php';

$query = "SELECT name, startTime, contentID FROM content WHERE startTime IS NULL AND endTime IS NULL";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $res = [];


    while ($row = $result->fetch_assoc()) {
        $res[] = $row;
    }
    echo json_encode($res);
} else {
    echo json_encode([]);
}

$conn->close();
?>
