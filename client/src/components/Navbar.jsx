import React from "react";
import Logo from "../img/blogLogo.png"; //import then link in
import { Link } from "react-router-dom";
//containers make for easier styling
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo"></img>
          </Link>
        </div>
        <div className="links">
          <Link className="Link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="Link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="Link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="Link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="Link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="Link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          <span>{currentUser?.username}</span>{" "}
          {/*will put user name if signed in */}
          {currentUser ? (
            <span onClick={logout}>
              Logout
            </span> /*this will make current user null when clicked to logout */
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}{" "}
          {/* if no current used link to login condition */}
          <span className="write">
            <Link className="Link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
