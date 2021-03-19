
$(document).ready(function () {
var version = $("#version_v").val();
$("#version_l").html('Versión ' + version);
    LimpiarCampos();
    ListarTipoDocumento();
    $("#select_tipodocumento").blur(function myfunction() {
        var tipodocumento = $("#select_tipodocumento").val();

        var tbody = $("#body_numdocumento");
        if (tipodocumento == 1) {//DNI
            tbody.empty();
            tbody.append(
                '<tr>'+
                    '<td>Número de Documento:</td>'+
                    '<td><input id="txt_numerodocumento" type="text" onkeypress="return soloNumeros(event)" maxlength="8"/></td>'+
                '</tr>'
                );
        } else if (tipodocumento==2) {//RUC
            tbody.empty();
            tbody.append(
                '<tr>' +
                    '<td>Número de Documento:</td>' +
                    '<td><input id="txt_numerodocumento" type="text" onkeypress="return soloNumeros(event)" maxlength="11"/></td>' +
                '</tr>'
                );
        }
        $("#txt_numerodocumento").focus();
    });

    $("#txt_ubigeo").blur(function () {
        AutocompletarUbigeo();
    });

    //Crear cuenta
    $("#boton_crearcuenta").click(function () {
        
        var tipodocumento = $("#select_tipodocumento").val();

        var nidtipodocumento = $("#select_tipodocumento").val();
        var vnumdocumento = $("#txt_numerodocumento").val();
        var vrazonsocial = $("#txt_razonsocial").val();
        var vnombres = $("#txt_nombres").val();
        var vpaterno = $("#txt_paterno").val();
        var vmaterno = $("#txt_materno").val();
        var vsexo = $("#select_sexo").val();
        var vusuario = $("#txt_usuario").val();
        var vpassword = $("#txt_contrasena").val();
        var contrasena2 = $("#txt_contrasena2").val();
        var vemail = $("#txt_email").val();
        var vtelefono = $("#txt_telefono").val();
        var vcelular = $("#txt_celular").val();
        var vdireccion = $("#txt_direccion").val();
        var vubigeo = $("#txt_ubigeo").val();

        //RemoverClases
        $("#select_tipodocumento").removeClass('faltacompletar');

        $("#txt_numerodocumento").removeClass('faltacompletar');
        $("#txt_nombres").removeClass('faltacompletar');
        $("#txt_paterno").removeClass('faltacompletar');
        $("#txt_materno").removeClass('faltacompletar');
        $("#txt_razonsocial").removeClass('faltacompletar');
        $("#select_sexo").removeClass('faltacompletar');
        $("#txt_email").removeClass('faltacompletar');
        $("#txt_celular").removeClass('faltacompletar');
        $("#txt_direccion").removeClass('faltacompletar');
        $("#txt_ubigeo").removeClass('faltacompletar');
        $("#txt_usuario").removeClass('faltacompletar');
        $("#txt_contrasena").removeClass('faltacompletar');

        if (tipodocumento == 0) {
            alert("Complete el tipo de documento");
            $("#select_tipodocumento").addClass('faltacompletar');

        } else  if (tipodocumento == 1) {//DNI
            
            if (vnumdocumento == '') {
                alert("Complete su número de documento.");
                $("#txt_numerodocumento").focus();
                $("#txt_numerodocumento").addClass('faltacompletar');

            } else if (vnombres == '' || vpaterno == '' || vmaterno == '') {
                alert("Complete sus nombres.")
                $("#txt_nombres").focus();
                $("#txt_nombres").addClass('faltacompletar');
                $("#txt_paterno").addClass('faltacompletar');
                $("#txt_materno").addClass('faltacompletar');

            } else if(vsexo==0){
                alert("Complete su sexo");
                $("#select_sexo").addClass('faltacompletar');
            } else if (vemail == '' || vcelular == '' || vdireccion == '' || vubigeo == '') {
                alert("Faltan completar datos.");
                $("#txt_email").addClass('faltacompletar');
                $("#txt_celular").addClass('faltacompletar');
                $("#txt_direccion").addClass('faltacompletar');
                $("#txt_ubigeo").addClass('faltacompletar');

            } else if (vusuario == '') {
                alert("Complete su usuario.");
                $("#txt_usuario").addClass('faltacompletar');
            } else if (vpassword == '') {
                alert("Complete su contraseña.");
                $("#txt_contrasena").addClass('faltacompletar');
            } else {
                InsertarUsuario_CrearCuenta(nidtipodocumento, vnumdocumento, vnombres, vpaterno, vmaterno, vsexo, vrazonsocial,
                                            vusuario, vpassword, vemail, vtelefono, vcelular, vdireccion, vubigeo);
            }
        } else if (tipodocumento == 2) {//RUC
            
            if (vnumdocumento == '') {
                alert("Complete su número de documento.")
                $("#txt_numerodocumento").focus();
                $("#txt_numerodocumento").addClass('faltacompletar');
            } else if ((vnombres == '' || vpaterno == '' || vmaterno == '') && vrazonsocial == '') {
                alert("Complete sus nombres o razón social.")
                $("#txt_nombres").focus();
                $("#txt_nombres").addClass('faltacompletar');
                $("#txt_paterno").addClass('faltacompletar');
                $("#txt_materno").addClass('faltacompletar');
                $("#txt_razonsocial").addClass('faltacompletar');
            } else if (vemail == '' || vcelular == '' || vdireccion == '' || vubigeo == '') {
                alert("Faltan completar datos.");
                $("#txt_direccion").addClass('faltacompletar');
                $("#txt_ubigeo").addClass('faltacompletar');
                $("#txt_email").addClass('faltacompletar');
                $("#txt_celular").addClass('faltacompletar');
                
            } else if (vusuario == '') {
                alert("Complete su usuario.");
                $("#txt_usuario").addClass('faltacompletar');
            } else if (vpassword == '') {
                alert("Complete su contraseña.");
                $("#txt_contrasena").addClass('faltacompletar');
            } else {
                InsertarUsuario_CrearCuenta(nidtipodocumento, vnumdocumento, vnombres, vpaterno, vmaterno, vsexo, vrazonsocial,
                                            vusuario, vpassword, vemail, vtelefono, vcelular, vdireccion, vubigeo);
            }
        }
            
    });

    $("#txt_contrasena2").blur(function () {
        var vpassword = $("#txt_contrasena").val();
        var contrasena2 = $("#txt_contrasena2").val();
        var aviso = $("#aviso_contrasena");
        var traviso = $("#tr_aviso");
        if (vpassword != contrasena2) {
            aviso.empty();
            traviso.css("display","block");
            aviso.append('Las contraseñas no coinciden');
            aviso.css("color", "red");
        } else {
            traviso.css("display", "none");
            aviso.empty();
        }
    });

    //Validar el email
    document.getElementById('txt_email').addEventListener('input', function () {
        var traviso = $("#tr_aviso2");
        campo = event.target;
        valido = document.getElementById('aviso_email');

        emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        
        if (emailRegex.test(campo.value)) {
            valido.innerText = "";
            traviso.css("display", "none");
        } else {
            traviso.css("display", "block");
            valido.innerText = "E-mail incorrecto.";
        }
    });

});


function ListarTipoDocumento(){
    $.ajax({
        type: "POST",
        url: "../Services/ListarTipoDocumento",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: ListarTipoDocumentoSuccess,
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}
function OnError(data) {
    alert('Error 404...');
}

function ListarTipoDocumentoSuccess(data) {
    var selectAgregar = $("#select_tipodocumento");

    selectAgregar.empty();

    selectAgregar.append('<option value="0"> -- </option>');
    for (i = 0; i < data.length; i++) {
        selectAgregar.append("<option value='" + data[i].nidtipodocumento + "'>" + data[i].vdescripcion + "</option>");
    }
}

function soloNumeros(e) {
    var key = window.Event ? e.which : e.keyCode
    return (key >= 48 && key <= 57)
}

function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúüabcdefghijklmnñopqrstuvwxyz";
    especiales = "8-37-39-46";
    
    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}

function InsertarUsuario_CrearCuenta(nidtipodocumento, vnumdocumento, vnombres, vpaterno, vmaterno, vsexo, vrazonsocial,
                                    vusuario, vpassword, vemail, vtelefono, vcelular, vdireccion, vubigeo) {
    $.ajax({
        type: "POST",
        url: "../Services/InsertarUsuario_CrearCuenta",
        data: "{nidtipodocumento:'" + nidtipodocumento + "',vnumdocumento:'" + vnumdocumento + "',vnombres:'" +
                vnombres + "',vpaterno:'" + vpaterno + "',vmaterno:'" + vmaterno + "',vsexo:'" + vsexo + "',vrazonsocial:'" +
                vrazonsocial + "',vusuario:'" + vusuario + "',vpassword:'" + vpassword + "',vemail:'" + vemail +
                "',vtelefono:'" + vtelefono + "',vcelular:'" + vcelular + "',vdireccion:'" + vdireccion + "',vubigeo:'" +
                vubigeo + "'}",
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length >= 0) {
                alert(data);
                if (data[0].respuesta == 'true') {
                    LimpiarCampos();
                    //EnviarCorreo_CrearCuenta(data);
                    alert("Se registró correctamente.");
                    window.location = "..";
                } else if (data[0].respuesta == 'user') {
                    alert("El usuario ingresado ya existe, por favor, ingrese otro.");
                    $("#txt_usuario").addClass('faltacompletar');
                } else if (data[0].respuesta == 'celular'){
                    alert("El celular ingresado ya ha sido registrado, por favor, ingrese otro.");
                    $("#txt_celular").addClass('faltacompletar');
                }
            }
        },
        failure: function (response) {
            alert(response.d);
        },
        error: OnError
    });
}

function EnviarCorreo_CrearCuenta(data) {
        var vusuario = data[0].vusuario;
        var fecha = data[0].fecha;
        var hora = data[0].hora;
        var vemail = data[0].vemail;
        var nidusuario = data[0].nidusuario;

        var destino = 'postmaster@chaskis.net';
        var asunto = 'Registro de Usuario Nro: ' + nidusuario;
        var mensaje = 'Estimados Señores: ' +
                      'Se remite para su atención el registro del usuario: '+vusuario+
                      ', registrado el: ' + fecha+ ' a las: '+hora+', registrado con el email: '+vemail+'.';
        
        $.ajax({
            type: "POST",
            url: "../Services/EnviarCorreo_Cuenta",
            data: "{destino:'" + destino + "', asunto:'" + asunto + "', allmensaje:'" + mensaje + "'}",
            dataType: "json",
            async:false,
            contentType: "application/json; charset=utf-8",
            success: EnviarCorreoSuccess,
            failure: function (response) {
                alert(response.d);
            },
            error: EnviarCorreoError
        });

}

function EnviarCorreoSuccess() {

};

function EnviarCorreoError() {
    alert('Ocurrió un error al enviar el correo');
};

function LimpiarCampos() {

    $("#select_tipodocumento").val(0);
    $("#txt_numerodocumento").val('');
    $("#txt_razonsocial").val('');
    $("#txt_nombres").val('');
    $("#txt_paterno").val('');
    $("#txt_materno").val('');
    $("#select_sexo").val(0);
    $("#txt_usuario").val('');
    $("#txt_contrasena").val('');
    $("#txt_contrasena2").val('');
    $("#txt_email").val('');
    $("#txt_telefono").val('');
    $("#txt_celular").val('');
    $("#txt_direccion").val('');
    $("#txt_idubigeo").val('');
    $("#txt_ubigeo").val('');

}

function Regresar() {
    window.location = "..";
}

function AutocompletarUbigeo() {

    if ($("#txt_ubigeo").val().length > 0) {

        $.ajax({
            type: "POST",
            url: "../Services/AutocompletarUbigeo",
            data: "{vdescripcion:'" + $("#txt_ubigeo").val() + "'}",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.length > 0) {
                    //$("#txt_idubigeo").val(data[0].nidubigeo);
                    //$("#txt_ubigeo").val(data[0].vdescripcion);

                    //$("#message").html("Ubigeo seleccionado.");
                    //$("#message").css("color", "green");
                }
                else {
                    $("#txt_idubigeo").val(0);

                    //$("#message").html("El Ubigeo que está registrando no existe.")
                    //$("#message").css("color", "red");

                }

            },
            failure: function (response) {
                alert(response.d);
            },
            error: OnError
        })

    }
    else {
        $("#ubigeo_id").val(0);

    }
}