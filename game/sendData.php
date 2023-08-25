<?php

if (isset($_POST['email']) &&  isset($_POST['name']) && isset($_POST['password'])) {

    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $dbhost = "localhost";
    $db_name = "Game";
    $db_table = "Users";
    $username = "root";
    $DBPassword = "";


    try {
        $db = new PDO("mysql:host=$dbhost; dbname=$db_name", $username, $DBPassword);

        $insert_data = $db->prepare("INSERT INTO Users (email, name, password) VALUES (:email, :name, :password)");

        $insert_data->bindParam(':email', $email, PDO::PARAM_STR);
        $insert_data->bindParam(':name', $name, PDO::PARAM_STR);
        $insert_data->bindParam(':password', $password, PDO::PARAM_STR);

        if ($insert_data->execute()){
            echo("succes");
        } else {
            echo("error");
        }
    } catch (PDOException $e) {
        echo "Warning!:" . $e->getMessage() . "<br/>";
    }
}
