import {collection,addDoc,getDocs,updateDoc,doc,deleteDoc} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
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
    let listado = []; //Se crea una lista vacia 
    querySnapshot.forEach(doc => {
        // por cada uno imprime en la consola y para ver los datos en la terminal y se pushea en formato clave valor
        console.log(doc.data());
        listado.push({...doc.data(),id:doc.id});
    })

    
    console.log(listado);
    return listado;

}
export const actualizarPersona = async(persona,id) => {
    const ref = doc(db, "personaNba", id); //Utilizamos updatedoc y la ref para actualizar un registro se envia por parametro el objeto y el id
    await updateDoc(ref, persona); 


}

export const eliminarPersona = async(id) => {//utilizamos deleteDoc y la ref para actualizar un registro, se envia por parametro solo id 
    const ref = doc(db, "personaNba", id);
    await deleteDoc(ref);
}