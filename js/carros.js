// carros.js - dados da frota (mesma lista que montamos antes)

const listaDeCarros = [
    { id: 1, nome: "Fiat Mobi", categoria: "Econômico", precoDiaria: 89, cambio: "Manual", lugares: 4, imagem: "fiat-mobi.webp" },
    { id: 2, nome: "Renault Kwid", categoria: "Econômico", precoDiaria: 92, cambio: "Manual", lugares: 4, imagem: "renault-kwid.webp" },
    { id: 3, nome: "Chevrolet Onix", categoria: "Compacto", precoDiaria: 119, cambio: "Manual", lugares: 5, imagem: "chevrolet-onix.webp" },
    { id: 4, nome: "Hyundai HB20", categoria: "Compacto", precoDiaria: 125, cambio: "Automático", lugares: 5, imagem: "hyundai-hb20.webp" },
    { id: 5, nome: "Volkswagen Polo", categoria: "Compacto", precoDiaria: 139, cambio: "Automático", lugares: 5, imagem: "volkswagen-polo.webp" },
    { id: 6, nome: "Fiat Cronos", categoria: "Sedan", precoDiaria: 149, cambio: "Automático", lugares: 5, imagem: "fiat-cronos.webp" },
    { id: 7, nome: "Chevrolet Onix Plus", categoria: "Sedan", precoDiaria: 155, cambio: "Automático", lugares: 5, imagem: "chevrolet-onix-plus.webp" },
    { id: 8, nome: "Volkswagen T-Cross", categoria: "SUV", precoDiaria: 219, cambio: "Automático", lugares: 5, imagem: "volkswagen-t-cross.webp" },
    { id: 9, nome: "Hyundai Creta", categoria: "SUV", precoDiaria: 229, cambio: "Automático", lugares: 5, imagem: "hyundai-creta.webp" },
    { id: 10, nome: "Fiat Toro", categoria: "Utilitário", precoDiaria: 249, cambio: "Automático", lugares: 5, imagem: "fiat-toro.webp" },
    { id: 11, nome: "Fiat Fiorino", categoria: "Utilitário", precoDiaria: 159, cambio: "Manual", lugares: 2, imagem: "fiat-fiorino.webp" },
    { id: 12, nome: "Toyota Corolla", categoria: "Premium", precoDiaria: 289, cambio: "Automático", lugares: 5, imagem: "toyota-corolla.webp" }
];

const listaDeCategorias = ["Econômico", "Compacto", "Sedan", "SUV", "Utilitário", "Premium"];

// Filiais (viram a tabela Filial no banco de dados)
const listaDeFiliais = [
    { codigo: 1, nome: "Centro", endereco: "Rua Exemplo, 100 - Centro", telefone: "(00) 3000-0001", horario: "Seg a sáb, 8h às 18h" },
    { codigo: 2, nome: "Aeroporto", endereco: "Terminal de passageiros, balcão 4", telefone: "(00) 3000-0002", horario: "Todos os dias, 6h às 22h" },
    { codigo: 3, nome: "Shopping", endereco: "Av. Modelo, 500 - piso L1", telefone: "(00) 3000-0003", horario: "Todos os dias, 10h às 22h" }
];

// Extras opcionais (viram a tabela Extra no banco de dados)
const listaDeExtras = [
    { codigo: 1, descricao: "Cadeirinha de criança", valorDiaria: 15 },
    { codigo: 3, descricao: "Seguro adicional", valorDiaria: 30 }
];
