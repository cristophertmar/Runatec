var nidPerfil = sessionStorage.getItem("userperfil");
var NroPagina = 1;
var j;
var pagina;
$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);

    $("#titulo").html('Histórico de Precios');
    //$("#txtfechainicio").val(FechaActual());
    
    $("#txtfechainicio").val(FechaActual());

    $("#txtfechafin").val(FechaActual());

    if (nidPerfil == 3) {//si es productor mostrará los datos 
        ListarComboMercado();
        ListarGrilla(NroPagina);
        $("#contenedor_total").css("display", "block");
    } else {
        alert("Debe registrarse o iniciar sesión para acceder a todos los servicios de Chaskis.");
        window.location = "..";
    }
    $("#txtproducto").change(function () {
        ListarGrilla(NroPagina);

    });

    $("#btnBuscar").click(function () {
        ListarGrilla(NroPagina);

    });

    //Realizar la selección en el select-mercado(fullscreen-select)/mobile
    $(".mobileSelect-control").click(function () {
        $(".mobileSelect-control").removeClass("selected");
        $(this).addClass("selected")
    });
});

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
    //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
    var pathname = window.location.pathname;
    var evaluacadena = pathname.substring(pathname.length - 1);

    var vurl = "";

    if (evaluacadena == '/') {
        vurl = ".." + pathname + "Services/ListarHistoricoPrecios";
    }
    else {
        var pathname = window.location.pathname;
        vurl = ".." + pathname + "/Services/ListarHistoricoPrecios";
    }
    $.ajax({
        type: "POST",
        url: vurl,
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
                '<th scope="row">' + data[i].num + '</th>' +
                '<td>' + data[i].dfecha + '</td>' +
                '<td>' + data[i].vmercado + '</td>' +
                '<td>' + data[i].vnombreproducto + '</td>' +
                '<td>' + data[i].vpromedio + '</td>' +
                '</tr>'
            );
        }
    } 

    divpaginacion.empty();

    cadena = cadena + '<ul class="pagination">';
    if (data.length > 0) {
        var cantidad_paginas = Math.ceil(parseInt(data[0].TotalRegistros) / parseInt(regporpag));
        cadena = cadena + '<li id="id_anterior" class="page-item"><a class="page-link" onclick="Anterior();">&laquo;</a></li>';

        for (j = 1; j <= cantidad_paginas; j++) {
            if (cantidad_paginas <= 10) {
                cadena = cadena + '<li id="pagina_' + j + '" class="page-item"><a class="page-link" onclick="ListarGrilla(' + j + ')">' + j + '</a></li>';
            } else {
                cadena = cadena + '<li id="pagina_' + j + '" class="page-item"><a class="page-link" onclick="ListarGrilla(' + j + ')">' + j + '</a></li>';
                if (j == 2) {
                    cadena = cadena + '<li class="page-item"><a class="page-link">...</a></li> ';
                }
            }
        }
        cadena = cadena + '<li id="id_siguiente" class="page-item" onclick="Siguiente();"><a class="page-link">&raquo;</a></li>';

    } else {
        cadena = cadena + '<li><label style="color:#666; text-align:center;">-- No existen registros con los filtros seleccionados. --</label></li>';
    }
    cadena = cadena + '</ul>';
    divpaginacion.append(cadena);

    //Muestra al inicio las paginación con una parte oculta
    for (var k = 1; k < j; k++) {
        if (cantidad_paginas>10) {
            if (k != 1 && k != 2 && k != cantidad_paginas) {

                $("#pagina_" + k).css("display", "none");

            }
        }
        
    }
    
}

function ListarGrilla(NroPagina) {

    var dfechainicio = $("#txtfechainicio").val();
    var dfechafin = $("#txtfechafin").val();
    var nidmercado=$("#select_mercado").val();
    var vnombreproducto = $("#txtproducto").val();
    var RegPorPag = "20";

    ListarHistoricoPrecios(NroPagina, RegPorPag,dfechainicio, dfechafin,nidmercado,vnombreproducto);

    //la variable pagina almacena la pagina actual listada
    pagina = NroPagina;
    $("#pagina_" + pagina).addClass("active");

    if (pagina == 1) {
        $("#id_anterior").addClass("disabled");
    } if (pagina == j - 1) {
        $("#id_siguiente").addClass("disabled");
    }
}

function Anterior() {
    if (pagina != 1) {
        pagina = pagina - 1; //Actualizo la página
        ListarGrilla(pagina);
        var pag_a = parseInt(pagina) - 1;
        var pag_s = parseInt(pagina) + 1;

        $("#pagina_" + pagina).addClass("active");
        //Muestra la página activada, y su anterior/posterior
        $("#pagina_" + pag_a).css("display", "inline");
        $("#pagina_" + pagina).css("display", "inline");
        $("#pagina_" + pag_s).css("display", "inline");
    }
}
function Siguiente() {
    //la variable j tiene el total de paginas+1
    var totalpaginas = j - 1;
    if (pagina != totalpaginas) {
        pagina = pagina + 1; //Actualizo la página
        ListarGrilla(pagina);
        var pag_a = parseInt(pagina) - 1;
        var pag_s = parseInt(pagina) + 1;
        $("#pagina_" + pagina).addClass("active");
        //Muestra la página activada, y su anterior/posterior
        $("#pagina_" + pag_a).css("display", "inline");
        $("#pagina_" + pagina).css("display", "inline");
        $("#pagina_" + pag_s).css("display", "inline");
    }
}

//function Anterior() {
//    //la variable j tiene el total de paginas+1
//    var total = j - 1;
//    if (pagina != 1) {
//        pagina = pagina - 1;
//        ListarGrilla(pagina);
//        $("#pagina_" + pagina).css("display", "inline-flex");
//        $("#pagina_" + pagina).addClass('sombrear');
//    }

//}
//function Siguiente() {
//    var total = j - 1;
//    if (pagina != total) {
//        pagina = pagina + 1;
//        ListarGrilla(pagina);
//        $("#pagina_" + pagina).css("display", "inline-flex");
//        $("#pagina_" + pagina).addClass('sombrear');
//    }
//}

function ListarComboMercado() {
    //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
    var pathname = window.location.pathname;
    var evaluacadena = pathname.substring(pathname.length - 1);

    var vurl = "";

    if (evaluacadena == '/') {
        vurl = ".." + pathname + "Services/ListarComboMercado";
    }
    else {
        var pathname = window.location.pathname;
        vurl = ".." + pathname + "/Services/ListarComboMercado";
    }
    $.ajax({
        type: "POST",
        url: vurl,
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

function LlenarComboMercado(data) {//Se llena el select y también el div que contiene los valores en la libreria fullscreenselect
    var selectAgregar = $("#select_mercado");
    var list_container = $(".list-container");
    var span = $(".text");
    selectAgregar.empty();
    list_container.empty();
    span.empty();
    selectAgregar.append('<option value="0">-- Seleccione mercado--</option>');
    list_container.append('<a href="#" class="mobileSelect-control" undefined data-value="0">-- Seleccione mercado --</a>');
    span.append('<span class="text">--Seleccionar--</span>')
    for (i = 0; i < data.length; i++) {
        selectAgregar.append("<option value='" + data[i].nidmercado + "'>" + data[i].vdescripcion + "</option>");
        list_container.append("<a href='#' class='mobileSelect-control' undefined data-value=" + data[i].nidmercado + ">" + data[i].vdescripcion + "</a>");
    }
}

function OnError() {
    alert('Error 404 ...');
}
