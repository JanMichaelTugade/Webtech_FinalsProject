<?php
// Script for log in function
require_once 'dbcon.php';
session_start();

if (isset($_POST['username'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $query = "SELECT username, password, status, role FROM user WHERE username = ? LIMIT 1";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // User found, check the password and role
        $row = $result->fetch_assoc();
        if ($password == $row['password']) {
            if ($row['status'] != 'Online') {
                if ($row['role'] == 'Manager') { 
                    $updateQuery = "UPDATE user SET status = 'Online' WHERE username = ?";
                    $updateStmt = $conn->prepare($updateQuery);
                    $updateStmt->bind_param("s", $username);
                    $updateStmt->execute();
                    $updateStmt->close();

                    $_SESSION['username'] = $username;

                    echo "User authenticated successfully.";
                    header("Location: ../../index.php");
                    exit();
                } else {
                    echo "You do not have permission to access this page.";
                }
            } else {
                echo "User is already online.";
            }
        } else {
            echo "Incorrect password.";
        }
    } else {
        echo "User not found.";
    }
    $stmt->close();

    $conn->close();
}

?>