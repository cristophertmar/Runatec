var nidPerfil = sessionStorage.getItem("userperfil");
var vusuario = sessionStorage.getItem("username");

$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);
    

    if (nidPerfil == 3) {//Cuando es productor
        
        $("#lbl_bienvenida").html('Bienvenido(a): '+ vusuario);

        $("#li_ingresar").removeClass("centrar_icono_mobile");

        $(".clv_btn").css("display", "none");
        //$(".dl_btn").css("display", "none");

        ListarMenuPublico();

    } else {
        ListarMenuPublico();
        $("#lbl_bienvenida").html('');
        $("#lbl_bienvenida").css("display","none");
        $("#lbl_cerrarsesion_web").css("display", "none");

        $("#li_ingresar").addClass("centrar_icono_mobile");
        $("#li_cerrarsesion").removeClass("centrar_icono_mobile");
    }

    //REGISTRA LOG AL CLICKEAT EN EL BOTON DE DESCARGA DE APP
    $("#btn_descargaApp").click(function () {
        if(vusuario==null){
            vusuario='';
        }
        RegistrarLog_DescargasApp(vusuario);
    });
    $("#btn_descargaApp_mobile").click(function () {
        if (vusuario == null) {
            vusuario = '';
        }
        RegistrarLog_DescargasApp(vusuario);
    });
    

});

var count = 0;//desactivado

function Login() {

    //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
    var pathname = window.location.pathname;
    var evaluacadena = pathname.substring(pathname.length - 1);


    if (evaluacadena == '/') {
        window.location = ".." + pathname + "Login/Login";
    }
    else {

        window.location = ".." + pathname + "/Login/Login";
    }

}

//Menu Público

function ListarMenuPublico() {

    //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
    var pathname = window.location.pathname;
    var evaluacadena = pathname.substring(pathname.length - 1);

    var vurl = "";

    if (evaluacadena != '/') {
        var pathname = window.location.pathname;
        vurl = ".." + pathname + "/Services/ListarMenuPublico";
    }
    else {
        vurl = ".." + pathname + "Services/ListarMenuPublico";
    }


    $.ajax({
        type: "POST",
        url: vurl,
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarMenuPublicoSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarMenuPublicoSuccess(data) {

    var lista = $("#menu");
    var idmodulopadre_nivel1, idmodulopadre_nivel2, hijo_nivel1, hijo_nivel2;
    var cadena = "";

    lista.empty();

    //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
    var pathname = window.location.pathname;
    var evaluacadena = pathname.substring(pathname.length - 1);
    var vurlnivel1 = "";
    var vurlnivel2 = "";


    if (evaluacadena != '/') {
        vurlnivel1 = ".." + pathname + "/Services/ListarSubMenuNivelUno_Publico";
        vurlnivel2 = ".." + pathname + "/Services/ListarSubMenuNivelDos_Publico"
    }
    else {
        vurlnivel1 = ".." + pathname + "Services/ListarSubMenuNivelUno_Publico";
        vurlnivel2 = ".." + pathname + "Services/ListarSubMenuNivelDos_Publico"
    }
    if (data.length > 0) {
        //Solo aparece en el submenú mobile/responsive
        cadena = cadena + '<li id="li_mobile_home" style="display:none;"><a href="..">Inicio<i class="fas fa-home" style="margin-left:80px;"></i></a></li>';
        //--------- NIVEL PRINCIPAL DEL MENU-----------
        for (i = 0; i < data.length; i++) {

            idmodulopadre_nivel1 = data[i].nidModulo;
            var nidmodulopadre = data[i].nidmodulopadre;
            var ipadre = data[i].ipadre;


            if (ipadre == 1) {//Cuando un módulo tiene hijos
                cadena = cadena + "<li>" + "<a id='" + data[i].id + "' style='cursor:pointer'>" + data[i].vnombre + " <i class='fas fa-caret-down'></i></a>"
            }
            else {
                cadena = cadena + "<li>" + "<a id='" + data[i].id + "' style='cursor:pointer' onclick=AbrePagina('" + data[i].vurl + "','" + idmodulopadre_nivel1 + "',0)>" + data[i].vnombre + "</a>";
            }

            $.ajax({
                type: "POST",
                url: vurlnivel1,
                data: "{ModuloPadre:'" + data[i].nidModulo + "'}",
                dataType: "json",
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (data) {

                    if (data.length > 0) {

                        //---------PRIMER NIVEL DEL MENU-----------

                        cadena = cadena + "<ul class='children'>";

                        for (j = 0; j < data.length; j++) {
                            cadena = cadena + "<li>" + "<a id='" + data[j].id + "' style='cursor:pointer;' onclick=AbrePagina('" + data[j].vurl + "','" + idmodulopadre_nivel1 + "','" + data[j].nidModulo + "')>" + data[j].vnombre + "</a>";

                            $.ajax({
                                type: "POST",
                                url: vurlnivel2,
                                data: "{ModuloPadre:'" + data[j].nidModulo + "'}",
                                dataType: "json",
                                async: false,
                                contentType: "application/json; charset=utf-8",
                                success: function (data) {
                                    if (data.length > 0) {

                                        //---------INICIO SEGUNDO NIVEL DEL MENU-----------

                                        cadena = cadena + "<ul class='menu'>";

                                        for (k = 0; k < data.length; k++) {
                                            cadena = cadena + "<li>" + "<a id='" + data[k].id + "' href='" + data[k].vurl + "'>" + data[k].vnombre + "</a>";
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
        //Solo aparece en el submenú mobile/responsive
        cadena = cadena + '<li id="li_mobile_home" style="display:none;"><a id="btn_descargaApp_mobile" href="https://mega.nz/file/RN8WHY5D#KrYi4wGmbEIVw55HLm0K5KNutJMHlMyWhV7wgsTwZkA" target="_blank">¡Descarga el app!<i class="fas fa-mobile-alt" style="margin-left:10px;"></i></a></li>';
        cadena = cadena + '<li id="li_mobile_home" class="menu_toggle" style="display:none;"><a id="btn_descargaApp_mobile" >x  Cerrar</a></li>';

        //----------FIN PRINCIPAL NIVEL DEL MENU---------------


        lista.append(cadena);


    }


}

//function AbrePagina(vurl) {

//    if (vurl != '') {
//        //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
//        var pathname = window.location.pathname;
//        var evaluacadena = pathname.substring(pathname.length - 1);

//        var surl = "";

//        //surl = ".." + pathname + vurl;
//        surl = ".." + vurl;

//        //alert(surl);
//        //$('#contenedorpagina').load(surl);
        
//        MostrarPopupProceso('120','120');
//        $.ajax({
//            type: "POST",
//            url: surl,
//            data: '',
//            contentType: "application/json; charset=utf-8",
//            dataType: "html",
//            success: function (response) {
//                $('#divContent').html(response);
//                $('#contenedorpagina').load(surl);
//                CerrarPopupProceso();
//            },
//            failure: function (response) {
//                alert(response.responseText);
//            },
//            error: function (response) {
//                alert(response.responseText);
//            }
//        });

//    }
//}

function AbrePagina(vurl, nidmodulopadre, nidmodulohijo) {


    if (vurl != '') {

        sessionStorage.setItem("modulopadre", nidmodulopadre);
        sessionStorage.setItem("modulohijo", nidmodulohijo);


        //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
        var pathname = window.location.pathname;
        var evaluacadena = pathname.substring(pathname.length - 1);

        var surl = "";

        //surl = ".." + pathname + vurl;
        surl = ".." + vurl;

        //alert(surl);
        //$('#contenedorpagina').load(surl);

        MostrarPopupProceso('120', '120');
        $.ajax({
            type: "POST",
            url: surl,
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (response) {
                $('#divContent').html(response);
                $('#contenedorpagina').load(surl);
                CerrarPopupProceso();
            },
            failure: function (response) {
                alert(response.responseText);
            },
            error: function (response) {
                alert(response.responseText);
            }
        });

    }

}

function SMSPrecioUsuario() {

    $.ajax({
        type: "POST",
        url: "../Services/SMSPrecioUsuario",
        dataType: "json",
        async: true,
        contentType: "application/json; charset=utf-8",
        success: SMSPrecioUsuarioSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });

}


function SMSPrecioUsuarioSuccess(data) {
    var item = 1;

    var MarcadordeGrupoCelular = '';
    var MarcadordeGrupoMercado = '';
    var ContadorMercado = 1;

    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {

            //grupo por celular
            if (MarcadordeGrupoCelular != data[i].celular) {
                console.log(data[i].celular);
                console.log(data[i].cabecera);
                console.log('FECHA: ' + data[i].fecha);


                MarcadordeGrupoCelular = data[i].celular;
                ContadorMercado = 1;
            }
            //grupo mercado
            if (MarcadordeGrupoMercado != data[i].mercado) {

                console.log('MERCADO (' + ContadorMercado + ') : ' + data[i].mercado);
                MarcadordeGrupoMercado = data[i].mercado;

                ContadorMercado++;
            }

            console.log(data[i].vdescripcion_corta + ', PRECIO PROM.: ' + data[i].preciopromedio);

        }

    }
}

function CrearCuenta() {

    //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
    var pathname = window.location.pathname;
    var evaluacadena = pathname.substring(pathname.length - 1);


    if (evaluacadena == '/') {
        window.location = ".." + pathname + "CrearCuenta/CrearCuenta";        
    }
    else {

        window.location = ".." + pathname + "/CrearCuenta/CrearCuenta";        
    }

    
}

function CerrarSesion() {
    window.location = "..";
}

function CerrarSesionProductor() {//Cuando es productor
    //sessionStorage.removeItem("userperfil");
    //sessionStorage.removeItem("username");
    sessionStorage.clear();

    $("#nombre_usuario").css("display", "none");
    $("#cerrarsesion_productor").css("display", "none");
    $("#btnIngresar").css("display", "inline-block");
    $("#btnCrearCuenta").css("display", "inline-block");
    $("#btnDescargaApp").css("display", "inline-block");
    window.location = "..";
}

function OnError(data) {
    alert("Error 404...");
}

//Popup cargando
function mostrarCentrarDiv(iddiv, w, h) {
    var striddiv = "#" + iddiv;
    var width = w + "px";
    var height = h + "px";
    var mleft = "-" + (w / 2) + "px";
    var mtop = "-" + (h / 2) + "px";
    $(striddiv).css({ 'width': width, 'height': height, 'left': '50%', 'top': '50%', 'margin-left': mleft, 'margin-top': mtop });
    $(striddiv).css('display', 'block');
};

function MostrarPopupProceso(ancho, alto) {
    $("#fondoPopup").css('display', 'block');
    mostrarCentrarDiv('PopupEnProceso', ancho, alto);
};
function CerrarPopupProceso() {
    $("#fondoPopup").hide();
    $("#PopupEnProceso").hide();
};
function IrNoticia(nidnoticia) {
    sessionStorage.setItem("nidnoticia", nidnoticia);
    var vurl = '/Inicio/IrNoticia';
    if (vurl != '') {
        //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
        var pathname = window.location.pathname;
        var evaluacadena = pathname.substring(pathname.length - 1);

        var surl = "";

        //surl = ".." + pathname + vurl;
        surl = ".." + vurl;

        MostrarPopupProceso('120', '120');
        $.ajax({
            type: "POST",
            url: surl,
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (response) {
                $('#divContent').html(response);
                $('#contenedorpagina').load(surl);
                CerrarPopupProceso();
            },
            failure: function (response) {
                alert(response.responseText);
            },
            error: function (response) {
                alert(response.responseText);
            }
        });

    }
}

function RegistrarLog_DescargasApp(vusuario) {

    //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
    var pathname = window.location.pathname;
    var evaluacadena = pathname.substring(pathname.length - 1);

    var vurl = "";

    if (evaluacadena != '/') {
        var pathname = window.location.pathname;
        vurl = ".." + pathname + "/Services/RegistrarLog_DescargasApp";
    }
    else {
        vurl = ".." + pathname + "Services/RegistrarLog_DescargasApp";
    }


    $.ajax({
        type: "POST",
        url: vurl,
        data:"{vusuario:'"+vusuario+"'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}