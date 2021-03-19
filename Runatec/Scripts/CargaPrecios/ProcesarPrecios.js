$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);

    $("#titulo").html('Procesar Precios');

    $("#txtfechainicio").val(FechaActual());
    $("#txtfechafin").val(FechaActual());

    ListarGrilla();
    ListarGrilla();
    ListarComboMercado();

    $("#btnBuscar").click(function () {
        //Imagen de Carga al listar la grilla
        ListarGrilla();
        });

    $("#idProcesar").click(function () {
        var cadena = "";

        //RECORRE TODAS LAS FILAS CON CHECK TRUE
        $("input[type=checkbox]:checked").each(function () {
            var result = [];
            var i = 0;
            //RECORRE LA CELDAS DE LA TABLA
            $(this).closest('td').siblings().each(function () {
                result[i] = $(this).text();
                
                i++;
            });

            //PREGUNTAR SI EL VALOR DEL IDDETALLE ES UN VALOR NUMERICO
            if ($.isNumeric(result[0])) {
                cadena = cadena + result[0] + '|'       //Captura el resultado de posición 0 (el id) y lo concatena a la cadena
            }

        });

        if (!($("input[type=checkbox]").is(':checked'))) {
            alert('Debe seleccionar por lo menos un registro de la lista.');
        }
        else {
            ProcesarDetalleHistorial(cadena);
            $("input[type=checkbox]").prop('checked', false);
        }

    });


    /*Marcar y desmarcar checkbox*/
    $("#marcarTodo").change(function () {
        if ($(this).is(':checked')) {
            $("input[type=checkbox]").prop('checked', true);
        } else {
            $("input[type=checkbox]").prop('checked', false);
        }
    });
});

function Cargando() {
    //$('#loading_wrap').css('display', 'block');

    MostrarPopupProceso('120', '120');
    //MostrarPopupCargando('10000','10000');
    //$("#fondoPopup").css('display','block');
}

function FechaActual() {
    var f = new Date();
    var dia = "" + f.getDate();
    var mes = "" + (f.getMonth() + 1)

    if (parseInt(dia) < 10) {
        dia = "0" + dia;
    }
    if (parseInt(mes) < 10) {
        mes = "0" + mes;
    }
    var fecha = (f.getFullYear() + "-" + mes + "-" + dia);
    return fecha;
}

function ListartempDetalleHistorial(nidmercado, dfechainicio, dfechafin) {
    $.ajax({
        type: "POST",
        url: "../Services/ListartempDetalleHistorial",
        data: "{nidmercado:'" + nidmercado + "',dfechainicio:'" + dfechainicio + "', dfechafin:'" + dfechafin + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListartempDetalleHistorialSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListartempDetalleHistorialSuccess(data) {
    var div_aviso = $("#div_aviso");
    var tabla = $("#GridListar");
    tabla.empty();
    div_aviso.empty();

    var a = 1;
    var variacion;
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].variacion == 0) { variacion = 0; }
            else { variacion = (data[i].variacion / data[i].promedio_anterior) * 100; }
             
            //if (data[i].promedio = 0 || data[i].promedio_anterior == 0) { variacion='-'; }
            tabla.append(
                        '<tr>' +
                            '<td id="nidtemp_'+i+'" style="display:none">' + data[i].nidtempdetallehistorial + '</td>' +
                            '<td style="display:none">' + data[i].fila + '</td>' +
                            '<td>' + data[i].dfecha + '</td>' +
                            '<td>' + data[i].vnombremercado + '</td>' +
                            '<td style="display:none">' + data[i].idproducto + '</td>' +
                            '<td>' + data[i].vnombreproducto + '</td>' +
                            '<td id="dprecio1_' + i + '">' + data[i].dprecio1 + '</td>' +
                            '<td id="dprecio2_' + i + '">' + data[i].dprecio2 + '</td>' +
                            '<td id="dprecio3_' + i + '">' + data[i].dprecio3 + '</td>' +
                            '<td id="dprecio4_' + i + '">' + data[i].dprecio4 + '</td>' +
                            '<td id="dprecio5_' + i + '">' + data[i].dprecio5 + '</td>' +
                            '<td id="dprecio6_' + i + '">' + data[i].dprecio6 + '</td>' +
                            '<td id="dprecio7_' + i + '">' + data[i].dprecio7 + '</td>' +
                            '<td id="dprecio8_' + i + '">' + data[i].dprecio8 + '</td>' +
                            '<td id="dprecio9_' + i + '">' + data[i].dprecio9 + '</td>' +
                            '<td id="dprecio10_' + i + '">' + data[i].dprecio10 + '</td>' +
                            //'<td style="color:black;">' + promedio + '</td>' +
                            '<td style="color:black;">' + data[i].promedio + '</td>' +
                            '<td style="color:black;">' + data[i].promedio_anterior + '</td>' +
                            '<td style="color:black;">'+variacion.toFixed(2)+'%</td>'+
                            '<td style="cursor:pointer;"><a id="btn_editar_' + i + '" title="Editar" onclick="EditarPrecios(' + i + ');"><i class="far fa-edit"></i></a></td>' +
                            '<td style="cursor:pointer;"><a id="btn_guardar_' + i + '" title="Guardar" onclick="GuardarPrecios(' + i + ');"><i class="far fa-save"></i></i></a></td>' +
                            '<td style="cursor:pointer;"><a id="btn_cancelar_' + i + '" title="Cancelar" onclick="Cancelar(' + i + ');"><i class="far fa-times-circle"></i></a></td>' +
                            '<td id=box_' + i + '><input type="checkbox"/></td>' +
                        '</tr>'
                        )
            a = a + 1;
            if (data[i].estado == 1) {
                $('#box_' + i).html('');
                $('#box_' + i).prop('title', 'Registro Procesado');
                $('#box_' + i).css('color', 'green');
                $('#box_' + i).append('<i class="far fa-check-circle"></i>');
            }
            $("#btn_guardar_" + i + "").css('pointer-events', "none");
            $("#btn_cancelar_" + i + "").css('pointer-events', "none");
        }

    } else {
        div_aviso.append('-- No existen registros con los filtros seleccionados. --');
    }
}

function ListarGrilla() {
    var nidmercado = $('#select_mercado').val();
    var dfechainicio = $('#txtfechainicio').val();
    var dfechafin = $('#txtfechafin').val();

    if (nidmercado == null) {
        nidmercado = '';
    }
    Cargando();
    setTimeout(function () { ListartempDetalleHistorial(nidmercado, dfechainicio, dfechafin); CerrarPopupProceso(); }, 500);  
}

function EditarPrecios(i) {
    var fila = $("#nidtemp_0").val();
    for (var a = 1; a <= fila; a++) {
        $("#btn_editar_" + a + "").css('pointer-events', "none");
    }

    //obtener id del registro a editar
    var nidtempdetallehistorial = $('#nidtemp_' + i).html();
    
    //llenar nombre de los precios
    var dprecio1 = $('#dprecio1_' + i).html();
    $('#dprecio1_' + i).html('');
    $('#dprecio1_' + i).append("<input id='txt_dprecio1_" + i + "' type='text' value='" + dprecio1 + "' class='inputs_precios'/>");

    var dprecio2 = $('#dprecio2_' + i).html();
    $('#dprecio2_' + i).html('');
    $('#dprecio2_' + i).append("<input id='txt_dprecio2_" + i + "' type='text' value='" + dprecio2 + "' class='inputs_precios'/>");

    var dprecio3 = $('#dprecio3_' + i).html();
    $('#dprecio3_' + i).html('');
    $('#dprecio3_' + i).append("<input id='txt_dprecio3_" + i + "' type='text' value='" + dprecio3 + "' class='inputs_precios'/>");

    var dprecio4 = $('#dprecio4_' + i).html();
    $('#dprecio4_' + i).html('');
    $('#dprecio4_' + i).append("<input id='txt_dprecio4_" + i + "' type='text' value='" + dprecio4 + "' class='inputs_precios'/>");

    var dprecio5 = $('#dprecio5_' + i).html();
    $('#dprecio5_' + i).html('');
    $('#dprecio5_' + i).append("<input id='txt_dprecio5_" + i + "' type='text' value='" + dprecio5 + "' class='inputs_precios'/>");

    var dprecio6 = $('#dprecio6_' + i).html();
    $('#dprecio6_' + i).html('');
    $('#dprecio6_' + i).append("<input id='txt_dprecio6_" + i + "' type='text' value='" + dprecio6 + "' class='inputs_precios'/>");

    var dprecio7 = $('#dprecio7_' + i).html();
    $('#dprecio7_' + i).html('');
    $('#dprecio7_' + i).append("<input id='txt_dprecio7_" + i + "' type='text' value='" + dprecio7 + "' class='inputs_precios'/>");

    var dprecio8 = $('#dprecio8_' + i).html();
    $('#dprecio8_' + i).html('');
    $('#dprecio8_' + i).append("<input id='txt_dprecio8_" + i + "' type='text' value='" + dprecio8 + "' class='inputs_precios'/>");

    var dprecio9 = $('#dprecio9_' + i).html();
    $('#dprecio9_' + i).html('');
    $('#dprecio9_' + i).append("<input id='txt_dprecio9_" + i + "' type='text' value='" + dprecio9 + "' class='inputs_precios'/>");

    var dprecio10 = $('#dprecio10_' + i).html();
    if (dprecio10 == '') $("#txt_dprecio10_" + i).val('');
    $('#dprecio10_' + i).html('');
    $('#dprecio10_' + i).append("<input id='txt_dprecio10_" + i + "' type='text' value='" + dprecio10 + "' class='inputs_precios'/>");
    
    ////Habilitar/deshabilitar controles
    $('#idProcesar').prop('disabled', true);
    $("#btn_editar_" + i + "").css('pointer-events', "none");
    $("#btn_guardar_" + i + "").css('pointer-events', "auto");
    $("#btn_cancelar_" + i + "").css('pointer-events', "auto");

    $("#txt_dprecio1_" + i).focus();
}

function GuardarPrecios(i) {
    $('#idProcesar').prop('disabled', false);
    
    var nidtempdetallehistorial = $('#nidtemp_' + i).html();
    var dprecio1 = $("#txt_dprecio1_" + i).val();
    var dprecio2 = $("#txt_dprecio2_" + i).val();
    var dprecio3 = $("#txt_dprecio3_" + i).val();
    var dprecio4 = $("#txt_dprecio4_" + i).val();
    var dprecio5 = $("#txt_dprecio5_" + i).val();
    var dprecio6 = $("#txt_dprecio6_" + i).val();
    var dprecio7 = $("#txt_dprecio7_" + i).val();
    var dprecio8 = $("#txt_dprecio8_" + i).val();
    var dprecio9 = $("#txt_dprecio9_" + i).val();
    var dprecio10 = $("#txt_dprecio10_" + i).val();

    $.ajax({
        type: "POST",
        url: "../Services/EditarPrecios_tempDetalleHistorial",
        data: "{nidtempdetallehistorial:'"+nidtempdetallehistorial+"',dprecio1:'" + dprecio1 + "',dprecio2:'" + dprecio2 
                + "',dprecio3:'" + dprecio3 + "',dprecio4:'" + dprecio4 + "',dprecio5:'" + dprecio5 + "',dprecio6:'" + dprecio6 
                + "',dprecio7:'" + dprecio7 + "',dprecio8:'" + dprecio8 + "',dprecio9:'" + dprecio9 + "',dprecio10:'" + dprecio10 + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data == 'true') {
                    alert("Los precios se actualizaron");
                    ListarGrilla();
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

function Cancelar(i){
    ListarGrilla();
}

function ProcesarDetalleHistorial(cadena) {
    
        $.ajax({
            type: "POST",
            url: "../Services/ProcesarDetalleHistorial",
            data: "{cadena:'"+cadena+"'}",
            dataType: "json",
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.length >= 0) {
                    if (data == 'exito') {
                        alert('Los registros fueron procesados');
                        ListarGrilla();
                    }
                    else {
                        alert('No se pudo procesar los registros.');
                    }
                }
            },
            failure: function (response) {
                alert(response);
            },
            error: OnError
        });
    

    //setTimeout(TiempoEspera, 1000);

};

function ListarComboMercado() {
    $.ajax({
        type: "POST",
        url: "../Services/ListarComboMercado",
        dataType: "json",
        async:false,
        contentType: "application/json; charset=utf-8",
        success: LlenarComboMercado,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError

    });
}

function LlenarComboMercado(data) {
    var selectAgregar = $("#select_mercado");
    selectAgregar.empty();
    selectAgregar.append('<option value="">--Seleccionar--</option>');
    for (i = 0; i < data.length; i++) {
        selectAgregar.append("<option value='" + data[i].nidmercado + "'>" + data[i].vdescripcion + "</option>");
    }
}

function OnError() {
    alert('Error 404 ...');
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
}
//ABRIR POPUP
function MostrarPopupProceso(ancho, alto) {
    $("#fondoPopup").css('display', 'block');
    mostrarCentrarDiv('PopupEnProceso', ancho, alto);
}
function CerrarPopupProceso() {
    $("#fondoPopup").hide();
    $("#PopupEnProceso").hide();
}