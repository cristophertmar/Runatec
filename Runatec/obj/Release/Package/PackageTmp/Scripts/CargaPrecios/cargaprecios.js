var nombremercado, nidmercado;
var fechaproceso;

$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);

    $('#loading_wrap').css('display', 'none');

    $("#titulo").html('Carga de Precios');


    $("#idImportar").click(function () {
        $('#agregarmercado').css("display", "contents");
        //Imagen de Carga
        Cargando();
        setTimeout(function () { SubirExcel(); $('#loading_wrap').css('display', 'none'); }, 500);
    });



    $("#btnBuscar").click(function () {
        //Imagen de Carga al listar la grilla
        Cargando();
        setTimeout(function () { ListarGrilla(); $('#loading_wrap').css('display', 'none'); }, 500);
    });
    $("#idProcesar").click(function () {
        $('#loading_wrap').css('display', 'block');
        Cargando();
        setTimeout(function () { ProcesarFilas(); $('#loading_wrap').css('display', 'none'); }, 500);
    });

});

function Cargando() {
    $('#loading_wrap').css('display', 'block');
}

function SubirExcel() {

    var nombreExcel = document.getElementById('fileexcel').files[0].name;
    //var nombreExcel = $('#fileexcel')[0].files[0].name;
    var formData = new FormData();
    var file = $('#fileexcel')[0];
    formData.append('file', file.files[0], nombreExcel);

    $.ajax({
        url: '../api/fileUpload',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (d) {
            ImportarExcelAJSON(nombreExcel);
        },
        error: function () {
            alert('Ocurrio un error al subir el archivo');
        }
    });

};

function ImportarExcelAJSON(nombreExcel) {
    var url = "../Uploads/" + nombreExcel;
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function (e) {

        var info = readData();

        LlenarTabla(info);

        function readData() {
            var arraybuffer = oReq.response;

            /* convert data to binary string */
            var data = new Uint8Array(arraybuffer);
            var arr = new Array();
            for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");

            /* Call XLSX */

            var workbook = XLSX.read(bstr, { type: 'binary', cellDates: true, dateNF: 'dd/mm/yyyy;@' });
            //console.log(workbook);
            /* DO SOMETHING WITH workbook HERE */
            var first_sheet_name = workbook.SheetNames[0];

            //Indico la Fecha de Proceso
            var direccion_celda_fecha = 'B1';

            //Indico la direccion de la celda del mercado
            var direccion_celda_idmercado = 'C1';//idmercado
            var direccion_celda_mercado = 'D1';//nombremercado

            /* Get worksheet */
            var worksheet = workbook.Sheets[first_sheet_name];
             
            //Guardo el valor de la direccion en "celda" MERCADO
            //idmercado
            var celda_idmercado = worksheet[direccion_celda_idmercado];
            var valor_idmercado = (celda_idmercado ? celda_idmercado.v : undefined);
            //nombremercado
            var celda_mercado = worksheet[direccion_celda_mercado];
            var valor_mercado = (celda_mercado ? celda_mercado.v : undefined);
            //Guardo el valor de la direccion en "celda" FECHA PROCESO
            var celda_fecha = worksheet[direccion_celda_fecha];
            var valor_fecha = (celda_fecha ? celda_fecha.v : undefined);

            

            var info = XLSX.utils.sheet_to_json(worksheet, { raw: false, range: 1 });

            //Guardo el nombre del mercado en una variable global
            nidmercado = valor_idmercado;
            nombremercado = valor_mercado;

            //Guardo la fecha de proceso en una variable global
            fechaproceso = valor_fecha;
            console.log(info);

            return info;
        }
    }
    oReq.send();
}

function colocarvacio(dato) {
    var newdato = ''

    if (dato == null) {
        newdato = ''
    }
    else {
        newdato = dato;
    }

    return newdato
}

function LlenarTabla(data) {

    var tabla = $("#GridListar");
    var agregarmercado = $("#agregarmercado");
    tabla.empty();
    var i=1;
    if (data.length > 0) {

        var html = '';
        var html0 = '';

        //obtener MES
      //  var mes = '0' + (parseInt(fechaproceso.getMonth()) + parseInt(1));

        //EL MES SE EXTRE SIEMPRE LAS 02 ULTIMAS CADENAS
        //var fechaformateada = fechaproceso.getDate() + '/' + mes.substring(mes.length - 2) + '/' + fechaproceso.getFullYear();

        var fechasis = new Date(fechaproceso.getFullYear(), fechaproceso.getMonth(), fechaproceso.getDate())
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        var fechaformateada= fechasis.toLocaleDateString("en-GB", options);

        html0 += '<td>Mercado</td>';
        html0 += '<td id="mercado">' + nombremercado + '</td>';
        html0 += '<td>Proceso</td>';
        html0 += '<td id="fechaproceso">' + fechaformateada + '</td>';
        
        for (var c = 0; c < data.length; c++) {
            html += '<tr id=fila_' + i + '>';
            html += '<td>' + colocarvacio(data[c]['ID PRODUCTO']) + '</td>';
            html += '<td>' + colocarvacio(data[c]['DESCRIPCION']) + '</td>';
            html += '<td>' + colocarvacio(data[c]['MEDIDA']) + '</td>';
            html += '<td>' + colocarvacio(data[c]['M1']) + '</td>';
            html += '<td>' + colocarvacio(data[c]['M2']) + '</td>';
            html += '<td>' + colocarvacio(data[c]['M3']) + '</td>';
            html += '<td>' + colocarvacio(data[c]['M4']) + '</td>';
            html += '<td>' + colocarvacio(data[c]['M5']) + '</td>';
            html += '<td>' + colocarvacio(data[c]['M6']) + '</td>';
            html += '<td>' + colocarvacio(data[c]['M7']) + '</td>';
            html += '<td>' + colocarvacio(data[c]['M8']) + '</td>';
            html += '<td>' + colocarvacio(data[c]['M9']) + '</td>';
            html += '<td>' + colocarvacio(data[c]['M10']) + '</td>';
            html += '<td id=obs_' + i + '>Pendiente por procesar.</td>';
            html += '</tr>';
            i = i + 1;
        }
        agregarmercado.html(html0);
        tabla.html(html);

    }
    else {

        tabla.append("<tbody>")
        tabla.append(
                        "<center>" +
                        "No hay registro(s) selecionado(s) por los criterios de busqueda" +
                        "</center>");
        tabla.append("</tbody>")
    }

}

/**/
function ProcesarFilas() {
    //$('#loading_wrap').css('display', 'block');
    //CANTIDAD DE FILAS
    var filas = $("#GridListar").find("tr");
    var resultado = "";
    //inicia contador de td del body GridListar
    var c = 1;
    //RECORRER FILAS

    //obtener MES
    //var mes = '0' + (parseInt(fechaproceso.getMonth()) + parseInt(1));
    var fechasis = new Date(fechaproceso.getFullYear(), fechaproceso.getMonth(), fechaproceso.getDate())
    var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    var fechaformateada = fechasis.toLocaleDateString("en-US", options);

    for (i = 0; i < filas.length; i++) {

        var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila

        let Datos = {
            nidmercado: nidmercado,
            dfechaproceso: fechaformateada,
            idproducto: $(celdas[0]).text().trim(),
            vnombreproducto: $(celdas[1]).text().trim(),
            dprecio1:$(celdas[3]).text().trim(),
            dprecio2:$(celdas[4]).text().trim(),
            dprecio3:$(celdas[5]).text().trim(),
            dprecio4:$(celdas[6]).text().trim(),
            dprecio5:$(celdas[7]).text().trim(),
            dprecio6:$(celdas[8]).text().trim(),
            dprecio7:$(celdas[9]).text().trim(),
            dprecio8:$(celdas[10]).text().trim(),
            dprecio9:$(celdas[11]).text().trim(),
            dprecio10:$(celdas[12]).text().trim(),
        };

        let CadenaDatos = JSON.stringify(Datos);

        $.ajax({
            type: "POST",
            url: "../Services/CargarPrecios2",
            data: CadenaDatos,
            dataType: "json",
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.length >= 0) {
                    
                    if (data == 'exito') {

                        $('#fila_' + c).remove();
                        $('#obs_' + c).html('');
                        $('#obs_' + c).prop('title', 'Conforme');
                        $('#obs_' + c).css('green', 'red');
                        $('#obs_' + c).append('<i class="fas fa-check"></i>');
                        $('#agregarmercado').css("display","none");
                    }
                    else {
                        $('#obs_' + c).html('');
                        $('#obs_' + c).prop('title', data);
                        $('#obs_' + c).css('color', 'red');
                        $('#obs_' + c).append('<i class="fas fa-times"></i>');

                    }
                    
                }
            },
            failure: function (response) {
                alert(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 500) {
                    //Se ha producido algún error en el servidor que impide procesar la petición
                    alert('Error interno del servidor.');
                } else if (jqXHR.status == 504) {
                    //El servidor está actuando de proxy entre el navegador y un servidor externo que ha tardado demasiado tiempo en responder
                    alert('Se ha agotado el tiempo de espera del servidor.');
                } else if(jqXHR.status == 408){
                    //El navegador ha tardado demasiado tiempo en realizar la petición, por lo que el servidor la descarta
                    alert("Se ha agotado el tiempo de espera del navegador.");
                } else {
                    alert('Error Inesperado.');
                }
            }
        });

        c = c + 1;

    }
    
    var finalfilas = $("#GridListar").find("tr").length;

    if (finalfilas == 0) {
       
        alert('Los datos fueron registrados.');
    } else {
        alert("Hubo un error al registrar determinados registros, verificar su estado.");
    }

};



//Error:
function OnError(data) {
    alert("Error 404...");
};