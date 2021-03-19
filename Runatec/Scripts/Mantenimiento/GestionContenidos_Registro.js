
$(document).ready(function () {

    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);

 

    $("#txt_imagen").change(function () {
        NombreImagen();
    });

    ListarComboMenuPublicoPadreGestCont();
    ListarComboMenuPublicoHijoGestCont(0);

    $("#select_MenuPublicoPadreGestCont").change(function () {
        var nidmodulo = $("#select_MenuPublicoPadreGestCont").val();
        ListarComboMenuPublicoHijoGestCont(nidmodulo);
    });


    // $('#summernote').summernote();

    var modo = sessionStorage.getItem("modo");

    $("#titulo").html('Insertar - Registro de Contenido');

    if (modo == 'editar')
    {
        $("#titulo").html('Editar - Registro de Contenido');
        var nidgestioncontenido = sessionStorage.getItem("nidgestioncontenido");
        SelectGestionContenido(nidgestioncontenido);
    }

    

    $("#btnRetornar").click(function () {
        window.location = "../Mantenimiento/GestionContenidos";
    });

   
    $("#btnGrabar").click(function () {

        var nidgestioncontenido = $('#nidgestioncontenido').html();
        var nidModuloPadre = $('#select_MenuPublicoPadreGestCont').val();
        var nidModuloHijo = $('#select_MenuPublicoHijoGestCont').val();
        var vtitulo = $('#txt_titulo').val();
        var vdescripcion = $('#txt_descripcion').val();
       
        var vimagen = $("#txt_imagen").val();
        var iestado = $("#select_estado").val();
        var vmodo;

        if (modo == 'insertar') {
           

            if ($("#txt_imagen").val() == '') {
                alert("Inserte una imagen.");
            } else if (vtitulo == '') {
                alert("Inserte un título.");
            } else if (vdescripcion == '') {
                alert("Inserte una descripción.");
            } else if (vdetalle == '') {
                alert("Inserte los detalles.");
            } else if (iestado == '') {
                alert("Ingrese el estado.");
            } else {

                //BLOQUEA LOS DETALLES DEL EDITOR DE TEXTO
                var markup = $('.click2edit').summernote('code');
                $('.click2edit').summernote('destroy');

                //ENVIA EL CONTENIDO DEL EDITOR
                var vdetalle = $('#editartext').html();

                //AGREGA EL NUEVO REGISTRO
                vimagen = document.getElementById('txt_imagen').files[0].name;              
                InsertarGestionContenido(nidModuloPadre, nidModuloHijo, vtitulo, vdescripcion, vdetalle, vimagen)           
            }


        }
        else
        {           

            if (vimagen == '') {//Si NO actualizan la imagen
                vmodo = 'noimagen';
            } else {//Si actualizan la imagen
                vmodo = 'imagen';
                vimagen = document.getElementById('txt_imagen').files[0].name;
            }

            //BLOQUEA LOS DETALLES DEL EDITOR DE TEXTO
             var markup = $('.click2edit').summernote('code');
             $('.click2edit').summernote('destroy');

            //ENVIA EL CONTENIDO DEL EDITOR
             var vdetalle = $('#editartext').html();

            //EDITA LA INFORMACION DEL REGISTRO
            EditarGestionContenido(nidgestioncontenido, nidModuloPadre,nidModuloHijo, vtitulo, vdescripcion, vdetalle, vimagen, iestado, vmodo)

        }

        

       
    });

    //HABLITA LOS DETALLES DEL EDITOR DE TEXTO
    $('.click2edit').summernote({ focus: true });

   // $('#editartext').html('<h1 style="text-align: center; "><b><u>xzvxxvxc gdfgdf kyuyiui&nbsp;&nbsp;</u></b></h1><p style="text-align: center;">trytry tyutiu</p><p><iframe frameborder="0" src="//www.youtube.com/embed/zXpjm3YbzIs" width="640" height="360" class="note-video-clip"></iframe><br></p>');

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




//SELECCIONAR IMAGEN

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

//EDITAR CONTENIDO
function SelectGestionContenido(nidgestioncontenido) {
    $.ajax({
        type: "POST",
        url: "../Services/SelectGestionContenido",
        data: "{nidgestioncontenido:'" + nidgestioncontenido + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: SelectGestionContenidoSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
};

function SelectGestionContenidoSuccess(data) {
   
    $("#campo_imagen").html('');
    $("#campo_imagen").append('<img src="/' + data[0].vimagen + '"/>');
    $("#labelfile").html('<i class="fas fa-upload"></i> Elige una imagen');
    $("#txt_imagen").val('');
    $("#nidgestioncontenido").html(data[0].nidgestioncontenido);
    $("#select_MenuPublicoPadreGestCont").val(data[0].nidModuloPadre);
    ListarComboMenuPublicoHijoGestCont(data[0].nidModuloPadre);
    $("#select_MenuPublicoHijoGestCont").val(data[0].nidModuloHijo);
    $("#txt_titulo").val(data[0].vtitulo);
    $("#txt_descripcion").val(data[0].vdescripcion);
    $('#editartext').html(data[0].vdetalle);
    $("#select_estado").val(data[0].iestado);    
};


function InsertarGestionContenido(nidModuloPadre, nidModuloHijo, vtitulo, vdescripcion, vdetalle, vimagen) {

    $.ajax({
        type: "POST",
        url: "../Services/InsertarGestionContenido",
        data: "{nidModuloPadre:'" + nidModuloPadre + "', nidModuloHijo:'" + nidModuloHijo + "', vtitulo:'" + vtitulo + "',vdescripcion:'" + vdescripcion + "',vdetalle:'" + vdetalle + "',vimagen:'" + vimagen + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {

               
                if (data == vimagen) {
                    ResultadoGuardarImagen(data);
                    alert("El Contenido se Inserto correctamente.");
                    window.location = "../Mantenimiento/GestionContenidos";
                } else if (data == 'true') {
                    alert("El Contenido se Inserto correctamente.");
                    window.location = "../Mantenimiento/GestionContenidos";
                   
                }else{
                    alert(data);
                }
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });

};

function EditarGestionContenido(nidgestioncontenido, nidModuloPadre,nidModuloHijo, vtitulo, vdescripcion, vdetalle, vimagen, iestado, vmodo){

    $.ajax({
        type: "POST",
        url: "../Services/EditarGestionContenido",
        data: "{nidgestioncontenido:'" + nidgestioncontenido + "', nidModuloPadre:'" + nidModuloPadre + "', nidModuloHijo:'" + nidModuloHijo + "',vtitulo:'" + vtitulo + "',vdescripcion:'" + vdescripcion + "',vdetalle:'" + vdetalle + "',vimagen:'" + vimagen + "', iestado:'" + iestado + "', vmodo:'" + vmodo + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                if (data == vimagen) {
                    ResultadoGuardarImagen(data);
                    alert("El Contenido se actualizó correctamente.");
                    window.location = "../Mantenimiento/GestionContenidos";
             
                } else if (data == 'true') {
                    alert("El Contenido se actualizó correctamente.");
                    window.location = "../Mantenimiento/GestionContenidos";
               
                }
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });

};

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
        url: '../api/fileImgGestionContenido',
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
};
