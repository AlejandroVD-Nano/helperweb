//types.ts
export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    CitasPsicologicas: undefined; //rura para la pagina de agregar citas
    // Puedes agregar más rutas aquí según necesites
  };
  
  // Esto es para tener acceso al tipado en cualquier parte de la app
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }