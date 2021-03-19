var modo;
$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);
    $("#titulo").html('Editorial');
    ListarEditorial();

    $("#txt_imagen").change(function () {
        NombreImagen();
    });

    $("#AgregarEditorial").click(function () {
        modo = 'nuevo';
        MostrarPopupEditorial('Nueva Editorial', '500', '450');
        $("#txt_ideditorial").val('');
        $("#txt_titulo").val('');
        $("#txt_contenido").val('');
        $("#select_estado").val('');
        $("#campo_imagen").html('');
        $("#labelfile").html('<i class="fas fa-upload"></i> Elige una imagen');
    });

    $("#GrabarEditorial").click(function () {
        var nideditorial = $("#txt_ideditorial").val();
        var vtitulo = $("#txt_titulo").val();
        var vcontenido = $("#txt_contenido").val();
        var vimagen = $("#txt_imagen").val();
        //var vimagen = document.getElementById('txt_imagen').files[0].name;
        var iestado = $("#select_estado").val();
        var vmodo;
        //INSERTAR
        if (modo == 'nuevo') {
            if ($("#txt_imagen").val() == '') {
                alert("Inserte una imagen.");
            } else if (vtitulo == '') {
                alert("Inserte un título.");
            } else if (vcontenido == '') {
                alert("Inserte contenido de la editorial.");
            } else if (iestado == '') {
                alert("Ingese el estado de la editorial.");
            } else {
                vimagen = document.getElementById('txt_imagen').files[0].name;
                InsertarEditorial(vtitulo, vcontenido, vimagen, iestado);
                CerrarPopupEditorial();
            }
            //EDITAR
        } else if (modo == 'editar') {
            if (vimagen == '') {//Si NO actualizan la imagen
                vmodo = 'noimagen';
            } else {//Si actualizan la imagen
                vmodo = 'imagen';
                vimagen = document.getElementById('txt_imagen').files[0].name;
            }

            if (vtitulo == '') {
                alert("Inserte un título.");
            } else if (vcontenido == '') {
                alert("Inserte contenido de la editorial.");
            } else if (iestado == '') {
                alert("Ingese el estado de la editorial.");
            } else {
                EditarEditorial(nideditorial, vtitulo, vcontenido, vimagen, iestado, vmodo);
                CerrarPopupEditorial();
            }
        }
    });

});

function NombreImagen() {
    //Insertar imagen
    var nombreimagen = $("#txt_imagen").val();
    if (nombreimagen != '') {
        nombreimagen = document.getElementById('txt_imagen').files[0].name;
        //Si el nombre de la imagen es muy grande solo se muestra una parte en el cuadro
        if (nombreimagen.length > 18) {
            $("#labelfile").html('<i class="fas fa-check"></i> ' + nombreimagen.substring(0, 8) + '...' + nombreimagen.substring((nombreimagen.length) - 5, nombreimagen.length));
        } else {
            $("#labelfile").html('<i class="fas fa-check"></i> ' + nombreimagen);
        }
    }
}

function ListarEditorial() {

    $.ajax({
        type: "POST",
        url: "../Services/ListarEditorialMantenimiento",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarEditorialMantenimientoSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarEditorialMantenimientoSuccess(data) {

    var tablaeditorial = $("#tablaeditorial");
    var vtitulo, vcontenido;
    if (data.length > 0) {
        tablaeditorial.empty();
        for (var i = 0; i < data.length; i++) {
            vtitulo = data[i].vtitulo;
            vcontenido = data[i].vcontenido;

            tablaeditorial.append(
                '<tr>' +
                    '<td>' + vtitulo.substring(0, 50) + '</td>' +
                    '<td>' + vcontenido.substring(0, 50) + '...</td>' +
                    '<td>' + data[i].iestado + '</td>' +
                    '<td><a style="cursor:pointer;" onclick=SelectEditorial("' + data[i].nideditorial + '")><i class="far fa-edit"></i></a></td>' +
                '</tr>'
            );
        }
    }
}

function SelectEditorial(nideditorial) {
    $.ajax({
        type: "POST",
        url: "../Services/SelectEditorial",
        data: "{nideditorial:'" + nideditorial + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: SelectEditorialSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function SelectEditorialSuccess(data) {
    modo = 'editar';

    $("#campo_imagen").html('');
    $("#campo_imagen").append('<img src="/' + data[0].vimagen + '"/>');
    $("#labelfile").html('<i class="fas fa-upload"></i> Elige una imagen');
    $("#txt_imagen").val('');
    $("#txt_ideditorial").val(data[0].nideditorial);
    $("#txt_titulo").val(data[0].vtitulo);
    $("#txt_contenido").val(data[0].vcontenido);
    $("#select_estado").val(data[0].iestado);
    MostrarPopupEditorial('Editar Editorial', '500', '580');
}

function EditarEditorial(nideditorial, vtitulo, vcontenido, vimagen, iestado, vmodo) {

    $.ajax({
        type: "POST",
        url: "../Services/EditarEditorial",
        data: "{nideditorial:'" + nideditorial + "', vtitulo:'" + vtitulo + "',vcontenido:'" + vcontenido + "',vimagen:'" + vimagen + "',iestado:'" + iestado + "', vmodo: '" + vmodo + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data == vimagen) {
                    ResultadoGuardarImagen(data);
                    alert("La editorial se actualizó correctamente.");
                    ListarEditorial();
                } else if (data == 'true') {
                    alert("La editorial se actualizó correctamente.");
                    ListarEditorial();
                }
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function InsertarEditorial(vtitulo, vcontenido, vimagen, iestado) {

    $.ajax({
        type: "POST",
        url: "../Services/InsertarEditorial",
        data: "{vtitulo:'" + vtitulo + "',vcontenido:'" + vcontenido + "',vimagen:'" + vimagen + "', iestado:'" + iestado + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data == vimagen) {
                    ResultadoGuardarImagen(data);
                    alert("La editorial se agregó correctamente.");
                    ListarEditorial();
                }
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ResultadoGuardarImagen(data) {
    var Resultado = data;

    if (Resultado != "Error") {
        GuardarImagen(Resultado);
    } else {
        alert("Ocurrió un problema al guardar la imagen.");
    }
};

function GuardarImagen(Resultado) {
    nombreImg = Resultado;
    var formData = new FormData();
    var file = $('#txt_imagen')[0];
    formData.append('file', file.files[0], nombreImg);

    $.ajax({
        url: '../api/fileImgEditorial',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (d) {

        },
        error: function () {
            alert('Ocurrió un problema al guardar la imagen.');
        }
    });

};

function OnError(data) {
    alert('Error 404...');
}

$("#PopupEditorial").draggable();

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
function MostrarPopupEditorial(titulo, ancho, alto) {
    $("#fondoPopup").css('display', 'block');
    $("#tituloPopup").html(titulo);
    mostrarCentrarDiv('PopupEditorial', ancho, alto);
};

//CERRAR POPUP 
function CerrarPopupEditorial() {
    $("#fondoPopup").hide();
    $("#PopupEditorial").hide();
};