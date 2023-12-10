<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/Webtech_FinalsProject/Webtech_FinalsProject/getID3-master/getid3/getid3.php');

require "dbcon.php";
session_start();

ini_set('display_errors', 1);

if (isset($_FILES['file']) && isset($_POST['submit'])) {
    $name = $_FILES['file']['name'];
    $target_dir = "../../videos/";
    $target_file = $target_dir . $name;
    $path2 = "videos/" . $name;

    $extension = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    $extensions_arr = array("mp3", "mp4");

    if (in_array($extension, $extensions_arr)) {
        if (move_uploaded_file($_FILES['file']['tmp_name'], $target_file)) {
            echo "Upload successful. Target file: $target_file"; // Debugging statement

            // Get duration using custom function
            $duration_seconds = getVideoDuration($target_file, $extension);

            if ($duration_seconds !== false) {
                $contentID = '';
                $name = mysqli_real_escape_string($conn, $name);
                $fileType = $extension;
                $path = $path2;

                $sql = "INSERT INTO content (contentID, name, fileType, path, duration) VALUES ('$contentID', '$name', '$fileType', '$path', '$duration_seconds')";

                if (mysqli_query($conn, $sql)) {
                    $_SESSION['message'] = "File uploaded successfully and details inserted into the database.";
                    echo "success";
                } else {
                    $error_message = "Error inserting details into the database: " . mysqli_error($conn);
                    $_SESSION['message'] = $error_message;
                    echo "error_insert: " . $error_message;
                }
            } else {
                echo "error_duration: Unable to retrieve video duration.";
            }
        } else {
            echo "error_upload: Error uploading the file. Move failed."; // Debugging statement
        }
    } else {
        echo "invalid_extension: Invalid file extension.";
    }
} else {
    echo "no_file: No file submitted.";
}

function getVideoDuration($file_path, $file_extension) {
    require_once($_SERVER['DOCUMENT_ROOT'] . '/Webtech_FinalsProject/Webtech_FinalsProject/getID3-master/getid3/getid3.php');

    $getID3 = new getID3;
    $file_info = $getID3->analyze($file_path);

    if (isset($file_info['playtime_seconds'])) {
        return round($file_info['playtime_seconds']);
    } else {
        return false; // Unable to retrieve duration
    }
}
?>
