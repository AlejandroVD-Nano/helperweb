import React, { createContext, useState, useContext, ReactNode } from 'react';

type CitaBase = {
  id: string;
  alumno: string;
  numeroControl: string;
  carrera: string;
  fecha: string;
  hora: string;
  motivo: string;
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'realizada';
};

type CitaMaestro = CitaBase & {
  tipo: 'maestro';
  maestro: string;
};

type CitaPsicologica = CitaBase & {
  tipo: 'psicologica';
};

export type Cita = CitaMaestro | CitaPsicologica;

type CitasContextType = {
  citas: Cita[];
  agregarCitaMaestro: (cita: Omit<CitaMaestro, 'id' | 'estado' | 'tipo'>) => void;
  agregarCitaPsicologica: (cita: Omit<CitaPsicologica, 'id' | 'estado' | 'tipo'>) => void;
  confirmarCita: (id: string) => void;
  cancelarCita: (id: string) => void;
  marcarRealizada: (id: string) => void;
};

const CitasContext = createContext<CitasContextType>({
  citas: [],
  agregarCitaMaestro: () => {},
  agregarCitaPsicologica: () => {},
  confirmarCita: () => {},
  cancelarCita: () => {},
  marcarRealizada: () => {},
});

export const CitasProvider = ({ children }: { children: ReactNode }) => {
  const [citas, setCitas] = useState<Cita[]>([]);

  const agregarCitaMaestro = (cita: Omit<CitaMaestro, 'id' | 'estado' | 'tipo'>) => {
    const nuevaCita: CitaMaestro = {
      ...cita,
      id: Math.random().toString(36).substring(7),
      estado: 'pendiente',
      tipo: 'maestro',
    };
    setCitas(prev => [...prev, nuevaCita]);
  };

  const agregarCitaPsicologica = (cita: Omit<CitaPsicologica, 'id' | 'estado' | 'tipo'>) => {
    const nuevaCita: CitaPsicologica = {
      ...cita,
      id: Math.random().toString(36).substring(7),
      estado: 'pendiente',
      tipo: 'psicologica',
    };
    setCitas(prev => [...prev, nuevaCita]);
  };

  const confirmarCita = (id: string) => {
    setCitas(prev => prev.map(c => c.id === id ? {...c, estado: 'confirmada'} : c));
  };

  const cancelarCita = (id: string) => {
    setCitas(prev => prev.map(c => c.id === id ? {...c, estado: 'cancelada'} : c));
  };

  const marcarRealizada = (id: string) => {
    setCitas(prev => prev.map(c => c.id === id ? {...c, estado: 'realizada'} : c));
  };

  return (
    <CitasContext.Provider 
      value={{ 
        citas, 
        agregarCitaMaestro, 
        agregarCitaPsicologica,
        confirmarCita,
        cancelarCita,
        marcarRealizada
      }}
    >
      {children}
    </CitasContext.Provider>
  );
}; 

export const useCitas = () => useContext(CitasContext);