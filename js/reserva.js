// reserva.js - formulário de reserva, cálculo do total e validação

const avisoLogin = document.getElementById("avisoLogin");
const areaReserva = document.getElementById("areaReserva");
const formularioReserva = document.getElementById("formularioReserva");
const mensagemReserva = document.getElementById("mensagemReserva");

const campoCarro = document.getElementById("campoCarro");
const campoFilialRetirada = document.getElementById("campoFilialRetirada");
const campoFilialDevolucao = document.getElementById("campoFilialDevolucao");
const campoDataRetirada = document.getElementById("campoDataRetirada");
const campoDataDevolucao = document.getElementById("campoDataDevolucao");
const areaExtras = document.getElementById("areaExtras");

// Passo 1: só quem está logado pode reservar
const usuarioLogado = buscarUsuarioLogado();

if (usuarioLogado === null) {
    avisoLogin.hidden = false;
} else {
    areaReserva.hidden = false;
    document.getElementById("resumoCliente").textContent = usuarioLogado.nome;
    iniciarPagina();
}

// Passo 2: preencher os menus e os extras
function iniciarPagina() {
    for (let i = 0; i < listaDeCarros.length; i++) {
        const opcao = document.createElement("option");
        opcao.value = listaDeCarros[i].id;
        opcao.textContent = listaDeCarros[i].nome + " (" + listaDeCarros[i].categoria + ")";
        campoCarro.appendChild(opcao);
    }

    for (let i = 0; i < listaDeFiliais.length; i++) {
        const opcaoRetirada = document.createElement("option");
        opcaoRetirada.value = listaDeFiliais[i].codigo;
        opcaoRetirada.textContent = listaDeFiliais[i].nome;
        campoFilialRetirada.appendChild(opcaoRetirada);

        const opcaoDevolucao = document.createElement("option");
        opcaoDevolucao.value = listaDeFiliais[i].codigo;
        opcaoDevolucao.textContent = listaDeFiliais[i].nome;
        campoFilialDevolucao.appendChild(opcaoDevolucao);
    }

    for (let i = 0; i < listaDeExtras.length; i++) {
        const extra = listaDeExtras[i];
        const linha = document.createElement("label");
        linha.className = "linha-extra";
        linha.innerHTML =
            '<span>' + extra.descricao + ' (' + formatarDinheiro(extra.valorDiaria) + ' por dia)</span>' +
            '<input type="number" min="0" max="3" value="0" id="extra-' + extra.codigo + '">';
        areaExtras.appendChild(linha);

        document.getElementById("extra-" + extra.codigo).addEventListener("input", atualizarResumo);
    }

    // Passo 3: se veio do catálogo, escolhe o carro que está na URL (reserva.html?carro=3)
    const parametros = new URLSearchParams(window.location.search);
    const idDaUrl = parametros.get("carro");

    if (idDaUrl !== null) {
        campoCarro.value = idDaUrl;
    }

    // Não deixa escolher datas que já passaram
    campoDataRetirada.min = pegarDataDeHoje();
    campoDataDevolucao.min = pegarDataDeHoje();

    atualizarResumo();
}

// Funções de apoio
function pegarDataDeHoje() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    let mes = hoje.getMonth() + 1;
    let dia = hoje.getDate();

    if (mes < 10) {
        mes = "0" + mes;
    }
    if (dia < 10) {
        dia = "0" + dia;
    }

    return ano + "-" + mes + "-" + dia;
}

function formatarDinheiro(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}

function buscarCarroPorId(id) {
    for (let i = 0; i < listaDeCarros.length; i++) {
        if (listaDeCarros[i].id === Number(id)) {
            return listaDeCarros[i];
        }
    }
    return null;
}

function buscarFilialPorCodigo(codigo) {
    for (let i = 0; i < listaDeFiliais.length; i++) {
        if (listaDeFiliais[i].codigo === Number(codigo)) {
            return listaDeFiliais[i];
        }
    }
    return null;
}

// Número de diárias = diferença entre as datas, em dias
function calcularDias() {
    if (campoDataRetirada.value === "" || campoDataDevolucao.value === "") {
        return 0;
    }

    const retirada = new Date(campoDataRetirada.value);
    const devolucao = new Date(campoDataDevolucao.value);
    const milissegundosPorDia = 1000 * 60 * 60 * 24;
    const dias = Math.round((devolucao - retirada) / milissegundosPorDia);

    if (dias < 1) {
        return 0;
    }

    return dias;
}

// Lista só os extras com quantidade maior que zero
function pegarExtrasEscolhidos() {
    const escolhidos = [];

    for (let i = 0; i < listaDeExtras.length; i++) {
        const quantidade = Number(document.getElementById("extra-" + listaDeExtras[i].codigo).value);

        if (quantidade > 0) {
            escolhidos.push({
                codigo: listaDeExtras[i].codigo,
                descricao: listaDeExtras[i].descricao,
                quantidade: quantidade,
                valorDiaria: listaDeExtras[i].valorDiaria
            });
        }
    }

    return escolhidos;
}

// Passo 4: calcular e mostrar o resumo (total = dias x (carro + extras))
function calcularTotais() {
    const carro = buscarCarroPorId(campoCarro.value);
    const dias = calcularDias();
    const extras = pegarExtrasEscolhidos();

    let extrasPorDia = 0;
    for (let i = 0; i < extras.length; i++) {
        extrasPorDia = extrasPorDia + extras[i].valorDiaria * extras[i].quantidade;
    }

    return {
        carro: carro,
        dias: dias,
        valorCarro: dias * carro.precoDiaria,
        valorExtras: dias * extrasPorDia,
        total: dias * (carro.precoDiaria + extrasPorDia)
    };
}

function atualizarResumo() {
    const totais = calcularTotais();

    document.getElementById("resumoCarro").textContent = totais.carro.nome;
    document.getElementById("resumoImagem").src = "img/" + totais.carro.imagem;
    document.getElementById("resumoImagem").alt = "Foto do " + totais.carro.nome;
    document.getElementById("resumoDias").textContent = totais.dias;
    document.getElementById("resumoValorCarro").textContent = formatarDinheiro(totais.valorCarro);
    document.getElementById("resumoValorExtras").textContent = formatarDinheiro(totais.valorExtras);
    document.getElementById("resumoTotal").textContent = formatarDinheiro(totais.total);
}

campoCarro.addEventListener("change", atualizarResumo);
campoDataRetirada.addEventListener("change", atualizarResumo);
campoDataDevolucao.addEventListener("change", atualizarResumo);

// Passo 5: validar e salvar a reserva no localStorage
function mostrarErroReserva(texto) {
    mensagemReserva.textContent = texto;
    mensagemReserva.className = "mensagem erro";
}

formularioReserva.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (campoDataRetirada.value === "" || campoDataDevolucao.value === "") {
        mostrarErroReserva("Escolha a data de retirada e a de devolução.");
        return;
    }

    if (campoDataRetirada.value < pegarDataDeHoje()) {
        mostrarErroReserva("A data de retirada não pode ser anterior a hoje.");
        return;
    }

    if (campoDataDevolucao.value <= campoDataRetirada.value) {
        mostrarErroReserva("A devolução precisa ser depois da retirada.");
        return;
    }

    const totais = calcularTotais();
    const filialRetirada = buscarFilialPorCodigo(campoFilialRetirada.value);
    const filialDevolucao = buscarFilialPorCodigo(campoFilialDevolucao.value);

    const novaReserva = {
        numero: Date.now(),
        cpfCliente: usuarioLogado.cpf,
        idCarro: totais.carro.id,
        nomeCarro: totais.carro.nome,
        filialRetirada: filialRetirada.nome,
        filialDevolucao: filialDevolucao.nome,
        dataRetirada: campoDataRetirada.value,
        dataDevolucao: campoDataDevolucao.value,
        extras: pegarExtrasEscolhidos(),
        valorTotal: totais.total,
        status: "Reservada"
    };

    const texto = localStorage.getItem("reservas");
    let listaDeReservas = [];
    if (texto !== null) {
        listaDeReservas = JSON.parse(texto);
    }

    listaDeReservas.push(novaReserva);
    localStorage.setItem("reservas", JSON.stringify(listaDeReservas));

    mensagemReserva.innerHTML =
        "Reserva confirmada! " + novaReserva.nomeCarro + ", total de " + formatarDinheiro(novaReserva.valorTotal) +
        '. <a href="minhas-reservas.html">Ver minhas reservas</a>';
    mensagemReserva.className = "mensagem sucesso";
});
