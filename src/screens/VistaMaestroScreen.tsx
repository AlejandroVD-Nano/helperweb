import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Image,
  Pressable,
  Platform
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';

// Definición de tipos
type Cita = {
  id: string;
  alumno: string;
  numeroControl: string;
  carrera: string;
  fecha: string;
  hora: string;
  motivo: string;
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'realizada';
};

type Maestro = {
  nombre: string;
  especialidad: string;
  correo: string;
  telefono: string;
};

// Datos iniciales
const maestroData: Maestro = {
  nombre: 'Ing. David Saenz',
  especialidad: 'Desarrollo Web',
  correo: 'david.saenz@universidad.edu',
  telefono: '55 1234 5678',
};

const citasIniciales: Cita[] = [
  {
    id: '1',
    alumno: 'Juan Pérez',
    numeroControl: '20210001',
    carrera: 'Ingeniería',
    fecha: '2023-11-15',
    hora: '10:00 - 11:00',
    motivo: 'Ayuda Examen',
    estado: 'pendiente',
  },
  {
    id: '2',
    alumno: 'María López',
    numeroControl: '20210002',
    carrera: 'Medicina',
    fecha: '2023-11-16',
    hora: '11:00 - 12:00',
    motivo: 'Asesorias proyecto',
    estado: 'confirmada',
  },
  {
    id: '3',
    alumno: 'Carlos Sánchez',
    numeroControl: '20210003',
    carrera: 'Derecho',
    fecha: '2023-11-17',
    hora: '09:00 - 10:00',
    motivo: 'Dudas sobre el proyecto final',
    estado: 'realizada',
  },
];

const VistaMaestroScreen = () => {
  // Estados para las citas
  const [citas, setCitas] = useState<Cita[]>(citasIniciales);
  const [showProfile, setShowProfile] = useState(false);
  
  // Estados para el modal de nueva cita
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [motivo, setMotivo] = useState('');
  const [alumno, setAlumno] = useState('');
  const [numeroControl, setNumeroControl] = useState('');
  const [carrera, setCarrera] = useState('');

  // Funciones para manejar citas
  const confirmarCita = (id: string) => {
    setCitas(citas.map(c => c.id === id ? {...c, estado: 'confirmada'} : c));
    Alert.alert('Cita confirmada', 'La cita ha sido confirmada exitosamente');
  };

  const cancelarCita = (id: string) => {
    setCitas(citas.map(c => c.id === id ? {...c, estado: 'cancelada'} : c));
    Alert.alert('Cita cancelada', 'La cita ha sido cancelada');
  };

  const marcarRealizada = (id: string) => {
    setCitas(citas.map(c => c.id === id ? {...c, estado: 'realizada'} : c));
    Alert.alert('Cita completada', 'La cita ha sido marcada como realizada');
  };

  const agregarCita = () => {
    if (!selectedDate || !selectedTime || !motivo || !alumno || !numeroControl || !carrera) {
      Alert.alert('Error', 'Por favor complete todos los campos requeridos');
      return;
    }

    const nuevaCita: Cita = {
      id: Math.random().toString(36).substring(7),
      alumno,
      numeroControl,
      carrera,
      fecha: selectedDate,
      hora: selectedTime,
      motivo,
      estado: 'pendiente',
    };

    setCitas([...citas, nuevaCita]);
    setModalVisible(false);
    setSelectedDate('');
    setSelectedTime('');
    setMotivo('');
    setAlumno('');
    setNumeroControl('');
    setCarrera('');
    Alert.alert('Éxito', 'Nueva cita agregada correctamente');
  };

  // Componente de tarjeta de cita
  const CitaCard = ({ cita }: { cita: Cita }) => (
    <View style={[
      styles.card,
      cita.estado === 'pendiente' && styles.cardPendiente,
      cita.estado === 'confirmada' && styles.cardConfirmada,
      cita.estado === 'realizada' && styles.cardRealizada,
      cita.estado === 'cancelada' && styles.cardCancelada,
    ]}>
      <Text style={styles.cardTitle}>{cita.alumno}</Text>
      <Text style={styles.cardText}>No. Control: {cita.numeroControl}</Text>
      <Text style={styles.cardText}>Carrera: {cita.carrera}</Text>
      <Text style={styles.cardText}>Fecha: {cita.fecha} - {cita.hora}</Text>
      <Text style={styles.cardText}>Motivo: {cita.motivo}</Text>
      <Text style={[
        styles.cardStatus,
        cita.estado === 'pendiente' && styles.statusPendiente,
        cita.estado === 'confirmada' && styles.statusConfirmada,
        cita.estado === 'realizada' && styles.statusRealizada,
        cita.estado === 'cancelada' && styles.statusCancelada,
      ]}>
        Estado: {cita.estado.toUpperCase()}
      </Text>

      <View style={styles.buttonsContainer}>
        {cita.estado === 'pendiente' && (
          <>
            <TouchableOpacity 
              style={[styles.button, styles.confirmButton]}
              onPress={() => confirmarCita(cita.id)}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]}
              onPress={() => cancelarCita(cita.id)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </>
        )}
        
        {cita.estado === 'confirmada' && (
          <>
            <TouchableOpacity 
              style={[styles.button, styles.completeButton]}
              onPress={() => marcarRealizada(cita.id)}
            >
              <Text style={styles.buttonText}>Realizada</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header con botón de perfil */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Citas Programadas</Text>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => setShowProfile(true)}
        >
          <Text style={styles.profileButtonText}>Perfil Maestro</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de citas */}
      <FlatList
        data={citas}
        renderItem={({ item }) => <CitaCard cita={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay citas programadas</Text>
        }
      />

      {/* Botón para agregar nueva cita */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Agregar Nueva Cita</Text>
      </TouchableOpacity>

      {/* Modal para agregar nueva cita */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agendar Nueva Cita</Text>
            
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3132/3132693.png' }}
              style={styles.image}
            />

            <Text style={styles.label}>Nombre del alumno:</Text>
            <TextInput
              placeholder="Nombre completo"
              value={alumno}
              onChangeText={setAlumno}
              style={styles.input}
            />

            <Text style={styles.label}>Número de control:</Text>
            <TextInput
              placeholder="Número de control"
              value={numeroControl}
              onChangeText={setNumeroControl}
              style={styles.input}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Carrera:</Text>
            <TextInput
              placeholder="Carrera"
              value={carrera}
              onChangeText={setCarrera}
              style={styles.input}
            />

            <Text style={styles.label}>Fecha de la cita:</Text>
            <Calendar
              onDayPress={(day: { dateString: React.SetStateAction<string>; }) => setSelectedDate(day.dateString)}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: '#B8DFD8' },
              }}
              style={styles.calendar}
              theme={{
                selectedDayBackgroundColor: '#B8DFD8',
                todayTextColor: '#3A6351',
                arrowColor: '#3A6351',
              }}
            />

            <View style={{ marginTop: 20, marginBottom: 15 }}>
              <Text style={styles.selectedDateText}>
                {selectedDate ? `Fecha seleccionada: ${selectedDate}` : 'Selecciona una fecha'}
              </Text>
            </View>

            <Text style={styles.label}>Hora de la cita:</Text>
            <Picker
              selectedValue={selectedTime}
              onValueChange={(itemValue) => setSelectedTime(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecciona una hora" value="" />
              <Picker.Item label="09:00 - 10:00" value="09:00 - 10:00" />
              <Picker.Item label="10:00 - 11:00" value="10:00 - 11:00" />
              <Picker.Item label="11:00 - 12:00" value="11:00 - 12:00" />
              <Picker.Item label="12:00 - 13:00" value="12:00 - 13:00" />
              <Picker.Item label="13:00 - 14:00" value="13:00 - 14:00" />
              <Picker.Item label="14:00 - 15:00" value="14:00 - 15:00" />
              <Picker.Item label="15:00 - 16:00" value="15:00 - 16:00" />
              <Picker.Item label="16:00 - 17:00" value="16:00 - 17:00" />
            </Picker>

            <Text style={styles.selectedTimeText}>
              {selectedTime ? `Hora seleccionada: ${selectedTime}` : 'Selecciona una hora'}
            </Text>

            <Text style={styles.label}>Motivo de la cita:</Text>
            <TextInput
              placeholder="Escribe el motivo de la cita"
              value={motivo}
              onChangeText={setMotivo}
              style={[styles.input, styles.multilineInput]}
              multiline
              numberOfLines={4}
            />
            
            <View style={styles.modalButtons}>
              <Pressable 
                style={[styles.modalButton, styles.cancelModalButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </Pressable>
              
              <Pressable 
                style={[styles.modalButton, styles.addModalButton]}
                onPress={agregarCita}
              >
                <Text style={styles.modalButtonText}>Agregar</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Modal de perfil del maestro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showProfile}
        onRequestClose={() => setShowProfile(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Perfil del Maestro</Text>
            
            <View style={styles.profileInfo}>
              <Text style={styles.profileText}>Nombre: {maestroData.nombre}</Text>
              <Text style={styles.profileText}>Especialidad: {maestroData.especialidad}</Text>
              <Text style={styles.profileText}>Correo: {maestroData.correo}</Text>
              <Text style={styles.profileText}>Teléfono: {maestroData.telefono}</Text>
            </View>
            
            <TouchableOpacity 
              style={[styles.modalButton, styles.closeModalButton]}
              onPress={() => setShowProfile(false)}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#B8DFD8',
    borderBottomWidth: 1,
    borderBottomColor: '#7CBCB5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3A6351',
  },
  profileButton: {
    backgroundColor: '#3A6351',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  profileButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardPendiente: {
    borderLeftWidth: 5,
    borderLeftColor: '#FFD3B6',
  },
  cardConfirmada: {
    borderLeftWidth: 5,
    borderLeftColor: '#A2D2FF',
  },
  cardRealizada: {
    borderLeftWidth: 5,
    borderLeftColor: '#CAFFBF',
  },
  cardCancelada: {
    borderLeftWidth: 5,
    borderLeftColor: '#FFADAD',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#3A6351',
  },
  cardText: {
    fontSize: 14,
    marginBottom: 3,
    color: '#3A6351',
  },
  cardStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10,
  },
  statusPendiente: {
    color: '#FF9A76',
  },
  statusConfirmada: {
    color: '#7FB3D5',
  },
  statusRealizada: {
    color: '#88C9A1',
  },
  statusCancelada: {
    color: '#FF6B6B',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  confirmButton: {
    backgroundColor: '#7FB3D5',
  },
  cancelButton: {
    backgroundColor: '#FF6B6B',
  },
  completeButton: {
    backgroundColor: '#88C9A1',
  },
  addButton: {
    backgroundColor: '#B8DFD8',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: '#3A6351',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#3A6351',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    borderRadius: 10,
    padding: 20,
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#3A6351',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderColor: '#B8DFD8',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  addModalButton: {
    backgroundColor: '#88C9A1',
  },
  cancelModalButton: {
    backgroundColor: '#FF6B6B',
  },
  closeModalButton: {
    backgroundColor: '#3A6351',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  profileInfo: {
    marginBottom: 20,
  },
  profileText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#3A6351',
  },
  image: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    color: '#3A6351',
    marginBottom: 5,
  },
  calendar: {
    borderRadius: 10,
    marginBottom: 5,
    height: 350,
  },
  selectedDateText: {
    fontSize: 16,
    color: '#3A6351',
    textAlign: 'center',
  },
  selectedTimeText: {
    fontSize: 14,
    color: '#3A6351',
    textAlign: 'center',
    marginBottom: 15,
  },
  picker: {
    height: Platform.OS === 'ios' ? 160 : 50,
    width: '100%',
    marginBottom: 10,
  },
  dateAndMotivoBox: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
});

export default VistaMaestroScreen;