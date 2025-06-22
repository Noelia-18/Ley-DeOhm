// script.js
let chart;

function calcularOhm() {
  const V = parseFloat(document.getElementById('voltaje').value);
  const I = parseFloat(document.getElementById('corriente').value);
  const R = parseFloat(document.getElementById('resistencia').value);

  let v = V, i = I, r = R;

  const countFilled = [V, I, R].filter(val => !isNaN(val)).length;

  if (countFilled !== 2) {
    alert("Por favor, ingresa solo dos valores.");
    return;
  }

  if (isNaN(V)) v = I * R;
  if (isNaN(I)) i = V / R;
  if (isNaN(R)) r = V / I;

  document.getElementById('voltaje').value = v.toFixed(2);
  document.getElementById('corriente').value = i.toFixed(2);
  document.getElementById('resistencia').value = r.toFixed(2);

  actualizarGrafico(v, i, r);
}

function actualizarGrafico(V, I, R) {
  const ctx = document.getElementById('grafico').getContext('2d');
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Voltaje (V)', 'Corriente (I)', 'Resistencia (R)'],
      datasets: [{
        label: 'Relación Ley de Ohm',
        data: [V, I, R],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#007bff',
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
