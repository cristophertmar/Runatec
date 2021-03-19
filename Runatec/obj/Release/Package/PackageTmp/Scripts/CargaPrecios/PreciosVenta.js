$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);
    $("#titulo").html('Precios de Venta');
    ListarComboProducto();
    ListarComboMercado();
    $("#txt_fechainicio").val(FechaActual());
    $("#txt_fechafin").val(FechaActual());
    
    /*CONTAR CHECKBOX*/
    $("input[type=checkbox]").change(function () {
        var elemento = this;
        var contador = 0;

        // Recorre todos los checkbox para contar los que están seleccionados
        $("input[type=checkbox]").each(function () {
            if ($(this).is(":checked"))
                contador++;
        });

        // se comprueba si hay más de 4 checks marcados
        if (contador > 4) {
            alert("Puedes seleccionar hasta 4 Productos a la vez.");

            // se desmarca el 5to check
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
function FechaActual() {
    var f = new Date();
    var dia = "" + f.getDate();
    var mes = "" + (f.getMonth() + 1)

    if (parseInt(dia) < 10) {
        dia = "0" + dia;
    }
    if (parseInt(mes) < 10) {
        mes = "0" + mes;
    }
    var fecha = (f.getFullYear() + "-" + mes + "-" + dia);
    return fecha;
}
function Graficar() {
    var cadenaid = $("#selectproductos").val();
    var dfechainicio = $("#txt_fechainicio").val();
    var dfechafin = $("#txt_fechafin").val();
    var nidmercado = $("#select_mercado").val();
    if (cadenaid == null || cadenaid == '') {
        alert("Seleccione un producto");
    }
    else if ($("#txt_fechainicio").val() == '' || $("#txt_fechafin").val() == '') {
        alert("Ingrese las fechas.");
    } else if ($("#select_mercado").val() == '') {
        alert("Seleccione un mercado.");
    } else {
        GraficarPreciosIntranet(cadenaid,dfechainicio,dfechafin,nidmercado);
    }

}

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
        listaAgregar.append("<li><a tabindex='0'><label id='label_" + Math.ceil(i + 1) + "' class='checkbox'><input id='checkbox_" + Math.ceil(i + 1) + "' type='checkbox' value='" + data[i].nidproducto + "' />'" + data[i].vdescripcion + "'</label></a></input>");
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

function GraficarPreciosIntranet(cadenaid, dfechainicio, dfechafin, nidmercado) {

    $.ajax({
        type: "POST",
        url: "../Services/GraficarPreciosIntranet",
        data: "{cadenaid:'" + cadenaid + "', dfechainicio:'" + dfechainicio + "',dfechafin:'" + dfechafin + "',nidmercado:'" + nidmercado + "'}",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: GraficarPreciosIntranetSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function OnError(data) {
    alert('Error 404...');
}


//Gráfico Lineal
function GraficarPreciosIntranetSuccess(data) {
    var nombre = data[0].nombre;
    var nombre2 = data[0].nombre2;
    var nombre3 = data[0].nombre3;
    var nombre4 = data[0].nombre4;

    var mes = data[0].mes;
    var diainicio = data[0].diainicio;
    var diainicio2 = data[0].diainicio2;
    var diainicio3 = data[0].diainicio3;
    var diainicio4 = data[0].diainicio4;



    if (nombre2 == '') {
        nombre2 = ' ';
    }
    if (nombre3 == '') {
        nombre3 = ' ';
    }
    if (nombre4 == '') {
        nombre4 = ' ';
    }

    var cadena = data[0].cadena;
    var cadena2 = data[0].cadena2;
    var cadena3 = data[0].cadena3;
    var cadena4 = data[0].cadena4;
    //arreglos
    if (cadena == '' && cadena2 == '' && cadena3 == '' && cadena4 == '') {
        alert("No existen datos con los filtros seleccionados.");
    } else {
        //Convertir la cadena en tipo arreglo
        var arreglo = new Array();
        arreglo = JSON.parse("[" + cadena + "]");

        //arr 2
        var arreglo2 = new Array();
        arreglo2 = JSON.parse("[" + cadena2 + "]");

        //arr 3
        var arreglo3 = new Array();
        arreglo3 = JSON.parse("[" + cadena3 + "]");

        //arr 4
        var arreglo4 = new Array();
        arreglo4 = JSON.parse("[" + cadena4 + "]");

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

        Highcharts.chart('grafico_precios', {

            //estilo del grafico
            colors: ['#A87323', '#23A830', '#1E8EFF', '#FF0A0E'],
            chart: {
                type: 'spline',

            },
            //titulos del gráfico
            title: {
                text: 'Gráfico de Precios',
                style: {
                    color: '#227447',
                    fontWeight: 'bold'
                }
            },

            subtitle: {
                text: ''
            },

            //Convierte datos del eje x a formato de tiempo
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%e. %b',
                    //day: "%b %y"
                },
                labels: {
                    overflow: 'justify'
                }
            },

            yAxis: {
                //titulo del eje y
                title: {
                    text: 'Precio'
                },

                //Bandas dentro del gráfico

                minorGridLineWidth: 0,
                gridLineWidth: 0,
                alternateGridColor: null,


                plotBands: [{ // Light air
                    from: 0.3,
                    to: 1.5,
                    color: 'rgba(34, 116, 71, 0.1)',
                    label: {
                        text: '',
                        style: {
                            color: '#fff'
                        }
                    }
                }, { // Light breeze
                    from: 1.5,
                    to: 3.3,
                    color: 'rgba(0, 0, 0, 0)',
                    label: {
                        text: '',
                        style: {
                            color: '#606060'
                        }
                    }
                }, { // Gentle breeze
                    from: 3.3,
                    to: 5.5,
                    color: 'rgba(34, 116, 71, 0.1)',
                    label: {
                        text: '',
                        style: {
                            color: '#606060'
                        }
                    }
                }, { // Moderate breeze
                    from: 5.5,
                    to: 8,
                    color: 'rgba(0, 0, 0, 0)',
                    label: {
                        text: '',
                        style: {
                            color: '#606060'
                        }
                    }
                }, { // Fresh breeze
                    from: 8,
                    to: 11,
                    color: 'rgba(34, 116, 71, 0.1)',
                    label: {
                        text: '',
                        style: {
                            color: '#606060'
                        }
                    }
                }, { // Strong breeze
                    from: 11,
                    to: 14,
                    color: 'rgba(0, 0, 0, 0)',
                    label: {
                        text: '',
                        style: {
                            color: '#606060'
                        }
                    }
                }, { // High wind
                    from: 14,
                    to: 15,
                    color: 'rgba(34, 116, 71, 0.1)',
                    label: {
                        text: '',
                        style: {
                            color: '#606060'
                        }
                    }
                }]

            },

            //puede ser la unidad del valor 'y'
            tooltip: {
                valueSuffix: ' (s/.)'
            },

            //Estilo de las líneas del gráfico
            plotOptions: {
                spline: {
                    lineWidth: 3,
                    states: {
                        hover: {
                            lineWidth: 4
                        }
                    },
                    marker: {
                        enabled: false  //para que el punto no quede marcado
                    },
                    //pointInterval: 3600000, // una hora en ms
                    //pointStart: Date.UTC(2018, 0, 15, 0, 0, 0) // fecha - hora de inicio eje x
                }
            },
            series: [
                {
                    name: nombre,
                    data: arreglo,
                    pointStart: Date.UTC(2020, mes, diainicio),
                    pointInterval: 24 * 3600 * 1000
                },

                {
                    name: nombre2,
                    data: arreglo2,
                    pointStart: Date.UTC(2020, mes, diainicio2),
                    pointInterval: 24 * 3600 * 1000
                },

                {
                    name: nombre3,
                    data: arreglo3,
                    pointStart: Date.UTC(2020, mes, diainicio3),
                    pointInterval: 24 * 3600 * 1000
                },

                {
                    name: nombre4,
                    data: arreglo4,
                    pointStart: Date.UTC(2020, mes, diainicio4),
                    pointInterval: 24 * 3600 * 1000
                },

            ],
            //menú de opciones ---
            navigation: {
                menuItemStyle: {
                    fontSize: '10px'
                }
            }
        });
    }

}

