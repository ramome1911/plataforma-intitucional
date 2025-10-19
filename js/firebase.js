
    import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
    import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

    // Configuración de Firebase (tu proyecto)
    const firebaseConfig = {
      apiKey: "AIzaSyAU63JpWdrvpfuVylD-REI42yagM-dAkck",
      authDomain: "app-tareas-6f273.firebaseapp.com",
      projectId: "app-tareas-6f273",
      storageBucket: "app-tareas-6f273.firebasestorage.app",
      messagingSenderId: "571525469369",
      appId: "1:571525469369:web:dab316586f44737c19b768",
      measurementId: "G-7WP2P4CQLT"
    };

    // Inicializar Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    window.db = db; // hacemos disponible Firestore para login.js
