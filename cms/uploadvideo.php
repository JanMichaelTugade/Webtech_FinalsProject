<?php
require "dbcon.php";
session_start();

ini_set('display_errors', 1);

if (isset($_FILES['file']) && isset($_POST['submit'])) {
    // No maximum size limit
    // $maxsize = 500 * 1024 * 1024;

    $name = $_FILES['file']['name'];
    $target_dir = "videos/";
    $target_file = $target_dir . $name;

    $extension = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    $extensions_arr = array("mp3", "mp4");

    if (in_array($extension, $extensions_arr)) {
        // Removed size check
        // if ($_FILES['file']['size'] >= $maxsize) {
        //     $_SESSION['message'] = "File too large.";
        // } else {
            if (move_uploaded_file($_FILES['file']['tmp_name'], $target_file)) {

                $contentID = '';
                $name = mysqli_real_escape_string($conn, $name);
                $fileType = $extension;
                $path = $target_file;

                $sql = "INSERT INTO content (contentID, name, fileType, path, duration) VALUES ('$contentID', '$name', '$fileType', '$path', '$duration')";

                if (mysqli_query($conn, $sql)) {
                    $_SESSION['message'] = "File uploaded successfully and details inserted into the database.";
                    echo "success";
                } else {
                    $_SESSION['message'] = "Error inserting details into the database: " . mysqli_error($conn);
                    echo "error";
                }
            }
        // }
    }
}
?>
