<?php
// Script for updating the positions in the queue in case of adding/deleting
include 'dbcon.php';

$data = json_decode(file_get_contents('php://input'), true);

$sql = "UPDATE queue SET position = CASE sched_ID ";
$placeholders = "";
$values = [];

foreach ($data as $row) {
    $placeholders .= "WHEN ? THEN ? ";
    $values[] = $row['sched_ID'];
    $values[] = $row['position'];
}

$sql .= $placeholders . "END WHERE sched_ID IN (" . rtrim(str_repeat('?,', count($data)), ',') . ")";

$stmt = $conn->prepare($sql);
if ($stmt) {
    $paramTypes = str_repeat('ii', count($data));
    $stmt->bind_param($paramTypes, ...$values);
    
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error']);
    }
} else {
    echo json_encode(['status' => 'error']);
}
?>
