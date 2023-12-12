<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$current_time = date("g:i:s a");
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="cms.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css" integrity="sha512-..." crossorigin="anonymous" />
        <link rel="stylesheet" href="../CSS/header-footer.css">
        <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
        <link href="https://vjs.zencdn.net/8.6.1/video-js.css" rel="stylesheet" />
        <title>CMS</title> 
    </head>
    <body>
        <div class="broadcastPanel">
            <h2 id="time"></h2>
            <div class="broadcastMonitor">
                <video id="videoPlayer" autoplay muted controls controlsList="nodownload" oncontextmenu="return false"></video>
                <div id="noVideoMessage" style="display: none;">
                    <img id="ImagePlaceholder" src="" alt="ImagePlaceholder">
                </div>
            </div>
            <div id="liveIndicator">
                LIVE
            </div>
            <div id="onAirIndicator">
                On-Air
            </div>
     
            <div id="liveManager">
                <h2>Live Manager</h2>
                <button id="startLivebtn">Start Live</button>
                <button id="endLivebtn">End Live</button>
                <br><br>
                <label for="startTime">Start Time:</label>
                <input type="time" id="startTime" name="startTime" placeholder="Start Time">
                <br><br>
                <label for="endTime">End Time:</label>
                <input type="time" id="endTime" name="endTime" placeholder="End Time">
                <br><br>
                <button id="saveTimes">Save</button>
            </div>
        </div>

        <div id="cmsPanel">
            <div id="uploadedFilesPanel"> 
                <h2>Uploaded Files</h2>
                <div id="searchBox">
                    <i class="fa-solid fa-magnifying-glass fa-xl" style="color: #083068;"></i>
                    <input type="text" id="searchfld"  oninput="searchTable()">
                </div>
                <table>
                    <thead>
                      <tr>
                        <th>Action</th>
                        <th>Name</th>
                        <th>Duration</th>
                        <th>Content ID</th>
                      </tr>
                    </thead>
                    <tbody id="resultsBody" >
                    </tbody>
                  </table>
                 
                    <input type="file" name="file" accept=".mp3, .mp4" id="inputfile" style="display: none;">

                    <button type="button" onclick="$('#inputfile').click()" id="uploadbtn">
                        <i class="fa-solid fa-upload" style="color: #ffffff;"></i>
                        Upload Files
                    </button>            
            </div>

            <div id="timeSlotsPanel"> 
                <h2>In Queue</h2>
                <button id="addslotbtn" type="button">
                <i class="fa-solid fa-plus" style="color: #ffffff;"></i>
                    Add Slot
                </button>

                <dialog class="addTimeslot" id="addTimeslot">
                    <h2>Add Timeslot</h2>
                    <button id="backbtn">
                        <i class="fa-solid fa-arrow-left" style="color: #ffffff;"></i>
                    Back
                    </button>
                    <label for="content">Select Content</label>
                    <select id="timeslotSelection4">
                    </select>

                    <button id="save-addslotbtn" onclick="addSlot()">Add Slot</button>
                </dialog>

                <!-- List of videos in queue -->
                <div class="timeslot">
                    <table id="scheduleTable">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Position</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <!-- Existing table rows go here -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
            
        <div id="sidebar">
            <img src="../Resources/mmlogo.png" id="mmlogo2" draggable="false">
            <a href="php/View/historylogs.php">
                <img src="../Resources/Historylogo.png" id="historyIcon" draggable="false">
            </a>
            
            <a href="php/Model/logout.php">
                <img src="../Resources/logout.png" id="logoutIcon" draggable="false">
            </a>
        </div>




        <script src="js/playVideo.js"></script>
        <script src="js/cms.js"></script>
        <script src="js/queue.js"></script>
        <script src="js/liveStream.js"></script>
        <script src="php/Model/uploadvideo.php"></script>
        <script src="php/Model/resultsBody.php"></script>
        <script src="https://vjs.zencdn.net/8.6.1/video.min.js"></script>
    </body>

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
  
</html>
