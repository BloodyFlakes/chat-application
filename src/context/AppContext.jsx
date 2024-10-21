import PropTypes from 'prop-types';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { createContext, useState } from 'react';
import { auth, db } from '../config/firebase';
import { useNavigate } from 'react-router';

export const AppContext = createContext(undefined);

import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

const AppContextProvider = (props) => {
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndLoadUserData = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          loadUserData(user.uid);
        } else {
          console.log('User is not authenticated');
          navigate('/login'); // Redirect to login if not authenticated
        }
      });
    };

    checkAuthAndLoadUserData();
  }, []);

  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setUserData(userData);
        console.log(userData);
        if (userData.avatar && userData.name) {
          navigate('/chat');
        } else {
          navigate('/profile');
        }

        await updateDoc(userRef, {
          lastSeen: Date.now(),
        });

        setInterval(async () => {
          if (auth.currentUser) {
            await updateDoc(userRef, {
              lastSeen: Date.now(),
            });
          }
        }, 60000);
      } else {
        console.log('No user data found');
      }
    } catch (error) {
      console.log(error);
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

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
