<?php 
session_start();
include_once('./Connection.php'); 
$link = Conectarse(); 
$ID = 0;

$ID = $_SESSION['Id'];

$where = [['Usuario_ID','=', $ID ]];
$extra = '';

if ($valor = QueryColumnsWhere($link,'tablaapi',['*'],$where,$extra)){
   echo json_encode($valor);
}else{
   echo 'error';
}
?>