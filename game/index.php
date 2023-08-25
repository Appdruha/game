<?php require "sendData.php"
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="signUp.css">
</head>

<body>
    <div class="container">
        <form class="form">
            <p class="formHeading">Registration</p>
            <div class="inputContainer">
                <input type="email" class="input" placeholder=" " id="email" name="email">
                <label for="email" class="placeholder ph1">Email</label>
            </div>
            <div class="inputContainer">
                <input type="text" class="input" placeholder=" " id="name" name="name">
                <label for="name" class="placeholder ph2">Name</label>
            </div>
            <div class="inputContainer">
                <input type="password" class="input" placeholder=" " id="password" name="password">
                <label for="password" class="placeholder ph3">Password</label>
            </div>
            <div class="inputContainer">
                <input type="password" class="input" placeholder=" " id="confirmPassword">
                <label for="confirmPassword" class="placeholder ph4">Confirm password</label>
            </div>
            <button type="submit" class="btn">Register</button>
            <a href="signIn.php">
                Already registered?</a>
        </form>
    </div>
    <script src="signUp.js"></script>
</body>

</html>