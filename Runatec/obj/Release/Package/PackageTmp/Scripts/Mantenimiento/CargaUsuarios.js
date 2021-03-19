var vdepartamento, vprovincia, vdistrito;
$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);

    $("#titulo").html('Carga de Usuarios');

    $("#btnImportarUsuario").click(function () {
        $('#agregarcomunidad').css("display", "contents");
        SubirExcel();
    });

    $("#btnProcesarUsuario").click(function () {
        $('#loading_wrap').css('display', 'block');
        // setTimeout(ProcesarFilas,3000);
        ProcesarFilas();
    });

});

function SubirExcel() {

    var nombreExcel = document.getElementById('excelusuario').files[0].name;
    //var nombreExcel = $('#fileexcel')[0].files[0].name;
    var formData = new FormData();
    var file = $('#excelusuario')[0];
    formData.append('file', file.files[0], nombreExcel);

    $.ajax({
        url: '../api/fileUpload2',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (d) {
            ImportarExcelAJSON(nombreExcel);
        },
        error: function () {
            alert('Ocurrio un error al subir el archivo.');
        }
    });

};

function ImportarExcelAJSON(nombreExcel) {
    var url = "../UploadsUser/" + nombreExcel;
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

            //Indico la direccion de la celda del mercado
            var direccion_celda_departamento = 'C1';//departamento
            var direccion_celda_provincia = 'D1';//provincia
            var direccion_celda_distrito = 'E1';//distrito

            /* Get worksheet */
            var worksheet = workbook.Sheets[first_sheet_name];

            //Guardo el valor de la direccion en "celda" MERCADO
            //departamento
            var celda_departamento = worksheet[direccion_celda_departamento];
            var valor_departamento = (celda_departamento ? celda_departamento.v : undefined);
            //provincia
            var celda_provincia = worksheet[direccion_celda_provincia];
            var valor_provincia = (celda_provincia ? celda_provincia.v : undefined);
            //distrito
            var celda_distrito = worksheet[direccion_celda_distrito];
            var valor_distrito = (celda_distrito ? celda_distrito.v : undefined);


            var info = XLSX.utils.sheet_to_json(worksheet, { raw: false, range: 1 });

            //Guardo los valores en variables globales
            vdepartamento = valor_departamento;
            vprovincia = valor_provincia;
            vdistrito = valor_distrito;
            
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
    var agregarcomunidad = $("#agregarcomunidad");
    tabla.empty();
    var i = 1;
    if (data.length > 0) {

        //alert(data);

        var html = '';
        var html0 = '';

        html0 += '<td>Ubigeo</td>';
        html0 += '<td id="ubigeo">' + vdepartamento + ' - ' + vprovincia + ' - ' + vdistrito + '</td>';

        for (var c = 0; c < data.length; c++) {
            html += '<tr id=fila_' + i + '>';
                html += '<td>' + i + '</td>';
                html += '<td>' + colocarvacio(data[c]['Nombres']) + '</td>';
                html += '<td>' + colocarvacio(data[c]['Apellido Paterno']) + '</td>';
                html += '<td>' + colocarvacio(data[c]['Apellido Materno']) + '</td>';
                html += '<td>' + colocarvacio(data[c]['DNI']) + '</td>';
                html += '<td>' + colocarvacio(data[c]['Celular']) + '</td>';
                html += '<td id=obs_' + i + '>Pendiente por procesar.</td>';
            html += '</tr>';
            i = i + 1;
        }
        agregarcomunidad.html(html0);
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
    for (i = 0; i < filas.length; i++) {

        var celdas = $(filas[i]).find("td"); //devolverá las celdas de una fila
        var vubigeo = vdepartamento + ' - ' + vprovincia + ' - ' + vdistrito;
        let Datos = {
            vnombres: $(celdas[1]).text().trim(),
            vpaterno: $(celdas[2]).text().trim(),
            vmaterno: $(celdas[3]).text().trim(),
            vdni: $(celdas[4]).text().trim(),
            vcelular: $(celdas[5]).text().trim(),
            vubigeo: $(celdas[6]).text().trim(),
        };

        let CadenaDatos = JSON.stringify(Datos);

        $.ajax({
            type: "POST",
            url: "../Services/CargarUsuarios",
            data: CadenaDatos,
            dataType: "json",
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.length >= 0) {

                    if (data == 'true') {


                        $('#fila_' + c).remove();
                        $('#obs_' + c).html('');
                        $('#obs_' + c).prop('title', 'Conforme');
                        $('#obs_' + c).css('green', 'red');
                        $('#obs_' + c).append('<i class="fas fa-check"></i>');
                        $('#agregarmercado').css("display", "none");
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
            error: OnError
        });

        c = c + 1;

    }

    var finalfilas = $("#GridListar").find("tr").length;

    if (finalfilas == 0) {

        alert('Los datos fueron registrados.');
    }

    setTimeout(TiempoEspera, 500);

}

/**/

function TiempoEspera() {

    $('#loading_wrap').css('display', 'none');

}

//Error:
function OnError(data) {
    alert("Error 404...");
};