// Firebase setup
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDAbSzqzrVS57vELGI-G6ucRbyp3kpglcg",
    authDomain: "crescentobd-df080.firebaseapp.com",
    databaseURL: "https://crescentobd-df080-default-rtdb.firebaseio.com",
    projectId: "crescentobd-df080",
    storageBucket: "crescentobd-df080.appspot.com",
    messagingSenderId: "632561275915",
    appId: "1:632561275915:web:0940af834cbf31a819a30e",
    measurementId: "G-46K91H4PVE"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// References to HTML elements
const investButton = document.querySelector(".invest-button");
const modal = document.getElementById("invest-modal");
const closeButton = document.querySelector(".close-button");
const investmentForm = document.getElementById("investment-form");
const donationsElement = document.querySelector(".project-donations");

// Project key (for demonstration purposes, can be dynamic)
const projectKey = "carta";

// Fetch and display current donations
const projectRef = ref(db, `projects/${projectKey}`);
onValue(projectRef, (snapshot) => {
    const data = snapshot.val();
    const totalDonations = data ? data.totalDonations : 0;
    donationsElement.textContent = `Donaciones: $${totalDonations} COP`;
});

// Open modal
investButton.addEventListener("click", () => {
    console.log("Botón presionado");
    modal.style.display = "flex";
});

// Close modal
closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

// Handle form submission
investmentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const amount = parseInt(document.getElementById("amount").value, 10);

    if (isNaN(amount) || amount < 1000) {
    alert("Por favor, ingresa una cantidad válida (mínimo 1000 COP).");
    return;
    }

  // Fetch current donations and update
    get(projectRef).then((snapshot) => {
    const data = snapshot.val();
    const currentTotal = data ? data.totalDonations : 0;

    // Update database with new total
    update(projectRef, {
        totalDonations: currentTotal + amount
    }).then(() => {
        alert("¡Gracias por tu inversión!");
        modal.style.display = "none";
        investmentForm.reset();
    }).catch((error) => {
        console.error("Error al actualizar las donaciones:", error);
    });
    }).catch((error) => {
    console.error("Error al obtener las donaciones actuales:", error);
    });
});

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
    if (event.target === modal) {
    modal.style.display = "none";
    }
});
