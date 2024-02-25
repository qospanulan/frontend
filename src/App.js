import { useContext, useState, useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import LoginForm from "./scenes/global/Login";
import LogoutForm from "./scenes/global/Logout";

import Dashboard from "./scenes/dashboard";
import Carriers from "./scenes/carriers/carrierList";
import CreateCarrier from "./scenes/carriers/createCarrier";
import Orders from "./scenes/orders/orderList";
import CreateOrders from "./scenes/orders/createOrder";
import CreateBnumberGroup from "./scenes/orders/createBnumberGroup";
import TCG from "./scenes/tcg";
import { getCurrentUser } from "./state/api/users/signIn";

function App() {
  const [theme, colorMode] = useMode();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [username, setUsername] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      setUser(JSON.parse(localStorage.getItem("user")));
      if (user?.token) {
        const response = await getCurrentUser(user.token);

        if (response) {
          setUsername(response.first_name + " " + response.last_name);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {!username && (
              <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/logout" element={<LogoutForm />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            )}
            {username && (
              <>
                <Sidebar />
                <main className="content">
                  <Topbar />
                  <Routes>
                    {/* <Route path="/" element={<Dashboard />} /> */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                      path="/login"
                      element={
                        !username ? <LoginForm /> : <Navigate to={"/"} />
                      }
                    />
                    <Route path="/logout" element={<LogoutForm />} />
                    <Route path="/" element={<TCG />} />
                    <Route path="/received-calls" element={<TCG />} />
                    <Route path="/carriers" element={<Carriers />} />
                    <Route path="/carriers/new" element={<CreateCarrier />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/orders/new" element={<CreateOrders />} />
                    <Route
                      path="/orders/bnumber-group"
                      element={<CreateBnumberGroup />}
                    />
                    <Route
                      path="*"
                      element={<Navigate to="/received-calls" replace />}
                    />
                  </Routes>
                </main>
              </>
            )}
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
