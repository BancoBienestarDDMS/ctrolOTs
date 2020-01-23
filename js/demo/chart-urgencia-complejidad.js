console.log("entra a chart-area-demo.js");
// Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
// Chart.defaults.global.defaultFontColor = '#292b2c';
// Chart Urgencia Complejidad
 ctx = document.getElementById("chartUrgenciaComplejidad");
myLineChart = new Chart(ctx, {
  type: 'line',
  tittle: 'Urgencia y Complejidad',
  subtittle: 'Horas para atención',
  data: {
    labels: ["Muy Alta","Alta","Media","Baja"],
    datasets: [
      {
        label: "Muy Alta (a determinar)",
        lineTension: 0.3,
        backgroundColor: "rgba(0,0,0,0)",
        borderColor: "rgba(255,0,0,1)",
        pointRadius: 5,
        pointBackgroundColor: "rgba(255,0,0,1)",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(255,0,0,1)",
        pointHitRadius: 50,
        pointBorderWidth: 2,
        data: [ 45, 45, 45, 45 ]
      },
      {
        label: "Alta",
        lineTension: 0.3,
        backgroundColor: "rgba(0,0,0,0)",
        borderColor: "rgba(0,255,0,1)",
        pointRadius: 5,
        pointBackgroundColor: "rgba(0,255,0,1)",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(0,255,0,1)",
        pointHitRadius: 50,
        pointBorderWidth: 2,
        data: [ 18, 24, 32, 40 ]
      },
      {
        label: "Media",
        lineTension: 0.3,
        backgroundColor: "rgba(0,0,0,0)",
        borderColor: "rgba(0,0,255,1)",
        pointRadius: 5,
        pointBackgroundColor: "rgba(0,0,255,1)",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(0,0,255,1)",
        pointHitRadius: 50,
        pointBorderWidth: 2,
        data: [ 12, 18, 24, 32 ]
      },
      {
        label: "Baja",
        lineTension: 0.3,
        backgroundColor: "rgba(0,0,0,0)",
        borderColor: "rgba(100,100,100,1)",
        pointRadius: 5,
        pointBackgroundColor: "rgba(100,100,100,1)",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(100,100,100,1)",
        pointHitRadius: 50,
        pointBorderWidth: 2,
        data: [ 8, 12, 18, 24 ]
      }
  ],
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
            beginAtZero: true,
            ticks: [ "Muy Alta", "Alta", "Media", "Baja" ],
            min: 0, max: 50, maxTicksLimit: 9 
        },
        // gridLines: { color: "rgba(0, 0, 0, .125)" },
        // label: "Complejidad"
      }]
    },
    legend: { display: true, options:{ } }
  }
});
console.log("termina de cargar chartUrgenciaComplejidad");

var tt  = new Date();
var tt_ = "actualizado a las " + tt.toLocaleTimeString();
document.getElementById("updatedDateCatAreas").innerHTML  = tt_;
document.getElementById("updatedDateCatSol").innerHTML    = tt_;
document.getElementById("updatedDateCatAA").innerHTML     = tt_;
document.getElementById("updatedDateCatStatus").innerHTML = tt_;
document.getElementById("updatedDateChrtUC").innerHTML    = tt_;
console.log("termina de actualizar las fechas de actualización");
console.log("listo");