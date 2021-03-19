using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad
{
    public class CalificacionMesaAyudaEntity
    {
        public string nidcalificacion { set; get; }
        public string icalificacion { set; get; }
        public string nidsolicitud { set; get; }
        public string nidusuarioproductor { set; get; }
        public string nidusuarioadm { set; get; }
        public string dfecha { set; get; }
        public string dfechaCalificacion { set; get; }

        public string dfechaSolicitud { set; get; }
        public string dfechaAtencion { set; get; }

        public string vcomentario { set; get; }
        public string vcomentariomejora { set; get; }
        public string respuesta { set; get; }
        public string cantidad { set; get; }
        public string nombreadministrador { set; get; }
        public string nombreproductor { set; get; }
        public string nombreoperador { set; get; }

        public string promcalificacion { set; get; }
        public string TotalRegistros { set; get; }
        public string num { set; get; }
        public string categoria { set; get; }
        public string comentariosolicitud { set; get; }
        public string comentarioatencion { set; get; }
    }
}
