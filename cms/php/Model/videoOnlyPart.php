<?php
// Include necessary files or configurations here if needed

// Your PHP logic or data retrieval can go here if needed

// Output only the video player section without the surrounding HTML structure
?>
<div class="broadcastMonitor">
    <video id="videoPlayer" autoplay muted controls controlsList="nodownload" oncontextmenu="return false" 
    style="    position: relative;
    width: 174vh;
    height: 95vh;
    object-fit: cover;
    left:-10px;
    top:-5px;
    "></video>
    <div id="noVideoMessage" style="display: none;">
        <img id="ImagePlaceholder" src="" alt="ImagePlaceholder" >
    </div>
</div>

<!-- Include the playVideo.js script -->
<script src="/cms/js/playVideo.js"></script>
<script src="js/liveStream.js"></script>
