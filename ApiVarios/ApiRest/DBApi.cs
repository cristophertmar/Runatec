using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;

namespace ApiVarios.ApiRest
{
    public class DBApi
    {
        public dynamic Post(string url, string json, string autorizacion = null)
        {
            try
            {
                var client = new RestClient(url);
                var request = new RestRequest(Method.POST);
                request.AddHeader("content-type","application/json");
                request.AddParameter("application/json",json,ParameterType.RequestBody);

                if (autorizacion != null){
                    request.AddHeader("Authorization", autorizacion);
                }

                IRestResponse response = client.Execute(request);
                dynamic datos = JsonConvert.DeserializeObject(response.Content);

                return datos;
            }
            catch (Exception)
            {

                return null;
            }
        }
    }
}
