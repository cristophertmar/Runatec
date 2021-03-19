var NroPagina = 1;
var j;
var pagina;
var modo;
$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);

    $("#titulo").html('Mantenimiento de Productos');

    ListarGrilla(NroPagina);

    //Listar los Combos de Producto
    ListarComboFamilia();
    ListarComboSubFamilia(0);
    ListarComboVariedad(0);
    ListarComboOrigen();
    ListarComboCalidad();
    ListarComboMedida();

    $("#select_familia").blur(function () {
        var nidfamilia = $("#select_familia").val();
        ListarComboSubFamilia(nidfamilia);
    });

    $("#select_subfamilia").blur(function () {
        var nidsubfamilia = $("#select_subfamilia").val();
        ListarComboVariedad(nidsubfamilia);
    });

    
    $("#AgregarProducto").click(function () {
        modo = 'insertar';
        //la fila estado se oculta
        $("#tr_estado").css("display", "none");
        //Mostrar el popup de agregar con los campos vacíos
        MostrarPopupProducto('Agregar Producto', '440', '360');
        $("#select_familia").val(0);
        $("#select_subfamilia").val(0);
        $("#select_variedad").val(0);
        $("#select_origen").val(0);
        $("#select_calidad").val(0);
        $("#select_medida").val(0);
        $("#txt_descripcioncorta").val('');
    });

    $("#GrabarProducto").click(function () {
        var vdescripcion_corta = $("#txt_descripcioncorta").val();
        var nidcalidad = $("#select_calidad").val();
        var nidmedida = $("#select_medida").val();
        var nidfamilia = $("#select_familia").val();
        var nidsubfamilia = $("#select_subfamilia").val();
        var nidvariedad = $("#select_variedad").val();
        var nidorigen = $("#select_origen").val();

        var iestado = $("#select_estado").val();
        var nidproducto = $("#nidproducto").val();

        if(modo=='insertar'){
            //alert(vdescripcion_corta + '- ' + nidcalidad + ' -' + nidmedida + '- ' + nidfamilia + ' -' + nidsubfamilia + '- ' + nidvariedad + '- ' + nidorigen)
            InsertarProducto(vdescripcion_corta, nidcalidad, nidmedida, nidfamilia, nidsubfamilia, nidvariedad, nidorigen);
        }
        else if(modo=='editar'){
            EditarProducto(nidproducto, vdescripcion_corta, nidcalidad, nidfamilia, nidsubfamilia, nidvariedad, nidorigen, iestado, nidmedida);
        }
        CerrarPopupProducto();
        ListarGrilla(NroPagina);
    });

    $("#txt_producto").change(function () {

        ListarGrilla(NroPagina);
    });

    $("#btn_buscar").click(function () {
        ListarGrilla(NroPagina);
    })

});

function ListarProducto(vdescripcion, NroDePagina,RegPorPag) {

    $.ajax({
        type: "POST",
        url: "../Services/ListarProducto",
        data: "{vdescripcion:'"+vdescripcion+"' ,NroDePagina:'" + NroDePagina + "',RegPorPag:'" + RegPorPag + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarProductoSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarProductoSuccess(data) {
    var divpaginacion = $("#div_paginacion");
    var cadena = "";
    var regporpag = "20";
    var TotalRegistros = "1";

    var item = 1;
    var tabla = $("#GridListar");
    tabla.empty();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            tabla.append(
                        '<tr>' +                            
                            '<td id="td_codigo_' + item + '">' + data[i].nidproducto + '</td>' +
                            '<td id="td_vdescripcion_' + item + '">' + data[i].vdescripcion + '</td>' +
                            '<td id="td_nidcalidad_' + item + '"> '+ data[i].nidcalidad + '</td>' +
                            '<td id=txtmedida_>' + data[i].vmedida + '</td>' +
                            '<td><a id="btn_editar_'+item+'" title="Editar" onclick="SelectProducto('+data[i].nidproducto+')"><i class="far fa-edit"></i></a></td>' +
                        '</tr>'
                        )
            item = item + 1;
        }

    }
    divpaginacion.empty();

    cadena = cadena + '<ul class="contenido_paginacion">';
    if (data.length > 0) {
        var cantidad_paginas = Math.ceil(parseInt(data[0].TotalRegistros) / parseInt(regporpag));

        cadena = cadena + '<li class="pagina"><a onclick="Anterior();"><i class="fas fa-angle-left"></i></a></li>'

        if (parseInt(data[0].TotalRegistros) > parseInt(regporpag)) {
            for (j = 1; j <= cantidad_paginas ; j++) {
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
    var vdescripcion = $("#txt_producto").val();
    ListarProducto(vdescripcion,NroPagina, RegPorPag);

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

function ListarComboFamilia() {
    $.ajax({
        type: "POST",
        url: "../Services/ListarComboFamilia",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarComboFamiliaSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarComboFamiliaSuccess(data) {

    var select = $("#select_familia");
    select.empty();
    select.append('<option value="0">-- Seleccionar --</option>');
    
    for (var i = 0; i < data.length; i++) {
        select.append("<option value='" + data[i].nidfamilia + "'>" + data[i].vdescripcion + "</option>");
    }
}

function ListarComboSubFamilia(nidfamilia) {
    $.ajax({
        type: "POST",
        url: "../Services/ListarComboSubFamilia",
        data: "{nidfamilia:'" + nidfamilia + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarComboSubFamiliaSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarComboSubFamiliaSuccess(data) {

    var select = $("#select_subfamilia");
    select.empty();
    select.append('<option value="0">-- Seleccionar --</option>');

    for (var i = 0; i < data.length; i++) {
        select.append("<option value='" + data[i].nidsubfamilia + "'>" + data[i].vdescripcion + "</option>");
    }

}

function ListarComboVariedad(nidsubfamilia) {
    $.ajax({
        type: "POST",
        url: "../Services/ListarComboVariedad",
        data: "{nidsubfamilia:'" + nidsubfamilia + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarComboVariedadSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarComboVariedadSuccess(data) {

    var select = $("#select_variedad");
    select.empty();
    select.append('<option value="0">-- Seleccionar --</option>');

    for (var i = 0; i < data.length; i++) {
        select.append("<option value='" + data[i].nidvariedad + "'>" + data[i].vdescripcion + "</option>");
    }

}

function ListarComboOrigen() {
    $.ajax({
        type: "POST",
        url: "../Services/ListarComboOrigen",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarComboOrigenSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarComboOrigenSuccess(data) {

    var select = $("#select_origen");
    select.empty();
    select.append('<option value="0">-- Seleccionar --</option>');

    for (var i = 0; i < data.length; i++) {
        select.append("<option value='" + data[i].nidorigen + "'>" + data[i].vdescripcion + "</option>");
    }
}

function ListarComboCalidad() {
    $.ajax({
        type: "POST",
        url: "../Services/ListarComboCalidad",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarComboCalidadSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarComboCalidadSuccess(data) {

    var select = $("#select_calidad");
    select.empty();
    select.append('<option value="0">-- Seleccionar --</option>');

    for (var i = 0; i < data.length; i++) {
        select.append("<option value='" + data[i].nidcalidad + "'>" + data[i].vdescripcion + "</option>");
    }
}

function ListarComboMedida() {
    $.ajax({
        type: "POST",
        url: "../Services/ListarComboMedida",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarComboMedidaSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarComboMedidaSuccess(data) {

    var select = $("#select_medida");
    select.empty();
    select.append('<option value="0">-- Seleccionar --</option>');

    for (var i = 0; i < data.length; i++) {
        select.append("<option value='" + data[i].nidmedida + "'>" + data[i].vdescripcion + "</option>");
    }
}

function InsertarProducto(vdescripcion_corta, nidcalidad, nidmedida, nidfamilia, nidsubfamilia, nidvariedad, nidorigen) {
    

    $.ajax({
        type: "POST",
        url: "../Services/InsertarProducto",
        data: "{vdescripcion_corta:'" + vdescripcion_corta + "',nidcalidad:'" + nidcalidad + "',nidmedida:'" + nidmedida + "',nidfamilia:'" + nidfamilia + "',nidsubfamilia:'" + nidsubfamilia + "',nidvariedad:'" + nidvariedad + "',nidorigen:'" + nidorigen + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data == 'true') {
                    alert("El producto se agregó correctamente.");
                }
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function SelectProducto(nidproducto) {
    modo = 'editar';
    
    $("#nidproducto").val(nidproducto);
        $.ajax({
            type: "POST",
            url: "../Services/SelectProducto",
            data: "{nidproducto:'" + nidproducto + "'}",
            dataType: "json",
            async: false,
            contentType: "application/json; charset=utf-8",
            success: SelectProductoSuccess,
            failure: function (response) {
                alert(response.d);
            },
            error: OnError
        });
}

function SelectProductoSuccess(data) {
    
    //Mostrar la fila estado para su edición
    $("#select_estado").css("display","block");
    //Listar los combos de acuerdo a los id de cada registro que se va editar
    ListarComboSubFamilia(data[0].nidfamilia);
    ListarComboVariedad(data[0].nidsubfamilia);
    ListarComboOrigen();
    ListarComboCalidad();
    ListarComboMedida();
    //establecer los registros en cada campo
    var nidproducto=data[0].nidproducto;
    $("#select_familia").val(data[0].nidfamilia);
    $("#select_subfamilia").val(data[0].nidsubfamilia);
    $("#select_variedad").val(data[0].nidvariedad);
    $("#select_origen").val(data[0].nidorigen);
    $("#select_calidad").val(data[0].nidcalidad);
    $("#select_medida").val(data[0].nidmedida);
    $("#select_estado").val(data[0].iestado);
    $("#txt_descripcioncorta").val(data[0].vdescripcion_corta);

    $("#nidproducto").val(nidproducto);

    MostrarPopupProducto('Editar Producto', '400', '350');
}

function EditarProducto(nidproducto, vdescripcion_corta, nidcalidad, nidfamilia, nidsubfamilia, nidvariedad, nidorigen, iestado, nidmedida) {
    $("#nidproducto").val(nidproducto);
    $.ajax({
        type: "POST",
        url: "../Services/EditarProducto",
        data: "{nidproducto:'" + nidproducto + "', vdescripcion_corta:'" + vdescripcion_corta + "',nidcalidad:'" + nidcalidad + "',nidfamilia:'" + nidfamilia + "',nidsubfamilia:'" + nidsubfamilia + "',nidvariedad:'" + nidvariedad + "', nidorigen:'" + nidorigen + "', iestado:'" + iestado + "', nidmedida:'" + nidmedida + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data == 'true') {
                    alert("El producto se actualizó correctamente.");
                }
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function OnError(data) {
    alert('Error 404...');
}

//PopUp Producto
$("#PopupProducto").draggable();

function mostrarCentrarDiv(iddiv, w, h) {
    var striddiv = "#" + iddiv;
    var width = w + "px";
    var height = h + "px";
    var mleft = "-" + (w / 2) + "px";
    var mtop = "-" + (h / 2) + "px";
    $(striddiv).css({ 'width': width, 'height': height, 'left': '50%', 'top': '50%', 'margin-left': mleft, 'margin-top': mtop });
    $(striddiv).css('display', 'block');
};

//ABRIR POPUP 
function MostrarPopupProducto(titulo, ancho, alto) {
    $("#fondoPopup").css('display', 'block');
    $("#tituloPopup").html(titulo);
    mostrarCentrarDiv('PopupProducto', ancho, alto);
};

//CERRAR POPUP 
function CerrarPopupProducto() {
    $("#fondoPopup").hide();
    $("#PopupProducto").hide();
};


