<?php
// Script for getting the content to play in the video
include 'dbcon.php';

date_default_timezone_set('Asia/Singapore');

$eightAMTimestamp = strtotime(date('Y-m-d 10:10:00')); //Set the start time, can edit. Default is 8AM

$elapsedTimeInSeconds = time() - $eightAMTimestamp;

$query = "SELECT content.path, queue.position, content.duration, queue.liveDuration
            FROM queue
            INNER JOIN content ON queue.content_ID = content.contentID
            ORDER BY queue.position";

$result = mysqli_query($conn, $query);

if ($result) {
    $videos = [];
    $queueDuration = 0;

    $elapsedTime = time() * 1000 - $eightAMTimestamp;

    while ($row = mysqli_fetch_assoc($result)) {
        $elapsedTime -= $row['duration'] + $row['liveDuration']; 
        $queueDuration += $row['duration'] + $row['liveDuration'];
        $elapsedTimeInSeconds -= $row['liveDuration']; 

        if ($elapsedTime <= 0) {
            $videos[] = $row;
            break;
        }

        $videos[] = $row;
    }

    echo json_encode(['videos' => $videos, 'elapsedTime' => $elapsedTimeInSeconds, 'queueDuration' => $queueDuration]);
} else {
    echo json_encode(['error' => 'Unable to fetch videos']);
}

mysqli_close($conn);
?>
