import './login.css';
import { useRef, useContext, useEffect, useState } from "react";
import { loginCall } from "../../apiCalls/apiCalls.js";
import { AuthContext } from "../../context/authContext.js";
import { LoginStart, LoginSuccess, LoginFailure } from "../../context/authActions.js";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const email = useRef();
  const password = useRef();
    const [frontendError, setFrontendError]=useState(null);
    const [backendError, setBackendError]=useState(null);
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFrontendError(null);
    setBackendError(null);

    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    // 1. frontend validation
    if (!emailValue || !passwordValue) {
      setFrontendError("All fields are required");
      return;
    }
    dispatch(LoginStart());
    try {
      const data = await loginCall({
        email: emailValue,
        password: passwordValue,
      });

      dispatch(LoginSuccess(data));

    } catch (err) {
      dispatch(LoginFailure(err.response?.data?.message || "Server not running please check"));
      const errorMessage=err.response?.data?.message || 'cannot connect to server';
      setBackendError(errorMessage);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

return(
<div className="loginPage">
    <div className="loginWrapper">
        <div className="leftContentBox">
            <h2>My Social App</h2>
            <p>Connect with friends and the world around you</p>
        </div>
        <div className="rightContentBox">
            <form onSubmit={handleSubmit}>
                <div className="inputsBox">
                    <input type="email" placeholder="email" ref={email}/>
                    <input type="password" placeholder="Password" ref={password}/>
                </div>
                <div className="buttonsBox">
                    <button type="submit" disabled={isFetching}>{isFetching ? "Loading..." : "Log In"}
                    </button>
                    <p>Forgot Password?</p>
                    <Link to="/register">Create an Account</Link>
                </div>
            </form>
            {
            frontendError ? <p>{frontendError}</p>: backendError && <p>{backendError}
            </p>
        }
        </div>
    </div>
</div>
)
}