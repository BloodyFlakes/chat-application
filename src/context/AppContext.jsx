import { doc, getDoc } from 'firebase/firestore';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';

export const AppContext = createContext(undefined);

const AppContextProvider = (props) => {
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);

  const navigate = useNavigate();

  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      setUserData(userData);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
