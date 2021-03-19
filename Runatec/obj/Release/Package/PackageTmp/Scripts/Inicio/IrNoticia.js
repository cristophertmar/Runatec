var nidnoticia = sessionStorage.getItem("nidnoticia");

$(document).ready(function () {

    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);

    Mostrarnoticia(nidnoticia);

});


function Mostrarnoticia(nidnoticia) {

    $.ajax({
        type: "POST",
        url: "../Services/IrNoticia",
        data: "{nidnoticia:'" + nidnoticia + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: MostrarnoticiaSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function MostrarnoticiaSuccess(data) {
    var contenedor_noticia = $("#contenedor_noticia");
    contenedor_noticia.empty();
    contenedor_noticia.append(
                            '<div class="flex">' +
                                '<div style="width:300px;"></div>'+
                                '<div><h1>' + data[0].vtitulo + '</h1></div>' +
                                '<div id="div_fecha"><i>' + data[0].dfecha + '</i></div>' +
                            '</div>' +
                            '<div class="flex">' +
                                '<div><img src="' + data[0].vimagen + '"/></div>' +
                                '<div><p>' + data[0].vcomentario + '</p></div>' +
                            '</div>'
                            );
}