// js/login.js
import { collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const goToRegister = document.getElementById("goToRegister");
  const goToLogin = document.getElementById("goToLogin");

  const db = window.db; // usamos la instancia global creada en login.html
  const usuariosRef = collection(db, "usuarios"); // referencia a la colección en Firestore

  // 🟢 REGISTRO DE USUARIO
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const usuario = document.getElementById("regUsuario").value.trim();
    const correo = document.getElementById("regcorreo").value.trim();
    const clave = document.getElementById("regClave").value.trim();

    try {
      // Verificar si el usuario ya existe
      const q = query(usuariosRef, where("usuario", "==", usuario));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        alert("⚠️ Este usuario ya existe.");
        return;
      }

      // Agregar usuario a Firestore
      await addDoc(usuariosRef, { usuario, correo, clave });
      alert("✅ Usuario registrado correctamente.");
      registerForm.reset();
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("❌ Ocurrió un error al registrar el usuario.");
    }
  });

  // 🔵 INICIO DE SESIÓN
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const usuario = document.getElementById("loginUsuario").value.trim();
    const clave = document.getElementById("loginClave").value.trim();

    try {
      const q = query(usuariosRef, where("usuario", "==", usuario), where("clave", "==", clave));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        localStorage.setItem("usuarioActivo", usuario);
        alert("✅ Bienvenido " + usuario);
        window.location.href = "dashboard.html";
      } else {
        alert("❌ Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("❌ Error en el inicio de sesión.");
    }
  });

  // 🔄 CAMBIO DE FORMULARIOS (login ↔ registro)
  goToRegister.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
  });

  goToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  });
});
