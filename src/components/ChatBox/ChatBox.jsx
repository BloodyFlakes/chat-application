import assets from '../../assets/assets';
import './ChatBox.css';

function ChatBox() {
  return (
    <div className='chat-box'>
      <div className='chat-user'>
        <img src={assets.profile_img} alt='profile-img' />
        <p>
          Rashed Almasri
          <img className='dot' src={assets.green_dot} alt='green-dot' />
        </p>
        <img src={assets.help_icon} alt='help-icon' />
      </div>

      <div className='chat-msg'>
        <div className='s-msg'>
          <p className='msg'>
            Lorem ipsum is placeholder text commonly used in ..
          </p>
          <div>
            <img src={assets.profile_img} alt='profile-img' />
            <p>2:30 PM</p>
          </div>
        </div>
        <div className='s-msg'>
          <img src={assets.pic1} alt='pic1' className='msg-img' />
          <div>
            <img src={assets.profile_img} alt='profile-img' />
            <p>2:30 PM</p>
          </div>
        </div>

        <div className='r-msg'>
          <p className='msg'>
            Lorem ipsum is placeholder text commonly used in ..
          </p>
          <div>
            <img src={assets.profile_img} alt='profile-img' />
            <p>2:30 PM</p>
          </div>
        </div>
      </div>

      <div className='chat-input'>
        <input type='text' placeholder='Send a message' />
        <input type='file' id='image' accept='image/png, image/jpeg' hidden />
        <label htmlFor='image'>
          <img src={assets.gallery_icon} alt='gallery-icon' />
        </label>
        <img src={assets.send_button} alt='send-button' />
      </div>
    </div>
  );
}

export default ChatBox;
