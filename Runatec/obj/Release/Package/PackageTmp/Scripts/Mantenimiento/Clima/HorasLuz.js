var NroPagina = 1;
var j;
var pagina;
var modo;
var estado;
$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);
    $("#titulo").html('Horas de Luz');

    ListarGrilla(NroPagina);

    $("#AgregarLuz").click(function () {
        AgregarHorasLuz();
        var fila = $("#tbody_listar tr").length;
        for (var i = 1; i <= fila; i++) {
            $("#btn_editar_" + i + "").css('pointer-events', "none");
        }
    });

});

function ListarHorasLuz(NroDePagina, RegPorPag) {

    $.ajax({
        type: "POST",
        url: "../Services/ListarHorasLuz",
        data: "{NroDePagina:'" + NroDePagina + "',RegPorPag:'" + RegPorPag + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarHorasLuzSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarHorasLuzSuccess(data) {

    var divpaginacion = $("#div_paginacion");
    var cadena = "";
    var regporpag = "20";
    var TotalRegistros = "1";

    var item = 1;
    var tabla = $("#tbody_listar");
    tabla.empty();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            tabla.append(
                '<tr>' +
                '<td id="tddfecha_' + item + '">' + data[i].dfecha + '</td>' +
                '<td id="tddia_' + item + '">' + data[i].iduraciondia + ' h</td>' +
                '<td id="tdnoche_' + item + '">' + data[i].iduracionnoche + ' h</td>' +
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
        var cantidad_paginas = Math.ceil(parseInt(data[0].TotalRegistros) / parseInt(regporpag));

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
    ListarHorasLuz(NroPagina, RegPorPag);

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
function AgregarHorasLuz() {

    var fila = $("#tbody_listar tr").length;
    if (fila == 0) {
        $('#tbody_listar').empty();
    }

    var item = fila + 1;

    //AGREGAR FILA
    $('#tbody_listar').prepend("<tr>" +
        "<td id='tddfecha_" + item + "'  ><input id='txtfecha_" + item + "' type='date'></input></td>" +
        "<td id='tddia_" + item + "'><input type='number' id='txtdia_" + item + "' onkeyup='Validar(" + item + ")'/></td>" +
        "<td id='tdnoche_" + item + "'><input type='number' id='txtnoche_" + item + "' onkeyup='Validar(" + item + ")'/></td>" +
        "<td><a id='btn_guardar_" + item + "' onclick='GrabarHorasLuz(" + item + ")' title='Guardar'><i class='far fa-save'></i></a></td>" +
        "<td><a id='btn_cancelar_" + item + "' onclick='cancelar(" + item + ");' title='Cancelar'><i class='far fa-times-circle'></i></a></td>" +
        "</tr>");

    //Habilitar/deshabilitar controles
    $('#AgregarHorasLuz').prop('disabled', true);
    $("#btn_cancelar_" + item + "").prop('disabled', false);
    $("#btn_guardar_" + item + "").prop('disabled', false);

    estado = 'nuevo';
}
function cancelar(item) {
    $("#AgregarHorasLuz").off('click');
    $("#AgregarHorasLuz").on("click", function () {
        AgregarHorasLuz();
    });

    estado = '';
    ListarGrilla(NroPagina);
    //Habilitar/deshabilitar controles
    $('#AgregarHorasLuz').prop('disabled', false);
}

function GrabarHorasLuz(item) {

    //Habilitar/deshabilitar controles
    $('#AgregarHorasLuz').prop('disabled', false);

    if (estado != null && estado.length > 0) {
        var dfecha = $("#txtfecha_" + item).val();
        var iduraciondia = $("#txtdia_" + item).val();
        var iduracionnoche = $("#txtnoche_" + item).val();

        if (dfecha == '') {
            alert("Ingrese la fecha.");
        } else if (iduraciondia == '') {
            alert("Ingrese la duración del día.");
        } else if (iduracionnoche == '') {
            alert("Ingrese la duración de la noche.");
        } else if (parseFloat(iduraciondia) + parseFloat(iduracionnoche) != 24) {
            alert("Los valores deben sumar las 24 horas del día.");
        }

        else {
            $.ajax({
                type: "POST",
                url: "../Services/RegistrarHorasLuz",
                data: "{iduraciondia:'" + iduraciondia + "',iduracionnoche:'" + iduracionnoche + "', dfecha:'" + dfecha + "'}",
                dataType: "json",

                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.length >= 0) {
                        if (data == 'true') {
                            alert('Se agregó el registro correctamente.');
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

function Validar(item){
    var iduraciondia = $("#txtdia_" + item +"").val();
    var iduracionnoche = $("#txtnoche_" + item + "").val();
    if (iduraciondia != '') {
        iduracionnoche = 24 - parseFloat(iduraciondia);
        $("#txtnoche_" + item + "").val(iduracionnoche);
    } else if (iduracionnoche != '') {
        iduraciondia = 24 - parseFloat(iduracionnoche);
        $("#txtdia_" + item + "").val(iduraciondia);
    } 

        
}