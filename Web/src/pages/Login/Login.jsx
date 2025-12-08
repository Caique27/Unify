import React, { useState } from "react";
import "./Login.css";
import Image from "../../assets/img/Logo2.png";
import { Tabs, Tab, Box } from "@mui/material";
import LoginCliente from "../../components/LoginCliente/LoginCliente.jsx";

import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";

function Login() {
  const theme = useTheme();

  return (
    <section className="login-page">
      <header className="login-header">
        <img src={Image} alt="Logo2" className="login-logo" />
        <h1 className="login-nome">Unify</h1>
      </header>

      <div className="login-box">
        <Box
          sx={{
            width: "100%",
            borderBottom: 2,
            borderColor: "divider",
          }}
        >
          <Box>
            <Tabs
              sx={{ borderBottom: 0.5, borderColor: "divider" }}
              value={0}
              variant="fullWidth"
              textColor="secondary"
              indicatorColor="primary"
            >
              <Tab
                label="Cliente"
                disableRipple
                sx={{
                  fontFamily: "proxima nova",
                  fontSize: "110%",
                }}
              />
            </Tabs>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={0}
            >
              <div className="login-conteudo">
                <LoginCliente />
              </div>
            </SwipeableViews>
          </Box>
        </Box>
      </div>
    </section>
  );
}

export default Login;
