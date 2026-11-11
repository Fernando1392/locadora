// index.js - monta as categorias e os destaques da página inicial usando a lista do carros.js

const descricoesDasCategorias = {
    "Econômico": "Pequenos e econômicos, ótimos para a cidade.",
    "Compacto": "Mais espaço e conforto no dia a dia.",
    "Sedan": "Porta-malas grande para viagens e trabalho.",
    "SUV": "Posição alta e espaço para a família.",
    "Utilitário": "Picapes e furgões para carga e serviço.",
    "Premium": "Conforto máximo para ocasiões especiais."
};

const idsDosDestaques = [1, 4, 8, 10];

const areaCategorias = document.getElementById("areaCategorias");
const areaDestaques = document.getElementById("areaDestaques");
const buscaCategoria = document.getElementById("buscaCategoria");
const buscaPreco = document.getElementById("buscaPreco");
const buscaRapida = document.getElementById("buscaRapida");

// Procura o menor preço de diária dentro de uma categoria
function buscarMenorPreco(categoria) {
    let menorPreco = 0;

    for (let i = 0; i < listaDeCarros.length; i++) {
        const carro = listaDeCarros[i];

        if (carro.categoria === categoria) {
            if (menorPreco === 0 || carro.precoDiaria < menorPreco) {
                menorPreco = carro.precoDiaria;
            }
        }
    }

    return menorPreco;
}

function mostrarCategorias() {
    for (let i = 0; i < listaDeCategorias.length; i++) {
        const nomeDaCategoria = listaDeCategorias[i];
        const cartao = document.createElement("a");

        cartao.className = "cartao-categoria-home";
        cartao.href = "frota.html?categoria=" + encodeURIComponent(nomeDaCategoria);
        cartao.innerHTML =
            "<h3>" + nomeDaCategoria + "</h3>" +
            "<p>" + descricoesDasCategorias[nomeDaCategoria] + "</p>" +
            "<span>a partir de R$ " + buscarMenorPreco(nomeDaCategoria) + " por dia</span>";

        areaCategorias.appendChild(cartao);
    }
}

function mostrarDestaques() {
    for (let i = 0; i < idsDosDestaques.length; i++) {
        for (let j = 0; j < listaDeCarros.length; j++) {
            const carro = listaDeCarros[j];

            if (carro.id === idsDosDestaques[i]) {
                const cartao = document.createElement("article");
                cartao.className = "cartao-destaque";
                cartao.innerHTML =
                    '<img src="img/' + carro.imagem + '" alt="Foto do ' + carro.nome + '">' +
                    '<span class="cartao-categoria">' + carro.categoria + "</span>" +
                    "<h3>" + carro.nome + "</h3>" +
                    "<p>" + carro.cambio + " · " + carro.lugares + " lugares</p>" +
                    '<p class="cartao-preco">R$ ' + carro.precoDiaria + " <small>por dia</small></p>" +
                    '<a class="botao" href="reserva.html?carro=' + carro.id + '">Reservar</a>';

                areaDestaques.appendChild(cartao);
            }
        }
    }
}

function preencherBusca() {
    for (let i = 0; i < listaDeCategorias.length; i++) {
        const opcao = document.createElement("option");
        opcao.value = listaDeCategorias[i];
        opcao.textContent = listaDeCategorias[i];
        buscaCategoria.appendChild(opcao);
    }
}

// Ao buscar, vai para o catálogo já com os filtros na URL
buscaRapida.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let endereco = "frota.html?categoria=" + encodeURIComponent(buscaCategoria.value);
    endereco = endereco + "&preco=" + buscaPreco.value;

    window.location.href = endereco;
});

preencherBusca();
mostrarCategorias();
mostrarDestaques();
