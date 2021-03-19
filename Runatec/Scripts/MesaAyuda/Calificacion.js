var NroPagina = 1;
var j;
var pagina;
$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);
    $("#titulo").html('Calificación en Mesa de Ayuda');

    ListarGrilla(NroPagina);

    $("#btn_buscar").click(function () {
        ListarGrilla(NroPagina);
    });

    $("#VerDetalle").click(function () {
        window.location = "../MesaAyuda/DetalleCalificacion";
    });

});

function ListarCalificacion(icalificacion, nombreadministrador, dfechainicio, dfechafin, NroDePagina, RegPorPag) {
    $.ajax({
        type: "POST",
        url: "../Services/ListarCalificacion_MesaAyuda",
        data: "{icalificacion:'" + icalificacion + "',nombreadministrador:'" + nombreadministrador + "',dfechainicio:'" + dfechainicio +
            "',dfechafin:'" + dfechafin + "',NroDePagina:'" + NroDePagina + "',RegPorPag:'" + RegPorPag + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarCalificacionSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarCalificacionSuccess(data) {

    //***********
    var divpaginacion = $("#div_paginacion");
    var cadena = "";
    var cadena0 = "";

    var regporpag = "20";

    var item = 1;
    var tabla = $("#tbody_listar");
    tabla.empty();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            cadena0 = cadena0 + '<tr>';
            cadena0 = cadena0 + '<td>' + data[i].cantidad + '</td>';
            cadena0 = cadena0 + '<td>' + data[i].nombreadministrador + '</td>';
            if (data[i].promcalificacion == 1) {
                cadena0 = cadena0 + '<td class="td_star"><i class="fas fa-star"></i></td>';
            } else if (data[i].promcalificacion == 2) {
                cadena0 = cadena0 + '<td class="td_star"><i class="fas fa-star"></i><i class="fas fa-star"></i></td>';
            } else if (data[i].promcalificacion == 3) {
                cadena0 = cadena0 + '<td class="td_star"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></td>';
            } else if (data[i].promcalificacion == 4) {
                cadena0 = cadena0 + '<td class="td_star"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></td>';
            } else if (data[i].promcalificacion == 5) {
                cadena0 = cadena0 + '<td class="td_star"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></td>';
            }
            cadena0 = cadena0 + '<td><a style="cursor:pointer;" onclick="DetallarCalificacion(' + data[i].nidusuarioadm + ');" title="Ver Detalle"><i class="fas fa-clipboard-list"></i></a></td>';
            cadena0 = cadena0 + '</tr>';
            
            item = item + 1;
        }

    }
    tabla.append(cadena0);
    divpaginacion.empty();

    cadena = cadena + '<ul class="contenido_paginacion">';
    if (data.length > 0) {
        var cantidad_paginas = Math.ceil(parseInt(data[0].TotalRegistros) / parseInt(regporpag));

        cadena = cadena + '<li class="pagina"><a onclick="Anterior();"><i class="fas fa-angle-left"></i></a></li>'

        if (parseInt(data[0].TotalRegistros) > parseInt(regporpag)) {
            for (j = 1; j <= cantidad_paginas; j++) {
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
    //***********
}
function ListarGrilla(NroPagina) {

    var RegPorPag = "20";
    var icalificacion = $("#select_calificacion").val();
    var nombreadministrador = $("#txt_usuario").val();
    var dfechainicio = $("#txt_fechainicio").val();
    var dfechafin = $("#txt_fechafin").val();

    ListarCalificacion(icalificacion, nombreadministrador, dfechainicio, dfechafin, NroPagina, RegPorPag);

    //la variable pagina almacena la pagina actual listada
    pagina = NroPagina;
    $("#pagina_" + pagina).addClass('sombrear');
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

function DetallarCalificacion(nidusuarioadm) {
    $.ajax({
        type: "POST",
        url: "../Services/DetallarCalificacionPorAdm_MesaAyuda",
        data: "{nidusuarioadm:'" + nidusuarioadm + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: DetallarCalificacionSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}
/*LISTARDETALLES*/
function DetallarCalificacionSuccess(data) {
var tbody = $("#tbody_detallecalificacion");
var cadena = "";
tbody.empty();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            cadena = cadena + '<tr>';
            cadena = cadena + '<td>'+data[i].dfecha+'</td>';
            cadena = cadena + '<td>' + data[i].nombreproductor + '</td>';
            cadena = cadena + '<td>' + data[i].nombreoperador + '</td>';
            cadena = cadena + '<td>' + data[i].categoria + '</td>';
            if (data[i].icalificacion == 1) {
                cadena = cadena + '<td class="td_star"><i class="fas fa-star"></i></td>';
            } else if (data[i].icalificacion == 2) {
                cadena = cadena + '<td class="td_star"><i class="fas fa-star"></i><i class="fas fa-star"></i></td>';
            } else if (data[i].icalificacion == 3) {
                cadena = cadena + '<td class="td_star"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></td>';
            } else if (data[i].icalificacion == 4) {
                cadena = cadena + '<td class="td_star"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></td>';
            } else if (data[i].icalificacion == 5) {
                cadena = cadena + '<td class="td_star"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></td>';
            }
            cadena = cadena + '</tr>';
        }     
    }
    tbody.append(cadena);
    MostrarPopupCalificacion('Detalle de Calificaciones',900,450);
}

//Popup Detalle de Calificaciones
//$("#PopupCalificacion").draggable();

function mostrarCentrarDiv(iddiv, w, h) {
    var striddiv = "#" + iddiv;
    var width = w + "px";
    var height = h + "px";
    var mleft = "-" + (w / 2) + "px";
    var mtop = "-" + (h / 2) + "px";
    $(striddiv).css({ 'width': width, 'height': height, 'left': '50%', 'top': '50%', 'margin-left': mleft, 'margin-top': mtop });
    $(striddiv).css('display', 'block');
};

function MostrarPopupCalificacion(titulo, ancho, alto) {
    $("#fondoPopup").css('display', 'block');
    $("#tituloPopup").html(titulo);
    mostrarCentrarDiv('PopupCalificacion', ancho, alto);
};

function CerrarPopupCalificacion() {
    $("#fondoPopup").hide();
    $("#PopupCalificacion").hide();
};
