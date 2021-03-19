using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Runatec.Controllers
{
    public class InicioController : Controller
    {
        // GET: Inicio
        public ActionResult Inicio()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }

        public ActionResult Noticia()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }

        public ActionResult IrNoticia()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }

    }
}