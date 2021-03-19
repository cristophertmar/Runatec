var enviarMensaje;
$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);

    var nidPerfil = sessionStorage.getItem("userperfil");
    var nidUsuario = sessionStorage.getItem("nidusuario");

    //Redirigir a la página seleccionada cuando el usuario inicie sesión
    var path = window.location.pathname;
    var search = window.location.search;//query string (key)
    var enlace = path + search;

    sessionStorage.setItem("enlace", enlace);

    if(nidUsuario==null){
        alert("Inicie Sesión.");
        window.location = "../Login/Login";

    } else {
        ListarMenuPrincipal(nidPerfil);
        var nidUsuario = sessionStorage.getItem("nidusuario");
    }
    //EnviaCorreoAuto_MA();//Mesa de Ayuda
    //EnviaCorreoAuto_UN();//Usuario Nuevo
});

function ListarMenuPrincipal(nidPerfil) {

    //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
    var pathname = window.location.pathname;
    var evaluacadena = pathname.substring(pathname.length - 1);

    if (evaluacadena != '/') {
        var pathname = window.location.pathname;
    }

    $.ajax({
        type: "POST",
        url: "../Services/ListarMenuPrincipal",
        data: "{ nidPerfil:'" + nidPerfil + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarMenuPrincipalSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}


function ListarMenuPrincipalSuccess(data) {

    var lista = $("#menu");
    var idmodulopadre_nivel1, idmodulopadre_nivel2, hijo_nivel1, hijo_nivel2;
    var cadena = "";

    lista.empty();

    if (data.length > 0) {

        //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
        var pathname = window.location.pathname;
        var evaluacadena = pathname.substring(pathname.length - 1);

        if (evaluacadena != '/') {

            var pathname = window.location.pathname;
        }


        //--------- NIVEL PRINCIPAL DEL MENU-----------
        for (i = 0; i < data.length; i++) {

            idmodulopadre_nivel1 = data[i].nidModulo;
            var nidmodulopadre = data[i].nidmodulopadre;
            var ipadre = data[i].ipadre;

            if (ipadre == 1) {
                cadena = cadena + "<li>" + "<a id='" + data[i].id + "' onclick=AbrePagina('" + data[i].vurl + "')>" + data[i].vnombre + " <i class='fas fa-caret-down'></i></a>"
            }
            else {
                cadena = cadena + "<li>" + "<a id='" + data[i].id + "' onclick=AbrePagina('" + data[i].vurl + "')>" + data[i].vnombre + "</a>";
            }

            $.ajax({
                type: "POST",
                url: "../Services/ListarSubMenuNivelUno",
                data: "{nidPerfil:'" + sessionStorage.getItem("userperfil") + "',ModuloPadre:'" + data[i].nidModulo + "'}",
                dataType: "json",
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (data) {

                    if (data.length > 0) {

                        //---------PRIMER NIVEL DEL MENU-----------

                        cadena = cadena + "<ul class='children'>";

                        for (j = 0; j < data.length; j++) {
                            if (data[j].hijos == 1) {
                                cadena = cadena + "<li>" + "<a id='" + data[j].id + "' onclick=AbrePagina('" + data[j].vurl + "')>" + data[j].vnombre + "<i style='padding-left:10px;' class='fas fa-caret-right'></i></a>";
                            } else {
                                cadena = cadena + "<li>" + "<a id='" + data[j].id + "' onclick=AbrePagina('" + data[j].vurl + "')>" + data[j].vnombre + "</a>";
                            }

                            $.ajax({
                                type: "POST",
                                url: "../Services/ListarSubMenuNivelDos",
                                data: "{ nidPerfil:'" + sessionStorage.getItem("userperfil") + "',ModuloPadre:'" + data[j].nidModulo + "'}",
                                dataType: "json",
                                async: false,
                                contentType: "application/json; charset=utf-8",
                                success: function (data) {
                                    if (data.length > 0) {

                                        //---------INICIO SEGUNDO NIVEL DEL MENU-----------
                                        cadena = cadena + "<ul class='children'>";

                                        for (k = 0; k < data.length; k++) {
                                            
                                            cadena = cadena + "<li>" + "<a id='" + data[k].id + "' onclick=AbrePagina('" + data[k].vurl + "')>" + data[k].vnombre + "</a>";
                                            cadena = cadena + "</li>"
                                        }

                                        cadena = cadena + "</ul>";
                                        //----------FIN SEGUNDO NIVEL DEL MENU---------------
                                    }
                                },
                                failure: function (response) {
                                    alert(response.d);
                                },
                                error: OnError
                            });



                            cadena = cadena + "</li>"
                        }

                        cadena = cadena + "</ul>";
                        //----------FIN PRIMER NIVEL DEL MENU---------------
                    }
                },
                failure: function (response) {
                    alert(response.d);
                },
                error: OnError
            });


            cadena = cadena + "</li>"

        }

        //----------FIN PRINCIPAL NIVEL DEL MENU---------------

        lista.append(cadena);
    }
}

function AbrePagina(url) {

    if (url != '') {
        MostrarPopupProceso();
        window.location = url;
        setTimeout(function () { CerrarPopupProceso(); }, 1000);
    }
}

function FechaSistema() {
    var f = new Date();

    var dia = "" + f.getDate();
    var mes = "" + (f.getMonth() + 1)
    var aniofinal = "" + (f.getFullYear())
    var tim = "" + (f.getHours()) + ':'+(f.getMinutes()) + ':'+(f.getSeconds());
    if (parseInt(dia) < 10) {
        dia = "0" + dia;
    }
    if (parseInt(mes) < 10) {
        mes = "0" + mes;
    }
    var fechaSistema = (f.getFullYear() + "-" + mes + "-" + dia +"-"+tim);
    return fechaSistema;
}

function ReinicioTimer() {
    enviarMensaje = setInterval(SMSPrecioUsuario_Envio, 15000);
}

function SMSPrecioUsuario_Envio() {

    //var request = 
        $.ajax({
            type: "POST",
            url: "../Services/SMSPrecioUsuario_Envio",
            dataType: "json",
            async: false,
            contentType: "application/json; charset=utf-8",
            success: SMSPrecioUsuarioSuccess,
            failure: function (response) {
                alert(response.d);
            },
            error: OnError
        });

    
}


//ENVIA MENSAJES:

function SMSPrecioUsuarioSuccess(data) {
    var timer;
    
    var MarcadordeGrupoCelular = '';
    var MarcadordeGrupoMercado = '';
    var ContadorMercado = 1;

    if (data.length > 0) {
        clearInterval(enviarMensaje);
        timer = setTimeout(ReinicioTimer, 180000);
    }

}

function CerrarSesion() {
    //sessionStorage.removeItem("userperfil");
    sessionStorage.clear();
    window.location = "..";
}

function CerrarSolicitud() {
    $.ajax({
        type: "POST",
        url: "../Services/SMSPrecioUsuario_Envio",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: SMSPrecioUsuarioSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function OnError(data) {
    alert("Error 404...");
}

function EnviaCorreoAuto_MA() {
    setInterval(EnviarCorreoAuto_MesaAyuda, 7200000);
}

function EnviarCorreoAuto_MesaAyuda() {
    $.ajax({
        type: "POST",
        url: "../Services/EnviarCorreoAuto_MesaAyuda",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length > 0) {
                EnviarCorreoAuto_MesaAyudaSuccess(data);
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function EnviarCorreoAuto_MesaAyudaSuccess(data) {
    
    for (var i = 0; i < data.length; i++) {
        var destino = data[i].vemail;
        var asunto = 'CHASKIS - Su respuesta es solicitada por el Ticket: #' + data[i].vcodigo;
        var mensaje = 'Su solicitud se soporte ha sido marcada como completada.<br/>' +
            ' Apreciaríamos que usted se pueda tomar un momento para informarnos sobre la calidad de su experiencia mediante el siguiente enlace: <br/>' +
            'www.chaskis.net/Calificacion/Servicio?nidsol=' + data[i].nidsolicitud + '&ticket=' + data[i].vcodigo +
            '<br/>Su feedback es muy importante para nosotros.<br/>' +
            'Gracias.<br/>' +
            'Equipo Chaskis.';

        $.ajax({
            type: "POST",
            url: "../Services/EnviarCorreo_MesaAyuda",
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
}

function EnviaCorreoAuto_UN() {
    setInterval(EnviarCorreoAuto_UsuarioNuevo, 6000);
}

function EnviarCorreoAuto_UsuarioNuevo() {
    $.ajax({
        type: "POST",
        url: "../Services/EnviarCorreoAuto_UsuarioNuevo",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length > 0) {
                EnviarCorreoAuto_UsuarioNuevoSuccess(data);
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}
function EnviarCorreoAuto_UsuarioNuevoSuccess(data) {

    for (var i = 0; i < data.length; i++) {
        var destino = data[i].vemail;
        var asunto = 'CHASKIS - Registro de nuevo usuario.'
        var mensaje = 'Buenos días:<br/>' +
            'Un usuario se suscribió a Chaskis, ingresa a: ' +
            'https://www.chaskis.net/Suscripcion/CuentasCliente , para atender el pedido de aprobación.<br/>' +
            'Gracias.'

        $.ajax({
            type: "POST",
            url: "../Services/EnviarCorreo_MesaAyuda",
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
}

function EnviarCorreoSuccess() {

};

function EnviarCorreoError() {
    //alert('Ocurrió un error al enviar el correo');
};

//Popup cargando
function mostrarCentrarDiv(iddiv) {
    var striddiv = "#" + iddiv;
    var mleft = "-50px";
    var mtop = "-50px";
    $(striddiv).css({ 'width': '100%', 'height': '100%', 'left': '50%', 'top': '50%', 'margin-left': mleft, 'margin-top': mtop });
    $(striddiv).css('display', 'block');
}
//ABRIR POPUP
function MostrarPopupProceso() {
    $("#fondoPopup").css('display', 'block');
    mostrarCentrarDiv('PopupEnProceso');
}
function CerrarPopupProceso() {
    $("#fondoPopup").hide();
    $("#PopupEnProceso").hide();
}