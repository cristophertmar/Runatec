﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Configuration;

namespace CapaDatos
{
    public class Conexion
    {
        public static string con = ConfigurationManager.ConnectionStrings["ConCreatec"].ConnectionString;
        SqlConnection cn = new SqlConnection(con);
        public SqlConnection getcn
        {
            get { return cn; }
        }
    }
}
