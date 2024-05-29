import { useState } from "react";
import { useGlobalContext } from "../context/globalContext";

export const SignupForm = (props) => {
  const {signup}=useGlobalContext();
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
    <div className="container vh-100">
      <h2>Sign up to Notebook</h2>
      <form onSubmit={handleCreateUser}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            onChange={onChange}
            required
            minLength="3"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            required
            minLength="5"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cPassword"
            name="cPassword"
            onChange={onChange}
            required
            minLength="5"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create New Account
        </button>
      </form>
    </div>
  );
};
