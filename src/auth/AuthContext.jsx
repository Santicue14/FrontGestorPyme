import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
export const AuthContext = createContext()


// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const host = import.meta.env.VITE_HOST
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setAuth(token)
      getUserData(token);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const getUserData = async (auth) => {
    try {
      setLoading(true)
      const response = await axios.get(`https://${host}/getUserData`, {
        headers: {
          Authorization: `Bearer ${auth}`,
          'ngrok-skip-browser-warning': 'true',
        },
      });
      setUser(response.data);
    } catch (error) {
      setUser(null);
      Cookies.remove("token");
      return error
    } finally {
      setLoading(false)
    }
  };
  const login = async (mail, password) => {
    setLoading(true)
    try {
      const response = await axios.post(`https://${host}/login`, { mail, password })
        .then((response) => {
          console.log(response);
          if (response.data) {
            const { token } = response.data
            Cookies.set('token', token, { expires: 7 })
            setAuth(token)
            getUserData(token)
          }
        })
        .catch(
          (error) => {
            const msg = error.message == "Network Error" ? 'Hay problemas con el servidor' : 'Ocurrió un error'
            return msg
          }
        )
      return response
    } catch (error) {
      console.error(error)
      return error
    }
    finally {
      setLoading(false)
    }
  }
  const logOut = () => {
    Cookies.remove('token')
    setAuth(null)
    setUser(null)
  }
  const updateUser = async (nombre, apellido, dni, mail, telefono) => {
    setLoading(true)
    try {
      const response = await axios.post(`https://${host}/perfil/actualizar`, {
        nombre, apellido, dni, mail, telefono
      }, {
        headers: {
          Authorization: `Bearer ${auth}`,
          'ngrok-skip-browser-warning': 'true',
        },
      })
      setUser(response.data.user)
      return response.data
    } catch (error) {
      console.error(error)
      return { success: false, message: 'Error al actualizar' } // Return an error response
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{
      auth, user, login, logOut, getUserData,
      updateUser, loading, setLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}
