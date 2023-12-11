<?php
$current_time = date("g:i:s a");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../CSS/header-footer.css">
    <link rel="stylesheet" href="viewer.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js" integrity="sha512-..." crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <title>Viewer</title> 

</head>
<body>
    
    <div class="broadcastMonitor">
        <video id="videoPlayer" autoplay muted controls controlsList="nodownload" oncontextmenu="return false"></video>
        <div id="noVideoMessage" style="display: none;">
            <img id="ImagePlaceholder" src="" alt="ImagePlaceholder">
        </div>
    </div>


    <script src="../cms\js\playVideo.js"></script>
    <script src="viewer.js"></script>
    <script src="https://vjs.zencdn.net/8.6.1/video.min.js"></script>

    <footer>
        <img src="../Resources/mmlogo.png" alt="mmlogo" width="35" height="35">
        <img src="../Resources/samcislogo.png" alt="samcislogo" width="50" height="50">
        <img src="../Resources/slulogo.png" alt="slulogo" width="50" height="45">
        <p class="footer-p">
            MODEL M - 9481 IT 312 - SY. 2023 <br>
            CIS DEPARTMENT <br>
            School of Accountancy, Management, Computing, and Information Studies <br>
            Saint Louis University
        </p>
    </footer>
</body>
</html>
