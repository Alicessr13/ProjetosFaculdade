let rendas = [];
let gastos = [];
let planejamentos = [];

function adicionarRenda() {
  const valor = document.getElementById('renda').value;
  const tipo = document.getElementById('tipoRenda').value;
  rendas.push({ valor, tipo });
  document.getElementById('renda').value = '';
  document.getElementById('tipoRenda').value = '';
  atualizarRendas();
  atualizarResultado();
}

function adicionarGasto() {
  const valor = document.getElementById('gasto').value;
  const tipo = document.getElementById('tipoGasto').value;
  gastos.push({ valor, tipo });
  document.getElementById('gasto').value = '';
  document.getElementById('tipoGasto').value = '';
  atualizarGastos();
  atualizarResultado();
}

function fazerPlanejamento() {
  const categoria = document.getElementById('categoria').value;
  const porcentagem = document.getElementById('porcentagem').value;
  planejamentos.push({ categoria, porcentagem, valor: 0 });
  document.getElementById('categoria').value = '';
  document.getElementById('porcentagem').value = '';
  atualizarResultado();
}

function removerRenda(index) {
  rendas.splice(index, 1);
  atualizarRendas();
  atualizarResultado();
}

function removerGasto(index) {
  gastos.splice(index, 1);
  atualizarGastos();
  atualizarResultado();
}

function removerPlanejamento(index) {
  planejamentos.splice(index, 1);
  atualizarResultado();
}

function atualizarRenda(index) {
  const valor = document.getElementById(`rendaValor${index}`).value;
  const tipo = document.getElementById(`rendaTipo${index}`).value;
  rendas[index] = { valor, tipo };
  atualizarResultado();
}

function atualizarGasto(index) {
  const valor = document.getElementById(`gastoValor${index}`).value;
  const tipo = document.getElementById(`gastoTipo${index}`).value;
  gastos[index] = { valor, tipo };
  atualizarResultado();
}

function atualizarPlanejamento(index) {
  const categoria = document.getElementById(`planejamentoCategoria${index}`).value;
  const porcentagem = document.getElementById(`planejamentoPorcentagem${index}`).value;
  planejamentos[index] = { categoria, porcentagem, valor: 0 };
  atualizarResultado();
}

function atualizarRendas() {
  const rendasDiv = document.getElementById('rendas');
  rendasDiv.innerHTML = '';
  rendas.forEach((renda, index) => {
    rendasDiv.innerHTML += `<p>Renda ${index + 1}: <input id="rendaTipo${index}" type="text" value="${renda.tipo}"> - <input id="rendaValor${index}" type="number" value="${renda.valor}"> <button onclick="removerRenda(${index})">Remover</button> <button onclick="atualizarRenda(${index})">Atualizar</button></p>`;
  });
}

function atualizarGastos() {
  const gastosDiv = document.getElementById('gastos');
  gastosDiv.innerHTML = '';
  gastos.forEach((gasto, index) => {
    gastosDiv.innerHTML += `<p>Gasto ${index + 1}: <input id="gastoTipo${index}" type="text" value="${gasto.tipo}"> - <input id="gastoValor${index}" type="number" value="${gasto.valor}"> <button onclick="removerGasto(${index})">Remover</button> <button onclick="atualizarGasto(${index})">Atualizar</button></p>`;
  });
}

function atualizarPlanejamentos() {
  let restante = rendas.reduce((total, renda) => total + parseFloat(renda.valor), 0) - gastos.reduce((total, gasto) => total + parseFloat(gasto.valor), 0);
  const planejamentosDiv = document.getElementById('planejamentos');
  planejamentosDiv.innerHTML = '';
  planejamentos.forEach((planejamento, index) => {
    const valor = restante * (planejamento.porcentagem / 100);
    planejamento.valor = valor;
    restante -= valor;
    planejamentosDiv.innerHTML += `<p>Planejamento ${index + 1}: <input id="planejamentoCategoria${index}" type="text" value="${planejamento.categoria}"> - <input id="planejamentoPorcentagem${index}" type="number" value="${planejamento.porcentagem}">% - ${valor.toFixed(2)} <button onclick="removerPlanejamento(${index})">Remover</button> <button onclick="atualizarPlanejamento(${index})">Atualizar</button></p>`;
  });
  return restante;
}

function atualizarResultado() {
  const totalRenda = rendas.reduce((total, renda) => total + parseFloat(renda.valor), 0);
  const totalGasto = gastos.reduce((total, gasto) => total + parseFloat(gasto.valor), 0);
  const restante = atualizarPlanejamentos();

  // Atualiza os dados do gráfico
  meuGrafico.data.datasets[0].data = [totalRenda || 0, totalGasto || 0, restante || 0];
  meuGrafico.update();

  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = `<p>Total Renda: ${totalRenda.toFixed(2)}</p><p>Total Gasto: ${totalGasto.toFixed(2)}</p><p>Restante: ${restante.toFixed(2)}</p>`;
}

function toggle(id1, id2) {
  const div1 = document.getElementById(id1);
  const div2 = document.getElementById(id2);
  if (div1.style.display === 'none') {
    div1.style.display = 'block';
    div2.style.display = 'none';
  } else {
    div1.style.display = 'none';
    div2.style.display = 'block';
  }
}

var ctx = document.getElementById('meuGrafico').getContext('2d');
var meuGrafico = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: ['Renda', 'Gastos', 'Restante'],
      datasets: [{
          data: [0, 0, 0], // inicializa com zeros
          backgroundColor: ['rgb(147, 66, 245)', 'rgb(66, 150, 245)', 'rgb(192, 84, 204)']
      }]
  },
  options: {
      responsive: true,
  }
});
