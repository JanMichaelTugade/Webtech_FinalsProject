<?php
// Script for deleting a content from the queue
require_once 'dbcon.php';

$position = $_POST['position'];

$conn->begin_transaction();

try {
  $deleteQuery = "DELETE FROM queue WHERE position = ?";
  $deleteStmt = $conn->prepare($deleteQuery);
  $deleteStmt->bind_param('i', $position);
  $deleteStmt->execute();

  $updateQuery = "UPDATE queue SET position = position - 1 WHERE position > ?";
  $updateStmt = $conn->prepare($updateQuery);
  $updateStmt->bind_param('i', $position);
  $updateStmt->execute();

  $conn->commit();

  echo "Row deleted successfully.";
} catch (Exception $e) {
  $conn->rollback();

  echo "Error deleting row: " . $e->getMessage();
}

$conn->close();
?>