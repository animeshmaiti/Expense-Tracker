import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/globalContext";
import '../App.css';
import finance from "../img/finance2.jpg";
import { Link, useNavigate } from "react-router-dom";


function LoginForm() {
  const {login,error}= useGlobalContext();
  const navigate=useNavigate();
  const [credential, setCredential] = useState({ email: "", password: "" });
  useEffect(() => {
    navigate('/login');
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    login(credential);
  };
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <div className="login-page">
      <div className="img-div">
        <img src={finance} alt="finance" />
      </div>
      <form onSubmit={handleLogin} className="form-div">
        <div className="container">
          <h2>Login</h2>
          {error && <div className="error">
            <span className="span-err">{error}</span>
          </div>}
          <div className="input-div">
            <label className="input-label" htmlFor="email">
              Email
            </label>
            <input
              className="input-field"
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={onChange}
              required
            />
          </div>
          <div className="input-div">
            <label className="input-label" htmlFor="psw">
              Password
            </label>
            <input
              className="input-field"
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={onChange}
              required
            />
          </div>
          <button className="btn-login" type="submit">
            Login
          </button>
          <p>
            New to Expense Tracker?<Link className="sign-up" to="/register">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
