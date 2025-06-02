import 'react-native-gesture-handler';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CitasProvider } from './src/components/CitasContext'; // Asegúrate que la ruta sea correcta

// Pantallas
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import CitasPsicologicasScreen from './src/screens/CitasPsicologicasScreen';
import AsesoriasScreen from './src/screens/AsesoriasScreen';
import AlumnoScreen from './src/screens/AlumnoScreen';
import RedirectionScreen from './src/screens/RedireccionScreen';
import VistaPsicologoScreen from './src/screens/VistaPsicologoScreen';
import ProfesoresScreen from './src/screens/ProfesoresScreen'; 
import VistaMaestroScreen from './src/screens/VistaMaestroScreen';
import CitaMaestro from './src/screens/CitasMaestroScreen';
// Pantallas de Documentación
import CalculoDiferencialScreen from './src/screens/Documentacion/CalculoDiferencalScreen';
import FundamentosDeInvestigacionScreen from './src/screens/Documentacion/FundamentosDeInvestigacionScreen';
import FundamentosDeProgramacionScreen from './src/screens/Documentacion/FundamentosDeProgramacionScreen';
import MatematicasDiscretasScreen from './src/screens/Documentacion/MatematicasDiscretasScreen';
import TallerDeAdministracionScreen from './src/screens/Documentacion/TallerDeAdministracionScreen';
import TallerDeEticaScreen from './src/screens/Documentacion/TallerDeEticaScreen';
import ContabilidadFinancieraScreen from './src/screens/Documentacion/ContabilidadFinancieraScreen';
import CalculoIntegralScreen from './src/screens/Documentacion/CalculoIntegralScreen';
import DesarrolloSustentableScreen from './src/screens/Documentacion/DesarrolloSustentableScreen';
import PooScreen from './src/screens/Documentacion/POOScreen';
import QuimicaScreen from './src/screens/Documentacion/QuimicaScreen';
import ProbabilidadEstadisticaScreen from './src/screens/Documentacion/ProbabilidadEstadisticaScreen';
import CalculoVectorialScreen from './src/screens/Documentacion/CalculoVectorialScreen';
import EstructuraDatosScreen from './src/screens/Documentacion/EstructuraDatosScreen';
import CulturaEmpresarialScreen from './src/screens/Documentacion/CulturaEmpresarialScreen';
import AlgebraLinealScreen from './src/screens/Documentacion/AlgebraLinealScreen';
import SistemasOperativosScreen from './src/screens/Documentacion/SistemasOperativosScreen';
import FisicaGeneralScreen from './src/screens/Documentacion/FisicaGeneralScreen';

// Configuración inicial
enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      <CitasProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            {/* Pantallas principales */}
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ title: 'Inicio' }}
            />
            <Stack.Screen 
              name="CitasPsicologicas" 
              component={CitasPsicologicasScreen}
              options={{ title: 'Agendar Cita Psicológica' }}
            />
            <Stack.Screen 
              name="CitaMaestro" 
              component={CitaMaestro}
              options={{ title: 'Agendar Asesoria' }}
            />
            <Stack.Screen 
              name="Asesorias" 
              component={AsesoriasScreen}
              options={{ title: 'Asesorías Académicas' }}
            />
            <Stack.Screen
              name="Alumnos"
              component={AlumnoScreen}
              options={{ title: 'Información del Alumno' }}
            />
            <Stack.Screen
              name="VistaPsicologo"
              component={VistaPsicologoScreen}
              options={{ title: 'Gestión de Citas' }}
            />
            <Stack.Screen
              name="Profesores"
              component={ProfesoresScreen}
              options={{ title: 'Profesores' }}
            />
            <Stack.Screen
              name="VistaMaestro"
              component={VistaMaestroScreen}
              options={{ title: 'Vista Maestro' }}
            />
            <Stack.Screen
              name="Redireccion"
              component={RedirectionScreen}
              options={{ headerShown: false }}
            />

            {/* Pantallas de documentación por materia */}
            <Stack.Screen 
              name="CalculoDiferencial" 
              component={CalculoDiferencialScreen} 
              options={{ title: 'Cálculo Diferencial' }}
            />
            <Stack.Screen 
              name="FundamentosDeProgramacion" 
              component={FundamentosDeProgramacionScreen} 
              options={{ title: 'Fundamentos de Programación' }}
            />
            <Stack.Screen 
              name="TallerDeEtica" 
              component={TallerDeEticaScreen} 
              options={{ title: 'Taller de Ética' }}
            />
            <Stack.Screen 
              name="MatesDiscretas" 
              component={MatematicasDiscretasScreen} 
              options={{ title: 'Matemáticas Discretas' }}
            />
            <Stack.Screen 
              name="FundamentosDeInvestigacion" 
              component={FundamentosDeInvestigacionScreen} 
              options={{ title: 'Fundamentos de Investigación' }}
            />
            <Stack.Screen 
              name="TallerDeAdmin" 
              component={TallerDeAdministracionScreen} 
              options={{ title: 'Taller de Administración' }}
            />
            <Stack.Screen 
              name="CalculoIntegral" 
              component={CalculoIntegralScreen} 
              options={{ title: 'Cálculo Integral' }}
            />
            <Stack.Screen 
              name="ContabilidadFinanciera" 
              component={ContabilidadFinancieraScreen} 
              options={{ title: 'Contabilidad Financiera' }}
            />
            <Stack.Screen 
              name="DesarrolloSustentable" 
              component={DesarrolloSustentableScreen} 
              options={{ title: 'Desarrollo Sustentable' }}
            />
            <Stack.Screen 
              name="Poo" 
              component={PooScreen} 
              options={{ title: 'Programación Orientada a Objetos' }}
            />
            <Stack.Screen 
              name="Quimica" 
              component={QuimicaScreen} 
              options={{ title: 'Química' }}
            />
            <Stack.Screen 
              name="Probabilidad" 
              component={ProbabilidadEstadisticaScreen} 
              options={{ title: 'Probabilidad y Estadística' }}
            />
            <Stack.Screen 
              name="CalculoVectorial" 
              component={CalculoVectorialScreen} 
              options={{ title: 'Cálculo Vectorial' }}
            />
            <Stack.Screen 
              name="EstructuraDeDatos" 
              component={EstructuraDatosScreen} 
              options={{ title: 'Estructura de Datos' }}
            />
            <Stack.Screen 
              name="CulturaEmpresarial" 
              component={CulturaEmpresarialScreen} 
              options={{ title: 'Cultura Empresarial' }}
            />
            <Stack.Screen 
              name="AlgebraLineal" 
              component={AlgebraLinealScreen} 
              options={{ title: 'Álgebra Lineal' }}
            />
            <Stack.Screen 
              name="SistemasOperativos" 
              component={SistemasOperativosScreen} 
              options={{ title: 'Sistemas Operativos' }}
            />
            <Stack.Screen 
              name="Fisica" 
              component={FisicaGeneralScreen} 
              options={{ title: 'Física General' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CitasProvider>
    </>
  );
}