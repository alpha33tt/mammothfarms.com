<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = $_POST['data'];
    file_put_contents("bids.txt", $data, FILE_APPEND);

    // Read all bids and sort them
    $bids = file("bids.txt", FILE_IGNORE_NEW_LINES);
    $sortedBids = [];

    foreach ($bids as $bid) {
        list($name, $email, $amount) = explode(",", $bid);
        $sortedBids[] = ["name" => $name, "email" => $email, "bid" => (int)$amount];
    }

    usort($sortedBids, function($a, $b) { return $b['bid'] - $a['bid']; });
    $top10 = array_slice($sortedBids, 0, 10);

    // Save only the top 10 winners
    $newData = "";
    foreach ($top10 as $entry) {
        $newData .= "{$entry['name']},{$entry['email']},{$entry['bid']}\n";
    }
    file_put_contents("bids.txt", $newData);
}
?>
