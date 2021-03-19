using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Runatec.Controllers
{
    public class ConsultaController : Controller
    {
        public ActionResult ListarSMSEnviados()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }
        public ActionResult Clima()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }
    }
}