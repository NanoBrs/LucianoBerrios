import {registrarPersona,obtenerPersonas} from "./promesas.js";

window.addEventListener("load",() => {
    document.getElementById("btnRegistrar").addEventListener("click",registrar); // se agrega el listener al boton registrar
    document.getElementById("btnContraste").addEventListener("click",contraste); // se agrega el boton de contraste

});


const validaciones_front = (idCampo) => {
    var campo = document.getElementById(idCampo).value;
    if (campo === undefined || campo === null){
        console.log("Linea 42 No hay nada");
        return false;
    }
    campo = campo.trim();
    if(campo == "" || (idCampo == "rut" && (campo.lenght > 8 || campo.lenght <7) ) || (idCampo == "edad" && (campo > 130 || campo < 0  ))){
        //Se valida que no este vacio, o que si es rut sea menos de 8 caracteres o si es edad que este en un rango imposible
        console.log("No Valido el campo: "+idCampo+" VALOR: "+campo);

        document.getElementById("validar"+idCampo).style.display = "flex";
        document.getElementById("validar"+idCampo).style.margin = "0px";
        document.getElementById("validar"+idCampo).style.padding = "0px";
        document.getElementById("validar"+idCampo).style.color = "red";
        
        document.getElementById(idCampo).style.border = "2px solid red";
        document.getElementById(idCampo).placeholder = "Escribe tu "+idCampo;
        var validado = false
    }else{
        console.log("Validado el campo "+idCampo+"de valor: "+campo);
        document.getElementById("validar"+idCampo).style.border = "2px solid green";
        document.getElementById("validar" + idCampo).style.display = "none";
        document.getElementById(idCampo).style.border = "2px solid green";
        document.getElementById(idCampo).placeholder = "Escribe tu "+idCampo;

        var validado = true;
    }
    
    return validado;

}

const validarRadio = (nombreCampo) => { //Debido a la complejidad que me supuso el radio hice una función unicamente para validarlo a el 
    var radios = document.querySelectorAll(`input[name="${nombreCampo}"]`); //Rescatamos todos los radios esten o no seleccionados 
    var radioValid = Array.from(radios).some(radio => radio.checked); //lo convertimos en array y vemos si alguno esta marcado si estan marcados es tru y si no false

    if (!radioValid) {
        console.log("No Valido el campo: " + nombreCampo);
        document.getElementById("validar" + nombreCampo).style.display = "flex";
        document.getElementById("validar" + nombreCampo).style.margin = "0px";
        document.getElementById("validar" + nombreCampo).style.padding = "0px";
        document.getElementById("validar" + nombreCampo).style.color = "red";

        return false;
    } else {
        console.log("Validado el campo " + nombreCampo);
        document.getElementById("validar" + nombreCampo).style.display = "none"; 
        return true;
    }
}
 
const registrar = async() => {       
    /* VALIDACIONES
     Luego de intentar validar creando el campo validacion  que sea booleano opte por crear una variable errores ya que al ser booleano si el
     ultimo campo se validaba registraba el codigo vacio, con las siguiente implementación se logro validar todos los campos gracias a la funcion
     validaciones_front y para el caso particular del radio 
    */
    
     //Se valida que no este vacio,undefined o null mandando como parametro el nombre del campo. 
    let errores = 0;
    // Hacemos un get para rescatar cada campo del formulario
    let eCampeon = document.getElementById("campeon");   
    if (!validaciones_front("campeon")){
        errores++;
    }; 

    let eNombre = document.getElementById("nombre");
    if (!validaciones_front("nombre")){
        errores++;
    }; 

    let eApellido = document.getElementById("apellido");
    if (!validaciones_front("apellido")){
        errores++;
    }; 

    let eRut = document.getElementById("rut");
    if (!validaciones_front("rut")){
        errores++;
    }; 

    let eCorreo = document.getElementById("correo");
    if (!validaciones_front("correo")){
        errores++;
    }; 

    let eEdad = document.getElementById("edad");
    if (!validaciones_front("edad")){
        errores++;
    }; 
    
    let eC_partidos = document.querySelector('input[name="c_partidos"]:checked')
    

    if (!validarRadio('c_partidos')){
        errores++;
    };

    let eMotivo = document.getElementById("motivo");
    if (!validaciones_front("motivo")){
        errores++;
    }; 
    console.log(errores);
    if (errores != 0) {
        alert("Hay errores en el formulario ");
        return false;
    }
    

    // Ahora nuevas variables para guardar los valores de cada campo
    let vCampeon = eCampeon.value;
    let vNombre = eNombre.value;
    let vApellido = eApellido.value;
    let vCorreo = eCorreo.value;
    let vRut = eRut.value;
    let vEdad = eEdad.value;
    let vC_partidos = eC_partidos.value;
    let vMotivo = eMotivo.value;

    // Creamos un objeto con los valores de cada campo
    let objeto={campeon:vCampeon,nombre:vNombre,apellido:vApellido,correo:vCorreo,rut:vRut,edad:vEdad,c_partidos:vC_partidos,motivo:vMotivo};
    console.log("Objeto creado linea 64"+objeto); //Para verificar que el objeto esta creado
    registrarPersona(objeto).then(() => {
        alert("Persona registrada");
        console.log("Persona registrada");
    }).catch((error) => {
        alert("Ha ocurrido un error\n"+error);
        console.log("Ha ocurrido un error\n"+error);
    });


}
//-----------------------  REGISTRO COMPLETAMENTE FUNCIONAL Y VALIDADO -------------------------



function contraste() {
    
    var element = document.body;
    element.classList.toggle("modoOscuro");
    console.log("funciona contraste");

}