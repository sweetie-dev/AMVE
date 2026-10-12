# AMVE – Loja virtual de periféricos

Projeto acadêmico de e-commerce desenvolvido no 3º semestre do curso de Análise e Desenvolvimento de Sistemas (UNAMA).
Este repositório é utilizado como **estudo de caso** da Atividade Avaliativa (1AV) da disciplina de *Arquitetura de Software e Computação em Nuvem*.

## Objetivo

Simular o fluxo completo de uma compra on-line: o cliente consulta o catálogo (laptop, mouse, teclado, monitor, fone de ouvido e webcam), monta o carrinho, faz o cadastro com endereço preenchido automaticamente pelo CEP e finaliza a compra.

## Autoria

Projeto acadêmico desenvolvido por estudantes do curso de Análise e Desenvolvimento de Sistemas da UNAMA, no 3º semestre.

**Integrantes da equipe:**

- Yasmim Trindade Souza
- Elson Crystiano Dax
- Júlia Caroline de Moura Barbosa

## Funcionalidades

- Catálogo de produtos com imagens e preços
- Carrinho de compras (adicionar, alterar quantidade e remover itens)
- Cadastro de cliente com busca automática de endereço por CEP (API ViaCEP)
- Finalização da compra
- Back-end PHP com páginas de produtos, carrinho, checkout e cadastro de clientes e produtos

## Tecnologias e dependências

- **Front-end:** HTML5, CSS3 e JavaScript puro
- **Back-end:** PHP 8 com PDO
- **Banco de dados:** MySQL / MariaDB
- **Ambiente local:** XAMPP (Apache + MariaDB)
- **Integração externa:** API pública [ViaCEP](https://viacep.com.br)
- **Extensões PHP necessárias:** PDO (MySQL) e cURL (ambas já vêm habilitadas no XAMPP; o cURL é usado em `php/cep.php`)
- **Ferramentas:** Git/GitHub e Visual Studio Code (extensão Live Server)

## Como executar

**Front-end (catálogo, carrinho e cadastro):**

1. Clone o repositório.
2. Abra a pasta no VS Code e inicie `src/index.html` com a extensão *Live Server* (porta configurada: 5501), ou abra o arquivo diretamente no navegador.
3. Para a busca de CEP é necessário acesso à internet.

**Back-end PHP:**

1. Instale o XAMPP e inicie Apache e MySQL.
2. Copie a pasta `php/` para `htdocs` e importe `ecommerce/ecommerce.sql` pelo phpMyAdmin.
3. Ajuste as credenciais em `php/db.php` (padrão: `localhost`, usuário `root`, sem senha).

> **Observação:** o esquema do banco e o código PHP possuem inconsistências conhecidas (nomes de banco e colunas), que são analisadas no relatório de revisão arquitetural. Elas não foram corrigidas, pois a atividade é de análise e não de desenvolvimento.

## Módulos e camadas

Na versão analisada, a divisão em diretórios **não** corresponde a camadas com responsabilidades separadas:

| Parte | Módulos | Observação |
| --- | --- | --- |
| Front-end (`src/`) | `index.html`, `carrinho.html`, `cadastro.html`, `cep.js` | Catálogo, carrinho e cadastro no navegador (localStorage) |
| Back-end (`php/`) | `produtos.php`, `cart.php`, `checkout.php`, `cadastro_*.php`, `cep.php`, `db.php` | Acesso a dados, regra de negócio e HTML no mesmo arquivo |
| Dados (`ecommerce/`) | `ecommerce.sql` | Esquema MySQL/MariaDB |
| Integração externa | API ViaCEP | Chamada por `cep.js` (navegador) e `cep.php` (servidor) |

**Proposta de evolução (descrita no relatório, não implementada):** apresentação (HTML/CSS/JS) → API com controllers → serviços de domínio → repositórios (PDO) → banco de dados, com um `ViaCepClient` isolando a integração externa.

## Organização atual do sistema

```
AMVE/
├── ecommerce/
│   └── ecommerce.sql        # Esquema do banco (clientes, compras, produtos)
├── php/                     # Back-end PHP (acesso a dados, regras e HTML no mesmo arquivo)
│   ├── db.php               # Conexão PDO
│   ├── produtos.php         # Listagem e adição ao carrinho (sessão)
│   ├── cart.php             # Carrinho
│   ├── checkout.php         # Resumo da compra
│   ├── cadastro_clientes.php
│   ├── cadastro_produtos.php
│   └── cep.php              # Consulta ao ViaCEP via cURL
└── src/                     # Front-end
    ├── index.html           # Catálogo (lista fixa em JavaScript)
    ├── carrinho.html        # Carrinho (localStorage)
    ├── cadastro.html        # Cadastro de cliente
    ├── cep.js               # Busca de CEP, cadastro e carrinho
    ├── style.css / carrinho.css
    └── img/                 # Imagens dos produtos
```

**Resumo:** o front-end (`src/`) mantém catálogo, carrinho e cadastro no navegador (localStorage), enquanto o back-end (`php/`) possui um fluxo próprio com sessão PHP e MySQL. A análise detalhada (coesão, acoplamento, proposta de evolução em camadas, decisão arquitetural e trade-offs) está no relatório entregue na atividade.
