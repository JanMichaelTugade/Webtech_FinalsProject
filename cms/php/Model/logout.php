<?php 
// Script for the log out function
require_once 'dbcon.php';
session_start();

$updateQuery = "UPDATE user SET status = 'Offline' WHERE username = ?";
$updateStmt = $conn->prepare($updateQuery);
$updateStmt->bind_param("s", $_SESSION['username']);
$updateStmt->execute();
$updateStmt->close();

session_start();
session_unset();
session_destroy();

header('Location: ../../index.php');

?>