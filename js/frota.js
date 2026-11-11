// frota.js - mostra os cartões e aplica os filtros da página frota.html

const areaDosCarros = document.getElementById("areaDosCarros");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroPrecoMaximo = document.getElementById("filtroPrecoMaximo");
const botaoLimpar = document.getElementById("botaoLimpar");
const mensagemVazia = document.getElementById("mensagemVazia");

// Passo 1: preencher o menu de categorias usando a lista do carros.js
function preencherCategorias() {
    for (let i = 0; i < listaDeCategorias.length; i++) {
        const opcao = document.createElement("option");
        opcao.value = listaDeCategorias[i];
        opcao.textContent = listaDeCategorias[i];
        filtroCategoria.appendChild(opcao);
    }
}

// Passo 2: criar o cartão (HTML) de um carro
function criarCartao(carro) {
    const cartao = document.createElement("article");
    cartao.className = "cartao-carro";

    cartao.innerHTML =
        '<img src="img/' + carro.imagem + '" alt="Foto do ' + carro.nome + '">' +
        '<div class="cartao-texto">' +
        '<span class="cartao-categoria">' + carro.categoria + '</span>' +
        '<h3>' + carro.nome + '</h3>' +
        '<p>' + carro.cambio + ' · ' + carro.lugares + ' lugares</p>' +
        '<p class="cartao-preco">R$ ' + carro.precoDiaria + ' <small>por dia</small></p>' +
        '<a class="botao" href="reserva.html?carro=' + carro.id + '">Reservar</a>' +
        '</div>';

    return cartao;
}

// Passo 3: mostrar na tela uma lista de carros
function mostrarCarros(lista) {
    areaDosCarros.innerHTML = "";

    for (let i = 0; i < lista.length; i++) {
        const cartao = criarCartao(lista[i]);
        areaDosCarros.appendChild(cartao);
    }

    if (lista.length === 0) {
        mensagemVazia.hidden = false;
    } else {
        mensagemVazia.hidden = true;
    }
}

// Passo 4: filtrar a lista pela categoria e pelo preço máximo
function aplicarFiltros() {
    const categoriaEscolhida = filtroCategoria.value;
    const precoMaximo = Number(filtroPrecoMaximo.value);
    const carrosFiltrados = [];

    for (let i = 0; i < listaDeCarros.length; i++) {
        const carro = listaDeCarros[i];
        let passouNaCategoria = true;
        let passouNoPreco = true;

        if (categoriaEscolhida !== "") {
            passouNaCategoria = (carro.categoria === categoriaEscolhida);
        }

        if (precoMaximo > 0) {
            passouNoPreco = (carro.precoDiaria <= precoMaximo);
        }

        if (passouNaCategoria && passouNoPreco) {
            carrosFiltrados.push(carro);
        }
    }

    mostrarCarros(carrosFiltrados);
}

function limparFiltros() {
    filtroCategoria.value = "";
    filtroPrecoMaximo.value = "";
    mostrarCarros(listaDeCarros);
}

// Passo 5: ligar os eventos e mostrar todos os carros ao abrir a página
filtroCategoria.addEventListener("change", aplicarFiltros);
filtroPrecoMaximo.addEventListener("input", aplicarFiltros);
botaoLimpar.addEventListener("click", limparFiltros);

preencherCategorias();

// Se veio da página inicial, aplica os filtros que estão na URL (frota.html?categoria=SUV&preco=250)
const parametrosDaUrl = new URLSearchParams(window.location.search);
const categoriaDaUrl = parametrosDaUrl.get("categoria");
const precoDaUrl = parametrosDaUrl.get("preco");

if (categoriaDaUrl !== null) {
    filtroCategoria.value = categoriaDaUrl;
}
if (precoDaUrl !== null) {
    filtroPrecoMaximo.value = precoDaUrl;
}

aplicarFiltros();
