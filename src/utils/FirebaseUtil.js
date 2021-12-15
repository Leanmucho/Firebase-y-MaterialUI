import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { uuid } from 'uuidv4';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export function firebaseConfig() {
  const config = {
    apiKey: "AIzaSyB0iJIvva_eiHqi0zpi-VTb4EGHc--6o88",
    authDomain: "sistema-33357.firebaseapp.com",
    projectId: "sistema-33357",
    storageBucket: "sistema-33357.appspot.com",
    messagingSenderId: "373274467507",
    appId: "1:373274467507:web:3528d4d06b05cb8105e4c6",
    measurementId: "G-PKMZH5B0YT"
    };

  // Initialize Firebase
  const app = initializeApp(config);
  const analytics = getAnalytics(app);
}

export function firebaseRegistrarUsuario(email, password) {
  createUserWithEmailAndPassword(getAuth(), email, password)
    .then(credenciales => {
      // credenciales.user.
    })
}

export async function firebaseIniciarSesion(email, password) {
  try {
    let credenciales = await signInWithEmailAndPassword(getAuth(), email, password);
    //credenciales.user
  } catch (e) {
    return false;
  }
  return true;
}

export async function firebaseBuscar(coleccionABuscar) {
  let listado = [];
  let consulta = collection(getFirestore(), coleccionABuscar);
  let resultado = await getDocs(consulta);
  resultado.forEach(documento => {
    let objeto = documento.data();
    objeto.id = documento.id;
    listado.push(objeto);
  });
  return listado;
}

export function firebaseCrear(coleccion, objeto) {
  objeto.id = uuid();
  let referencia = doc(getFirestore(), coleccion, objeto.id);
  setDoc(referencia, objeto);
}

export async function firebaseEliminar(coleccion, id) {
  await deleteDoc(doc(getFirestore(), coleccion, id));
}