<?php
$uploadDir = "uploads/";
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $file = $_FILES["payment-proof"];

    $fileName = time() . "_" . basename($file["name"]);
    $filePath = $uploadDir . $fileName;

    if (move_uploaded_file($file["tmp_name"], $filePath)) {
        // Save to database
        $conn = new mysqli("localhost", "root", "", "mammothfarms");
        if ($conn->connect_error) {
            die("Database connection failed: " . $conn->connect_error);
        }

        $stmt = $conn->prepare("INSERT INTO payments (name, email, file_path) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $filePath);
        $stmt->execute();
        $stmt->close();
        $conn->close();

        // Send email with payment proof
        $to = "admin@mammothfarms.com";
        $subject = "New Payment Submission";
        $message = "Name: $name\nEmail: $email\nProof: $filePath";
        $headers = "From: noreply@mammothfarms.com";

        mail($to, $subject, $message, $headers);

        echo "Payment proof uploaded successfully!";
    } else {
        echo "Error uploading file.";
    }
}
?>
