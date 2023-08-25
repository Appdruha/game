<?php

$dbhost = "localhost";
$db_name = "Game";
$db_table = "Users";
$username = "root";
$DBPassword = "";

$conn = mysqli_connect($dbhost, $username, $DBPassword, "$db_name");
$jsonArr = array();
$sql = mysqli_query($conn, 'SELECT * FROM Users ORDER BY score DESC');
while ($result = mysqli_fetch_array($sql)) {
    $arr = array('id' => $result['id'], 'name' => $result['name'], 'email' => $result['email'], 'password' => $result['password'], 'score' => $result['score']);
    $jsonStr = json_encode($arr);
    $jsonObj = json_decode($jsonStr);
    $jsonArr[] = $jsonObj;

    
}


echo json_encode($jsonArr);
