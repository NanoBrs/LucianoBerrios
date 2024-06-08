import {registrarPersona,obtenerPersonas,actualizarPersona,eliminarPersona} from "./promesas.js";

window.addEventListener("load",() => {
    document.getElementById("btnRegistrar").addEventListener("click",registrar); // se agrega el listener al boton registrar
    document.getElementById("btnContraste").addEventListener("click",contraste); // se agrega el listener de contraste
    document.getElementById("btnEditar").addEventListener("click",actualizar); // se agrega el listener actualizar
    cargar_datos();

});


const validaciones_front = (idCampo) => {

    //Primera funcion para validar, donde se validaran todos los tipos de input menos problematicos
    var campo = document.getElementById(idCampo).value;
    if (campo === undefined || campo === null){ //Se crea para evitar que vengan undefined o null que me habia dado un error
        console.log("Linea 42 No hay nada");
        return false;
    }
    campo = campo.trim();
console.log("Linea 19 "+campo+" idCampo "+idCampo);
    if(campo == "" || (idCampo == "rut" && (campo.length > 8 || campo.length <7) ) || (idCampo == "edad" && (campo > 130 || campo < 0  ))){
        //Se valida que no este vacio, o que si es rut sea menos de 8 caracteres o si es edad que este en un rango imposible
        console.log("No Valido el campo: "+idCampo+" VALOR: "+campo);

        document.getElementById("validar"+idCampo).style.display = "flex";
        document.getElementById("validar"+idCampo).style.margin = "0px";
        document.getElementById("validar"+idCampo).style.padding = "0px";
        document.getElementById("validar"+idCampo).style.color = "red";
        
        document.getElementById(idCampo).style.border = "2px solid red";
        document.getElementById(idCampo).placeholder = "Escribe tu "+idCampo;
        //Se cambia el borde del campo el idcampo señala que campo será modificado si es que esta malo el valor
        var validado = false
    }else{
        console.log("Validado el campo "+idCampo+"de valor: "+campo);
        document.getElementById("validar"+idCampo).style.border = "2px solid green";
        document.getElementById("validar" + idCampo).style.display = "none";
        document.getElementById(idCampo).style.border = "2px solid green";
        document.getElementById(idCampo).placeholder = "Escribe tu "+idCampo;
        //Se valida el valor y se le agrega un estilo

        var validado = true;
    }
    
    return validado;

}

const validarRadio = (nombreCampo) => { //Debido a la complejidad que me supuso el radio hice una función unicamente para validarlo a el 
    var radios = document.querySelectorAll(`input[name="${nombreCampo}"]`); //Rescatamos todos los radios esten o no seleccionados 
    var radioValid = Array.from(radios).some(radio => radio.checked); //lo convertimos en array y vemos si alguno esta marcado si estan marcados es tru y si no false

    if (!radioValid) { //Si el valido es invalido aparece el mensaje en rojo
        console.log("No Valido el campo: " + nombreCampo);
        document.getElementById("validar" + nombreCampo).style.display = "flex";
        document.getElementById("validar" + nombreCampo).style.margin = "0px";
        document.getElementById("validar" + nombreCampo).style.padding = "0px";
        document.getElementById("validar" + nombreCampo).style.color = "red";

        return false;
    } else {
        //En caso de ser validado se le quita el mensaje de error y se retorna un true
        console.log("Validado el campo " + nombreCampo);
        document.getElementById("validar" + nombreCampo).style.display = "none"; 
        return true;
    }
}
 
const registrar = async() => {       
    /* VALIDACIONES
     Luego de intentar validar creando el campo validacion en clases y que sea booleano opte por crear una variable errores ya que al ser booleano si el
     ultimo campo se validaba registraba el codigo vacio, con las siguiente implementación se logro validar todos los campos gracias a la funcion
     validaciones_front y para el caso particular del radio  la funcion validarRadio
    */
    
     //Se valida que no este vacio,undefined o null mandando como parametro el nombre del campo. 
    let errores = 0;
    // Hacemos un get para rescatar cada campo del formulario
    let eCampeon = document.getElementById("campeon");   
    if (!validaciones_front("campeon")){ //Y aqui evaluamos si la validacion es verdadera o falsa, si es false se agrega un error al contador creado arriba
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
        cargar_datos();
    }).catch((error) => {
        alert("Ha ocurrido un error\n"+error);
        console.log("Ha ocurrido un error\n"+error);
    });


}

const actualizar = () => {
    let errores = 0;
    // Hacemos un get para rescatar cada campo del formulario 
    //Muy similar en estructura al registrar
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
    console.log("Objeto creado linea 209"+objeto); //Para verificar que el objeto esta creado
    let id = document.getElementById("btnEditar").value;
    actualizarPersona(objeto,id).then(() => {
        alert("Persona actualizada");
        document.getElementById("btnEditar").style.display = "none";
        document.getElementById("btnRegistrar").style.display = "inline";
        cargar_datos();
    }).catch((r) => {
        alert("Algo ocurrio");
        alert(r);
    });
}
//-----------------------  REGISTRO COMPLETAMENTE FUNCIONAL Y VALIDADO -------------------------
const cargar_datos = () => {
    //Ir a la base de datos a buscar los datos
    obtenerPersonas().then((personas) => {  
        let estructura = "";
        personas.forEach((persona) =>{ //Se genera una variable estructura y se van agregando los campos uno por uno 
            estructura += "<tr>";
            estructura += "<td>"+persona.campeon+"</td>";
            estructura += "<td>"+persona.nombre+"</td>";
            estructura += "<td>"+persona.apellido+"</td>";
            estructura += "<td>"+persona.rut+"</td>";
            estructura += "<td>"+persona.correo+"</td>";
            estructura += "<td>"+persona.edad+"</td>";
            estructura += "<td>"+persona.c_partidos+"</td>";
            estructura += "<td>"+persona.motivo+"</td>";
            estructura += "<td><button id="+persona.id+"> Editar </button></td>";
            estructura += "<td> <button id= DEL"+persona.id+"> Eliminar </button></td>";
            estructura += "</tr>";
            
        });
        document.getElementById("tb_datos").innerHTML = estructura; //Renderiza la estructura en el html
        //Ahora agregamos los eventos a los botones para poder actualizar y eliminar
        personas.forEach((persona) => {
            let botonUPD = document.getElementById(persona.id);
            botonUPD.addEventListener("click",() => {
                let eCampeon = document.getElementById("campeon");
                let eNombre = document.getElementById("nombre");
                let eApellido = document.getElementById("apellido");
                let eCorreo = document.getElementById("correo");
                let eRut = document.getElementById("rut");
                let eEdad = document.getElementById("edad");
                //console.log("Linea 175 Campeon:"+eCampeon)

                //console.log("Linea 178 persona cpartidos:"+persona.c_partidos)
                let eC_partidos = document.querySelector('input[name="c_partidos"][value="' + persona.c_partidos + '"]');
                if (eC_partidos) {
                    eC_partidos.checked = true;
                } else {
                    
                    // Manejamos el caso en el que el valor obtenido de la base de datos no coincida con ningún radio button
                    console.error("No se encontró un radio button con el valor: " + persona.c_partidos);
                }
                //console.log("Linea 178 ePartidos:"+persona.c_partidos)
                let eMotivo = document.getElementById("motivo");

                eCampeon.value = persona.campeon;
                eNombre.value = persona.nombre;
                eApellido.value = persona.apellido;
                eCorreo.value = persona.correo;
                eRut.value = persona.rut;
                eEdad.value = persona.edad;
                eC_partidos.value = persona.c_partidos;
                eMotivo.value = persona.motivo;
                //Aqui cambiamos el display del boton editar y el del registrar para que intercambien lugares, ademas le damos de valor el id del concursante al btn editar
                document.getElementById("btnEditar").style.display = "inline"; 
                document.getElementById("btnRegistrar").style.display = "none";
                document.getElementById("btnEditar").value = persona.id;
            });

            let botonDEL = document.getElementById("DEL"+persona.id); //Funcion para eliminar persona 
            botonDEL.addEventListener("click",() => { 
                 
                if (confirm("El siguiente concursante sera eliminado\nNombre:"+persona.nombre+" "+persona.apellido+"\nRut: "+persona.rut+"\nCampeon: "+persona.campeon+"\nCorre: "+persona.correo+"\nEdad: "+persona.edad+"\nPronostico: "+persona.c_partidos+"\nMotivo: "+persona.motivo)){
                    eliminarPersona(persona.id).then(() => {
                        alert("Persona eliminada"); //Se eliminan los datos pero se debe confirmar antes de eliminar
                        cargar_datos(); //se cargan los datos
                    });
                    
                }
                else{
                    alert("Persona no eliminada");
                }

            });
        });
        
    });
}


function contraste() {
    var element = document.body; //Se accede al body del documento
    element.classList.toggle("modoOscuro"); //Se le asigna el estilo css creado para que sea modo oscuro
    console.log("funciona contraste"); // Para verificar en consola

}