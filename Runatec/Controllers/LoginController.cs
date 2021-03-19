using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Runatec.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Login()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }
    }
}