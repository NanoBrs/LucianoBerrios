import {registrarPersona,obtenerPersonas} from "./promesas.js";

window.addEventListener("load",() => {
    document.getElementById("btnRegistrar").addEventListener("click",registrar); // se agrega el listener al boton registrar
    document.getElementById("btnContraste").addEventListener("click",contraste); // se agrega el listener al constraste

});

/*<select name="select" id="campeon">
                    <option value="Dalas Mavericks">Dalas Mavericks</option>
                    <option value="Boston Celtics">Boston Celtics</option>
                    <option value="Minnesota Timberwolves">Minnesota Timberwolves</option>
                    <option value="Indiana Pacers">Indiana Pacers</option>
                  </select>
                <input type="text" id="nombre" placeholder="Ingresa tu nombre" name="nombre">
                <input type="text" id="apellido" placeholder="Ingresa tu apellido" name="apellido">
                <input type="text" id="rut" name="rut" placeholder="Ingresa tu rut">
                <input type="email" id="correo" name="correo" placeholder="Ingresa tu correo">
                <input type="number" id="edad" name="edad" placeholder="Ingresa tu edad">
    
                <div id="radios">
                    <p>En cuantos partidos se decidirá el campeon:</p>
                    <input  type="radio" id="barrida" name="c_partidos" value="4-0">
                    <label  for="4-0">La serie termina en 4 partidos</label><br>
                    <input  type="radio" id="resistencia" name="c_partidos" value="4-1">
                    <label  for="4-1">Mucha superioridad, se acaba en 5</label><br>
                    <input  type="radio" id="igualado" name="c_partidos" value="4-2">
                    <label for="4-2">Logran campeonar con tranquilidad en 6 partidos</label><br>
                    <input  type="radio" id="igualado" name="c_partidos" value="4-3">
                    <label for="4-3">Reñido, se decidira el campeon en 7 partidos</label><br>
    
    
                </div>
                <textarea name="motivo" id="motivo" cols="90" rows="10" placeholder="Cuentanos por que deberias ganar..."></textarea>

                <input id="condiciones" type="checkbox">
                <label for="terminos">Acepto los terminos y condiciones</label><br>*/

 
const registrar = async() => {              //NO FUNCIONA POR QUE LOS DATOS QUEDAN COMO UNDEFINED

    // Hacemos un get para rescatar cada campo del formulario
    let eCampeon = document.getElementById("campeon");
    console.log(eCampeon);
    let eNombre = document.getElementById("nombre");
    console.log(eNombre);
    let eApellido = document.getElementById("apellido");
    let eRut = document.getElementById("rut");
    let eCorreo = document.getElementById("correo");
    let eEdad = document.getElementById("edad");
    let eMotivo = document.getElementById("motivo");
    let eCondiciones = document.getElementById("condiciones");
    let eC_partidos = document.querySelector('input[name="c_partidos"]:checked')

    console.log("Linea 48:"+eCondiciones+"\nLinea 50:"+eCondiciones.value);
    
    

    // Ahora nuevas variables para guardar los valores de cada campo
    let vCampeon = eCampeon.value;
    let vNombre = eNombre.value;
    let vApellido = eApellido.value;
    let vCorreo = eCorreo.value;
    let vRut = eRut.value;
    let vEdad = eEdad.value;
    let vC_partidos = eC_partidos.value;
    let vMotivo = eMotivo.value;
    let vCondiciones = eCondiciones.value;

    console.log("Valores"+vCampeon+vNombre+vApellido+vCorreo+vRut+vC_partidos+vMotivo+vCondiciones); //Para verificar que los valores estan guardados
    // Validaciones
    let Validado = true;
    validado = validaciones_front("campeon");
    validado = validaciones_front("nombre");
    validado = validaciones_front("apellido");
    validado = validaciones_front("rut");
    validado = validaciones_front("correo");
    validado = validaciones_front("edad");
    validado = validaciones_front("motivo");

    if (validado == false) {
        alert("Hay errores en el formulario");
        return false;
    }







    // Creamos un objeto con los valores de cada campo
    let objeto={campeon:vCampeon,nombre:vNombre,apellido:vApellido,correo:vCorreo,rut:vRut,edad:vEdad,c_partidos:vC_partidos,motivo:vMotivo,condiciones:vCondiciones};
    console.log("Objeto creado linea 64"+objeto); //Para verificar que el objeto esta creado
    registrarPersona(objeto).then(() => {
        alert("Persona registrada");
        console.log("Persona registrada");
    }).catch((error) => {
        alert("Ha ocurrido un error\n"+error);
        console.log("Ha ocurrido un error\n"+error);
    });


}

const validaciones_front = () => {
    var campo = document.getElementById(idCampo).value;
    campo = campo.trim();
    if(campo == ""){
        document.getElementById("validar"+idCampo).style.display = "flex";
        document.getElementById("validar"+idCampo).style.margin = "0px";
        document.getElementById("validar"+idCampo).style.padding = "0px";
        document.getElementById("validar"+idCampo).style.color = "red";
        
        document.getElementById(idCampo).style.border = "2px solid red";
        document.getElementById(idCampo).placeholder = "Escribe tu "+idCampo;
    }else{
        document.getElementById(idCampo).style.border = "2px solid green";
        document.getElementById("validar"+idCampo).style.display = "none";
        var validado = true;
    }
    console.log("Valido");
    return validado;

}


const contraste = () => {
    var element = document.body;
        element.classList.toggle("modoOscuro");

}