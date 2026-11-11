// minhas-reservas.js - mostra as reservas da pessoa logada e permite cancelar

const avisoLogin = document.getElementById("avisoLogin");
const mensagemVazia = document.getElementById("mensagemVazia");
const areaReservas = document.getElementById("areaReservas");

const usuarioLogado = buscarUsuarioLogado();

function buscarTodasAsReservas() {
    const texto = localStorage.getItem("reservas");

    if (texto === null) {
        return [];
    }

    return JSON.parse(texto);
}

// Troca 2026-11-20 por 20/11/2026
function formatarData(dataIso) {
    const partes = dataIso.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
}

function formatarDinheiro(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}

function textoDosExtras(extras) {
    if (extras.length === 0) {
        return "Nenhum";
    }

    let texto = "";
    for (let i = 0; i < extras.length; i++) {
        if (i > 0) {
            texto = texto + ", ";
        }
        texto = texto + extras[i].quantidade + "x " + extras[i].descricao;
    }
    return texto;
}

function cancelarReserva(numero) {
    const confirmou = confirm("Deseja mesmo cancelar esta reserva?");

    if (confirmou === false) {
        return;
    }

    const todasAsReservas = buscarTodasAsReservas();

    for (let i = 0; i < todasAsReservas.length; i++) {
        if (todasAsReservas[i].numero === numero) {
            todasAsReservas[i].status = "Cancelada";
        }
    }

    localStorage.setItem("reservas", JSON.stringify(todasAsReservas));
    mostrarReservas();
}

// Apaga de vez uma reserva que já foi cancelada
function apagarReserva(numero) {
    const confirmou = confirm("Apagar esta reserva? Essa ação não pode ser desfeita.");

    if (confirmou === false) {
        return;
    }

    const todasAsReservas = buscarTodasAsReservas();
    const reservasQueFicam = [];

    for (let i = 0; i < todasAsReservas.length; i++) {
        if (todasAsReservas[i].numero !== numero) {
            reservasQueFicam.push(todasAsReservas[i]);
        }
    }

    localStorage.setItem("reservas", JSON.stringify(reservasQueFicam));
    mostrarReservas();
}

// Procura o nome do arquivo da foto do carro (os dados vêm do carros.js)
function buscarImagemDoCarro(idCarro) {
    for (let i = 0; i < listaDeCarros.length; i++) {
        if (listaDeCarros[i].id === idCarro) {
            return listaDeCarros[i].imagem;
        }
    }
    return "";
}

function criarCartaoDaReserva(reserva) {
    const cartao = document.createElement("article");
    cartao.className = "cartao-reserva";

    let classeDoStatus = "status status-reservada";
    if (reserva.status === "Cancelada") {
        classeDoStatus = "status status-cancelada";
    }

    const imagemDoCarro = buscarImagemDoCarro(reserva.idCarro);
    let imagemHtml = "";
    if (imagemDoCarro !== "") {
        imagemHtml = '<img src="img/' + imagemDoCarro + '" alt="Foto do ' + reserva.nomeCarro + '">';
    }

    cartao.innerHTML =
        imagemHtml +
        '<div class="reserva-topo">' +
        "<h3>" + reserva.nomeCarro + "</h3>" +
        '<span class="' + classeDoStatus + '">' + reserva.status + "</span>" +
        "</div>" +
        "<p>Retirada: <strong>" + formatarData(reserva.dataRetirada) + "</strong> na filial " + reserva.filialRetirada + "</p>" +
        "<p>Devolução: <strong>" + formatarData(reserva.dataDevolucao) + "</strong> na filial " + reserva.filialDevolucao + "</p>" +
        "<p>Extras: " + textoDosExtras(reserva.extras) + "</p>" +
        '<p class="reserva-total">Total: ' + formatarDinheiro(reserva.valorTotal) + "</p>" +
        '<p class="reserva-numero">Reserva nº ' + reserva.numero + "</p>";

    if (reserva.status === "Reservada") {
        const botaoCancelar = document.createElement("button");
        botaoCancelar.type = "button";
        botaoCancelar.className = "botao botao-claro";
        botaoCancelar.textContent = "Cancelar reserva";
        botaoCancelar.addEventListener("click", function () {
            cancelarReserva(reserva.numero);
        });
        cartao.appendChild(botaoCancelar);
    }

    if (reserva.status === "Cancelada") {
        const botaoApagar = document.createElement("button");
        botaoApagar.type = "button";
        botaoApagar.className = "botao botao-perigo";
        botaoApagar.textContent = "Apagar reserva";
        botaoApagar.addEventListener("click", function () {
            apagarReserva(reserva.numero);
        });
        cartao.appendChild(botaoApagar);
    }

    return cartao;
}

function mostrarReservas() {
    areaReservas.innerHTML = "";

    const todasAsReservas = buscarTodasAsReservas();
    let quantidade = 0;

    // Percorre de trás para frente, para as reservas mais novas aparecerem primeiro
    for (let i = todasAsReservas.length - 1; i >= 0; i--) {
        if (todasAsReservas[i].cpfCliente === usuarioLogado.cpf) {
            areaReservas.appendChild(criarCartaoDaReserva(todasAsReservas[i]));
            quantidade = quantidade + 1;
        }
    }

    mensagemVazia.hidden = (quantidade > 0);
}

if (usuarioLogado === null) {
    avisoLogin.hidden = false;
} else {
    mostrarReservas();
}
