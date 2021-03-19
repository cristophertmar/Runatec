var modo, radio;
$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);

    $("#titulo").html('Noticias');
    ListarNoticia();
    ListarPrioridadNoticia();

    $("#txt_imagen").change(function () {
        NombreImagen();
    });

    $("#AgregarNoticia").click(function () {
        modo = 'nuevo';
        //Mostrar el popup de agregar con los campos vacíos
        MostrarPopupNoticia('Agregar Noticia', '500', '570');
        $("#txt_idnoticia").val('');
        $("#txt_imagen").val('');
        $("#txt_titulo").val('');
        $("#txt_contenido").val('');
        $("#txt_link").val('');
        $("#txt_fecha").val('');
        $("#select_estado").val('');
        $("#txt_descripcioncorta").val('');
        $("#campo_imagen").html('');
        $("#labelfile").html('<i class="fas fa-upload"></i> Elige una imagen');
    });

    $("#GrabarNoticia").click(function () {
        var nidnoticia = $("#txt_idnoticia").val();
        var vtitulo = $("#txt_titulo").val();
        var vcomentario = $("#txt_contenido").val();
        var vlink = $("#txt_link").val();
        var vimagen = $("#txt_imagen").val();
        //var vimagen = document.getElementById('txt_imagen').files[0].name;
        var dfecha = $("#txt_fecha").val();
        var iestado = $("#select_estado").val();
        var vmodo;
        //INSERTAR
        if (modo == 'nuevo') {
            if ($("#txt_imagen").val() == '') {
                alert("Inserte una imagen.");
            } else if (vtitulo == '') {
                alert("Inserte un título.");
            } else if (vcomentario == '') {
                alert("Inserte contenido de la noticia.");
            } else if (dfecha == '') {
                alert("Inserte una fecha.");
            } else if (iestado == '') {
                alert("Ingese el estado de la noticia.");
            } else {
                vimagen = document.getElementById('txt_imagen').files[0].name;
                InsertarNoticia(vtitulo, vcomentario, vlink, vimagen, dfecha, iestado);
                CerrarPopupNoticia();
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
            } else if (vcomentario == '') {
                alert("Inserte contenido de la noticia.");
            } else if (dfecha == '') {
                alert("Inserte una fecha.");
            } else if (iestado == '') {
                alert("Ingese el estado de la noticia.");
            } else {
                EditarNoticia(nidnoticia, vtitulo, vcomentario, vlink, vimagen, dfecha, iestado, vmodo);
                CerrarPopupNoticia();
            }
        }
    });


    $("#PrioridadNoticia").click(function () {
        MostrarPopupPrioridadNoticia('Ordenar Noticias', '580', '480');

        //Desactivar inputs radio
        var grupoprioridad = document.getElementsByName('prioridad');
        for (var i = 0; i < grupoprioridad.length; i++) {
            var radioprioridad = grupoprioridad[i];
            radioprioridad.checked = false;
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

function ListarNoticia() {

    $.ajax({
        type: "POST",
        url: "../Services/ListarNoticia",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarNoticiaSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarNoticiaSuccess(data) {

    var tablanoticia = $("#tablanoticia");
    var vtitulo, vcomentario;
    if (data.length > 0) {
        tablanoticia.empty();
        for (var i = 0; i < data.length; i++) {
            vtitulo = data[i].vtitulo;
            vcomentario = data[i].vcomentario;

            tablanoticia.append(
                '<tr>' +
                '<td>' + data[i].dfecha + '</td>' +
                '<td>' + vtitulo.substring(0, 50) + '...</td>' +
                '<td>' + vcomentario.substring(0, 70) + '...</td>' +
                '<td>' + data[i].iestado + '</td>' +
                '<td><a style="cursor:pointer;" title="Editar" onclick=SelectNoticia("' + data[i].nidnoticia + '")><i class="far fa-edit"></i></a></td>' +
                '<td><a style="cursor:pointer;" title="Eliminar" onclick=EliminarNoticia("' + data[i].nidnoticia + '")><i class="far fa-trash-alt"></i></a></td>' +
                '</tr>'
            );
        }
    }
}

function SelectNoticia(nidnoticia) {
    $.ajax({
        type: "POST",
        url: "../Services/SelectNoticia",
        data: "{nidnoticia:'" + nidnoticia + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: SelectNoticiaSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function SelectNoticiaSuccess(data) {
    modo = 'editar';

    $("#campo_imagen").html('');
    $("#campo_imagen").append('<img src="/' + data[0].vimagen + '"/>');
    $("#labelfile").html('<i class="fas fa-upload"></i> Elige una imagen');
    $("#txt_imagen").val('');
    $("#txt_idnoticia").val(data[0].nidnoticia);
    $("#txt_fecha").val(data[0].dfecha);
    $("#txt_titulo").val(data[0].vtitulo);
    $("#txt_link").val(data[0].vlink);
    $("#txt_contenido").val(data[0].vcomentario);
    $("#select_estado").val(data[0].iestado);
    MostrarPopupNoticia('Editar Noticia', '500', '600');
}

function EditarNoticia(nidnoticia, vtitulo, vcomentario, vlink, vimagen, dfecha, iestado, vmodo) {

    $.ajax({
        type: "POST",
        url: "../Services/EditarNoticia",
        data: "{nidnoticia:'" + nidnoticia + "', vtitulo:'" + vtitulo + "',vcomentario:'" + vcomentario + "',vlink:'" + vlink + "',vimagen:'" + vimagen + "',dfecha:'" + dfecha + "', iestado:'" + iestado + "', vmodo: '" + vmodo + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data == vimagen) {
                    ResultadoGuardarImagen(data);
                    alert("La noticia se actualizó correctamente.");
                    ListarNoticia();
                } else if (data == 'true') {
                    alert("La noticia se actualizó correctamente.");
                    ListarNoticia();
                }
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function InsertarNoticia(vtitulo, vcomentario, vlink, vimagen, dfecha, iestado) {

    $.ajax({
        type: "POST",
        url: "../Services/InsertarNoticia",
        data: "{vtitulo:'" + vtitulo + "',vcomentario:'" + vcomentario + "',vlink:'" + vlink + "',vimagen:'" + vimagen + "',dfecha:'" + dfecha + "', iestado:'" + iestado + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data == vimagen) {
                    ResultadoGuardarImagen(data);
                    alert("La noticia se agregó correctamente.");
                    ListarNoticia();
                } else {
                    alert("Ocurrió un error al guardar la noticia.");
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
        alert("Ocurrio un error al intentar insertar los datos.")
    }
};

function GuardarImagen(Resultado) {
    nombreImg = Resultado;
    var formData = new FormData();
    var file = $('#txt_imagen')[0];
    formData.append('file', file.files[0], nombreImg);

    $.ajax({
        url: '../api/fileImgNoticia',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (d) {

        },
        error: function () {
            alert('Ocurrió un problema al guardar la imagen');
        }
    });

};

function OnError(data) {
    alert('Error 404...');
}


function ListarPrioridadNoticia() {

    $.ajax({
        type: "POST",
        url: "../Services/ListarNoticia",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarPrioridadNoticiaSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarPrioridadNoticiaSuccess(data) {
    var GridPopup = $("#GridPopup");
    GridPopup.empty();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var vtitulo = data[i].vtitulo;
            GridPopup.append(
                '<tr>' +
                '<td style="text-align:center; width:30px;">' + parseInt(i + 1) + '</td>' +
                '<td style="text-align:center; width:30px;">' + data[i].iprioridad + '</td>' +
                '<td><label for="titulo_' + data[i].nidnoticia + '" style="cursor:pointer;">' + vtitulo.substring(0, 50) + '...</label></td>' +
                '<td><input type="radio" class="radio" id="titulo_' + data[i].nidnoticia + '" name="prioridad" value="' + data[i].nidnoticia + '"></td>' +
                '</tr>'
            );
        }

        $("#titulo_" + radio + "").prop("checked", true);//Mantiene el radio seleccionado después de la actualización
    }
}

function SubirPrioridadNoticia(nidnoticia) {
    $.ajax({
        type: "POST",
        url: "../Services/SubirPrioridadNoticia",
        data: "{nidnoticia:'" + nidnoticia + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data == 'true') {
                    ListarNoticia();
                    ListarPrioridadNoticia();
                } else if (data == 'limite') {
                    alert("Llegó a la máxima prioridad.");
                }
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function SubirPrioridad() {
    var nidnoticia = $('input:radio[name=prioridad]:checked').val();
    radio = nidnoticia;//Almacenar el id en la variable radio para mantener el radio seleccionado
    if (nidnoticia == undefined) {
        alert("Elija una opción.");
    } else {
        SubirPrioridadNoticia(nidnoticia);
    }
}

function BajarPrioridadNoticia(nidnoticia) {
    $.ajax({
        type: "POST",
        url: "../Services/BajarPrioridadNoticia",
        data: "{nidnoticia:'" + nidnoticia + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data == 'true') {
                    ListarNoticia();
                    ListarPrioridadNoticia();
                } else if (data == 'limite') {
                    alert("Llegó a la mínima prioridad.");
                }
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}
function BajarPrioridad() {
    var nidnoticia = $('input:radio[name=prioridad]:checked').val();
    radio = nidnoticia;
    if (nidnoticia == undefined) {
        alert("Elija una opción.");
    } else {
        BajarPrioridadNoticia(nidnoticia);
    }
}

function EliminarNoticia(nidnoticia) {
    var opcion = confirm("¿Está seguro que desea eliminar este registro?");
    if (opcion == true) {
        $.ajax({
            type: "POST",
            url: "../Services/Eliminarnoticia",
            data: "{nidnoticia:'" + nidnoticia + "'}",
            dataType: "json",
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.length >= 0) {
                    if (data == 'true') {
                        alert("Se eliminó la noticia correctamente.");
                        ListarNoticia();

                    } else {
                        alert("Ocurrió un error:'" + data + "'");
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

$("#PopupNoticia").draggable();

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
function MostrarPopupNoticia(titulo, ancho, alto) {
    $("#fondoPopup").css('display', 'block');
    $("#tituloPopup").html(titulo);
    mostrarCentrarDiv('PopupNoticia', ancho, alto);
};

//CERRAR POPUP 
function CerrarPopupNoticia() {
    $("#fondoPopup").hide();
    $("#PopupNoticia").hide();
};


$("#PopupPrioridadNoticia").draggable();
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
function MostrarPopupPrioridadNoticia(titulo, ancho, alto) {
    $("#fondoPopup").css('display', 'block');
    $("#tituloPopupPrioridad").html(titulo);
    mostrarCentrarDiv('PopupPrioridadNoticia', ancho, alto);
};

//CERRAR POPUP 
function CerrarPopupPrioridadNoticia() {
    $("#fondoPopup").hide();
    $("#PopupPrioridadNoticia").hide();
}