<?php

// Blank message to start with so we can append to it.
$message = '';


if( empty($_POST['name']) || empty($_POST['address']) || empty($_POST['zipcode']) || empty($_POST['city']) || empty($_POST['email']) ){
    die('Täytä kaikki kohdat.');
}

// Construct the message
$message .= <<<TEXT
	Aarrejahti: {$_POST['huntname']}
    Nimi: {$_POST['name']}
    Osoite: {$_POST['address']}
    Postinumero: {$_POST['zipcode']}
    Postitoimipaikka: {$_POST['city']}
    Sähköposti: {$_POST['email']}
TEXT;

// Email to send to
$to = 'satu@satutyrvainen.com';

// Email Subject
$subject = 'Aarrejahdin voittaja!';

// Name to show email from
$from = 'Aarrejahti';

// Domain to show the email from
$fromEmail = 'aarrejahti@satutyrvainen.com';

// Construct a header to send who the email is from
$header = 'Lähettäjä: ' . $from . '<' . $fromEmail . '>';

// Try sending the email
if(!mail($to, $subject, $message, $header)){
    die('Ongelma sähköpostin lähetyksessä.');
}else{
    die('Sähköposti lähetetty onnistuneesti!');
}
?>