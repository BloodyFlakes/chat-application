import assets from '../../assets/assets';
import { logout } from '../../config/firebase';
import './RightSidebar.css';

function RightSidebar() {
  return (
    <div className='rs'>
      <div className='rs-profile'>
        <img src={assets.profile_img} alt='profile-img' />
        <h3>
          Rashed Almasri{' '}
          <img src={assets.green_dot} alt='green-dot' className='dot' />
        </h3>
        <p>Hey, There is Rashed using this app</p>
      </div>
      <hr />
      <div className='rs-media'>
        <p>Media</p>
        <div>
          <img src={assets.pic1} alt='pic1' />
          <img src={assets.pic2} alt='pic2' />
          <img src={assets.pic3} alt='pic3' />
          <img src={assets.pic4} alt='pic4' />
          <img src={assets.pic1} alt='pic5' />
          <img src={assets.pic2} alt='pic6' />
        </div>
      </div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default RightSidebar;
