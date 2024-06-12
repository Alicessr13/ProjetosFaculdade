// Função exemplo
function funcao(x) {
    return x * x - 4;
}

function bisseccao(a, b, precisao) {
    let valores = []; // Armazena os valores intermediários

    if (funcao(a) * funcao(b) >= 0) {
        console.log("Você não supôs corretamente a, b.\n");
        return;
    }

    let c = a;

    while ((b - a) >= precisao) {
        // Encontre o ponto médio
        c = (a + b) / 2;

        valores.push(c); // Armazena o valor intermediário

        // Verifique se o ponto médio é raiz
        if (funcao(c) == 0.0)
            break;

        // Decida o lado para o qual repetir os passos
        else if (funcao(c) * funcao(a) < 0)
            b = c;
        else
            a = c;
    }
    console.log("O valor da raiz é : ", c);

    return valores; // Retorna os valores intermediários
}

// Chamar o método
let a =-3, b = 0;
let valores = bisseccao(a, b, 0.001);

if (valores) {
    // Dados para o gráfico
    var dados = {
        labels: valores.map((v, i) => i), // Eixo X é o índice do array
        datasets: [{
            label: 'Valores Intermediários',
            data: valores,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    // Configuração do gráfico
    var config = {
        type: 'line',
        data: dados,
    };

    // Criação do gráfico
    var meuGrafico = new Chart(
        document.getElementById('meuGrafico'),
        config
    );
}