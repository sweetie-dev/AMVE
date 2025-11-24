<?php
require 'db.php';
if($_SERVER["REQUEST_METHOD"] === "POST"){
    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $senha = $_POST["senha"];

    $sql = "INSERT INTO clientes (nome, email, senha) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nome, $email, $senha]);
    
    echo "<p>Cliente cadastrado com sucesso!</p>";
}
?>

<h2>Cadastrar Cliente</h2>
<form method="POST">
    Nome: <input type="text" name="nome" required><br>
    Email: <input type="email" name="email" required><br>
    Senha: <input type="password" name="senha" require><br>

    <button type="submit">Cadastrar</button>
</form>

