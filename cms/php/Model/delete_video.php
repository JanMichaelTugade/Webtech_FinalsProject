<?php
require_once 'dbcon.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"));

    if ($data && isset($data->contentID) && isset($data->filePath)) {
        $contentID = $data->contentID;
        $filePath = $data->filePath;

        $fullFilePath = __DIR__ . '/../../' . $filePath;
        if (file_exists($fullFilePath)) {
            unlink($fullFilePath);
            $response['status'] = 'success';
            $response['message'] = 'Video file deleted from the server.';
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Video file not found on the server.';
        }

        $stmt = $conn->prepare('DELETE FROM content WHERE contentID = ?');
        $stmt->bind_param('s', $contentID);

        if ($stmt->execute()) {
            $response['status'] = 'success';
            $response['message'] = 'Record deleted from the database.';
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Error deleting record from the database: ' . $conn->error;
        }

        $stmt->close();
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Invalid data received.';
    }

    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    header('Allow: DELETE');
}
?>
