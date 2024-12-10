// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDpMgq99b-w6Hcxc_XSsROxfUvAz9nfrf8",
  authDomain: "crescento-comercio-electronico.firebaseapp.com",
  projectId: "crescento-comercio-electronico",
  storageBucket: "crescento-comercio-electronico.firebasestorage.app",
  messagingSenderId: "1077663209135",
  appId: "1:1077663209135:web:6bbaaae5bbebda4e1c665a",
  measurementId: "G-1M78QXGHME"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  // Inicializamos Firestore

// Manejar el evento de envío del formulario
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;

  try {
    // Primero, intentamos iniciar sesión con Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Usuario autenticado con Firebase:", userCredential.user);

    // Después de autenticarnos, verificamos en Firestore si el email y la contraseña coinciden
    const userDocRef = doc(db, "usuarios", userCredential.user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      
      // Verificamos que la contraseña almacenada en Firestore coincida con la ingresada
      if (userData.password === password) {
        alert("Inicio de sesión exitoso");
        console.log("Usuario autenticado desde Firestore:", userData);
        
        // Redirigir a bienvenida.html después del inicio de sesión exitoso
        window.location.href = "main.html";
      } else {
        alert("La contraseña es incorrecta.");
      }
    } else {
      alert("No se encontró el usuario en la base de datos.");
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    alert("Error: " + error.message);
  }
});
