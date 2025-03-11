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

// Get data from POST request
$data = json_decode(file_get_contents("php://input"), true);

// Insert data into MySQL table
foreach ($data as $class) {
    $sql = "INSERT INTO timetable (subject, day, time, teacher) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $class['subject'], $class['day'], $class['time'], $class['teacher']);
    $stmt->execute();
}

echo "Data exported to MySQL successfully";

$stmt->close();
$conn->close();
?>