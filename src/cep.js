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
