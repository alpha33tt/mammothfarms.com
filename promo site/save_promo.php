<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = $_POST['data'];
    file_put_contents("promo_winners.txt", $data, FILE_APPEND);
}
?>
