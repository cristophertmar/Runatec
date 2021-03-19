document.addEventListener("DOMContentLoaded", function () {
        var version = $("#version_v").val();
        $("#version_l").html('Versión ' + version);
        ListarCarruselNoticia();
        ListarEditorial();
        var slide_position = 1;
        var slider_time = 5000;
        var slider_automatic = true;
        var items_slide = document.querySelectorAll(".banner_slide");
        var content_slide = document.querySelectorAll(".content_item");//contenido
        var slider_controls = document.querySelector(".slider_sm_controls");
        var slider_dots = document.getElementById("slider_dots_container");
        //Detectar Dots
        slider_dots.addEventListener("click", function (e) {
            if (e.target.tagName == "SPAN") {
                changeImgSlider(e.target.dataset.position)
            }
        });
        //Detectar Controles
        slider_controls.addEventListener("click", function (e) {
            let control = e.target.parentNode;
            if (control.dataset.control == "next") {
                changeImgSlider(slide_position);
                (slide_position >= items_slide.length - 1) ? slide_position = 0 : slide_position++;
                (slide_position >= content_slide.length - 1) ? slide_position = 0 : slide_position++;

            } else {
                changeImgSlider(slide_position);
                (slide_position <= 0) ? slide_position = 4 : slide_position--;
            }
        });
        //Cambiar Imagen y Dot
        function changeImgSlider(slideIndex) {
            //Recorrer Imagenes y Dots
            for (let i = 0; i < items_slide.length; i++) {
                if (i == slideIndex) {
                    items_slide[i].classList.add("active");
                    content_slide[i].classList.add("active");

                    slider_dots.children[i].classList.add("active");
                } else {
                    (items_slide[i].classList.contains("active")) ? items_slide[i].classList.remove("active") : '';
                    (content_slide[i].classList.contains("active")) ? content_slide[i].classList.remove("active") : '';

                    (slider_dots.children[i].classList.contains("active")) ? slider_dots.children[i].classList.remove("active") : '';
                }
            }
            //Cambiar Valor Indice
            (slideIndex < items_slide.length - 1) ? slideIndex++ : slideIndex = 0;
            (slideIndex < content_slide.length - 1) ? slideIndex++ : slideIndex = 0;

            //Activar Slider Automatico
            if (slider_automatic != false) {
                setTimeout(function () {
                    changeImgSlider(slideIndex);
                }, slider_time);
            }
        }
        //Activar Slider Automatico
        if (slider_automatic != false) {
            changeImgSlider(slide_position)
        }
    });

function ListarCarruselNoticia() {
    
    //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
    var pathname = window.location.pathname;
    var evaluacadena = pathname.substring(pathname.length - 1);

    var vurl = "";

    if (evaluacadena != '/') {
        vurl = ".." + pathname + "/Services/ListarCarruselNoticia";
    }
    else {
        vurl = ".." + pathname + "Services/ListarCarruselNoticia";
    }

    //fetch(vurl)
    //    .then((response) => response.json())
    //    .then((json) => console.log(json));

    $.ajax({
        type: "POST",
        url: vurl,
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarCarruselNoticiaSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarCarruselNoticiaSuccess(data) {

    var slider_imagenes = $("#slider_imagenes");
    var slider_contenido = $("#slider_contenido");
    var slider_dots_container = $("#slider_dots_container");
    if (data.length > 0) {
        slider_imagenes.empty();
        slider_contenido.empty();
        slider_dots_container.empty();
        for (var i = 0; i < data.length; i++) {
            var vcomentario = data[i].vcomentario;
            //slider_imagenes.append('<img src="' + data[i].vimagen + '" class="banner_slide" data-position=' + i + '/>');
            slider_contenido.append('<div class="content_item active" data-position=' + i + '>' +
                                    '<img src="' + data[i].vimagen + '" class="banner_slide" data-position=' + i + '/>' +
                                    '<i>' + data[i].dfecha + '</i>'+
                                    '<a onclick="IrNoticia(' + data[i].nidnoticia + ');">' + data[i].vtitulo + '</a>' +
                                    '<p>' + vcomentario + '</p>'+
                                  '</div>'
            );
            slider_dots_container.append('<span class="item_dot" data-position=' + i + '>'+parseInt(parseInt(i)+1)+'</span>');
        }
    }

}


function AbrePaginaNoticia(vurl) {

//Abrir web dentro de otra web
    if (vurl != '') {        
        var cadena='<iframe id="ifnoticias" src="'+vurl+'" height="350" width="700"></iframe>'
        $('#tdnoticias').append(cadena);
    }
}
//EDITORIAL
function ListarEditorial() {
    //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
    var pathname = window.location.pathname;
    var evaluacadena = pathname.substring(pathname.length - 1);

    var vurl = "";

    if (evaluacadena != '/') {
        vurl = ".." + pathname + "/Services/ListarEditorial";
    }
    else {
        vurl = ".." + pathname + "Services/ListarEditorial";
    }

    $.ajax({
        type: "POST",
        url: vurl,
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarEditorialSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ListarEditorialSuccess(data) {

    var editorial_content = $('#editorial_content');

    //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
    var pathname = window.location.pathname;
    var evaluacadena = pathname.substring(pathname.length - 1);
    
    var vurl = "";

    if (evaluacadena != '/') {
        vurl = ".." + pathname + "/";
    }
    else {
        vurl = ".." + pathname;
    }
    editorial_content.empty();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            editorial_content.append('<a>' + data[i].vtitulo + '</a><br>' +
                                     '<img src="'+data[i].vimagen+'"></img>'+
                                     '<p>' + data[i].vcontenido + '</p>');
        }

    }
   
}

function OnError() {
    alert(500);
}