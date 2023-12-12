<?php
// Fetches the end time for the stream
include 'dbcon.php';

$query = "SELECT endTime FROM start_end_time LIMIT 1";
$result = mysqli_query($conn, $query);

if ($result && mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $endTime = $row['endTime'];
    echo $endTime;
} else {
    echo "No end time found";
}

mysqli_close($conn);
?>