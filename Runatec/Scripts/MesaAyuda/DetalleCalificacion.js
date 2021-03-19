var NroPagina = 1;
var j;
var pagina;
$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);
    $("#titulo").html('Detalle de Calificación en Mesa de Ayuda');
    ListarComboCategoriaMA();
    ListarGrilla(NroPagina);

    $("#btn_buscar").click(function () {
        ListarGrilla(NroPagina);
    });

});

function ListarDetalleCalificacion_MesaAyuda(icalificacion, nombreadministrador, dfechainicio, dfechafin, nidcategoria, NroDePagina, RegPorPag) {
    $.ajax({
        type: "POST",
        url: "../Services/ListarDetalleCalificacion_MesaAyuda",
        data: "{icalificacion:'" + icalificacion + "',nombreadministrador:'" + nombreadministrador + "',dfechainicio:'" + dfechainicio +
            "',dfechafin:'" + dfechafin + "',nidcategoria:'" + nidcategoria + "',NroDePagina:'" + NroDePagina + "', RegPorPag:'" + RegPorPag + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarDetalleCalificacionSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarDetalleCalificacionSuccess(data) {
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
            cadena0 = cadena0 + '<td>' + data[i].nidsolicitud + '</td>';
            cadena0 = cadena0 + '<td>' + data[i].dfechaCalificacion + '</td>';
            cadena0 = cadena0 + '<td>' + data[i].categoria + '</td>';
            cadena0 = cadena0 + '<td>' + data[i].nombreproductor + '</td>';
            cadena0 = cadena0 + '<td>' + data[i].nombreadministrador + '</td>';
            cadena0 = cadena0 + '<td>' + data[i].icalificacion + '</td>';
            cadena0 = cadena0 + '<td><a style="cursor:pointer;" onclick="VerDetalle(' + data[i].nidsolicitud + ');" title="Ver Detalle"><i class="fas fa-search"></i></a></td>';
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
    var nidcategoria = $("#select_categoria").val();

    ListarDetalleCalificacion_MesaAyuda(icalificacion, nombreadministrador, dfechainicio, dfechafin, nidcategoria, NroPagina, RegPorPag)
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

function ListarComboCategoriaMA() {

    $.ajax({
        type: "POST",
        url: "../Services/ListarComboCategoriaMA",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarComboCategoriaMASuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError

    });
}

function ListarComboCategoriaMASuccess(data) {

    var select = $("#select_categoria");

    select.empty();

    select.append('<option value="0">--Seleccionar--</option>');
    for (i = 0; i < data.length; i++) {
        select.append("<option value='" + data[i].nidcategoria + "'>" + data[i].vdescripcion + "</option>");
    }
}

function VerDetalle(nidsolicitud) {
    
    $.ajax({
        type: "POST",
        url: "../Services/SelectDetalleCalificacion_MesaAyuda",
        data: "{nidsolicitud:'" + nidsolicitud + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: VerDetalleSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError

    });
}

function VerDetalleSuccess(data) {
    //Estrellas
    $("#td_calificacion").empty();
    for (var i = 0; i < data[0].icalificacion; i++) {
        $("#td_calificacion").append('<i class="fas fa-star"></i>');
    }
    //Solicitud
    $("#txt_fecha_solicitud").val(data[0].dfecha);
    $("#txt_categoria_solicitud").val(data[0].categoria);
    $("#txt_descripcion_solicitud").val(data[0].comentariosolicitud);
    $("#txt_nombres_productor").val(data[0].nombreproductor);
    //Atención
    $("#txt_fecha_atencion").val(data[0].dfechaAtencion);
    $("#txt_descripcion_atencion").val(data[0].comentarioatencion);
    $("#txt_nombres_admin").val(data[0].nombreadministrador);

    MostrarPopupDetalle('Ver calificación - Solicitud N°'+data[0].nidsolicitud+'', 500, 500);
}

function mostrarCentrarDiv(iddiv, w, h) {
    var striddiv = "#" + iddiv;
    var width = w + "px";
    var height = h + "px";
    var mleft = "-" + (w / 2) + "px";
    var mtop = "-" + (h / 2) + "px";
    $(striddiv).css({ 'width': width, 'height': height, 'left': '50%', 'top': '50%', 'margin-left': mleft, 'margin-top': mtop });
    $(striddiv).css('display', 'block');
};

function MostrarPopupDetalle(titulo, ancho, alto) {
    $("#fondoPopup").css('display', 'block');
    $("#tituloPopup").html(titulo);
    mostrarCentrarDiv('PopupDetalle', ancho, alto);
};

function CerrarPopupDetalle() {
    $("#fondoPopup").hide();
    $("#PopupDetalle").hide();
};