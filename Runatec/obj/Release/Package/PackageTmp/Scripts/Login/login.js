$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);

    $('#txtusuario').focus();

    $('#btnlogin').click(function () {        
            ValidarLogin();                    
    });

    $('#txtusuario').keyup(function (e) {
        if (e.keyCode === 13) {
            $('#btnlogin').click();
        }
    });

    $('#txtpassword').keyup(function (e) {
        if (e.keyCode === 13) {
            $('#btnlogin').click();
        }
    });

});

function ValidarLogin() {
    
    var vusuario = $("#txtusuario").val();
    var vpassword = $("#txtpassword").val();

    if (vusuario.length > 0 && vpassword.length > 0) {
        //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
        //var pathname = window.location.pathname;
        //var evaluacadena = pathname.substring(pathname.length - 1);

        //if (evaluacadena != '/') {

        //    var pathname = window.location.pathname + '/';
        //}


        //alert(pathname);

        $.ajax({
            type: "POST",
            //url: ".." + pathname + "/Services/ValidarLogin",
            url: "../Services/ValidarLogin",
            data: "{vusuario:'" + vusuario + "',vpassword:'" + vpassword + "'}",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: successValidarLogin,
            failure: function (response) {
                alert(response.d);
            },
            error: OnError
        });
    }
}

function successValidarLogin(data) {

    var respuesta = data[0].respuesta;
    var vusuario = data[0].vusuario;
    var vpassword = data[0].vpassword;
    var nomusuario = data[0].nomusuario;
    var nidUsuario = data[0].nidUsuario;
    var nidPerfil = data[0].nidPerfil;

    if (respuesta == 'true') {
        //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
        //ESTO EVITA QUE SE ESTE CAMBIANDO LAS RUTAS CADA VEZ QUE SE PUBLICA
        //var pathname = window.location.pathname;

        //var evaluacadena = pathname.substring(pathname.length - 1);

        //if (evaluacadena != '/') {

        //    var pathname = window.location.pathname + '/';
        //}        

        //window.location = ".." + pathname + "Menu/Menu";

        sessionStorage.setItem("userperfil", nidPerfil);
        sessionStorage.setItem("username", nomusuario);
        sessionStorage.setItem("nidusuario", nidUsuario);

        //Variables de session obtenidas desde el layout
        //Contienen el enlace al que el usuario quiere acceder sin haber iniciado sesión
        var enlace = sessionStorage.getItem("enlace");

        //alert(nidUsuario);
        if (nidPerfil == 3) {//si es productor se redirige al layout público
            window.location = "..";
        } else {
            if (enlace != null) {
                window.location = ".." + enlace;
            } else {
                window.location = "../Menu/Menu";
            }
        }
        
    }
    else {
        alert('Usuario y/o Password incorrectos');
    }
}


function OnError(data) {
    alert("Error 404...");
}