<?php
// Script for updating the queue with live stream duration
require_once 'dbcon.php';

$contentID = $_POST['contentID'];
$duration = $_POST['duration'];

$conn->begin_transaction();

try {
  // Step 1: Get the maximum position in the queue
  $maxPositionQuery = "SELECT MAX(position) AS maxPosition FROM queue";
  $maxPositionResult = $conn->query($maxPositionQuery);

  if ($maxPositionResult) {
    $row = $maxPositionResult->fetch_assoc();
    $maxPosition = ($row['maxPosition'] !== null) ? $row['maxPosition'] + 1 : 1;

    // Step 2: Update the positions of existing videos
    $updatePositionsQuery = "UPDATE queue SET position = position + 1";
    $updatePositionsResult = $conn->query($updatePositionsQuery);

    if ($updatePositionsResult) {
      // Step 3: Insert the live stream with position 1
      $insertLiveStreamQuery = "INSERT INTO queue (content_ID, position, liveDuration) VALUES (?, 1, ?)";
      $insertLiveStreamStmt = $conn->prepare($insertLiveStreamQuery);
      $insertLiveStreamStmt->bind_param('ii', $contentID, $duration);
      $insertLiveStreamStmt->execute();

      if ($insertLiveStreamStmt->affected_rows > 0) {
        $conn->commit();
        echo json_encode(['success' => true, 'message' => 'Queue updated successfully']);
      } else {
        $conn->rollback();
        echo json_encode(['success' => false, 'message' => 'Error inserting live stream']);
      }
    } else {
      $conn->rollback();
      echo json_encode(['success' => false, 'message' => 'Error updating positions']);
    }
  } else {
    $conn->rollback();
    echo json_encode(['success' => false, 'message' => 'Error fetching max position']);
  }
} catch (Exception $e) {
  $conn->rollback();
  echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}

$conn->close();
?>
