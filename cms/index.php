<?php

session_start();

// Check if the user is already logged in
if (isset($_SESSION['username']) && isset($_SESSION['uniqid'])) {
    include('php/View/cms.php');
} else {
    include('php/View/login_cms.php');
}
?>
