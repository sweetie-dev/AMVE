(function () {
    function buscarCEP(cepRaw) {
        const elErro = document.getElementById('erro');
        const cep = String(cepRaw).replace(/\D/g, '');
        if (!/^[0-9]{8}$/.test(cep)) {
            if (elErro) {
                elErro.style.display = 'block';
                elErro.textContent = 'CEP inválido. Digite 8 números.';
            }
            return;
        }
        if (elErro) {
            elErro.style.display = 'none';
        }

        fetch('https://viacep.com.br/ws/' + cep + '/json/')
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    if (elErro) {
                        elErro.style.display = 'block';
                        elErro.textContent = 'CEP não encontrado.';
                    }
                    return;
                }
                const ruaEl = document.getElementById('form-rua');
                const bairroEl = document.getElementById('form-bairro');
                const cidadeEl = document.getElementById('form-cidade');
                const estadoEl = document.getElementById('form-estado');
                if (ruaEl) ruaEl.value = data.logradouro || '';
                if (bairroEl) bairroEl.value = data.bairro || '';
                if (cidadeEl) cidadeEl.value = data.localidade || '';
                if (estadoEl) estadoEl.value = data.uf || '';
                const num = document.getElementById('numero');
                if (num) num.focus();
            })
            .catch(() => {
                if (elErro) {
                    elErro.style.display = 'block';
                    elErro.textContent = 'Erro ao consultar CEP. Verifique sua conexão.';
                }
            });
    }
    document.addEventListener('DOMContentLoaded', function () {
        const cepEl = document.getElementById('cep');
        if (!cepEl) return;
        cepEl.addEventListener('blur', function () {
            const val = this.value || '';
            if (val.trim() !== '') buscarCEP(val);
        });
        cepEl.addEventListener('input', function () {
            const digits = this.value.replace(/\D/g, '');
            if (digits.length === 8) buscarCEP(digits);
        });
    });

})();
function atualizarContadorCarrinho() {
            const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
            const total = carrinho.reduce((acc, item) => acc + (item.quantidade || 0), 0);
            const cartCountElement = document.getElementById('cart-count');
            if (cartCountElement) {
                cartCountElement.textContent = total;
            }
        }

        document.addEventListener('DOMContentLoaded', function () {
            atualizarContadorCarrinho();

            const form = document.getElementById('cadastro-form');
            if (!form) return;

            form.addEventListener('submit', function (e) {
                e.preventDefault();

                const data = {
                    nome: (document.getElementById('nome') || {}).value || '',
                    telefone: (document.getElementById('telefone') || {}).value || '',
                    email: (document.getElementById('email') || {}).value || '',
                    senha: (document.getElementById('senha') || {}).value || '',
                    cep: (document.getElementById('cep') || {}).value || '',
                    rua: (document.getElementById('form-rua') || {}).value || '',
                    numero: (document.getElementById('numero') || {}).value || '',
                    complemento: (document.getElementById('complemento') || {}).value || '',
                    bairro: (document.getElementById('form-bairro') || {}).value || '',
                    cidade: (document.getElementById('form-cidade') || {}).value || '',
                    estado: (document.getElementById('form-estado') || {}).value || ''
                };

                try {
                    localStorage.setItem('cadastro', JSON.stringify(data));
                    atualizarContadorCarrinho();
                    alert('Cadastro salvo com sucesso! Redirecionando para o carrinho.');
                    window.location.href = 'carrinho.html';
                } catch (err) {
                    alert('Erro ao salvar cadastro. Verifique se seu navegador permite armazenamento local.');
                }
            });
        });
        function getCart() {
    try {
        return JSON.parse(localStorage.getItem('carrinho') || '[]');
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem('carrinho', JSON.stringify(cart));
    renderCart();
}

function formatBRL(v) {
    return 'R$ ' + Number(v).toFixed(2).replace('.', ',');
}

function renderCart() {
    const area = document.getElementById('cart-area');
    const totalEl = document.getElementById('cart-total');
    const cart = getCart();

    if (!cart || cart.length === 0) {
        area.innerHTML = '<p>Seu carrinho está vazio.</p>';
        totalEl.textContent = '';
        return;
    }

    let html = '<table border="0" cellpadding="6" style="width:100%; border-collapse:collapse">';
    html += '<thead><tr><th>Produto</th><th>Preço</th><th>Qtd</th><th>Subtotal</th><th></th></tr></thead><tbody>';

    let total = 0;

    cart.forEach(item => {
        const subtotal = item.preco * (item.quantidade || 1);
        total += subtotal;

        html += `
        <tr data-id="${item.id}">
            <td>${item.nome}</td>
            <td>${formatBRL(item.preco)}</td>
            <td>
                <button class="dec">-</button>
                ${item.quantidade}
                <button class="inc">+</button>
            </td>
            <td>${formatBRL(subtotal)}</td>
            <td><button class="remove">Remover</button></td>
        </tr>`;
    });

    html += '</tbody></table>';

    area.innerHTML = html;
    totalEl.textContent = 'Total: ' + formatBRL(total);
}

document.addEventListener('click', function (e) {
    const tr = e.target.closest('tr[data-id]');
    if (!tr) return;

    const id = tr.getAttribute('data-id');

    if (e.target.classList.contains('inc')) {
        changeQty(id, 1);
    } else if (e.target.classList.contains('dec')) {
        changeQty(id, -1);
    } else if (e.target.classList.contains('remove')) {
        removeItem(id);
    }
});

function changeQty(id, delta) {
    const cart = getCart();
    const item = cart.find(i => String(i.id) === String(id));
    if (!item) return;

    item.quantidade = (item.quantidade || 1) + delta;

    if (item.quantidade <= 0) {
        const idx = cart.findIndex(i => String(i.id) === String(id));
        if (idx >= 0) cart.splice(idx, 1);
    }

    saveCart(cart);
}

function removeItem(id) {
    let cart = getCart();
    cart = cart.filter(i => String(i.id) !== String(id));
    saveCart(cart);
}

document.getElementById('voltar').addEventListener('click', function () {
    window.location.href = 'index.html';
});

document.getElementById('comprar').addEventListener('click', function () {
    const cart = getCart();

    if (!cart || cart.length === 0) {
        alert('Seu carrinho está vazio. Adicione produtos antes de comprar.');
        return;
    }

    const confirmBuy = confirm('Confirmar compra de ' + cart.reduce((s,i)=>s+i.quantidade,0) + ' item(ns)?');
    if (!confirmBuy) return;

    const orderId = 'PED-' + Date.now();
    localStorage.removeItem('carrinho');
    renderCart();

    alert('Compra realizada! Pedido: ' + orderId);
});

function mostrarDados() {
    const alvo = document.getElementById('dados');
    const raw = localStorage.getItem('cadastro');

    if (!raw) {
        alvo.innerHTML = '<p>Nenhum dado de cadastro encontrado.</p>';
        return;
    }

    try {
        const obj = JSON.parse(raw);
        let html = '<div>';

        for (const k in obj) {
            html += `<div class="campo"><strong>${k}:</strong> ${obj[k] || '<i>vazio</i>'}</div>`;
        }

        html += '</div>';
        alvo.innerHTML = html;

    } catch (e) {
        alvo.innerHTML = '<p>Erro ao ler os dados.</p>';
    }
}

document.getElementById('limpar-dados').addEventListener('click', function () {
    localStorage.removeItem('cadastro');
    mostrarDados();
});


renderCart();
mostrarDados();

