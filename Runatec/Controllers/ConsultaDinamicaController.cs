using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Runatec.Controllers
{
    public class ConsultaDinamicaController : Controller
    {
        // GET: ConsultaDinamica
        public ActionResult ConsultaDinamica()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }
    }
}