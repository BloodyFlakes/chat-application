import { useState } from "react";
import assets from "../../assets/assets";
import "./ProfileUpdate.css";

type AssetsType = {
  avatar_icon: string;
  logo_icon: string;
};

function ProfileUpdate() {
  const [image, setImage] = useState<File | null>(null);

  return (
    <div className="profile">
      <div className="profile-container">
        <form>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
              type="file"
              id="avatar"
              accept=".png,.jpg,.jpeg"
              hidden
            />
            <img
              src={image ? URL.createObjectURL(image) : (assets as AssetsType).avatar_icon}
              alt="avatar-icon"
            />
            upload profile image
          </label>
          <input type="text" placeholder="Your name" required />
          <textarea placeholder="Write profile bio" required></textarea>
          <button type="submit">Save</button>
        </form>

        <img
          src={image ? URL.createObjectURL(image) : (assets as AssetsType).logo_icon}
          alt="logo-icon"
          className="profile-pic"
        />
      </div>
    </div>
  );
}

export default ProfileUpdate;
