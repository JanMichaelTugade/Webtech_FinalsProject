<?php
// Script for the log out function
require_once 'dbcon.php';
session_start();

$sessionId = $_SESSION['uniqid'];
$username = $_SESSION['username'];

// Update user_logs table
$updateQuery = "UPDATE user_logs SET logout_time = CURRENT_TIMESTAMP WHERE session_id = ? AND username = ?";
$updateStmt = $conn->prepare($updateQuery);
$updateStmt->bind_param("ss", $sessionId, $username);
$updateStmt->execute();
$updateStmt->close();

// Destroy session
session_unset();
session_destroy();

header('Location: ../../index.php');
?>
