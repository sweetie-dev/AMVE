<?php
session_start();


if (isset($_GET['remove'])) {
    $id = intval($_GET['remove']);

    if (isset($_SESSION['cart'])) {
        foreach ($_SESSION['cart'] as $index => $item) {
            if ($item['id'] == $id) {
                unset($_SESSION['cart'][$index]); 
                break;
            }
        }

        $_SESSION['cart'] = array_values($_SESSION['cart']);
    }

    header("Location: cart.php");
    exit;
}


if (!isset($_SESSION['cart']) || count($_SESSION['cart']) == 0) {
    echo "<h2>Seu carrinho está vazio.</h2>";
    echo '<a href="produtos.php">Voltar</a>';
    exit;
}

$cart = $_SESSION['cart'];
$total = 0;
?>

<h1>Carrinho</h1>

<table border="1" cellpadding="8">
    <tr>
        <th>Produto</th>
        <th>Preço</th>
        <th>Qntd</th>
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
<a href="cart.php?remove=<?= $item['id'] ?>">Remover</a>
<br><br>
<a href="checkout.php">Ir para o checkout</a>
<br><br>
<a href="produtos.php">Continuar comprando</a>
