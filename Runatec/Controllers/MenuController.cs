using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Runatec.Controllers
{
    public class MenuController : Controller
    {
        // GET: Menu
        public ActionResult Menu()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }

    }
}