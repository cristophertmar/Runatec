//var idusuario = sessionStorage.getItem("nidusuario");
var correo, band;
$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);

    $("#title").html('Realiza tu solicitud en Mesa de Ayuda');
    ListarComboCategoriaMA();
    $("#tr_correos").attr("style", "display:none");

    $("#boton_enviarsolicitud").click(function () {
        var nidcategoria = $("#select_categoria").val();
        var vdescripcion = $("#txt_descripcion").val();
        var nidusuario = sessionStorage.getItem("nidusuario");
        var vemail;
        var vasunto = 'Chaskis - Nueva solicitud registrada en Mesa de Ayuda.';

        if (correo == '') {
            vemail = $("#txt_correo").val();
        } else {
            vemail = correo;
        }

        if(nidcategoria==0){
            alert("Ingrese una categoría.");
        } else if(vdescripcion==''){
            alert("Ingrese una descripción.");
        } else if (correo == '' && $("#txt_correo").val() == '') {
            alert("Debe registrar su correo.");
        } else {
            RegistrarSolicitudMesaAyuda(nidcategoria, vdescripcion, vemail, nidusuario, vasunto);
        }

    });

    $("#Mesadeayuda").click(function () {
        band == true;
    });
        LlenarCorreo();
});

function LlenarCorreo() {

    var nidusuario = sessionStorage.getItem("nidusuario");
    if (nidusuario == null && band == true) {
        alert("Inicie Sesión");
        window.location = "../Login/Login";

    } else if (nidusuario == null) {
        alert("Inicie Sesión");
        window.location = "../Login/Login";
    } else {
        ValidarCorreoMesaAyuda(nidusuario);

        $("#contenedor_total").attr("style", "display:block");
    }
}

function ListarComboCategoriaMA() {

    //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
    var pathname = window.location.pathname;
    var evaluacadena = pathname.substring(pathname.length - 1);

    var vurl = "";

    if (evaluacadena == '/') {
        vurl = ".." + pathname + "Services/ListarComboCategoriaMA";
    }
    else {
        var pathname = window.location.pathname;
        vurl = ".." + pathname + "/Services/ListarComboCategoriaMA";
    }

    $.ajax({
        type: "POST",
        url: vurl,
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

function RegistrarSolicitudMesaAyuda(nidcategoria, vdescripcion, vemail, nidusuario, vasunto) {

    //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
    var pathname = window.location.pathname;
    var evaluacadena = pathname.substring(pathname.length - 1);

    var vurl = "";

    if (evaluacadena == '/') {
        vurl = ".." + pathname + "Services/RegistrarSolicitudMesaAyuda";
    }
    else {
        var pathname = window.location.pathname;
        vurl = ".." + pathname + "/Services/RegistrarSolicitudMesaAyuda";
    }

    $.ajax({
        type: "POST",
        url: vurl,
        data: "{nidcategoria:'" + nidcategoria + "', vdescripcion:'" + vdescripcion + "', vemail:'" + vemail + "', nidusuario:'" + nidusuario + "', vasunto: '" + vasunto + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data[0].respuesta == 'true') {
                    alert("Su solicitud fue enviada.");
                    LimpiarCampos();
                    window.location = "..";
                    EnviarCorreo_MesaAyuda(data);
                    EnviarCorreo_MesaAyudaAdm(data);
                } else {
                    alert("Ocurrió un error al enviar la solicitud. "+data[0].respuesta);
                }
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError

    });
}

function ValidarCorreoMesaAyuda() {

    var nidusuario = sessionStorage.getItem("nidusuario");
    
    //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
    var pathname = window.location.pathname;
    var evaluacadena = pathname.substring(pathname.length - 1);

    var vurl = "";

    if (evaluacadena == '/') {
        vurl = ".." + pathname + "Services/ValidarCorreoMesaAyuda";
    }
    else {
        var pathname = window.location.pathname;
        vurl = ".." + pathname + "/Services/ValidarCorreoMesaAyuda";
    }

    $.ajax({
        type: "POST",
        url: vurl,
        data: "{nidusuario: '" + nidusuario + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data[0].respuesta == 'noemail') {
                    correo = '';
                    $("#tr_correos").attr("style", "display:contents");


                } else if (data[0].respuesta == 'true') {
                    correo = data[0].vemail;
                }
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError

    });
}

function OnError() {
    alert("Error 404..");
}

function LimpiarCampos() {
    $("#select_categoria").val(0);
    $("#txt_descripcion").val('');
    $("#txt_correo").val('');
}

function EnviarCorreo_MesaAyuda(data) {
    var vemail = data[0].vemail;
    var vcodigo = data[0].vcodigo;
    var nidsolicitud = data[0].nidsolicitud;
    var vnombres = data[0].vnombres;
    var vasunto = data[0].vasunto;

    var destino = vemail;
    var asunto = 'Chaskis - Solicitud N°: ' + nidsolicitud + ' en Mesa de Ayuda.';
    var mensaje = vnombres +
        '<br/>Gracias por contactarse con el servicio de ayuda de Chaskis, su solicitud fue registrada con el siguiente código de ticket: <b>' + vcodigo +'</b>'+
        ', su inquietud será revisada y le comunicaremos en el más breve plazo.<br/>' +
        'Asunto: ' + vasunto+
        '<br/>Estado: <span style="color:green;">Abierto</span><br/>' +
        '<br/>Atentamente: ' +
        '<br/>Chaskis.';
    
    //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
    var pathname = window.location.pathname;
    var evaluacadena = pathname.substring(pathname.length - 1);

    var vurl = "";

    if (evaluacadena == '/') {
        vurl = ".." + pathname + "Services/EnviarCorreo_MesaAyuda";
    }
    else {
        var pathname = window.location.pathname;
        vurl = ".." + pathname + "/Services/EnviarCorreo_MesaAyuda";
    }

    $.ajax({
        type: "POST",
        url: vurl,
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

function EnviarCorreo_MesaAyudaAdm(data) {
    var vemail = data[0].vemailadm;
    var vcodigo = data[0].vcodigo;
    var nidsolicitud = data[0].nidsolicitud;
    var enlace = "www.chaskis.net/MesaAyuda/AtenderSolicitud?nidsol=" + nidsolicitud + "";

    var destino = vemail;
    var asunto = 'Chaskis - Ingreso de Solicitud N°: ' + nidsolicitud + ' en Mesa de Ayuda.';
    var mensaje = 'Se registró una solicitud en Mesa de Ayuda con el código: ' + vcodigo +
        ', puede acceder en el siguiente enlace:' + enlace;
    //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
    var pathname = window.location.pathname;
    var evaluacadena = pathname.substring(pathname.length - 1);

    var vurl = "";

    if (evaluacadena == '/') {
        vurl = ".." + pathname + "Services/EnviarCorreo_MesaAyuda";
    }
    else {
        var pathname = window.location.pathname;
        vurl = ".." + pathname + "/Services/EnviarCorreo_MesaAyuda";
    }

    $.ajax({
        type: "POST",
        url: vurl,
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
    //alert('Ocurrió un error al enviar el correo');
};

