<?php

$id = $_POST['id'];
$score = $_POST['score'];

$dbhost = "localhost";
$db_name = "Game";
$db_table = "Users";
$username = "root";
$DBPassword = "";


try {
    $db = new PDO("mysql:host=$dbhost; dbname=$db_name", $username, $DBPassword);

    $sql = "UPDATE Users SET score='$score' WHERE id=$id";

    $stmt = $db->prepare($sql);

    if ($stmt->execute()) {
        echo ("succes");
    } else {
        echo ("error");
    }
} catch (PDOException $e) {
    echo "Warning!:" . $e->getMessage() . "<br/>";
}
