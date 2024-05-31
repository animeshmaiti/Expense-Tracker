import { useState } from "react";
import { useGlobalContext } from "../context/globalContext";
import "../App.css";
import finance from "../img/finance2.jpg";
import { Link } from "react-router-dom";

export const SignupForm = (props) => {
  const { signup, error } = useGlobalContext();
  const [credential, setCredential] = useState({
    username: "",
    email: "",
    password: "",
    cPassword: "",
  });
  // const alert = props.alert;
  const handleCreateUser = async (e) => {
    e.preventDefault();
    signup(credential);
  };
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <div className="login-page">
      <div className="img-div">
        <img src={finance} alt="finance" />
      </div>
      <form onSubmit={handleCreateUser} className="form-div">
        <div className="container">
          <h2>Create New Account</h2>
          {error && (
            <div className="error">
              {error.map((err, index) => {
                return (
                  <span key={index} className="span-err">
                    {err.msg}
                  </span>
                );
              })}
            </div>
          )}
          <div className="input-div">
            <label className="input-label" htmlFor="username">
              Username
            </label>
            <input
              className="input-field"
              type="text"
              placeholder="Enter Name"
              name="username"
              onChange={onChange}
              required
            />
          </div>
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
            <label className="input-label" htmlFor="password">
              New Password
            </label>
            <input
              className="input-field"
              type="password"
              placeholder="Enter Password"
              name="password"
              // minLength="5"
              onChange={onChange}
              required
            />
          </div>
          <div className="input-div">
            <label className="input-label" htmlFor="psw">
              Confirm Password
            </label>
            <input
              className="input-field"
              type="password"
              placeholder="Confirm Password"
              name="cPassword"
              // minLength="5"
              onChange={onChange}
              required
            />
          </div>
          <button className="btn-login" type="submit">
            Login
          </button>
          <p>
            Existing User?
            <Link className="sign-up" to="/login">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
