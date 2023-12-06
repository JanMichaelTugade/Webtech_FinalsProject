<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
// Check if the user is already logged in
if (!isset($_SESSION['username'])) {
    // User is already logged in, redirect to cms.html
    header("Location: login_cms.php");
    exit();
} 
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
        <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
        <title>CMS</title> 
    </head>
    <body>
        <div class="broadcastPanel">
            <h2 id="time"></h2>
            <div class="broadcastMonitor">
                <video id="videoPlayer" autoplay></video>
            </div>
            <div id="liveIndicator">
                LIVE
            </div>
            <div id="onAirIndicator">
                On-Air
            </div>

            <div id="liveManager">
                <h2>Live Manager</h2>
                <div id="channel1Indicator"></div>
                <h4>Channel 1</h2>
                <div id="channel2Indicator"></div>
                <h4>Channel 2</h2>
                <button id="startLivebtn">Start Live</button>
                <button id="endLivebtn">End Live</button>
                <button id="changeChannelbtn">
                    <i class="fa-solid fa-rotate fa-flip-both" style="color: #ffffff;"></i>
                    Change Channel
                </button>
            </div>
        </div>
      

        <div id="cmsPanel">

            <div id="uploadedFilesPanel"> 
                <h2>Uploaded Files</h2>
                <div id="searchBox">
                    <i class="fa-solid fa-magnifying-glass fa-xl" style="color: #083068;"></i>
                    <input type="text" id="searchfld">
                </div>
                <table>
                    <thead>
                      <tr>
                        <th>view</th>
                        <th>name</th>
                        <th>Duration</th>
                        <th>contentID</th>
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
                <h2>Time Slots</h2>
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
                    <label for="starttime" id="starttimelabel">Start Time</label>
                    <select id="timeslotSelection2">
                    </select>
                    <label for="endtime">End Time</label>
                    <select id="timeslotSelection3">
                    </select>
                    <label for="content">Select Content</label>
                    <select id="timeslotSelection4">
                    </select>

                    <button id="save-addslotbtn" onclick="addSlot()">Add Slot</button>
                </dialog>


                <div class="timeslot"> 
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                        </tr>
                    </thead>
                    <tbody id="retrievedschedule">
                    </tbody>
                </table>
                    <button id="editbtn" type="button">
                        <i class="fa-solid fa-pen-to-square" style="color: #ffffff;"></i>
                        Edit Slot
                    </button>
                    <button id="deletebtn" type="button">
                        <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
                        Delete Slot
                    </button>
                </div>
            </div>
            
            <div id="fillerPanel">
                <h2>Fillers</h2>
                <button id="addsfillbtn" type="button">
                    <i class="fa-solid fa-plus" style="color: #ffffff;"></i>
                    Add Fillers
                  </button>
            </div>
        </div>
            
        <div id="playerPanel"> 
            <h2>00:00:00</h2>
            <div id="player">
            </div>
        </div>
        <div id="sidebar">
            <img src="../Resources/mmlogo.png" id="mmlogo2" draggable="false">
            <a href="historylogs.php">
                <img src="../Resources/Historylogo.png" id="historyIcon" draggable="false">
            </a>
            
            <a href="logout.php">
                <img src="../Resources/logout.png" id="logoutIcon" draggable="false">
            </a>
        </div>



        <script src="cms.js"></script>
        <script src="uploadvideo.php"></script>
        <script src="resultsBody.php"></script>
    </body>
</html>