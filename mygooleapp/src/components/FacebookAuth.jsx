import React, { useState } from "react";
import FacebookSDKLoader from "./Fb-sdk";
import axios from "axios";

const FacebookComponent = () => {
  const handleLogin = async () => {
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          console.log("Welcome! Fetching your information.... ");

          // Fetch user information
          window.FB.api("/me?fields=name,email", async (resp) => {
            console.log(resp);
            console.log("Good to see you, " + resp.name + ".");

            try {
              // Make the POST request to your backend once `res` is set
              const response = await axios.post(
                "http://localhost:5000/auth/fb",
                resp
              );
              console.log("Server Response:", response.data);
            } catch (error) {
              console.error("Error during Axios request:", error);
            }
          });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "email" }
    );
  };

  return (
    <div>
      <FacebookSDKLoader onLoad={() => console.log("FB SDK Loaded")} />
      <button onClick={handleLogin}>Login with Facebook</button>
    </div>
  );
};

export default FacebookComponent;
