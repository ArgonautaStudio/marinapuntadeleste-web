<?php
include_once './dbConection.php';
$conection = new Conection();
$db = $conection->connect();
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$post = file_get_contents('php://input');
if (!$post) {
    exit();
} else {
    $data = json_decode($post);
    try {
        if (!isset($data->activity) || !isset($data->date) || !isset($data->time)) {
            throw new Exception('Missing arguments');
        }
        $REGISTER_CLIENT_QUERY = $db->prepare('
       INSERT INTO cliente(idCliente, correo, nombre, apellido, telefono, direccion,RFC) VALUES (0,:correo,:nombre,:apellido,:telefono,:direccion);'); 
        $direccion = "null"; 
        $REGISTER_CLIENT_QUERY->bindParam(':correo', $data->);
        $REGISTER_CLIENT_QUERY->bindParam(':nombre', $data->);
        $REGISTER_CLIENT_QUERY->bindParam(':apellido', $data->);
        $REGISTER_CLIENT_QUERY->bindParam(':telefono', $data->); 
        $REGISTER_CLIENT_QUERY->bindParam(':direccion', $data->);
        $REGISTER_CLIENT_QUERY->execute(); 
        
    } catch (Exception $e) {
        echo json_encode(['error'=>true, 'message'=>$e->getMessage(),'av'=>false, 'tickets'=>0]);
    }
}