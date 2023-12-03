<?php
// Include the db connection file
include 'dbcon.php';

// Retrieve the selected content name from the AJAX request
$content = $_POST['content'];

// Fetch the video path from the database based on the content name
$sql = "SELECT path FROM CONTENT WHERE name = '$content'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // Get the path from the first row of the result
  $row = $result->fetch_assoc();
  $videoPath = $row['path'];

  // Create a response array
  $response = array('path' => $videoPath);
} else {
  // If the content is not found, return an empty response
  $response = array();
}

// Close the database connection
$conn->close();

// Send the response back to the JavaScript code as JSON
echo json_encode($response);
?>