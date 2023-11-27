<?php 
require_once 'dbcon.php';

session_start();
session_unset();
session_destroy();

$updateQuery = "UPDATE user SET status = 'Offline' WHERE username = ?";
$updateStmt = $conn->prepare($updateQuery);
$updateStmt->bind_param("s", $username);
$updateStmt->execute();
$updateStmt->close();


header('Location: index.php');

?>