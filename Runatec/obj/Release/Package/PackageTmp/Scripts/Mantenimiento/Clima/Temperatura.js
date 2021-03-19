var NroPagina = 1;
var j;
var pagina;
var modo;
var estado;
$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);
    $("#titulo").html('Temperatura');

    ListarGrilla(NroPagina);

    $("#btn_buscar").click(function () {
        ListarGrilla(NroPagina);
    });

    $("#AgregarTemperatura").click(function () {
        AgregarTemperatura();
        var fila = $("#tbody_listar tr").length;
        for (var i = 1; i <= fila; i++) {
            $("#btn_editar_" + i + "").css('pointer-events', "none");
        }
    });

    $("#AgregarBandas").click(function () {
        SelectBandasTemperatura();
    });

    $("#btn_registrarbandas").click(function () {
        RegistrarBandas();
    });
});

function ObtenerBandasTemperatura() {
    $.ajax({
        type: "POST",
        url: "../Services/ObtenerBandasTemperatura",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                $("#txt_fechafriomin").val(data[0].dfechafriomin);
                $("#txt_fechafriomax").val(data[0].dfechafriomax);
                $("#txt_fechacalientemin").val(data[0].dfechacalientemin);
                $("#txt_fechacalientemax").val(data[0].dfechacalientemax);
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function SelectBandasTemperatura() {
    $.ajax({
        type: "POST",
        url: "../Services/SelectBandasTemperatura",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: SelectBandasTemperaturaSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function SelectBandasTemperaturaSuccess(data) {
    var tbody = $("#popup_tbody_listar");
    tbody.empty();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            tbody.append(
                        '<tr>' +
                            '<td>' + data[i].dfecha + '</td>' +
                            '<td>' + data[i].ntemperaturaminima + '°C</td>' +
                            '<td>' + data[i].ntemperaturamaxima + '°C</td>' +
                            '<td>' + data[i].npromediominimo + '°C</td>' +
                            '<td>' + data[i].npromediomaximo + '°C</td>' +
                        '</tr>'
                        );
        }
    }
    ObtenerBandasTemperatura();
    MostrarPopupBandas('Editar Temporadas', 700, 430);
}

function RegistrarBandas() {

    var ntemperaturaminima = '0.00', ntemperaturamaxima = '0.00', npromediominimo = '0.00', npromediomaximo = '0.00', dfecha = '';
    var tiporegistro = 'banda';
    var fechafriomin = $("#txt_fechafriomin").val();
    var fechafriomax=$("#txt_fechafriomax").val();
    var fechacalientemin=$("#txt_fechacalientemin").val();
    var fechacalientemax=$("#txt_fechacalientemax").val();

    $.ajax({
        type: "POST",
        url: "../Services/RegistrarTemperatura",
        data: "{ntemperaturaminima:'" + ntemperaturaminima + "',ntemperaturamaxima:'" + ntemperaturamaxima +
            "', npromediominimo: '" + npromediominimo + "', npromediomaximo: '" + npromediomaximo + "', dfecha: '" + dfecha + "', tiporegistro: '" + tiporegistro +
            "', fechacalientemin: '" + fechacalientemin + "', fechacalientemax: '" + fechacalientemax + "', fechafriomin: '" + fechafriomin + "', fechafriomax: '" + fechafriomax + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data == 'truebanda') {
                    alert('Se agregaron correctamente las temporadas.');
                    SelectBandasTemperatura();
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

function ListarTemperatura(NroDePagina, RegPorPag, dfechainicio, dfechafin) {
    $.ajax({
        type: "POST",
        url: "../Services/ListarTemperatura",
        data: "{NroDePagina:'" + NroDePagina + "',RegPorPag:'" + RegPorPag + "',dfechainicio:'" + dfechainicio + "',dfechafin:'" + dfechafin + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarTemperaturaSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarTemperaturaSuccess(data) {

    var divpaginacion = $("#div_paginacion");
    var cadena = "";
    var regporpag = "20";
    var TotalRegistros = data[0].TotalRegistros;

    var item = 1;
    var tabla = $("#tbody_listar");
    tabla.empty();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            tabla.append(
                '<tr>' +
                '<td style="display:none;" id="tdid_' + item + '">' + data[i].nidtemperatura + '</td>' +
                '<td id="tdfecha_' + item + '">' + data[i].dfecha + '</td>' +
                '<td id="tdtempmin_' + item + '">' + data[i].ntemperaturaminima + '°C</td>' +
                '<td id="tdtempmax_' + item + '">' + data[i].ntemperaturamaxima + '°C</td>' +
                '<td id="tdprommin_' + item + '">' + data[i].npromediominimo + '°C</td>' +
                '<td id="tdprommax_' + item + '">' + data[i].npromediomaximo + '°C</td>' +
                '<td><a id="btn_editar_' + item + '" title="Editar" onclick="EditarTemperatura(' + item + ')"><i class="far fa-edit"></a></td>' +
                '<td><a id="btn_guardar_' + item + '" title="Guardar" onclick="GrabarTemperatura(' + item + ')"><i class="far fa-save"></a></td>' +
                '<td><a id="btn_cancelar_' + item + '" title="Cancelar" onclick="cancelar(' + item + ')"><i class="far fa-times-circle"></i></a></td>' +
                '</tr>'
            )

            $("#btn_guardar_" + item + "").css('pointer-events', "none");
            $("#btn_cancelar_" + item + "").css('pointer-events', "none");
            item = item + 1;
        }
    }

    divpaginacion.empty();

    cadena = cadena + '<ul class="contenido_paginacion">';
    if (data.length > 0) {
        var cantidad_paginas = Math.ceil(parseInt(TotalRegistros) / parseInt(regporpag));
        
        cadena = cadena + '<li class="pagina"><a onclick="Anterior();"><i class="fas fa-angle-left"></i></a></li>'
        if (parseInt(data[0].TotalRegistros) > parseInt(regporpag)) {
            for (j = 1; j <= cantidad_paginas; j++) {
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
        cadena = cadena + '<li class="pagina">-- No existen registros con los filtros seleccionados --</li>';
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

function ListarGrilla(NroPagina) {

    var RegPorPag = "20";
    var dfechainicio = $("#txt_dfechainicio").val();
    var dfechafin = $("#txt_dfechafin").val();

    ListarTemperatura(NroPagina, RegPorPag, dfechainicio, dfechafin);

    //la variable pagina almacena la pagina actual listada
    pagina = NroPagina;
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

//Inserta fila al presionar el botón "Agregar"
function AgregarTemperatura() {

    var fila = $("#tbody_listar tr").length;
    if (fila == 0) {
        $('#tbody_listar').empty();
    }

    var item = fila + 1;

    //AGREGAR FILA
    $('#tbody_listar').prepend("<tr>" +
        "<td id='tdfecha_" + item + "'  ><input id='txtfecha_" + item + "' type='date'></input></td>" +
        "<td id='tdtempmin_" + item + "'  ><input id='txttemperaturamin_" + item + "' type='number'></input></td>" +
        "<td id='tdtempmax_" + item + "'  ><input id='txttemperaturamax_" + item + "' type='number'></input></td>" +
        "<td id='tdprommin_" + item + "'  ><input id='txtpromediomin_" + item + "' type='number'></input></td>" +
        "<td id='tdprommax_" + item + "'  ><input id='txtpromediomax_" + item + "' type='number'></input></td>" +
        "<td><a id='btn_guardar_" + item + "' onclick='EditarTemperatura(" + item + ")' title='Editar'><i class='far fa-edit'></i></a></td>" +
        "<td><a id='btn_guardar_" + item + "' onclick='GrabarTemperatura(" + item + ")' title='Guardar'><i class='far fa-save'></i></a></td>" +
        "<td><a id='btn_cancelar_" + item + "' onclick='cancelar(" + item + ");' title='Cancelar'><i class='far fa-times-circle'></i></a></td>" +
        "</tr>");

    //Habilitar/deshabilitar controles
    $('#AgregarTemperatura').prop('disabled', true);
    $("#btn_cancelar_" + item + "").prop('disabled', false);
    $("#btn_guardar_" + item + "").prop('disabled', false);
    $("#btn_editar_" + item + "").prop('disabled', true);

    estado = 'nuevo';
}
function cancelar(item) {
    $("#AgregarTemperatura").off('click');
    $("#AgregarTemperatura").on("click", function () {
        AgregarTemperatura();
    });

    estado = '';
    ListarGrilla(NroPagina);
    //Habilitar/deshabilitar controles
    $('#AgregarTemperatura').prop('disabled', false);
}
function EditarTemperatura(item) {
    var fila = $("#GridListar tr").length;
    for (var i = 1; i <= fila; i++) {
        $("#btn_editar_" + i + "").css('pointer-events', "none");
    }

    estado = 'editar';

    //llenar fecha de temperatura
    var dfecha = $('#tdfecha_' + item).html();

    $('#tdfecha_' + item).html('');
    $('#tdfecha_' + item).append("<input id='txtfecha_" + item + "' type='date'>");
    $("#txtfecha_" + item).val(dfecha);

    //llenar temperatura mínima
    var ntemperaturaminima = $('#tdtempmin_' + item).html();
    //Elimino el '°C' de la cadena para que solo quede el dato
    ntemperaturaminima = ntemperaturaminima.replace('°C', '');
    $('#tdtempmin_' + item).html('');
    $('#tdtempmin_' + item).append("<input id='txttemperaturamin_" + item + "' type='number'>");
    $("#txttemperaturamin_" + item).val(ntemperaturaminima);
    //llenar temperatura máxima
    var ntemperaturamaxima = $('#tdtempmax_' + item).html();
    ntemperaturamaxima = ntemperaturamaxima.replace('°C', '');
    $('#tdtempmax_' + item).html('');
    $('#tdtempmax_' + item).append("<input id='txttemperaturamax_" + item + "' type='number'>");
    $("#txttemperaturamax_" + item).val(ntemperaturamaxima);
    //llenar promedio temperatura máxima
    var npromediominimo = $('#tdprommin_' + item).html();
    npromediominimo = npromediominimo.replace('°C', '');
    $('#tdprommin_' + item).html('');
    $('#tdprommin_' + item).append("<input id='txtpromediomin_" + item + "' type='number'>");
    $("#txtpromediomin_" + item).val(npromediominimo);
    //llenar promedio temperatura máxima
    var npromediomaximo = $('#tdprommax_' + item).html();
    npromediomaximo = npromediomaximo.replace('°C', '');
    $('#tdprommax_' + item).html('');
    $('#tdprommax_' + item).append("<input id='txtpromediomax_" + item + "' type='number'>");
    $("#txtpromediomax_" + item).val(npromediomaximo);

    //Habilitar/deshabilitar controles
    $('#AgregarTemperatura').prop('disabled', true);
    //$("#btn_editar_" + item + "").css('pointer-events', "none");
    $("#btn_guardar_" + item + "").css('pointer-events', "auto");
    $("#btn_cancelar_" + item + "").css('pointer-events', "auto");

    $("#txtfecha_" + item).focus();

}
function GrabarTemperatura(item) {

    //Habilitar/deshabilitar controles
    $('#AgregarTemperatura').prop('disabled', false);
    var sUrl = '';

    //NUEVO
    if (estado == 'nuevo') {
        sUrl = "../Services/RegistrarTemperatura";
    }
    else {
        //EDITAR 
        if (estado == 'editar') {
            var nidtemperatura = $('#tdid_' + item).html();
            sUrl = "../Services/EditarTemperatura";
        }
    }
    if (estado != null && estado.length > 0) {
        var dfecha = $("#txtfecha_" + item).val();
        var ntemperaturaminima = $("#txttemperaturamin_" + item).val();
        var ntemperaturamaxima = $("#txttemperaturamax_" + item).val();
        var npromediominimo = $("#txtpromediomin_" + item).val();
        var npromediomaximo = $("#txtpromediomax_" + item).val();
        var tiporegistro = 'normal';

        var fechacalientemin='', fechacalientemax='', fechafriomin='', fechafriomax='';

        if (dfecha == '') {
            alert("Ingrese el periodo.");
        }
        else if (ntemperaturaminima == '') {
            alert("Ingrese la temperatura mínima.");
        } else if (ntemperaturamaxima == '') {
            alert("Ingrese la temperatura máxima.");
        } else if (npromediominimo == '') {
            alert("Ingrese el promedio mínimo.");
        } else if (npromediomaximo == '') {
            alert("Ingrese el promedio máximo.");
        }
        else {
            $.ajax({
                type: "POST",
                url: sUrl,
                data: "{nidtemperatura:'" + nidtemperatura + "',ntemperaturaminima:'" + ntemperaturaminima + "',ntemperaturamaxima:'" + ntemperaturamaxima +
                    "', npromediominimo: '" + npromediominimo + "', npromediomaximo: '" + npromediomaximo + "', dfecha: '" + dfecha + "', tiporegistro: '" + tiporegistro +
                    "', fechacalientemin: '" + fechacalientemin + "', fechacalientemax: '" + fechacalientemax + "', fechafriomin: '" + fechafriomin + "', fechafriomax: '" + fechafriomax + "'}",
                dataType: "json",
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.length >= 0) {
                        if (data == 'true') {
                            if (estado == 'nuevo') {
                                alert('Se agregó el registro correctamente.');
                            } else {
                                alert('Se actualizó el registro correctamente.');
                            }
                            ListarGrilla(NroPagina);
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

//PopUp Bandas

function mostrarCentrarDiv(iddiv, w, h) {
    var striddiv = "#" + iddiv;
    var width = w + "px";
    var height = h + "px";
    var mleft = "-" + (w / 2) + "px";
    var mtop = "-" + (h / 2) + "px";
    $(striddiv).css({ 'width': width, 'height': height, 'left': '50%', 'top': '50%', 'margin-left': mleft, 'margin-top': mtop });
    $(striddiv).css('display', 'block');
};

function MostrarPopupBandas(titulo, ancho, alto) {
    $("#fondoPopup").css('display', 'block');
    $("#tituloPopup").html(titulo);
    mostrarCentrarDiv('PopupBandas', ancho, alto);
};

function CerrarPopupBandas() {
    $("#fondoPopup").hide();
    $("#PopupBandas").hide();
};