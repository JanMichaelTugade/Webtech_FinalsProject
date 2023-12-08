<?php
include 'dbcon.php';

date_default_timezone_set('Asia/Singapore');

$eightAMTimestamp = strtotime(date('Y-m-d 20:50:00')); //Set the start time

$elapsedTimeInSeconds = time() - $eightAMTimestamp;

$query = "SELECT content.path, queue.position, content.duration
            FROM queue
            INNER JOIN content ON queue.content_ID = content.contentID
            ORDER BY queue.position";

$result = mysqli_query($conn, $query);

if ($result) {
    $videos = [];
    $queueDuration = 0;

    $elapsedTime = time() * 1000 - $eightAMTimestamp;

    // Iterate through the videos in the queue
    while ($row = mysqli_fetch_assoc($result)) {
        $elapsedTime -= $row['duration'];
        $queueDuration += $row['duration']; 

        if ($elapsedTime <= 0) {
            $videos[] = $row;
            break;
        }

        $videos[] = $row;
    }

    // Return the information of the current video, the elapsed timestamp, and the total queue duration
    echo json_encode(['videos' => $videos, 'elapsedTime' => $elapsedTimeInSeconds, 'queueDuration' => $queueDuration]);
} else {
    echo json_encode(['error' => 'Unable to fetch videos']);
}

// Close your database connection
mysqli_close($conn);
?>
