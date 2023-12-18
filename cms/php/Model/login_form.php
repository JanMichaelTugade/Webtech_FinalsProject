<?php
// Script for log in function
require_once 'dbcon.php';
session_start();

if (isset($_POST['username'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $query = "SELECT username, password, role FROM user WHERE username = ? LIMIT 1";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
       
        $row = $result->fetch_assoc();
        if ($password == $row['password']) {
            $role = $row['role'];
            if ($role == 'Manager') {
               
                $session_id = uniqid();
                $_SESSION['uniqid'] = $session_id;

                
                $loginQuery = "INSERT INTO user_logs (session_id, username, login_time, logout_time) VALUES (?, ?, CURRENT_TIMESTAMP, NULL)";
                $loginStmt = $conn->prepare($loginQuery);
                $loginStmt->bind_param("ss", $session_id, $username);
                $loginStmt->execute();
                $loginStmt->close();

                $_SESSION['username'] = $username;

                echo "User authenticated successfully.";
                header("Location: ../../index.php");
                exit();
            } else {
                echo "You do not have permission to access this page.";
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
