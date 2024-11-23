import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = await AsyncStorage.getItem("userdetails");
        const token = await AsyncStorage.getItem("token");
        if (user || token) {
          setUser(JSON.parse(user));
          setIsLogged(true);
        }else{
            setIsLogged(false);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    loadUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userdetails");
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("pushToken");
      setIsLogged(false);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  const handleLogin = async (user, token) => {
    try {
      await AsyncStorage.setItem("userdetails", JSON.stringify(user));
      await AsyncStorage.setItem("token", token);
      setIsLogged(true);
      setUser(user);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        handleLogout,
        handleLogin
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
