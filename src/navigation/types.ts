//types.ts

import { RouteProp } from '@react-navigation/native';

type Materia = {
    id: string;
    name: string;
    image: number | { uri: string };
    semestre: string;
    profesores: string[];
  };


export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    CitasPsicologicas: undefined;
    Asesorias: undefined;
    Alumnos: undefined;
    Redireccion:undefined;
    VistaPsicologo:undefined;
    Profesores: { materia: Materia };
    VistaMaestro:undefined;
    CitaMaestro:undefined;
    //Materias
    CalculoDiferencial: undefined;
    FundamentosDeProgramacion: undefined;
    TallerDeEtica: undefined;
    MatesDiscretas: undefined;
    FundamentosDeInvestigacion: undefined;
    TallerDeAdmin: undefined;
    CalculoIntegral: undefined;
    Poo: undefined;
    ContabilidadFinanciera: undefined;
    Quimica: undefined;
    DesarrolloSustentable: undefined,
    Probabilidad: undefined;
    CalculoVectorial: undefined,
    EstructuraDeDatos: undefined,
    CulturaEmpresarial: undefined;
    AlgebraLineal: undefined;
    SistemasOperativos: undefined;
    Fisica: undefined;

  };

  //Esto es para la vista de profesores
  export type ProfesoresScreenRouteProp = RouteProp<RootStackParamList, 'Profesores'>;
  
  // Esto es para tener acceso al tipado en cualquier parte de la app
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
    
  }