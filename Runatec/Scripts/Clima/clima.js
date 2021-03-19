$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);
    $("#titulo").html('Información del Clima');

    $("#btngraficar").click(function () {
        $('html,body').animate({
            scrollTop: $("#scrollToHere").offset().top
        }, 2000);
    });

    GraficarPrecipitacion();
});

function GraficarPrecipitacion() {
    $.ajax({
        type: "POST",
        url: "../Services/GraficarPrecipitacion_Nuevo",
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
    console.log(data);
    
    //$("#csv").empty();
    //var cadena = "";
    //cadena = cadena + 'iprecipitacion, dfecha';
    //for (var i = 0; i < data.length; i++) {
    //    cadena = cadena + '' + data[i].iprecipitacion + ', ' + data[i].dfecha;
    //}
    //console.log(cadena);
    //$("#csv").append(cadena);

    Highcharts.chart('container', {
        data: {
            table: 'datatable'
        },
        chart: {
            type: 'column'
        },
        title: {
            text: 'Data extracted from a HTML table in the page'
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: 'Units'
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    this.point.y + ' ' + this.point.name.toLowerCase();
            }
        }
    });

}

//function GraficarPrecipitacionSuccess(data) {

//    ////***********Cadena de precipitación**********//
//    var cadena = data[0].cadena;
//    var arreglocadena = new Array();
//    arreglocadena = JSON.parse("[" + cadena + "]");

//    Highcharts.setOptions({
//        lang: {
//            months: [
//                'Enero', 'Febrero', 'Marzo', 'Abril',
//                'Mayo', 'Junio', 'Julio', 'Agosto',
//                'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'
//            ],
//            weekdays: [
//                'Domingo', 'Lunes', 'Martes', 'Miércoles',
//                'Jueves', 'Viernes', 'Sábado'
//            ],
//            shortMonths: [
//                "Ene", "Feb", "Mar", "Abr", "May", "Jun",
//                "Jul", "Ago", "Set", "Oct", "Nov", "Dic"
//            ],
//        }
//    });

//    $(function () {

//        var chart = new Highcharts.Chart({
//            chart: {
//                renderTo: 'grafico_precipitacion',
//                zoomType: 'x',
//                spacingRight: 20
//            },
//            title: {
//                text: 'Probabilidad diaria de precipitación'
//            },
//            subtitle: {
//                text: document.ontouchstart === undefined ?
//                    'Fuente:chaskis.net' :
//                    'Probabilidad Diaria de Precipitación'
//            },
//            plotOptions: {
//                series: {
//                    states: {
//                        hover: {
//                            enabled: false
//                        }
//                    }
//                }
//            },
//            xAxis: {
//                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
//                crosshair: true,
//                labels: {
//                    style: {
//                        fontFamily: 'Tahoma'
//                    },
//                    rotation: -45
//                },
//                title: {
//                    text: 'Mes'
//                },
//            },
//            yAxis: {
//                max: 100,
//                title: {
//                    text: 'Porcentaje'
//                },
//                labels: {
//                    formatter: function () {
//                        return this.value + '%';
//                    }
//                }
//            },
//            tooltip: {
//                valueSuffix: ' %'
//            },
//            legend: {
//                enabled: false
//            },
//            series: [{
//                type: 'areaspline',
//                name: 'Precipitación',
//                dataGrouping: {
//                    enabled: false
//                },
//                data: arreglocadena,
//                color: 'rgb(178,210,181)',
//                marker: {
//                    enabled: false
//                }
//            },
//            //Línea negra de parcialmente nublado
//            {
//                type: 'spline',
//                name: 'Precipitación',
//                dataGrouping: {
//                    enabled: false
//                },
//                data: arreglocadena,
//                color: 'black',
//                lineWidth: 1,
//                marker: {
//                    enabled: false
//                }
//            }]
//        });
//    });

//}

