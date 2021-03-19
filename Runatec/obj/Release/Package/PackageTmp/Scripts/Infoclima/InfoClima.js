var nidPerfil = sessionStorage.getItem("userperfil");

$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);

    if (nidPerfil == 3) {
        $("#titulo").html('Información del Clima');
        Graficar();
        $("#contenedor_total").css("display", "block");
    } else {
        alert("Debe registrarse o iniciar sesión para poder acceder a todos los servicios de Chaskis.");
        window.location = "..";
    }

   
    $("#btngraficar").click(function () {
        $('html,body').animate({
            scrollTop: $("#scrollToHere").offset().top
        }, 2000);
    });
});



function Graficar() {
    GraficarTemperatura(2020);
    GraficarNubosidad(2020);
    GraficarPrecipitacion(2020);
    GraficarHorasLuz(2020);
    GraficarLluvia(2020);
}

function GraficarTemperatura(year) {

    $.ajax({
        type: "POST",
        url: "../Services/GraficarTemperatura",
        data: "{year:'" + year + "'}",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: GraficarTemperaturaSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function OnError(data) {
    alert('Error 404...');
}

function ObtenerDatosTemperatura() {
    $.ajax({
        type: "POST",
        url: "../Services/ObtenerDatosTemperatura",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ObtenerDatosTemperaturaSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ObtenerDatosTemperaturaSuccess(data) {
    var comentario = $("#p_comentario_temperatura");
    comentario.append(
                         data[0].infotemperatura
                     );
}

function GraficarTemperaturaSuccess(data) {
    //***********Cadena de Temperaturas mínimas de cada mes**********//
    var cadenamin = data[0].cadenamin;
    //Convertir la cadena en tipo arreglo
    var arreglocadenamin = new Array();
    arreglocadenamin = JSON.parse("[" + cadenamin + "]");

    //***********Cadena de Temperaturas máximas de cada mes**********//
    var cadenamax = data[0].cadenamax;
    var arreglocadenamax = new Array();
    arreglocadenamax = JSON.parse("[" + cadenamax + "]");

    //***********Cadena Promedio de Temperaturas mínimas de cada mes**********//
    var cadenapromediomin = data[0].cadenapromediomin;
    var arreglocadenapromediomin = new Array();
    arreglocadenapromediomin = JSON.parse("[" + cadenapromediomin + "]");

    //***********Cadena Promedio de Temperaturas mínimas de cada mes**********//
    var cadenapromediomax = data[0].cadenapromediomax;
    var arreglocadenapromediomax = new Array();
    arreglocadenapromediomax = JSON.parse("[" + cadenapromediomax + "]");

    //************Límites de las Bandas***********//
    var desdemin = data[0].desdemin;
    var hastamin = data[0].hastamin;
    var desdemax = data[0].desdemax;
    var hastamax = data[0].hastamax;

    ObtenerDatosTemperatura();

    Highcharts.setOptions({
        lang: {
            months: [
                'Enero', 'Febrero', 'Marzo', 'Abril',
                'Mayo', 'Junio', 'Julio', 'Agosto',
                'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ],
            weekdays: [
                'Domingo', 'Lunes', 'Martes', 'Miércoles',
                'Jueves', 'Viernes', 'Sábado'
            ],
            shortMonths: [
                "Ene", "Feb", "Mar", "Abr", "May", "Jun",
                "Jul", "Ago", "Set", "Oct", "Nov", "Dic"
            ],
        }
    });

    $(function () {

        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'grafico_temperatura',
                zoomType: 'x',
                spacingRight: 20
            },
            legend: {
                align: 'center',
                verticalAlign: 'bottom',
                x: 0,
                y: 0
            },
            title: {
                text: 'Temperatura máxima y mínima promedio'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Fuente:chaskis.net' :
                    'Gráfico de Temperatura'
            },
            xAxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],

                crosshair: true,
                labels: {
                    style: {
                        fontFamily: 'Tahoma'
                    },
                    rotation: -45
                },
                title: {
                    text: 'Mes'
                },
                plotBands: [{
                    //TEMP MINIMA
                    color: 'rgba(0,0,255,.3)', // Color value
                    from: desdemin, // Start of the plot band
                    to: hastamin, // End of the plot band
                    label: {
                        text: 'Fresco'
                    }
                },
                {
                    //TEMP MAXIMA
                    color: 'rgba(255,0,0,.3)', // Color value
                    from: desdemax, // Start of the plot band
                    to: hastamax, // End of the plot band
                    label: {
                        text: 'Muy Caliente'
                    }
                }
                ]
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: false
                            }
                        }
                    },
                },
                states: {
                    hover: {
                        enabled: false
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'Temperatura'
                },
                labels: {
                    formatter: function () {
                        return this.value + '°C';
                    }
                },
                max: 35
            },
            tooltip: {
                shared: true,
                valueSuffix: ' °C'
            },
            series: [{
                type: 'spline',
                name: 'Temperaturas Mínimas',
                dataLabels: {
                    enabled: true,
                    format: '{y} °C'
                },
                data: arreglocadenamin,
                color: 'blue'
            },
            {
                type: 'spline',
                name: 'Temperaturas Máximas',
                data: arreglocadenamax,
                color: 'red',
                dataLabels: {
                    enabled: true,
                    format: '{y} °C'
                }
            },
            {
                type: 'spline',
                name: 'Promedios Mínimos',
                data: arreglocadenapromediomin,
                dashStyle: 'shortdot',
                color: 'blue',
                lineWidth: 1
            },
            {
                type: 'spline',
                name: 'Promedios Máximos',
                dataGrouping: {
                    enabled: false
                },
                data: arreglocadenapromediomax,
                dashStyle: 'shortdot',
                color: 'red',
                lineWidth: 1
            }]
        });
    });

    $("#p_descripcion_temperatura").html('La temperatura máxima (línea roja) y la temperatura mínima (línea azul) promedio diaria con las bandas de los percentiles 25º a 75º, y 10º a 90º. Las líneas delgadas punteadas son las temperaturas promedio percibidas correspondientes.');
}

function GraficarNubosidad(year) {

    $.ajax({
        type: "POST",
        url: "../Services/GraficarNubosidad",
        data: "{year:'" + year + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: GraficarNubosidadSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ObtenerDatosNubosidad() {
    $.ajax({
        type: "POST",
        url: "../Services/ObtenerDatosNubosidad",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: ObtenerDatosNubosidadSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ObtenerDatosNubosidadSuccess(data) {
    var comentario = $("#p_comentario_nubosidad");
    comentario.append(
                    data[0].infonubosidad
    );
}

function GraficarNubosidadSuccess(data) {

    //***********Sección Nublado**********//
    var cadenanublado = data[0].cadenanublado;
    //Convertir la cadena en tipo arreglo
    var arreglocadenanublado = new Array();
    arreglocadenanublado = JSON.parse("[" + cadenanublado + "]");

    //***********Sección Mayormente Nublado**********//
    var cadenamaynublado = data[0].cadenamaynublado;
    var arreglocadenamaynublado = new Array();
    arreglocadenamaynublado = JSON.parse("[" + cadenamaynublado + "]");

    //***********Sección Parcialmente Nublado**********//
    var cadenaparcnublado = data[0].cadenaparcnublado;
    var arreglocadenaparcnublado = new Array();
    arreglocadenaparcnublado = JSON.parse("[" + cadenaparcnublado + "]");

    //***********Sección Mayormente Despejado**********//
    var cadenamaydespejado = data[0].cadenamaydespejado;
    var arreglocadenamaydespejado = new Array();
    arreglocadenamaydespejado = JSON.parse("[" + cadenamaydespejado + "]");

    //***********Sección Despejado**********//
    var cadenadespejado = data[0].cadenadespejado;
    var arreglocadenadespejado = new Array();
    arreglocadenadespejado = JSON.parse("[" + cadenadespejado + "]");

    ObtenerDatosNubosidad();

    Highcharts.setOptions({
        lang: {
            months: [
                'Enero', 'Febrero', 'Marzo', 'Abril',
                'Mayo', 'Junio', 'Julio', 'Agosto',
                'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ],
            weekdays: [
                'Domingo', 'Lunes', 'Martes', 'Miércoles',
                'Jueves', 'Viernes', 'Sábado'
            ],
            shortMonths: [
                "Ene", "Feb", "Mar", "Abr", "May", "Jun",
                "Jul", "Ago", "Set", "Oct", "Nov", "Dic"
            ],
        }
    });

    $(function () {

        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'grafico_nubosidad',
                type: 'areaspline',
                zoomType: 'x',
                spacingRight: 20
            },
            title: {
                text: 'Categorías de nubosidad'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Fuente: chaskis.net' :
                    'Gráfico de Temperatura'
            },
            xAxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
                crosshair: true,
                labels: {
                    style: {
                        fontFamily: 'Tahoma'
                    },
                    rotation: -45
                },
                title: {
                    text: 'Mes'
                }
            },
            yAxis: [{
                max: 100,
                title: {
                    text: 'Porcentaje'
                },
                labels: {
                    formatter: function () {
                        return this.value + '%';
                    }
                }
            },
            //2do eje y
            {
                max: 100,
                title: {
                    text: 'Porcentaje'
                },
                labels: {
                    formatter: function () {
                        return this.value + '%';
                    }
                },
                opposite: true,
                reversed: true
            }],
            tooltip: {
                enabled: false
            },
            legend: {
                enabled: false
            },

            plotOptions: {
                series: {
                    //Colocar los nombres de las categorías dentro de las áreas
                    dataLabels: {
                        enabled: true,
                        x: 0,
                        y: 38,
                        style: {
                            fontWeight: 'bold',
                            textShadow: false
                        },
                        color: 'white',
                        formatter: function () {
                            if (this.x != 'Jul') return null;
                            return this.series.name;
                        },
                        marker: {
                            enabled: false
                        }
                    },
                    states: {
                        hover: {
                            enabled: false
                        }
                    }
                }
            },

            series: [{
                name: 'Nublado',
                dataGrouping: {
                    enabled: false
                },
                data: arreglocadenanublado,
                color: 'rgba(152,156,161,1)',
                marker: {
                    enabled: false
                }

            },
            {
                name: 'Mayormente Nublado',
                dataGrouping: {
                    enabled: false
                },
                data: arreglocadenamaynublado,
                dashStyle: 'shortdot',
                color: 'rgba(217,217,217,1)',
                marker: {
                    enabled: false
                },
            },
            {
                name: 'Parcialmente Nublado',
                dataGrouping: {
                    enabled: false
                },
                data: arreglocadenaparcnublado,
                dashStyle: 'shortdot',
                color: 'rgba(197,211,229,1)',
                marker: {
                    enabled: false
                }
            },
            {
                name: 'Mayormente Despejado',
                dataGrouping: {
                    enabled: false
                },
                data: arreglocadenamaydespejado,
                dashStyle: 'shortdot',
                color: 'rgba(177,196,221,1)',
                marker: {
                    enabled: false
                }
            },
            {
                name: 'Despejado',
                dataGrouping: {
                    enabled: false
                },
                data: arreglocadenadespejado,
                dashStyle: 'shortdot',
                color: 'rgba(149,181,223,1)',
                marker: {
                    enabled: false
                }
            },
            {
                yAxis: 1,
            },
            //Línea negra de parcialmente nublado
            {
                type: 'spline',
                name: 'Parcialmente Nublado',
                dataGrouping: {
                    enabled: false
                },
                data: arreglocadenaparcnublado,
                //dashStyle: 'shortdot',
                color: 'black',
                lineWidth: 0.7,
                marker: {
                    fillColor: 'black',
                    lineWidth: .5,
                    lineColor: null,
                    radius: 1
                },
                dataLabels: {
                    enabled: true,
                    format: '{y} %',
                    color: 'black',
                    x: 0,
                    y: 0
                },
            }]
        });
    });

    $("#p_descripcion_nubosidad").html('El porcentaje de tiempo pasado en cada banda de cobertura de nubes, categorizado según el porcentaje del cielo cubierto de nubes.');
}

function ObtenerDatosPrecipitacion() {
    $.ajax({
        type: "POST",
        url: "../Services/ObtenerDatosPrecipitacion",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: ObtenerDatosPrecipitacionSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ObtenerDatosPrecipitacionSuccess(data) {
    var comentario = $("#p_comentario_precipitacion");
    comentario.append(
                    data[0].infoprecipitacion
                    );
}

function GraficarPrecipitacion(year) {

    $.ajax({
        type: "POST",
        url: "../Services/GraficarPrecipitacion",
        data: "{year:'" + year + "'}",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: GraficarPrecipitacionSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function GraficarPrecipitacionSuccess(data) {

    ////***********Cadena de precipitación**********//
    var cadena = data[0].cadena;
    var arreglocadena = new Array();
    arreglocadena = JSON.parse("[" + cadena + "]");

    Highcharts.setOptions({
        lang: {
            months: [
                'Enero', 'Febrero', 'Marzo', 'Abril',
                'Mayo', 'Junio', 'Julio', 'Agosto',
                'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ],
            weekdays: [
                'Domingo', 'Lunes', 'Martes', 'Miércoles',
                'Jueves', 'Viernes', 'Sábado'
            ],
            shortMonths: [
                "Ene", "Feb", "Mar", "Abr", "May", "Jun",
                "Jul", "Ago", "Set", "Oct", "Nov", "Dic"
            ],
        }
    });
    ObtenerDatosPrecipitacion();
    $(function () {

        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'grafico_precipitacion',
                zoomType: 'x',
                spacingRight: 20
            },
            title: {
                text: 'Probabilidad diaria de precipitación'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Fuente: chaskis.net' :
                    'Probabilidad Diaria de Precipitación'
            },
            plotOptions: {
                series: {
                    states: {
                        hover: {
                            enabled: false
                        }
                    }
                }
            },
            xAxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
                crosshair: true,
                labels: {
                    style: {
                        fontFamily: 'Tahoma'
                    },
                    rotation: -45
                },
                title: {
                    text: 'Mes'
                },
            },
            yAxis: {
                max: 100,
                title: {
                    text: 'Porcentaje'
                },
                labels: {
                    formatter: function () {
                        return this.value + '%';
                    }
                }
            },
            tooltip: {
                valueSuffix: ' %'
            },
            legend: {
                enabled: false
            },
            series: [{
                type: 'areaspline',
                name: 'Precipitación',
                dataGrouping: {
                    enabled: false
                },
                data: arreglocadena,
                color: 'rgb(178,210,181)',
                marker: {
                    enabled: false
                }
            },
            //Línea negra de parcialmente nublado
            {
                type: 'spline',
                name: 'Precipitación',
                dataGrouping: {
                    enabled: false
                },
                data: arreglocadena,
                color: 'black',
                lineWidth: 1,
                marker: {
                    enabled: false
                }
            }]
        });
    });

    $("#p_descripcion_precipitacion").html('El porcentaje de días en los que se observan diferentes tipos de precipitación, excluidas las cantidades ínfimas: solo lluvia, solo nieve, mezcla (llovió y nevó el mismo día).');
}
function ObtenerDatosHorasLuz() {
    $.ajax({
        type: "POST",
        url: "../Services/ObtenerDatosHorasLuz",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: ObtenerDatosHorasLuzSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ObtenerDatosHorasLuzSuccess(data) {
    var comentario = $("#p_comentario_horasluz");
    comentario.append(
                    data[0].infoduraciondia
    );
}
function GraficarHorasLuz(year) {

    $.ajax({
        type: "POST",
        url: "../Services/GraficarHorasLuz",
        data: "{year:'" + year + "'}",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: GraficarHorasLuzSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function GraficarHorasLuzSuccess(data) {

    ////***********Cadena de Horas de Luz**********//
    var cadenadia = data[0].cadenadia;
    var arreglocadenadia = new Array();
    arreglocadenadia = JSON.parse("[" + cadenadia + "]");

    var cadenanoche = data[0].cadenanoche;
    var arreglocadenanoche = new Array();
    arreglocadenanoche = JSON.parse("[" + cadenanoche + "]");

    Highcharts.setOptions({
        lang: {
            months: [
                'Enero', 'Febrero', 'Marzo', 'Abril',
                'Mayo', 'Junio', 'Julio', 'Agosto',
                'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ],
            weekdays: [
                'Domingo', 'Lunes', 'Martes', 'Miércoles',
                'Jueves', 'Viernes', 'Sábado'
            ],
            shortMonths: [
                "Ene", "Feb", "Mar", "Abr", "May", "Jun",
                "Jul", "Ago", "Set", "Oct", "Nov", "Dic"
            ],
        }
    });
    ObtenerDatosHorasLuz();
    $(function () {

        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'grafico_horasluz',
                type: 'areaspline',
                zoomType: 'x',
                spacingRight: 20
            },
            title: {
                text: 'Horas de luz natural y crepúsculo'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Fuente: chaskis.net' :
                    'Horas de luz natural y crepúsculo'
            },
            plotOptions: {
                series: {
                    states: {
                        hover: {
                            enabled: false
                        }
                    }
                }
            },
            xAxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
                crosshair: true,
                labels: {
                    style: {
                        fontFamily: 'Tahoma'
                    },
                    rotation: -45
                },
                title: {
                    text: 'Mes'
                },
            },
            yAxis: {
                min:0,
                max: 24,
                title: {
                    text: 'Tiempo'
                },
                labels: {
                    formatter: function () {
                        return this.value + 'h';
                    }
                }
            },
            tooltip: {
                formatter: function () {

                    if (this.series.name == "Duración de la noche") {
                        return false;
                        // to disable the tooltip at a point return false
                    } else {
                        return "<b>" + this.series.name + "</b><br/>" +
                            this.x + ": " + this.y + " h";
                    }
                }
            },
            legend: {
                enabled: false
            },
            series: [
            {
                name: 'Duración de la noche',
                dataGrouping: {
                    enabled: false
                },
                data: arreglocadenanoche,
                color: 'rgba(130,130,130,.8)',
                marker: {
                    enabled: false
                },
            },
            {
                name: 'Duración del día',
                dataGrouping: {
                    enabled: false
                },
                data: arreglocadenadia,
                color: 'rgba(255,215,100,.8)',
                marker: {
                    enabled: false
                }

            },
                //Línea negra de parcialmente nublado
            {
                type: 'spline',
                name: 'Duración Día',
                dataGrouping: {
                    enabled: false
                },
                data: arreglocadenadia,
                color: '#393939',
                lineWidth: 2,
                marker: {
                    enabled: false
                },
                tooltip: {
                    valueSuffix: ' h'
                }
            }]
        });
    });

    $("#p_descripcion_horasluz").html('La cantidad de horas durante las cuales el sol está visible (línea negra). De abajo (más amarillo) hacia arriba (más gris), las bandas de color indican: luz natural total y noche total.');
}

function ObtenerDatosLluvia() {
    $.ajax({
        type: "POST",
        url: "../Services/ObtenerDatosLluvia",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: ObtenerDatosLluviaSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function ObtenerDatosLluviaSuccess(data) {
    var comentario = $("#p_comentario_lluvia");
    comentario.append(
                    data[0].infolluvia
    );
}

function GraficarLluvia(year) {

    $.ajax({
        type: "POST",
        url: "../Services/GraficarLluvia",
        data: "{year:'" + year + "'}",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: GraficarLluviaSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function OnError(data) {
    alert('Error 404...');
}

function GraficarLluviaSuccess(data) {

    ////***********Cadena de precipitación**********//
    var cadena = data[0].cadena;
    var arreglocadena = new Array();
    arreglocadena = JSON.parse("[" + cadena + "]");
    Highcharts.setOptions({
        lang: {
            months: [
                'Enero', 'Febrero', 'Marzo', 'Abril',
                'Mayo', 'Junio', 'Julio', 'Agosto',
                'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ],
            weekdays: [
                'Domingo', 'Lunes', 'Martes', 'Miércoles',
                'Jueves', 'Viernes', 'Sábado'
            ],
            shortMonths: [
                "Ene", "Feb", "Mar", "Abr", "May", "Jun",
                "Jul", "Ago", "Set", "Oct", "Nov", "Dic"
            ],
        }
    });
    ObtenerDatosLluvia();
    $(function () {

        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'grafico_lluvia',
                zoomType: 'x',
                spacingRight: 20
            },
            title: {
                text: 'Precipitación de lluvia mensual promedio'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Fuente: chaskis.net' :
                    'Precipitación de lluvia mensual promedio'
            },
            plotOptions: {
                series: {
                    states: {
                        hover: {
                            enabled: false
                        }
                    }
                }
            },
            xAxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
                crosshair: true,
                labels: {
                    style: {
                        fontFamily: 'Tahoma'
                    },
                    rotation: -45
                },
                title: {
                    text: 'Mes'
                },
            },
            yAxis: {
                title: {
                    text: 'Nivel de lluvia'
                },
                labels: {
                    formatter: function () {
                        return this.value + 'mm';
                    }
                }
            },
            tooltip: {
                valueSuffix: ' mm'
            },
            legend: {
                enabled: false
            },
            series: [{
                type: 'spline',
                name: 'Precipitación',
                dataGrouping: {
                    enabled: false
                },
                data: arreglocadena,
                color: 'gray'
            }]
        });
    });
    $("#p_descripcion_lluvia").html('La lluvia promedio (línea sólida) acumulada en un periodo móvil de 31 días.');
}

//Popup cargando
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
function MostrarPopupProceso(ancho, alto) {
    $("#fondoPopup").css('display', 'block');
    mostrarCentrarDiv('PopupEnProceso', ancho, alto);
};
function CerrarPopupProceso() {
    $("#fondoPopup").hide();
    $("#PopupEnProceso").hide();
};