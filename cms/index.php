<?php

// Start the session
session_start();

// Check if the user is already logged in
if (isset($_SESSION['username'])) {
    // User is already logged in, redirect to cms.php
    include('cms.php');
} else {
    // Else, go to login page
    include('login_cms.php');
}

?>