<?php

require_once 'dbcon.php';
session_start();

if (isset($_POST['username'])) {
    // Retrieve the form data
    $username = $_POST['username'];
    $password = $_POST['password'];

    // TODO: Validate the form data and authenticate the user against the database

    // Prepare the SQL statement with a parameterized query
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
                if ($row['role'] == 'Manager') { // Check if the user is a manager
                    // Update user status to online 
                    $updateQuery = "UPDATE user SET status = 'Online' WHERE username = ?";
                    $updateStmt = $conn->prepare($updateQuery);
                    $updateStmt->bind_param("s", $username);
                    $updateStmt->execute();
                    $updateStmt->close();

                    $_SESSION['username'] = $username;

                    // Print (echo) and redirect to main page
                    echo "User authenticated successfully.";
                    header("Location: cms.php");
                    exit();
                } else {
                    // User is not a manager
                    echo "You do not have permission to access this page.";
                }
            } else {
                // User is already online
                echo "User is already online.";
            }
        } else {
            // Password is incorrect
            echo "Incorrect password.";
        }
    } else {
        // User not found
        echo "User not found.";
    }

    // Close the prepared statement
    $stmt->close();

    // Close the database connection
    $conn->close();
}

?>