<?php

$postdata = json_decode(file_get_contents('php://input'));

function successScript($message)
{
    echo json_encode(['error'=>false, 'message'=>$message]);
    exit();
};

function errorScript($message)
{
    echo json_encode(['error'=>true, 'message'=>$message]);
    exit();
};

if ($postdata) {
    try {
        $headers = "From: " . $postdata->mail . "\r\n";
        $headers .= "Reply-To: ". $postdata->mail . "\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

        // $to = 'info@marinapuntadeleste.mx';
        $to = 'alejandroalamina@hotmail.com';

        $subject = 'Website contact form';
    
        $message = "<html><body>";
        $message .= "<h3> From: " . $postdata->name ." </h3>" . "\r\n";
        $message .= "<p> " . $postdata->message ." </p>" . "\r\n";
        $message .= "</body></html>";

    
        if (!@mail($to, $subject, $message, $headers)) {
            throw new Exception('Cant send mail');
        } else {
            successScript('Message was sent');
        }
    } catch (Exception $e) {
        errorScript($e->getMessage());
    }
} else {
    errorScript('No data');
}
