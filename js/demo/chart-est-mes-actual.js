console.log("entra a chart-area-demo.js");
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
// Chart Estadistica Mes Actual
var ctx = document.getElementById("chartEstMesAct");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Canceladas", "Con Usuario", "En QA", "En Proceso", "Atendidas"],
    datasets: [{
      label: "Ordenes",
      data: [87, 140, 100, 111, 197],
      backgroundColor: [ '#dc3545', '#6c757d', '#ffc107', '#17a2b8', '#28a745' ]
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: { unit: 'number' },
        gridLines: { display: false },
        ticks: { maxTicksLimit: 5 }
      }],
      yAxes: [{
        ticks: { min: 0, max: 250, maxTicksLimit: 7 },
        gridLines: { color: "rgba(0, 0, 0, .125)" }
      }],
    },
    legend: { display: false }
  }
});
console.log("termina de cargar chartEstMesAct");

var tt = new Date();
document.getElementById("updatedDate1").innerHTML = "actualizado a las " + tt.toLocaleTimeString();
document.getElementById("updatedDate2").innerHTML = "actualizado a las " + tt.toLocaleTimeString();
console.log("termina de actualizar las fechas de actualización");
console.log("listo");