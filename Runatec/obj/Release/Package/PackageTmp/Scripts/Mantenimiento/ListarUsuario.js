var estado_preferencia = '';
var modo;

var NroDePagina = 1;
var j;
var pagina;

var idmercado;//usada para listar los mercados preferidos por defecto al abrir el icono de preferencias
var nombremercado;
var cantidadcaracteres;
$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);

    $("#titulo").html('Usuario');
    ListarComboPerfil();

    ListarGrilla(NroDePagina);
    ListarComboEstado();    

    $("#btn_buscar").click(function () {
        ListarGrilla(NroDePagina);
    });

    $("#AgregarUsuario").click(function () {
        modo = 'insertar';
        LimpiarCampos();
        MostrarPopupUsuario('Agregar Usuario', '450', '580');

    });

    $("#btn_grabar").click(function () {
        if (modo == 'insertar') {

            
            if ($("#select_nidtipodocumento").val() == null) {
                alert("Ingrese el tipo de documento.");
            } else if ($("#txt_numerodocumento").val() == '') {
                alert("Ingrese su número de documento.");
            } else if ($("#txt_celular").val() == '') {
                alert("Ingrese el número de celular.");
            } else {
                InsertarUsuario();
            }
        } else if (modo == 'editar') {
        var nidusuario = $("#txt_nidusuario").val();
        var cadena = "";
        $("input[type=checkbox]:checked").each(function () {
            var result = [];
            var i = 0;
            $(this).closest('td').siblings().each(function () {
                result[i] = $(this).text();
                ++i;
            });
            cadena = cadena + result[0] + '|'
        });

        if ($("#select_nidtipodocumento").val() == null || $("#select_nidtipodocumento").val() == 0) {
            alert("Ingrese el tipo de documento.");
        } else if ($("#txt_numerodocumento").val() == '') {
            alert("Ingrese su número de documento.");
        } else if ($("#txt_celular").val() == '') {
            alert("Ingrese el número de celular.");
        } else {
            EditarUsuario();
            if ($("#select_perfil").val()==1) {
                if (!($("input[type=checkbox]").is(':checked'))) {
                    alert('Debe seleccionar por lo menos un registro de la lista.');
                } else {
                    AsignarCategoriaMA(cadena, nidusuario);
                    $("input[type=checkbox]").prop('checked', false);
                }
            }
        }
    }
    });


    //cambia de tamaños al popup dependiendo de si el acordeón está activo o no
    $("#boton_acordeon").click(function () {
        if (!$('button.boton_acordeon').hasClass('active')) {
            MostrarPopupUsuario('Editar Usuario', '450', '700');
        } else {
            MostrarPopupUsuario('Editar Usuario', '450', '600');

        }
    });

    $("#btn_cancelar").click(function () {
        CerrarPopupUsuario();
    });
    
    $("#txt_ubigeo").blur(function () {
        AutocompletarUbigeo();
    });

    //Acordeón de Categoría usuarios Mesa de Ayuda
    var acc = document.getElementsByClassName("boton_acordeon");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");
            /* activa y desctiva el panel siguiente que es el divusucat_MA */
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
    
});

function soloNumeros(e) {
    var key = window.Event ? e.which : e.keyCode
    return (key >= 48 && key <= 57)
}

function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúüabcdefghijklmnñopqrstuvwxyz";
    especiales = "8-37-39-46";

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}

function ListarUsuario(vcelular,razon_social,nidperfil,NroDePagina, RegPorPag) {

    $.ajax({
        type: "POST",
        url: "../Services/ListarUsuario",
        dataType: "json",
        data: "{vcelular:'" + vcelular + "', razon_social:'" + razon_social + "', nidperfil:'" + nidperfil + "', NroDePagina:'" + NroDePagina+"', RegPorPag:'"+RegPorPag+"'}",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarUsuarioSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarUsuarioSuccess(data) {
    var divpaginacion = $("#div_paginacion");
    var cadena = "";
    var regporpag = "20";
    var TotalRegistros = "1";

    var tabla = $("#GridListar");
    tabla.empty();
    if (data.length > 0)
    {
        for (var i = 0; i < data.length; i++) {
            tabla.append(
                        '<tr>' +
                            '<td>' + data[i].vperfil + '</td>' +
                            '<td>' + data[i].tipodocumento + '</td>' +
                            '<td>' + data[i].vnumdocumento + '</td>' +
                            '<td id=vnombres_' + i + ' name="' + data[i].vnombres + '">' + data[i].vnombres + '</td>' +
                            '<td>' + data[i].vcelular + '</td>' +
                            '<td>' + data[i].iestado + '</td>' +
                            '<td><a style="cursor:pointer;" onclick="SelectUsuario(' + data[i].nidusuario + ');" title="Editar"><i class="far fa-edit"></i></a></td>' +
                            '<td><a title=Preferencias style=cursor:pointer; onclick=ListarPreferencias(' + data[i].nidusuario + ',"#vnombres_' + i + '");><i class="fas fa-align-center"></i></a></td>' +
                        '</tr>'
                        )
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

            NroDePagina = 1;
        }
        cadena = cadena + '<li class="pagina"><a onclick="Siguiente();"><i class="fas fa-angle-right"></i></a></li>'
    }
    else {
        cadena = cadena + '<li class="pagina">-- No existen registros con los filtros seleccionados --</li>';
        NroDePagina  = 1;
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

function ListarGrilla(NroDePagina) {
    var vcelular = $("#txt_buscarcelular").val();
    var razon_social = $("#txt_buscarnombres").val();
    var nidperfil = $("#select_buscarperfil").val();

    var RegPorPag = "20";

    ListarUsuario(vcelular, razon_social, nidperfil, NroDePagina, RegPorPag);

    //la variable pagina almacena la pagina actual listada
    pagina = NroDePagina;
    $("#pagina_" + pagina).addClass('sombrear');
}

function SelectUsuario(nidusuario) {

    $.ajax({
        type: "POST",
        url: "../Services/SelectUsuario",
        dataType: "json",
        data: "{nidusuario:'" + nidusuario + "'}",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: SelectUsuarioSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function SelectUsuarioSuccess(data) {
    modo = 'editar';

    $("#txt_nidusuario").val(data[0].nidusuario);
    $("#select_nidtipodocumento").val(data[0].nidtipodocumento);
    $("#txt_numerodocumento").val(data[0].vnumdocumento);
    $("#txt_nombres").val(data[0].vnombres);
    $("#txt_paterno").val(data[0].vpaterno);
    $("#txt_materno").val(data[0].vmaterno);
    $("#select_sexo").val(data[0].vsexo);
    $("#txt_razonsocial").val(data[0].vrazonsocial);
    $("#txt_usuario").val(data[0].vusuario);
    $("#txt_email").val(data[0].vemail);
    $("#txt_telefono").val(data[0].vtelefono);
    $("#txt_celular").val(data[0].vcelular);
    $("#txt_direccion").val(data[0].vdireccion);
    $("#txt_ubigeo").val(data[0].vubigeo);
    $("#select_estado").val(data[0].iestado);
    $("#select_perfil").val(data[0].nidperfil);

    //Asignar categoría de los usuarios Adm en mesa de ayuda
    if (data[0].nidperfil == 1) {
        $("#contenedor_usucat_MA").css("display", "block");
        ListarCategoriaMA(data[0].nidusuario);
        //var boton_acordeon = document.getElementsByClassName("boton_acordeon");

        //if (!$('button.boton_acordeon').hasClass('active')) {
        //    MostrarPopupUsuario('Editar Usuario', '450', '600');
        //} else {
        //    MostrarPopupUsuario('Editar Usuario', '450', '700');

        //}
        MostrarPopupUsuario('Editar Usuario', '450', '600');

    } else {
        $("#contenedor_usucat_MA").css("display", "none");
        MostrarPopupUsuario('Editar Usuario', '450', '550');
    }
}
//INICIO MESA AYUDA

function ListarCategoriaMA(nidusuario) {
    $.ajax({
        type: "POST",
        url: "../Services/ListarCategoria_MesaAyuda",
        data: "{nidusuario:'" + nidusuario + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarCategoriaMASuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarCategoriaMASuccess(data) {
    var tbody = $("#tbody_listar_categoriaMA");
    tbody.empty();
    var cadena = "";
    tbody.append(
        '<tr class="titulo_categoria">' +
        '<td>Categoría</td>' +
        '<td>Seleccionar</td>' +
        '</tr> '
    );
    if (data.length > 0) {
        for (i = 0; i < data.length; i++) {
            cadena = cadena + "<tr><td style='display:none'>" + data[i].nidcategoria + "</td>";
            cadena = cadena + "<td>" + data[i].vdescripcion + "</td>";
            if (data[i].activado == 1) {
                cadena = cadena + "<td id='td_box' style='width:40px' ><input type='checkbox' checked name='check_estado'></td></tr>"
            } else {
                cadena = cadena + "<td id='td_box' style='width:40px' ><input type='checkbox' name='check_estado'></td></tr>"
            }
        }
    }
    else {
        cadena = cadena + "<center>" +
            "No hay registro(s) selecionado(s) por los criterios de busqueda" +
            "</center>";
    }
    tbody.append(cadena);
}

function AsignarCategoriaMA(cadena, nidusuario) {
    $.ajax({
        type: "POST",
        url: "../Services/AsignarCategoria_MesaAyuda",
        data: "{cadena:'" + cadena + "', nidusuario:'" + nidusuario + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data == 'true') {
                    alert("La asignación fue realizada.");
                } else {
                    alert("Ocurrió un error al grabar la información.");
                }
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}
//FIN MESA AYUDA

function EditarUsuario() {
    var nidusuario = $("#txt_nidusuario").val();
    var nidtipodocumento = $("#select_nidtipodocumento").val();
    var vnumdocumento = $("#txt_numerodocumento").val();
    var vnombres = $("#txt_nombres").val();
    var vpaterno = $("#txt_paterno").val();
    var vmaterno = $("#txt_materno").val();
    var vsexo = $("#select_sexo").val();
    var vrazonsocial = $("#txt_razonsocial").val();
    var vemail = $("#txt_email").val();
    var vtelefono = $("#txt_telefono").val();
    var vcelular = $("#txt_celular").val();
    var vdireccion = $("#txt_direccion").val();
    var vubigeo = $("#txt_ubigeo").val();
    var iestado = $("#select_estado").val();
    var nidperfil = $("#select_perfil").val();

    if (vdireccion = '') {
        vdireccion = '';
    }
    $.ajax({
        type: "POST",
        url: "../Services/EditarUsuario",
        dataType: "json",
        data: "{nidusuario:'" + nidusuario + "', nidtipodocumento:'" + nidtipodocumento + "',vnumdocumento:'" + vnumdocumento
                + "', vnombres:'" + vnombres + "',vpaterno:'" + vpaterno + "', vmaterno:'" + vmaterno + "',vsexo:'" + vsexo
                + "', vrazonsocial:'" + vrazonsocial + "', vemail:'" + vemail + "',vtelefono:'" + vtelefono
                + "', vcelular:'" + vcelular + "',vdireccion:'" + vdireccion + "', vubigeo:'" + vubigeo + "',iestado:'"
                + iestado + "', nidperfil:'" + nidperfil + "'}",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data == 'true') {
                    alert("El usuario se actualizó correctamente.");
                    CerrarPopupUsuario();
                    ListarGrilla(NroDePagina);
                } else if (data=='celular') {
                    alert("El celular ingresado ya existe, por favor ingrese otro.");
                }
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function InsertarUsuario() {

    var nidtipodocumento = $("#select_nidtipodocumento").val();
    var vnumdocumento = $("#txt_numerodocumento").val();
    var vnombres = $("#txt_nombres").val();
    var vpaterno = $("#txt_paterno").val();
    var vmaterno = $("#txt_materno").val();
    var vsexo = $("#select_sexo").val();
    var vrazonsocial = $("#txt_razonsocial").val();
    var vemail = $("#txt_email").val();
    var vtelefono = $("#txt_telefono").val();
    var vcelular = $("#txt_celular").val();
    var vdireccion = $("#txt_direccion").val();
    var vubigeo = $("#txt_ubigeo").val();
    var iestado = $("#select_estado").val();
    var nidperfil = $("#select_perfil").val();
    if (vdireccion = '') {
        vdireccion = '';
    }
    $.ajax({
        type: "POST",
        url: "../Services/InsertarUsuario",
        dataType: "json",
        data: "{nidtipodocumento:'" + nidtipodocumento + "',vnumdocumento:'" + vnumdocumento + "', vnombres:'" + vnombres
                + "',vpaterno:'" + vpaterno + "', vmaterno:'" + vmaterno + "',vsexo:'" + vsexo + "', vrazonsocial:'" + vrazonsocial
                + "',vemail:'" + vemail + "',vtelefono:'" + vtelefono + "', vcelular:'" + vcelular + "',vdireccion:'" + vdireccion
                + "', vubigeo:'" + vubigeo + "',iestado:'" + iestado + "', nidperfil:'" + nidperfil + "'}",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data == 'true') {
                    alert("El usuario se agregó correctamente.");
                    CerrarPopupUsuario();
                    ListarGrilla(NroDePagina);
                } else if (data=='celular') {
                    alert("Ya existe un usuario con ese número de celular, por favor, ingrese otro.");
                }
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarComboPerfil() {
    $.ajax({
        type: "POST",
        url: "../Services/ListarComboPerfil",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarComboPerfilSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarComboPerfilSuccess(data) {

    var select = $("#select_perfil");
    var selectbuscar = $("#select_buscarperfil");
    select.empty();
    selectbuscar.empty();

    select.append('<option value="0">-- Seleccionar --</option>');
    selectbuscar.append('<option value="0">-- Seleccionar --</option>');

    for (var i = 0; i < data.length; i++) {
        select.append("<option value='" + data[i].nidPerfil + "'>" + data[i].vnombrePerfil + "</option>");
        selectbuscar.append("<option value='" + data[i].nidPerfil + "'>" + data[i].vnombrePerfil + "</option>");
    }
}

function ListarComboEstado() {
    $.ajax({
        type: "POST",
        url: "../Services/ListarComboEstado",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarComboEstadoSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarComboEstadoSuccess(data) {

    var select = $("#select_estado");
    select.empty();
    select.append('<option value="0">-- Seleccionar --</option>');

    for (var i = 0; i < data.length; i++) {
        select.append("<option value='" + data[i].nidestado + "'>" + data[i].vdescripcion + "</option>");
    }
}

function LimpiarCampos() {
    $("#txt_nidusuario").val('');
    $("#select_nidtipodocumento").val(0);
    $("#txt_numerodocumento").val('');
    $("#txt_nombres").val('');
    $("#txt_paterno").val('');
    $("#txt_materno").val('');
    $("#select_sexo").val(0);
    $("#txt_razonsocial").val('');
    $("#txt_usuario").val('');
    $("#txt_email").val('');
    $("#txt_telefono").val('');
    $("#txt_celular").val('');
    $("#txt_direccion").val('');
    $("#txt_ubigeo").val('');
    $("#select_estado").val(0);
    $("#select_perfil").val(0);
}

//----------------------PREFERENCIAS--------------------------

//Filtra los productos de un mercado seleccionado
function FiltrarProductos(nidmercado, nombremercado) {
    var nidUsuario = $("#txt_nidusuariopreferencia").val();

    var nombre = $(nombremercado).attr("name");
    $("#titulo_productospreferidos").html('PRODUCTOS DE ' + nombre);

    SelectUsuarioPreferenciaProducto(nidUsuario, nidmercado);
    NoSelectUsuarioPreferenciaProducto(nidUsuario, nidmercado);
}

//Agregar y quitar mercados
function QuitarMercado() {
    var nidmercado = '';
    $("input[name=mercados]:checked").each(function () {

        nidmercado = nidmercado + $(this).val() + '|'
    });

    var nidUsuario = $("#txt_nidusuariopreferencia").val();
    EliminarPreferenciaMercadoUsuario(nidmercado, nidUsuario);
}

function AgregarMercado() {
    var nidmercado = '';
    $("input[name=no_mercados]:checked").each(function () {

        nidmercado = nidmercado + $(this).val() + '|'
    });

    var nidUsuario = $("#txt_nidusuariopreferencia").val();
    InsertarPreferenciaMercadoUsuario(nidmercado, nidUsuario);
}
//Agregar y quitar productos
function QuitarProducto() {
    var nidproducto = '';
    $("input[name=productos]:checked").each(function () {

        nidproducto = nidproducto + $(this).val() + '|'
    });
    var nidUsuario = $("#txt_nidusuariopreferencia").val();
    var nidmercado = $("input[name=mercados]:checked").val();
    if(nidmercado==undefined){
        alert("Debe seleccionar un mercado.");
    } else {
        EliminarPreferenciaProductoUsuario(nidproducto, nidUsuario, nidmercado);
    }
}

function AgregarProducto() {
    var nidproducto = '';
    $("input[name=no_productos]:checked").each(function () {

        nidproducto = nidproducto + $(this).val() + '|'
    });
    var nidUsuario = $("#txt_nidusuariopreferencia").val();
    var nidmercado = $("input[name=mercados]:checked").val();
    if (nidmercado == undefined) {
        alert("Debe seleccionar un mercado.");
    } else {
        InsertarPreferenciaProductoUsuario(nidproducto, nidUsuario, nidmercado);
    }
}

//---Lista las 4 tablas de preferencias y no preferencias(mercado y producto)---
function ListarPreferencias(nidusuario, nombres) {

    var vnombres = $(nombres).attr("name");

    $("#txt_nidusuariopreferencia").val(nidusuario);
    $("#txt_nombresusuariopreferencia").val(vnombres);
    var nombreusuario = $("#txt_nombresusuariopreferencia").val();
    $("#tituloPopupPreferencias").html('PREFERENCIAS DEL USUARIO: ' + nombreusuario);

    SelectUsuarioPreferenciaMercado(nidusuario);
    NoSelectUsuarioPreferenciaMercado(nidusuario);
    if (idmercado == undefined) {
        idmercado = 0;
    } 
    SelectUsuarioPreferenciaProducto(nidusuario,idmercado);
    NoSelectUsuarioPreferenciaProducto(nidusuario,idmercado);
    MostrarPopupPreferencias(1000, 520);
}

//Listar Preferencias de mercado de un usuario
function SelectUsuarioPreferenciaMercado(nidusuario) {

    $.ajax({
        type: "POST",
        url: "../Services/SelectUsuarioPreferenciaMercado",
        dataType: "json",
        data: "{nidusuario:'" + nidusuario + "'}",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: SelectUsuarioPreferenciaMercadoSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}


function SelectUsuarioPreferenciaMercadoSuccess(data) {
    var contenidomercado = $("#contenidomercado");
    var nidusuario = $("#txt_nidusuariopreferencia").val();
    contenidomercado.empty();
    if(data.length > 0){
        for (var i = 0; i < data.length; i++) {

            if (i == 0) {
                idmercado = data[i].nidmercado;
                nombremercado = data[i].vdescripcion;
            }
                contenidomercado.append(
                                        '<tr>' +
                                            '<td style="display:none;">' + data[i].nidmercado + '</td>' +
                                            '<td id=nombremercado_' + i + ' name="' + data[i].vdescripcion + '"><input type="checkbox" name=mercados value="' + data[i].nidmercado + '"><a style="cursor:pointer;" onclick=FiltrarProductos(' + data[i].nidmercado + ',"#nombremercado_' + i + '")>' + data[i].vdescripcion + '</a></td>' +
                                        '</tr>'
                                        );
        }
        $("#titulo_productospreferidos").html('PRODUCTOS DE '+nombremercado);
        SelectUsuarioPreferenciaProducto(nidusuario, idmercado);
    }
}

//Listar NO - Preferencias de mercado de un usuario
function NoSelectUsuarioPreferenciaMercado(nidusuario) {

    $.ajax({
        type: "POST",
        url: "../Services/NoSelectUsuarioPreferenciaMercado",
        dataType: "json",
        data: "{nidusuario:'" + nidusuario + "'}",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: NoSelectUsuarioPreferenciaMercadoSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function NoSelectUsuarioPreferenciaMercadoSuccess(data) {
    var contenido_nomercado = $("#contenido_nomercado");

    contenido_nomercado.empty();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            contenido_nomercado.append(
                                    '<tr>' +
                                        '<td style="display:none;"> - ' + data[i].nidmercado + '</td>' +
                                        '<td><input type="checkbox" name=no_mercados value="' + data[i].nidmercado + '">' + data[i].vdescripcion + '</td>' +
                                    '</tr>'
                                    );
        }
    }

}

//Listar Preferencias de producto de un usuario
function SelectUsuarioPreferenciaProducto(nidusuario, nidmercado) {

    $.ajax({
        type: "POST",
        url: "../Services/SelectUsuarioPreferenciaProducto",
        dataType: "json",
        data: "{nidusuario:'" + nidusuario + "', nidmercado:'" + nidmercado + "'}",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: SelectUsuarioPreferenciaProductoSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function SelectUsuarioPreferenciaProductoSuccess(data) {
    var contenidoproducto = $("#contenidoproducto");

    contenidoproducto.empty();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            contenidoproducto.append(
                                    '<tr>' +
                                        '<td style="display:none;"> - ' + data[i].nidproducto + '</td>' +
                                        '<td><input type="checkbox" name=productos value="'+data[i].nidproducto+'">' + data[i].vdescripcion_corta + '</td>' +
                                    '</tr>'
                                    );
        }
    }

}

//Listar NO - Preferencias de producto de un usuario
function NoSelectUsuarioPreferenciaProducto(nidusuario, nidmercado) {

    $.ajax({
        type: "POST",
        url: "../Services/NoSelectUsuarioPreferenciaProducto",
        dataType: "json",
        data: "{nidusuario:'" + nidusuario + "', nidmercado:'" + nidmercado + "'}",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: NoSelectUsuarioPreferenciaProductoSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function NoSelectUsuarioPreferenciaProductoSuccess(data) {
    var contenido_noproducto = $("#contenido_noproducto");

    contenido_noproducto.empty();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            contenido_noproducto.append(
                                    '<tr>' +
                '<td style="display:none;"> - ' + data[i].nidproducto + '</td>' +
                '<td id="tdproducto_' + data[i].nidproducto + '"><input type="checkbox" name=no_productos value="' + data[i].nidproducto + '">' + data[i].vdescripcion_corta + '</td>' +
                                    '</tr>'
                                    );
        }
    }

}

//Preferencias Mercados
function EliminarPreferenciaMercadoUsuario(cadena, nidUsuario) {
    
    $.ajax({
        type: "POST",
        url: "../Services/EliminarPreferenciaMercadoUsuario",
        dataType: "json",
        data: "{cadena:'" + cadena + "', nidUsuario:'" + nidUsuario + "'}",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data == 'true') {
                    SelectUsuarioPreferenciaMercado(nidUsuario);
                    NoSelectUsuarioPreferenciaMercado(nidUsuario);
                    SelectUsuarioPreferenciaProducto(nidUsuario, idmercado);
                    NoSelectUsuarioPreferenciaProducto(nidUsuario, idmercado);
                } 
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function InsertarPreferenciaMercadoUsuario(cadena, nidUsuario) {

    $.ajax({
        type: "POST",
        url: "../Services/InsertarPreferenciaMercadoUsuario",
        dataType: "json",
        data: "{cadena:'" + cadena + "', nidUsuario:'" + nidUsuario + "'}",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data == 'true') {
                    SelectUsuarioPreferenciaMercado(nidUsuario);
                    NoSelectUsuarioPreferenciaMercado(nidUsuario);
                } else if (data == 'limite') {
                    alert("Puede agregar 2 mercados como máximo.");
                }
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

//Preferencias Producto

function EliminarPreferenciaProductoUsuario(cadena, nidUsuario, nidmercado) {

    $.ajax({
        type: "POST",
        url: "../Services/EliminarPreferenciaProductoUsuario",
        dataType: "json",
        data: "{cadena:'" + cadena + "', nidUsuario:'" + nidUsuario + "', nidmercado:'" + nidmercado + "'}",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data == 'true') {
                    SelectUsuarioPreferenciaProducto(nidUsuario, nidmercado);
                    NoSelectUsuarioPreferenciaProducto(nidUsuario, nidmercado);
                }
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function InsertarPreferenciaProductoUsuario(cadena, nidUsuario, nidmercado) {
    ValidarCaracteres(nidUsuario);
    if (cantidadcaracteres <= 160) {
        $.ajax({
            type: "POST",
            url: "../Services/InsertarPreferenciaProductoUsuario",
            dataType: "json",
            data: "{cadena:'" + cadena + "', nidUsuario:'" + nidUsuario + "', nidmercado:'" + nidmercado + "'}",
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.length >= 0) {
                    if (data == 'true') {
                        SelectUsuarioPreferenciaProducto(nidUsuario, nidmercado);
                        NoSelectUsuarioPreferenciaProducto(nidUsuario, nidmercado);
                    } else if (data == 'limite') {
                        alert("Puede agregar hasta 3 productos en un mercado.");
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
        alert("Ha superado la cantidad de caracteres para el envío del SMS.");
    }

}

function AutocompletarUbigeo() {

    if ($("#txt_ubigeo").val().length > 0) {

        $.ajax({
            type: "POST",
            url: "../Services/AutocompletarUbigeo",
            data: "{vdescripcion:'" + $("#txt_ubigeo").val() + "'}",
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
                    $("#txt_idubigeo").val(0);

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
}

function ValidarCaracteres(nidusuario) {
    $.ajax({
        type: "POST",
        url: "../Services/ValidarCaracteres",
        dataType: "json",
        data: "{nidusuario:'" + nidusuario + "'}",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ValidarCaracteresSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ValidarCaracteresSuccess(data) {
    var mensaje = 'Chaskis-Precios ';
    //mercado,vdescripcion_corta,preciopromedio
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            //Llena mercado
            if (i == 0) {
                mensaje = mensaje + data[i].mercado+' ';
            } else if (data[i - 1].mercado != data[i].mercado) {
                mensaje = mensaje + data[i].mercado+' ';
            } else if (data[i - 1].mercado == data[i].mercado) {

            } 
            //Llena producto
            mensaje = mensaje + data[i].vdescripcion_corta+' ';
            //Llena el precio
            mensaje = mensaje + data[i].preciopromedio+' ';
        }
    }
    var idnuevoproducto = $("input[name='no_productos']:checked").val();
    var nombre = $("#tdproducto_" + idnuevoproducto + "").text();
    cantidadcaracteres = mensaje.length + nombre.length;

}

//Popup Usuario
$("#PopupUsuario").draggable();

function mostrarCentrarDiv(iddiv, w, h) {
    var striddiv = "#" + iddiv;
    var width = w + "px";
    var height = h + "px";
    var mleft = "-" + (w / 2) + "px";
    var mtop = "-" + (h / 2) + "px";
    $(striddiv).css({ 'width': width, 'height': height, 'left': '50%', 'top': '50%', 'margin-left': mleft, 'margin-top': mtop });
    $(striddiv).css('display', 'block');
};

function MostrarPopupUsuario(titulo, ancho, alto) {
    $("#fondoPopup").css('display', 'block');
    $("#tituloPopup").html(titulo);
    mostrarCentrarDiv('PopupUsuario', ancho, alto);
};

function CerrarPopupUsuario() {
    $("#fondoPopup").hide();
    $("#PopupUsuario").hide();
};

//PopUp Preferencias
$("#PopupPreferencias").draggable();

function mostrarCentrarDiv(iddiv, w, h) {
    var striddiv = "#" + iddiv;
    var width = w + "px";
    var height = h + "px";
    var mleft = "-" + (w / 2) + "px";
    var mtop = "-" + (h / 2) + "px";
    $(striddiv).css({ 'width': width, 'height': height, 'left': '50%', 'top': '50%', 'margin-left': mleft, 'margin-top': mtop });
    $(striddiv).css('display', 'block');
};

function MostrarPopupPreferencias(ancho, alto) {
    $("#fondoPopup").css('display', 'block');
    mostrarCentrarDiv('PopupPreferencias', ancho, alto);
};

function CerrarPopupPreferencias() {
    $("#fondoPopup").hide();
    $("#PopupPreferencias").hide();
};

function OnError() {
    alert("Error 404..");
}