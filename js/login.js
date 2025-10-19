import { collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const db = window.db;
  const usuariosRef = collection(db, "usuarios");

  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  // 🔹 Registrar usuario en Firestore
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const usuario = document.getElementById("regUsuario").value.trim();
    const correo = document.getElementById("regcorreo").value.trim();
    const clave = document.getElementById("regClave").value.trim();

    try {
      const q = query(usuariosRef, where("usuario", "==", usuario));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        alert("⚠️ Este usuario ya existe.");
        return;
      }

      await addDoc(usuariosRef, { usuario, correo, clave });
      alert("✅ Usuario registrado correctamente.");
      registerForm.reset();
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("❌ Error al registrar el usuario.");
    }
  });

  // 🔹 Iniciar sesión validando contra Firestore
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const usuario = document.getElementById("loginUsuario").value.trim();
    const clave = document.getElementById("loginClave").value.trim();

    try {
      const q = query(usuariosRef, where("usuario", "==", usuario), where("clave", "==", clave));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        alert(`✅ Bienvenido ${usuario}`);
        sessionStorage.setItem("usuarioActivo", usuario); // solo para sesión actual
        window.location.href = "dashboard.html";
      } else {
        alert("❌ Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("❌ Error en el inicio de sesión.");
    }
  });
});
