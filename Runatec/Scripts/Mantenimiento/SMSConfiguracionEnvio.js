var estado_precio = '';
$(document).ready(function () {

    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);

    $("#titulo").html('SMS - Configuración Envíos');
    ListarConfiguracionEnvio();

});


function ListarConfiguracionEnvio() {
    $.ajax({
        type: "POST",
        url: "../Services/ListarConfiguracionEnvio",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarConfiguracionEnvioSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}


function ListarConfiguracionEnvioSuccess(data) {
    var item = 1;
    var tabla = $("#GridListar");
    tabla.empty();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            tabla.append(
                        '<tr>' +
                            '<td style="display:none;"><input  id="idsmsconfigenvio_' + item + '" value=' + data[i].nidsmsconfigenvio + '></td>' +
                            '<td id="td_vdia_' + item + '">' + data[i].vdia + '</td>' +
                            '<td id="td_horaenvio_' + item + '">' + data[i].horaenvio + '</td>' +
                            '<td id="td_estado_' + item + '">' + data[i].iestado + '</td>' +
                            '<td><a id="btn_editar_' + item + '" title="Editar" onclick="EditarConfiguracionEnvio(' + item + ')"><i class="far fa-edit"></i></a></td>' +
                            '<td><a id="btn_guardar_' + item + '" title="Guardar" onclick="GrabarConfiguracionEnvio(' + item + ')"><i class="far fa-save"></a></td>' +
                            '<td><a id="btn_cancelar_' + item + '" title="Cancelar" onclick="Cancelar(' + item + ')"><i class="far fa-times-circle"></i></a></td>' +
                        '</tr>'
                        )
            item = item + 1;
        }
    }

}

function EditarConfiguracionEnvio(item) {
    //obtener id de la conf envio a editar
    var nidsmsconfigenvio = $('#idsmsconfigenvio_' + item).html();

    //llenar la hora de envio
    var horaenvio = $('#td_horaenvio_' + item).html();
    $('#td_horaenvio_' + item).html('');
    $('#td_horaenvio_' + item).append("<input id='txt_horaenvio_" + item + "' type='time' value=" + horaenvio + ">");

    //llenar el estado

    var iestado = $('#td_estado_' + item).html();
    $('#td_estado_' + item).html('');
    $('#td_estado_' + item).append("<select id='select_envio' style='width:120px;'>" +
                                       "<option value='HABILITADO'>HABILITADO</option>" +
                                       "<option value='DESHABILITADO'>DESHABILITADO</option>" +
                                    "</select>");
    $("#select_envio").val(iestado);

    //Habilitar/deshabilitar controles
    
    $("#btn_editar_" + item + "").css('pointer-events', "none");
    $("#btn_cancelar_" + item + "").prop('disabled', false);
    $("#btn_guardar_" + item + "").prop('disabled', false);

    $("#txt_horaenvio_" + item).focus();
}

function GrabarConfiguracionEnvio(item) {

    //Habilitar/deshabilitar controles
    //$('#AgregarMercado').prop('disabled', false);

    var nidsmsconfigenvio = $("#idsmsconfigenvio_" + item + "").val();
    var horaenvio = $("#txt_horaenvio_" + item + "").val();
    var iestado = $("#select_envio").val();

    if (iestado == 'HABILITADO') { iestado = 1 } else { iestado = 2 }

            $.ajax({
                type: "POST",
                url: "../Services/EditarConfiguracionEnvio",
                data: "{nidsmsconfigenvio:'" + nidsmsconfigenvio + "', horaenvio:'" + horaenvio + "', iestado:'" + iestado + "'}",
                dataType: "json",
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.length >= 0) {
                        if (data == 'true') {
                            alert("Modificado correctamente.");
                            ListarConfiguracionEnvio();
                        }
                        else {
                            alert('Error: ' + data);
                        }
                    }
                },
                failure: function (response) {
                    alert(response.d);
                },
                error: OnError
            });
}

function Cancelar() {
    ListarConfiguracionEnvio();
}