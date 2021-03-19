using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Runatec
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            //Mesa de Ayuda
            routes.MapRoute("MesaAyuda", "MesaAyuda/AtenderSolicitud/{nidsolicitud}",
                new { controller = "MesaAyuda", action = "AtenderSolicitud", id = UrlParameter.Optional }
            );
            //Inicio
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Inicio", action = "Noticia", id = UrlParameter.Optional }
            );
        }
    }
}
