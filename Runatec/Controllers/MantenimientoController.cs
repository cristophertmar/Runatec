using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Runatec.Controllers
{
    public class MantenimientoController : Controller
    {
            public ActionResult ListarMercado()
            {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
            }
        

            public ActionResult ListarProducto()
            {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
            }
        

        public ActionResult ListarUsuario()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }
  
        public ActionResult SMSPrecio()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }
        public ActionResult SMSConfiguracionEnvio()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }

        public ActionResult CargaUsuarios()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }
        [HttpPost]
        public ActionResult CargaUsuarios(HttpPostedFileBase postedFile)
        {
            string filePath = string.Empty;

            if (postedFile != null)
            {
                string path = Server.MapPath("~/Uploads/");
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                filePath = path + Path.GetFileName(postedFile.FileName);
                string extension = Path.GetExtension(postedFile.FileName);
                postedFile.SaveAs(filePath);
            }

            //Envia la version registrada en el webconfig a la esquina del lado derecho en el layout.
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }

        public ActionResult Noticia()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }
        public ActionResult Editorial()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }

        public ActionResult Temperatura()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }

        public ActionResult Nubosidad()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }

        public ActionResult Precipitacion()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }

        public ActionResult HorasLuz()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }
        public ActionResult Lluvia()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }
        //GESTION DE CONTENIDOS
        public ActionResult GestionContenidos()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }

        public ActionResult GestionContenidos_Registro()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }
    }
}