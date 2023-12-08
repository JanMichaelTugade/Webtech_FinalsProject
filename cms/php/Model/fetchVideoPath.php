<?php
// For getting the video path of a selected content
include 'dbcon.php';

$content = $_POST['content'];

$sql = "SELECT path FROM CONTENT WHERE name = '$content'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  $videoPath = $row['path'];
  $response = array('path' => $videoPath);

} else {
  $response = array();
}

$conn->close();

echo json_encode($response);
?>