var NroPagina = 1;
var j;
var pagina;
$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);

    $("#titulo").html('Histórico de Precios');
    ListarComboMercado();
    ListarGrilla(NroPagina);

    $("#txtproducto").change(function () {
        ListarGrilla(NroPagina);

    });

    $("#btnBuscar").click(function () {
        ListarGrilla(NroPagina);

    });
});

function Cargando() {

    MostrarPopupProceso('120', '120');
}

function FechaActual() {
    var f = new Date();
    var dia = "" + f.getDate();
    var mes = "" + (f.getMonth() + 1)

    if (parseInt(dia) < 10) {
        dia = "0" + dia;
    }
    if (parseInt(mes) < 10) {
        mes = "0" + mes;
    }
    var fecha = (f.getFullYear() + "-" + mes + "-" + dia);
    return fecha;
}

function ListarHistoricoPrecios(NroDePagina, RegPorPag, dfechainicio, dfechafin, nidmercado, vnombreproducto) {

    $.ajax({
        type: "POST",
        url: "../Services/ListarHistoricoPrecios",
        data: "{NroDePagina:'" + NroDePagina + "', RegPorPag:'" + RegPorPag + "',dfechainicio:'" + dfechainicio + "',dfechafin:'" + dfechafin +
               "', nidmercado:'"+nidmercado+"', vnombreproducto: '"+vnombreproducto+"'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarHistoricoPreciosSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarHistoricoPreciosSuccess(data) {
    var divpaginacion = $("#div_paginacion");
    var cadena = "";
    var regporpag = "20";
    var TotalRegistros = "1";

    var tabla = $("#GridListar");
    tabla.empty();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            tabla.append(
                        '<tr>' +
                            '<td style="display:none;">' + data[i].nidtempdetallehistorial + '</td>' +
                            '<td>' + data[i].num + '</td>' +
                            '<td>' + data[i].dfecha + '</td>' +
                            '<td>' + data[i].vmercado + '</td>' +
                            '<td>' + data[i].vnombreproducto + '</td>' +
                            '<td>' + data[i].vpromedio + '</td>' +
                        '</tr>'
                        );
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
                    if(j==2){
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

    var dfechainicio = $("#txtfechainicio").val();
    var dfechafin = $("#txtfechafin").val();
    var nidmercado=$("#select_mercado").val();
    var vnombreproducto=$("#txtproducto").val();

    var RegPorPag = "20";

    //ListarHistoricoPrecios(NroPagina, RegPorPag,dfechainicio, dfechafin,nidmercado,vnombreproducto);
    Cargando();
    setTimeout(function () {
        ListarHistoricoPrecios(NroPagina, RegPorPag, dfechainicio, dfechafin, nidmercado, vnombreproducto);
        //la variable pagina almacena la pagina actual listada
        pagina = NroPagina;
        $("#pagina_" + pagina).addClass('sombrear');
        CerrarPopupProceso();
    }, 500);

    
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

function ListarComboMercado() {
    $.ajax({
        type: "POST",
        url: "../Services/ListarComboMercado",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: LlenarComboMercado,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError

    });
}

function LlenarComboMercado(data) {
    var selectAgregar = $("#select_mercado");
    selectAgregar.empty();
    selectAgregar.append('<option value="0">--Seleccionar--</option>');
    for (i = 0; i < data.length; i++) {
        selectAgregar.append("<option value='" + data[i].nidmercado + "'>" + data[i].vdescripcion + "</option>");
    }
}

function OnError() {
    alert('Error 404 ...');
}

function ExportarExcel() {

    var dfechainicio = $("#txtfechainicio").val();
    var dfechafin = $("#txtfechafin").val();
    var nidmercado = $("#select_mercado").val();
    var vnombreproducto = $("#txtproducto").val();

    location.href = "../Services/ExportarExcelHistoricoPrecios?dfechainicio=" + dfechainicio + "&dfechafin=" + dfechafin + "&nidmercado=" + nidmercado + "&vnombreproducto=" + vnombreproducto + "";

};
//Popup cargando
function mostrarCentrarDiv(iddiv, w, h) {
    var striddiv = "#" + iddiv;
    var width = w + "px";
    var height = h + "px";
    var mleft = "-" + (w / 2) + "px";
    var mtop = "-" + (h / 2) + "px";
    $(striddiv).css({ 'width': width, 'height': height, 'left': '50%', 'top': '50%', 'margin-left': mleft, 'margin-top': mtop });
    $(striddiv).css('display', 'block');
}
//ABRIR POPUP
function MostrarPopupProceso(ancho, alto) {
    $("#fondoPopup").css('display', 'block');
    mostrarCentrarDiv('PopupEnProceso', ancho, alto);
}
function CerrarPopupProceso() {
    $("#fondoPopup").hide();
    $("#PopupEnProceso").hide();
}