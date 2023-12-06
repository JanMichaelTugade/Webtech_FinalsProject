<?php

require_once 'dbcon.php';

$query = "
    SELECT combined_name,
           livestream_startTime,
           livestream_endTime
    FROM (
        SELECT livestream.title AS combined_name,
               livestream.startTime AS livestream_startTime,
               livestream.endTime AS livestream_endTime
        FROM livestream

        UNION ALL

        SELECT content.name AS combined_name,
               content.startTime AS content_startTime,
               content.endTime AS content_endTime
        FROM content
    ) AS combined_data
    ORDER BY livestream_startTime";

$result = $conn->query($query);

if ($result->num_rows > 0) {
    $data = [];

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo json_encode([]);
}

$conn->close();
?>