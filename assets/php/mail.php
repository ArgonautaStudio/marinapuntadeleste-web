<?php

    $post = json_decode(file_get_contents('php://input'));

    function checkMail($data){

    };
    function sendMail($data){

    };

    
    if($post){
        if(checkMail($post)){

        }
    } else {
        exit();
    }

?>