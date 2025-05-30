import { StyleSheet, Text, View, TextInput, Pressable, Alert, ImageBackground,Image } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// Importa la función de inicio de sesión y la clase FirebaseError
import { signInWithEmailAndPassword} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
// Importa la instancia de auth que creaste en tu archivo de inicialización
import { auth } from '../firebase-api/firebaseConfig';
import React from 'react';


export default function LoginScreen() {
  const [controlNumber, setControlNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!controlNumber || !password) {
      alert('Error Por favor ingresa número de control y contraseña');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, controlNumber, password);

      const user = userCredential.user;
      console.log('Usuario inició sesión exitosamente:', user.email);
      Alert.alert('Éxito ¡Inicio de sesión exitoso!');
      navigation.navigate('Redireccion')
      
    } catch (error) {
      // **VERIFICACIÓN DEL TIPO DE ERROR PARA TYPESCRIPT**
      let userErrorMessage = 'Ocurrió un error desconocido al intentar iniciar sesión.'; // Mensaje por defecto

      if (error instanceof FirebaseError) {
        // Si el error es una instancia de FirebaseError, podemos acceder a sus propiedades
        const errorCode = error.code;
        const errorMessage = error.message; // Aunque a menudo mostramos un mensaje más amigable

        console.error('Error de Firebase Auth:', errorCode, errorMessage);

        // Personaliza el mensaje basado en el código de error
        if (errorCode === 'auth/user-not-found') {
          userErrorMessage = 'El número de control no está registrado.';
        } else if (errorCode === 'auth/wrong-password') {
          userErrorMessage = 'Contraseña incorrecta.';
        } else if (errorCode === 'auth/invalid-email') {
           userErrorMessage = 'El formato del número de control no es válido.';
        }
        // Puedes añadir más casos aquí para otros códigos de error de auth
        // (ej: 'auth/invalid-credential' en SDKs más recientes, 'auth/too-many-requests', etc.)

      } else {
         // Si el error no es una FirebaseError (menos común para auth issues)
         console.error('Error inesperado:', error);
         // userErrorMessage ya tiene el valor por defecto 'Ocurrió un error desconocido...'
      }

      // Muestra la alerta con el mensaje de error (sea FirebaseError o desconocido)
      alert('Error de inicio de sesión credenciales invalidas');
    }
  };

  // ... (el resto de tu componente y estilos permanecen igual) ...
  return (
    <ImageBackground source={require('../../assets/photobackground.jpg')} 
    style={styles.backgroundImage}
      resizeMode="cover" // Esto hace que la imagen cubra toda la pantalla
      >
      <View style={styles.container}>
      <View style={styles.loginBox}>
        <Image source={require('../../assets/profile.gif')} style={styles.imagenperfil} />
        <Text style={styles.title}>Iniciar Sesión</Text>

        <TextInput
          placeholder="Correo electronico"
          style={styles.input}
          value={controlNumber}
          onChangeText={setControlNumber}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </Pressable>
      </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imagenperfil: {
  width: 100,
  height: 100,
  borderRadius: 200,

},
  backgroundImage:{
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loginBox: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: 'rgba(26, 43, 96, 0.14)' ,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff'
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    color:'#fff'
  },
  button: {
    backgroundColor: 'rgba(6, 222, 255, 0.16)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
