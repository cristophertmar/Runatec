using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Runatec.Controllers
{
    public class GestionContenidosController : Controller
    {
        // GET: GestionContenidos
        public ActionResult GestionContenidosListar()
        {
            return View();
        }

        public ActionResult GestionContenidosDetalles()
        {
            return View();
        }
    }
}