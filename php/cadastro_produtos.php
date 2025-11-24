<?php
require 'db.php';
if($_SERVER["REQUEST_METHOD"] === "POST"){
    $nome = $_POST["nome"];
    $descricao = $_POST["descricao"];
    $preco = $_POST["preco"];
    $estoque = $_POST["estoque"];

    $sql = "INSERT INTO produtos (nome, descricao, preco, estoque) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nome, $descricao, $preco, $estoque]);
    
    echo "<p>Produto cadastrado com sucesso!</p>";
}
?>

<h2>Cadastrar Produto</h2>
<form method="POST">
    Nome: <input type="text" name="nome" required><br>
    Preço: <input type="number" step="0.01" name="preco" required><br>
    Descrição: <input type="text" name="descricao" require><br>
    Estoque: <input type="number" step="0.10" name="estoque" required><br>

    <button type="submit">Cadastrar</button>
</form>

