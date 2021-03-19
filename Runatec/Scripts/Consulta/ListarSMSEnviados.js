var NroPagina = 1;
var j;
var pagina;
$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);

    $("#titulo").html('Listado de SMS enviados');

    $("#txt_fecha").val(FechaSistema());
    ListarGrilla(NroPagina);
    $("#btnBuscar").click(function () {
        ListarGrilla(NroPagina);
    });

});

function FechaSistema() {
    var f = new Date();

    var dia = "" + f.getDate();
    var mes = "" + (f.getMonth() + 1)
    var aniofinal = "" + (f.getFullYear())

    if (parseInt(dia) < 10) {
        dia = "0" + dia;
    }
    if (parseInt(mes) < 10) {
        mes = "0" + mes;
    }
    var fechaSistema = (f.getFullYear() + "-" + mes + "-" + dia);
    return fechaSistema;
}

function ListarSMSEnviados(NroDePagina, RegPorPag, vcelular, vtipo, dfecha) {

    $.ajax({
        type: "POST",
        url: "../Services/LogEnviosEntity",
        dataType: "json",
        data: "{NroDePagina:'" + NroDePagina + "', RegPorPag:'" + RegPorPag + "',vcelular:'" + vcelular + "',vtipo:'" + vtipo + "',dfecha:'" + dfecha + "'}",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarSMSEnviadosSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarSMSEnviadosSuccess(data) {
    var divpaginacion = $("#div_paginacion");
    var cadena = "";
    var regporpag = "10";
    var TotalRegistros = "1";
    
    var i = 1;

    var item = 1;
    var tabla = $("#GridListar");

    tabla.empty();

    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            tabla.append(
                        '<tr>' +
                            '<td style="display:none;" id="nidlogenvios_' + item + '">' + data[i].nidlogenvios+ '</td>' +
                            '<td>' + data[i].vusuario + '</td>' +
                            '<td id="td_celular_' + item + '">' + data[i].vcelular + '</td>' +
                            '<td id="td_fecha_' + item + '">' + data[i].dfecha + '</td>' +
                            '<td id="td_tipo_' + item + '">' + data[i].vtipo + '</td>' +
                            '<td id="td_estado_' + item + '">' + data[i].vEstado + '</td>' +
                            '<td class="vlogdescripcion" id="td_descripcion_' + item + '"><span style="padding:0 10px;">' + data[i].vlogdescripcion + '</span></td>' +
                        '</tr>'
                        )
            item = item + 1;
        }
    }

    divpaginacion.empty();

    cadena = cadena + '<ul class="contenido_paginacion">';
    if (data.length > 0) {
        var cantidad_paginas = Math.ceil(parseInt(data[0].TotalRegistros) / parseInt(regporpag));

        cadena = cadena + '<li class="pagina"><a onclick="Anterior();"><i class="fas fa-angle-left"></i></a></li>'

        if (parseInt(data[0].TotalRegistros) > parseInt(regporpag)) {
            for (j = 1; j <= cantidad_paginas ; j++) {
                if (cantidad_paginas <= 10) {
                    cadena = cadena + '<li id="pagina_' + j + '" class="pagina"><a onclick=ListarGrilla(' + j + ')>' + j + '</a></li>';
                } else {
                    cadena = cadena + '<li id="pagina_' + j + '" class="pagina"><a onclick=ListarGrilla(' + j + ')>' + j + '</a></li>';
                    if (j == 2) {
                        cadena = cadena + ' ... ';
                    }
                }
            }
        } else {
            cadena = cadena + '<li class="pagina"><a onclick="ListarGrilla(1);">1</a></li>';

            NroPagina = 1;
        }
        cadena = cadena + '<li class="pagina"><a onclick="Siguiente();"><i class="fas fa-angle-right"></i></a></li>'
    }
    else {
        cadena = cadena + '<li class="pagina">-- No existen registros con los filtros seleccionados --</li>';
        NroPagina = 1;
    }
    cadena = cadena + '</ul>';
    divpaginacion.append(cadena);

    for (var k = 1; k < j; k++) {
        if (k != 1 && k != 2 && k != cantidad_paginas) {

            $("#pagina_" + k).css("display", "none");

        }
    }
    if (cantidad_paginas <= 10) {
        for (var k = 1; k < j; k++) {
            $("#pagina_" + k).css("display", "inline-flex");
        }
    }
}

function ListarGrilla(NroPagina) {
    var vcelular = $("#txt_celular").val();
    var vtipo = $("#txt_tipo").val();
    var dfecha = $("#txt_fecha").val();

    var RegPorPag = "10";

    ListarSMSEnviados(NroPagina, RegPorPag, vcelular, vtipo, dfecha);


    //la variable pagina almacena la pagina actual listada
    pagina = NroPagina;
    $("#pagina_"+pagina).addClass('sombrear');

}

function Anterior() {
    //la variable j tiene el total de paginas+1
    var total = j - 1;
    if (pagina != 1) {
        pagina = pagina - 1;
        ListarGrilla(pagina);
        $("#pagina_" + pagina).css("display", "inline-flex");
        $("#pagina_" + pagina).addClass('sombrear');
    }

}
function Siguiente() {
    var total = j - 1;
    if (pagina != total) {
        pagina = pagina + 1;
        ListarGrilla(pagina);
        $("#pagina_" + pagina).css("display", "inline-flex");
        $("#pagina_" + pagina).addClass('sombrear');
    }
}
