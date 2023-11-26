<?php

require_once 'dbcon.php';
// Retrieve the form data
$username = $_POST['username'];
$password = $_POST['password'];

// TODO: Validate the form data and authenticate the user against the database

// Prepare the SQL statement with a parameterized query
$query = "SELECT username, password FROM user WHERE username = ? LIMIT 1";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // User found, check the password
    $row = $result->fetch_assoc();
    // use "if (password_verify($password, $row['password']))" for hashed passwords *for later
    if ($password == $row['password']) {
        // Password is correct, user authenticated successfully
        // TODO: Add your logic here
        echo "User authenticated successfully.";
        header("Location: cms.html");
        exit();
    } else {
        // Password is incorrect
        // TODO: Add your logic here
        echo "Incorrect password.";
    
    }
} else {
    // User not found
    // TODO: Add your logic here
    echo "User not found.";
}

// Close the prepared statement
$stmt->close();

// Close the database connection
$conn->close();
?>