import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
export const GestionContext = createContext()


// eslint-disable-next-line react/prop-types
export const GestionProvider = ({ children }) => {
  const {auth, setLoading} = useContext(AuthContext)
  const host = import.meta.env.VITE_HOST

  const listarSectores = async () => {
    try {
      const response = await axios.get(`https://${host}/getSectores`, {
        headers: {
          Authorization: `Bearer ${auth}`,
          'ngrok-skip-browser-warning': 'true',
        },
      });
      return response.data;  // Retornamos los datos directamente
    } catch (error) {
      console.error(error);
      return [];  // En caso de error, devolvemos un array vacío
    }
  };

  return (
    <GestionContext.Provider value={{listarSectores }}>
      { children}
    </GestionContext.Provider>
  )
}
