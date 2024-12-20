import { useNavigate } from 'react-router';
import assets from '../../assets/assets';
import './LeftSidebar.css';
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

function LeftSidebar() {
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();
  const { userData, chatData } = useContext(AppContext);

  const inputHandler = async (e) => {
    try {
      const input = e.target.value;
      if (input) {
        setShowSearch(true);
        const userRef = collection(db, 'users');
        const q = query(userRef, where('username', '==', input.toLowerCase()));
        const querySnap = await getDocs(q);
        if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
          let userExist = false;
          chatData.map((user) => {
            if (user.rId === querySnap.docs[0].data().id) {
              userExist = true;
            }
          });
          if (!userExist) {
            setUser(querySnap.docs[0].data());
          }
        } else {
          setUser(null);
        }
      } else {
        setShowSearch(false);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const addChat = async () => {
    const messagesRef = collection(db, 'messages');
    const chatsRef = collection(db, 'chats');
    try {
      const newMessageRef = doc(messagesRef);
      await setDoc(newMessageRef, {
        createAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(chatsRef, user.id), {
        chatsData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: '',
          rId: userData.id,
          updateAt: Date.now(),
          messageSeen: true,
        }),
      });

      await updateDoc(doc(chatsRef, userData.id), {
        chatsData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: '',
          rId: user.id,
          updateAt: Date.now(),
          messageSeen: true,
        }),
      });
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const setChat = async (item) => {
    console.log(item);
  };

  return (
    <div>
      <div className='ls'>
        <div className='ls-top'>
          <div className='ls-nav'>
            <img src={assets.logo} alt='logo' className='logo' />
            <div className='menu'>
              <img src={assets.menu_icon} alt='menu-icon' />
              <div className='sub-menu'>
                <p onClick={() => navigate('/profile')}>Edit Profile</p>
                <hr />
                <p>Logout</p>
              </div>
            </div>
          </div>
          <div className='ls-search'>
            <img src={assets.search_icon} alt='search-icon' />
            <input
              type='text'
              onChange={inputHandler}
              placeholder='Search here..'
            />
          </div>
        </div>

        <div className='ls-list'>
          {showSearch && user ? (
            <div onClick={addChat} className='friends add-user'>
              <img src={user.avatar} alt='avatar' />
              <p>{user.name}</p>
            </div>
          ) : (
            chatData.map((item, index) => (
              <div
                key={index}
                className='friends'
                onClick={() => setChat(item)}
              >
                <img src={item.userData.avatar} alt='profile-img' />
                <div>
                  <p>{item.userData.name}</p>
                  <span>{item.lastMessage}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;
