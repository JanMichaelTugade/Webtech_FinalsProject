<?php
include 'dbcon.php';

// Set the timezone to GMT+8
date_default_timezone_set('Asia/Singapore'); // Change to your specific timezone

// Calculate the current timestamp at 8 AM
$eightAMTimestamp = strtotime(date('Y-m-d 10:25:00'));
$elapsedTimeInSeconds = time() - $eightAMTimestamp;

// Fetch the videos in the queue and their durations
$query = "SELECT content.path, queue.position, content.duration
            FROM queue
            INNER JOIN content ON queue.content_ID = content.contentID
            ORDER BY queue.position";

$result = mysqli_query($conn, $query);

if ($result) {
    $videos = [];
    $queueDuration = 0; // Initialize the total queue duration

    // Calculate the elapsed time since 8 AM
    $elapsedTime = time() * 1000 - $eightAMTimestamp;

    // Iterate through the videos in the queue
    while ($row = mysqli_fetch_assoc($result)) {
        // Accumulate the duration of each video
        $elapsedTime -= $row['duration'];
        $queueDuration += $row['duration']; // Accumulate the total queue duration

        // Check if the elapsed time is less than or equal to zero, meaning we found the current video
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
