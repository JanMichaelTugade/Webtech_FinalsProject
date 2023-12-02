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
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="cms.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css" integrity="sha512-..." crossorigin="anonymous" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js" integrity="sha512-..." crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
        <title>CMS</title> 
    </head>
    <body>
        <div class="broadcastPanel">
            <h2 id="time">8:45:00 pm</h2>
            <div class="broadcastMonitor">
                 <!--to be added  -->
            </div>
            <div id="liveIndicator">
                LIVE
            </div>
            <div id="onAirIndicator">
                On-Air
            </div>
            <div id="broadcastButtons">
                <button id="startbtn" type="button"> 
                    <i class="fa-solid fa-play" style="color: #ffffff;"></i> START 
                </button>
                <button id="stopbtn" type="button">
                    <i class="fa-solid fa-stop" style="color: #ffffff;"></i> STOP 
                </button>
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
                    <h4>8:00:00 - 8:00:00</h4>
                    <h3>Titi NI LoLo</h3>
                    <p>Content ID: maliit1</p>
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
                <div id="customTime">&nbsp;</div>
                <p></p>
                <div id="visualization"></div>
            </div>
        </div>
        <div id="sidebar">
            <img src="../Resources/mmlogo.png" id="mmlogo2" draggable="false">
            <a href="logs.html">
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

    <script>
       document.addEventListener('DOMContentLoaded', function () {
    var data = new vis.DataSet([
        {
            id: 1,
            start: new Date(new Date().setHours(9, 0, 0, 0)),
            end: new Date(new Date().setHours(10, 0, 0, 0)), 
            content: "Titi ni Lolo",
            style: 'background: yellow;',
        },
    ]);

    var options = {
        showCurrentTime: true,
        height: '250%',
        zoomMax: 1000 * 60 * 60 * 10, 
        min: new Date(new Date().setHours(8, 0, 0, 0)), 
        max: new Date(new Date().setHours(18, 0, 0, 0)), 
    };

    var container = document.getElementById("visualization");
    var timeline = new vis.Timeline(container, data, options);

    timeline.addCustomTime(new Date());

    timeline.on("timechange", function (event) {
        document.getElementById("customTime").innerHTML =
            "Custom Time: " + event.time;

        var item = data.get(1);
        if (event.time > item.start) {
            item.end = new Date(event.time);
            var now = new Date();
            if (event.time < now) {
                item.content = "Dynamic event (past)";
                item.className = "past";
            } else if (event.time > now) {
                item.content = "Dynamic event (future)";
                item.className = "future";
            } else {
                item.content = "Dynamic event (now)";
                item.className = "now";
            }

            data.update(item);
        }
    });

    timeline.on("rangechanged", function (properties) {
        // Ensure the visible range stays within the specified bounds
        if (properties.byUser) {
            var newStart = new Date(properties.start);
            var newEnd = new Date(properties.end);

            if (newStart < options.min) {
                timeline.setWindow(options.min, new Date(newStart.getTime() + properties.end - properties.start));
            }

            if (newEnd > options.max) {
                timeline.setWindow(new Date(newEnd.getTime() - properties.end + properties.start), options.max);
            }
        }
    });

    var start = new Date(new Date().setHours(8, 0, 0, 0)); // Set to 8:00 AM
    var end = new Date(new Date().setHours(18, 0, 0, 0)); // Set to 6:00 PM
    timeline.setWindow(start, end, { animation: false });
});
        </script>

    
        
        
</html>