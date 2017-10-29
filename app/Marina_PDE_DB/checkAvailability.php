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
        $CHECK_AVAILABILITY_QUERY = $db->prepare('
        SELECT SUM(ft.turistas) as ocupado, t.capacidad, t.precioAdultoUS, t.precioNinoUS, 0 as precioInfanteUs
        FROM fechatour ft
        INNER JOIN tour t
        ON ft.idTour = t.idtour
        WHERE ft.idTour = :idTour AND ft.horario = :time AND ft.fecha = :date');
        $CHECK_AVAILABILITY_QUERY->bindParam(':idTour', $data->activity->idTour);
        $CHECK_AVAILABILITY_QUERY->bindParam(':time', $data->time);
        $CHECK_AVAILABILITY_QUERY->bindParam(':date', $data->date);
        $CHECK_AVAILABILITY_QUERY->execute();
        $CHECK_AVAILABILITY_QUERY->bindColumn('ocupado', $_ocupado);
        $CHECK_AVAILABILITY_QUERY->bindColumn('capacidad', $_capacidad);
        $CHECK_AVAILABILITY_QUERY->bindColumn('precioAdultoUS', $_adultoPrecio);
        $CHECK_AVAILABILITY_QUERY->bindColumn('precioNinoUS', $_ninoPrecio);
        $CHECK_AVAILABILITY_QUERY->bindColumn('precioInfanteUs', $_infantePrecio);
        if ($CHECK_AVAILABILITY_QUERY->rowCount() == 1) {
            $CHECK_AVAILABILITY_QUERY->fetch(PDO::FETCH_BOUND);
            $_tickets = $_capacidad - $_ocupado;
            if ($_ocupado <= $_capacidad) {
                echo json_encode([
                    'error'=>false,
                    'message'=>'Available',
                    'av'=>true,
                    'tickets'=>$_tickets,
                    'precios'=>[
                        'precioAdulto'=>$_adultoPrecio,
                        'precioNino'=>$_ninoPrecio,
                        'precioInfante'=>$_infantePrecio
                    ]
                    ]);
            } else {
                echo json_encode([
                    'error'=>false,
                    'message'=>'Unavailable',
                    'av'=>false,
                    'tickets'=>$_tickets,
                    'precios'=>[
                        'precioAdulto'=> 0,
                        'precioNino'=> 0,
                        'precioInfante'=> 0
                    ]
                    ]);
            }
        } else {
            throw new Exception('Data base error');
        }
    } catch (Exception $e) {
        echo json_encode(['error'=>true, 'message'=>$e->getMessage(),'av'=>false, 'tickets'=>0]);
    }
}
