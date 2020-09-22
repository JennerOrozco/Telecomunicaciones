<?php 
session_start();
header("Access-Control-Allow-Origin: *");
include_once('./Connection.php'); 

$link = Conectarse(); 
$where = [];
$extra = '';


   $isADmin = $_SESSION['ROL'];

if ($valor = QueryColumns($link,'tablausuarios',['*'],$where,$extra)){     
   if ($isADmin==1){
   echo json_encode($valor);
   }
   else{
      echo json_encode([]);
   }
}else{
   echo false;
}

   



 ?>