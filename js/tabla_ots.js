// Call the dataTables jQuery plugin
$(document).ready(function() {
  // $('#dt_OTs').DataTable();
  // var tt = $('#dt_OTs');

  cargar_Anios();
  cargar_cat_Status_OT();
  consultarOTS (50, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, '', '', '', '');
  // var ctrl_ots_API_Urgs = "http://172.26.160.167/api_ctrl_ots/rsConsultaOTs/getUrgs?";
  // $.getJSON( ctrl_ots_API_Urgs, {
  //   tagmode: "any",
  //   format: "json"
  // }).done(function( data ) {
  //     var datos = data;
  //     console.log('getUrgs done ' + datos.length + ' rows');
  //   });

  // var ctrl_ots_API_Compls = "http://172.26.160.167/api_ctrl_ots/rsConsultaOTs/getCompls?";
  // $.getJSON( ctrl_ots_API_Compls, {
  //   tagmode: "any",
  //   format: "json"
  // }).done(function( data ) {
  //     var datos = data;
  //     console.log('getCompls done ' + datos.length + ' rows');
  //   });

  // console.log('asignamos datos= ' + datos); dcx
  // console.log('a la tabla.');
  // tt.DataTable({data: datos})
});

function cargar_Anios() {
  console.log("cargamos Anios único de ots.");
  var ctrl_ots_API_getAnios = "http://172.26.160.167/api_ctrl_ots/rsConsultaOTs/getAnios?";
  $.getJSON( ctrl_ots_API_getAnios, {
    tagmode: "any",
    format: "json"
  }).done( function( data ) {
    var datos = data;
    console.log('vaciamos el select de Anios.');
    $('#slc_Filtro_Anio').children().remove().end();
    $('#slc_Filtro_Anio').append(new Option('Todo', '0'));
    console.log('obtenemos ' + datos.length + ' rows de getAnios');
    $.each( data, function( key, val ) {
      console.log('Agregamos el anio: ' + key + ' valor: ' + (2000+val));
      $('#slc_Filtro_Anio').append(`<option value="${key}"> ${val+2000} </option>`); 
    });
    console.log('listo anios');
  });
}

function cargar_cat_Status_OT() {
  console.log("cargamos catálogo Status OTs");
  var ctrl_ots_API_StsOTs = "http://172.26.160.167/api_ctrl_ots/rsConsultaOTs/getStsOTs?";
  $.getJSON( ctrl_ots_API_StsOTs, {
    tagmode: "any",
    format: "json"
  }).done(function( data ) {
    var datos = data;
    console.log('vaciamos el select de Status OTs.');
    $('#slc_Filtro_Status').children().remove().end();
    $('#slc_Filtro_Status').append(new Option('Todo', '0'));
    console.log('getStsOTs done ' + datos.length + ' rows');
    $.each( data, function( key, val ) {
      console.log('Agregamos el status: ' + val.id + ' valor: ' + val.nombre);
      $('#slc_Filtro_Status').append(`<option value="${val.id}"> ${val.nombre} </option>`);
    });
    console.log('listo Status OTs.');
  });
}






function cargar_cat_Dir_Adjuntas() {
  console.log("cargamos catálogo de Direcciones Adjuntas");
  var ctrl_ots_API_Dir_Ajds = "http://172.26.160.167/api_ctrl_ots/rsConsultaOTs/getDAs?";
  $.getJSON( ctrl_ots_API_Dir_Ajds, {
    tagmode: "any",
    format: "json"
  }).done(function( data ) {
    var datos = data;
    console.log('vaciamos el select de Status OTs.');
    $('#slc_Filtro_Area_Solicitante').children().remove().end();
    $('#slc_Filtro_Area_Solicitante').append(new Option('Todo', '0'));
    console.log('getDAs done ' + datos.length + ' rows');
    $.each( data, function( key, val ) {
      console.log('agregamos la Direccion Adjunta: ' + val.id + ' nombre: ' + val.nombre);
      $('#slc_Filtro_Area_Solicitante').append(`<option value="${val.id}"> ${val.nombre} </option>`);
      console.log('buscamos las Direcciones correspondientes a la Dir. Adjunta: ' + val.id);
      cargar_cat_Direcciones(val.id);
    });
    console.log('listo Direcciones Adjuntas.');
  });
}

function cargar_cat_Direcciones(idDA) {
  console.log("cargamos catálogo de Direcciones");
  var ctrl_ots_API_Dirs = "http://172.26.160.167/api_ctrl_ots/rsConsultaOTs/getDirs?idDA="+idDA;
  $.getJSON( ctrl_ots_API_Dirs, {
    tagmode: "any",
    format: "json"
  }).done(function( data ) {
    var datos = data;
    console.log('getDirs done ' + datos.length + ' rows');
  });
}

function cargar_cat_SubDirecciones() {
  console.log("cargamos catálogo de SubDirecciones");
  var ctrl_ots_API_SubDirs = "http://172.26.160.167/api_ctrl_ots/rsConsultaOTs/getSubDirs?";
  $.getJSON( ctrl_ots_API_SubDirs, {
    tagmode: "any",
    format: "json"
  }).done(function( data ) {
    var datos = data;
    console.log('getSubDirs done ' + datos.length + ' rows');
  });
}

function cargar_cat_Gerencias() {
  console.log("cargamos catálogo de Gerencias");
  var ctrl_ots_API_Gers = "http://172.26.160.167/api_ctrl_ots/rsConsultaOTs/getGers?";
  $.getJSON( ctrl_ots_API_Gers, {
    tagmode: "any",
    format: "json"
  }).done(function( data ) {
    var datos = data;
    console.log('getGers done ' + datos.length + ' rows');
  });
}







function cargar_cat_Programas() {
  console.log("cargamos catálogo de Programas");
  var ctrl_ots_API_Progs = "http://172.26.160.167/api_ctrl_ots/rsConsultaOTs/getProgs?";
  $.getJSON( ctrl_ots_API_Progs, {
    tagmode: "any",
    format: "json"
  }).done(function( data ) {
    var datos = data;
    console.log('getProgs done ' + datos.length + ' rows');
  });
}

function cargar_cat_SubProgramas() {
  console.log("cargamos catálogo de SubProgramas");
  var ctrl_ots_API_SubProgs = "http://172.26.160.167/api_ctrl_ots/rsConsultaOTs/getSubProgs?";
  $.getJSON( ctrl_ots_API_SubProgs, {
    tagmode: "any",
    format: "json"
  }).done(function( data ) {
    var datos = data;
    console.log('getSubProgs done ' + datos.length + ' rows');
  });
}

function cargar_cat_Tipo_Servicio() {
  console.log("cargamos catálogo de Tipos de Servicio");
  var ctrl_ots_API_TServs = "http://172.26.160.167/api_ctrl_ots/rsConsultaOTs/getTServs?";
  $.getJSON( ctrl_ots_API_TServs, {
    tagmode: "any",
    format: "json"
  }).done(function( data ) {
    var datos = data;
    console.log('getTServs done ' + datos.length + ' rows');
  });
}

function cargar_cat_Area_Solicitante() {
  console.log("cargamos catálogo de Area Solicitante");
  var ctrl_ots_API_ArsAsig = "http://172.26.160.167/api_ctrl_ots/rsConsultaOTs/getArsAsig?";
  $.getJSON( ctrl_ots_API_ArsAsig, {
    tagmode: "any",
    format: "json"
  }).done(function( data ) {
    var datos = data;
    console.log('getArsAsig done ' + datos.length + ' rows');
  });
}

function cargar_cat_Solicitante(areaSol) {
  console.log("cargamos catálogo de Solicitantes para el area " + areaSol);
  var ctrl_ots_API_Usrs = "http://172.26.160.167/api_ctrl_ots/rsConsultaOTs/getUsrs?";
  $.getJSON( ctrl_ots_API_Usrs, {
    tagmode: "any",
    format: "json"
  }).done(function( data ) {
    var datos = data;
    console.log('getUsrs done ' + datos.length + ' rows');
  });
}

function cargar_cat_Area_Asignacion() {
  console.log("cargamos catálogo de Area Asignación");

}

function cargar_cat_Usuarios() {
  console.log("cargamos catálogo de Usuarios");
  var ctrl_ots_API_Usrs = "http://172.26.160.167/api_ctrl_ots/rsConsultaOTs/getUsrs?";
  $.getJSON( ctrl_ots_API_Usrs, {
    tagmode: "any",
    format: "json"
  }).done(function( data ) {
    var datos = data;
    console.log('getUsrs done ' + datos.length + ' rows');
  });
}

function cargar_cat_Personas() {
  console.log("cargamos catálogo de Personas");
  var ctrl_ots_API_Pers = "http://172.26.160.167/api_ctrl_ots/rsConsultaOTs/getPers?";
  $.getJSON( ctrl_ots_API_Pers, {
    tagmode: "any",
    format: "json"
  }).done(function( data ) {
    var datos = data;
    console.log('getPers done ' + datos.length + ' rows');
  });
}

function cargar_rel_Puesto_Persona() {
  console.log("cargamos catálogo de Personas");
  var ctrl_ots_API_RelPuesPers = "http://172.26.160.167/api_ctrl_ots/rsConsultaOTs/getRelPuesPers?";
  $.getJSON( ctrl_ots_API_RelPuesPers, {
    tagmode: "any",
    format: "json"
  }).done(function( data ) {
    var datos = data;
    console.log('getRelPuesPers done ' + datos.length + ' rows');
  });
}

function consultarOTS (top, anio, cont, ot, id_AS, id_Sol, id_AA, id_Prog, id_Subprog, id_TS, en_tiempo, id_status, id_urg, id_comp, f_sol, f_env, f_atn, f_ent) {
  //                     "http://172.26.160.167/api_ctrl_ots/rsConsultaOTs/getOTs?top=100&anio=19&cont=&ot=&id_AS=&id_Sol=&id_AA=&id_Prog=&id_Subprog=&id_TS=&en_tiempo=&id_status=&id_urg=&id_comp=&f_sol=&f_env=&f_atn=&f_ent=";
  var ctrl_ots_API_OTs = "http://172.26.160.167/api_ctrl_ots/rsConsultaOTs/getOTs?top="+top+"&anio="+anio+"&cont="+cont+"&ot="+ot+"&id_AS="+id_AS+"&id_Sol="+id_Sol+"&id_AA="+id_AA+"&id_Prog="+id_Prog+"&id_Subprog="+id_Subprog+"&id_TS="+id_TS+"&&id_status="+id_status+"&f_sol="+f_sol+"&f_env="+f_env+"&f_atn=&f_ent="+f_ent;
  $.getJSON( ctrl_ots_API_OTs, {
    tagmode: "any",
    format: "json"
  }).done(function( data ) {
    var datos = data;
    console.log('getOTs done ' + datos.length + ' rows');
    
    // $.each( data, function( key, val ) {
    //   val.Fecha_Solicitud = formatDate(val.Fecha_Solicitud);
    //   val.Fecha_Envio     = formatDate(val.Fecha_Envio);
    //   val.Fecha_Atencion  = formatDate(val.Fecha_Atencion);
    //   val.Fecha_Entrega   = formatDate(val.Fecha_Entrega);

    //   // if (key < 10) {  
    //   //   console.log('Orden Trabajo: ' + key + ' OT: ' + val.OT + ' Fecha Sol.: ' + date + ' Programa: ' + val.Programa + ' SubPrograma: ' + val.SubPrograma + ' Tipo Servicio: ' + val.Tipo_Servicio);
    //   // }
    //   // else {
    //   //   return; 
    //   // }
    // });

    // function formatDate( OD ) {
    //   console.log('Convirtiendo : ' + OD);
    //   var dateString  = OD.Fecha_Solicitud;
    //   console.log('DS : ' + dateString);
    //   dateString      = dateString.substring(6,len (OD.length(OD)-2));
    //   var currentTime = new Date(parseInt(dateString ));
    //   var month       = currentTime.getMonth() + 1;
    //   var day         = currentTime.getDate();
    //   var year        = currentTime.getFullYear();
    //   var hours       = currentTime.getHours();
    //   var mins        = currentTime.getMinutes();
    //   var secs        = currentTime.getSeconds();
    //   var date        = day + "/" + month + "/" + year + " " + hours + ":" + mins + ":" + secs;
    //   console.log('date: '+ date);
    //   return date;
    // };

    $('#dt_OTs').DataTable( { 
      data : datos,
      columnDefs: [ { "width": "100px" // , "targets": 0 
                    } ],
      columns: [{ title: 'Num. OT',                      data: 'OT'                        },
             // { title: 'Cont',                         data: 'Cont'                      },
             // { title: 'Anio',                         data: 'Anio'                      },
                { title: 'Area de Solicitante',          data: 's_Area_Solicitante'        },
                { title: 'Solicitante',                  data: 's_Solicitante'             },
                { title: 'Area de Asignacion',           data: 's_Area_Asignacion'         },

                { title: 'Programa',                     data: 's_Programa'                },
                { title: 'SubPrograma',                  data: 's_SubPrograma'             },
                { title: 'Tipo de Servicio',             data: 's_Tipo_Servicio'           },
             // { title: 'Urgencia',                     data: 's_Urgencia'                },
             // { title: 'Complejidad',                  data: 's_Complejidad'             },   
                { title: 'Estatus',                      data: 's_Estatus'                 },

                { title: 'Fecha de Solicitud',           data: 's_Fecha_Solicitud'         },
                { title: 'Fecha de Envio',               data: 's_Fecha_Envio'             },
                { title: 'Fecha de Atencion',            data: 's_Fecha_Atencion'          },
                { title: 'Fecha de Entrega',             data: 's_Fecha_Entrega'           },

                { title: 'Beneficiarios',                data: 'Beneficiarios',  searchable: false },
                { title: 'Monto',                        data: 'Monto',          searchable: false, render: $.fn.dataTable.render.number(',','.',2,'$') },
                { title: 'Rechazos',                     data: 'Rechazos',       searchable: false },
                { title: 'Monto de Rechazos',            data: 'Monto_Rechazos', searchable: false, render: $.fn.dataTable.render.number(',','.',2,'$') },
             // { title: 'Tiempo de Atencion',           data: 'Tiempo_Atencion'           },
             // { title: 'En Tiempo',                    data: 'En_Tiempo'                 },
              
                { title: 'Descripcion',                  data: 'Descripcion'               },
                { title: 'Observaciones',                data: 'Observaciones'             },
                { title: 'Observaciones de Atencion',    data: 'Observaciones_Atencion'    },
                { title: 'Observaciones de Cancelacion', data: 'Observaciones_Cancelacion' }
              ]
    } );
  });

  var d  = new Date();
  var dd = d.toLocaleDateString();
  var tt = d.toLocaleTimeString();
  var msg = "OTs actualizadas " + dd + " a las " + tt;
  document.getElementById("updatedDate_OTs").innerHTML = msg.toString();
  document.getElementById("txt_footer").innerHTML = "© Banco del Bienesatar " + d.getFullYear();
  console.log(msg);
  console.log('listo.');
}