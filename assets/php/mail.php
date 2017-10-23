<?php

function checkParams()
{
    $res = false;

    $res = isset($_POST['name']) ? true : false;
    $res = isset($_POST['email']) ? true : false;
    $res = isset($_POST['message']) ? true : false;

    return $res;
}

function sendMail($data)
{
    $para      = 'info@marinapuntadeleste.mx';
    $titulo    = 'Mensaje: Marina Punta de Este MX';
    $mensaje   = "Ha recibido un nuevo mensaje desde https://marinapuntadeleste.mx/ por parte de: " . $data->name . "\r\n" .
    "El mensaje: " . "\r\n" . $data->message;
    $cabeceras = $data->email . "\r\n" .
    'Reply-To: ' . $data->email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
        
    $send = mail($para, $titulo, $mensaje, $cabeceras);
    if ($send) {
        echo json_encode(['error'=>false, 'message'=>'Se ha enviado el correo']);
    } else {
        echo json_encode(['error'=>false, 'message'=>'Error']);
    }
};

    
if (checkParams()) {
    $data = new stdClass();
    $data->name = $_POST['name'];
    $data->email = $_POST['email'];
    $data->message = $_POST['message'];
    sendMail($data);
} else {
    exit();
}
