<?php
$mailmsg = "You got a response!  Here's the data: \n";

// Get the date_add
foreach ($_POST as $key => $value) {
    $mailmsg = $mailmsg . $key . ': ' . $value . "\n";
    # code...
}

$mailmsg = $mailmsg . "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";

$mailmsg = $mailmsg . "Hostname: " . gethostbyaddr($_SERVER['REMOTE_ADDR']) . "\n";

// E-mail it to david@dworin.com

mail('YOUREMAIL@DOMAIN.COM','New Assessment Response',$mailmsg);

?>
