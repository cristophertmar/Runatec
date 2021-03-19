var idusuario;
var NroDePagina = 1;
var j;
var pagina;

$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);
    $("#titulo").html("Calificación");

    $("#select_estado").val('PENDIENTE');
    ListarGrilla(NroDePagina);

    $("#btnBuscar").click(function () {
        ListarGrilla(NroDePagina);
    });

    $("#btn_aprobar").click(function () {
            alert("La cuenta ha sido aprobada.");
            CerrarPopupConfirmar();
            CalificarCuentaUsuario(idusuario, 1);
    });
    $("#btn_rechazar").click(function () {
        var opcion = confirm("¿Está seguro que desea rechazar la cuenta?");
        if (opcion == true) {
            CalificarCuentaUsuario(idusuario, 2);
            alert("La cuenta ha sido rechazada.");
            CerrarPopupConfirmar();
        } else {
            CerrarPopupConfirmar();
        }
    });
});

function ListarCuentasUsuario(iestado, nombres, NroDePagina, RegPorPag) {
    
    $.ajax({
        type: "POST",
        url: "../Services/ListarCuentasUsuario",
        data: "{iestado:'" + iestado + "', nombres:'" + nombres + "',NroDePagina:'" + NroDePagina + "',RegPorPag:'"+RegPorPag+"'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarCuentasUsuarioSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarCuentasUsuarioSuccess(data) {
    var divpaginacion = $("#div_paginacion");
    var cadena = "";
    var regporpag = "20";
    var TotalRegistros = "1";

    var aviso = $("#aviso");
    var tbody = $("#GridListar");
    var modo_aprobar, modo_rechazar;

    tbody.empty();
    aviso.empty();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {

            tbody.append(
                            '<tr>' +
                                '<td>' + data[i].dfechaCreacion + '</td>' +
                                '<td id=nidusuario_' + i + ' style="display:none;">' + data[i].nidusuario + '</td>' +
                                '<td>' + data[i].vperfil + '</td>' +
                                '<td>' + data[i].vusuario + '</td>' +
                                '<td>' + data[i].nombre + '</td>' +
                                '<td>' + data[i].vsexo + '</td>' +
                                '<td>' + data[i].vemail + '</td>' +
                                '<td>' + data[i].iestado + '</td>' +
                                '<td><a onclick=" MostrarPopupConfirmar(' + data[i].nidusuario + ',300,120);" title="Aprobar/Rechazar"><i class="fas fa-user-check iconocalificar"></i></a></td>' +
                            '</tr>'
                    );
        }
    } else {
        
        aviso.append('<label>-- No existen registros con el filtro seleccionado. --</label>');
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
        //cadena = cadena + '<li class="pagina">-- No existen registros con los filtros seleccionados --</li>';
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

function ListarGrilla(NroDePagina) {

    var RegPorPag = "20";

    var iestado = $("#select_estado").val();
    var nombres = $("#txt_nombres").val();
    ListarCuentasUsuario(iestado, nombres, NroDePagina, RegPorPag);
    //la variable pagina almacena la pagina actual listada
    pagina = NroDePagina;
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

function CalificarCuentaUsuario(nidusuario, iestado) {
    $.ajax({
        type: "POST",
        url: "../Services/AprobarCuentasUsuario",
        data: "{nidusuario:'" + nidusuario + "', iestado:'" + iestado + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data[0].respuesta == 'true') {
                    ListarGrilla(NroDePagina);
                    if(data[0].iestado == 1){//Si el estado es ACTIVO, es decir, se aprobó al usuario
                        EnviarCorreo_ConfirmarCuenta(data);
                    }
                }
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function EnviarCorreo_ConfirmarCuenta(data) {
    var vemail = data[0].vemail;
    var vdescripcion = data[0].vdescripcion;
    var vusuario = data[0].vusuario;

    var destino = vemail;
    var asunto = 'Gracias por suscribirte a CHASKIS.';
    var mensaje = 'Bienvenido(a): ' + vdescripcion +'. '+
        'Su cuenta en chaskis.net se encuentra activa, si desea puede acceder por nuestro Web Site: ' +
        'https://www.chaskis.net/Login/Login o utilizar el app: Chaskis Móvil.<br/>' +
        'Gracias.';

    $.ajax({
        type: "POST",
        url: "../Services/EnviarCorreo_Cuenta",
        data: "{destino:'" + destino + "', asunto:'" + asunto + "', allmensaje:'" + mensaje + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: EnviarCorreoSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: EnviarCorreoError
    });

}

function EnviarCorreoSuccess() {

};

function EnviarCorreoError() {
    alert('Ocurrió un error al enviar el correo');
};

//PopUp Confirmación
$("#PopupConfirmar").draggable();

function mostrarCentrarDiv(iddiv, w, h) {
    var striddiv = "#" + iddiv;
    var width = w + "px";
    var height = h + "px";
    var mleft = "-" + (w / 2) + "px";
    var mtop = "-" + (h / 2) + "px";
    $(striddiv).css({ 'width': width, 'height': height, 'left': '50%', 'top': '50%', 'margin-left': mleft, 'margin-top': mtop });
    $(striddiv).css('display', 'block');
};

function MostrarPopupConfirmar(id,ancho, alto) {
    $("#fondoPopup").css('display', 'block');
    mostrarCentrarDiv('PopupConfirmar', ancho, alto);
    idusuario = id;
};

function CerrarPopupConfirmar() {
    $("#fondoPopup").hide();
    $("#PopupConfirmar").hide();
};


