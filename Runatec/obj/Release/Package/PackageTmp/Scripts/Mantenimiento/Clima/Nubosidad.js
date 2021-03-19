var NroPagina = 1;
var j;
var pagina;
var modo;
var estado;

$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);
    $("#titulo").html('Nubosidad');

    ListarGrilla(NroPagina);

    $("#AgregarNubosidad").click(function () {
        AgregarNubosidad();
        var fila = $("#tbody_listar tr").length;
        for (var i = 1; i <= fila; i++) {
            $("#btn_editar_" + i + "").css('pointer-events', "none");
        }
    });
});

function ListarNubosidad(NroDePagina, RegPorPag) {

    $.ajax({
        type: "POST",
        url: "../Services/ListarNubosidad",
        data: "{NroDePagina:'" + NroDePagina + "',RegPorPag:'" + RegPorPag + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarNubosidadSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarNubosidadSuccess(data) {

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
                '<td id="tdfecha_' + item + '">' + data[i].dfecha + '</td>' +
                '<td id="tddespejado_' + item + '">' + data[i].idespejado + ' ' +data[0].vunidad+'</td>' +
                '<td id="tdmaydespejado_' + item + '">' + data[i].imayormentedespejado + '%</td>' +
                '<td id="tdparcnublado_' + item + '">' + data[i].iparcialmentenublado + '%</td>' +
                '<td id="tdmaynublado_' + item + '">' + data[i].imayormentenublado + '%</td>' +
                '<td id="tdnublado_' + item + '">' + data[i].inublado + '%</td>' +
                '<td><a id="btn_guardar_' + item + '" title="Guardar" onclick="GrabarNubosidad(' + item + ')"><i class="far fa-save"></a></td>' +
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
    ListarNubosidad(NroPagina, RegPorPag);

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

function soloNumeros(e) {
    var key = window.Event ? e.which : e.keyCode
    return (key >= 48 && key <= 57)
}

//Inserta fila al presionar el botón "Agregar"
function AgregarNubosidad() {

    var fila = $("#tbody_listar tr").length;
    if (fila == 0) {
        $('#tbody_listar').empty();
    }

    var item = fila + 1;

    //AGREGAR FILA
    $('#tbody_listar').prepend("<tr>" +
        "<td id='tdfecha_" + item + "'  ><input id='txtfecha_" + item + "' type='date'></input></td>" +
        "<td id='tddespejado_" + item + "'  ><input id='txtdespejado_" + item + "' name='inputs' type='number' onchange='Valida(" + item + ")'></input></td>" +
        "<td id='tdmaydespejado_" + item + "'  ><input id='txtmaydespejado_" + item + "' name='inputs' type='number' onchange='Valida(" + item + ")'></input></td>" +
        "<td id='tdparcnublado_" + item + "'  ><input id='txtparcnublado_" + item + "' name='inputs' type='number' onchange='Valida(" + item + ")'></input></td>" +
        "<td id='tdmaynublado_" + item + "'  ><input id='txtmaynublado_" + item + "' name='inputs' type='number' onchange='Valida(" + item + ")'></input></td>" +
        "<td id='tdnublado_" + item + "'  ><input id='txtnublado_" + item + "' name='inputs' type='number' onchange='Valida(" + item + ")'></input></td>" +

        "<td><a id='btn_guardar_" + item + "' onclick='GrabarNubosidad(" + item + ")' title='Guardar'><i class='far fa-save'></i></a></td>" +
        "<td><a id='btn_cancelar_" + item + "' onclick='cancelar(" + item + ");' title='Cancelar'><i class='far fa-times-circle'></i></a></td>" +
        "</tr>");

    //Habilitar/deshabilitar controles
    $('#AgregarNubosidad').prop('disabled', true);
    $("#btn_cancelar_" + item + "").prop('disabled', false);
    $("#btn_guardar_" + item + "").prop('disabled', false);

    estado = 'nuevo';
}
function cancelar(item) {
    $("#AgregarNubosidad").off('click');
    $("#AgregarNubosidad").on("click", function () {
        AgregarNubosidad();
    });

    estado = '';
    ListarGrilla(NroPagina);
    //Habilitar/deshabilitar controles
    $('#AgregarNubosidad').prop('disabled', false);
}

function GrabarNubosidad(item) {

    //Habilitar/deshabilitar controles
    $('#AgregarNubosidad').prop('disabled', false);

    if (estado != null && estado.length > 0) {
        var dfecha = $("#txtfecha_" + item).val();

        var inublado = $("#txtnublado_" + item).val();
        var imayormentenublado = $("#txtmaynublado_" + item).val();
        var iparcialmentenublado = $("#txtparcnublado_" + item).val();
        var imayormentedespejado = $("#txtmaydespejado_" + item).val();
        var idespejado = $("#txtdespejado_" + item).val();

        var suma = parseFloat(inublado) + parseFloat(imayormentenublado) + parseFloat(iparcialmentenublado) + parseFloat(imayormentedespejado) + parseFloat(idespejado);

        if (dfecha == '') {
            alert("Ingrese el periodo.");
        } else if (inublado == '') {
            alert("Ingrese el valor 'Nublado'.");
        } else if (imayormentenublado == '') {
            alert("Ingrese el valor 'Mayormente Nublado'.");
        } else if (iparcialmentenublado == '') {
            alert("Ingrese el valor 'Parcialmente Nublado'.");
        } else if (imayormentedespejado == '') {
            alert("Ingrese el valor 'Mayormente Despejado'.");
        } else if (idespejado == '') {
            alert("Ingrese el valor 'Despejado'.");
        } else if (suma > 100 || suma < 0) {
            alert("La suma de todos los valores no puede ser mayor que 100 o negativo.");
        } else if (suma == 100) {
            $.ajax({
                type: "POST",
                url: "../Services/RegistrarNubosidad",
                data: "{inublado:'" + inublado + "',imayormentenublado:'" + imayormentenublado + "',iparcialmentenublado:'" + iparcialmentenublado +
                    "',imayormentedespejado:'" + imayormentedespejado + "',idespejado:'" + idespejado + "',dfecha:'" + dfecha + "'}",
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
        else {
            alert("Los valores deben sumar 100.");
        }
    }
}

function Valida(item) {
    var inublado = $("#txtnublado_" + item).val();
    var imayormentenublado = $("#txtmaynublado_" + item).val();
    var iparcialmentenublado = $("#txtparcnublado_" + item).val();
    var imayormentedespejado = $("#txtmaydespejado_" + item).val();
    var idespejado = $("#txtdespejado_" + item).val();

    if (inublado == '') {
        inublado = 0;
    }
    if (imayormentenublado == '') {
        imayormentenublado = 0;
    }
    if (iparcialmentenublado == '') {
        iparcialmentenublado = 0;
    }
    if (imayormentedespejado == '') {
        imayormentedespejado = 0;
    }
    if (inublado == '') {
        inublado = 0;
    }
    var suma = parseFloat(inublado) + parseFloat(imayormentenublado) + parseFloat(iparcialmentenublado) + parseFloat(imayormentedespejado) + parseFloat(idespejado);
   
    if (suma > 100) {
        alert("La suma de todos los valores no puede ser mayor que 100.");
    }

    //Autocompleta cuando todos están llenos excepto el valor 'nublado'
    if (parseFloat(imayormentenublado) > 0 && parseFloat(iparcialmentenublado) > 0 && parseFloat(imayormentedespejado) > 0 && parseFloat(idespejado) > 0 && suma < 100) {
        var nublado = 100 - suma;
        $("#txtnublado_" + item).val(nublado);
    }
}