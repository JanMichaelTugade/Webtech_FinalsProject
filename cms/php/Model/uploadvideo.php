<?php
require "dbcon.php";
session_start();

ini_set('display_errors', 1);

if (isset($_FILES['file']) && isset($_POST['submit'])) {
    $name = $_FILES['file']['name'];
    $target_dir = "/videos";
    $target_file = $target_dir . $name;

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
                $path = $target_file;

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
    if ($file_extension == "mp4") {
        // Get duration for MP4 files (assumes the file is in MP4 format)
        $duration_seconds = shell_exec("mediainfo --Inform=\"Video;%Duration%\" $file_path");

        if ($duration_seconds !== false) {
            return round(floatval($duration_seconds) / 1000); // Convert milliseconds to seconds
        } else {
            return false; // Unable to retrieve duration
        }
    } elseif ($file_extension == "mp3") {
        // Get duration for MP3 files (replace this with your MP3 duration retrieval logic)
        return 0; // Placeholder, replace with actual MP3 duration retrieval
    } else {
        return false; // Unknown format, set to default
    }
}
?>
