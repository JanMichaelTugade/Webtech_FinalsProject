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

    <style>
        #custom-controls {
            display: none;
            position: absolute;
            bottom: 10%;
            width: 80%;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 5px;
            box-sizing: border-box;
            z-index: 10000;
        }

        .broadcastMonitor:hover #videoPlayer ~ #custom-controls,
        #custom-controls:hover {
        display: flex;
        }

        #volumeControl {
            width: 100px;
        }
    </style>
</head>
<body>
    <img src="../Resources/CheersLogo.png" alt="cheerslogo" width="150px" height="auto">
    <img src="../Resources/slulogo.png" alt="slulogo2" width="120px" height="auto">
    <div class="broadcastMonitor">
        <video id="videoPlayer" autoplay muted controlsList="nodownload" oncontextmenu="return false"></video>
        <div id="noVideoMessage" style="display: none;">
            <img id="ImagePlaceholder" src="" alt="ImagePlaceholder">
        </div>
        <div id="custom-controls"></div>
    </div>

    <script src="../cms\js\playVideo.js"></script>
    <script src="viewer.js"></script>
    <script src="https://vjs.zencdn.net/8.6.1/video.min.js"></script>

    <footer>
        <img src="../Resources/slulogo.png" alt="slulogo" width="50" height="45">
        <p class="footer-p">
            MODEL M - 9481 IT 312 - SY. 2023 <br>
            CIS DEPARTMENT <br>
            School of Accountancy, Management, Computing, and Information Studies <br>
            Saint Louis University
        </p>
    </footer>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            var video = document.getElementById("videoPlayer");
            var customControls = document.getElementById("custom-controls");

            var volumeControl = document.createElement("input");
            volumeControl.id = "volumeControl";
            volumeControl.type = "range";
            volumeControl.min = 0;
            volumeControl.max = 1;
            volumeControl.step = 0.1;
            volumeControl.value = video.volume;

            volumeControl.addEventListener("input", function() {
                video.volume = volumeControl.value;
                if (video.volume > 0) {
                    video.muted = false;
                } else {
                    video.muted = true;
                }
            });
            customControls.appendChild(volumeControl);
        });
    </script>
</body>
</html>