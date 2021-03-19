var estado_mercado = '';
$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);


    $("#titulo").html('Mantenimiento de Mercados');
    ListarMercado();

    $("#AgregarMercado").click(function () {
        AgregarMercado();
        var fila = $("#GridListar tr").length;
        for (var i = 1; i <= fila; i++) {
            $("#btn_editar_" + i + "").css('pointer-events', "none");
        }
    });
    
});

function ListarMercado() {

    $.ajax({
        type: "POST",
        url: "../Services/ListarMercado",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success:ListarMercadoSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarMercadoSuccess(data) {
    var item = 1;
    var tabla = $("#GridListar");
    tabla.empty();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            tabla.append(
                        '<tr>' +
                            '<td style="display:none;" id="idmercado_'+item+'">' + data[i].nidmercado + '</td>' +
                            '<td>' + data[i].fila + '</td>' +
                            '<td id="td_mercado_' + item + '">' + data[i].vdescripcion + '</td>' +
                            '<td id="td_mercado_corto_' + item + '">' + data[i].vdescripcion_corta + '</td>' +
                            '<td style="display:none;"><input type="text" id="txtidubigeo_' + item + '"/></td>' +
                            '<td id="td_ubigeo_' + item + '">' + data[i].vubigeo + '</td>' +
                            '<td><a id="btn_editar_' + item + '" title="Editar" onclick="EditarMercado(' + item + ')"><i class="far fa-edit"></i></a></td>' +
                            '<td><a id="btn_guardar_' + item + '" title="Guardar" onclick="GrabarMercado(' + item + ')"><i class="far fa-save"></a></td>' +
                            '<td><a id="btn_cancelar_' + item + '" title="Cancelar" onclick="cancelar(' + item + ')"><i class="far fa-times-circle"></i></a></td>' +
                        '</tr>'
                        )
            
            $("#btn_guardar_" + item + "").css('pointer-events', "none");
            $("#btn_cancelar_" + item + "").css('pointer-events', "none");
            item = item + 1;

        }
    }
    
}

//Inserta fila al presionar el botón "Agregar"
function AgregarMercado() {

    var fila = $("#GridListar tr").length;
    if (fila == 0) {
        $('#GridListar').empty();
    }

    var item = fila + 1;

    //AGREGAR FILA
    $('#GridListar').prepend("<tr>" +
            "<td style='display:none;' id='idmercado_" + item + "' ><input id='txtid_'"+item+"'>"+item+"</input></td>" +
            "<td id='numero'>" + item + "</td>" +
            "<td id='td_mercado_" + item + "'  ><input id='txtmercado_" + item + "' type='text'></input></td>" +
            "<td id='td_mercado_corto_" + item + "'  ><input id='txtmercadocorto_" + item + "' type='text'></input></td>" +
            '<td style="display:none;"><input type="text" id="txtidubigeo_' + item + '"/></td>' +
            "<td id='td_ubigeo_" + item + "' ><input id='txtubigeo_" + item + "' type='text' class='form-control form-control-sm'></td>" +
            "<td><a id='btn_editar_" + item + "' onclick='EditarMercado("+item+")' title='Editar'><i class='far fa-edit'></i></a></td>" +
            "<td><a id='btn_guardar_" + item + "' onclick='GrabarMercado("+item+")' title='Guardar'><i class='far fa-save'></i></a></td>" +
            "<td><a id='btn_cancelar_" + item + "' onclick='cancelar(" + item + ");' title='Cancelar'><i class='far fa-times-circle'></i></a></td>" +
            "</tr>");
    
    //input oculto, para obtener el número de fila y se use en el autocomplete
    $("#txt_fila").val(item);

    //Habilitar/deshabilitar controles
    $('#AgregarMercado').prop('disabled', true);
    $("#btn_editar_" + item + "").css('pointer-events', "none");
    $("#btn_cancelar_" + item + "").prop('disabled', false);
    $("#btn_guardar_" + item + "").prop('disabled', false);

    estado_mercado = 'nuevo';

    //Ubigeo
    $("#txtubigeo_" + item).blur(function () {
        AutocompletarUbigeo(item);
    });
    $("#txtubigeo_" + item).autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../Services/AutocompletarUbigeo",
                data: "{vdescripcion:'" + $("#txtubigeo_" + item).val() + "'}",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.length > 0) {
                        response($.map(data, function (item) {
                            return {
                                label: item.vdescripcion,
                                value: item.nidubigeo

                            };
                        }));


                    }
                    else {
                        $("#txtidubigeo" + item).val(0);
                        $("#txtubigeo_" + item).val('');

                    }

                },
                failure: function (response) {
                    alert(response.d);
                },
                error: OnError
            })
        },
        select: function (event, ui) {
            event.preventDefault();
            $("#txtidubigeo_" + item).val(ui.item.value);
            $("#txtubigeo_" + item).val(ui.item.label);
        },
        focus: function (event, ui) {
            event.preventDefault();
            $("#txtidubigeo_" + item).val(ui.item.value);
            $("#txtubigeo_" + item).val(ui.item.label);
        }
    });
}

function cancelar(item) {
    $("#AgregarMercado").off('click');
    $("#AgregarMercado").on("click", function () {
        AgregarMercado();
    });

    estado_mercado = '';
    ListarMercado();
    //Habilitar/deshabilitar controles
    $('#AgregarMercado').prop('disabled', false);
}

function EditarMercado(item) {
    var fila = $("#GridListar tr").length;
    for (var i = 1; i <= fila; i++) {
        $("#btn_editar_" + i + "").css('pointer-events', "none");
    }
    //input oculto, para obtener el número de fila y se use en el autocomplete
    $("#txt_fila").val(item);

    
    estado_mercado = 'editar';
    //obtener id del mercado a editar
    var nidmercado = $('#idmercado_' + item).html();

    //llenar nombre de mercado
    var vdescripcion = $('#td_mercado_' + item).html();
    $('#td_mercado_' + item).html('');
    $('#td_mercado_' + item).append("<input id='txtmercado_" + item + "' type='text'>");
    $("#txtmercado_" + item).val(vdescripcion);

    //llenar nombre corto de mercado
    var vdescripcion_corta = $('#td_mercado_corto_' + item).html();
    $('#td_mercado_corto_' + item).html('');
    $('#td_mercado_corto_' + item).append("<input id='txtmercadocorto_" + item + "' type='text'>");
    $("#txtmercadocorto_" + item).val(vdescripcion_corta);
    //llenar ubigeo mercado

    var vubigeo = $('#td_ubigeo_' + item).html();
    $('#td_ubigeo_' + item).html('');
    $('#td_ubigeo_' + item).append("<input id='txtubigeo_" + item + "' type='text'>");
    $("#txtubigeo_" + item).val(vubigeo);

    //Habilitar/deshabilitar controles
    $('#AgregarMercado').prop('disabled', true);
    //$("#btn_editar_" + item + "").css('pointer-events', "none");
    $("#btn_guardar_" + item + "").css('pointer-events', "auto");
    $("#btn_cancelar_" + item + "").css('pointer-events', "auto");

    $("#txtmercado_" + item).focus();

    //Ubigeo
    $("#txtubigeo_"+item).blur(function () {
        AutocompletarUbigeo(item);
    });
    $("#txtubigeo_" + item).autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../Services/AutocompletarUbigeo",
                data: "{vdescripcion:'" + $("#txtubigeo_" + item).val() + "'}",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.length > 0) {
                        response($.map(data, function (item) {
                            return {
                                label: item.vdescripcion,
                                value: item.nidubigeo

                            };
                        }));


                    }
                    else {
                        $("#txtidubigeo" + item).val(0);
                        $("#txtubigeo_" + item).val('');

                    }

                },
                failure: function (response) {
                    alert(response.d);
                },
                error: OnError
            })
        },
        select: function (event, ui) {
            event.preventDefault();
            $("#txtidubigeo_" + item).val(ui.item.value);
            $("#txtubigeo_" + item).val(ui.item.label);
        },
        focus: function (event, ui) {
            event.preventDefault();
            $("#txtidubigeo_" + item).val(ui.item.value);
            $("#txtubigeo_" + item).val(ui.item.label);
        }
    });
}

function GrabarMercado(item) {

    //Habilitar/deshabilitar controles
    $('#AgregarMercado').prop('disabled', false);

    var sUrl = '';

    //NUEVO
    if (estado_mercado == 'nuevo') {
        sUrl = "../Services/InsertarMercado";
    }
    else {
        //EDITAR 
        if (estado_mercado == 'editar') {
            var nidmercado = $('#idmercado_' + item).html();
            sUrl = "../Services/EditarMercado";
        }
    }

    if (estado_mercado != null && estado_mercado.length > 0) {
        var vdescripcion = $("#txtmercado_" + item + "").val();
        var vdescripcion_corta = $("#txtmercadocorto_" + item + "").val();
        var vubigeo = $("#txtubigeo_" + item + "").val();

        if (vdescripcion == '') {
            alert("Ingrese el nombre del mercado.");
        }
        else if (vubigeo == '') {
            alert("Ingrese la dirección del mercado.");
        }
        else if (vdescripcion_corta == '') {
            alert("Ingrese la descripción corta.");
        }

        else {
            $.ajax({
                type: "POST",
                url: sUrl,
                data: "{nidmercado:'"+nidmercado+"',vdescripcion:'" + vdescripcion + "',vubigeo:'" + vubigeo + "',vdescripcion_corta:'"+vdescripcion_corta+"'}",
                dataType: "json",
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.length >= 0) {
                        if (data[0].respuesta == 'true') {
                            if (estado_mercado == 'nuevo') {
                                alert('Se insertó el registro correctamente.');

                            }
                            else {
                                alert('Se Actualizó el registro correctamente.');
                            }
                            ListarMercado();
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
    }
}

function OnError(data) {
    alert('Error 404...');
}

function AutocompletarUbigeo(item) {

    if ($("#txtubigeo_"+item).val().length > 0) {

        $.ajax({
            type: "POST",
            url: "../Services/AutocompletarUbigeo",
            data: "{vdescripcion:'" + $("#txtubigeo_"+item).val() + "'}",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.length > 0) {
                    //$("#txt_idubigeo").val(data[0].nidubigeo);
                    //$("#txt_ubigeo").val(data[0].vdescripcion);

                    //$("#message").html("Ubigeo seleccionado.");
                    //$("#message").css("color", "green");
                }
                else {
                    $("#txtidubigeo_"+item).val(0);

                    //$("#message").html("El Ubigeo que está registrando no existe.")
                    //$("#message").css("color", "red");

                }

            },
            failure: function (response) {
                alert(response.d);
            },
            error: OnError
        })

    }
    else {
        //$("#ubigeo_id").val(0);

    }
}
    