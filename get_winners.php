<?php
$winners = [];
if (file_exists("bids.txt")) {
    $bids = file("bids.txt", FILE_IGNORE_NEW_LINES);
    foreach ($bids as $bid) {
        list($name, $email, $amount) = explode(",", $bid);
        $winners[] = ["name" => $name, "email" => $email, "bid" => (int)$amount];
    }
}
header("Content-Type: application/json");
echo json_encode($winners);
?>
