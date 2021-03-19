var NroPagina = 1;
var j;
var pagina;
var idcategoria, respuesta;
var nidusuario = sessionStorage.getItem("nidusuario");
$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);
    $("#titulo").html('Solicitudes de Mesa de Ayuda');
    
    ObtenerCategoria();
    ListarComboCategoriaMA();
    ListarComboEstadoMA();

    $("#select_estado").val(1);//Por defecto muestran las solicitudes de estado abierto
    $("#select_categoria").val(idcategoria);//Por defecto muestra las solicitudes que le pertenecen al usuario de la sesión
    ListarGrilla(NroPagina);

    $("#btn_buscar").click(function () {
        ListarGrilla(NroPagina);
    });

});

function ObtenerCategoria() {
    $.ajax({
        type: "POST",
        url: "../Services/ObtenerCategoria_MesaAyuda",
        data: "{nidusuario:'" + nidusuario + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                idcategoria = data;
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarSolicitudMesaAyuda(vusuario, nidcategoria, iestado, NroDePagina, RegPorPag) {
    $.ajax({
        type: "POST",
        url: "../Services/ListarSolicitudMesaAyuda",
        data: "{vusuario:'" + vusuario + "',nidcategoria:'" + nidcategoria + "',iestado:'" + iestado +
                "',NroDePagina:'" + NroDePagina + "',RegPorPag:'" + RegPorPag + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarSolicitudMesaAyudaSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarSolicitudMesaAyudaSuccess(data) {

    //***********
    var divpaginacion = $("#div_paginacion");
    var cadena = "";
    var regporpag = "20";

    var item = 1;
    var tabla = $("#tbody_listar");
    tabla.empty();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].estado == 'ATENDIDA' || data[i].estado == 'CERRADA') {
                tabla.append(
                    '<tr>' +
                    '<td>' + data[i].nidsolicitud + '</td>' +
                    '<td>' + data[i].nombresadm + '</td>' +
                    '<td>' + data[i].asunto + '</td>' +
                    '<td>' + data[i].categoria + '</td>' +
                    '<td>' + data[i].estado + '</td>' +
                    '<td><a style="cursor:pointer;" onclick="AvisoAtendida();" title="Atender"><i class="fas fa-concierge-bell"></i></a></td>' +
                    '</tr>'
                );
            } else {
                tabla.append(
                    '<tr>' +
                    '<td>' + data[i].nidsolicitud + '</td>' +
                    '<td>' + data[i].nombresadm + '</td>' +
                    '<td>' + data[i].asunto + '</td>' +
                    '<td>' + data[i].categoria + '</td>' +
                    '<td>' + data[i].estado + '</td>' +
                    '<td><a style="cursor:pointer;" onclick=Atender(' + data[i].nidusuario + ',' + data[i].nidsolicitud + ','+data[i].nidcategoria+'); title="Atender"><i class="fas fa-concierge-bell"></i></a></td>' +
                    '</tr>'
                );
            }
            
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
    //***********
}
function ListarGrilla(NroPagina) {
    
    var RegPorPag = "20";
    var vusuario = $("#txt_usuario").val();
    var nidcategoria = $("#select_categoria").val();
    var iestado = $("#select_estado").val();
    ListarSolicitudMesaAyuda(vusuario, nidcategoria, iestado, NroPagina, RegPorPag);

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

function ListarComboEstadoMA() {

    $.ajax({
        type: "POST",
        url: "../Services/ListarComboEstadoMA",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarComboEstadoMASuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError

    });
}

function ListarComboEstadoMASuccess(data) {

    var select = $("#select_estado");

    select.empty();

    select.append('<option value="0">--Seleccionar--</option>');
    for (i = 0; i < data.length; i++) {
        select.append("<option value='" + data[i].nidestado + "'>" + data[i].vdescripcion + "</option>");
    }
}

function PermitirCategoria(nidusuario, nidcategoria) {
    $.ajax({
        type: "POST",
        url: "../Services/PermitirCategoria_MesaAyuda",
        data: "{nidusuario:'" + nidusuario + "', nidcategoria:'" + nidcategoria + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data == 'true') {
                    respuesta = 'permite';
                } else if (data == 'false') {
                    respuesta = 'nopermite';
                }
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function Atender(idusuario, nidsolicitud, nidcategoria) {
    //sessionStorage.setItem("nidsolicitud", nidsolicitud);
    sessionStorage.setItem("idusuario", idusuario);

    PermitirCategoria(nidusuario, nidcategoria);

    if (respuesta == 'permite') {
        window.location = "../MesaAyuda/AtenderSolicitud?nidsol=" + nidsolicitud + "";
    } else if ('nopermite') {
        var opcion = confirm("Esta solicitud pertenece a otro administrador, ¿Está seguro que desea atenderla?");
        if (opcion == true) {
            
            window.location = "../MesaAyuda/AtenderSolicitud?nidsol=" + nidsolicitud + "";
            //ENVIAR CORREO AL ADM INICIAL
        } else {
            alert("no");
            //NO
        }
    }

    /*
         if (nidusuario != idusuario) {//Si la solicitud NO le pertenece al usuario
        var opcion = confirm("Esta solicitud pertenece a otro administrador, ¿Está seguro que desea atenderla?");
        if (opcion == true) {
            alert("si");
            window.location="../MesaAyuda/AtenderSolicitud";
            //ENVIAR CORREO AL ADM INICIAL
        } else {
            alert("no");
            //NO
        }
    } else {//Si la solicitud le pertenece al usuario
        window.location="../MesaAyuda/AtenderSolicitud";
    }
     */

}

function AvisoAtendida() {
    alert("Esta consulta ya ha sido atendida.");
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
function OnError() {
    alert("Error 404..");
}