using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Runatec.Controllers
{
    public class CalificacionController : Controller
    {
        // GET: Calificacion
        public ActionResult Servicio(string nidsol, string ticket)//nidsolicitud + vcodigo de la solicitud en el enlace
        {
            ViewBag.nidsol = nidsol;
            ViewBag.ticket = ticket;
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }
    }
}