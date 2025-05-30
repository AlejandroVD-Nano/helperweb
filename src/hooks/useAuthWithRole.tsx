// src/hooks/useAuthWithRole.ts
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; 

// Interface para el estado que retorna el hook
interface AuthState {
  currentUser: User | null;        // Objeto de usuario de Firebase Auth
  userRole: string | null;         // Rol del usuario (admin, alumno, psicologa)
  numControl: string | null;       // Número de control del usuario
  userName: string | null;         // Nombre del usuario
  isLoading: boolean;              // Estado de carga
  error: string | null;            // Mensaje de error si ocurre alguno
}

/**
 * Hook personalizado que maneja autenticación y obtiene datos adicionales del usuario desde Firestore
 * 
 * @returns {AuthState} Objeto con:
 * - currentUser: Usuario actual de Firebase Auth
 * - userRole: Rol del usuario desde Firestore
 * - numControl: Número de control desde Firestore
 * - userName: Nombre del usuario desde Firestore
 * - isLoading: Estado de carga
 * - error: Mensaje de error si ocurre
 */
export function useAuthWithRole(): AuthState {
  const [authState, setAuthState] = useState<AuthState>({
    currentUser: null,
    userRole: null,
    numControl: null,
    userName: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    // Listener para cambios en la autenticación
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          console.log('Usuario autenticado encontrado:', user.uid);
          
          // Actualizar estado con el usuario y activar loading
          setAuthState(prev => ({
            ...prev,
            currentUser: user,
            isLoading: true,
            error: null
          }));

          // Obtener datos adicionales de Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            
            // Verificar campos con posibles variaciones de nombre
            const role = userData?.rol || userData?.role || null;
            const numControl = userData?.num_control || userData?.numeroControl || null;
            const userName = userData?.nombre || userData?.name || null;

            if (!role) {
              console.warn('Documento de usuario existe pero no tiene campo de rol');
            }

            setAuthState({
              currentUser: user,
              userRole: role,
              numControl,
              userName,
              isLoading: false,
              error: null
            });

            console.log('Datos de usuario obtenidos:', {
              role,
              numControl,
              userName
            });
          } else {
            console.warn('No se encontró documento de usuario en Firestore para UID:', user.uid);
            setAuthState({
              currentUser: user,
              userRole: null,
              numControl: null,
              userName: null,
              isLoading: false,
              error: 'Perfil de usuario no encontrado'
            });
          }
        } else {
          // No hay usuario autenticado
          console.log('No hay usuario autenticado');
          setAuthState({
            currentUser: null,
            userRole: null,
            numControl: null,
            userName: null,
            isLoading: false,
            error: null
          });
        }
      } catch (error) {
        console.error('Error en useAuthWithRole:', error);
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Error al cargar datos del usuario'
        }));
      }
    });

    // Limpieza al desmontar
    return () => unsubscribeAuth();
  }, []);

  return authState;
}