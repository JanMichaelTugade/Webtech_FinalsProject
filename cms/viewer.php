<?php
$current_time = date("g:i:s a");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Your existing head content -->
    <style>
        body {
            margin: 0;
            overflow: hidden; /* Hide scrollbars */
        }

        #cmsIframe {
            width: 100vw;
            height: 100vh;
            border: none;
        }
    </style>
</head>
<body>
    <div class="broadcastMonitor">
        <!-- Add the iframe here with the source pointing to cms.php -->
        <iframe id="cmsIframe" src="cms.php" frameborder="0"></iframe>
    </div>

    <script>
        const cmsIframe = document.getElementById('cmsIframe');

        // Listen for messages from the iframe
        window.addEventListener('message', (event) => {
            const data = event.data;
            if (data.type === 'playVideo') {
                // Update the source of the iframe
                cmsIframe.src = `cms.php?videoSrc=${encodeURIComponent(data.videoSrc)}`;
            }
        });
    </script>
</body>
</html>
