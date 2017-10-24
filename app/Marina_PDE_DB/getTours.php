<?php
include_once './dbConection.php';
$conection = new Conection();
$db = $conection->connect();
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$post = file_get_contents('php://input');
if (!$post) {
    exit();
} else {
    try {
        $GET_TOURS_QUERY = $db->prepare('SELECT idTour, nombre, hora1, hora2, hora3 FROM `tour`;');
        $GET_TOURS_QUERY->execute();
        $response = $GET_TOURS_QUERY->rowCount() >= 1
        ?$GET_TOURS_QUERY->fetchAll(PDO::FETCH_ASSOC)
        :[];
        echo json_encode(['error'=>false,'message'=>'Success', 'data'=>$response]);
    } catch (Exception $e) {
        echo json_encode(['error'=>true, 'message'=>$e->getMessage(), 'data'=>$response]);
    }
}
