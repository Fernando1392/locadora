// cadastro.js - valida o formulário e salva o novo cliente no localStorage

const formularioCadastro = document.getElementById("formularioCadastro");
const mensagemCadastro = document.getElementById("mensagemCadastro");
const campoCpf = document.getElementById("campoCpf");
const campoTelefone = document.getElementById("campoTelefone");

// Máscaras: a cada tecla, o campo é reescrito já formatado
campoCpf.addEventListener("input", function () {
    campoCpf.value = formatarCpf(campoCpf.value);
});

campoTelefone.addEventListener("input", function () {
    campoTelefone.value = formatarTelefone(campoTelefone.value);
});

function mostrarErro(texto) {
    mensagemCadastro.textContent = texto;
    mensagemCadastro.className = "mensagem erro";
}

formularioCadastro.addEventListener("submit", function (evento) {
    // Impede a página de recarregar, para podermos validar antes
    evento.preventDefault();

    const nome = document.getElementById("campoNome").value.trim();
    const email = document.getElementById("campoEmail").value.trim().toLowerCase();
    const senha = document.getElementById("campoSenha").value;
    const confirmacao = document.getElementById("campoConfirmacao").value;

    // Guardamos CPF e celular só com números (sem pontos, traço, parênteses)
    const cpf = campoCpf.value.replace(/\D/g, "");
    const telefone = campoTelefone.value.replace(/\D/g, "");

    // Validações, uma de cada vez
    if (nome === "" || cpf === "" || email === "" || telefone === "" || senha === "") {
        mostrarErro("Preencha todos os campos.");
        return;
    }

    if (nome.length < 3) {
        mostrarErro("Digite seu nome completo.");
        return;
    }

    if (cpf.length !== 11) {
        mostrarErro("O CPF precisa ter 11 números (000.000.000-00).");
        return;
    }

    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        mostrarErro("Digite um e-mail válido.");
        return;
    }

    if (telefone.length !== 11) {
        mostrarErro("O celular precisa ter 11 números, com DDD: (00) 00000-0000.");
        return;
    }

    if (senha.length < 6) {
        mostrarErro("A senha precisa ter pelo menos 6 caracteres.");
        return;
    }

    if (senha !== confirmacao) {
        mostrarErro("As senhas não são iguais.");
        return;
    }

    // Confere se o CPF ou o e-mail já foram cadastrados
    const listaDeUsuarios = buscarUsuarios();

    for (let i = 0; i < listaDeUsuarios.length; i++) {
        if (listaDeUsuarios[i].cpf === cpf) {
            mostrarErro("Já existe uma conta com esse CPF.");
            return;
        }
        if (listaDeUsuarios[i].email === email) {
            mostrarErro("Já existe uma conta com esse e-mail.");
            return;
        }
    }

    // Tudo certo: cria o objeto e salva
    const novoUsuario = {
        cpf: cpf,
        nome: nome,
        email: email,
        telefone: telefone,
        senha: senha
    };

    listaDeUsuarios.push(novoUsuario);
    salvarUsuarios(listaDeUsuarios);

    mensagemCadastro.textContent = "Conta criada! Redirecionando para o login...";
    mensagemCadastro.className = "mensagem sucesso";

    setTimeout(function () {
        window.location.href = "login.html";
    }, 1500);
});
