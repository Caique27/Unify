import React, { useEffect, useContext, useState } from "react";
import "./Header.css";
import { Typography } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Image from "../../assets/img/Logo2.png";
import Tempo from "../../contexts/Tempo.js";
function Header(props) {
  const TimeContext = useContext(Tempo);
  const [relogio, setRelogio] = useState([
    TimeContext.data().dia,
    TimeContext.data().hora,
  ]);
  useEffect(() => {
    setInterval(
      () => setRelogio([TimeContext.data().dia, TimeContext.data().hora]),
      10000
    );
  }, []);

  return (
    <main className="Header-main">
      <section className="Header-intro">
        <img src={Image} alt="Logo" className="Header-logo" />
        <section className="Header-greeting">
          <Typography
            sx={{
              fontFamily: "proxima nova",
              fontSize: "1.3rem",
              fontWeight: 500,
              color: "white",
            }}
          >
            {TimeContext.mensagem()}
          </Typography>
          <Typography
            sx={{
              fontFamily: "proxima nova",
              fontSize: "2rem",
              fontWeight: 700,
              color: "white",
            }}
          >
            {props.nome}
          </Typography>
        </section>
      </section>
      <section className="Header-time">
        <Typography
          sx={{
            fontFamily: "proxima nova",
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "white",
            display: "flex",
            flexDirecton: "row",
          }}
        >
          <EventNoteIcon sx={{ marginRight: "4.5%" }} />

          {relogio[0]}
        </Typography>
        <Typography
          sx={{
            fontFamily: "proxima nova",
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "white",
            marginTop: "1rem",
          }}
        >
          {relogio[1]}
        </Typography>
      </section>
    </main>
  );
}
export default Header;
