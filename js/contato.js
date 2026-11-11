// contato.js - mostra as filiais e salva as mensagens enviadas no localStorage

const areaFiliais = document.getElementById("areaFiliais");
const formularioContato = document.getElementById("formularioContato");
const campoNome = document.getElementById("campoNome");
const campoEmail = document.getElementById("campoEmail");
const campoMensagem = document.getElementById("campoMensagem");
const mensagemContato = document.getElementById("mensagemContato");

for (let i = 0; i < listaDeFiliais.length; i++) {
    const filial = listaDeFiliais[i];
    const cartao = document.createElement("article");

    cartao.className = "cartao-filial";
    cartao.innerHTML =
        "<h3>" + filial.nome + "</h3>" +
        "<p>" + filial.endereco + "</p>" +
        "<p>Telefone: " + filial.telefone + "</p>" +
        "<p>" + filial.horario + "</p>";

    areaFiliais.appendChild(cartao);
}

// Se a pessoa estiver logada, já preenche nome e e-mail
const usuarioLogado = buscarUsuarioLogado();
if (usuarioLogado !== null) {
    campoNome.value = usuarioLogado.nome;
    campoEmail.value = usuarioLogado.email;
}

function mostrarMensagemContato(texto, classe) {
    mensagemContato.textContent = texto;
    mensagemContato.className = "mensagem " + classe;
}

formularioContato.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();
    const mensagem = campoMensagem.value.trim();

    if (nome.length < 3) {
        mostrarMensagemContato("Digite seu nome.", "erro");
        return;
    }

    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        mostrarMensagemContato("Digite um e-mail válido.", "erro");
        return;
    }

    if (mensagem.length < 10) {
        mostrarMensagemContato("Escreva uma mensagem com pelo menos 10 caracteres.", "erro");
        return;
    }

    const texto = localStorage.getItem("mensagens");
    let listaDeMensagens = [];
    if (texto !== null) {
        listaDeMensagens = JSON.parse(texto);
    }

    listaDeMensagens.push({
        data: new Date().toLocaleString("pt-BR"),
        nome: nome,
        email: email,
        mensagem: mensagem
    });
    localStorage.setItem("mensagens", JSON.stringify(listaDeMensagens));

    campoMensagem.value = "";
    mostrarMensagemContato("Mensagem enviada! Responderemos pelo e-mail informado.", "sucesso");
});
