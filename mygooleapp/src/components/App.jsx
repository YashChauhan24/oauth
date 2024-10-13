import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  return (
    <>
      <GoogleOAuthProvider clientId="324863332391-itv10ha7hqv46gdp8bfivbn60q5c4704.apps.googleusercontent.com">
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Login} />
            <Route path="/dashboard" Component={Dashboard} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
