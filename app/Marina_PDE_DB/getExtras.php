<?php
include_once './dbConection.php';
$conection = new Conection();
$db = $conection->connect();
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    $GET_EXTRAS_QUERY = $db->prepare("SELECT Valor as extra1, (SELECT Valor FROM `Precios` WHERE IdPrecio = 'extra2') as extra2
                                        FROM `Precios` WHERE IdPrecio = 'extra1'");
    $GET_EXTRAS_QUERY->execute();
    if ($GET_EXTRAS_QUERY->rowCount() >= 1) {
        $response = $GET_EXTRAS_QUERY->fetch(PDO::FETCH_ASSOC);
        echo json_encode(['error'=>false, 'message'=>'Query executed', 'content'=>$response]);
    } else {
        throw new Exception('Data base error');
    }
} catch (Exception $e) {
    echo json_encode(['error'=>true, 'message'=>$e->getMessage(), 'content'=>[]]);
}
