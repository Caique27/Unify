import "./Saldos.css";
import { useState } from "react";
import { Typography, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "../../assets/img/LogoItau.png";
import Image2 from "../../assets/img/LogoNubank.png";
import Image3 from "../../assets/img/LogoBTG.png";

function Saldos({ data }) {
  const [mostrarSaldo, setMostrarSaldo] = useState(false);

  const handleClickShowBalance = () => {
    setMostrarSaldo(!mostrarSaldo);
  };

  const somaSaldos = (contas) =>
    contas ? contas.reduce((total, conta) => total + conta.saldo, 0) : 0;

  console.log(data);
  return (
    <div className="Saldos-div">
      <section className="Saldos-box">
        <Typography
          sx={{
            fontFamily: "proxima nova",
            fontSize: "1.5rem",
            fontWeight: 500,
            color: "#414141",
            marginTop: "5%",
            marginLeft: "7%",
          }}
        >
          Saldo em todas as instituições:
        </Typography>
        <div className="Saldos-balance">
          <Typography
            noWrap
            sx={{
              fontFamily: "proxima nova",
              fontSize: "2.3rem",
              fontWeight: 700,
              color: "rgb(6, 172, 0)",
              marginLeft: "7%",
            }}
          >
            R$
            {mostrarSaldo
              ? ` ${somaSaldos(data).toFixed(2)}`
              : " " +
                "*".repeat(String(somaSaldos(data).toFixed(2)).length * 1.5)}
          </Typography>
          <IconButton
            aria-label="toggle balance visibility"
            onClick={handleClickShowBalance}
            edge="end"
            color="secondary"
            sx={{
              ml: 0.5,
            }}
          >
            {true ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </div>
        <Typography
          sx={{
            fontFamily: "proxima nova",
            fontSize: "1rem",
            fontWeight: 500,
            color: "#414141",
            marginTop: "1rem",
            marginLeft: "7%",
          }}
        >
          Saldo por instituição:
        </Typography>
        {data.map((conta) => (
          <div className="Saldos-saldo">
            <div className="Saldos-banco">
              {conta.banco == "Itaú" ? (
                <img
                  src={Image}
                  alt="Logo"
                  className="Saldos-logo"
                  width={20}
                />
              ) : conta.banco == "Nubank" ? (
                <img
                  src={Image2}
                  alt="Logo"
                  className="Saldos-logo"
                  width={20}
                />
              ) : (
                <img
                  src={Image3}
                  alt="Logo"
                  className="Saldos-logo"
                  width={20}
                />
              )}
              <p className="Saldos-banconome">
                {conta.banco} - Pessoa {conta.tipo}
              </p>
            </div>
            <Typography
              noWrap
              sx={{
                fontFamily: "proxima nova",
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "rgb(6, 172, 0)",
                marginLeft: "9%",
                marginTop: "2%",
              }}
            >
              R$
              {mostrarSaldo
                ? " " + conta.saldo.toFixed(2)
                : " " + "*".repeat(String(conta.saldo.toFixed(2)).length * 1.5)}
            </Typography>
          </div>
        ))}
      </section>
    </div>
  );
}
export default Saldos;
