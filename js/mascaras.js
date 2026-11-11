// mascaras.js - formata CPF e telefone enquanto a pessoa digita

// Recebe qualquer texto e devolve no formato 000.000.000-00
function formatarCpf(texto) {
    const numeros = texto.replace(/\D/g, "").slice(0, 11);
    let resultado = "";

    for (let i = 0; i < numeros.length; i++) {
        if (i === 3 || i === 6) {
            resultado = resultado + ".";
        }
        if (i === 9) {
            resultado = resultado + "-";
        }
        resultado = resultado + numeros[i];
    }

    return resultado;
}

// Recebe qualquer texto e devolve no formato (00) 00000-0000
function formatarTelefone(texto) {
    const numeros = texto.replace(/\D/g, "").slice(0, 11);
    let resultado = "";

    for (let i = 0; i < numeros.length; i++) {
        if (i === 0) {
            resultado = resultado + "(";
        }
        if (i === 2) {
            resultado = resultado + ") ";
        }
        if (i === 7) {
            resultado = resultado + "-";
        }
        resultado = resultado + numeros[i];
    }

    return resultado;
}
