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
    //Obtenet el id cliente para usarlo en el siguiente query
    try{
        $FIND_ID_CLIENT = $db->prepare('Select idcliente from clientes orderby idcliente desc limit 1'); 
        $REGISTER_BUY_QUERY->execute(); 
        $REGISTER_BUY_QUERY->bindColumn('idCliente', $_idClient);
    } catch (Exception $e) {
        
    }
    try {
        if (!isset($data->activity) || !isset($data->date) || !isset($data->time)) {
            throw new Exception('Missing arguments');
        }
        $REGISTER_BUY_QUERY = $db->prepare('
       INSERT INTO vendido(idVendido, idCliente, idFechatour, cantNino, cantAdultos, cantInfantes, precioTotal, moneda, payMethod, factura, cantExtra1, cantExtra2, fechaCompra, idVendedor, cantNondiver,descuento) 
       VALUES (0,:idCliente,:idfecha,:cant2, :cant1,:cant3,:preciototal,:moneda,:payMethod,:factura,:extra1,:extra2,:currentTime,:idVend,:cant4,:descuento);'); 
        $factura = "0"; 
        $moneda = "USD"; 
        $payMethod = "Tarjeta"; 
        $idVend = "2";
        $REGISTER_BUY_QUERY->bindParam(':idCliente', $_idClient); //id del cliente que se acaba de crear
        $REGISTER_BUY_QUERY->bindParam(':idfecha', $data->);//fecha en la que se compro 
        $REGISTER_BUY_QUERY->bindParam(':cant2', $data->);//Cantidad de boletos ninos
        $REGISTER_BUY_QUERY->bindParam(':cant1', $data->);//Cantidad de boletos adulto  
        $REGISTER_BUY_QUERY->bindParam(':cant3', $data->);//Cantidad de boletos infante
        $REGISTER_BUY_QUERY->bindParam(':preciototal', $data->total);//Cantidad total a pagar
        $REGISTER_BUY_QUERY->bindParam(':moneda', $moneda);//Tipo de cambio
        $REGISTER_BUY_QUERY->bindParam(':payMethod', $payMethod);//Metodo de pago
        $REGISTER_BUY_QUERY->bindParam(':factura', $factura);
        $REGISTER_BUY_QUERY->bindParam(':extra1', $data->);//Cantidad de extras 1 
        $REGISTER_BUY_QUERY->bindParam(':extra2', $data->);//Cantidad de extras2
        $REGISTER_BUY_QUERY->bindParam(':currentTime', $data->);
        $REGISTER_BUY_QUERY->bindParam(':idVend', $idVend);//Vendedor que en este caso es predefinido
        $REGISTER_BUY_QUERY->bindParam(':cant4', $data->);//Cantidad de boletos Non Diver
        $REGISTER_BUY_QUERY->bindParam(':descuento', $data->);//Porcentaje de descuento que se aplico
        $REGISTER_BUY_QUERY->execute(); 
        
         try
        {
            
            $UPDATE_TOUR_QUERY = $db->prepare('UPDATE Marina_PDE_DB.fechatour SET turistas = turistas (:cant1+:cant2+:cant3+:cant4) where idFechatour = :idfecha');
            
        }
        catch (ClassNotFoundException | SQLException e)
        {
            
        }
        
    } catch (Exception $e) {
        echo json_encode(['error'=>true, 'message'=>$e->getMessage(),'av'=>false, 'tickets'=>0]);
    }
}