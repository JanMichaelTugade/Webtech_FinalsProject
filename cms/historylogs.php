<?php
require 'dbcon.php';

$query="Select * FROM logs";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/header-footer.css">
    <link rel="stylesheet" href="logs.css">
    
    <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round|Open+Sans"> -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>

    <title>History Logs</title>
</head>
<body>
    <div class="titleUM">
        <h1>History Logs</h1>
    </div>

    <div class="search-add">
        <div class="input-SD">
          <input class="search-form" type="text" placeholder="Search" aria-label="Search">
          <button type="button" class="btn-sort">Sort By Date</button>
          <button type="button" class="btn-nolive">Without live</button>
        </div>
    </div>

    <div class="container-lg">
        <div class="table-responsive">
            <div class="table-wrapper">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>File Id</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>

                    <?php
                    $sql = "SELECT * FROM log";
                    $result = $conn-> query($sql);

                    if ($result-> num_rows > 0) {
                        while ($row = $result-> fetch_assoc()) {
                            echo "<td>". $row["histID"] 
                            ."<td>". $row["date"]
                            ."<td>". $row["time"]
                            ."<td>". $row["fileID"]
                            ."<td>". $row["ifLive"] ."<td>";
                        }
                        echo "</table";
                    }
                    else {
                        echo "0 result";
                    }
                    ?>

                </table>
            </div>
        </div>
    </div>  

    <!-- <div id="sidebar">
        <img src="../Resources/mmlogo.png" id="mmlogo2" draggable="false">
        <a href="logs.html">
            <img src="../Resources/Historylogo.png" id="historyIcon" draggable="false">
        </a>
        
        <a href="logout.php">
            <img src="../Resources/logout.png" id="logoutIcon" draggable="false">
        </a>
    </div> -->
    
    <footer>
        <img src="Resources/mmlogo.png" alt="mmlogo" width="35" height="35">
        <img src="Resources/samcislogo.png" alt="samcislogo" width="50" height="50">
        <img src="Resources/slulogo.png" alt="slulogo" width="50" height="45">
        <p class="footer-p">
            MODEL M - 9481 IT 312 - SY. 2023 <br>
            CIS DEPARTMENT <br>
            School of Accountancy, Management, Computing, and Information Studies <br>
            Saint Louis University
        </p>
    </footer>


</body>
</html>