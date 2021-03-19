$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);

    $("#titulo").html('Asignar Categoría');
    
    ListarUsuarioMA();
    
        $("#btn_guardar_usucat_MA").click(function () {
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
            if (!($("input[type=checkbox]").is(':checked'))) {
                alert('Debe seleccionar por lo menos un registro de la lista.');
            }
            else {
                if ($("#select_usuario_MA").val()==0) {
                    alert("Seleccione un usuario");
                } else {
                    AsignarCategoriaMA(cadena);
                    $("input[type=checkbox]").prop('checked', false);
                    $("#select_usuario_MA").val(0);
                }
            }
        });
    $("select[name=select_usuario_MA]").change(function () {

        ListarCat();

    });

});

function CheckboxClick() {
    if ($("#select_usuario_MA").val() == 0) {
        alert("Seleccione un usuario");
        $("input[type=checkbox]").prop('checked', false);
    }
}

function ListarUsuarioMA() {
    $.ajax({
        type: "POST",
        url: "../Services/ListarUsuario_MesaAyuda",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarUsuarioMASuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarUsuarioMASuccess(data) {
    var select = $("#select_usuario_MA");

    select.empty();
    if (data.length > 0) {
        select.append('<option value="0">-- Seleccionar --</option>');
        for (var i = 0; i < data.length; i++) {
            select.append(
                '<option value=' + data[i].nidusuario + '>' + data[i].vnombres + '</option>' 
            );
        }
    }
    ListarCat();
}

function ListarCat() {
    var nidusuario = $("#select_usuario_MA").val();
    ListarCategoriaMA(nidusuario);
}

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
                '<td>Activar/Desactivar</td>' +
            '</tr > '
                );
    if (data.length > 0) {
        for (i = 0; i < data.length; i++) {
            cadena = cadena + "<tr><td style='display:none'>" + data[i].nidcategoria + "</td>";
            cadena = cadena + "<td>" + data[i].vdescripcion + "</td>";
            if (data[i].activado == 1) {
                cadena = cadena + "<td id='td_box' style='width:40px' ><input type='checkbox' checked name='check_estado' onclick='CheckboxClick();'></td></tr>"
            } else {
                cadena = cadena + "<td id='td_box' style='width:40px' ><input type='checkbox' name='check_estado' onclick='CheckboxClick();'></td></tr>"
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

function AsignarCategoriaMA(cadena) {
    var nidusuario = $("#select_usuario_MA").val();
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

function OnError() {
    alert("Error 404..");
}