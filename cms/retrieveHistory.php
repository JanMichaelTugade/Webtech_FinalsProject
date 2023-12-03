<?php

require 'dbcon.php';

$query = "SELECT * FROM log";
$result = $conn->query($query);

$conn->close();
?>
