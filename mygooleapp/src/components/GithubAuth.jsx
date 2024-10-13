import { useEffect } from "react";
import axios from "axios";

const GitHubComponent = () => {
  const loginWithGitHub = () => {
    const clientID = "Ov23liraiWax0v3Tksiz";
    const redirectURI = "http://localhost:5000/auth/github/callback";
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      axios
        .post("http://localhost:5000/auth/auth/github/callback")
        .then((response) => console.log(response.data))
        .catch((error) =>
          console.error("Error fetching GitHub user info:", error)
        );
    }
  }, []);

  return (
    <div>
      <button onClick={loginWithGitHub}>Login with GitHub</button>
    </div>
  );
};

export default GitHubComponent;
