import React from "react";
import { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom"; //wont be able to use link comp below without it

const Register = () => {
  const [inputs, setInputs] = useState({
    //setting states based off below inputs
    username: "",
    email: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate(); // to go to home page if successful

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value })); //using a spread and .value gathers data set in the inputs
  };

  const handleSubmit = async (e) => {
    // aync because api request
    e.preventDefault(); // so page wont reload this happens after back end and install axios stop spelling defAult wrong dude zesh
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data); //this is gonna give the err user alrdy exist from the auth.js controller file
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Register</button>{" "}
        {/* this on click created after backend*/}
        {err && <p>{err}</p>}{" "}
        {/*then afer we  set error create a condition for this to show */}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};
//dont forget to require the inputs
export default Register;
