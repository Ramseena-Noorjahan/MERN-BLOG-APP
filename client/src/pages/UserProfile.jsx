import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { UserContext } from "../context/userContext";
import axios from "axios";

const UserProfile = () => {
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmNewPassword, setconNewfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [isAvatarTouched, setIsAvatarTouched] = useState(false);

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      const { name, email, avatar } = response?.data;
      setName(name);
      setEmail(email);
      setAvatar(avatar);
    };
    getUser();
  }, []);

  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false);
    try {
      const postData = new FormData();
      postData.set("avatar", avatar);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/change-Avatar`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      setAvatar(response?.data?.avatar);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserDetail = async (e) => {
    e.preventDefault();
    try {
      console.log("reached");
      const userData = new FormData();
      userData.set("name", name);
      userData.set("email", email);
      userData.set("currentPassword", currentPassword);
      userData.set("newPassword", newPassword);
      userData.set("confirmNewPassword", confirmNewPassword);

      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/edit-user`,
        userData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response?.status == 200) {
        navigate("/logout");
      }
    } catch (error) {
      setError(error?.response?.data?.message)
      console.log(error);
    }
  };

  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/${currentUser?.id}`} className="btn">
          my profile
        </Link>
        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img
                src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                alt="avatar"
              />
            </div>
            <form className="avatar__form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
                accept="png, jpg, jpeg"
              />
              <label
                htmlFor="avatar"
                style={{ cursor: "pointer" }}
                onClick={() => setIsAvatarTouched(true)}
              >
                <FaEdit />
              </label>
            </form>
            {isAvatarTouched && (
              <button
                className="profile__avatr-btn"
                onClick={changeAvatarHandler}
              >
                <FaCheck />
              </button>
            )}
          </div>
          <h1>{currentUser?.name}</h1>
          {/* form to update user details */}
          <form
            action=""
            className="form profile__form"
            onSubmit={updateUserDetail}
          >
            {error && <p className="form_error-message">{error}</p>}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password "
              placeholder="currentPassword"
              value={currentPassword}
              onChange={(e) => setcurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="newPassword"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setconNewfirmPassword(e.target.value)}
            />
            <button type="submit" className="btn primary">
              Update Details
            </button>
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
