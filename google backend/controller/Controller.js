import axios from "axios";
import { auth, OAuth2Client } from "google-auth-library";

const client = new OAuth2Client();

// export const googleAuth = async (req, res) => {
//   try {
//     const { credential, clientId } = req.body;
//     console.log({ credential });
//     console.log({ clientId });
//     const ticket = await client.verifyIdToken({
//       idToken: credential,
//       audience:
//         "324863332391-itv10ha7hqv46gdp8bfivbn60q5c4704.apps.googleusercontent.com",
//     });

//     const payload = ticket.getPayload();
//     const userid = payload["sub"];

//     console.log({ payload, userid });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

export const getGitauth = async (req, res) => {
  try {
    const { code } = req.query;
    // console.log({ code });

    // Exchange the code for an access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const accessToken = tokenResponse.data.access_token;
    // console.log(tokenResponse.data);
    if (accessToken) {
      // Fetch the user details from GitHub API
      const userResponse = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      });

      const emailResponse = await axios.get(
        "https://api.github.com/user/emails",
        {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        }
      );

      console.log("User Response:", userResponse.data);

      const primaryEmail = emailResponse.data.find(
        (email) => email.primary
      ).email;

      console.log({ primaryEmail });
      // Send the user info to the frontend
      res.json({
        name: userResponse.data.name,
        email: primaryEmail,
      });
    } else {
      res.status(400).json({ success: false, message: "No access token" });
    }
  } catch (error) {
    console.error("Error in GitHub callback:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const facebookAuth = async (req, res) => {
  try {
    console.log(req.body);
  } catch (err) {}
};

import passport from "passport";

export const googleAuth = (req, res, next) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
};

export const googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", { failureRedirect: process.env.CLIENT_URL })(
    req,
    res,
    () => {
      // After successful login, send the user data to the frontend
      const user = req.user;
      console.log(user);
      // Send user data as a JSON response
      res.redirect(
        `${process.env.CLIENT_URL}/profile?user=${encodeURIComponent(
          JSON.stringify(user)
        )}`
      );
    }
  );
};

export const logout = (req, res) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect(`${process.env.CLIENT_URL}`);
  });
};

export const getUserProfile = (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user); // Send user info to frontend
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({
      message: `Hello ${req.user.displayName}`,
      profile: req.user,
    });
    // return next();
  }
  res.redirect("/");
};
