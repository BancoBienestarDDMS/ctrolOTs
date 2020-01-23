/*
                Registro de sesión y detección de Doble sesión.
*/

[AllowAnonymous]
[OutputCacheAttribute(VaryByParam = "*", Duration = 0, NoStore = true)]
[HttpPost]
public ActionResult Cliente(ClienteModel clienteModel)
{
    Logon002 log = new Logon002();
    try
    {
        string url = System.Web.HttpContext.Current.Request.Url.AbsoluteUri;//jjsl 02/02/2018
        
        var IP = Request.UserHostAddress;
        string urlAPI = System.Configuration.ConfigurationManager.AppSettings["urlListaNegra"].ToString();
        bool validaIP = System.Configuration.ConfigurationManager.AppSettings["ValidaIP"].ToString().Trim() == "1" ? true : false;
        UsuarioIP usrIP = new UsuarioIP();
        string lat = clienteModel.Latitud;
        string lon = clienteModel.Longitud;
        Regex r = new Regex("ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle|nexus|Android");
        bool isTablet = r.IsMatch(Request.UserAgent);
        string device = Request.Browser.IsMobileDevice || isTablet ? "Movil/Tablet" : "PC/Lap";
        if (validaIP && !usrIP.AccesoIP(IP, urlAPI).Access)
        {
            clienteModel.Error = "Acceso denegado.";
            return View(clienteModel);
        }

        BL.Avisos blAviso = new BL.Avisos();

        bool horarioValido = blAviso.ValidaHorarioBanca();

        if (horarioValido == false)
        {
            clienteModel.Error = "Servicio de la Banca: Lunes a Viernes de " + @System.Configuration.ConfigurationManager.AppSettings["HoraInicioBanca"].ToString() + " a " + @System.Configuration.ConfigurationManager.AppSettings["HoraFinBanca"].ToString() + " horas.";
            return View(clienteModel);
        }

        LogSystem.writeLogMensaje("", "Paso por aqui", "cliente");
        int enLinea = UserManager.validaConexion(clienteModel.idcliente);

        LogSystem.writeLogMensaje("", enLinea.ToString(), "cliente");
        if (enLinea == 0)
        {
            log = UserManager.ValidaUsuario(clienteModel.idcliente);

            if (log.Estatus == "1")
            {
                if (log.codigo.Trim() == "BELE1029")
                {
                    clienteModel.Error = "El No. de cliente es incorrecto";
                }
                else
                {
                    clienteModel.Error = log.mensaje;
                }
                return View(clienteModel);
            }
            else
            {
                clienteModel.idcliente = int.Parse(clienteModel.idcliente).ToString("00000000");

                if (log.Imagen.Trim().Length == 0)
                {
                    this.Session["IdInternoPe"] = (string)clienteModel.idcliente;
                    Bansefi.Central.Banca.BL.ST st = new Bansefi.Central.Banca.BL.ST();
                    string empty = string.Empty;
                    string urlst = System.Configuration.ConfigurationManager.AppSettings["urlValSoftToken"].ToString();
                    string userWS = System.Configuration.ConfigurationManager.AppSettings["userWSSoftToken"].ToString();
                    string pwdWS = System.Configuration.ConfigurationManager.AppSettings["pwdWSSoftToken"].ToString();
                    string idC = this.Session["IdInternoPe"] != null ? this.Session["IdInternoPe"].ToString() : "";
                    System.Web.HttpContext.Current.Session["OTPType"] = "HT";
                    if (st.validClient(idC, urlst, userWS, pwdWS))
                    {
                        System.Web.HttpContext.Current.Session["OTPType"] = (string)"ST";
                    }
                    string url1 = System.Configuration.ConfigurationManager.AppSettings["urlUbicacion"].ToString();
                    string statusBit = new Bansefi.Central.Banca.BIT.BitacoraService().InsertUbicacion(clienteModel.idcliente, lat, lon, device, IP, url1);
                    ViewData["idCliente"] = clienteModel.idcliente;
                    return View("AltaImagen");
                }
                else
                {
                    //inicio - modificacion de softtoken ARE
                    this.Session["IdInternoPe"] = (string)clienteModel.idcliente;
                    Bansefi.Central.Banca.BL.ST st = new Bansefi.Central.Banca.BL.ST();
                    string empty = string.Empty;
                    string urlst = System.Configuration.ConfigurationManager.AppSettings["urlValSoftToken"].ToString();
                    string userWS = System.Configuration.ConfigurationManager.AppSettings["userWSSoftToken"].ToString();
                    string pwdWS = System.Configuration.ConfigurationManager.AppSettings["pwdWSSoftToken"].ToString();
                    string idC = this.Session["IdInternoPe"] != null ? this.Session["IdInternoPe"].ToString() : "";
                    System.Web.HttpContext.Current.Session["OTPType"] = "HT";
                    if (st.validClient(idC, urlst, userWS, pwdWS))
                    {
                        System.Web.HttpContext.Current.Session["OTPType"] = (string)"ST";
                    }

                    //Fin . modificacion softtoken - ARE
                    string url1 = System.Configuration.ConfigurationManager.AppSettings["urlUbicacion"].ToString();
                    string statusBit = new Bansefi.Central.Banca.BIT.BitacoraService().InsertUbicacion(clienteModel.idcliente, lat, lon, device, IP, url1);
                    return RedirectToAction("Paso", "BancaE", new { frase = log.Frase, cveImagen = log.Imagen, idcliente = clienteModel.idcliente });
                }
            }
       }
        else
        {      //Si no existe una sesión en linea (enLinea == 1)
            clienteModel.Error = "Acceso denegado, el usuario ya está firmado en el sistema";
            string urlBadSession = System.Configuration.ConfigurationManager.AppSettings["urlBadSession"].ToString();
            string statusBadSess = new Bansefi.Central.Banca.BIT.BitacoraService().BadSession(clienteModel.idcliente.ToString(), urlBadSession ,lat,lon,device,IP,"1"); // Actualiza el dato (badSession) temporal en BD
           return View(clienteModel);
        }
    }
    catch (Exception ex)
    {
        LogSystem.writeLogExcepcion(clienteModel.idcliente, ex, "BancaEController:Cliente");
        clienteModel.Error = "Error en el sistema, favor de intentarlo más tarde";
        return View(clienteModel);
    }
}

/*
                Recuperación del dato (badSession) e inclusión al contexto
*/

...
    string url = System.Configuration.ConfigurationManager.AppSettings["urlBitTrans"].ToString();
    string statusBit = !nomSerBit.Trim().Equals("") ? new Bansefi.Central.Banca.BIT.BitacoraService().InsertBitTrans(usuario, nomSerBit.Trim(), monto, ctaOrg, ctaDes, url):"";
    HttpContext.Current.Items.Add("BadSession", statusBit.Equals("90617") ? "1" : "0");
    string badSession = HttpContext.Current.Items["BadSession"].ToString();
...

/*
                Revicion del dato (badSession) del contexto
*/

[HttpPost]
[AllowAnonymous]
public ActionResult VerificarSesion()
{           
    try
    {
        JsonResult regreso = new JsonResult();
        string badSession = System.Web.HttpContext.Current.Items["BadSession"].ToString();
        if (badSession=="1")
        {
            string urlBadSession = System.Configuration.ConfigurationManager.AppSettings["urlBadSession"].ToString();
            new Bansefi.Central.Banca.BIT.BitacoraService().BadSession(UserManager.User.IdU.ToString(), urlBadSession,"","","","","0");
            //Model.Transaccion trans = new Model.Transaccion();
            //trans = BL.Encuesta.RegistraEncuesta("1");
        }
       
        return Json(
          new
          {
              Exitoso = badSession,
              Error = "",                     
              Mensaje = System.Configuration.ConfigurationManager.AppSettings["errMsjSesionDuplicada"]
          }
          );
        
    }
    catch (Exception ex)
    {
        return Json(
          new
          {
              Exitoso = 0,
              Error = "",
              Mensaje = ex.Message.ToString()
          }
      );
}

/*
               Envio de Notificación de Doble sesión 
*/

$VerificaSession = function () {

    var vUrl = $('#dialogAlert').attr('data-URL');
    $.ajax({
        url: vUrl,
        async: false,
        contentType: 'application/json; charset=utf-8',
        type: 'POST',
        data: JSON.stringify({}),
        dataType: 'json'
    })
        .success(function (result) {
            if (result.Exitoso == 1) {
                $("#dialog-alert").dialog("open");
                $("#msjSeErr").html(result.Mensaje);
            }

        })
        .error(function (xhr, status) {
        });

};
