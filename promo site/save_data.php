<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $address = htmlspecialchars($_POST["address"]);
    $referral = htmlspecialchars($_POST["referral"]);

    $data = "Name: $name | Email: $email | Phone: $phone | Address: $address | Referral: $referral\n";
    
    file_put_contents("registrations.txt", $data, FILE_APPEND);
    
    echo "<script>alert('Registration successful!'); window.location.href='index.html';</script>";
}
?>
