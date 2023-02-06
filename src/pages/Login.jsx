import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; //wont be able to use link comp below without it
import { useState } from "react";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    //setting states based off below inputs
    username: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate(); // to go to home page if successful

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value })); //using a spread and .value gathers data set in the inputs
  };

  const handleSubmit = async (e) => {
    // aync because api request
    e.preventDefault(); // so page wont reload this happens after back end and install axios stop spelling defAult wrong dude zesh
    try {
      await login(inputs);
      navigate("/"); // if good head to home page
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="auth">
      <h1>Login</h1>
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
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>
          Dont you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};
//dont forget to require the inputs
export default Login;
