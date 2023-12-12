<?php
// setStartEndTime.php

include 'dbcon.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $startTime = $_POST['startTime'] ?? null;
  $endTime = $_POST['endTime'] ?? null;

  $query = "UPDATE start_end_time SET";

  $setStatements = array();

  if (!is_null($startTime)) {
    $setStatements[] = "startTime = '$startTime'";
  }

  if (!is_null($endTime)) {
    $setStatements[] = "endTime = '$endTime'";
  }

  if (count($setStatements) > 0) {
    $query .= " " . implode(", ", $setStatements) . " LIMIT 1";

    // Execute the SQL statement
    if (mysqli_query($conn, $query)) {
      echo "Start and/or end time updated successfully";
    } else {
      echo "Error updating start and/or end time: " . mysqli_error($conn);
    }
  } else {
    echo "No start or end time provided";
  }
} else {
  echo "Invalid request";
}

mysqli_close($conn);
?>