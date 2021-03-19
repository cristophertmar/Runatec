using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad
{
    public class GestionContenidoEntity
    {
        public string nidgestioncontenido { get; set; }
        public string nidModuloPadre { get; set; }
        public string nidModuloHijo { get; set; }
        public string vtitulo { get; set; }
        public string vdescripcion { get; set; }
        public string vdetalle { get; set; }
        public string vimagen { get; set; }
        public string dfechacreacion { get; set; }
        public string iestado { get; set; }
        public string vestado { get; set; }

        public string vtitulosubmenu { get; set; }

    }
}
