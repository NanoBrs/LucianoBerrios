import {collection,addDoc,getDocs} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {db} from "./firebase.js";
//Se importa la base de datos y las funciones de firebase que ocupare

export const registrarPersona = async(personaNba) => {  //Se crea una funcion para registrar una persona en la base de datos, de manera que es exportable
    console.log("personaNba");   //Se imprime en la consola para verificar que la funcion esta funcionando
    console.log(personaNba);
    const docRef = await addDoc(collection(db, "personaNba"), personaNba);
}

export const obtenerPersonas = async() => {
    const ref = collection(db, "personaNba");
    const querySnapshot = await getDocs(ref);
    console.log(querySnapshot);
    let listado = [];
    querySnapshot.forEach(doc => {
        //console.log(doc.id, " => ", doc.data());
        console.log(doc.data());
        listado.push({...doc.data(),id:doc.id});
    })

    
    console.log(listado);
    return listado;

}