using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CapaDatos;
using Entidad;
using System.Net;
using System.Text;
using System.Net.Http;
using System.Net.Mail;
using System.IO;
using OfficeOpenXml;

namespace Runatec.Controllers
{
    public class ServicesController : Controller
    {
        General d = new General();
        //public ActionResult ComboPerfilUsuario(int nidUsuario)
        //{
        //    List<PerfilEntity> listado = d.ComboPerfilUsuario_DA(nidUsuario);
        //    return Json(listado);
        //}

        public ActionResult ValidarLogin(string vusuario, string vpassword)
        {
            List<LoginEntity> listado = d.ValidarLogin_DA(vusuario, vpassword);
            return Json(listado);
        }

        //Menú del login
        public ActionResult ListarMenuPrincipal(int nidPerfil)
        {
            List<Menu> listado = d.ListarMenuPrincipal_DA(nidPerfil);
            return Json(listado);
        }
        public ActionResult ListarSubMenuNivelUno(int nidPerfil, int ModuloPadre)
        {
            List<Menu> listado = d.ListarSubMenuNivelUno_DA(nidPerfil, ModuloPadre);
            return Json(listado);
        }

        public ActionResult ListarSubMenuNivelDos(int nidPerfil, int ModuloPadre)
        {
            List<Menu> listado = d.ListarSubMenuNivelDos_DA(nidPerfil, ModuloPadre);
            return Json(listado);
        }

        //Listar Menú Público
        public ActionResult ListarMenuPublico()
        {
            List<Menu> listado = d.ListarMenuPublico_DA();
            return Json(listado);
        }
        public ActionResult ListarSubMenuNivelUno_Publico(int ModuloPadre)
        {
            List<Menu> listado = d.ListarSubMenuNivelUno_Publico_DA(ModuloPadre);
            return Json(listado);
        }

        public ActionResult ListarSubMenuNivelDos_Publico(int ModuloPadre)
        {
            List<Menu> listado = d.ListarSubMenuNivelDos_Publico_DA(ModuloPadre);
            return Json(listado);
        }

        public ActionResult CargarPrecios2(string nidmercado, string dfechaproceso, string idproducto, string vnombreproducto, string dprecio1, string dprecio2, string dprecio3, string dprecio4, string dprecio5
            , string dprecio6, string dprecio7, string dprecio8, string dprecio9, string dprecio10)
        {
            string resultado = d.CargarPrecios2_DA(nidmercado, dfechaproceso,idproducto, vnombreproducto,dprecio1,dprecio2,dprecio3,dprecio4,dprecio5, dprecio6, dprecio7, dprecio8, dprecio9, dprecio10);
            return Json(resultado);
        }

        public ActionResult ListartempDetalleHistorial(string nidmercado,string dfechainicio, string dfechafin)
        {
            List<tempDetalleHistorial> listado = d.ListartempDetalleHistorial_DA(nidmercado, dfechainicio, dfechafin);
            return Json(listado);
        }

        public ActionResult ProcesarDetalleHistorial(string cadena)
        {
            string respuesta = d.ProcesarDetalleHistorial_DA(cadena);
            return Json(respuesta);
        }

        public ActionResult ListarMercado()
        {
            List<MercadoEntity> listado = d.ListarMercado_DA();
            return Json(listado);
        }
        public ActionResult ListarProducto(string vdescripcion, string NroDePagina, string RegPorPag)
        {
            List<ProductoEntity> listado = d.ListarProducto_DA(vdescripcion, NroDePagina,RegPorPag);
            return Json(listado);
        }

        public ActionResult ListarComboMercado()
        {
            List<MercadoEntity> listado = d.ListarComboMercado_DA();
            return Json(listado);
        }
        public ActionResult InsertarMercado(string vdescripcion, string vubigeo, string vdescripcion_corta)
        {
            List<MercadoEntity> listado = d.InsertarMercado_DA(vdescripcion, vubigeo, vdescripcion_corta);
            return Json(listado);
        }

        public ActionResult EditarMercado(string nidmercado, string vdescripcion, string vubigeo, string vdescripcion_corta)
        {
            List<MercadoEntity> listado = d.EditarMercado_DA(nidmercado,vdescripcion,vubigeo, vdescripcion_corta);
            return Json(listado);
        }

        public ActionResult SMSPrecioUsuario_Envio()
        {
           //CABECERA
            List<smsPrecioUsuario> listado_Cabecera = d.SMSPrecioUsuario_Cabecera_DA();
            string MensajeTexto = "";

            for (int i = 0; i < listado_Cabecera.Count; i++)
            {
                MensajeTexto = MensajeTexto + " " + listado_Cabecera[i].cabecera + Environment.NewLine;

                    //DETALLE
                    List<smsPrecioUsuario> listado_Detalle = d.SMSPrecioUsuario_Detalle_DA(listado_Cabecera[i].celular);
                    string GrupoMercado = "";

                    for (int j = 0; j < listado_Detalle.Count; j++)
                    {                       

                        if (GrupoMercado != listado_Detalle[j].mercado)
                        {
                            MensajeTexto = MensajeTexto + listado_Detalle[j].mercado + Environment.NewLine;
                        }
                        
                        MensajeTexto = MensajeTexto + " " + listado_Detalle[j].vdescripcion_corta + " " + listado_Detalle[j].preciopromedio + Environment.NewLine;

                        GrupoMercado = listado_Detalle[j].mercado;
                    }

                GrupoMercado = "";
                //ENVIA MENSAJE DE TEXTO
                EnvioSMS(listado_Cabecera[i].celular, MensajeTexto);
                
                MensajeTexto = "";
            }
            
            return Json(listado_Cabecera);
           // return Json(exito);
         
        }


        public string EnvioSMS(string numero, string mensajetexto)
        {
            try
            {
                /*string DATA = @"{
                ""to"": ""964052754"",    
                ""text"": ""hOLA 02""}";
                */

                //convertir a JSON
                var my_jsondata = new
                {
                    to = numero,
                    text = mensajetexto
                };

                string DATA = JsonConvert.SerializeObject(my_jsondata);


                // SE OBTIENE LA URL Y CREDENCIALES PARA EL ACCESO AL ENVIO DEL SMS.

                //string vurl = "https://app.binomioconsultores.net:8090/sendsms";                
                //string vusuario = "jaybar.sms";
                //string vpassword = "97VdRwZlgj";

                // CREDENCIALES

                List<SMSConfiguracionGeneralEntity> listado = d.SMS_ConfiguracionGeneral_DA();
                string vurl = listado[0].vurl;
                string vusuario = listado[0].vusuario;
                string vpassword = listado[0].vpassword;


                string vcredenciales = vusuario + ":" + vpassword;

                //
                System.Net.Http.HttpClient client = new System.Net.Http.HttpClient();
                client.BaseAddress = new System.Uri(vurl);
                byte[] cred = UTF8Encoding.UTF8.GetBytes(vcredenciales);
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", Convert.ToBase64String(cred));
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                System.Net.Http.HttpContent content = new StringContent(DATA, UTF8Encoding.UTF8, "application/json");
                HttpResponseMessage messge = client.PostAsync(vurl, content).Result;
                string description = string.Empty;

                if (messge.IsSuccessStatusCode)
                {
                    string result = messge.Content.ReadAsStringAsync().Result;
                    string EstadoEnvioSMS = "";
                    description = result;                
                    EstadoEnvioSMS = d.SMSLogEnvios_Insertar_DA(numero, "PRECIO", "1", "El envío del SMS fue Conforme.");
                }
                else
                {
                    description = d.SMSLogEnvios_Insertar_DA(numero, "PRECIO", "0", "No se logro enviar el SMS, codigo de estado " + messge.StatusCode.ToString());
                }


                return description;
            }
            catch (Exception ex)
            {
                string respuesta = d.SMSLogEnvios_Insertar_DA(numero, "PRECIO", "0", "Error: " + ex.InnerException);
                return respuesta;
            }

        }


        public ActionResult ListarComboFamilia()
        {
            List<FamiliaEntity> listado = d.ListarComboFamilia_DA();
            return Json(listado);
        }

        public ActionResult ListarComboSubFamilia(string nidfamilia)
        {
            List<SubFamiliaEntity> listado = d.ListarComboSubFamilia_DA(nidfamilia);
            return Json(listado);
        }

        public ActionResult ListarComboVariedad(string nidsubfamilia)
        {
            List<VariedadEntity> listado = d.ListarComboVariedad_DA(nidsubfamilia);
            return Json(listado);
        }
        public ActionResult ListarComboOrigen()
        {
            List<OrigenEntity> listado = d.ListarComboOrigen_DA();
            return Json(listado);
        }
        public ActionResult ListarComboCalidad()
        {
            List<CalidadEntity> listado = d.ListarComboCalidad_DA();
            return Json(listado);
        }
        public ActionResult ListarComboMedida()
        {
            List<MedidaEntity> listado = d.ListarComboMedida_DA();
            return Json(listado);
        }

        public ActionResult InsertarProducto(string vdescripcion_corta, string nidcalidad, string nidmedida, string nidfamilia, string nidsubfamilia, string nidvariedad, string nidorigen)
        {
            string respuesta = d.InsertarProducto_DA(vdescripcion_corta, nidcalidad, nidmedida, nidfamilia, nidsubfamilia, nidvariedad, nidorigen);
            return Json(respuesta);
        }

        public ActionResult SelectProducto(string nidproducto)
        {
            List<ProductoEntity> listado = d.SelectProducto_DA(nidproducto);
            return Json(listado);
        }

        public ActionResult EditarProducto(string nidproducto, string vdescripcion_corta, string nidcalidad, string nidfamilia, string nidsubfamilia, string nidvariedad, string nidorigen, string iestado, string nidmedida)
        {
            string respuesta = d.EditarProducto_DA(nidproducto,vdescripcion_corta,nidcalidad,nidfamilia,nidsubfamilia,nidvariedad,nidorigen,iestado,nidmedida);
            return Json(respuesta);
        }

        public ActionResult GraficarPrecios(string cadenaid, string fecha)
        {
            List<GraficoPrecios> lista = d.GraficarPrecios_DA(cadenaid, fecha);

            return Json(lista);
        }

        public ActionResult ListarComboProducto()
        {
            List<ComboProducto> lista = d.ListarComboProducto_DA();
            return Json(lista);
        }

        public ActionResult LogEnviosEntity(string NroDePagina, string RegPorPag, string vcelular, string vtipo, string dfecha)
        {
            List<LogEnviosEntity> lista = d.ListarLogEnvios_DA(NroDePagina, RegPorPag, vcelular, vtipo, dfecha);
            return Json(lista);
        }

        public ActionResult ListarTipoDocumento()
        {
            List<TipoDocumentoEntity> lista = d.ListarTipoDocumento_DA();
            return Json(lista);
        }

        public ActionResult InsertarUsuario_CrearCuenta(string nidtipodocumento, string vnumdocumento, string vnombres,
            string vpaterno, string vmaterno, string vsexo, string vrazonsocial, string vusuario, string vpassword,
            string vemail, string vtelefono, string vcelular, string vdireccion, string vubigeo)
        {
            List<UsuarioEntity> listado = d.InsertarUsuario_CrearCuenta_DA(nidtipodocumento,vnumdocumento,vnombres,
                vpaterno,vmaterno,vsexo,vrazonsocial,vusuario,vpassword,vemail,vtelefono,vcelular,vdireccion,vubigeo);

            return Json(listado);
        }

        public ActionResult EnviarCorreo_Cuenta(string destino, string asunto, string allmensaje)
        {

            MailMessage mensaje = new MailMessage();
            mensaje.BodyEncoding = Encoding.UTF8;
            mensaje.SubjectEncoding = Encoding.UTF8;
            AlternateView htmlView = AlternateView.CreateAlternateViewFromString(allmensaje);
            htmlView.ContentType = new System.Net.Mime.ContentType("text/html");

            mensaje.AlternateViews.Add(htmlView);

            mensaje.From = new MailAddress("postmaster@chaskis.net");//Correo emisor
            //mensaje.To.Add(destino);
            mensaje.Subject = asunto;
            mensaje.Body = allmensaje;
            mensaje.To.Add(destino);
            //mensaje.Attachments.Add(new Attachment(pdfFile));
            mensaje.IsBodyHtml = true;

            SmtpClient smtp = new SmtpClient();

            //credenciales emisor
            smtp.Host = "mail.chaskis.net";
            smtp.Port = 25;
            smtp.Credentials = new System.Net.NetworkCredential("postmaster@chaskis.net", "#aybar123");

            smtp.Send(mensaje);

            return Json("ok");

        }

        public ActionResult ListarCuentasUsuario(string iestado, string nombres, string NroDePagina, string RegPorPag)
        {
            List<UsuarioEntity> listado = d.ListarCuentasUsuario_DA(iestado, nombres, NroDePagina, RegPorPag);
            return Json(listado);
        }

        public ActionResult AprobarCuentasUsuario(string nidusuario, string iestado)
        {
            List<UsuarioEntity> listado = d.AprobarCuentasUsuario_DA(nidusuario, iestado);
            return Json(listado);
        }
        public ActionResult ListarCarruselNoticia()
        {
            List<NoticiaEntity> lista = d.ListarCarruselNoticia_DA();
            return Json(lista);
        }

        public ActionResult ListarEditorial()
        {
            List<EditorialEntity> listado = d.ListarEditorial_DA();
            return Json(listado);
        }

        public ActionResult AutocompletarUbigeo(string vdescripcion)
        {
            List<UbigeoEntity> listado = d.AutocompletarUbigeo_DA(vdescripcion);
            return Json(listado);
        }

        public ActionResult ListarUsuario(string vcelular, string razon_social, string nidperfil, string NroDePagina, string RegPorPag)
        {
            List<UsuarioEntity> listado = d.ListarUsuario_DA(vcelular, razon_social, nidperfil, NroDePagina, RegPorPag);
            return Json(listado);
        }

        public ActionResult ListarComboPerfil()
        {
            List<PerfilEntity> listado = d.ListarComboPerfil_DA();
            return Json(listado);
        }
        public ActionResult ListarComboEstado()
        {
            List<EstadoEntity> listado = d.ListarComboEstado_DA();
            return Json(listado);
        }
        public ActionResult SelectUsuario(string nidusuario)
        {
            List<UsuarioEntity> listado = d.SelectUsuario_DA(nidusuario);
            return Json(listado);
        }

        public ActionResult EditarUsuario(string nidusuario, string nidtipodocumento, string vnumdocumento,
                                        string vnombres, string vpaterno, string vmaterno, string vsexo,
                                        string vrazonsocial, string vusuario, string vemail,
                                        string vtelefono, string vcelular, string vdireccion, string vubigeo,
                                        string iestado, string nidperfil)
        {
            string respuesta = d.EditarUsuario_DA( nidusuario,  nidtipodocumento,  vnumdocumento,
                                                     vnombres,  vpaterno,  vmaterno,  vsexo,
                                                     vrazonsocial,  vusuario, vemail,
                                                     vtelefono,  vcelular,  vdireccion,  vubigeo,
                                                     iestado,  nidperfil);
            return Json(respuesta);
        }

        public ActionResult InsertarUsuario(string nidtipodocumento, string vnumdocumento, string vnombres, string vpaterno,
                                         string vmaterno, string vsexo, string vrazonsocial, string vemail, string vtelefono,
                                         string vcelular, string vdireccion, string vubigeo, string iestado, string nidperfil)
        {
            string respuesta = d.InsertarUsuario_DA(nidtipodocumento, vnumdocumento, vnombres, vpaterno, vmaterno, 
                                                                vsexo, vrazonsocial, vemail,vtelefono, vcelular, vdireccion, 
                                                                vubigeo, iestado, nidperfil);
            return Json(respuesta);
        }

        // Listar Preferencias de mercado del usuario
        public ActionResult SelectUsuarioPreferenciaMercado(string nidusuario)
        {
            List<UsuarioPreferenciasEntity> listado = d.SelectUsuarioPreferenciaMercado_DA(nidusuario);
            return Json(listado);
        }

        // Listar NO- Preferencias de mercado del usuario
        public ActionResult NoSelectUsuarioPreferenciaMercado(string nidusuario)
        {
            List<UsuarioPreferenciasEntity> listado = d.NoSelectUsuarioPreferenciaMercado_DA(nidusuario);
            return Json(listado);
        }
        // Listar Preferencias de producto del usuario
        public ActionResult SelectUsuarioPreferenciaProducto(string nidusuario, string nidmercado)
        {
            List<UsuarioPreferenciasEntity> listado = d.SelectUsuarioPreferenciaProducto_DA(nidusuario, nidmercado);
            return Json(listado);
        }

        // Listar NO- Preferencias de producto del usuario
        public ActionResult NoSelectUsuarioPreferenciaProducto(string nidusuario, string nidmercado)
        {
            List<UsuarioPreferenciasEntity> listado = d.NoSelectUsuarioPreferenciaProducto_DA(nidusuario, nidmercado);
            return Json(listado);
        }

        //Preferencias Mercados
        public ActionResult EliminarPreferenciaMercadoUsuario(string nidUsuario, string cadena)
        {
            string respuesta = d.EliminarPreferenciaMercadoUsuario_DA(nidUsuario,cadena);
            return Json(respuesta);
        }
        public ActionResult InsertarPreferenciaMercadoUsuario(string nidUsuario, string cadena)
        {
            string respuesta = d.InsertarPreferenciaMercadoUsuario_DA(nidUsuario, cadena);
            return Json(respuesta);
        }

        // Preferencias Productos
        public ActionResult EliminarPreferenciaProductoUsuario(string nidUsuario, string cadena, string nidmercado)
        {
            string respuesta = d.EliminarPreferenciaProductoUsuario_DA(nidUsuario, cadena, nidmercado);
            return Json(respuesta);
        }
        public ActionResult InsertarPreferenciaProductoUsuario(string nidUsuario, string cadena, string nidmercado)
        {
            string respuesta = d.InsertarPreferenciaProductoUsuario_DA(nidUsuario, cadena, nidmercado);
            return Json(respuesta);
        }

        public ActionResult EditarPrecios_tempDetalleHistorial(string nidtempdetallehistorial, string dprecio1, string dprecio2, 
                                                                string dprecio3,string dprecio4, string dprecio5, string dprecio6, 
                                                                string dprecio7, string dprecio8,string dprecio9, string dprecio10)
        {
            string respuesta = d.EditarPrecios_tempDetalleHistorial_DA(nidtempdetallehistorial, dprecio1, dprecio2,
                                                                         dprecio3, dprecio4, dprecio5, dprecio6,
                                                                         dprecio7, dprecio8, dprecio9, dprecio10);
            return Json(respuesta);
        }

        public ActionResult ListarConfiguracionEnvio()
        {
            List<ConfiguracionEnvioEntity> listado = d.ListarConfiguracionEnvio_DA();
            return Json(listado);
        }

        public ActionResult EditarConfiguracionEnvio(string nidsmsconfigenvio, string horaenvio, string iestado)
        {
            string respuesta = d.EditarConfiguracionEnvio_DA(nidsmsconfigenvio, horaenvio,iestado);
            return Json(respuesta);
        }

        public ActionResult CargarUsuarios(string vnombres, string vpaterno, string vmaterno, string vdni,
                                            string vcelular, string vubigeo)
        {
            string respuesta = d.CargarUsuarios_DA(vnombres, vpaterno, vmaterno, vdni, vcelular, vubigeo);
            return Json(respuesta);
        }

        public ActionResult ListarHistoricoPrecios(string NroDePagina, string RegPorPag, string dfechainicio, string dfechafin,
                                                    string nidmercado, string vnombreproducto)
        {
            List<PreciosEntity> listado= d.ListarHistoricoPrecios_DA(NroDePagina, RegPorPag, dfechainicio, dfechafin, nidmercado, vnombreproducto);
            return Json(listado);
        }

        //Exportar Excel Historico de precios
        public ActionResult ExportarExcelHistoricoPrecios(string dfechainicio, string dfechafin, string nidmercado, string vnombreproducto)
        {
            List<HistoricoPreciosExcelEntity> listado = d.ExportarExcelHistoricoPrecios_DA(dfechainicio, dfechafin, nidmercado, vnombreproducto);

            using (ExcelPackage pck = new ExcelPackage())
            {
                ExcelWorksheet ws = pck.Workbook.Worksheets.Add("HistoricoPrecios");
                ws.Cells["A1"].LoadFromCollection(listado, true);
                ws.View.ShowGridLines = true;

                ws.Cells["A1"].Value = "N°";
                ws.Cells["B1"].Value = "MERCADO";
                ws.Cells["C1"].Value = "FECHA";
                ws.Cells["D1"].Value = "PRODUCTO";
                ws.Cells["E1"].Value = "PROMEDIO";

                ws.Column(1).AutoFit();
                ws.Column(2).AutoFit();
                ws.Column(3).AutoFit();
                ws.Column(4).AutoFit();
                ws.Column(5).AutoFit();

                ws.Cells["A1:E1"].Style.Font.Bold = true;

                Byte[] fileBytes = pck.GetAsByteArray();
                Response.Clear();
                Response.Buffer = true;
                Response.AddHeader("content-disposition", "attachment;filename=HistoricoPrecios_" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".xlsx");

                Response.Charset = "";
                Response.ContentType = "application/vnd.ms-excel";
                StringWriter sw = new StringWriter();
                Response.BinaryWrite(fileBytes);
                Response.End();
            }

            return View("HistoricoPrecios");
        }
        //Grafico precios intranet (Modulo PRECIO DE VENTA)
        public ActionResult GraficarPreciosIntranet(string cadenaid, string dfechainicio, string dfechafin, string nidmercado)
        {
            List<GraficoPrecios> lista = d.GraficarPreciosIntranet_DA(cadenaid, dfechainicio,dfechafin,nidmercado);

            return Json(lista);
        }

        //Grafico Analisis Semanal de Promedios 
        public ActionResult GraficarAnalisisPromediosSemanal(string cadenaid, string nidmercado, string dfechainicio, string dfechafin)
        {
            List<GraficoAnalisisPromedios> lista = d.GraficarAnalisisPromediosSemanal_DA(cadenaid, nidmercado, dfechainicio, dfechafin);

            return Json(lista);
        }

        //Grafico Analisis Quincenal de Promedios
        public ActionResult GraficarAnalisisPromediosQuincenal(string cadenaid, string nidmercado, string dfechainicio, string dfechafin)
        {
            List<GraficoAnalisisPromedios> lista = d.GraficarAnalisisPromediosQuincenal_DA(cadenaid, nidmercado, dfechainicio, dfechafin);

            return Json(lista);
        }

        //Grafico Analisis Mensual de Promedios
        public ActionResult GraficarAnalisisPromediosMensual(string cadenaid, string nidmercado, string dfechainicio, string dfechafin)
        {
            List<GraficoAnalisisPromedios> lista = d.GraficarAnalisisPromediosMensual_DA(cadenaid, nidmercado, dfechainicio, dfechafin);

            return Json(lista);
        }
        public ActionResult ListarNoticia()
        {
            List<NoticiaEntity> lista = d.ListarNoticia_DA();
            return Json(lista);
        }
        public ActionResult SelectNoticia(string nidnoticia)
        {
            List<NoticiaEntity> lista = d.SelectNoticia_DA(nidnoticia);
            return Json(lista);
        }
        public ActionResult InsertarNoticia(string vtitulo, string vcomentario, string vlink, string vimagen, string dfecha, string iestado)
        {
            string respuesta = d.InsertarNoticia_DA(vtitulo, vcomentario, vlink, vimagen, dfecha, iestado);
            return Json(respuesta);
        }
        public ActionResult EditarNoticia(string nidnoticia, string vtitulo, string vcomentario, string vlink, string vimagen, string dfecha, string iestado, string vmodo)
        {
            string respuesta = d.EditarNoticia_DA(nidnoticia, vtitulo, vcomentario, vlink, vimagen, dfecha, iestado, vmodo);
            return Json(respuesta);
        }
        public ActionResult SubirPrioridadNoticia(string nidnoticia)
        {
            string respuesta = d.SubirPrioridadNoticia_DA(nidnoticia);
            return Json(respuesta);
        }
        public ActionResult BajarPrioridadNoticia(string nidnoticia)
        {
            string respuesta = d.BajarPrioridadNoticia_DA(nidnoticia);
            return Json(respuesta);
        }
        public ActionResult ListarEditorialMantenimiento()
        {
            List<EditorialEntity> lista = d.ListarEditorialMantenimiento_DA();
            return Json(lista);
        }
        public ActionResult SelectEditorial(string nideditorial)
        {
            List<EditorialEntity> lista = d.SelectEditorial_DA(nideditorial);
            return Json(lista);
        }

        public ActionResult InsertarEditorial(string vtitulo, string vcontenido, string vimagen, string iestado)
        {
            string respuesta = d.InsertarEditorial_DA(vtitulo, vcontenido, vimagen, iestado);
            return Json(respuesta);
        }
        public ActionResult EditarEditorial(string nideditorial, string vtitulo, string vcontenido, string vimagen, string iestado, string vmodo)
        {
            string respuesta = d.EditarEditorial_DA(nideditorial, vtitulo, vcontenido, vimagen, iestado, vmodo);
            return Json(respuesta);
        }

        public ActionResult ListarComboCategoriaMA()
        {
            List<CategoriaMesaAyudaEntity> lista = d.ListarComboCategoriaMA_DA();
            return Json(lista);
        }

        public ActionResult ListarComboEstadoMA()
        {
            List<EstadoMesaAyudaEntity> lista = d.ListarComboEstadoMA_DA();
            return Json(lista);
        }

        public ActionResult ValidarCorreoMesaAyuda(string nidusuario)
        {
            List <SolicitudMesaAyudaEntity> lista = d.ValidarCorreoMesaAyuda(nidusuario);
            return Json(lista);
        }
        public ActionResult RegistrarSolicitudMesaAyuda(string nidcategoria, string vdescripcion, string vemail,
                                                        string nidusuario, string vasunto)
        {
            List<SolicitudMesaAyudaEntity> lista= d.RegistrarSolicitudMesaAyuda_DA(nidcategoria, vdescripcion, vemail, nidusuario, vasunto);
            return Json(lista);
        }

        public ActionResult EnviarCorreo_MesaAyuda(string destino, string asunto, string allmensaje)
        {

            MailMessage mensaje = new MailMessage();
            mensaje.BodyEncoding = Encoding.UTF8;
            mensaje.SubjectEncoding = Encoding.UTF8;
            AlternateView htmlView = AlternateView.CreateAlternateViewFromString(allmensaje);
            htmlView.ContentType = new System.Net.Mime.ContentType("text/html");

            mensaje.AlternateViews.Add(htmlView);

            mensaje.From = new MailAddress("postmaster@chaskis.net");//Correo emisor
            //mensaje.To.Add(destino);
            mensaje.Subject = asunto;
            mensaje.Body = allmensaje;
            mensaje.To.Add(destino);
            //mensaje.Attachments.Add(new Attachment(pdfFile));
            mensaje.IsBodyHtml = true;

            SmtpClient smtp = new SmtpClient();

            //credenciales emisor
            smtp.Host = "mail.chaskis.net";
            smtp.Port = 25;
            smtp.Credentials = new System.Net.NetworkCredential("postmaster@chaskis.net", "#aybar123");

            smtp.Send(mensaje);

            return Json("ok");

        }
        public ActionResult ListarSolicitudMesaAyuda(string vusuario, string nidcategoria, string iestado,
                                                        string NroDePagina, string RegPorPag)
        {
            List<SolicitudMesaAyudaEntity> lista = d.ListarSolicitudMesaAyuda_DA(vusuario, nidcategoria, 
                                                    iestado, NroDePagina, RegPorPag);
            return Json(lista);
        }
        public ActionResult SelectSolicitud_MesaAyuda(string nidsolicitud)
        {
            List<SolicitudMesaAyudaEntity> listado = d.SelectSolicitud_MesaAyuda_DA(nidsolicitud);
            return Json(listado);
        }
        public ActionResult RegistrarAtencion_MesaAyuda(string vasunto, string vcontenido, string nidusuario, string nidsolicitud, string dfecha)
        {
            List <AtencionMesaAyudaEntity> listado= d.RegistrarAtencion_MesaAyuda_DA(vasunto, vcontenido, nidusuario, nidsolicitud, dfecha);
            return Json(listado);
        }
        
        public ActionResult ObtenerCategoria_MesaAyuda(string nidusuario)
        {
            string respuesta = d.ObtenerCategoria_MesaAyuda_DA(nidusuario);
            return Json(respuesta);
        }
        public ActionResult ListarCategoria_MesaAyuda(string nidusuario)
        {
            List<CategoriaMesaAyudaEntity> listado = d.ListarCategoria_MesaAyuda_DA(nidusuario);
            return Json(listado);
        }
        public ActionResult ListarUsuario_MesaAyuda()
        {
            List<UsuarioEntity> listado = d.ListarUsuario_MesaAyuda_DA();
            return Json(listado);
        }
        public ActionResult AsignarCategoria_MesaAyuda(string cadena, string nidusuario)
        {
            string respuesta = d.AsignarCategoria_MesaAyuda_DA(cadena, nidusuario);
            return Json(respuesta);
        }
        public ActionResult PermitirCategoria_MesaAyuda(string nidusuario, string nidcategoria)
        {
            string respuesta = d.PermitirCategoria_MesaAyuda_DA(nidusuario, nidcategoria);
            return Json(respuesta);
        }
        public ActionResult EnviarCorreoAuto_MesaAyuda()
        {
            List<SolicitudMesaAyudaEntity> listado = d.EnviarCorreo_MesaAyuda_DA();
            return Json(listado);
        }
        public ActionResult CalificacionServicio_MesaAyuda(string nidsolicitud, string vcodigo)
        {
            List<SolicitudMesaAyudaEntity> listado = d.CalificacionServicio_MesaAyuda_DA(nidsolicitud, vcodigo);
            return Json(listado);
        }

        public ActionResult RegistrarCalificacion_MesaAyuda(string icalificacion, string nidsolicitud, string vcomentario, string vcomentariomejora)
        {
            string respuesta = d.RegistrarCalificacion_MesaAyuda_DA(icalificacion, nidsolicitud, vcomentario, vcomentariomejora);
            return Json(respuesta);
        }
        public ActionResult ListarCalificacion_MesaAyuda(string icalificacion, string nombreadministrador, string dfechainicio,
                                                         string dfechafin, string NroDePagina, string RegPorPag)
        {
            List<CalificacionMesaAyudaEntity> listado = d.ListarCalificacion_MesaAyuda_DA(icalificacion, nombreadministrador, dfechainicio,dfechafin, NroDePagina, RegPorPag);
            return Json(listado);
        }
        public ActionResult ListarDetalleCalificacion_MesaAyuda(string icalificacion, string nombreadministrador, string dfechainicio,
                                                                                    string dfechafin, string nidcategoria, string NroDePagina, string RegPorPag)
        {
            List<CalificacionMesaAyudaEntity> listado = d.ListarDetalleCalificacion_MesaAyuda_DA(icalificacion, nombreadministrador, dfechainicio, 
                                                                                                dfechafin, nidcategoria, NroDePagina, RegPorPag);
            return Json(listado);
        }
        public ActionResult SelectDetalleCalificacion_MesaAyuda(string nidsolicitud)
        {
            List<CalificacionMesaAyudaEntity> listado = d.SelectDetalleCalificacion_MesaAyuda_DA(nidsolicitud);
            return Json(listado);
        }
        public ActionResult DetallarCalificacionPorAdm_MesaAyuda(string nidusuarioadm)
        {
            List<CalificacionMesaAyudaEntity> listado = d.DetallarCalificacionPorAdm_MesaAyuda_DA(nidusuarioadm);
            return Json(listado);
        }
        public ActionResult ListarTemperatura(string NroDePagina, string RegPorPag, string dfechainicio, string dfechafin)
        {
            List<ClimaEntity> listado = d.ListarTemperatura_DA(NroDePagina, RegPorPag, dfechainicio, dfechafin);
            return Json(listado);
        }
        public ActionResult ListarNubosidad(string NroDePagina, string RegPorPag)
        {
            List<ClimaEntity> listado = d.ListarNubosidad_DA(NroDePagina, RegPorPag);
            return Json(listado);
        }
        public ActionResult ListarPrecipitacion(string NroDePagina, string RegPorPag)
        {
            List<ClimaEntity> listado = d.ListarPrecipitacion_DA(NroDePagina, RegPorPag);
            return Json(listado);
        }

        public ActionResult RegistrarTemperatura(string ntemperaturaminima, string ntemperaturamaxima, string npromediominimo,
                                              string npromediomaximo, string dfecha, string tiporegistro, string fechacalientemin,
                                              string fechacalientemax, string fechafriomin, string fechafriomax)
        {
            string respuesta = d.RegistrarTemperatura_DA(ntemperaturaminima, ntemperaturamaxima, npromediominimo, npromediomaximo,dfecha,
                                                         tiporegistro, fechacalientemin, fechacalientemax, fechafriomin, fechafriomax);
            return Json(respuesta);
        }
        public ActionResult SelectBandasTemperatura(string year)
        {
            List<ClimaEntity> listado = d.SelectBandasTemperatura_DA();
            return Json(listado);
        }
        public ActionResult RegistrarNubosidad(string inublado, string imayormentenublado, string iparcialmentenublado, string imayormentedespejado,
                                                string idespejado, string dfecha)
        {
            string respuesta = d.RegistrarNubosidad_DA(inublado,imayormentenublado, iparcialmentenublado, imayormentedespejado,
                                                        idespejado, dfecha);
            return Json(respuesta);
        }
        public ActionResult RegistrarPrecipitacion(string iprecipitacion, string dfecha)
        {
            string respuesta = d.RegistrarPrecipitacion_DA(iprecipitacion, dfecha);
            return Json(respuesta);
        }
        public ActionResult GraficarTemperatura(string year)
        {
            List<GraficoClimaEntity> listado = d.GraficarTemperatura_DA(year);
            return Json(listado);
        }
        public ActionResult GraficarNubosidad(string year)
        {
            List<GraficoClimaEntity> listado = d.GraficarNubosidad_DA(year);
            return Json(listado);
        }
        public ActionResult GraficarPrecipitacion(string year)
        {
            List<GraficoClimaEntity> listado = d.GraficarPrecipitacion_DA(year);
            return Json(listado);
        }
        public ActionResult ValidarCaracteres(string nidusuario)
        {
            List<smsPrecioUsuario> listado = d.ValidarCaracteres_DA(nidusuario);
            return Json(listado);
        }
        public ActionResult EliminarNoticia(string nidnoticia)
        {
            string respuesta = d.EliminarNoticia_DA(nidnoticia);
            return Json(respuesta);
        }
        public ActionResult ObtenerDatosTemperatura()
        {
            List<DatosClima> listado = d.ObtenerDatosTemperatura_DA();
            return Json(listado);
        }
        public ActionResult ObtenerDatosNubosidad()
        {
            List<DatosClima> listado = d.ObtenerDatosNubosidad_DA();
            return Json(listado);
        }
        public ActionResult ObtenerDatosPrecipitacion()
        {
            List<DatosClima> listado = d.ObtenerDatosPrecipitacion_DA();
            return Json(listado);
        }
        public ActionResult ObtenerBandasTemperatura()
        {
            List<ClimaEntity> listado = d.ObtenerBandasTemperatura_DA();
            return Json(listado);
        }
        public ActionResult ListarHorasLuz(string NroDePagina, string RegPorPag)
        {
            List<ClimaEntity> listado = d.ListarHorasLuz_DA(NroDePagina, RegPorPag);
            return Json(listado);
        }
        public ActionResult RegistrarHorasLuz(string iduraciondia, string iduracionnoche, string dfecha)
        {
            string respuesta = d.RegistrarHorasLuz_DA(iduraciondia, iduracionnoche, dfecha);
            return Json(respuesta);
        }
        public ActionResult GraficarHorasLuz(string year)
        {
            List<GraficoClimaEntity> listado = d.GraficarHorasLuz_DA(year);
            return Json(listado);
        }
        public ActionResult ObtenerDatosHorasLuz()
        {
            List<DatosClima> listado = d.ObtenerDatosHorasLuz_DA();
            return Json(listado);
        }
        public ActionResult GraficarPreciosVenta(string tipoperiodo, string fechainicio, string fechafin,
                                                 string periodoatras, string cadenaidmercado, string cadenaidproducto)
        {
            List<GraficoPrecios> listado = d.GraficarPreciosVenta_DA(tipoperiodo,fechainicio,fechafin,periodoatras,
                                                                        cadenaidmercado,cadenaidproducto);
            return Json(listado);
        }
        public ActionResult IrNoticia(string nidnoticia)
        {
            List<NoticiaEntity> listado = d.IrNoticia_DA(nidnoticia);
            return Json(listado);
        }
        public ActionResult EditarTemperatura(string nidtemperatura, string ntemperaturaminima, string ntemperaturamaxima, string npromediominimo,
                                              string npromediomaximo, string dfecha)
        {
            string respuesta = d.EditarTemperatura_DA(nidtemperatura, ntemperaturaminima, ntemperaturamaxima, npromediominimo, 
                                                      npromediomaximo, dfecha);
            return Json(respuesta);
        }
        public ActionResult EnviarCorreoAuto_UsuarioNuevo()
        {
            List<UsuarioEntity> listado = d.EnviarCorreo_UsuarioNuevo_DA();
            return Json(listado);
        }
        //GESTION CONTENIDO
        public ActionResult ListarComboMenuPublicoPadreGestCont()
        {
            List<Menu> listado = d.ListarComboMenuPublicoPadreGestCont_DA();
            return Json(listado);
        }
        public ActionResult ListarComboMenuPublicoHijoGestCont(string nidmodulo)
        {
            List<Menu> listado = d.ListarComboMenuPublicoHijoGestCont_DA(nidmodulo);
            return Json(listado);
        }
        public ActionResult ListarGestionContenido(string nidmodulopadre, string nidmodulohijo)
        {
            List<GestionContenidoEntity> listado = d.ListarGestionContenido_DA(nidmodulopadre, nidmodulohijo);
            return Json(listado);
        }
        public ActionResult SelectGestionContenido(string nidgestioncontenido)
        {
            List<GestionContenidoEntity> listado = d.SelectGestionContenido_DA(nidgestioncontenido);
            return Json(listado);
        }

        public ActionResult InsertarGestionContenido(string nidModuloPadre, string nidModuloHijo, string vtitulo, string vdescripcion, string vdetalle, string vimagen)
        {
            string respuesta = d.Insertar_GestionContenido_DA(nidModuloPadre, nidModuloHijo, vtitulo, vdescripcion, vdetalle, vimagen);
            return Json(respuesta);
        }

        public ActionResult EditarGestionContenido(string nidgestioncontenido, string nidModuloPadre, string nidModuloHijo, string vtitulo, string vdescripcion, string vdetalle, string vimagen, string iestado, string vmodo)
        {
            string respuesta = d.Editar_GestionContenido_DA(nidgestioncontenido, nidModuloPadre, nidModuloHijo, vtitulo, vdescripcion, vdetalle, vimagen, iestado, vmodo);
            return Json(respuesta);
        }
        public ActionResult ListarLluvia(string NroDePagina, string RegPorPag)
        {
            List<ClimaEntity> listado = d.ListarLluvia_DA(NroDePagina, RegPorPag);
            return Json(listado);
        }
        public ActionResult RegistrarLluvia(string nlluvia, string dfecha)
        {
            string respuesta = d.RegistrarLluvia_DA(nlluvia, dfecha);
            return Json(respuesta);
        }
        public ActionResult GraficarLluvia(string year)
        {
            List<GraficoClimaEntity> listado = d.GraficarLluvia_DA(year);
            return Json(listado);
        }
        public ActionResult ObtenerDatosLluvia()
        {
            List<DatosClima> listado = d.ObtenerDatosLluvia_DA();
            return Json(listado);
        }
        public ActionResult GraficarPrecipitacion_Nuevo()
        {
            List<GraficoClimaEntity> listado = d.GraficarPrecipitacion_Nuevo_DA();
            return Json(listado);
        }
        public ActionResult RegistrarLog_DescargasApp(string vusuario)
        {
            string respuesta = d.RegistrarLog_DescargasApp_DA(vusuario);
            return Json(respuesta);
        }
    }
}