// Call the dataTables jQuery plugin
$(document).ready(function() {
  // $('#dt_OTs').DataTable();
  var tt = $('#dt_OTs')
  
  var ctrl_ots_API_Dir_Ajds = "http://172.26.160.167/api_ctrl_ots/rsConsultaOTs/getDAs?";
  $.getJSON( ctrl_ots_API_Dir_Ajds, {
    tagmode: "any",
    format: "json"
  }).done(function( data ) {
      var datos = data;
      // console.log('done datos = ' + data[0].id);
      $.each( data, function( key, val ) {
        console.log('Direccion Adjunta: ' + key + ' id: ' + val.id + ' abrev: ' + val.abrev + ' nombre: ' + val.nombre);
      });
    });


  var ctrl_ots_API_OTs = "http://172.26.160.167/api_ctrl_ots/rsConsultaOTs/getOTs?";
  $.getJSON( ctrl_ots_API_OTs, {
    // tags: "mount rainier",
    tagmode: "any",
    format: "json"
  }).done(function( data ) {
      var datos = data;
      tt.DataTable({data: datos});
      $.each( data, function( key, val ) {
        console.log('Orden Trabajo: ' + key + ' OT: ' + val.OT + ' Programa: ' + val.Programa + ' SubPrograma: ' + val.SubPrograma);
      });
    });

  


  // console.log('asignamos datos= ' + datos); dcx
  // console.log('a la tabla.');
  // tt.DataTable({data: datos})  
});