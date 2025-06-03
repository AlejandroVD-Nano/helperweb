// HomeScreen.tsx
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types'; // Ajusta según la ruta real de tus tipos de navegación

import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native'; // Agregamos ActivityIndicator para el estado de carga

// Importa tu hook de autenticación y rol.
// ¡ASEGÚRATE DE QUE ESTA RUTA SEA CORRECTA para tu proyecto!
import { useAuthWithRole } from '../hooks/useAuthWithRole';
import * as React from 'react';

//import React = require('react');

// También necesitarás importar la función de sign out de Firebase Auth si la usas aquí
// Por ejemplo:
// import { getAuth, signOut } from 'firebase/auth';
// const auth = getAuth(); // Obtén la instancia de auth donde la inicialices


// Define el tipo de navegación para esta pantalla
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  // Usa el hook para obtener la navegación
  const navigation = useNavigation<HomeScreenNavigationProp>(); // Añade el tipo para mejor tipado

  // *** Usa tu hook para obtener el usuario actual, su rol y el estado de carga ***
  const { currentUser, userRole, isLoading } = useAuthWithRole();

  // *** Mostrar un indicador de carga mientras se obtiene el rol ***
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Cargando información del usuario...</Text>
      </View>
    );
  }

  // *** Si no hay usuario logueado, esto no debería pasar si usas ProtectedRoute,
  // *** pero es una buena verificación de respaldo. Puedes redirigir aquí.
  if (!currentUser) {
      console.warn("HomeScreen: No user found. Redirecting to login.");
      // Considera redirigir programáticamente aquí si no estás usando ProtectedRoute
      // navigation.navigate('Login');
      return (
        <View style={styles.container}>
          <Text>Debes iniciar sesión para ver este contenido.</Text>
          {/* Puedes agregar un botón para ir al login si no rediriges automáticamente */}
           <Button title="Ir a Iniciar Sesión" onPress={() => navigation.navigate('Login')} />
        </View>
      );
  }


  // *** Si llegamos aquí, significa que isLoading es false y hay un currentUser ***
  // Ahora renderizamos los botones condicionalmente según el userRole

  return (
    
    <View style={styles.container}>
  {/* Título de bienvenida */}
  <Text style={styles.title} >Bienvenido Administrador</Text>

  {/* Contenedor principal para los botones (2 columnas) */}
  <View style={styles.buttonsContainer}>
    {/* 1. Botón Agendar Cita Psicológica */}
    {(userRole === 'alumno' || userRole === 'psicologa' || userRole === 'admin') && (
      <View style={styles.buttonWrapper}>
        <Button
          title="Agendar Cita Psicológica"
          onPress={() => navigation.navigate('CitasPsicologicas')}
        />
      </View>
    )}

    {/* 2. Botón Citas (Psicóloga)
    {(userRole === 'psicologa' || userRole === 'admin') && (
      <View style={styles.buttonWrapper}>
        <Button
          title="Citas"
          onPress={() => navigation.navigate('VistaPsicologo')}
        />
      </View>
    )} */}

    {/* 3. Botón VistaPsicologo */}
    {(userRole === 'psicologa' || userRole === 'admin') && (
      <View style={styles.buttonWrapper}>
        <Button
          title="VistaPsicologo"
          onPress={() => navigation.navigate('VistaPsicologo')}
        />
      </View>
    )}

    {/* 4. Botón VistaMaestro */}
    {(userRole === 'maestro' || userRole === 'admin') && (
      <View style={styles.buttonWrapper}>
        <Button
          title="VistaMaestro"
          onPress={() => navigation.navigate('VistaMaestro')}
        />
      </View>
    )}

    {/* 5. Botón Buscar asesorías */}
    {(userRole === 'alumno' || userRole === 'admin') && (
      <View style={styles.buttonWrapper}>
        <Button
          title="Buscar asesorías"
          onPress={() => navigation.navigate('Asesorias')}
        />
      </View>
    )}

    {/* 6. Botón Alumnos */}
    {(userRole === 'alumno' || userRole === 'admin') && (
      <View style={styles.buttonWrapper}>
        <Button
          title='Alumnos'
          onPress={() => navigation.navigate('Alumnos')}
        />
      </View>
    )}
  </View>

  {/* Contenedor para el botón de cerrar sesión (centrado y ancho completo) */}
  <View style={styles.logoutContainer}>
    <Button
      title="Cerrar sesión"
      onPress={async () => {
        console.log("Iniciando proceso de cierre de sesión...");
        try {
          // await signOut(auth);
          console.log("Sesión cerrada exitosamente.");
          navigation.navigate('Login');
        } catch (error) {
          console.error("Error al cerrar sesión:", error);
        }
      }}
    />
  </View>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20, // Añadido padding para no pegar al borde
    backgroundColor: '#8FB4D5',
  },
  title: {
    fontSize: 35,
    marginBottom: 20,
    fontWeight: 'bold', // Hacer el título más notorio,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 100,
  },
  buttonWrapper: {
    width: '48%', // Esto crea 2 columnas con un pequeño espacio entre ellas
    marginBottom: 10,
    borderRadius: 70,
    shadowColor: '#003845',
       shadowRadius: 20,
  },
  logoutContainer: {
    borderRadius: 70,
    width: '60%',
    marginTop: 20,
    alignSelf: 'center',
    // Si quieres que el botón de cerrar sesión no sea tan ancho:
    // width: '60%',
    shadowColor: '#003845',
       shadowRadius: 20,
  },
});
