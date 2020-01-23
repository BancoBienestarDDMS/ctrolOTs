// Call the dataTables jQuery plugin
$(document).ready(function() {
  // $('#dt_OTs').DataTable();
  var tt = $('#dt_OTs')
  var ctrl_ots_API = "http://172.26.160.167/api_ctrl_ots/rsConsultaOTs/getDAs?";
  $.getJSON( ctrl_ots_API, {
    // tags: "mount rainier",
    tagmode: "any",
    format: "json"
  })
    .done(function( data ) {
      var datos = data;
      console.log('done datos = ' + data[0].id);
      $.each( data, function( key, val ) {
        console.log('Direccion Adjunta: ' + key + ' id: ' + val.id + ' abrev: ' + val.abrev + ' nombre: ' + val.nombre);
        // $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
        // if ( i === 3 ) {
        //   return false;
        // }
      });
    });

  // console.log('asignamos datos= ' + datos); dcx
  // console.log('a la tabla.');
  // tt.DataTable({data: datos})  
});