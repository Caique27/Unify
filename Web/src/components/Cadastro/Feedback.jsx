import React from "react";
import "./Feedback.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
function Feedback(props) {
  const history = useHistory();
  return (
    <main className="Feedback-main">
      <div className="Feedback-confirmation">
        <CheckCircleOutlineIcon
          color="secondary"
          sx={{ width: "10%", height: "10%", marginRight: "-10rem" }}
        />
        <Typography
          sx={{
            fontFamily: "proxima nova",
            fontSize: "170%",
            fontWeight: 500,
            marginTop: "1.5%",
          }}
          align="center"
        >
          Conta criada com sucesso
        </Typography>
      </div>
      <div className="Feedback-info">
        <Typography
          sx={{
            fontFamily: "proxima nova",
            fontSize: "106%",
            fontWeight: 500,
            marginTop: "1.5%",
          }}
          align="center"
        >
          O número da sua nova conta é:
        </Typography>
        <Typography
          sx={{
            fontFamily: "proxima nova",
            fontSize: "106%",
            fontWeight: 500,
            color: "rgb(6, 172, 0)",
          }}
          align="center"
        >
          {props.numeroConta}
        </Typography>
      </div>
      <div
        className="Feedback-link"
        onClick={() => {
          history.replace(`/`);
        }}
      >
        Voltar a página de Login
      </div>
    </main>
  );
}
export default Feedback;
