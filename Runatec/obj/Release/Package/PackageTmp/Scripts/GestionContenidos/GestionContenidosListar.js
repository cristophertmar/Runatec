$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);


   

   // $("#titulo").html(vtitulo);


    var nidmodulopadre=sessionStorage.getItem("modulopadre");
    var nidmodulohijo=sessionStorage.getItem("modulohijo");

    ListarGestionContenido(nidmodulopadre, nidmodulohijo);

});


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
};

function ListarGestionContenidoSuccess(data) {
    var item = 1;
    var tabla = $("#GridListar");
    tabla.empty();

    if (data.length > 0) {

        $("#titulo").html(data[0].vtitulosubmenu);

        var vdescripcion;
        for (var i = 0; i < data.length; i++) {
            vdescripcion = data[i].vdescripcion;
            tabla.append(
                        '<tr>' +
                            '<td class=colimagen><img style="width:100px;height:auto;" src=/' + data[i].vimagen + '></td>' +
                            '<td style=display:none;>' + data[i].nidgestioncontenido + '</td>' +
                            '<td class=coldescripcion onclick=EditarGestionContenido("' + data[i].nidgestioncontenido + '")>' + data[i].dfechacreacion + '  &nbsp; &nbsp;   ' + data[i].vtitulo + ':   &nbsp; ' + vdescripcion.substring(0,150)+' ...' + '</td>' +
                        '</tr>'
                        )

            item = item + 1;

        }
    }

};

function EditarGestionContenido(nidgestioncontenidoDet) {

    sessionStorage.setItem("nidgestioncontenidoDet", nidgestioncontenidoDet);   
   
    var surl='../GestionContenidos/GestionContenidosDetalles'

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


};