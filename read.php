<?php
// Connect to MySQL database
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "database";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to read data from MySQL table
$sql = "SELECT * FROM timetable";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data of each row
    while($row = $result->fetch_assoc()) {
        echo "Subject: " . $row["subject"]. " - Day: " . $row["day"]. " - Time: " . $row["time"]. " - Teacher: " . $row["teacher"]. "<br>";
    }
} else {
    echo "0 results";
}

$conn->close();
?>