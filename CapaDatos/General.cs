using Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;

namespace CapaDatos
{
    public class General
    {
        Conexion cn = new Conexion();

        //Registrarse en el login
        public List<LoginEntity> ValidarLogin_DA(string vusuario, string vpassword)
        {
            List<LoginEntity> lista = new List<LoginEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Login_Validar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@vusuario", vusuario);
            cmd.Parameters.AddWithValue("@vpassword", vpassword);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                LoginEntity clase = new LoginEntity();

                clase.respuesta = dr["respuesta"].ToString();
                clase.vusuario = dr["vusuario"].ToString();
                clase.vpassword = dr["vpassword"].ToString();
                clase.nomusuario = dr["nomusuario"].ToString();
                clase.nidUsuario = dr["nidUsuario"].ToString();
                clase.nidPerfil = dr["nidPerfil"].ToString();

                lista.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return lista;
        }

        //Llenar el select Perfil del Login
        //public List<PerfilEntity> ComboPerfilUsuario_DA(int nidUsuario)
        //{
        //    List<PerfilEntity> lista = new List<PerfilEntity>();

        //    SqlCommand cmd = new SqlCommand("SP_RUNATEC_Perfil_Listar_Combo", cn.getcn);
        //    cmd.CommandType = CommandType.StoredProcedure;

        //    cmd.Parameters.AddWithValue("@nidUsuario", nidUsuario);

        //    cn.getcn.Open();

        //    SqlDataReader dr = cmd.ExecuteReader();

        //    while (dr.Read())
        //    {
        //        PerfilEntity clase = new PerfilEntity();
        //        clase.nidPerfil = dr["nidPerfil"].ToString();
        //        clase.vnombrePerfil = dr["vnombrePerfil"].ToString();
        //        lista.Add(clase);
        //    }
        //    dr.Close();
        //    cmd.Dispose();
        //    cn.getcn.Close();

        //    return lista;
        //}

      
        //Mostrar los módulos en el menú
        public List<Menu> ListarMenuPrincipal_DA(int nidPerfil)
        {
            List<Menu> lista = new List<Menu>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_MenuPrincipal_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidPerfil", nidPerfil);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                Menu clase = new Menu();

                clase.nidModulo = dr["nidModulo"].ToString();
                clase.id = dr["id"].ToString();
                clase.vnombre = dr["vnombre"].ToString();
                clase.vurl = dr["vurl"].ToString();
                clase.vicono = dr["vicono"].ToString();
                clase.nidModulopadre = dr["nidModulopadre"].ToString();
                clase.iorden = dr["iorden"].ToString();
                clase.nidPerfil = dr["nidPerfil"].ToString();
                clase.ipadre = dr["ipadre"].ToString();
                clase.hijos = dr["hijos"].ToString();
                lista.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return lista;
        }


        public List<Menu> ListarSubMenuNivelUno_DA(int nidPerfil, int ModuloPadre)
        {
            List<Menu> lista = new List<Menu>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_SubMenuNivelUno_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidPerfil", nidPerfil);
            cmd.Parameters.AddWithValue("@ModuloPadre", ModuloPadre);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                Menu clase = new Menu();

                clase.nidModulo = dr["nidModulo"].ToString();
                clase.id = dr["id"].ToString();
                clase.vnombre = dr["vnombre"].ToString();
                clase.vurl = dr["vurl"].ToString();
                clase.vicono = dr["vicono"].ToString();
                clase.nidModulopadre = dr["nidModulopadre"].ToString();
                clase.iorden = dr["iorden"].ToString();
                clase.nidPerfil = dr["nidPerfil"].ToString();
                clase.ipadre = dr["ipadre"].ToString();
                clase.hijos = dr["hijos"].ToString();
                lista.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return lista;
        }

        public List<Menu> ListarSubMenuNivelDos_DA(int nidPerfil, int ModuloPadre)
        {
            List<Menu> lista = new List<Menu>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_SubMenuNivelDos_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidPerfil", nidPerfil);
            cmd.Parameters.AddWithValue("@ModuloPadre", ModuloPadre);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                Menu clase = new Menu();

                clase.nidModulo = dr["nidModulo"].ToString();
                clase.id = dr["id"].ToString();
                clase.vnombre = dr["vnombre"].ToString();
                clase.vurl = dr["vurl"].ToString();
                clase.vicono = dr["vicono"].ToString();
                clase.nidModulopadre = dr["nidModulopadre"].ToString();
                clase.iorden = dr["iorden"].ToString();
                clase.nidPerfil = dr["nidPerfil"].ToString();
                clase.ipadre = dr["ipadre"].ToString();
                clase.hijos = dr["hijos"].ToString();
                lista.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return lista;
        }

        //Menú Público

        public List<Menu> ListarMenuPublico_DA()
        {
            List<Menu> lista = new List<Menu>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_MenuPublico_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                Menu clase = new Menu();

                clase.nidModulo = dr["nidModulo"].ToString();
                clase.id = dr["id"].ToString();
                clase.vnombre = dr["vnombre"].ToString();
                clase.vurl = dr["vurl"].ToString();
                clase.vicono = dr["vicono"].ToString();
                clase.nidModulopadre = dr["nidModulopadre"].ToString();
                clase.iorden = dr["iorden"].ToString();
                clase.ipadre = dr["ipadre"].ToString();
                clase.hijos = dr["hijos"].ToString();
                lista.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return lista;
        }
        public List<Menu> ListarSubMenuNivelUno_Publico_DA(int ModuloPadre)
        {
            List<Menu> lista = new List<Menu>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_SubMenuNivelUno_Publico_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@ModuloPadre", ModuloPadre);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                Menu clase = new Menu();

                clase.nidModulo = dr["nidModulo"].ToString();
                clase.id = dr["id"].ToString();
                clase.vnombre = dr["vnombre"].ToString();
                clase.vurl = dr["vurl"].ToString();
                clase.vicono = dr["vicono"].ToString();
                clase.nidModulopadre = dr["nidModulopadre"].ToString();
                clase.iorden = dr["iorden"].ToString();
                clase.ipadre = dr["ipadre"].ToString();
                clase.hijos = dr["hijos"].ToString();
                lista.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return lista;
        }

        public List<Menu> ListarSubMenuNivelDos_Publico_DA(int ModuloPadre)
        {
            List<Menu> lista = new List<Menu>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_SubMenuNivelDos_Publico_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@ModuloPadre", ModuloPadre);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                Menu clase = new Menu();

                clase.nidModulo = dr["nidModulo"].ToString();
                clase.id = dr["id"].ToString();
                clase.vnombre = dr["vnombre"].ToString();
                clase.vurl = dr["vurl"].ToString();
                clase.vicono = dr["vicono"].ToString();
                clase.nidModulopadre = dr["nidModulopadre"].ToString();
                clase.iorden = dr["iorden"].ToString();
                clase.ipadre = dr["ipadre"].ToString();
                clase.hijos = dr["hijos"].ToString();
                lista.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return lista;
        }
        
        //Listar precios importados (Supervisor)

        public string CargarPrecios2_DA(string nidmercado, string dfechaproceso, string idproducto, string vnombreproducto, string dprecio1, string dprecio2, string dprecio3, string dprecio4, string dprecio5
            , string dprecio6, string dprecio7, string dprecio8, string dprecio9, string dprecio10)
        {
            string resultado = "";
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_DetalleHistorial_Temp_Insertar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidmercado", nidmercado);
            cmd.Parameters.AddWithValue("@dfechaproceso", dfechaproceso);
            cmd.Parameters.AddWithValue("@idproducto", idproducto);
            cmd.Parameters.AddWithValue("@vnombreproducto", vnombreproducto);
            cmd.Parameters.AddWithValue("@dprecio1", dprecio1);
            cmd.Parameters.AddWithValue("@dprecio2", dprecio2);
            cmd.Parameters.AddWithValue("@dprecio3", dprecio3);
            cmd.Parameters.AddWithValue("@dprecio4", dprecio4);
            cmd.Parameters.AddWithValue("@dprecio5", dprecio5);
            cmd.Parameters.AddWithValue("@dprecio6", dprecio6);
            cmd.Parameters.AddWithValue("@dprecio7", dprecio7);
            cmd.Parameters.AddWithValue("@dprecio8", dprecio8);
            cmd.Parameters.AddWithValue("@dprecio9", dprecio9);
            cmd.Parameters.AddWithValue("@dprecio10", dprecio10);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                resultado = dr["resultado"].ToString();
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return resultado;
        }
        //Listar DetalleHistorial para ver los productos por procesar
        public List<tempDetalleHistorial> ListartempDetalleHistorial_DA(string nidmercado, string dfechainicio, string dfechafin)
        {
            List<tempDetalleHistorial> listado = new List<tempDetalleHistorial>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_DetalleHistorial_Temp_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@nidmercado", nidmercado);
            cmd.Parameters.AddWithValue("@dfechainicio", dfechainicio);
            cmd.Parameters.AddWithValue("@dfechafin", dfechafin);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                tempDetalleHistorial clase = new tempDetalleHistorial();
                clase.nidtempdetallehistorial = dr["nidtempdetallehistorial"].ToString();
                clase.fila = dr["fila"].ToString();
                clase.dfecha = dr["dfecha"].ToString();
                clase.vnombremercado = dr["vnombremercado"].ToString();
                clase.idproducto = dr["idproducto"].ToString();
                clase.vnombreproducto = dr["vnombreproducto"].ToString();
                clase.dprecio1 = dr["dprecio1"].ToString();
                clase.dprecio2 = dr["dprecio2"].ToString();
                clase.dprecio3 = dr["dprecio3"].ToString();
                clase.dprecio4 = dr["dprecio4"].ToString();
                clase.dprecio5 = dr["dprecio5"].ToString();
                clase.dprecio6 = dr["dprecio6"].ToString();
                clase.dprecio7 = dr["dprecio7"].ToString();
                clase.dprecio8 = dr["dprecio8"].ToString();
                clase.dprecio9 = dr["dprecio9"].ToString();
                clase.dprecio10 = dr["dprecio10"].ToString();
                clase.promedio_anterior = dr["promedio_anterior"].ToString();
                clase.promedio = dr["promedio"].ToString();
                clase.variacion= dr["variacion"].ToString();
                clase.estado = dr["estado"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return listado;
        }

        //Procesar los registros (Supervisor)

        public string ProcesarDetalleHistorial_DA(string cadena)
        {
            var respuesta = "";

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Precios_Procesar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@cadena", cadena);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return respuesta;
        }

        //Listar los mercados en un select
        public List<MercadoEntity> ListarComboMercado_DA()
        {
            List<MercadoEntity> listado = new List<MercadoEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Mercado_Listar_Combo", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                MercadoEntity clase = new MercadoEntity();
                clase.nidmercado = dr["nidmercado"].ToString();
                clase.vdescripcion = dr["vdescripcion"].ToString();
                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        //Listar los mercados registrados
        public List<MercadoEntity> ListarMercado_DA()
        {
            List<MercadoEntity> listado = new List<MercadoEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Mercado_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                MercadoEntity clase = new MercadoEntity();
                clase.nidmercado = dr["nidmercado"].ToString();
                clase.fila = dr["fila"].ToString();
                clase.vdescripcion = dr["vdescripcion"].ToString();
                clase.vubigeo = dr["vubigeo"].ToString();
                clase.vdescripcion_corta = dr["vdescripcion_corta"].ToString();

                listado.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        //Editar Mercado

        public List<MercadoEntity> EditarMercado_DA(string nidmercado, string vdescripcion, string vubigeo, string vdescripcion_corta)
        {
            List<MercadoEntity> listado = new List<MercadoEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Mercado_Editar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidmercado", nidmercado);
            cmd.Parameters.AddWithValue("@vdescripcion", vdescripcion);
            cmd.Parameters.AddWithValue("@vubigeo", vubigeo);
            cmd.Parameters.AddWithValue("@vdescripcion_corta", vdescripcion_corta);


            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                MercadoEntity clase = new MercadoEntity();
                clase.respuesta = dr["respuesta"].ToString();
                listado.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return listado;
        }

        //Listar los Productos registrados
        public List<ProductoEntity> ListarProducto_DA(string vdescripcion, string NroDePagina, string RegPorPag)
        {
            List<ProductoEntity> listado = new List<ProductoEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Producto_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@vdescripcion", vdescripcion);
            cmd.Parameters.AddWithValue("@NroDePagina",NroDePagina);
            cmd.Parameters.AddWithValue("@RegPorPag",RegPorPag);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                ProductoEntity clase = new ProductoEntity();                
                clase.nidproducto = dr["nidproducto"].ToString();
                clase.vdescripcion = dr["vdescripcion"].ToString();
                clase.nidcalidad = dr["Calidad"].ToString();
                clase.vmedida = dr["vmedida"].ToString();
                clase.TotalRegistros= dr["TotalRegistros"].ToString();
                clase.num = dr["num"].ToString();

                listado.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        //Insertar Mercados
        public List<MercadoEntity> InsertarMercado_DA(string vdescripcion,string vubigeo, string vdescripcion_corta)
        {
            List<MercadoEntity> listado = new List<MercadoEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Mercado_Insertar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@vdescripcion",vdescripcion);
            cmd.Parameters.AddWithValue("@vubigeo", vubigeo);
            cmd.Parameters.AddWithValue("@vdescripcion_corta", vdescripcion_corta);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                MercadoEntity clase = new MercadoEntity();
                clase.respuesta = dr["respuesta"].ToString();
                listado.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            
            return listado;
        }
        
        public string SMSLogEnvios_Insertar_DA(string vcelular, string vtipo, string bestado, string vlogdescripcion)
        {
            string respuesta = "";

            using (SqlConnection cn = new SqlConnection(Conexion.con))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_RUNATEC_SMS_Logenvios_Insertar", cn);
                    cmd.CommandType = CommandType.StoredProcedure;
            
                    cmd.Parameters.AddWithValue("@vcelular", vcelular);
                    cmd.Parameters.AddWithValue("@vtipo", vtipo);
                    cmd.Parameters.AddWithValue("@bestado", bestado);
                    cmd.Parameters.AddWithValue("@vlogdescripcion", vlogdescripcion);

                    cn.Open();
                    SqlDataReader dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        ProductoEntity clase = new ProductoEntity();
                        respuesta = dr["respuesta"].ToString();
                
                    }
                    dr.Close();
                    cmd.Dispose();
                    cn.Close();

                }
                catch(Exception ex)
                {
                    respuesta="Error: "+ex.InnerException;
                }
                return respuesta;
            }


            
        }

        public List<SMSConfiguracionGeneralEntity> SMS_ConfiguracionGeneral_DA()
        {

            List<SMSConfiguracionGeneralEntity> listado = new List<SMSConfiguracionGeneralEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_SMS_ConfiguracionGeneral", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                SMSConfiguracionGeneralEntity clase = new SMSConfiguracionGeneralEntity();
                clase.vurl = dr["vurl"].ToString();
                clase.vusuario = dr["vusuario"].ToString();
                clase.vpassword = dr["vpassword"].ToString();                

                listado.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return listado;

        }

        public List<FamiliaEntity> ListarComboFamilia_DA()
        {
            List<FamiliaEntity> listado = new List<FamiliaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Familia_Listar_Combo", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                FamiliaEntity clase = new FamiliaEntity();
                clase.nidfamilia = dr["nidfamilia"].ToString();
                clase.vdescripcion = dr["vdescripcion"].ToString();

                listado.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        public List<SubFamiliaEntity> ListarComboSubFamilia_DA(string nidfamilia)
        {
            List<SubFamiliaEntity> listado = new List<SubFamiliaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_SubFamilia_Listar_Combo", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidfamilia",nidfamilia);
            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                SubFamiliaEntity clase = new SubFamiliaEntity();
                clase.nidsubfamilia = dr["nidsubfamilia"].ToString();
                clase.vdescripcion = dr["vdescripcion"].ToString();

                listado.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        public List<VariedadEntity> ListarComboVariedad_DA(string nidsubfamilia)
        {
            List<VariedadEntity> listado = new List<VariedadEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Variedad_Listar_Combo", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidSubfamilia", nidsubfamilia);
            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                VariedadEntity clase = new VariedadEntity();
                clase.nidvariedad = dr["nidvariedad"].ToString();
                clase.vdescripcion = dr["vdescripcion"].ToString();

                listado.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public List<OrigenEntity> ListarComboOrigen_DA()
        {
            List<OrigenEntity> listado = new List<OrigenEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Origen_Listar_Combo", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                OrigenEntity clase = new OrigenEntity();
                clase.nidorigen = dr["nidorigen"].ToString();
                clase.vdescripcion = dr["vdescripcion"].ToString();

                listado.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public List<CalidadEntity> ListarComboCalidad_DA()
        {
            List<CalidadEntity> listado = new List<CalidadEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Calidad_Listar_Combo", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                CalidadEntity clase = new CalidadEntity();
                clase.nidcalidad = dr["nidcalidad"].ToString();
                clase.vdescripcion = dr["vdescripcion"].ToString();

                listado.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        public List<MedidaEntity> ListarComboMedida_DA()
        {
            List<MedidaEntity> listado = new List<MedidaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Medida_Listar_Combo", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                MedidaEntity clase = new MedidaEntity();
                clase.nidmedida = dr["nidmedida"].ToString();
                clase.vdescripcion = dr["vdescripcion"].ToString();

                listado.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        public string InsertarProducto_DA(string vdescripcion_corta, string nidcalidad, string nidmedida, string nidfamilia, string nidsubfamilia, string nidvariedad, string nidorigen)
        {
            string respuesta = "";
            List<ProductoEntity> listado = new List<ProductoEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Producto_Insertar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@vdescripcion_corta", vdescripcion_corta);
            cmd.Parameters.AddWithValue("@nidcalidad", nidcalidad);
            cmd.Parameters.AddWithValue("@nidmedida", nidmedida);
            cmd.Parameters.AddWithValue("@nidfamilia", nidfamilia);
            cmd.Parameters.AddWithValue("@nidsubfamilia", nidsubfamilia);
            cmd.Parameters.AddWithValue("@nidvariedad", nidvariedad);
            cmd.Parameters.AddWithValue("@nidorigen", nidorigen);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return respuesta;
        }

        public List<ProductoEntity> SelectProducto_DA(string nidproducto)
        {
            List<ProductoEntity> listado = new List<ProductoEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Producto_Select", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidproducto", nidproducto);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                ProductoEntity clase = new ProductoEntity();

                clase.nidproducto = dr["nidproducto"].ToString();
                clase.nidcalidad = dr["nidcalidad"].ToString();
                clase.nidorigen = dr["nidorigen"].ToString();
                clase.nidfamilia = dr["nidfamilia"].ToString();
                clase.nidsubfamilia = dr["nidsubfamilia"].ToString();
                clase.vdescripcion_corta = dr["vdescripcion_corta"].ToString();
                clase.iestado = dr["iestado"].ToString();
                clase.nidvariedad = dr["nidvariedad"].ToString();
                clase.nidmedida = dr["nidmedida"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        public string EditarProducto_DA(string nidproducto, string vdescripcion_corta, string nidcalidad, string nidfamilia, string nidsubfamilia, string nidvariedad, string nidorigen, string iestado, string nidmedida)
        {
            string respuesta = "";
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Producto_Editar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidproducto", nidproducto);
            cmd.Parameters.AddWithValue("@vdescripcion_corta", vdescripcion_corta);
            cmd.Parameters.AddWithValue("@nidcalidad", nidcalidad);
            cmd.Parameters.AddWithValue("@nidfamilia", nidfamilia);
            cmd.Parameters.AddWithValue("@nidsubfamilia", nidsubfamilia);
            cmd.Parameters.AddWithValue("@nidvariedad", nidvariedad);
            cmd.Parameters.AddWithValue("@nidorigen", nidorigen);
            cmd.Parameters.AddWithValue("@iestado", iestado);
            cmd.Parameters.AddWithValue("@nidmedida", nidmedida);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return respuesta;
        }

        //Gráfico estadístico de Precios de Productos
        public List<GraficoPrecios> GraficarPrecios_DA(string cadenaid, string fecha)
        {
            List<GraficoPrecios> lista = new List<GraficoPrecios>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Grafico_Precios", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@cadenaid", cadenaid);
            cmd.Parameters.AddWithValue("@fecha", fecha);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                GraficoPrecios clase = new GraficoPrecios();
                clase.cadena = dr["cadena"].ToString();
                clase.cadena2 = dr["cadena2"].ToString();
                clase.cadena3 = dr["cadena3"].ToString();
                clase.cadena4 = dr["cadena4"].ToString();
                clase.nombre = dr["nombre"].ToString();
                clase.nombre2 = dr["nombre2"].ToString();
                clase.nombre3 = dr["nombre3"].ToString();
                clase.nombre4 = dr["nombre4"].ToString();
                clase.mes = dr["mes"].ToString();
                clase.diainicio = dr["diainicio"].ToString();
                clase.diainicio2 = dr["diainicio2"].ToString();
                clase.diainicio3 = dr["diainicio3"].ToString();
                clase.diainicio4 = dr["diainicio4"].ToString();


                lista.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return lista;
        }
        //Listar el combo de productos para los gráficos
        public List<ComboProducto> ListarComboProducto_DA()
        {
            List<ComboProducto> lista = new List<ComboProducto>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Producto_Listar_Combo", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cn.getcn.Open();



            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                ComboProducto clase = new ComboProducto();
                clase.nidproducto = dr["nidproducto"].ToString();
                clase.vdescripcion = dr["vdescripcion"].ToString();
                lista.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return lista;
        }

        public List<LogEnviosEntity> ListarLogEnvios_DA(string NroDePagina, string RegPorPag, string vcelular, string vtipo, string dfecha)
        {
            List<LogEnviosEntity> lista = new List<LogEnviosEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_SMS_LogEnvios_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@NroDePagina", NroDePagina);
            cmd.Parameters.AddWithValue("@RegPorPag", RegPorPag);
            cmd.Parameters.AddWithValue("@vcelular", vcelular);
            cmd.Parameters.AddWithValue("@vtipo", vtipo);
            cmd.Parameters.AddWithValue("@dfecha", dfecha);

            cn.getcn.Open();

            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                LogEnviosEntity clase = new LogEnviosEntity();
                clase.vusuario = dr["vusuario"].ToString();
                clase.vcelular = dr["vcelular"].ToString();
                clase.dfecha = dr["dfecha"].ToString();
                clase.vtipo = dr["vtipo"].ToString();
                clase.vEstado = dr["vEstado"].ToString();
                clase.vlogdescripcion = dr["vlogdescripcion"].ToString();
                clase.TotalRegistros = dr["TotalRegistros"].ToString();

                lista.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return lista;
        }

        public List<TipoDocumentoEntity> ListarTipoDocumento_DA()
        {
            List<TipoDocumentoEntity> lista = new List<TipoDocumentoEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_TipoDocumento_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cn.getcn.Open();

            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                TipoDocumentoEntity clase = new TipoDocumentoEntity();
                clase.nidtipodocumento = dr["nidtipodocumento"].ToString();
                clase.vdescripcion = dr["vdescripcion"].ToString();
                clase.nidestado = dr["nidestado"].ToString();

                lista.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return lista;
        }

        public List<UsuarioEntity> InsertarUsuario_CrearCuenta_DA(string nidtipodocumento,string vnumdocumento,string vnombres,
            string vpaterno, string vmaterno, string vsexo, string vrazonsocial, string vusuario,string vpassword,
            string vemail, string vtelefono, string vcelular, string vdireccion, string vubigeo)
        {
            List<UsuarioEntity> listado = new List<UsuarioEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Usuario_CrearCuenta", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidtipodocumento", nidtipodocumento);
            cmd.Parameters.AddWithValue("@vnumdocumento", vnumdocumento);
            cmd.Parameters.AddWithValue("@vnombres", vnombres);
            cmd.Parameters.AddWithValue("@vpaterno", vpaterno);
            cmd.Parameters.AddWithValue("@vmaterno", vmaterno);
            cmd.Parameters.AddWithValue("@vsexo", vsexo);
            cmd.Parameters.AddWithValue("@vrazonsocial", vrazonsocial);
            cmd.Parameters.AddWithValue("@vusuario", vusuario);
            cmd.Parameters.AddWithValue("@vpassword", vpassword);
            cmd.Parameters.AddWithValue("@vemail", vemail);
            cmd.Parameters.AddWithValue("@vtelefono", vtelefono);
            cmd.Parameters.AddWithValue("@vcelular", vcelular);
            cmd.Parameters.AddWithValue("@vdireccion", vdireccion);
            cmd.Parameters.AddWithValue("@vubigeo", vubigeo);

            cn.getcn.Open();

            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                UsuarioEntity clase = new UsuarioEntity();

                clase.respuesta = dr["respuesta"].ToString();

                listado.Add(clase);
            }
            return listado;
        }

        public List<UsuarioEntity> ListarCuentasUsuario_DA(string iestado, string nombres, string NroDePagina, string RegPorPag)
        {
            List<UsuarioEntity> listado = new List<UsuarioEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Usuario_Calificacion_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@iestado",iestado);
            cmd.Parameters.AddWithValue("@nombres", nombres);
            cmd.Parameters.AddWithValue("@NroDePagina", NroDePagina);
            cmd.Parameters.AddWithValue("@RegPorPag", RegPorPag);
            cn.getcn.Open();

            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                UsuarioEntity clase = new UsuarioEntity();

                clase.nidusuario = dr["nidUsuario"].ToString();
                clase.vperfil = dr["vperfil"].ToString();
                clase.vusuario = dr["vusuario"].ToString();
                clase.nombre = dr["nombre"].ToString();
                clase.vsexo = dr["vsexo"].ToString();
                clase.dfechaCreacion = dr["dfechaCreacion"].ToString();
                clase.vemail = dr["vemail"].ToString();
                clase.iestado = dr["iestado"].ToString();
                clase.num = dr["num"].ToString();
                clase.TotalRegistros = dr["TotalRegistros"].ToString();
                listado.Add(clase);
            }
            return listado;
        }

        public List<UsuarioEntity> AprobarCuentasUsuario_DA(string nidusuario, string iestado)
        {
            List<UsuarioEntity> listado = new List<UsuarioEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Usuario_Calificar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@nidusuario", nidusuario);
            cmd.Parameters.AddWithValue("@iestado", iestado);
            cn.getcn.Open();

            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                UsuarioEntity clase = new UsuarioEntity();

                clase.respuesta = dr["respuesta"].ToString();
                clase.vemail = dr["vemail"].ToString();
                clase.vdescripcion = dr["vdescripcion"].ToString();
                clase.vusuario = dr["vusuario"].ToString();
                clase.iestado = dr["iestado"].ToString();

                listado.Add(clase);
            }
            return listado;
        }

        public List<NoticiaEntity> ListarCarruselNoticia_DA()
        {
            using (SqlConnection getcn = new SqlConnection(Conexion.con))

            {
                List<NoticiaEntity> lista = new List<NoticiaEntity>();
                SqlCommand cmd = new SqlCommand("SP_RUNATEC_Noticia_Listar_Carrusel", cn.getcn);
                cmd.CommandType = CommandType.StoredProcedure;

                //cmd.Parameters.AddWithValue("@vcelular", vcelular);            

                cn.getcn.Open();

                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    NoticiaEntity clase = new NoticiaEntity();
                    clase.nidnoticia = dr["nidnoticia"].ToString();
                    clase.vtitulo = dr["vtitulo"].ToString();
                    clase.vcomentario = dr["vcomentario"].ToString();
                    clase.vlink = dr["vlink"].ToString();
                    clase.bnegrita = dr["bnegrita"].ToString();
                    clase.vimagen = dr["vimagen"].ToString();
                    clase.dfecha = dr["dfecha"].ToString();
                    clase.iprioridad = dr["iprioridad"].ToString();
                    clase.iestado = dr["iestado"].ToString();

                    lista.Add(clase);
                }
                dr.Close();
                cmd.Dispose();
                cn.getcn.Close();
                return lista;
            }
        }

        public List<EditorialEntity> ListarEditorial_DA()
        {
            List<EditorialEntity> lista = new List<EditorialEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Editorial_Listar_Publico", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cn.getcn.Open();

            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                EditorialEntity clase = new EditorialEntity();
                clase.nideditorial = dr["nideditorial"].ToString();
                clase.vtitulo = dr["vtitulo"].ToString();
                clase.vcontenido = dr["vcontenido"].ToString();
                clase.vimagen = dr["vimagen"].ToString();
                lista.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return lista;
        }

        public List<UbigeoEntity> AutocompletarUbigeo_DA(string vdescripcion)
        {
            List<UbigeoEntity> listado = new List<UbigeoEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Ubigeo_Autocompletar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@vdescripcion", vdescripcion);
            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                UbigeoEntity clase = new UbigeoEntity();
                clase.nidubigeo = dr["nidubigeo"].ToString();
                clase.vdescripcion = dr["vdescripcion"].ToString();
                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return listado;
        }

        public List<UsuarioEntity> ListarUsuario_DA(string vcelular, string razon_social, string nidperfil, string NroDePagina, string RegPorPag)
        {
            List<UsuarioEntity> listado = new List<UsuarioEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Usuario_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@vcelular", vcelular);
            cmd.Parameters.AddWithValue("@razon_social", razon_social);
            cmd.Parameters.AddWithValue("@nidperfil", nidperfil);
            cmd.Parameters.AddWithValue("@NroDePagina", NroDePagina);
            cmd.Parameters.AddWithValue("@RegPorPag", RegPorPag);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                UsuarioEntity clase = new UsuarioEntity();
                clase.nidusuario = dr["nidUsuario"].ToString();
                clase.vperfil = dr["vperfil"].ToString();
                clase.nidperfil = dr["nidperfil"].ToString();
                clase.tipodocumento = dr["tipodocumento"].ToString();
                clase.vnumdocumento = dr["vnumdocumento"].ToString();
                clase.vnombres = dr["vnombres"].ToString();
                clase.vcelular = dr["vcelular"].ToString();
                clase.iestado = dr["iestado"].ToString();
                clase.num = dr["num"].ToString();
                clase.TotalRegistros = dr["TotalRegistros"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return listado;
        }

        public List<PerfilEntity> ListarComboPerfil_DA()
        {
            List<PerfilEntity> listado = new List<PerfilEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Perfil_Listar_Combo", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                PerfilEntity clase = new PerfilEntity();
                clase.nidPerfil = dr["nidPerfil"].ToString();
                clase.vnombrePerfil = dr["vnombrePerfil"].ToString();

                listado.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        public List<EstadoEntity> ListarComboEstado_DA()
        {
            List<EstadoEntity> listado = new List<EstadoEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Usuario_Estado_Listar_Combo", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                EstadoEntity clase = new EstadoEntity();
                clase.nidestado = dr["nidestado"].ToString();
                clase.vdescripcion = dr["vdescripcion"].ToString();

                listado.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        public List<UsuarioEntity> SelectUsuario_DA(string nidusuario)
        {
            List<UsuarioEntity> listado = new List<UsuarioEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Usuario_Select", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidusuario", nidusuario);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                UsuarioEntity clase = new UsuarioEntity();

                clase.nidusuario = dr["nidusuario"].ToString();
                clase.vusuario = dr["vusuario"].ToString();
                clase.vnombres = dr["vnombres"].ToString();
                clase.vpaterno = dr["vpaterno"].ToString();
                clase.vmaterno = dr["vmaterno"].ToString();
                clase.vsexo = dr["vsexo"].ToString();
                clase.vemail = dr["vemail"].ToString();
                clase.vtelefono = dr["vtelefono"].ToString();
                clase.vdireccion = dr["vdireccion"].ToString();
                clase.iestado = dr["iestado"].ToString();
                clase.vrazonsocial = dr["vrazonsocial"].ToString();
                clase.nidtipodocumento = dr["nidtipodocumento"].ToString();
                clase.vnumdocumento = dr["vnumdocumento"].ToString();
                clase.vubigeo = dr["vubigeo"].ToString();
                clase.nidperfil = dr["nidperfil"].ToString();
                clase.vcelular = dr["vcelular"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        public string EditarUsuario_DA(string nidusuario, string nidtipodocumento, string vnumdocumento,
                                        string vnombres, string vpaterno, string vmaterno, string vsexo, 
                                        string vrazonsocial, string vusuario, string vemail,
                                        string vtelefono, string vcelular, string vdireccion, string vubigeo,
                                        string iestado, string nidperfil)
        {
            string respuesta = "";

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Usuario_Editar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidusuario", nidusuario);
            cmd.Parameters.AddWithValue("@nidtipodocumento", nidtipodocumento);
            cmd.Parameters.AddWithValue("@vnumdocumento", vnumdocumento);
            cmd.Parameters.AddWithValue("@vnombres", vnombres);
            cmd.Parameters.AddWithValue("@vpaterno", vpaterno);
            cmd.Parameters.AddWithValue("@vmaterno", vmaterno);
            cmd.Parameters.AddWithValue("@vsexo", vsexo);
            cmd.Parameters.AddWithValue("@vrazonsocial", vrazonsocial);
            cmd.Parameters.AddWithValue("@vemail", vemail);
            cmd.Parameters.AddWithValue("@vtelefono", vtelefono);
            cmd.Parameters.AddWithValue("@vcelular", vcelular);
            cmd.Parameters.AddWithValue("@vdireccion", vdireccion);
            cmd.Parameters.AddWithValue("@vubigeo", vubigeo);
            cmd.Parameters.AddWithValue("@iestado", iestado);
            cmd.Parameters.AddWithValue("@nidperfil", nidperfil);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return respuesta;
        }

        public string InsertarUsuario_DA(string nidtipodocumento, string vnumdocumento,string vnombres, string vpaterno, 
                                         string vmaterno, string vsexo, string vrazonsocial, string vemail, string vtelefono, 
                                         string vcelular, string vdireccion, string vubigeo,string iestado, string nidperfil)
        {
            string respuesta = "";

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Usuario_Insertar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            
            cmd.Parameters.AddWithValue("@nidtipodocumento", nidtipodocumento);
            cmd.Parameters.AddWithValue("@vnumdocumento", vnumdocumento);
            cmd.Parameters.AddWithValue("@vnombres", vnombres);
            cmd.Parameters.AddWithValue("@vpaterno", vpaterno);
            cmd.Parameters.AddWithValue("@vmaterno", vmaterno);
            cmd.Parameters.AddWithValue("@vsexo", vsexo);
            cmd.Parameters.AddWithValue("@vrazonsocial", vrazonsocial);
            cmd.Parameters.AddWithValue("@vemail", vemail);
            cmd.Parameters.AddWithValue("@vtelefono", vtelefono);
            cmd.Parameters.AddWithValue("@vcelular", vcelular);
            cmd.Parameters.AddWithValue("@vdireccion", vdireccion);
            cmd.Parameters.AddWithValue("@vubigeo", vubigeo);
            cmd.Parameters.AddWithValue("@iestado", iestado);
            cmd.Parameters.AddWithValue("@nidperfil", nidperfil);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return respuesta;
        }

        public List<UsuarioPreferenciasEntity> SelectUsuarioPreferenciaMercado_DA(string nidusuario)
        {
            List<UsuarioPreferenciasEntity> listado = new List<UsuarioPreferenciasEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Usuario_Preferencia_Mercado_Select", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidusuario", nidusuario);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                UsuarioPreferenciasEntity clase = new UsuarioPreferenciasEntity();

                clase.nidmercado = dr["nidmercado"].ToString();
                clase.vdescripcion = dr["vdescripcion"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        public List<UsuarioPreferenciasEntity> NoSelectUsuarioPreferenciaMercado_DA(string nidusuario)
        {
            List<UsuarioPreferenciasEntity> listado = new List<UsuarioPreferenciasEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Usuario_Preferencia_Mercado_NoSelect", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidusuario", nidusuario);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                UsuarioPreferenciasEntity clase = new UsuarioPreferenciasEntity();

                clase.nidmercado = dr["nidmercado"].ToString();
                clase.vdescripcion = dr["vdescripcion"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        public List<UsuarioPreferenciasEntity> SelectUsuarioPreferenciaProducto_DA(string nidusuario, string nidmercado)
        {
            List<UsuarioPreferenciasEntity> listado = new List<UsuarioPreferenciasEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Usuario_Preferencia_Producto_Select", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidusuario", nidusuario);
            cmd.Parameters.AddWithValue("@nidmercado", nidmercado);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                UsuarioPreferenciasEntity clase = new UsuarioPreferenciasEntity();

                clase.nidproducto = dr["nidproducto"].ToString();
                clase.vdescripcion_corta = dr["vdescripcion_corta"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public List<UsuarioPreferenciasEntity> NoSelectUsuarioPreferenciaProducto_DA(string nidusuario, string nidmercado)
        {
            List<UsuarioPreferenciasEntity> listado = new List<UsuarioPreferenciasEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Usuario_Preferencia_Producto_NoSelect", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidusuario", nidusuario);
            cmd.Parameters.AddWithValue("@nidmercado", nidmercado);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                UsuarioPreferenciasEntity clase = new UsuarioPreferenciasEntity();

                clase.nidproducto = dr["nidproducto"].ToString();
                clase.vdescripcion_corta = dr["vdescripcion_corta"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        public string EliminarPreferenciaMercadoUsuario_DA(string nidUsuario,string cadena)
        {
            string respuesta = "";
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Usuario_Preferencia_Mercado_Eliminar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidUsuario", nidUsuario);
            cmd.Parameters.AddWithValue("@cadena", cadena);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return respuesta;
        }

        public string InsertarPreferenciaMercadoUsuario_DA(string nidUsuario, string cadena)
        {
            string respuesta = "";
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Usuario_Preferencia_Mercado_Insertar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidUsuario", nidUsuario);
            cmd.Parameters.AddWithValue("@cadena", cadena);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return respuesta;
        }

        public string EliminarPreferenciaProductoUsuario_DA(string nidUsuario, string cadena, string nidmercado)
        {
            string respuesta = "";
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Usuario_Preferencia_Producto_Eliminar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidUsuario", nidUsuario);
            cmd.Parameters.AddWithValue("@cadena", cadena);
            cmd.Parameters.AddWithValue("@nidmercado", nidmercado);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return respuesta;
        }

        public string InsertarPreferenciaProductoUsuario_DA(string nidUsuario, string cadena, string nidmercado)
        {
            string respuesta = "";
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Usuario_Preferencia_Producto_Insertar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidUsuario", nidUsuario);
            cmd.Parameters.AddWithValue("@cadena", cadena);
            cmd.Parameters.AddWithValue("@nidmercado", nidmercado);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return respuesta;
        }

        public string EditarPrecios_tempDetalleHistorial_DA(string nidtempdetallehistorial, string dprecio1, string dprecio2, string dprecio3,
                                                            string dprecio4, string dprecio5, string dprecio6, string dprecio7, string dprecio8,
                                                            string dprecio9, string dprecio10)
        {
            string respuesta = "";
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_DetalleHistorial_Temp_Precios_Editar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidtempdetallehistorial", nidtempdetallehistorial);
            cmd.Parameters.AddWithValue("@dprecio1", dprecio1);
            cmd.Parameters.AddWithValue("@dprecio2", dprecio2);
            cmd.Parameters.AddWithValue("@dprecio3", dprecio3);
            cmd.Parameters.AddWithValue("@dprecio4", dprecio4);
            cmd.Parameters.AddWithValue("@dprecio5", dprecio5);
            cmd.Parameters.AddWithValue("@dprecio6", dprecio6);
            cmd.Parameters.AddWithValue("@dprecio7", dprecio7);
            cmd.Parameters.AddWithValue("@dprecio8", dprecio8);
            cmd.Parameters.AddWithValue("@dprecio9", dprecio9);
            cmd.Parameters.AddWithValue("@dprecio10", dprecio10);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return respuesta;
        }

        public List<ConfiguracionEnvioEntity> ListarConfiguracionEnvio_DA()
        {
            List<ConfiguracionEnvioEntity> listado = new List<ConfiguracionEnvioEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_SMS_ConfiguracionEnvios", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                ConfiguracionEnvioEntity clase = new ConfiguracionEnvioEntity();

                clase.nidsmsconfigenvio = dr["nidsmsconfigenvio"].ToString();
                clase.vdia = dr["vdia"].ToString();
                clase.horaenvio = dr["hora"].ToString();
                clase.iestado = dr["iestado"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        public string EditarConfiguracionEnvio_DA(string nidsmsconfigenvio, string horaenvio, string iestado)
        {
            string respuesta = "";
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_SMS_ConfiguracionEnvios_Editar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidsmsconfigenvio", nidsmsconfigenvio);
            cmd.Parameters.AddWithValue("@horaenvio", horaenvio);
            cmd.Parameters.AddWithValue("@iestado", iestado);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return respuesta;
        }

        public List<smsPrecioUsuario> SMSPrecioUsuario_Cabecera_DA()
        {

            List<smsPrecioUsuario> listado = new List<smsPrecioUsuario>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_SMS_PrecioUsuario_Cabecera", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                smsPrecioUsuario clase = new smsPrecioUsuario();

                clase.cabecera = dr["cabecera"].ToString();
                clase.celular = dr["celular"].ToString();

                listado.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return listado;

        }
        public List<smsPrecioUsuario> SMSPrecioUsuario_Detalle_DA(string vcelular)
        {

            List<smsPrecioUsuario> listado = new List<smsPrecioUsuario>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_SMS_PrecioUsuario_Detalle", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@vcelular", vcelular);
            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                smsPrecioUsuario clase = new smsPrecioUsuario();
                clase.mercado = dr["mercado"].ToString();
                clase.vdescripcion_corta = dr["vdescripcion_corta"].ToString();
                clase.preciopromedio = dr["preciopromedio"].ToString();

                listado.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return listado;

        }

        public string CargarUsuarios_DA(string vnombres, string vpaterno, string vmaterno, string vdni, 
                                        string vcelular, string vubigeo)
        {
            string resultado = "";
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Usuario_CargarProductor", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@vnombres", vnombres);
            cmd.Parameters.AddWithValue("@vpaterno", vpaterno);
            cmd.Parameters.AddWithValue("@vmaterno", vmaterno);
            cmd.Parameters.AddWithValue("@vdni", vdni);
            cmd.Parameters.AddWithValue("@vcelular", vcelular);
            cmd.Parameters.AddWithValue("@vubigeo", vubigeo);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                resultado = dr["resultado"].ToString();
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return resultado;
        }

        public List<PreciosEntity> ListarHistoricoPrecios_DA(string NroDePagina, string RegPorPag, string dfechainicio, string dfechafin,
                                                                string nidmercado, string vnombreproducto)
        {

            List<PreciosEntity> listado = new List<PreciosEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Precios_Historico_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@NroDePagina", NroDePagina);
            cmd.Parameters.AddWithValue("@RegPorPag", RegPorPag);
            cmd.Parameters.AddWithValue("@dfechainicio", dfechainicio);
            cmd.Parameters.AddWithValue("@dfechafin", dfechafin);
            cmd.Parameters.AddWithValue("@nidmercado", nidmercado);
            cmd.Parameters.AddWithValue("@vnombreproducto", vnombreproducto);


            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                PreciosEntity clase = new PreciosEntity();
                clase.dfecha = dr["dfecha"].ToString();
                clase.vmercado = dr["vmercado"].ToString();
                clase.vnombreproducto = dr["vnombreproducto"].ToString();
                clase.vpromedio = dr["vpromedio"].ToString();
                clase.num = dr["num"].ToString();
                clase.TotalRegistros = dr["TotalRegistros"].ToString();

                listado.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return listado;

        }

        public List<HistoricoPreciosExcelEntity> ExportarExcelHistoricoPrecios_DA(string dfechainicio, string dfechafin, string nidmercado, string vnombreproducto)
        {
            List<HistoricoPreciosExcelEntity> listado = new List<HistoricoPreciosExcelEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Precios_Historico_ExportarExcel", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@dfechainicio", dfechainicio);
            cmd.Parameters.AddWithValue("@dfechafin", dfechafin);
            cmd.Parameters.AddWithValue("@nidmercado", nidmercado);
            cmd.Parameters.AddWithValue("@vnombreproducto", vnombreproducto);

            cn.getcn.Open();

            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                HistoricoPreciosExcelEntity clase = new HistoricoPreciosExcelEntity();
                clase.num = dr["num"].ToString();
                clase.dfecha = dr["dfecha"].ToString();
                clase.vmercado = dr["vmercado"].ToString();
                clase.vnombreproducto = dr["vnombreproducto"].ToString();
                clase.vpromedio = dr["vpromedio"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return listado;
        }

        //Gráfico estadístico de Precios de Productos(vista PRECIOS DE VENTA)
        public List<GraficoPrecios> GraficarPreciosIntranet_DA(string cadenaid, string dfechainicio, string dfechafin, string nidmercado)
        {
            List<GraficoPrecios> lista = new List<GraficoPrecios>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Grafico_Precios_Intranet", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@cadenaid", cadenaid);
            cmd.Parameters.AddWithValue("@dfechainicio", dfechainicio);
            cmd.Parameters.AddWithValue("@dfechafin", dfechafin);
            cmd.Parameters.AddWithValue("@nidmercado", nidmercado);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                GraficoPrecios clase = new GraficoPrecios();
                clase.cadena = dr["cadena"].ToString();
                clase.cadena2 = dr["cadena2"].ToString();
                clase.cadena3 = dr["cadena3"].ToString();
                clase.cadena4 = dr["cadena4"].ToString();
                clase.nombre = dr["nombre"].ToString();
                clase.nombre2 = dr["nombre2"].ToString();
                clase.nombre3 = dr["nombre3"].ToString();
                clase.nombre4 = dr["nombre4"].ToString();
                clase.mes = dr["mes"].ToString();
                clase.diainicio = dr["diainicio"].ToString();
                clase.diainicio2 = dr["diainicio2"].ToString();
                clase.diainicio3 = dr["diainicio3"].ToString();
                clase.diainicio4 = dr["diainicio4"].ToString();


                lista.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return lista;
        }

        //Gráfico estadístico de Analisis de Promedios Semanal
        public List<GraficoAnalisisPromedios> GraficarAnalisisPromediosSemanal_DA(string cadenaid, string nidmercado, string dfechainicio, string dfechafin)
        {
            List<GraficoAnalisisPromedios> lista = new List<GraficoAnalisisPromedios>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Grafico_AnalisisPromedioSemanal", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@cadenaid", cadenaid);
            cmd.Parameters.AddWithValue("@nidmercado", nidmercado);
            cmd.Parameters.AddWithValue("@dfechainicio", dfechainicio);
            cmd.Parameters.AddWithValue("@dfechafin", dfechafin);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                GraficoAnalisisPromedios clase = new GraficoAnalisisPromedios();
                clase.respuesta1 = dr["respuesta1"].ToString();
                clase.respuesta2 = dr["respuesta2"].ToString();
                clase.respuesta3 = dr["respuesta3"].ToString();
                clase.respuesta4 = dr["respuesta4"].ToString();
                clase.respuesta5 = dr["respuesta5"].ToString();
                clase.respuesta6 = dr["respuesta6"].ToString();
                clase.respuesta7 = dr["respuesta7"].ToString();
                clase.respuesta8 = dr["respuesta8"].ToString();
                clase.respuesta9 = dr["respuesta9"].ToString();
                clase.respuesta10 = dr["respuesta10"].ToString();
                clase.vnombreproducto1 = dr["vnombreproducto1"].ToString();
                clase.vnombreproducto2 = dr["vnombreproducto2"].ToString();
                clase.vnombreproducto3 = dr["vnombreproducto3"].ToString();
                clase.vnombreproducto4 = dr["vnombreproducto4"].ToString();
                clase.vnombreproducto5 = dr["vnombreproducto5"].ToString();
                clase.vnombreproducto6 = dr["vnombreproducto6"].ToString();
                clase.vnombreproducto7 = dr["vnombreproducto7"].ToString();
                clase.vnombreproducto8 = dr["vnombreproducto8"].ToString();
                clase.vnombreproducto9 = dr["vnombreproducto9"].ToString();
                clase.vnombreproducto10 = dr["vnombreproducto10"].ToString();

                lista.Add(clase);
            }
                dr.Close();
                cmd.Dispose();
                cn.getcn.Close();

            return lista;
        }

        //Gráfico estadístico de Analisis de Promedios Quincenal
        public List<GraficoAnalisisPromedios> GraficarAnalisisPromediosQuincenal_DA(string cadenaid, string nidmercado, string dfechainicio, string dfechafin)
        {
            List<GraficoAnalisisPromedios> lista = new List<GraficoAnalisisPromedios>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Grafico_AnalisisPromedioQuincenal", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@cadenaid", cadenaid);
            cmd.Parameters.AddWithValue("@nidmercado", nidmercado);
            cmd.Parameters.AddWithValue("@dfechainicio", dfechainicio);
            cmd.Parameters.AddWithValue("@dfechafin", dfechafin);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                GraficoAnalisisPromedios clase = new GraficoAnalisisPromedios();
                clase.respuesta1 = dr["respuesta1"].ToString();
                clase.respuesta2 = dr["respuesta2"].ToString();
                clase.respuesta3 = dr["respuesta3"].ToString();
                clase.respuesta4 = dr["respuesta4"].ToString();
                clase.respuesta5 = dr["respuesta5"].ToString();
                clase.respuesta6 = dr["respuesta6"].ToString();
                clase.respuesta7 = dr["respuesta7"].ToString();
                clase.respuesta8 = dr["respuesta8"].ToString();
                clase.respuesta9 = dr["respuesta9"].ToString();
                clase.respuesta10 = dr["respuesta10"].ToString();
                clase.vnombreproducto1 = dr["vnombreproducto1"].ToString();
                clase.vnombreproducto2 = dr["vnombreproducto2"].ToString();
                clase.vnombreproducto3 = dr["vnombreproducto3"].ToString();
                clase.vnombreproducto4 = dr["vnombreproducto4"].ToString();
                clase.vnombreproducto5 = dr["vnombreproducto5"].ToString();
                clase.vnombreproducto6 = dr["vnombreproducto6"].ToString();
                clase.vnombreproducto7 = dr["vnombreproducto7"].ToString();
                clase.vnombreproducto8 = dr["vnombreproducto8"].ToString();
                clase.vnombreproducto9 = dr["vnombreproducto9"].ToString();
                clase.vnombreproducto10 = dr["vnombreproducto10"].ToString();

                lista.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return lista;
        }

        //Gráfico estadístico de Analisis de Promedios Mensual
        public List<GraficoAnalisisPromedios> GraficarAnalisisPromediosMensual_DA(string cadenaid, string nidmercado, string dfechainicio, string dfechafin)
        {
            List<GraficoAnalisisPromedios> lista = new List<GraficoAnalisisPromedios>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Grafico_AnalisisPromedioMensual", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@cadenaid", cadenaid);
            cmd.Parameters.AddWithValue("@nidmercado", nidmercado);
            cmd.Parameters.AddWithValue("@dfechainicio", dfechainicio);
            cmd.Parameters.AddWithValue("@dfechafin", dfechafin);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                GraficoAnalisisPromedios clase = new GraficoAnalisisPromedios();
                clase.respuesta1 = dr["respuesta1"].ToString();
                clase.respuesta2 = dr["respuesta2"].ToString();
                clase.respuesta3 = dr["respuesta3"].ToString();
                clase.respuesta4 = dr["respuesta4"].ToString();
                clase.respuesta5 = dr["respuesta5"].ToString();
                clase.respuesta6 = dr["respuesta6"].ToString();
                clase.respuesta7 = dr["respuesta7"].ToString();
                clase.respuesta8 = dr["respuesta8"].ToString();
                clase.respuesta9 = dr["respuesta9"].ToString();
                clase.respuesta10 = dr["respuesta10"].ToString();
                clase.vnombreproducto1 = dr["vnombreproducto1"].ToString();
                clase.vnombreproducto2 = dr["vnombreproducto2"].ToString();
                clase.vnombreproducto3 = dr["vnombreproducto3"].ToString();
                clase.vnombreproducto4 = dr["vnombreproducto4"].ToString();
                clase.vnombreproducto5 = dr["vnombreproducto5"].ToString();
                clase.vnombreproducto6 = dr["vnombreproducto6"].ToString();
                clase.vnombreproducto7 = dr["vnombreproducto7"].ToString();
                clase.vnombreproducto8 = dr["vnombreproducto8"].ToString();
                clase.vnombreproducto9 = dr["vnombreproducto9"].ToString();
                clase.vnombreproducto10 = dr["vnombreproducto10"].ToString();

                lista.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return lista;
        }

        public List<NoticiaEntity> ListarNoticia_DA()
        {
            List<NoticiaEntity> lista = new List<NoticiaEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Noticia_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            //cmd.Parameters.AddWithValue("@vcelular", vcelular);            

            cn.getcn.Open();

            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                NoticiaEntity clase = new NoticiaEntity();
                clase.nidnoticia = dr["nidnoticia"].ToString();
                clase.vtitulo = dr["vtitulo"].ToString();
                clase.vcomentario = dr["vcomentario"].ToString();
                clase.vlink = dr["vlink"].ToString();
                clase.bnegrita = dr["bnegrita"].ToString();
                clase.vimagen = dr["vimagen"].ToString();
                clase.dfecha = dr["dfecha"].ToString();
                clase.iprioridad = dr["iprioridad"].ToString();
                clase.iestado = dr["iestado"].ToString();

                lista.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return lista;
        }
        public List<NoticiaEntity> SelectNoticia_DA(string nidnoticia)
        {
            List<NoticiaEntity> lista = new List<NoticiaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Noticia_Select", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidnoticia", nidnoticia);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                NoticiaEntity clase = new NoticiaEntity();
                clase.nidnoticia = dr["nidnoticia"].ToString();
                clase.vtitulo = dr["vtitulo"].ToString();
                clase.vcomentario = dr["vcomentario"].ToString();
                clase.vlink = dr["vlink"].ToString();
                clase.bnegrita = dr["bnegrita"].ToString();
                clase.vimagen = dr["vimagen"].ToString();
                clase.dfecha = dr["dfecha"].ToString();
                clase.iprioridad = dr["iprioridad"].ToString();
                clase.iestado = dr["iestado"].ToString();

                lista.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return lista;
        }

        public string EditarNoticia_DA(string nidnoticia, string vtitulo, string vcomentario, string vlink, string vimagen,string dfecha, string iestado, string vmodo)
        {
            string respuesta = "";

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Noticia_Editar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidnoticia", nidnoticia);
            cmd.Parameters.AddWithValue("@vtitulo", vtitulo);
            cmd.Parameters.AddWithValue("@vcomentario", vcomentario);
            cmd.Parameters.AddWithValue("@vlink", vlink);
            cmd.Parameters.AddWithValue("@vimagen", vimagen);
            cmd.Parameters.AddWithValue("@dfecha", dfecha);
            cmd.Parameters.AddWithValue("@iestado", iestado);
            cmd.Parameters.AddWithValue("@vmodo", vmodo);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();
                
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return respuesta ;
        }
        
        public string InsertarNoticia_DA(string vtitulo, string vcomentario, string vlink, string vimagen, string dfecha, string iestado)
        {
            string respuesta = "";

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Noticia_Insertar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            
            cmd.Parameters.AddWithValue("@vtitulo", vtitulo);
            cmd.Parameters.AddWithValue("@vcomentario", vcomentario);
            cmd.Parameters.AddWithValue("@vlink", vlink);
            cmd.Parameters.AddWithValue("@vimagen", vimagen);
            cmd.Parameters.AddWithValue("@dfecha", dfecha);
            cmd.Parameters.AddWithValue("@iestado", iestado);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();

            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return respuesta;
        }

        public string SubirPrioridadNoticia_DA(string nidnoticia)
        {
            string respuesta = "";

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Noticia_Prioridad_Subir", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidnoticia", nidnoticia);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();

            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return respuesta;
        }

        public string BajarPrioridadNoticia_DA(string nidnoticia)
        {
            string respuesta = "";

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Noticia_Prioridad_Bajar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidnoticia", nidnoticia);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();

            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return respuesta;
        }

        public List<EditorialEntity> ListarEditorialMantenimiento_DA()
        {
            List<EditorialEntity> lista = new List<EditorialEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Editorial_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cn.getcn.Open();

            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                EditorialEntity clase = new EditorialEntity();
                clase.nideditorial = dr["nideditorial"].ToString();
                clase.vtitulo = dr["vtitulo"].ToString();
                clase.vcontenido = dr["vcontenido"].ToString();
                clase.vimagen = dr["vimagen"].ToString();
                clase.iestado = dr["iestado"].ToString();
                lista.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return lista;
        }

        public List<EditorialEntity> SelectEditorial_DA(string nideditorial)
        {
            List<EditorialEntity> lista = new List<EditorialEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Editorial_Select", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nideditorial", nideditorial);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                EditorialEntity clase = new EditorialEntity();
                clase.nideditorial = dr["nideditorial"].ToString();
                clase.vtitulo = dr["vtitulo"].ToString();
                clase.vcontenido = dr["vcontenido"].ToString();
                clase.vimagen = dr["vimagen"].ToString();
                clase.iestado = dr["iestado"].ToString();

                lista.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return lista;
        }

        public string EditarEditorial_DA(string nideditorial, string vtitulo, string vcontenido, string vimagen, string iestado, string vmodo)
        {
            string respuesta = "";

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Editorial_Editar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nideditorial", nideditorial);
            cmd.Parameters.AddWithValue("@vtitulo", vtitulo);
            cmd.Parameters.AddWithValue("@vcontenido", vcontenido);
            cmd.Parameters.AddWithValue("@vimagen", vimagen);
            cmd.Parameters.AddWithValue("@iestado", iestado);
            cmd.Parameters.AddWithValue("@vmodo", vmodo);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();

            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return respuesta;
        }

        public string InsertarEditorial_DA(string vtitulo, string vcontenido, string vimagen, string iestado)
        {
            string respuesta = "";

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Editorial_Insertar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            
            cmd.Parameters.AddWithValue("@vtitulo", vtitulo);
            cmd.Parameters.AddWithValue("@vcontenido", vcontenido);
            cmd.Parameters.AddWithValue("@vimagen", vimagen);
            cmd.Parameters.AddWithValue("@iestado", iestado);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();

            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return respuesta;
        }
        public List<CategoriaMesaAyudaEntity> ListarComboCategoriaMA_DA()
        {
            List<CategoriaMesaAyudaEntity> lista = new List<CategoriaMesaAyudaEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_MesaAyuda_Categoria_Listar_Combo", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                CategoriaMesaAyudaEntity clase = new CategoriaMesaAyudaEntity();

                clase.nidcategoria = dr["nidcategoria"].ToString();
                clase.vdescripcion = dr["vdescripcion"].ToString();

                lista.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return lista;
        }

        public List<SolicitudMesaAyudaEntity> ValidarCorreoMesaAyuda(string nidusuario)
        {
            List<SolicitudMesaAyudaEntity> lista = new List<SolicitudMesaAyudaEntity>();

            SqlCommand cmd = new SqlCommand("[SP_RUNATEC_MesaAyuda_Correo_Validar]", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            
            cmd.Parameters.AddWithValue("@nidusuario", nidusuario);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                SolicitudMesaAyudaEntity clase = new SolicitudMesaAyudaEntity();
                clase.respuesta = dr["respuesta"].ToString();
                clase.vemail = dr["vemail"].ToString();
                lista.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return lista;
        }
        public List<SolicitudMesaAyudaEntity> RegistrarSolicitudMesaAyuda_DA(string nidcategoria, string vdescripcion, string vemail,
                                                                            string nidusuario, string vasunto)
        {
            List<SolicitudMesaAyudaEntity> lista = new List<SolicitudMesaAyudaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_MesaAyuda_Solicitud_Registrar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidcategoria", nidcategoria);
            cmd.Parameters.AddWithValue("@vdescripcion", vdescripcion);
            cmd.Parameters.AddWithValue("@vemail", vemail);
            cmd.Parameters.AddWithValue("@nidusuario", nidusuario);
            cmd.Parameters.AddWithValue("@vasunto", vasunto);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                SolicitudMesaAyudaEntity clase = new SolicitudMesaAyudaEntity();
                clase.vemail = dr["vemail"].ToString();
                clase.vcodigo = dr["vcodigo"].ToString();
                clase.nidsolicitud = dr["nidsolicitud"].ToString();
                clase.respuesta = dr["respuesta"].ToString();
                clase.vemailadm = dr["vemailadm"].ToString();
                clase.vnombres = dr["vnombres"].ToString();
                clase.vasunto = dr["vasunto"].ToString();

                lista.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return lista;
        }

        public List<SolicitudMesaAyudaEntity> ListarSolicitudMesaAyuda_DA(string vusuario, string nidcategoria,
                                            string iestado, string NroDePagina, string RegPorPag)
        {
            List<SolicitudMesaAyudaEntity> lista = new List<SolicitudMesaAyudaEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_MesaAyuda_Solicitud_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@vusuario", vusuario);
            cmd.Parameters.AddWithValue("@nidcategoria", nidcategoria);
            cmd.Parameters.AddWithValue("@iestado", iestado);
            cmd.Parameters.AddWithValue("@NroDePagina", NroDePagina);
            cmd.Parameters.AddWithValue("@RegPorPag", RegPorPag);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                SolicitudMesaAyudaEntity clase = new SolicitudMesaAyudaEntity();
                clase.nidsolicitud = dr["nidsolicitud"].ToString();
                clase.nombresadm = dr["nombresadm"].ToString();
                clase.asunto = dr["asunto"].ToString();
                clase.nidcategoria = dr["nidcategoria"].ToString();
                clase.categoria = dr["categoria"].ToString();
                clase.estado = dr["estado"].ToString();
                clase.nidusuario = dr["nidusuario"].ToString();
                clase.email = dr["email"].ToString();
                clase.TotalRegistros = dr["TotalRegistros"].ToString();

                lista.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return lista;
        }
        public List<EstadoMesaAyudaEntity> ListarComboEstadoMA_DA()
        {
            List<EstadoMesaAyudaEntity> lista = new List<EstadoMesaAyudaEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_MesaAyudaEstado_Listar_combo", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                EstadoMesaAyudaEntity clase = new EstadoMesaAyudaEntity();

                clase.nidestado = dr["nidestado"].ToString();
                clase.vdescripcion = dr["vdescripcion"].ToString();

                lista.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return lista;
        }

        public List<SolicitudMesaAyudaEntity> SelectSolicitud_MesaAyuda_DA(string nidsolicitud)
        {
            List<SolicitudMesaAyudaEntity> listado = new List<SolicitudMesaAyudaEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_MesaAyuda_Solicitud_Select", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidsolicitud", nidsolicitud);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                SolicitudMesaAyudaEntity clase = new SolicitudMesaAyudaEntity();
                clase.nidsolicitud = dr["nidsolicitud"].ToString();
                clase.nidcategoria = dr["nidcategoria"].ToString();
                clase.dfecha = dr["dfecha"].ToString();
                clase.vdescripcion = dr["vdescripcion"].ToString();
                clase.vemail = dr["vemail"].ToString();
                clase.vcodigo = dr["vcodigo"].ToString();
                clase.iestado = dr["iestado"].ToString();
                clase.vasunto = dr["vasunto"].ToString();
                clase.respuesta = dr["respuesta"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        public List<AtencionMesaAyudaEntity> RegistrarAtencion_MesaAyuda_DA(string vasunto, string vcontenido, string nidusuario, 
                                                                            string nidsolicitud, string dfecha)
        {
            List<AtencionMesaAyudaEntity> listado = new List<AtencionMesaAyudaEntity>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_MesaAyuda_Atencion_Registrar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@vasunto", vasunto);
            cmd.Parameters.AddWithValue("@vcontenido", vcontenido);
            cmd.Parameters.AddWithValue("@nidusuario", nidusuario);
            cmd.Parameters.AddWithValue("@nidsolicitud", nidsolicitud);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                AtencionMesaAyudaEntity clase = new AtencionMesaAyudaEntity();
                clase.respuesta = dr["respuesta"].ToString();
                clase.nidsolicitud = dr["nidsolicitud"].ToString();
                clase.vusuario = dr["vusuario"].ToString();
                clase.vnombresadm = dr["vnombresadm"].ToString();
                clase.vemail = dr["vemail"].ToString();
                clase.vcodigo = dr["vcodigo"].ToString();
                clase.vemailadm = dr["vemailadm"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        public string ObtenerCategoria_MesaAyuda_DA(string nidusuario)
        {
            string respuesta="";
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_MesaAyuda_Categoria_Obtener", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidusuario", nidusuario);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["nidcategoria"].ToString();

            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return respuesta;
        }

        public List<CategoriaMesaAyudaEntity> ListarCategoria_MesaAyuda_DA(string nidusuario)
        {
            List<CategoriaMesaAyudaEntity> listado = new List<CategoriaMesaAyudaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_MesaAyuda_Categoria_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidusuario", nidusuario);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                CategoriaMesaAyudaEntity clase = new CategoriaMesaAyudaEntity();
                clase.nidcategoria = dr["nidcategoria"].ToString();
                clase.vdescripcion = dr["vdescripcion"].ToString();
                clase.activado = dr["activado"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public List<UsuarioEntity> ListarUsuario_MesaAyuda_DA()
        {
            List<UsuarioEntity> listado = new List<UsuarioEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_MesaAyuda_Usuario_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                UsuarioEntity clase = new UsuarioEntity();
                clase.nidusuario = dr["nidusuario"].ToString();
                clase.vnombres = dr["vnombres"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public string AsignarCategoria_MesaAyuda_DA(string cadena, string nidusuario)
        {
            string respuesta = "";

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_MesaAyuda_Categoria_Asignar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@cadena", cadena);
            cmd.Parameters.AddWithValue("@nidusuario", nidusuario);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return respuesta;
        }
        public string PermitirCategoria_MesaAyuda_DA(string nidusuario, string nidcategoria)
        {
            string respuesta = "";

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_MesaAyuda_Categoria_Permitir", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nidusuario", nidusuario);
            cmd.Parameters.AddWithValue("@nidcategoria", nidcategoria);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return respuesta;
        }
        public List<SolicitudMesaAyudaEntity> EnviarCorreo_MesaAyuda_DA()
        {
            List<SolicitudMesaAyudaEntity> listado = new List<SolicitudMesaAyudaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_MesaAyuda_Correo_Enviar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                SolicitudMesaAyudaEntity clase = new SolicitudMesaAyudaEntity();
                clase.nidsolicitud = dr["nidsolicitud"].ToString();
                clase.vemail = dr["vemail"].ToString();
                clase.vcodigo = dr["vcodigo"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        //Muestra los datos de la solicitud atendida en el enlace de calificación del productor
        public List<SolicitudMesaAyudaEntity> CalificacionServicio_MesaAyuda_DA(string nidsolicitud, string vcodigo)
        {
            List<SolicitudMesaAyudaEntity> listado = new List<SolicitudMesaAyudaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_MesaAyuda_Calificacion_Select", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@nidsolicitud", nidsolicitud);
            cmd.Parameters.AddWithValue("@vcodigo", vcodigo);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                SolicitudMesaAyudaEntity clase = new SolicitudMesaAyudaEntity();
                clase.nidsolicitud = dr["nidsolicitud"].ToString();
                clase.dfecha = dr["dfecha"].ToString();
                clase.dfechaAtencion = dr["dfechaAtencion"].ToString();
                clase.duracion = dr["duracion"].ToString();
                clase.nidusuario = dr["nidusuario"].ToString();
                clase.vnombres = dr["vnombres"].ToString();
                clase.respuesta = dr["respuesta"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public string RegistrarCalificacion_MesaAyuda_DA(string icalificacion, string nidsolicitud, string vcomentario, string vcomentariomejora)
        {
            string respuesta = "";

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_MesaAyuda_Calificacion_Registrar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@icalificacion", icalificacion);
            cmd.Parameters.AddWithValue("@nidsolicitud", nidsolicitud);
            cmd.Parameters.AddWithValue("@vcomentario", vcomentario);
            cmd.Parameters.AddWithValue("@vcomentariomejora", vcomentariomejora);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return respuesta;
        }
        public List <CalificacionMesaAyudaEntity> ListarCalificacion_MesaAyuda_DA(string icalificacion, string nombreadministrador, string dfechainicio, 
                                                                                    string dfechafin, string NroDePagina, string RegPorPag)
        {
            List<CalificacionMesaAyudaEntity> listado = new List<CalificacionMesaAyudaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_MesaAyuda_Calificacion_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@icalificacion", icalificacion);
            cmd.Parameters.AddWithValue("@nombreadministrador", nombreadministrador);
            cmd.Parameters.AddWithValue("@dfechainicio", dfechainicio);
            cmd.Parameters.AddWithValue("@dfechafin", dfechafin);
            cmd.Parameters.AddWithValue("@NroDePagina", NroDePagina);
            cmd.Parameters.AddWithValue("@RegPorPag", RegPorPag);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                CalificacionMesaAyudaEntity clase = new CalificacionMesaAyudaEntity();
                clase.cantidad = dr["cantidad"].ToString();
                clase.nidusuarioadm = dr["nidusuarioadm"].ToString();
                clase.nombreadministrador = dr["nombreadministrador"].ToString();
                clase.promcalificacion = dr["promcalificacion"].ToString();
                clase.TotalRegistros = dr["TotalRegistros"].ToString();
                clase.num = dr["num"].ToString();
                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public List<CalificacionMesaAyudaEntity> ListarDetalleCalificacion_MesaAyuda_DA(string icalificacion, string nombreadministrador, string dfechainicio,
                                                                                    string dfechafin, string nidcategoria, string NroDePagina, string RegPorPag)
        {
            List<CalificacionMesaAyudaEntity> listado = new List<CalificacionMesaAyudaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_MesaAyuda_Calificacion_Detalle_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@icalificacion", icalificacion);
            cmd.Parameters.AddWithValue("@nombreadministrador", nombreadministrador);
            cmd.Parameters.AddWithValue("@dfechainicio", dfechainicio);
            cmd.Parameters.AddWithValue("@dfechafin", dfechafin);
            cmd.Parameters.AddWithValue("@nidcategoria", nidcategoria);
            cmd.Parameters.AddWithValue("@NroDePagina", NroDePagina);
            cmd.Parameters.AddWithValue("@RegPorPag", RegPorPag);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                CalificacionMesaAyudaEntity clase = new CalificacionMesaAyudaEntity();
                clase.nidsolicitud = dr["nidsolicitud"].ToString();
                clase.dfechaCalificacion = dr["dfechaCalificacion"].ToString();
                clase.dfechaSolicitud = dr["dfechaSolicitud"].ToString();
                clase.dfechaAtencion = dr["dfechaAtencion"].ToString();
                clase.categoria = dr["categoria"].ToString();
                clase.icalificacion = dr["icalificacion"].ToString();
                clase.nombreproductor = dr["nombreproductor"].ToString();
                clase.nombreadministrador = dr["nombreadministrador"].ToString();
                clase.TotalRegistros = dr["TotalRegistros"].ToString();
                clase.num = dr["num"].ToString();
                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public List<CalificacionMesaAyudaEntity> SelectDetalleCalificacion_MesaAyuda_DA(string nidsolicitud)
        {
            List<CalificacionMesaAyudaEntity> listado = new List<CalificacionMesaAyudaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_MesaAyuda_Calificacion_Detalle_Select", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@nidsolicitud", nidsolicitud);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                CalificacionMesaAyudaEntity clase = new CalificacionMesaAyudaEntity();
                clase.nidsolicitud = dr["nidsolicitud"].ToString();
                clase.comentariosolicitud = dr["comentariosolicitud"].ToString();
                clase.comentarioatencion = dr["comentarioatencion"].ToString();
                clase.dfecha = dr["dfecha"].ToString();
                clase.dfechaAtencion = dr["dfechaAtencion"].ToString();
                clase.categoria = dr["categoria"].ToString();
                clase.icalificacion = dr["icalificacion"].ToString();
                clase.nombreproductor = dr["nombreproductor"].ToString();
                clase.nombreadministrador = dr["nombreadministrador"].ToString();
                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public List<CalificacionMesaAyudaEntity> DetallarCalificacionPorAdm_MesaAyuda_DA(string nidusuarioadm)
        {
            List<CalificacionMesaAyudaEntity> listado = new List<CalificacionMesaAyudaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_MesaAyuda_CalificacionPorAdm_Detallar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@nidusuarioadm", nidusuarioadm);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                CalificacionMesaAyudaEntity clase = new CalificacionMesaAyudaEntity();
                clase.dfecha = dr["dfecha"].ToString();
                clase.nombreproductor = dr["nombreproductor"].ToString();
                clase.nombreoperador = dr["nombreoperador"].ToString();
                clase.categoria = dr["categoria"].ToString();
                clase.icalificacion = dr["icalificacion"].ToString();
                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        public List<ClimaEntity> ListarTemperatura_DA(string NroDePagina, string RegPorPag, string dfechainicio, string dfechafin)
        {
            List<ClimaEntity> listado = new List<ClimaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_Temperatura_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@NroDePagina", NroDePagina);
            cmd.Parameters.AddWithValue("@RegPorPag", RegPorPag);
            cmd.Parameters.AddWithValue("@dfechainicio", dfechainicio);
            cmd.Parameters.AddWithValue("@dfechafin", dfechafin);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                ClimaEntity clase = new ClimaEntity();
                clase.nidtemperatura = dr["nidtemperatura"].ToString();
                clase.ntemperaturaminima = dr["ntemperaturaminima"].ToString();
                clase.ntemperaturamaxima = dr["ntemperaturamaxima"].ToString();
                clase.npromediominimo = dr["npromediominimo"].ToString();
                clase.npromediomaximo = dr["npromediomaximo"].ToString();
                clase.dfecha = dr["dfecha"].ToString();
                clase.vunidad = dr["vunidad"].ToString();
                clase.TotalRegistros = dr["TotalRegistros"].ToString();
                clase.num = dr["num"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public List<ClimaEntity> ListarNubosidad_DA(string NroDePagina, string RegPorPag)
        {
            List<ClimaEntity> listado = new List<ClimaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_Nubosidad_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@NroDePagina", NroDePagina);
            cmd.Parameters.AddWithValue("@RegPorPag", RegPorPag);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                ClimaEntity clase = new ClimaEntity();
                clase.nidnubosidad = dr["nidnubosidad"].ToString();
                clase.inublado = dr["inublado"].ToString();
                clase.imayormentenublado = dr["imayormentenublado"].ToString();
                clase.iparcialmentenublado = dr["iparcialmentenublado"].ToString();
                clase.imayormentedespejado = dr["imayormentedespejado"].ToString();
                clase.idespejado = dr["idespejado"].ToString();
                clase.dfecha = dr["dfecha"].ToString();
                clase.vunidad = dr["vunidad"].ToString();
                clase.TotalRegistros = dr["TotalRegistros"].ToString();
                clase.num = dr["num"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public List<ClimaEntity> ListarPrecipitacion_DA(string NroDePagina, string RegPorPag)
        {
            List<ClimaEntity> listado = new List<ClimaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_Precipitacion_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@NroDePagina", NroDePagina);
            cmd.Parameters.AddWithValue("@RegPorPag", RegPorPag);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                ClimaEntity clase = new ClimaEntity();
                clase.nidprecipitacion = dr["nidprecipitacion"].ToString();
                clase.iprecipitacion = dr["iprecipitacion"].ToString();
                clase.dfecha = dr["dfecha"].ToString();
                clase.vunidad = dr["vunidad"].ToString();
                clase.TotalRegistros = dr["TotalRegistros"].ToString();
                clase.num = dr["num"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        public string RegistrarTemperatura_DA(string ntemperaturaminima, string ntemperaturamaxima, string npromediominimo,
                                              string npromediomaximo, string dfecha, string tiporegistro, string fechacalientemin,
                                              string fechacalientemax, string fechafriomin, string fechafriomax)
        {
            string respuesta = "";

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_Temperatura_Registrar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ntemperaturaminima", ntemperaturaminima);
            cmd.Parameters.AddWithValue("@ntemperaturamaxima", ntemperaturamaxima);
            cmd.Parameters.AddWithValue("@npromediominimo", npromediominimo);
            cmd.Parameters.AddWithValue("@npromediomaximo", npromediomaximo);
            cmd.Parameters.AddWithValue("@dfecha", dfecha);
            cmd.Parameters.AddWithValue("@tiporegistro", tiporegistro);
            cmd.Parameters.AddWithValue("@fechacalientemin", fechacalientemin);
            cmd.Parameters.AddWithValue("@fechacalientemax", fechacalientemax);
            cmd.Parameters.AddWithValue("@fechafriomin", fechafriomin);
            cmd.Parameters.AddWithValue("@fechafriomax", fechafriomax);


            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return respuesta;
        }
        public string RegistrarNubosidad_DA(string inublado, string imayormentenublado, string iparcialmentenublado, string imayormentedespejado,
                                            string idespejado, string dfecha)
        {
            string respuesta = "";

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_Nubosidad_Registrar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@inublado", inublado);
            cmd.Parameters.AddWithValue("@imayormentenublado", imayormentenublado);
            cmd.Parameters.AddWithValue("@iparcialmentenublado", iparcialmentenublado);
            cmd.Parameters.AddWithValue("@imayormentedespejado", imayormentedespejado);
            cmd.Parameters.AddWithValue("@idespejado", idespejado);
            cmd.Parameters.AddWithValue("@dfecha", dfecha);


            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();

            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return respuesta;
        }
        public string RegistrarPrecipitacion_DA(string iprecipitacion, string dfecha)
        {
            string respuesta = "";

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_Precipitacion_Registrar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@iprecipitacion", iprecipitacion);
            cmd.Parameters.AddWithValue("@dfecha", dfecha);


            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();

            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return respuesta;
        }

        public List<GraficoClimaEntity> GraficarTemperatura_DA(string year)
        {
            List<GraficoClimaEntity> listado = new List<GraficoClimaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_TemperaturaMensual_Graficar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@year", year);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                GraficoClimaEntity clase = new GraficoClimaEntity();

                clase.cadenamin= dr["cadenamin"].ToString();
                clase.cadenamax = dr["cadenamax"].ToString();
                clase.cadenapromediomin = dr["cadenapromediomin"].ToString();
                clase.cadenapromediomax = dr["cadenapromediomax"].ToString();
                clase.desdemax = dr["desdemax"].ToString();
                clase.hastamax = dr["hastamax"].ToString();
                clase.desdemin = dr["desdemin"].ToString();
                clase.hastamin = dr["hastamin"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public List<GraficoClimaEntity> GraficarNubosidad_DA(string year)
        {
            List<GraficoClimaEntity> listado = new List<GraficoClimaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_NubosidadMensual_Graficar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@year", year);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                GraficoClimaEntity clase = new GraficoClimaEntity();

                clase.cadenanublado = dr["cadenanublado"].ToString();
                clase.cadenamaynublado = dr["cadenamaynublado"].ToString();
                clase.cadenaparcnublado = dr["cadenaparcnublado"].ToString();
                clase.cadenamaydespejado = dr["cadenamaydespejado"].ToString();
                clase.cadenadespejado = dr["cadenadespejado"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public List<GraficoClimaEntity> GraficarPrecipitacion_DA(string year)
        {
            List<GraficoClimaEntity> listado = new List<GraficoClimaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_PrecipitacionMensual_Graficar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@year", year);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                GraficoClimaEntity clase = new GraficoClimaEntity();

                clase.cadena = dr["cadena"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public List<smsPrecioUsuario> ValidarCaracteres_DA(string nidusuario)
        {
            List<smsPrecioUsuario> listado = new List<smsPrecioUsuario>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_SMS_Caracteres_Validar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@nidusuario", nidusuario);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                smsPrecioUsuario clase = new smsPrecioUsuario();

                clase.mercado = dr["mercado"].ToString();
                clase.vdescripcion_corta = dr["vdescripcion_corta"].ToString();
                clase.preciopromedio = dr["preciopromedio"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public string EliminarNoticia_DA(string nidnoticia)
        {
            string respuesta = "";

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Noticia_Eliminar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@nidnoticia", nidnoticia);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();

            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return respuesta;
        }

        public List<DatosClima> ObtenerDatosTemperatura_DA()
        {
            List<DatosClima> listado = new List<DatosClima>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_Temperatura_Datos_Obtener", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                DatosClima clase = new DatosClima();

                clase.infotemperatura = dr["infotemperatura"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public List<DatosClima> ObtenerDatosNubosidad_DA()
        {
            List<DatosClima> listado = new List<DatosClima>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_Nubosidad_Datos_Obtener", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                DatosClima clase = new DatosClima();

                clase.infonubosidad = dr["infonubosidad"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public List<DatosClima> ObtenerDatosPrecipitacion_DA()
        {
            List<DatosClima> listado = new List<DatosClima>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_Precipitacion_Datos_Obtener", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                DatosClima clase = new DatosClima();

                clase.infoprecipitacion = dr["infoprecipitacion"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        public List<ClimaEntity> SelectBandasTemperatura_DA()
        {
            List<ClimaEntity> listado = new List<ClimaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_Temperatura_Bandas_Select", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                ClimaEntity clase = new ClimaEntity();
                clase.dfecha = dr["dfecha"].ToString();
                clase.ntemperaturaminima = dr["ntemperaturaminima"].ToString();
                clase.ntemperaturamaxima = dr["ntemperaturamaxima"].ToString();
                clase.npromediominimo = dr["npromediominimo"].ToString();
                clase.npromediomaximo = dr["npromediomaximo"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public List<ClimaEntity> ObtenerBandasTemperatura_DA()
        {
            List<ClimaEntity> listado = new List<ClimaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_Temperatura_Bandas_Obtener", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                ClimaEntity clase = new ClimaEntity();

                clase.dfechafriomin = dr["dfechafriomin"].ToString();
                clase.dfechafriomax = dr["dfechafriomax"].ToString();
                clase.dfechacalientemin = dr["dfechacalientemin"].ToString();
                clase.dfechacalientemax = dr["dfechacalientemax"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public List<ClimaEntity> ListarHorasLuz_DA(string NroDePagina, string RegPorPag)
        {
            List<ClimaEntity> listado = new List<ClimaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_DuracionDia_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@NroDePagina", NroDePagina);
            cmd.Parameters.AddWithValue("@RegPorPag", RegPorPag);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                ClimaEntity clase = new ClimaEntity();
                clase.nidduraciondia = dr["nidduraciondia"].ToString();
                clase.iduraciondia = dr["iduraciondia"].ToString();
                clase.iduracionnoche = dr["iduracionnoche"].ToString();
                clase.dfecha = dr["dfecha"].ToString();
                clase.TotalRegistros = dr["TotalRegistros"].ToString();
                clase.num = dr["num"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public string RegistrarHorasLuz_DA(string iduraciondia, string iduracionnoche, string dfecha)
        {
            string respuesta = "";

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_DuracionDia_Registrar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@iduraciondia", iduraciondia);
            cmd.Parameters.AddWithValue("@iduracionnoche", iduracionnoche);
            cmd.Parameters.AddWithValue("@dfecha", dfecha);


            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return respuesta;
        }
        public List<GraficoClimaEntity> GraficarHorasLuz_DA(string year)
        {
            List<GraficoClimaEntity> listado = new List<GraficoClimaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_DuracionDiaMensual_Graficar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@year", year);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                GraficoClimaEntity clase = new GraficoClimaEntity();

                clase.cadenadia = dr["cadenadia"].ToString();
                clase.cadenanoche = dr["cadenanoche"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public List<DatosClima> ObtenerDatosHorasLuz_DA()
        {
            List<DatosClima> listado = new List<DatosClima>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_DuracionDia_Datos_Obtener", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                DatosClima clase = new DatosClima();

                clase.infoduraciondia = dr["infoduraciondia"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public List<GraficoPrecios> GraficarPreciosVenta_DA(string tipoperiodo, string fechainicio, string fechafin,
                                                                string periodoatras, string cadenaidmercado, string cadenaidproducto)
        {
            List<GraficoPrecios> listado = new List<GraficoPrecios>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Precios_Venta_Graficar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@tipoperiodo", tipoperiodo);
            cmd.Parameters.AddWithValue("@fechainicio", fechainicio);
            cmd.Parameters.AddWithValue("@fechafin", fechafin);
            cmd.Parameters.AddWithValue("@periodoatras", periodoatras);
            cmd.Parameters.AddWithValue("@cadenaidmercado", cadenaidmercado);
            cmd.Parameters.AddWithValue("@cadenaidproducto", cadenaidproducto);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                GraficoPrecios clase = new GraficoPrecios();

                clase.cad1 = dr["cad1"].ToString();
                clase.cad2 = dr["cad2"].ToString();
                clase.cad3 = dr["cad3"].ToString();
                clase.cad4 = dr["cad4"].ToString();
                clase.nombre1 = dr["nombre1"].ToString();
                clase.nombre2 = dr["nombre2"].ToString();
                clase.nombre3 = dr["nombre3"].ToString();
                clase.nombre4 = dr["nombre4"].ToString();
                clase.dia = dr["dia"].ToString();
                clase.mes = dr["mes"].ToString();
                clase.anio = dr["anio"].ToString();
                clase.color1 = dr["color1"].ToString();
                clase.color2 = dr["color2"].ToString();
                clase.color3 = dr["color3"].ToString();
                clase.color4 = dr["color4"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public List<NoticiaEntity> IrNoticia_DA(string nidnoticia)
        {
            List<NoticiaEntity> listado = new List<NoticiaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Noticia_Ver", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@nidnoticia", nidnoticia);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                NoticiaEntity clase = new NoticiaEntity();

                clase.nidnoticia = dr["nidnoticia"].ToString();
                clase.vtitulo = dr["vtitulo"].ToString();
                clase.vcomentario = dr["vcomentario"].ToString();
                clase.vimagen = dr["vimagen"].ToString();
                clase.dfecha = dr["dfecha"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public string EditarTemperatura_DA(string nidtemperatura, string ntemperaturaminima, string ntemperaturamaxima, string npromediominimo,
                                              string npromediomaximo, string dfecha)
        {
            string respuesta = "";

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_Temperatura_Editar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@nidtemperatura", nidtemperatura);
            cmd.Parameters.AddWithValue("@ntemperaturaminima", ntemperaturaminima);
            cmd.Parameters.AddWithValue("@ntemperaturamaxima", ntemperaturamaxima);
            cmd.Parameters.AddWithValue("@npromediominimo", npromediominimo);
            cmd.Parameters.AddWithValue("@npromediomaximo", npromediomaximo);
            cmd.Parameters.AddWithValue("@dfecha", dfecha);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return respuesta;
        }
        public List<UsuarioEntity> EnviarCorreo_UsuarioNuevo_DA()
        {
            List<UsuarioEntity> listado = new List<UsuarioEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Usuario_CrearCuenta_Correo_Enviar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                UsuarioEntity clase = new UsuarioEntity();
                clase.vemail = dr["vemail"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        //********************** GESTION DE CONTENIDOS **********************************************
        public List<Menu> ListarComboMenuPublicoPadreGestCont_DA()
        {
            List<Menu> listado = new List<Menu>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_MenuPublicoPadre_GestCont_Listar_Combo", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                Menu clase = new Menu();
                clase.nidModulo = dr["nidModulo"].ToString();
                clase.vnombre = dr["vnombre"].ToString();
                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        public List<Menu> ListarComboMenuPublicoHijoGestCont_DA(string nidmodulo)
        {
            List<Menu> listado = new List<Menu>();
            SqlCommand cmd = new SqlCommand("SP_RUNATEC_MenuPublicoHijo_GestCont_Listar_Combo", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@nidModulo", nidmodulo);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                Menu clase = new Menu();
                clase.nidModulo = dr["nidModulo"].ToString();
                clase.vnombre = dr["vnombre"].ToString();
                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        public List<GestionContenidoEntity> ListarGestionContenido_DA(string nidmodulopadre, string nidmodulohijo)
        {
            List<GestionContenidoEntity> listado = new List<GestionContenidoEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_GestionContenido_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@nidModuloPadre", nidmodulopadre);
            cmd.Parameters.AddWithValue("@nidModuloHijo", nidmodulohijo);
            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                GestionContenidoEntity clase = new GestionContenidoEntity();
                clase.nidgestioncontenido = dr["nidgestioncontenido"].ToString();
                clase.nidModuloPadre = dr["nidModuloPadre"].ToString();
                clase.nidModuloHijo = dr["nidModuloHijo"].ToString();
                clase.vtitulo = dr["vtitulo"].ToString();
                clase.vdescripcion = dr["vdescripcion"].ToString();
                clase.vdetalle = dr["vdetalle"].ToString();
                clase.vimagen = dr["vimagen"].ToString();
                clase.dfechacreacion = dr["dfechacreacion"].ToString();
                clase.iestado = dr["iestado"].ToString();
                clase.vestado = dr["vestado"].ToString();

                listado.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }


        public List<GestionContenidoEntity> SelectGestionContenido_DA(string nidgestioncontenido)
        {
            List<GestionContenidoEntity> listado = new List<GestionContenidoEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_GestionContenido_Select", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@nidgestioncontenido", nidgestioncontenido);
            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                GestionContenidoEntity clase = new GestionContenidoEntity();
                clase.nidgestioncontenido = dr["nidgestioncontenido"].ToString();
                clase.nidModuloPadre = dr["nidModuloPadre"].ToString();
                clase.nidModuloHijo = dr["nidModuloHijo"].ToString();
                clase.vtitulo = dr["vtitulo"].ToString();
                clase.vdescripcion = dr["vdescripcion"].ToString();
                clase.vdetalle = dr["vdetalle"].ToString();
                clase.vimagen = dr["vimagen"].ToString();
                clase.iestado = dr["iestado"].ToString();
                listado.Add(clase);
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }

        public string Insertar_GestionContenido_DA(string nidModuloPadre, string nidModuloHijo, string vtitulo, string vdescripcion, string vdetalle, string vimagen)
        {
            string respuesta = "";

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_GestionContenido_Insertar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@nidModuloPadre", nidModuloPadre);
            cmd.Parameters.AddWithValue("@nidModuloHijo", nidModuloHijo);
            cmd.Parameters.AddWithValue("@vtitulo", vtitulo);
            cmd.Parameters.AddWithValue("@vdescripcion", vdescripcion);
            cmd.Parameters.AddWithValue("@vdetalle", vdetalle);
            cmd.Parameters.AddWithValue("@vimagen", vimagen);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return respuesta;
        }

        public string Editar_GestionContenido_DA(string nidgestioncontenido, string nidModuloPadre, string nidModuloHijo, string vtitulo, string vdescripcion, string vdetalle, string vimagen, string iestado, string vmodo)
        {
            string respuesta = "";

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_GestionContenido_Editar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@nidgestioncontenido", nidgestioncontenido);
            cmd.Parameters.AddWithValue("@nidModuloPadre", nidModuloPadre);
            cmd.Parameters.AddWithValue("@nidModuloHijo", nidModuloHijo);
            cmd.Parameters.AddWithValue("@vtitulo", vtitulo);
            cmd.Parameters.AddWithValue("@vdescripcion", vdescripcion);
            cmd.Parameters.AddWithValue("@vdetalle", vdetalle);
            cmd.Parameters.AddWithValue("@vimagen", vimagen);
            cmd.Parameters.AddWithValue("@iestado", iestado);
            cmd.Parameters.AddWithValue("@vmodo", vmodo);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return respuesta;
        }
        public List<ClimaEntity> ListarLluvia_DA(string NroDePagina, string RegPorPag)
        {
            List<ClimaEntity> listado = new List<ClimaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_Lluvia_Listar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@NroDePagina", NroDePagina);
            cmd.Parameters.AddWithValue("@RegPorPag", RegPorPag);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                ClimaEntity clase = new ClimaEntity();
                clase.nidlluvia = dr["nidlluvia"].ToString();
                clase.nlluvia = dr["nlluvia"].ToString();
                clase.dfecha = dr["dfecha"].ToString();
                clase.vunidad = dr["vunidad"].ToString();
                clase.TotalRegistros = dr["TotalRegistros"].ToString();
                clase.num = dr["num"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public string RegistrarLluvia_DA(string nlluvia, string dfecha)
        {
            string respuesta = "";

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_Lluvia_Registrar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@nlluvia", nlluvia);
            cmd.Parameters.AddWithValue("@dfecha", dfecha);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return respuesta;
        }
        public List<GraficoClimaEntity> GraficarLluvia_DA(string year)
        {
            List<GraficoClimaEntity> listado = new List<GraficoClimaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_LluviaMensual_Graficar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@year", year);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                GraficoClimaEntity clase = new GraficoClimaEntity();

                clase.cadena = dr["cadena"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public List<DatosClima> ObtenerDatosLluvia_DA()
        {
            List<DatosClima> listado = new List<DatosClima>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Clima_Lluvia_Datos_Obtener", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                DatosClima clase = new DatosClima();

                clase.infolluvia = dr["infolluvia"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public List<GraficoClimaEntity> GraficarPrecipitacion_Nuevo_DA()
        {
            List<GraficoClimaEntity> listado = new List<GraficoClimaEntity>();

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_GraficarPrecipitacion", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                GraficoClimaEntity clase = new GraficoClimaEntity();

                clase.iprecipitacion = dr["iprecipitacion"].ToString();
                clase.dfecha = dr["dfecha"].ToString();

                listado.Add(clase);
            }

            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();
            return listado;
        }
        public string RegistrarLog_DescargasApp_DA(string vusuario)
        {
            string respuesta = "";

            SqlCommand cmd = new SqlCommand("SP_RUNATEC_Log_DescargasApp_Registrar", cn.getcn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@vusuario", vusuario);

            cn.getcn.Open();
            SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                respuesta = dr["respuesta"].ToString();
            }
            dr.Close();
            cmd.Dispose();
            cn.getcn.Close();

            return respuesta;
        }
    }
}