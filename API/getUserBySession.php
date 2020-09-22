<?php 
session_start();
include_once('./Connection.php'); 
$link = Conectarse(); 
$data = json_decode(file_get_contents('php://input'), true);
$ID = 0;


$ID = $_SESSION['Id'];

$where = [['ID','=', $ID ]];
$extra = '';

if ($valor = QueryColumnsWhere($link,'tablaUsuarios',['*'],$where,$extra)){
   echo json_encode($valor);
}else{
   echo 'error';
}
?>