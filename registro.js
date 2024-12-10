// Importamos Firebase y los módulos necesarios
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, fetchSignInMethodsForEmail, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDpMgq99b-w6Hcxc_XSsROxfUvAz9nfrf8",
  authDomain: "crescento-comercio-electronico.firebaseapp.com",
  projectId: "crescento-comercio-electronico",
  storageBucket: "crescento-comercio-electronico.appspot.com",
  messagingSenderId: "1077663209135",
  appId: "1:1077663209135:web:6bbaaae5bbebda4e1c665a",
  measurementId: "G-1M78QXGHME",
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Clase para gestionar cuentas de usuario
export class ManageAccount {
  async register(name, email, password) {
    try {
      // Verificamos si el correo ya está en uso
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        alert("El correo electrónico ya está registrado. Por favor, inicia sesión.");
        window.location.href = "index.html"; // Redirigir al inicio de sesión
        return;
      }

      // Intentamos registrar al usuario con email y contraseña
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardamos al usuario en Firestore, incluyendo el nombre
      await setDoc(doc(db, "usuarios", user.uid), {
        name: name,  // Guardamos el nombre
        email: email,
        password: password, // Nota: Guardar contraseñas en texto plano no es seguro. En un entorno real, nunca hagas esto.
      });

      // Confirmación exitosa
     

      // Redirigir al usuario a la página de inicio de sesión
      window.location.href = "index.html";
    } catch (error) {
      // Manejo de errores
      console.error("Error al registrar usuario:", error);
      alert("Error: " + error.message);
    }
  }
}

// Escuchamos el evento de envío del formulario
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault(); // Evitamos la recarga de la página

  // Obtenemos los valores del formulario
  const name = document.querySelector('input[name="name"]').value; // Obtenemos el nombre
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;

  // Creamos una instancia de la clase y registramos al usuario
  const accountManager = new ManageAccount();
  accountManager.register(name, email, password);
});
