<?php
require "dbcon.php";

if (isset($_POST['submit'])) {
    $maxsize = 5242880; 

    if (isset($_FILES['file']['name']) && $_FILES['file']['name'] != '') {
        $name = $_FILES['file']['name'];
        $target_dir = "videos/";
        $target_file = $target_dir . $name;

        $extension = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        $extensions_arr = array("mp3", "mp4");

        if (in_array($extension, $extensions_arr)) {
            if ($_FILES['file']['size'] >= $maxsize) {
                $_SESSION['message'] = "File too large.";
            } else {
                if (move_uploaded_file($_FILES['file']['tmp_name'], $target_file)) {
                    
                    $contentID = ''; 
                    $name = mysqli_real_escape_string($conn, $name); 
                    $fileType = $extension; 
                    $path = $target_file;

                    $sql = "INSERT INTO content (contentID, name, fileType, path) VALUES ('$contentID', '$name', '$fileType', '$path')";
                    
                    if (mysqli_query($conn, $sql)) {
                        $_SESSION['message'] = "File uploaded successfully and details inserted into the database.";
                    } else {
                        $_SESSION['message'] = "Error inserting details into the database: " . mysqli_error($conn);
                    }
                }
            }
        } else {
            $_SESSION['message'] = "Invalid file extension";
        }
    } else {
        $_SESSION['message'] = "Please select a file";
    }
}
?>



<!DOCTYPE html>
<html>
    <head>
        <title>upload file</title>
    </head>
    <body>

    <?php
    if(isset($_SESSION['hello'])){
        echo $_SESSION['ola'];
        unset($_SESSION['goodbye']);
    }
    ?>

    <form method="post" action="" enctype="multipart/form-data">
            <input type="file" name="file">
            <input type="submit" name="submit" value="Upload">
    </form>
    </body>
</html>