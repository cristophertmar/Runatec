using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace Runatec.Controllers
{
    public class PrecioController : Controller
    {
        // GET: Precio
        public ActionResult ProcesarPrecios()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }

        public ActionResult PlantillaCargaPrecios()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }
        [HttpPost]
        public ActionResult PlantillaCargaPrecios(HttpPostedFileBase postedFile)
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
        public ActionResult HistoricoPrecios()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }

        public ActionResult PreciosVenta()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }

        public ActionResult AnalisisPromedios()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }
        public ActionResult AnalisisPrecios()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }
        public ActionResult HistoricoPreciosPublico()
        {
            ViewData["qversion"] = System.Configuration.ConfigurationManager.AppSettings["qversion"];
            return View();
        }

    }

}
