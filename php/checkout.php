<?php
session_start();

if (!isset($_SESSION['cart']) || count($_SESSION['cart']) == 0) {
    echo "<h2>Seu carrinho está vazio.</h2>";
    echo '<a href="produtos.php">Voltar</a>';
    exit;
}

$cart = $_SESSION['cart'];
$total = 0;
?>

<h1>Checkout</h1>

<table border="1" cellpadding="8">
    <tr>
        <th>Produto</th>
        <th>Preço</th>
        <th>Qtd</th>
        <th>Subtotal</th>
    </tr>

    <?php foreach ($cart as $item): 
        $subtotal = $item['preco'] * $item['qtd'];
        $total += $subtotal;
    ?>
        <tr>
            <td><?= $item['nome'] ?></td>
            <td>R$ <?= $item['preco'] ?></td>
            <td><?= $item['qtd'] ?></td>
            <td>R$ <?= $subtotal ?></td>
        </tr>
    <?php endforeach; ?>
</table>

<h2>Total: R$ <?= $total ?></h2>

<a href="finalizar.php">Finalizar compra</a>
