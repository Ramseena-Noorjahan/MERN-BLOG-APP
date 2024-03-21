import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../Images/avatar15.jpg";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
const UserProfile = () => {
  const [avatar,setAvatar] = useState(Avatar)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [currentPassword,setcurrentPassword] = useState('')
  const [newPassword,setnewPassword] = useState('')
  const [confirmNewPassword,setconNewfirmPassword] = useState('')
  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/sdfsdf`} className="btn">my profile</Link>
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={Avatar} alt="" />
            </div>
            <form className="avatar__form">
            <input type="file" name="avatar" id="avatar" onChange={e =>setAvatar(e.target.files[0])} 
            accept="png, jpg, jpeg" />
            <label htmlFor="avatar"><FaEdit /></label>
            </form> 
            <button className="profile__avatr-btn"><FaCheck /></button>
          </div>
          <h1>ErnestAchiever</h1>
          {/* form to update user details */}
          <form action="" className="form profile__form">
            <p className="form_error-message">
              This is an error message
            </p>
            <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
            <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="text" placeholder="currentPassword" value={currentPassword} onChange={e => setcurrentPassword(e.target.value)} />
            <input type="text" placeholder="newPassword" value={newPassword} onChange={e => setnewPassword(e.target.value)} />
            <input type="text" placeholder="confirmNewPassword" value={confirmNewPassword} onChange={e => setconNewfirmPassword(e.target.value)} />
            <button type="submit" className="btn-primary">Update Details</button>
            {/* <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="text" placeholder="currentPassword" value={currentPassword} onChange={e => setcurrentPassword(e.target.value)} />
            <input type="text" placeholder="newPassword" value={newPassword} onChange={e => setnewPassword(e.target.value)} />
            <input type="text" placeholder="confirmNewPassword" value={confirmNewPassword} onChange={e => setconNewfirmPassword(e.target.value)} />
           <button type="submit"  className="btn-primary">Update details</button> */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
