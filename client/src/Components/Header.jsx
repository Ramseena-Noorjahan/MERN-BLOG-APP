import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/blog14.jpg";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
//start
const Header = () => {
  const [isNavShowing,setIsNavShowing] = useState(window.innerWidth > 800 ? true:false )
  const closeNavHandler  =()=>{
    if(window.innerHeight <800){
      setIsNavShowing(false)
    }else{
      setIsNavShowing(true)
    }
  }
  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo" onClick={closeNavHandler}>
          <img src={Logo} alt="navbar"></img>
        </Link>

      {isNavShowing && <ul className="nav__menu">
            <li>
              <Link to="/profile/sdfsdf" onClick={closeNavHandler}> ErnestAchiever</Link>
            </li>
            <li>
              <Link to="/create" onClick={closeNavHandler}> CreatePost</Link>
            </li>
            <li>
              <Link to="/authors" onClick={closeNavHandler}> Authors</Link>
            </li>
            <li>
              <Link to="/logout" onClick={closeNavHandler}>Logout</Link>
            </li>
            
          </ul>}    
          <button className="nav__toggle-btn " onClick={()=>{
            setIsNavShowing(!isNavShowing)
          }}>
            
              {isNavShowing ?   <AiOutlineClose/> :<FaBars/> }
            </button>
      </div>
    </nav>
  );
};
//stop

export default Header;
