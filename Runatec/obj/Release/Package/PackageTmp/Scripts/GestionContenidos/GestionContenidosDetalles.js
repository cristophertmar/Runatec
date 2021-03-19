$(document).ready(function () {

 var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);

      $("#txt_imagen").change(function () {
        NombreImagen();
    });

    //ListarComboMenuPublicoPadreGestCont();
    //ListarComboMenuPublicoHijoGestCont(0);

    //$("#select_MenuPublicoPadreGestCont").change(function () {
    //    var nidmodulo = $("#select_MenuPublicoPadreGestCont").val();
    //    ListarComboMenuPublicoHijoGestCont(nidmodulo);
    //});


   //$('#summernote').summernote();

    var modo = sessionStorage.getItem("modo");

    //$("#titulo").html('Insertar - Registro de Contenido');

   
   
    var nidgestioncontenidoDet = sessionStorage.getItem("nidgestioncontenidoDet");
    SelectGestionContenido(nidgestioncontenidoDet);
    
        

    $("#btnRegresar").click(function () {
        Retornar("/GestionContenidos/GestionContenidosListar");
    });

       
    //BLOQUEA LOS DETALLES DEL EDITOR DE TEXTO
    //    var markup = $('.click2edit').summernote('code');
       // $('.click2edit').summernote('destroy');
    

    ////HABLITA LOS DETALLES DEL EDITOR DE TEXTO
    //$('.click2edit').summernote({ focus: true });
    //$('.click2edit').summernote({ focus: true });

});


function Retornar(vurl) {


    if (vurl != '') {


        //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
        var pathname = window.location.pathname;
        var evaluacadena = pathname.substring(pathname.length - 1);

        var surl = "";      
        surl = ".." + vurl;
               

        MostrarPopupProceso('120', '120');
        $.ajax({
            type: "POST",
            url: surl,
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (response) {
                $('#divContent').html(response);
                $('#contenedorpagina').load(surl);
                CerrarPopupProceso();
            },
            failure: function (response) {
                alert(response.responseText);
            },
            error: function (response) {
                alert(response.responseText);
            }
        });

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
    $("#titulo").html(data[0].vtitulo);
    $("#campo_imagen").html('');
    $("#campo_imagen").append('<img src="/' + data[0].vimagen + '"/>');
    $("#labelfile").html('<i class="fas fa-upload"></i> Elige una imagen');
    $("#txt_imagen").val('');
    $("#nidgestioncontenido").html(data[0].nidgestioncontenido);
    $("#select_MenuPublicoPadreGestCont").val(data[0].nidModuloPadre);
    //ListarComboMenuPublicoHijoGestCont(data[0].nidModuloPadre);
    $("#select_MenuPublicoHijoGestCont").val(data[0].nidModuloHijo);
    $("#txt_titulo").val(data[0].vtitulo);
    $("#txt_descripcion").val(data[0].vdescripcion);
    $('#editartext').html(data[0].vdetalle);
    $("#select_estado").val(data[0].iestado);
};
