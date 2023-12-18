<?php
$current_time = date("g:i:s a");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="viewer.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js" integrity="sha512-..." crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <title>Viewer</title> 

</head>
<body>
    <img src="../Resources/CheersLogo.png" alt="cheerslogo" width="150px" height="auto">
    <img src="../Resources/slulogo.png" alt="slulogo2" width="120px" height="auto">
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
        <img src="../Resources/slulogo.png" alt="slulogo" width="50" height="45">
        <p class="footer-p">
            Developed by team Model M <br>
            IT DEPARTMENT <br>
            School of Accountancy, Management, Computing, and Information Studies <br>
            Saint Louis University
        </p>
    </footer>
</body>
</html>
