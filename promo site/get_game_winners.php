<?php
$winners = [];
if (file_exists("game_winners.txt")) {
    $entries = file("game_winners.txt", FILE_IGNORE_NEW_LINES);
    foreach ($entries as $entry) {
        list($name, $email) = explode(",", $entry);
        $winners[] = ["name" => $name, "email" => $email];
    }
}
header("Content-Type: application/json");
echo json_encode(array_slice($winners, 0, 10));
?>
