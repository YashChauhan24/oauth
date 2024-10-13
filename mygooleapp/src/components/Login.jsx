import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import GithubAuth from "./GithubAuth";
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import axios from "axios";
import FacebookComponent from "./FacebookAuth";

const Login = () => {
  const [res, setRes] = useState();
  const [err, setErr] = useState();

  const { linkedInLogin } = useLinkedIn({
    clientId: "86pirb5jadg5wr",
    onSuccess: (code) => {
      console.log(code);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  console.log(res, err);

  const gogleApi = async (data) => {
    setRes(data);
    await axios.post("http://localhost:5000/auth/", data);
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <div className="mb-3">
        <GoogleLogin
          onSuccess={(res) => gogleApi(res)}
          onError={(err) => setErr(err)}
        />
      </div>
      <GithubAuth />
      <img
        onClick={linkedInLogin}
        src={linkedin}
        alt="Sign in with Linked In"
        style={{ maxWidth: "180px", cursor: "pointer" }}
      />
      <FacebookComponent />
    </div>
  );
};

export default Login;
