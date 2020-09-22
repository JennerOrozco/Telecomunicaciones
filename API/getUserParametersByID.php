<?php 
session_start();
include_once('./Connection.php'); 
$link = Conectarse(); 
$ID = 0;
$data = json_decode(file_get_contents('php://input'), true);




$isADmin = $_SESSION['ROL'];
   

if ($isADmin){
   $where = [['Usuario_ID','=', $data['ID'] ]];
   $extra = '';

   if ($valor = QueryColumnsWhere($link,'tablaapi',['*'],$where,$extra)){
      echo json_encode($valor);
   }else{
      echo 'error';
   }
}else{
   echo json_encode([]);
}
?>