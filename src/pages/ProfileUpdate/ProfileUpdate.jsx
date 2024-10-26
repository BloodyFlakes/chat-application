import { useContext, useEffect, useState } from 'react';
import assets from '../../assets/assets';
import './ProfileUpdate.css';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import upload from '../../lib/upload';
import { AppContext } from '../../context/AppContext';

function ProfileUpdate() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [uid, setUid] = useState('');
  const [prevImage, setPrevImage] = useState('');

  const { setUserData } = useContext(AppContext);

  const navigate = useNavigate();

  const profileUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!prevImage && !image) {
        toast.error('Upload profile picture');
      }

      const docRef = doc(db, 'users', uid);
      if (image) {
        const imgUrl = await upload(image);
        setPrevImage(imgUrl);
        await updateDoc(docRef, {
          avatar: imgUrl,
          bio: bio,
          name: name,
        });
      } else {
        await updateDoc(docRef, {
          bio: bio,
          name: name,
        });
      }
      const snap = await getDoc(docRef);
      setUserData(snap.data());
      navigate('/chat');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.data().name) {
          setName(docSnap.data().name);
        }
        if (docSnap.data().bio) {
          setBio(docSnap.data().bio);
        }
        if (docSnap.data().avatar) {
          setPrevImage(docSnap.data().avatar);
        }
      } else {
        navigate('/');
      }
    });
  }, []);

  return (
    <div className='profile'>
      <div className='profile-container'>
        <form onSubmit={profileUpdate}>
          <h3>Profile Details</h3>
          <label htmlFor='avatar'>
            <input
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
              type='file'
              id='avatar'
              accept='.png,.jpg,.jpeg'
              hidden
            />
            <img
              src={image ? URL.createObjectURL(image) : assets.avatar_icon}
              alt='avatar-icon'
            />
            upload profile image
          </label>
          <input
            required
            type='text'
            value={name}
            placeholder='Your name'
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            required
            value={bio}
            placeholder='Write profile bio'
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
          <button type='submit'>Save</button>
        </form>

        <img
          src={
            image
              ? URL.createObjectURL(image)
              : prevImage
              ? prevImage
              : assets.logo_icon
          }
          alt='logo-icon'
          className='profile-pic'
        />
      </div>
    </div>
  );
}

export default ProfileUpdate;
