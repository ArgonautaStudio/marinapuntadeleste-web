<?php
class Conection
{

    public function connect()
    {
        $dbname = "Marina_PDE_DB";
        $host = "160.153.65.130";
        $user = "nutrias";
        $password = "Configuracion1@";
        try {
            $dsn = "mysql:host=$host; dbname=$dbname";
            $dbh = new PDO($dsn, $user, $password);
            $dbh->exec("SET NAMES 'UTF8'");
            return $dbh;
        } catch (Exception $ex) {
            echo $ex->getMessage();
        }
    }
}
