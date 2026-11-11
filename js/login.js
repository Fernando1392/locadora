// login.js - confere e-mail e senha com os usuários salvos no localStorage

const formularioLogin = document.getElementById("formularioLogin");
const mensagemLogin = document.getElementById("mensagemLogin");

function mostrarErroLogin(texto) {
    mensagemLogin.textContent = texto;
    mensagemLogin.className = "mensagem erro";
}

formularioLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const email = document.getElementById("campoEmail").value.trim().toLowerCase();
    const senha = document.getElementById("campoSenha").value;

    if (email === "" || senha === "") {
        mostrarErroLogin("Digite o e-mail e a senha.");
        return;
    }

    const listaDeUsuarios = buscarUsuarios();

    if (listaDeUsuarios.length === 0) {
        mostrarErroLogin("Nenhuma conta foi encontrada neste navegador. Crie uma conta primeiro.");
        return;
    }

    let usuarioEncontrado = null;
    let emailExiste = false;

    for (let i = 0; i < listaDeUsuarios.length; i++) {
        if (listaDeUsuarios[i].email === email) {
            emailExiste = true;
            if (listaDeUsuarios[i].senha === senha) {
                usuarioEncontrado = listaDeUsuarios[i];
            }
        }
    }

    if (emailExiste === false) {
        mostrarErroLogin("Não existe conta com esse e-mail.");
        return;
    }

    if (usuarioEncontrado === null) {
        mostrarErroLogin("Senha incorreta.");
        return;
    }

    entrar(usuarioEncontrado);
    window.location.href = "frota.html";
});
