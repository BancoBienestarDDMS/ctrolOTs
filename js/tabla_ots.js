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
      console.log('getDAs done ' + datos.length + ' rows');
      // $.each( data, function( key, val ) {
      //   console.log('Direccion Adjunta: ' + key + ' id: ' + val.id + ' abrev: ' + val.abrev + ' nombre: ' + val.nombre);
      // });
    });


  var ctrl_ots_API_OTs = "http://172.26.160.167/api_ctrl_ots/rsConsultaOTs/getOTs?";
  $.getJSON( ctrl_ots_API_OTs, {
    tagmode: "any",
    format: "json"
  }).done(function( data ) {
      var datos = data;
      console.log('getOTs done ' + datos.length + ' rows');
      $('#dt_OTs').DataTable( { 
        data : datos,
        columns: [{ title: 'OT',               data: 'OT'               },
                  { title: 'Area Solicitante', data: 'Area_Solicitante' },
                  { title: 'Solicitante',      data: 'Solicitante'      },
                  { title: 'Area_Asignacion',  data: 'Area_Asignacion'  },
                  { title: 'Fecha Solicitud',  data: 'Fecha_Solicitud'  },
                  { title: 'Programa',         data: 'Programa'         },
                  { title: 'SubPrograma',      data: 'SubPrograma'      },
                  { title: 'Tipo Servicio',    data: 'Tipo_Servicio'    },
                  { title: 'Estatus',          data: 'Estatus'          },
                  { title: 'Beneficiarios',    data: 'Beneficiarios'    },
                  { title: 'Monto',            data: 'Monto'            },
                  { title: 'Rechazos',         data: 'Rechazos'         },
                  { title: 'Monto_Rechazos',   data: 'Monto_Rechazos'   },
                ]
      } );

      $.each( data, function( key, val ) {
        if (key < 10) {
          var dateString  = val.Fecha_Solicitud.substr(6);
          var currentTime = new Date(parseInt(dateString ));
          var month       = currentTime.getMonth() + 1;
          var day         = currentTime.getDate();
          var year        = currentTime.getFullYear();
          var hours       = currentTime.getHours();
          var mins        = currentTime.getMinutes();
          var secs        = currentTime.getSeconds();
          var date        = day + "/" + month + "/" + year + " " + hours + ":" + mins + ":" + secs;
          console.log('Orden Trabajo: ' + key + ' OT: ' + val.OT + ' Fecha Sol.: ' + date + ' Programa: ' + val.Programa + ' SubPrograma: ' + val.SubPrograma + ' Tipo Servicio: ' + val.Tipo_Servicio);
          // if (typeof val.Fecha_Solicitud === 'string' &&  val.Fecha_Solicitud.match(isoDatePattern)) {
          //   var ff = new Date(val.Fecha_Solicitud); // isostring, so cast to js date
          //   // console.log('Orden Trabajo: ' + key + ' OT: ' + val.OT + ' Fecha Sol.: ' + ff + ' Programa: ' + val.Programa + ' SubPrograma: ' + val.SubPrograma);
          //   // console.log('Orden Trabajo: ' + key + ' OT: ' + val.OT + ' Fecha Sol.: ' + ff.toDateString );
          //   console.log(ff.toDateString());
          // }
        }
        else {
          return; 
        }
      });
      
      console.log('listo.');
    });

  
  

  // console.log('asignamos datos= ' + datos); dcx
  // console.log('a la tabla.');
  // tt.DataTable({data: datos})  
});