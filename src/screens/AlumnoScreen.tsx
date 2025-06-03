import { Calendar } from 'react-native-calendars';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, ImageBackground } from 'react-native';
import { SetStateAction, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';


export default function AlumnoScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');

  const activitiesByDate: { [key: string]: string[] } = {
    '2025-05-13': ['Asesoría de matemáticas', 'Cita psicológica 10:00 AM'],
    '2025-05-15': ['Taller de habilidades blandas'],
    '2025-05-18': ['Evaluación vocacional'],
  };

  const activities = activitiesByDate[selectedDate] || [];

  return (
    <View style={styles.container}>
      
      <View style={styles.calendarWrapper}>
        <View style={{  alignItems: 'center'}}>
          <Calendar
            style={styles.calendario}
            onDayPress={(day: { dateString: SetStateAction<string>; }) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: '#003845',
              },
            }}
          />
        </View>
      </View>

      <View style={styles.activitiesWrapper}>
        {activities.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Actividades para {selectedDate}:</Text>
            {activities.map((item, index) => (
              <Text key={index} style={styles.activityItem}>• {item}</Text>
            ))}
          </>
        ) : selectedDate ? (
          <Text style={styles.sectionTitle}>No hay actividades para {selectedDate}.</Text>
        ) : (
          <Text style={styles.sectionTitle}>Selecciona una fecha para ver actividades.</Text>
        )}
      </View>

      <View style={styles.buttonsWrapper}>
  <Pressable style={styles.button} onPress={() => navigation.navigate('Asesorias')}>
    <Text style={styles.buttonText}>Asesorías</Text>
  </Pressable>
  <Pressable style={styles.button} onPress={() => navigation.navigate('CitasPsicologicas')}>
    <Text style={styles.buttonText}>Cita Psicológica</Text>
  </Pressable> 
  <Pressable style={styles.button} onPress={()=> navigation.navigate('CitaMaestro')} >
    <Text style={styles.buttonText}>Cita asesoria</Text>
  </Pressable>
</View>

    </View>
  );
}




const styles = StyleSheet.create({
  calendario:{
     width: '200%',
       borderRadius: 10,  
       shadowColor: '#003845',
       shadowRadius: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#8FB4D5',
    justifyContent: 'space-between',
    paddingVertical: 20,
    
  },
  calendarWrapper: {
    alignItems: 'center',
     width: '85%',
  

  },
  activitiesWrapper: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
   
  },
  activityItem: {
    fontSize: 15,
    marginBottom: 4,
   
  },
  buttonsWrapper: {
    padding: 20,
    gap: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center', // Espacio entre los botones
     
  },
  button: {
    backgroundColor: '#00A4BF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});


