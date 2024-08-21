import { useState } from "react";
import assets from "../../assets/assets";
import "./Login.css";

type AssetsType = {
  logo_big: string;
};

function Login() {
  const [currState, setCurrState] = useState<string>("Sign up");

  return (
    <div className="login">
      <img src={(assets as AssetsType).logo_big} alt="logo" />
      <form className="login-form">
        <h2>{currState}</h2>

        {currState === "Sign up" ? (
          <input type="text" placeholder="Username" className="form-input" required />
        ) : null}
        <input type="email" placeholder="Email address" className="form-input" required />
        <input type="password" placeholder="Password" className="form-input" required />
        <button type="submit">{currState === "Sign up" ? "Create account" : "Login now"}</button>

        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className="login-forgot">
          {currState === "Sign up" ? (
            <p className="login-toggle">
              Already have an account <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          ) : (
            <p className="login-toggle">
              Create an account <span onClick={() => setCurrState("Sign up")}>click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
