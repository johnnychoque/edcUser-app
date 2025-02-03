/*
La función "checkAndSetAuth" verifica si hay un parámetro data 
en la URL que contiene información del usuario. 
Este parámetro se espera que sea añadido por el backend después
de una autenticación exitosa.
Si el parámetro data está presente, se asume que la autenticación 
fue exitosa, y se actualiza el estado de autenticación en el 
store de Zustand.
Después de procesar los datos, la función limpia la URL para 
evitar que los datos sensibles permanezcan visibles.
*/

import { create } from 'zustand';
import config from '../config.js'

export const useAuthStore = create((set, get) => ({
  isAuthenticated: false,
  isProvider: false,
  userData: null,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setUserData: (data) => set({ userData: data }),
  checkAndSetAuth: () => {
    const queryParams = new URLSearchParams(window.location.search);
    const data = queryParams.get('data');
    if (data) {
      const parsedData = JSON.parse(decodeURIComponent(data));
      const isProvider = parsedData.username === config.provider.user;
      set({ 
        isAuthenticated: true, 
        userData: parsedData,
        isProvider: isProvider
      });
      // Limpiar la URL
      window.history.replaceState({}, document.title, window.location.pathname);
      return true;
    }
    return false;
  },
  logout: () => set({ isAuthenticated: false, userData: null })
}));
