<?php
require_once 'dbcon.php';

// Get the schedID and position from the request
$position = $_POST['position'];

// Start a transaction
$conn->begin_transaction();

try {
  // Delete the selected row
  $deleteQuery = "DELETE FROM queue WHERE position = ?";
  $deleteStmt = $conn->prepare($deleteQuery);
  $deleteStmt->bind_param('i', $position);
  $deleteStmt->execute();

  // Update the positions of the remaining rows
  $updateQuery = "UPDATE queue SET position = position - 1 WHERE position > ?";
  $updateStmt = $conn->prepare($updateQuery);
  $updateStmt->bind_param('i', $position);
  $updateStmt->execute();

  // Commit the transaction
  $conn->commit();

  echo "Row deleted successfully.";
} catch (Exception $e) {
  // Rollback the transaction if an error occurs
  $conn->rollback();

  echo "Error deleting row: " . $e->getMessage();
}

$conn->close();
?>