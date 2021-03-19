$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);
    $("#titulo").html('Análisis de Promedios');
    ListarComboProducto();
    ListarComboMercado();


    $("input[type=checkbox]").change(function () {
        var elemento = this;
        var contador = 0;

        // Recorre todos los checkbox para contar los que están seleccionados
        $("input[type=checkbox]").each(function () {
            if ($(this).is(":checked"))
                contador++;
        });

        // se comprueba si hay más de 4 checks marcados
        if (contador > 10) {
            alert("Puedes seleccionar hasta 4 Productos a la vez.");

            // se desmarca el 11vo check
            $(elemento).prop('checked', false);
            contador--;
        }
    });

    $("#btngraficar").click(function () {
        $('html,body').animate({
            scrollTop: $("#scrollToHere").offset().top
        }, 2000);
    });
});

function ListarComboProducto() {

    $.ajax({
        type: "POST",
        url: "../Services/ListarComboProducto",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarComboProductoSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError

    });
}

function ListarComboProductoSuccess(data) {

    var selectAgregar = $("#selectproductos");
    var listaAgregar = $("#listaproducto");

    selectAgregar.empty();
    listaAgregar.empty();

    selectAgregar.append('<option value="0">--Seleccionar--</option>');
    for (i = 0; i < data.length; i++) {
        selectAgregar.append("<option value='" + data[i].nidproducto + "'>" + data[i].vdescripcion + "</option>");
        listaAgregar.append("<li><a tabindex='0'><label class='checkbox'><input type='checkbox' value='" + data[i].nidproducto + "' />'" + data[i].vdescripcion + "'</label></a></input>");

    }
}

function ListarComboMercado() {
    $.ajax({
        type: "POST",
        url: "../Services/ListarComboMercado",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: LlenarComboMercado,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function LlenarComboMercado(data) {
    var selectAgregar = $("#select_mercado");
    selectAgregar.empty();
    selectAgregar.append('<option value="">--Seleccionar--</option>');
    for (i = 0; i < data.length; i++) {
        selectAgregar.append("<option value='" + data[i].nidmercado + "'>" + data[i].vdescripcion + "</option>");
    }
}

function OnError(data) {
    alert('Error 404...');
}

function GraficoLinea() {
    Highcharts.chart('contenedor_grafico', {

        title: {
            text: 'Análisis Semanal de Promedios'
        },

        subtitle: {
            text: 'Fuente: chaskis.net'
        },

        yAxis: {
            title: {
                text: 'Promedio ( S/.)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>S/.{point.y:.2f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },

        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%e. %b',
            },
            labels: {
                formatter: function () {
                    return 'Semana ' + this.value
                }
            }
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 1
            }
        },

        series: [{
            name: 'Papa Peruanita 1ra',
            data: [1.36, 1.30, 1.24, 1.22, 1.36, 1.30, 1.24, 1.22]
        }, {
            name: 'Papa Peruanita 2da',
            data: [0.66, 0.72, 0.76, 0.77, 0.66, 0.72, 0.76, 0.77]
        }, {
            name: 'Tumbay 1ra',
            data: [1.36, 1.26, 1.32, 1.37, 1.36, 1.26, 1.32, 1.37]

        }, {
            name: 'Tumbay 2da',
            data: [0.71, 0.70, 0.82, 0.88, 0.71, 0.70, 0.82, 0.88]
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
}

function Graficar() {
    var cadenaid = $("#selectproductos").val();
    var nidmercado = $("#select_mercado").val();
    var dfechainicio = ($("#txt_fechainicio").val() + '-01');
    var dfechafin = ($("#txt_fechafin").val() + '-01');
    var amplitud = $("#select_amplitud").val();
    if (cadenaid == null || cadenaid == '') {
        alert("Seleccione un producto");
    }
    if ($("#txt_fechainicio").val() == '' || $("#txt_fechafin").val() == '') {
        alert("Ingrese las fechas.");
    }
    else if (nidmercado == '') {
        alert("Ingrese el mercado.");
    }
    else if (amplitud == 0) {
        alert("Ingrese la amplitud.");
    }
    else {
        GraficarAnalisisPromedios(cadenaid, nidmercado, dfechainicio, dfechafin);
    }
}

function GraficarAnalisisPromedios(cadenaid, nidmercado, dfechainicio, dfechafin) {

    var url;
    var amplitud = $("#select_amplitud").val();
    if (amplitud == 7) {
        url = "../Services/GraficarAnalisisPromediosSemanal";
    } else if(amplitud==15){
        url = "../Services/GraficarAnalisisPromediosQuincenal";
    } else if(amplitud==30){
        url = "../Services/GraficarAnalisisPromediosMensual";
    }

    $.ajax({
        type: "POST",
        url: url,
        data: "{cadenaid:'" + cadenaid + "', nidmercado:'" + nidmercado + "',dfechainicio:'" + dfechainicio + "', dfechafin:'" + dfechafin + "'}",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: GraficarAnalisisPromediosSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function GraficarAnalisisPromediosSuccess(data) {
    var amplitud = $("#select_amplitud").val();
    var unidad, titulo;

    var respuesta1 = data[0].respuesta1;
    var respuesta2 = data[0].respuesta2;
    var respuesta3 = data[0].respuesta3;
    var respuesta4 = data[0].respuesta4;
    var respuesta5 = data[0].respuesta5;
    var respuesta6 = data[0].respuesta6;
    var respuesta7 = data[0].respuesta7;
    var respuesta8 = data[0].respuesta8;
    var respuesta9 = data[0].respuesta9;
    var respuesta10 = data[0].respuesta10;

    var nombreproducto1 = data[0].vnombreproducto1;
    var nombreproducto2 = data[0].vnombreproducto2;
    var nombreproducto3 = data[0].vnombreproducto3;
    var nombreproducto4 = data[0].vnombreproducto4;
    var nombreproducto5 = data[0].vnombreproducto5;
    var nombreproducto6 = data[0].vnombreproducto6;
    var nombreproducto7 = data[0].vnombreproducto7;
    var nombreproducto8 = data[0].vnombreproducto8;
    var nombreproducto9 = data[0].vnombreproducto9;
    var nombreproducto10 = data[0].vnombreproducto10;

    if (nombreproducto1 == '') {
        nombreproducto1 = ' ';
    }
    if (nombreproducto2 == '') {
        nombreproducto2 = ' ';
    }
    if (nombreproducto3 == '') {
        nombreproducto3 = ' ';
    }
    if (nombreproducto4 == '') {
        nombreproducto4 = ' ';
    }
    if (nombreproducto5 == '') {
        nombreproducto5 = ' ';
    }
    if (nombreproducto6 == '') {
        nombreproducto6 = ' ';
    }
    if (nombreproducto7 == '') {
        nombreproducto7 = ' ';
    }
    if (nombreproducto8 == '') {
        nombreproducto8 = ' ';
    }
    if (nombreproducto9 == '') {
        nombreproducto9 = ' ';
    }
    if (nombreproducto10 == '') {
        nombreproducto10 = ' ';
    }

    //Convertir la cadena en tipo arreglo
    var arreglo1 = new Array();
    arreglo1 = JSON.parse("[" + respuesta1 + "]");
    var arreglo2 = new Array();
    arreglo2 = JSON.parse("[" + respuesta2 + "]");
    var arreglo3 = new Array();
    arreglo3 = JSON.parse("[" + respuesta3 + "]");
    var arreglo4 = new Array();
    arreglo4 = JSON.parse("[" + respuesta4 + "]");
    var arreglo5 = new Array();
    arreglo5 = JSON.parse("[" + respuesta5 + "]");
    var arreglo6 = new Array();
    arreglo6 = JSON.parse("[" + respuesta6 + "]");
    var arreglo7 = new Array();
    arreglo7 = JSON.parse("[" + respuesta7 + "]");
    var arreglo8 = new Array();
    arreglo8 = JSON.parse("[" + respuesta8 + "]");
    var arreglo9 = new Array();
    arreglo9 = JSON.parse("[" + respuesta9 + "]");
    var arreglo10 = new Array();
    arreglo10 = JSON.parse("[" + respuesta10 + "]");

    if (amplitud == 0) {
        alert("Inserte amplitud");
    } else if (amplitud == 7) {
        unidad = 'Semana';
        titulo='Análisis Semanal de Promedios'
    } else if (amplitud == 15) {
        unidad = 'Quincena';
        titulo = 'Análisis Quincenal de Promedios'
    } else if (amplitud == 30) {
        unidad = 'Mes';
        titulo = 'Análisis Mensual de Promedios'
    }

    if (respuesta1 == '' && respuesta2 == '' && respuesta3 == '' && respuesta4 == '' && respuesta5 == '' &&
        respuesta6 == '' && respuesta7 == '' && respuesta8 == '' && respuesta9 == '' && respuesta10 == '') {
        alert("No existen datos con los filtros seleccionados.");
    } else {

        Highcharts.chart('contenedor_grafico', {

            title: {
                text: titulo
            },

            subtitle: {
                text: 'Fuente: chaskis.net'
            },

            yAxis: {
                title: {
                    text: 'Promedio ( S/.)'
                },

            },
            tooltip: {
                headerFormat: '<table>',
                pointFormat: '<tr style="padding:20px;"><td>{point.key}</td>' +
                                '<td style="color:{series.color};padding:0">{series.name}:</td>' +
                                '<td style="padding:0"><b>S/.{point.y:.2f}</b></td> </tr>',
                footerFormat: '</table>',
                useHTML: true
            },

            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%e. %b',
                },
                labels: {
                    formatter: function () {
                        return unidad+' ' + this.value
                    }
                }
            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 1
                }
            },

            series: [{
                name: nombreproducto1,
                data: arreglo1
            }, {
                name: nombreproducto2,
                data: arreglo2
            }, {
                name: nombreproducto3,
                data: arreglo3
            }, {
                name: nombreproducto4,
                data: arreglo4
            }, {
                name: nombreproducto5,
                data: arreglo5
            }, {
                name: nombreproducto6,
                data: arreglo6
            }, {
                name: nombreproducto7,
                data: arreglo7
            }, {
                name: nombreproducto8,
                data: arreglo8
            }, {
                name: nombreproducto9,
                data: arreglo9
            }, {
                name: nombreproducto10,
                data: arreglo10
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });
    }
}