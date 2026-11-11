// usuarios.js - funções compartilhadas de cadastro e login (usa o localStorage)

// Lê a lista de usuários salva. Se ainda não existe nada, devolve uma lista vazia.
function buscarUsuarios() {
    const texto = localStorage.getItem("usuarios");

    if (texto === null) {
        return [];
    }

    return JSON.parse(texto);
}

// Salva a lista de usuários inteira (o localStorage só guarda texto, por isso o JSON.stringify)
function salvarUsuarios(listaDeUsuarios) {
    localStorage.setItem("usuarios", JSON.stringify(listaDeUsuarios));
}

// Devolve o usuário que está logado, ou null se ninguém entrou
function buscarUsuarioLogado() {
    const texto = localStorage.getItem("usuarioLogado");

    if (texto === null) {
        return null;
    }

    return JSON.parse(texto);
}

// Guarda quem entrou (sem a senha, de propósito)
function entrar(usuario) {
    const dadosDaSessao = {
        cpf: usuario.cpf,
        nome: usuario.nome,
        email: usuario.email
    };

    localStorage.setItem("usuarioLogado", JSON.stringify(dadosDaSessao));
}

function sair() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "index.html";
}

// Mostra "Entrar / Cadastrar" ou o nome da pessoa com um menu (Minhas reservas / Sair)
function atualizarMenu() {
    const areaUsuario = document.getElementById("areaUsuario");

    if (areaUsuario === null) {
        return;
    }

    const usuarioLogado = buscarUsuarioLogado();

    if (usuarioLogado === null) {
        areaUsuario.innerHTML =
            '<a href="login.html">Entrar</a>' +
            '<a href="cadastro.html">Cadastrar</a>';
        return;
    }

    const primeiroNome = usuarioLogado.nome.split(" ")[0];

    areaUsuario.innerHTML =
        '<div class="menu-conta">' +
        '<button type="button" id="botaoConta" class="botao-conta" aria-expanded="false">Olá, ' + primeiroNome + ' ▾</button>' +
        '<div id="listaConta" class="menu-conta-lista" hidden>' +
        '<a href="minhas-reservas.html">Minhas reservas</a>' +
        '<a href="#" id="linkSair">Sair</a>' +
        '</div>' +
        '</div>';

    const botaoConta = document.getElementById("botaoConta");
    const listaConta = document.getElementById("listaConta");

    // Clicar no nome abre ou fecha o menu
    botaoConta.addEventListener("click", function () {
        const estavaFechado = listaConta.hidden;
        listaConta.hidden = !estavaFechado;
        botaoConta.setAttribute("aria-expanded", String(estavaFechado));
    });

    // Clicar em qualquer outro lugar da página fecha o menu
    document.addEventListener("click", function (evento) {
        if (!areaUsuario.contains(evento.target)) {
            listaConta.hidden = true;
            botaoConta.setAttribute("aria-expanded", "false");
        }
    });

    document.getElementById("linkSair").addEventListener("click", function (evento) {
        evento.preventDefault();
        sair();
    });
}

atualizarMenu();
