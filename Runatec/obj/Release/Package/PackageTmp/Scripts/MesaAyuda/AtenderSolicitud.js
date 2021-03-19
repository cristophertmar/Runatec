//var nidsolicitud = sessionStorage.getItem("nidsolicitud");
var nidusuario = sessionStorage.getItem("nidusuario");//id del usuario de la sesión
var idusuario = sessionStorage.getItem("idusuario");//id del usuario al que le pertenece responder la solicitud

$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);
    $("#titulo").html('Atención de Solicitud');

    var h1nidsol = document.getElementById('nidsolicitud');
    var nidsolicitud = h1nidsol.textContent;//Obtener el id de la solicitud que está en la etiqueta h1

    SelectSolicitud(nidsolicitud);

    $("#btn_enviar").click(function () {
        var vasunto = $("#txt_asunto_atencion").val();
        var vcontenido = $("#txt_contenido_atencion").val();
        var dfecha = $("#txt_fecha_atencion").val();
        if (vasunto == '') {
            alert("Ingrese el asunto.");
        } else if (vcontenido == '') {
            alert("Ingrese el mensaje.");
        } else if (dfecha == '') {
            alert("Ingrese la fecha de atención.");
        } else {
            RegistrarAtencion(vasunto, vcontenido, nidusuario, nidsolicitud, dfecha);
            window.location = "../MesaAyuda/Solicitud";
        }
    });
});

function SelectSolicitud(nidsolicitud) {

    $.ajax({
        type: "POST",
        url: "../Services/SelectSolicitud_MesaAyuda",
        data: "{nidsolicitud:'" + nidsolicitud + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: SelectSolicitudSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function SelectSolicitudSuccess(data) {
    $("#titulo").html('Mesa de Ayuda - Solicitud Nro. ' + data[0].nidsolicitud);
    if (data[0].respuesta == 'true') {
        $("#txt_fecha_solicitud").val(data[0].dfecha);
        $("#txt_asunto_solicitud").val(data[0].vasunto);
        $("#txt_contenido_solicitud").val(data[0].vdescripcion);
    } else if (data[0].respuesta == 'atendida') {
        alert("Esta solicitud ya ha sido atendida.");
        window.location = "Solicitud";
    } else if (data[0].respuesta == 'cerrada') {
        alert("Esta solicitud está cerrada.");
        window.location = "Solicitud";
    }

    $("#txt_fecha_atencion").val(new Date().toLocaleString());
}

function RegistrarAtencion(vasunto, vcontenido, nidusuario, nidsolicitud, dfecha) {

    $.ajax({
        type: "POST",
        url: "../Services/RegistrarAtencion_MesaAyuda",
        data: "{vasunto:'" + vasunto + "',vcontenido:'" + vcontenido + "',nidusuario:'" + nidusuario +
            "',nidsolicitud:'" + nidsolicitud + "', dfecha:'" + dfecha + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data[0].respuesta == 'true') {
                    
                    EnviarCorreo_MesaAyuda(data);//envia correo al solicitante
                    alert("La solicitud fue atendida.");
                    if (nidusuario != idusuario) {
                        EnviarCorreo_MesaAyudaAdm(data);
                        
                    }
                    window.location = "../MesaAyuda/Consulta";
                }
            } else {
                alert("Ocurrió un error al atender la solicitud.");
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function EnviarCorreo_MesaAyuda(data) {//Envia correo al solicitante
    
    var vnombresadm = data[0].vnombresadm;
    var vemail = data[0].vemail;
    var vcodigo = data[0].vcodigo;

    var vasunto = $("#txt_asunto_atencion").val();
    var vcontenido = $("#txt_contenido_atencion").val();

    var destino = vemail;
    var asunto = 'RE:[Código de ticket: ' + vcodigo + '] ' + vasunto;
    var mensaje = vcontenido +
                    '<br/>Gracias por elegir Chaskis.<br/>' +
                    'Cordialmente,<br/>' +
                    vnombresadm + '<br/>';

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

function EnviarCorreo_MesaAyudaAdm(data) {
    var vemailadm = data[0].vemailadm;
    var vusuario = data[0].vusuario;
    var nidsolicitud = data[0].nidsolicitud;

    var destino = vemailadm;
    var asunto = 'Chaskis - Reasignación de Solicitud N°: ' + nidsolicitud + ' en Mesa de Ayuda.';
    var mensaje = 'Buen día, se le informa que la solicitud N° ' + nidsolicitud + ' que le fue asignada ha sido atendida por ' + vusuario+'.';
    
    $.ajax({
        type: "POST",
        url: "../Services/EnviarCorreo_MesaAyuda",
        data: "{destino:'" + destino + "', asunto:'" + asunto + "', allmensaje:'" + mensaje + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: EnviarCorreoAdmSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: EnviarCorreoAdmError
    });
}

function EnviarCorreoAdmSuccess() {
    alert("Se envió el correo al administrador correspondiente.");
};
function EnviarCorreoAdmError() {
    alert('Ocurrió un error al enviar el correo al administrador.');
};

function EnviarCorreoSuccess() {
};
function EnviarCorreoError() {
    alert('Ocurrió un error al enviar el correo de respuesta. REPORTAR.');
};