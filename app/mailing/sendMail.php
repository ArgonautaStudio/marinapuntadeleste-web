<?php

$post = json_decode(file_get_contents('php://input'));

function successScript($message)
{
    echo json_encode(['error'=>false, 'message'=>$message]);
};

function errorScript($message)
{
    echo json_encode(['error'=>true, 'message'=>$message]);
};

if ($post) {
    $headers = "From: " . strip_tags($post->mail) . "\r\n";
    $headers .= "Reply-To: ". strip_tags($post->mail) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    // $to = 'info@marinapuntadeleste.mx';
    $to = 'alejandroalamina@hotmail.com';

    $subject = 'Website contact form';
    
    $message = "<html><body>";
    $message .= "<h3> From: " . $post->name ." </h3>" . "\r\n";
    $message .= "<p> " . $post->message ." </p>" . "\r\n";
    $message .= "</body></html>";

    try {
        if (mail($to, $subject, $message, $headers)) {
            successScript('Message was sent');
        } else {
            throw new Exception('Cant send mail');
        }
    } catch (Exception $e) {
        errorScript($e->getMessage());
    }
} else {
    errorScript('No data');
}
