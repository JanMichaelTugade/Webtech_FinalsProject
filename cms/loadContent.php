<?php
require_once 'dbcon.php';

$query = "SELECT contentID, name FROM content";
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
