<?php
include_once './dbConection.php';
$conection = new Conection();
$db = $conection->connect();
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$post = file_get_contents('php://input');
if (!$post) {
    exit();
} else {
    $_promo = 0;
    try {
        $GET_PROMO_QUERY = $db->prepare('SELECT Valor FROM Precios WHERE descripcion = :promo LIMIT 1');
        $GET_PROMO_QUERY->bindParam(':promo', $post);
        $GET_PROMO_QUERY->execute();
        $GET_PROMO_QUERY->bindColumn('Valor', $_promo);
        $GET_PROMO_QUERY->fetch(PDO::FETCH_BOUND);

        echo json_encode(['error'=>false,'message'=>'Success', 'promo'=>$_promo]);
    } catch (Exception $e) {
        echo json_encode(['error'=>true, 'message'=>$e->getMessage(), 'promo'=>$_promo]);
    }
}
