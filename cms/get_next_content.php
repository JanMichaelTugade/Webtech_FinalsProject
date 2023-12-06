<?php
// Include your db connection file
include 'dbcon.php';

// Get the current time
$currentTime = date('H:i:s');

// Get the next content from the queue that has a position of 1 and falls within the current time range
$sql = "";

// Prepare the statement
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $currentTime, $currentTime);
$stmt->execute();

// Get the result
$result = $stmt->get_result();

// Check if there is a result
if ($result && $result->num_rows > 0) {
    // Fetch the content data
    $content = $result->fetch_assoc();

    // Return the content data as JSON response
    echo json_encode([
        'status' => 'success',
        'content' => $content
    ]);
} else {
    // No more content in the queue or not within the specified time range
    echo json_encode([
        'status' => 'error',
        'message' => 'No matching content in the queue or playback time not within the specified range.'
    ]);
}

// Close the statement and database connection
$stmt->close();
$conn->close();
?>