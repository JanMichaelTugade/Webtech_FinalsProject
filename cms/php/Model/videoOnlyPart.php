<?php
// Include necessary files or configurations here if needed

// Your PHP logic or data retrieval can go here if needed

// Output only the video player section without the surrounding HTML structure
?>
<div class="broadcastMonitor">
    <video id="videoPlayer" autoplay muted controls controlsList="nodownload" oncontextmenu="return false"></video>
    <div id="noVideoMessage" style="display: none;">
        <img id="ImagePlaceholder" src="" alt="ImagePlaceholder">
    </div>
</div>

<!-- Include the playVideo.js script -->
<script src="/cms/js/playVideo.js"></script>
