import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import * as assets from '../../assets';
import { useNavigation } from '@react-navigation/native';

type Materia = {
    id: string;
    name: string;
    image: number | { uri: string };
    semestre: string;
    profesores: string[];
  };

  const Asesoria = () => {
    const navigation = useNavigation();
    //Datos de cada materia
    const [materias, setMaterias] = useState<Materia[]>([
      {
        id: '1',
        name: 'Cálculo Diferencial',
        image: assets.caldif,
        semestre: '1° semestre',
        profesores: ['Juan Solano', '\nElia Mata Sáenz'],
      },
      {
        id: '2',
        name: 'Fundamentos de programación',
        image: assets.fundprogra,
        semestre: '1° semestre',
        profesores: ['Rocío Névarez', '\nDavid Valtierrez'],
      },
      {
        id: '3',
        name: 'Taller de Ética',
        image: assets.etica,
        semestre: '1° semestre',
        profesores: ['Erika Martínez','\nJulio Chavarría'],
      },
      {
        id: '4',
        name: 'Matemáticas discretas',
        image: assets.discretas,
        semestre: '1° semestre',
        profesores: ['Alicia Robles', '\nGerardo García'],
      },
      {
        id: '5',
        name: 'Fundamentos de investigación',
        image: assets.invest,
        semestre: '1° semestre',
        profesores: ['Víctor López', '\nRosalinda García'],
      },
      {
        id: '6',
        name: 'Taller de administración',
        image: assets.admin,
        semestre: '1° semestre',
        profesores: ['Cynthia Araiza', '\nJulio Chavarría'],
      },
      {
        id: '7',
        name: 'Cálculo Integral',
        image: assets.calint,
        semestre: '2° semestre',
        profesores: ['Elia Mata Sáenz', '\nMartín Salinas'],
      },
      {
        id: '8',
        name: 'POO',
        image: assets.pooImage,
        semestre: '2° semestre',
        profesores: ['David Valtierrez', '\nGustavo Núñez'],
      },
      {
        id: '9',
        name: 'Contabilidad Financiera',
        image: assets.conta,
        semestre: '2° semestre',
        profesores: ['Laura Franco', '\nJulieta Vázquez'],
      },
      {
        id: '10',
        name: 'Química',
        image: assets.quimica,
        semestre: '2° semestre',
        profesores: ['Rosario Baray', '\nVladimir Estupiñón'],
      },
      {
        id: '11',
        name: 'Desarrollo Sustentable',
        image: assets.desarrollo,
        semestre: '2° semestre',
        profesores: ['Alicia Robles', '\nJosé Hernández'],
      },
      {
        id: '12',
        name: 'Probabilidad y estadística',
        image: assets.probabilidad,
        semestre: '2° semestre',
        profesores: ['Elia Mata Sáenz', '\nMartín Salinas'],
      },
      {
        id: '13',
        name: 'Cálculo Vectorial',
        image: assets.calvect,
        semestre: '3° semestre',
        profesores: ['Martín Salinas', '\nJuan Solano'],
      },
      {
        id: '14',
        name: 'Estructura de datos',
        image: assets.estructura,
        semestre: '3° semestre',
        profesores: ['Gerardo García', '\nGustavo Núñez'],
      },
      {
        id: '15',
        name: 'Cultura Empresarial',
        image: assets.cultura,
        semestre: '3° semestre',
        profesores: ['Osvaldo Reyes', '\nLaura Franco'],
      },
      {
        id: '16',
        name: 'Álgebra Lineal',
        image: assets.algebra,
        semestre: '3° semestre',
        profesores: ['Horacio Corral', '\nJuan Solano'],
      },
      {
        id: '17',
        name: 'Sistemas Operativos',
        image: assets.so,
        semestre: '3° semestre',
        profesores: ['Gerardo García', '\nVíctor González'],
      },
      {
        id: '18',
        name: 'Física General',
        image: assets.fisica,
        semestre: '3° semestre',
        profesores: ['Elia Mata Sáenz', '\nDavid Urita'],
      },
    ]);

    //Para que se pueda filtrar aunque no se usen tildes
    function normalizeText(text: string | string[]): string {
  if (Array.isArray(text)) {
    return text.join(' ').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

    // Estados para búsqueda, semestre y materia 
  const [searchText, setSearchText] = useState('');
  const [selectedSemestre, setSelectedSemestre] = useState('Todo');
  const [selectedMateria, setSelectedMateria] = useState<Materia | null>(null);

  // Filtrar materias por búsqueda y semestre
  const filteredMaterias = materias.filter((materia) => {
    const searchTerm = normalizeText(searchText);
    return (normalizeText(materia.name).includes(searchTerm) || 
     normalizeText(materia.profesores).includes(searchTerm)) &&
    (selectedSemestre === 'Todo' || materia.semestre === selectedSemestre) 
  });

  //Semestres disponibles
  const semestres = ['Todo', '1° semestre', '2° semestre', '3° semestre'];

  if (selectedMateria) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedMateria(null)}
        >
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>

        <Image
          source={typeof selectedMateria.image === 'string' ? { uri: selectedMateria.image } : selectedMateria.image}
          style={styles.materiaDetailImage}
        />
        <Text style={styles.materiaNombre}>{selectedMateria.name}</Text>
        <Text style={styles.materiaSemestre}>{selectedMateria.semestre}</Text>
        <Text style={styles.materiaProfesor}>{selectedMateria.profesores}</Text>
        <View style={styles.buttonsContainer}>
        <Pressable style={styles.button1}
        onPress={() => {
      // Redirige a la pantalla correspondiente según la materia
     switch(selectedMateria.name) {
      case 'Cálculo Diferencial':
        navigation.navigate('CalculoDiferencial');
        break;
      case 'Fundamentos de programación':
        navigation.navigate('FundamentosDeProgramacion');
        break;
      case 'Taller de Ética':
        navigation.navigate('TallerDeEtica');
        break;
      case 'Matemáticas discretas':
        navigation.navigate('MatesDiscretas');
        break;
      case 'Fundamentos de investigación':
        navigation.navigate('FundamentosDeInvestigacion');
        break;    
      case 'Taller de administración':
        navigation.navigate('TallerDeAdmin');
        break;  
      case 'Cálculo Integral':
        navigation.navigate('CalculoIntegral');
        break;
      case 'POO':
        navigation.navigate('Poo');
        break;
      case 'Contabilidad Financiera':
        navigation.navigate('ContabilidadFinanciera');
        break;
      case 'Química':
        navigation.navigate('Quimica');
        break;
      case 'Desarrollo Sustentable':
        navigation.navigate('DesarrolloSustentable');
        break;
      case 'Probabilidad y estadística':
        navigation.navigate('Probabilidad');
        break;
      case 'Cálculo Vectorial':
        navigation.navigate('CalculoVectorial');
        break;
      case 'Estructura de datos':
        navigation.navigate('EstructuraDeDatos');
        break;
      case 'Cultura Empresarial':
        navigation.navigate('CulturaEmpresarial');
        break;
      case 'Álgebra Lineal':
        navigation.navigate('AlgebraLineal');
        break;
      case 'Sistemas Operativos':
        navigation.navigate('SistemasOperativos');
        break;
      case 'Física General':
        navigation.navigate('Fisica');
        break;
    }
  }}>
        <Text style={styles.buttonText}>Documentación</Text>
        </Pressable>
        {/* <Pressable style={styles.button2} onPress={() => navigation.navigate('Profesores', { materia: selectedMateria })}>
        <Text style={styles.buttonText}>Asesorías</Text>
        </Pressable> */}
        </View>
      </View>
    );
  }

  // Vista principal de las materias
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Asesorías</Text>

      {/* Barra de búsqueda */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar materias o profesores"
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Filtros por categoría */}
      <View style={styles.semestreContenedor}>
        {semestres.map((semestre) => (
          <TouchableOpacity
            key={semestre}
            style={[
              styles.semestreButton,
              selectedSemestre === semestre && styles.selectedSemestreButton,
            ]}
            onPress={() => setSelectedSemestre(semestre)}
          >
            <Text
              style={[
                styles.semestreButtonText,
                selectedSemestre === semestre && styles.selectedSemestreButtonText,
              ]}
            >
              {semestre.charAt(0).toUpperCase() + semestre.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de materias */}
      <FlatList
        data={filteredMaterias}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recuadroMateria}
            onPress={() => setSelectedMateria(item)}
          >
             <Image source={item.image} style={styles.productImage} />
            <Text style={styles.datos}>{item.name}</Text>
            <Text style={styles.datos}>{item.profesores}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#c0e6ed', 
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    backgroundColor: '#2db5cf',
    color: '#FFFFFF',
  },
  button1: {
    backgroundColor: '#2db5cf',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    width: 150,
    maxWidth: '50%',
    marginRight: 20,
    justifyContent: 'center',
  },
  buttonsContainer: {
  flexDirection: 'row', 
  justifyContent: 'center', 
  marginTop: 10, 
},
  button2: {
    backgroundColor: '#2db5cf',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    width: 150,
    maxWidth: '50%',
    justifyContent: 'center',
  },
   buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    padding: 15,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  semestreContenedor: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  semestreButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#f5fcfc', 
  },
  selectedSemestreButton: {
    backgroundColor: '#1b9bc2', 
  },
  semestreButtonText: {
    color: '#333',
  },
  selectedSemestreButtonText: {
    color: '#fff',
  },
  recuadroMateria: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
  },
  productImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  datos: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    color: '#0b87a3',
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    color: '#0379a3',
    fontSize: 16,
  },
  materiaDetailImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  materiaNombre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  materiaSemestre: {
    fontSize: 20,
    color: '#0b87a3',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  materiaProfesor: {
    fontSize: 16,
    color: '#185d7a',
    marginBottom: 16,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  });

export default Asesoria;
 