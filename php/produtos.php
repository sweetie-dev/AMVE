<?php
session_start();
require "db.php";

if (isset($_GET['add'])) {
    $id = intval($_GET['add']);

    $stmt = $pdo->prepare("SELECT * FROM produtos WHERE id = ?");
    $stmt->execute([$id]);
    $produto = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($produto) {

        if (!isset($_SESSION['cart'])) {
            $_SESSION['cart'] = [];
        }

        $jaExiste = false;

        foreach ($_SESSION['cart'] as &$item) {
            if ($item['id'] == $id) {
                $item['qtd']++;
                $jaExiste = true;
                break;
            }
        }

        if (!$jaExiste) {
            $_SESSION['cart'][] = [
                "id" => $produto['id'],
                "nome" => $produto['nome'],
                "preco" => $produto['preco'],
                "qtd" => 1
            ];
        }
    }

    header("Location: produtos.php");
    exit;
}

$stmt = $pdo->query("SELECT * FROM produtos");
$produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<h1>Produtos</h1>

<?php foreach ($produtos as $p): ?>
    <p>
        <b><?= $p['nome'] ?></b> — R$ <?= $p['preco'] ?>

        <a href="produtos.php?add=<?= $p['id'] ?>">Adicionar ao carrinho </a>
    </p>
    <hr>
<?php endforeach; ?>

<a href="cart.php">Ver carrinho</a>
