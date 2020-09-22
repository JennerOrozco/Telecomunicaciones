<?php 
session_start();
header("Access-Control-Allow-Origin: *");
include_once('./Connection.php'); 

$link = Conectarse(); 
$where = [];
$extra = '';


   $isADmin = $_SESSION['ROL'];

if ($valor = QueryColumns($link,'tablaUsuarios',['*'],$where,$extra)){     
   if ($isADmin){
   echo json_encode($valor);
   }
   else{
      echo json_encode([]);
   }
}else{
   echo false;
}

   



 ?>