function f(x) {
    return Math.pow(x, 2) - 3;
}

function bissec(a, b, erro) {
    document.getElementById('resultado').innerHTML = ''; 
    var n = Math.ceil((Math.log(b - a) - Math.log(erro)) / Math.log(2));
    var i = 0;
    var resultado = document.getElementById('resultado');
    resultado.innerHTML = "<h2>Valor das Iterações</h2>";

    while (i < n) {
        if (f(a) * f(b) > 0) {
            resultado.innerHTML += "<p>Não podemos afirmar se há raiz nesse intervalo</p>";
        } else {
            var m = (a + b) / 2;
            m = parseFloat(m.toFixed(6));

            if (f(a) * f(m) < 0) {
                b = m;
            } else {
                a = m;
            }
            resultado.innerHTML += "<p>Valor de x_" + (i + 1) + " = " + m + "</p>";
        }
        i++;
    }
    resultado.innerHTML += "<p>O valor aproximado da raiz: " + m + "</p>";
}