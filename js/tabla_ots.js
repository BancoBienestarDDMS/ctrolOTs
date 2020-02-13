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
      
      $.each( data, function( key, val ) {
        val.Fecha_Solicitud = formatDate(val.Fecha_Solicitud);
        val.Fecha_Envio     = formatDate(val.Fecha_Envio);
        val.Fecha_Atencion  = formatDate(val.Fecha_Atencion);
        val.Fecha_Entrega   = formatDate(val.Fecha_Entrega);

        // if (key < 10) {  
        //   console.log('Orden Trabajo: ' + key + ' OT: ' + val.OT + ' Fecha Sol.: ' + date + ' Programa: ' + val.Programa + ' SubPrograma: ' + val.SubPrograma + ' Tipo Servicio: ' + val.Tipo_Servicio);
        // }
        // else {
        //   return; 
        // }
      });

      function formatDate( OD ) {
        console.log('Convirtiendo : ' + OD);
        var dateString  = OD.Fecha_Solicitud;
        console.log('DS : ' + dateString);
        dateString      = dateString.substring(6,len (OD.length(OD)-2));
        var currentTime = new Date(parseInt(dateString ));
        var month       = currentTime.getMonth() + 1;
        var day         = currentTime.getDate();
        var year        = currentTime.getFullYear();
        var hours       = currentTime.getHours();
        var mins        = currentTime.getMinutes();
        var secs        = currentTime.getSeconds();
        var date        = day + "/" + month + "/" + year + " " + hours + ":" + mins + ":" + secs;
        console.log('date: '+ date);
        return date;
      };

      $('#dt_OTs').DataTable( { 
        data : datos,
        columns: [{ title: 'Num. OT',                      data: 'OT'                        },
                  { title: 'Area de Solicitante',          data: 'Area_Solicitante'          },
                  { title: 'Solicitante',                  data: 'Solicitante'               },
                  { title: 'Area de Asignacion',           data: 'Area_Asignacion'           },
                  { title: 'Fecha de Solicitud',           data: 'Fecha_Solicitud'           },
                  { title: 'Programa',                     data: 'Programa'                  },
                  { title: 'SubPrograma',                  data: 'SubPrograma'               },
                  { title: 'Tipo de Servicio',             data: 'Tipo_Servicio'             },
                  { title: 'Urgencia',                     data: 'Urgencia'                  },
                  { title: 'Complejidad',                  data: 'Complejidad'               },
                  { title: 'Fecha de Envio',               data: 'Fecha_Envio'               },
                  { title: 'Estatus',                      data: 'Estatus'                   },
                  { title: 'Beneficiarios',                data: 'Beneficiarios',  searchable: false },
               // { title: 'Monto',                        data: 'Monto',          render: function ( data, type, row ) { return '$ '+ data; } },
                  { title: 'Monto',                        data: 'Monto',          searchable: false, render: $.fn.dataTable.render.number(',','.',2,'$') },
                  { title: 'Rechazos',                     data: 'Rechazos',       searchable: false },
                  { title: 'Monto de Rechazos',            data: 'Monto_Rechazos', searchable: false, render: $.fn.dataTable.render.number(',','.',2,'$') },
                  { title: 'Fecha de Atencion',            data: 'Fecha_Atencion'            },
                  { title: 'Tiempo de Atencion',           data: 'Tiempo_Atencion'           },
                  { title: 'En Tiempo',                    data: 'En_Tiempo'                 },
                  { title: 'Fecha de Entrega',             data: 'Fecha_Entrega'             },
                  { title: 'Descripcion',                  data: 'Descripcion'               },
                  { title: 'Observaciones',                data: 'Observaciones'             },
                  { title: 'Observaciones de Atencion',    data: 'Observaciones_Atencion'    },
                  { title: 'Observaciones de Cancelacion', data: 'Observaciones_Cancelacion' }
                ],
        select: true
      } );
      
      console.log('listo.');
    });

  // console.log('asignamos datos= ' + datos); dcx
  // console.log('a la tabla.');
  // tt.DataTable({data: datos})  
});

