var modo, radio;
$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);


    $("#titulo").html('Gestión de Contenidos');

    //$('.textarea').wysihtml5();

    $("#txt_imagen").change(function () {
        NombreImagen();
    });

    ListarComboMenuPublicoPadreGestCont();
    ListarComboMenuPublicoHijoGestCont(0);

    $("#select_MenuPublicoPadreGestCont").change(function () {
        var nidmodulo = $("#select_MenuPublicoPadreGestCont").val();
        ListarComboMenuPublicoHijoGestCont(nidmodulo);
    });

    $("#btnListarContenidos").click(function () {
        var nidmodulopadre = $("#select_MenuPublicoPadreGestCont").val();
        var nidmodulohijo = $("#select_MenuPublicoHijoGestCont").val();
        ListarGestionContenido(nidmodulopadre, nidmodulohijo);
    });

    $("#btnAgregar").click(function () {
        sessionStorage.setItem("modo", "insertar");
        window.location = "../Mantenimiento/GestionContenidos_Registro";
    });

    $("#btnListarContenidos").click();


});

//CONTENIDO - LISTAR COMBO MENU PUBLICO PADRE
function ListarComboMenuPublicoPadreGestCont() {
    $.ajax({
        type: "POST",
        url: "../Services/ListarComboMenuPublicoPadreGestCont",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: LlenarComboMenuPublicoPadreGestCont,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError

    });
}
//CONTENIDO - CONSTRUIR COMBO MENU PUBLICO PADRE
function LlenarComboMenuPublicoPadreGestCont(data) {
    var selectAgregar = $("#select_MenuPublicoPadreGestCont");
    selectAgregar.empty();
    selectAgregar.append('<option value="0">--Seleccionar--</option>');
    for (i = 0; i < data.length; i++) {
        selectAgregar.append("<option value='" + data[i].nidModulo + "'>" + data[i].vnombre + "</option>");
    }
}


//MENUS - LISTAR COMBO MENU PUBLICO HIJO
function ListarComboMenuPublicoHijoGestCont(nidmodulo) {
    $.ajax({
        type: "POST",
        url: "../Services/ListarComboMenuPublicoHijoGestCont",
        data: "{nidmodulo:'" + nidmodulo + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: LlenarComboMenuPublicoHijoGestCont,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

//MENUS - CONSTRUIR COMBO MENU PUBLICO HIJO
function LlenarComboMenuPublicoHijoGestCont(data) {

    var select = $("#select_MenuPublicoHijoGestCont");
    select.empty();
    select.append('<option value="0">-- Seleccionar --</option>');

    for (var i = 0; i < data.length; i++) {
        select.append("<option value='" + data[i].nidModulo + "'>" + data[i].vnombre + "</option>");
    }

}



//LISTAR CONTENIDOS
function ListarGestionContenido(nidmodulopadre, nidmodulohijo) {

    $.ajax({
        type: "POST",
        url: "../Services/ListarGestionContenido",
        data: "{nidmodulopadre:'" + nidmodulopadre + "', nidmodulohijo:'" + nidmodulohijo + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarGestionContenidoSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarGestionContenidoSuccess(data) {
    var item = 1;
    var tabla = $("#GridListar");
    tabla.empty();

    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {

            tabla.append(
                        '<tr>' +
                            '<td style=display:none;>' + data[i].nidgestioncontenido + '</td>' +                           
                            '<td>' + data[i].vtitulo + '</td>' +
                            '<td>' + data[i].vdescripcion + '</td>' +                            
                            '<td><img src=/' + data[i].vimagen + '></td>' +
                            '<td>' + data[i].vestado + '</td>' +
                             '<td><a style="cursor:pointer;" title="Editar" onclick=EditarGestionContenido("' + data[i].nidgestioncontenido + '")><i class="far fa-edit"></i></a></td>' +
                        '</tr>'
                        )
           
            item = item + 1;

        }
    }

}

function EditarGestionContenido(nidgestioncontenido) {
    sessionStorage.setItem("nidgestioncontenido", nidgestioncontenido);    
    sessionStorage.setItem("modo", "editar");
    window.location = "../Mantenimiento/GestionContenidos_Registro";
}


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
function MostrarPopupGestionContenido(titulo, ancho, alto) {
    $("#fondoPopup").css('display', 'block');
    $("#tituloPopup").html(titulo);
    mostrarCentrarDiv('PopupGestionContenido', ancho, alto);
};

//CERRAR POPUP 
function CerrarPopupGestionContenido() {
    $("#fondoPopup").hide();
    $("#PopupGestionContenido").hide();
};



function OnError() {
    alert('Error 404 ...');
}


//-------------------------------------------------------------------------------------------------------------------



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