var nidPerfil = sessionStorage.getItem("userperfil");
var contadorprod = 0, contadormerc = 0;

$(document).ready(function () {
    var version = $("#version_v").val();
    $("#version_l").html('Versión ' + version);
    $("#titulo").html('Precio de Venta de Productos');

    ListarComboProducto();  
    ListarComboMercado();
    $("#contenedor_total").css("display", "block");
    //Alerta al cambiar de fecha cuando no se ha iniciado sesión
    $("#select_periodoatras").click(function () {
        if (nidPerfil != 3) {
            alert("Debe registrarse o iniciar sesión para poder acceder a consultas con mayores criterios de búsquedas.");
        }
    });
    $("#txt_fechainicio").click(function () {
        if (nidPerfil != 3) {
            alert("Debe registrarse o iniciar sesión para poder acceder a consultas con mayores criterios de búsquedas.");
        }
    });
    $("#txt_fechafin").click(function () {
        if (nidPerfil != 3) {
            alert("Debe registrarse o iniciar sesión para poder acceder a consultas con mayores criterios de búsquedas.");
        }
    });

    //Habilitar cambio de periodos cuando el usuario ha iniciado sesión
    if (nidPerfil == 3) {
        $("#txt_fechainicio").attr("readonly", false);
        $("#txt_fechafin").attr("readonly", false);
        $("#select_periodoatras").attr("disabled", false);
    }

    $('input[name="fecha"]').change(function () {
    //Muestra las fechas por defecto cuando el usuario no ha iniciado sesión

        if ($("input[name='fecha']:checked").val() == 1 && nidPerfil != 3) {
            $("#txt_fechainicio").val(MesAnterior());
            $("#txt_fechafin").val(FechaActual());
        }
        if ($("input[name='fecha']:checked").val() == 2 && nidPerfil != 3) {
            $("#select_periodoatras").val(1);
        }
    //Muestra y oculta las cajas de información de fecha correspondientes por cada radio button

        if ($("input[name='fecha']:checked").val() == 1) {

            $("#tr_periodoatras").css("display", "none");
            $("#tr_rangofechas").css("display", "block");
        } else if ($("input[name='fecha']:checked").val() == 2) {
            if(nidPerfil!=3){
                alert("Debe registrarse o iniciar sesión para poder acceder a consultas con mayores criterios de búsquedas.");
                $(this).prop('checked',false);
            } else {
                $("#tr_rangofechas").css("display", "none");
                $("#tr_periodoatras").css("display", "flex");
            }
            
        }
    });

    //$("#titulo").html('Gráfico de Precios');
    /*CONTAR CHECKBOX*/
    $("input[name='chk_producto']").change(function () {
        var elemento = this;
        contadorprod = 0;
        // Recorre todos los checkbox para contar los que están seleccionados
        $("input[name='chk_producto']").each(function () {
            if ($(this).is(":checked"))
                contadorprod++;
        });

        // se comprueba si hay más de 4 checks marcados
        if (contadorprod > 4) {
            alert("Puedes seleccionar hasta 4 Productos a la vez.");
            
            // se desmarca el 5to check
            $(elemento).prop('checked', false);
            contadorprod--;
        }
    });
    /*CONTAR CHECKBOX Mercado*/
    $("input[name='chk_mercado']").change(function () {
        var elemento = this;
        contadormerc = 0;

        // Recorre todos los checkbox para contar los que están seleccionados
        $("input[name='chk_mercado']").each(function () {
            if ($(this).is(":checked"))
                contadormerc++;
        });

        // se comprueba si hay más de 2 mercados marcados
        if (contadormerc > 2) {
            alert("Puedes seleccionar hasta 2 mercados a la vez.");

            // se desmarca el 3er check
            $(elemento).prop('checked', false);
            contadormerc--;
        }
    });

    $("#btngraficar").click(function () {
        $('html,body').animate({
            scrollTop: $("#scrollToHere").offset().top
        }, 2000);
    });

});

function MesAnterior() {
    var f = new Date();
    var dia = "" + f.getDate();
    var mes = "" + (f.getMonth())

    if (parseInt(dia) < 10) {
        dia = "0" + dia;
    }
    if (parseInt(mes) < 10) {
        mes = "0" + mes;
    }
    var fecha = (f.getFullYear() + "-" + mes + "-" + dia);
    return fecha;
}

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
    var tipoperiodo='';
    var fechainicio = $("#txt_fechainicio").val();
    var fechafin = $("#txt_fechafin").val();
    var periodoatras = $("#select_periodoatras").val();
    var cadenaidmercado = $("#selectmercados").val();
    var cadenaidproducto = $("#selectproductos").val();

    if ($("input[type='radio']:checked").val() == 1) {
        tipoperiodo = 1;
        periodoatras = '';
    } else if ($("input[type='radio']:checked").val() == 2) {
        tipoperiodo = 2;
        fechainicio = '';
        fechafin = '';
    }

    if (contadormerc == 2 && contadorprod > 2) {
        alert("Puede seleccionar hasta dos productos cuando elige dos mercados.");
    } else if (tipoperiodo == '') {
        alert("Seleccione el tipo de periodo.");
    } else if (tipoperiodo == 1 && (fechainicio == '' || fechafin == '')) {
        alert("Ingrese los rangos de fecha.");
    } else if (tipoperiodo == 2 && periodoatras == 0) {
        alert("Ingrese el periodo.");
    } else if (cadenaidmercado == null) {
        alert("Ingrese el mercado");
    } else if (cadenaidproducto == null) {
        alert("Ingrese el producto.");
    } else {
        GraficarPreciosVenta(tipoperiodo, fechainicio, fechafin, periodoatras, cadenaidmercado, cadenaidproducto);
    }
}

function ListarComboProducto() {

    //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
    var pathname = window.location.pathname;
    var evaluacadena = pathname.substring(pathname.length - 1);

    var vurl = "";

    if (evaluacadena == '/') {
        vurl = ".." + pathname + "Services/ListarComboProducto";
    }
    else {
        var pathname = window.location.pathname;
        vurl = ".." + pathname + "/Services/ListarComboProducto";
    }

    $.ajax({
        type: "POST",
        url: vurl,
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
        selectAgregar.append("<option value=" + data[i].nidproducto + ">" + data[i].vdescripcion + "</option>");
        listaAgregar.append("<li><a tabindex='0'><label class='checkbox'><input type='checkbox' id='chk_prod_"+i+"' name='chk_producto' value=" + data[i].nidproducto + " />" + data[i].vdescripcion + "</label></a></input>");
    }

}

function ListarComboMercado() {

    //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
    var pathname = window.location.pathname;
    var evaluacadena = pathname.substring(pathname.length - 1);

    var vurl = "";

    if (evaluacadena == '/') {
        vurl = ".." + pathname + "Services/ListarComboMercado";
    }
    else {
        var pathname = window.location.pathname;
        vurl = ".." + pathname + "/Services/ListarComboMercado";
    }

    $.ajax({
        type: "POST",
        url: vurl,
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarComboMercadoSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError

    });
}

function ListarComboMercadoSuccess(data) {

    var selectAgregar = $("#selectmercados");
    var listaAgregar = $("#listamercado");

    selectAgregar.empty();
    listaAgregar.empty();

    selectAgregar.append('<option value="0">--Seleccionar--</option>');
    for (i = 0; i < data.length; i++) {
        selectAgregar.append("<option value='" + data[i].nidmercado + "'>" + data[i].vdescripcion + "</option>");
        listaAgregar.append("<li><a tabindex='0'><label class='checkbox' ><input type='checkbox' name='chk_mercado' value=" + data[i].nidmercado + " />" + data[i].vdescripcion + "</label></a></input>");
    }
}

function GraficarPreciosVenta(tipoperiodo, fechainicio, fechafin, periodoatras, cadenaidmercado, cadenaidproducto) {

    //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
    var pathname = window.location.pathname;
    var evaluacadena = pathname.substring(pathname.length - 1);

    var vurl = "";

    if (evaluacadena == '/') {
        vurl = ".." + pathname + "Services/GraficarPreciosVenta";
    }
    else {
        var pathname = window.location.pathname;
        vurl = ".." + pathname + "/Services/GraficarPreciosVenta";
    }

    $.ajax({
        type: "POST",
        url: vurl,
        data: "{tipoperiodo:'" + tipoperiodo + "', fechainicio:'" + fechainicio +
                "', fechafin:'" + fechafin + "', periodoatras:'" + periodoatras + "', cadenaidmercado:'" + cadenaidmercado +
                "', cadenaidproducto:'" + cadenaidproducto + "'}",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: GraficarPreciosVentaSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function GraficarPreciosVentaSuccess(data) {

    ////***********Cadena de pprecios**********//
    var cad1 = data[0].cad1;
    var arreglocad1 = new Array();
    arreglocad1 = JSON.parse("[" + cad1 + "]");

    var cad2 = data[0].cad2;
    var arreglocad2 = new Array();
    arreglocad2 = JSON.parse("[" + cad2 + "]");

    var cad3 = data[0].cad3;
    var arreglocad3 = new Array();
    arreglocad3 = JSON.parse("[" + cad3 + "]");

    var cad4 = data[0].cad4;
    var arreglocad4 = new Array();
    arreglocad4 = JSON.parse("[" + cad4 + "]");

    var nombre1 = data[0].nombre1;
    var nombre2 = data[0].nombre2;
    var nombre3 = data[0].nombre3;
    var nombre4 = data[0].nombre4;
    var dia = data[0].dia;
    var mes = data[0].mes;
    var anio = data[0].anio;
    var color1 = data[0].color1;
    var color2 = data[0].color2;
    var color3 = data[0].color3;
    var color4 = data[0].color4;


    if (nombre1 == '') {
        nombre1 = ' ';
    }
    if (nombre2 == '') {
        nombre2 = ' ';
    }
    if (nombre3 == '') {
        nombre3 = ' ';
    }
    if (nombre4 == '') {
        nombre4 = ' ';
    }

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
                renderTo: 'grafico_precios',
                type:'spline',
                zoomType: 'x',
                spacingRight: 20
            },

            title: {
                text: 'Precio de venta de productos'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Fuente:chaskis.net' :
                    'Precio de venta de productos'
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
                type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%e. %b',
                    //day: "%b %y"
                },
                
                crosshair: true,
                labels: {
                    style: {
                        fontFamily: 'Tahoma'
                    },
                    rotation: -45
                },
                title: {
                    text: 'Fecha'
                },
            },
            yAxis: {
                title: {
                    text: 'Precio'
                },
                labels: {
                    formatter: function () {
                        return 'S/.'+this.value;
                    }
                }
            },
            tooltip: {
                valueSuffix: '(S/.)'
            },
            series: [{
                name: nombre1,
                dataGrouping: {
                    enabled: false
                },
                data: arreglocad1,
                color: color1,
                pointStart: Date.UTC(anio, mes, dia),
                pointInterval: 24 * 3600 * 1000
            },
                {
                name: nombre2,
                dataGrouping: {
                    enabled: false
                },
                data: arreglocad2,
                color: color2,
                pointStart: Date.UTC(anio, mes, dia),
                pointInterval: 24 * 3600 * 1000
            },
                {
                name: nombre3,
                dataGrouping: {
                    enabled: false
                },
                data: arreglocad3,
                color: color3,
                pointStart: Date.UTC(anio, mes, dia),
                    pointInterval: 24 * 3600 * 1000

            },
                {
                name: nombre4,
                dataGrouping: {
                    enabled: false
                },
                data: arreglocad4,
                color: color4,
                pointStart: Date.UTC(anio, mes, dia),
                pointInterval: 24 * 3600 * 1000
            }]
        });
    });
}

function GraficarPrecios(cadenaid, fecha) {

    //CAPTURA LA RUTA, PARA CONCATENARLO A LA URL QUE CORRESPONDE
    var pathname = window.location.pathname;
    var evaluacadena = pathname.substring(pathname.length - 1);

    var vurl = "";

    if (evaluacadena == '/') {
        vurl = ".." + pathname + "Services/GraficarPrecios";
    }
    else {
        var pathname = window.location.pathname;
        vurl = ".." + pathname + "/Services/GraficarPrecios";
    }

    $.ajax({
        type: "POST",
        url: vurl,
        data: "{cadenaid:'" + cadenaid + "', fecha:'" + fecha + "'}",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: GraficarPreciosSuccess,
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
function GraficarPreciosSuccess(data) {
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

function GraficoPorDefecto() {
    Highcharts.chart('grafico_precios', {
        //estilo del grafico
        colors: ['#ED7D31', '#227447', '#1E8EFF', '#FF0A0E'],
        chart: {
            type: 'line',

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
            type: '',
            labels: {
                overflow: 'justify'
            }
        },

        yAxis: {
            //titulo del eje y
            title: {
                text: ''
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
            valueSuffix: ''
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
                pointInterval: 3600000, // una hora en ms
                pointStart: Date.UTC(2018, 9, 15, 0, 0, 0) // fecha - hora de inicio eje x
            }
        },
        series: [

        ],
        //menú de opciones ---
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        }
    });
}