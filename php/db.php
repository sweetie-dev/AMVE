<?php

$host = "localhost";
$dbname = "loja_db";           
$usuario = "root";
$senha = "";

$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8";

try {
    $pdo = new PDO($dsn, $usuario, $senha);

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $erro) {

    die("Erro ao conectar ao banco: " . $erro->getMessage());
}
?>
