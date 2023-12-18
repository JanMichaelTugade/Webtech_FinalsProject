<?php

require_once 'dbcon.php';
session_start();

$sessionId = $_SESSION['uniqid'];
$username = $_SESSION['username'];
$inactiveTimeout = 1440; 


if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > $inactiveTimeout)) {
  
    $updateQuery = "UPDATE user_logs SET logout_time = CURRENT_TIMESTAMP WHERE session_id = ? AND username = ?";
    $updateStmt = $conn->prepare($updateQuery);
    $updateStmt->bind_param("ss", $sessionId, $username);
    $updateStmt->execute();
    $updateStmt->close();

   
    session_unset();
    session_destroy();

    header('Location: ../../index.php');
    exit(); 
}


$_SESSION['last_activity'] = time();


$updateQuery = "UPDATE user_logs SET logout_time = CURRENT_TIMESTAMP WHERE session_id = ? AND username = ?";
$updateStmt = $conn->prepare($updateQuery);
$updateStmt->bind_param("ss", $sessionId, $username);
$updateStmt->execute();
$updateStmt->close();


session_unset();
session_destroy();

header('Location: ../../index.php');
?>
