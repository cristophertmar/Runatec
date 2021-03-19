$(document).ready(function () {

    var h1nidsol = document.getElementById('nidsolicitud');
    var h1ticket = document.getElementById('ticket');

    var nidsolicitud = h1nidsol.textContent;//Obtener el id de la solicitud que está en la etiqueta h1
    var vcodigo = h1ticket.textContent;

    CalificacionServicio(nidsolicitud, vcodigo);

    $("#btn_enviar").click(function () {

        var icalificacion = $('input:radio[name=rate]:checked').val();
        var vcomentario = $("#txt_comentario").val();
        var vcomentariomejora = $("#txt_comentariomejora").val();

        if (vcomentario == '' || vcomentariomejora == '') {
            alert("Envíenos un comentario para poder mejorar nuestro servicio.");
        } else {
            RegistrarCalificacion(icalificacion, nidsolicitud, vcomentario, vcomentariomejora);
        }
    });
});

//Muestra los datos de la solicitud atendida
function CalificacionServicio(nidsolicitud, vcodigo) {
    $.ajax({
        type: "POST",
        url: "../Services/CalificacionServicio_MesaAyuda",
        data: "{nidsolicitud:'" + nidsolicitud + "',vcodigo:'" + vcodigo + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: CalificacionServicioSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function CalificacionServicioSuccess(data) {
    alert("Entró");
    if (data[0].respuesta == 'nocalificada') {
        $("#td_dfecha").html(data[0].dfecha);
        $("#td_dfechaAtencion").html(data[0].dfechaAtencion);
        $("#td_vnombres").html(data[0].vnombres);
        $("#td_duracion").html(data[0].duracion);

        $("#body_calificacion").html('Por favor comentar sobre la atención que recibió de ' + data[0].vnombres + ' en su solicitud de soporte.');
    } else if (data[0].respuesta == 'calificada') {
        alert("Esta atención ya ha sido calificada, muchas gracias.");
        window.location = "..";
    }
}
function OnError() {
    alert("Error 404..");
}

function RegistrarCalificacion(icalificacion, nidsolicitud, vcomentario, vcomentariomejora) {
    $.ajax({
        type: "POST",
        url: "../Services/RegistrarCalificacion_MesaAyuda",
        data: "{icalificacion:'" + icalificacion + "',nidsolicitud:'" + nidsolicitud + "', vcomentario:'" + vcomentario + "', vcomentariomejora:'" + vcomentariomejora + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data == 'true') {
                    alert("¡Muchas Gracias por su tiempo!");
                    window.location = "..";
                } else {
                    alert("Ocurrió un error al enviar los datos.");
                }
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}