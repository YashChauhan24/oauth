import React, { useEffect } from "react";

const FacebookSDKLoader = ({ onLoad }) => {
  useEffect(() => {
    // Load the Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "896211691951222", // Replace with your app ID
        cookie: true, // Enable cookies to allow the server to access the session
        xfbml: true, // Parse social plugins on this webpage
        version: "v12.0", // Use this Graph API version
      });
      if (onLoad) {
        onLoad(); // Call the onLoad function when the SDK is ready
      }
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, [onLoad]);

  return null; // This component does not render anything visible
};

export default FacebookSDKLoader;
