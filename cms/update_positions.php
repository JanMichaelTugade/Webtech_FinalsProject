<?php
// Handle the AJAX request to update the positions in the database

include 'dbcon.php'; // Include your db connection file

// Get the updated positions from the request body
$data = json_decode(file_get_contents('php://input'), true);

// Prepare the SQL statement
$sql = "UPDATE queue SET position = CASE sched_ID ";
$placeholders = "";
$values = [];

foreach ($data as $row) {
    $placeholders .= "WHEN ? THEN ? ";
    $values[] = $row['sched_ID'];
    $values[] = $row['position'];
}

$sql .= $placeholders . "END WHERE sched_ID IN (" . rtrim(str_repeat('?,', count($data)), ',') . ")";

// Prepare and execute the SQL statement with a prepared statement
$stmt = $conn->prepare($sql);
if ($stmt) {
    // Dynamically bind parameters
    $paramTypes = str_repeat('ii', count($data));
    $stmt->bind_param($paramTypes, ...$values);
    
    $stmt->execute();

    // Check if the update was successful
    if ($stmt->affected_rows > 0) {
        // Update successful
        echo json_encode(['status' => 'success']);
    } else {
        // Update failed
        echo json_encode(['status' => 'error']);
    }
} else {
    // Handle the case where the prepared statement couldn't be created
    echo json_encode(['status' => 'error']);
}
?>
