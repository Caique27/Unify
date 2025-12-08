import React from "react";
import { Typography, LinearProgress } from "@mui/material";
import "./LoginButton.css";

function LoginButton(props) {
  var estilo;
  if (props.size == "small") {
    estilo = "LoginButton-small";
  } else {
    estilo = "LoginButton-big";
  }
  return (
    <button className={`LoginButton-button ${estilo}`}>
      {props.status == "waiting" ? (
        <Typography
          sx={{
            fontFamily: "proxima nova",
            fontSize: "110%",
          }}
        >
          {props.texto}
        </Typography>
      ) : (
        <LinearProgress color="primary" sx={{ width: "80%", margin: "auto" }} />
      )}
    </button>
  );
}
export default LoginButton;
