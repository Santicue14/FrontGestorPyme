import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
export const GestionContext = createContext()


// eslint-disable-next-line react/prop-types
export const GestionProvider = ({ children }) => {
  const { auth, setLoading } = useContext(AuthContext)
  const host = import.meta.env.VITE_HOST


  const getUsers = async () => {
    try {
      const response = await axios.get(`https://${host}/getAllUser`, {
        headers: {
          Authorization: `Bearer ${auth}`,
          'ngrok-skip-browser-warning': 'true',
        },
      })
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

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


  const createSector = async (data) => {
    try {
      const response = await axios.post(`https://${host}/crearSector`, { data }, {
        headers: {
          Authorization: `Bearer ${auth}`,
          'ngrok-skip-browser-warning': 'true',
        },
      })
      console.log(response.data);
      return response.data
    } catch (error) {
      console.error(error)
      alert(error.data.message)
    }

  }
  const updateSector = async (data) => {
    try {
      const response = await axios.post(`https://${host}/updateSectorSupervisor`, { data }, {
        headers: {
          Authorization: `Bearer ${auth}`,
          'ngrok-skip-browser-warning': 'true',
        },
      })
      console.log(response);
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return (
    <GestionContext.Provider value={{ getUsers, listarSectores, createSector, updateSector }}>
      {children}
    </GestionContext.Provider>
  )
}
