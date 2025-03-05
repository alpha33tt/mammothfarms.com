<?php
header('Content-Type: application/json'); // Ensure JSON response

$file = 'bids.txt';

// Read the current bids
if (file_exists($file)) {
    $bids = file_get_contents($file);
    $bids = json_decode($bids, true); // Decode JSON
    if (!is_array($bids)) {
        $bids = [];
    }
} else {
    $bids = [];
}

// Output the bid data as JSON
echo json_encode($bids);
?>
