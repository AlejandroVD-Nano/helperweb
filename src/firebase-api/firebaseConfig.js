// Importa las funciones necesarias del SDK
import { initializeApp } from "firebase/app";
// Importa el servicio de Autenticación
import { getAuth } from "firebase/auth";
// Importa el servicio de Analytics (aunque no lo usaremos directamente en el login)
import { getAnalytics } from "firebase/analytics";

// Tu configuración web de Firebase
// La copio directamente de lo que me proporcionaste 
const firebaseConfig = {
  apiKey: "AIzaSyBAfq6ajjb_0muRTvnFY40zBepqsBC8o3A",
  authDomain: "helperweb-52035.firebaseapp.com",
  projectId: "helperweb-52035",
  storageBucket: "helperweb-52035.firebasestorage.app",
  messagingSenderId: "859321890183",
  appId: "1:859321890183:web:866d8221d88cfbc1dfcf22",
  measurementId: "G-ZXRV9ZRLS1"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
// Inicializa Analytics (si lo necesitas en tu app, aunque no para el login en sí)
const analytics = getAnalytics(app); // Lo incluimos ya que estaba en tu config original

// Obtiene la instancia de autenticación y la exporta
export const auth = getAuth(app);

// Puedes exportar la app también si la necesitas en otro lugar
// export default app;
