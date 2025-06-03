import { StyleSheet, Text, View, TextInput, Pressable, Image, ScrollView, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SetStateAction, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useCitas } from '../screens/citascontexto';

export default function CitasMaestroScreen() {
  const navigation = useNavigation();
  const { agregarCitaMaestro } = useCitas();
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [motivo, setMotivo] = useState('');
  const [alumno, setAlumno] = useState('');
  const [numeroControl, setNumeroControl] = useState('');
  const [carrera, setCarrera] = useState('');
  const [maestro, setMaestro] = useState('');

  const handleAgendar = () => {
    if (!selectedDate || !selectedTime || !motivo || !alumno || !numeroControl || !carrera || !maestro) {
      alert('Por favor completa todos los campos.');
      return;
    }
    
    agregarCitaMaestro({
      alumno,
      numeroControl,
      carrera,
      maestro,
      fecha: selectedDate,
      hora: selectedTime,
      motivo,
    });
    
    alert(`Cita agendada con ${maestro} para el ${selectedDate} a las ${selectedTime}`);
    
    // Limpiar campos
    setSelectedDate('');
    setSelectedTime('');
    setMotivo('');
    setAlumno('');
    setNumeroControl('');
    setCarrera('');
    setMaestro('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Agenda tu cita con el maestro</Text>
      <Text style={styles.subText}>"Resuelve tus dudas académicas con nuestros expertos"</Text>

      <Image 
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3132/3132693.png' }}
        style={styles.image}
      />

      <View style={styles.dateAndMotivoBox}>
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

        <Text style={styles.label}>Maestro:</Text>
        <Picker
          selectedValue={maestro}
          onValueChange={(itemValue) => setMaestro(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona un maestro" value="" />
          <Picker.Item label="Ing. David Saenz - Desarrollo Web" value="Ing. David Saenz" />
          <Picker.Item label="Dra. María López - Bases de Datos" value="Dra. María López" />
          <Picker.Item label="Mtro. Carlos Sánchez - Programación" value="Mtro. Carlos Sánchez" />
          <Picker.Item label="Ing. Laura Martínez - Redes" value="Ing. Laura Martínez" />
        </Picker>

        <Text style={styles.label}>Fecha de la cita:</Text>
        <Calendar
          onDayPress={(day: { dateString: SetStateAction<string> }) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#3A6351' },
          }}
          style={styles.calendar}
          theme={{
            selectedDayBackgroundColor: '#3A6351',
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
          placeholder="Describe el motivo de tu cita (dudas, asesoría, proyecto, etc.)"
          value={motivo}
          onChangeText={setMotivo}
          style={[styles.input, styles.multilineInput]}
          multiline
          numberOfLines={4}
        />
      </View>

      <Pressable style={styles.button} onPress={handleAgendar}>
        <Text style={styles.buttonText}>Guardar Cita</Text>
      </Pressable>

      <Pressable 
        style={[styles.button, styles.psicoButton]} 
        onPress={() => navigation.navigate('CitasPsicologicas')}
      >
        <Text style={styles.buttonText}>Cita Psicológica</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7F0',
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3A6351',
    textAlign: 'center',
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: '#3A6351',
    textAlign: 'center',
    marginBottom: 15,
    fontStyle: 'italic'
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
    height: 250,
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
  input: {
    borderColor: '#3A6351',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    minHeight: 40,
    backgroundColor: 'white',
    marginBottom: 15,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#81C784',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: 160,
    alignSelf: 'center',
    marginBottom: 15,
  },
  psicoButton: {
    backgroundColor: '#f06292',
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold', 
  },
  dateAndMotivoBox: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  picker: {
    height: Platform.OS === 'ios' ? 160 : 50,
    width: '100%',
    marginBottom: 10,
  },
});