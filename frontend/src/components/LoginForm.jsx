import { useState } from "react";
import axios from "axios";

function LoginForm(props) {
  const authURL = "http://localhost:5000/api/auth/login";
  const alert = props.alert;
  const [credential, setCredential] = useState({ email: "", password: "" });
  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      authURL,
      {
        email: credential.email,
        password: credential.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.data;
    if (result.success) {
      localStorage.setItem("token", result.authToken);
      alert("success", "Successfully log in");
    } else {
      alert("danger", "invalid credentials");
    }
    // console.log(result.authToken);
  };
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <div className="container vh-100">
      <h2>Login to Notebook</h2>
      <form onSubmit={handleLogin}>
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
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
