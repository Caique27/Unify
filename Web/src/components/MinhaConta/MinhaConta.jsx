import "./MinhaConta.css";
import React, { useState } from "react";
import { Typography, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Extrato from "../Extrato/Extrato";
import LogoutDialog from "../LogoutDialog/LogoutDialog";
import LogoutIcon from "@mui/icons-material/Logout";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

function MinhaConta(props) {
  const [mostrarSaldo, setMostrarSaldo] = useState(false);
  const handleClickShowBalance = () => {
    setMostrarSaldo(!mostrarSaldo);
  };
  const somaSaldos = (contas) =>
    contas ? contas.reduce((total, conta) => total + conta.saldo, 0) : 0;

  const [openDialog, setOpenDialog] = useState(false);

  console.log(props.data);
  const handleMouseDownBalance = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <section className="MinhaConta-box">
        <section className="MinhaConta-info">
          <Typography
            sx={{
              fontFamily: "proxima nova",
              fontSize: "1.7rem",
              fontWeight: 500,
              color: "#414141",
            }}
          >
            Saldo em todas as instituições:
          </Typography>

          <div className="MinhaConta-balance">
            <Typography
              noWrap
              sx={{
                fontFamily: "proxima nova",
                fontSize: "2.5rem",
                fontWeight: 700,
                color: "rgb(6, 172, 0)",
              }}
            >
              R$
              {mostrarSaldo
                ? ` ${somaSaldos(props.data.contas).toFixed(2)}`
                : " " +
                  "*".repeat(
                    String(somaSaldos(props.data.contas).toFixed(2)).length *
                      1.5
                  )}
            </Typography>
            <IconButton
              aria-label="toggle balance visibility"
              onClick={handleClickShowBalance}
              onMouseDown={handleMouseDownBalance}
              edge="end"
              color="secondary"
              sx={{
                ml: 0.5,
              }}
            >
              {!mostrarSaldo ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
          <Typography
            sx={{
              fontFamily: "proxima nova",
              fontSize: "1rem",
              fontWeight: 500,
              color: "#414141",
              marginTop: "0.5rem",
            }}
          >
            O que deseja fazer?
          </Typography>

          <div className="MinhaConta-options">
            <div
              className="MinhaConta-optionbox"
              onClick={() => {
                props.mostraExtrato();
              }}
            >
              <ReceiptIcon
                edge="end"
                color="secondary"
                sx={{
                  fontSize: "2.5rem",
                  marginLeft: "0.5rem",
                  marginTop: "0.6rem",
                }}
              />
              <Typography
                sx={{
                  fontFamily: "proxima nova",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "#414141",
                  marginTop: "0.3rem",
                  marginLeft: "0.5rem",
                }}
              >
                Consultar extrato
              </Typography>
            </div>
            <div
              className="MinhaConta-optionbox"
              onClick={() => {
                props.mostraOperacoes();
              }}
            >
              <AccountBalanceIcon
                edge="end"
                color="secondary"
                sx={{
                  fontSize: "2.5rem",
                  marginLeft: "0.5rem",
                  marginTop: "0.6rem",
                }}
              />
              <Typography
                sx={{
                  fontFamily: "proxima nova",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "#414141",
                  marginTop: "0.3rem",
                  marginLeft: "0.5rem",
                }}
              >
                Realizar operações
              </Typography>
            </div>
          </div>
          <div
            onClick={() => {
              setOpenDialog(true);
            }}
            className="MinhaConta-logout-button"
          >
            Sair
            <LogoutIcon
              edge="end"
              color="secondary"
              sx={{
                fontSize: "1rem",
                ml: 0.8,
                mb: -0.3,
              }}
            />
          </div>
          <LogoutDialog
            open={openDialog}
            closeDialog={() => {
              setOpenDialog(false);
            }}
          />
        </section>
        <section className="MinhaConta-extrato">
          <Typography
            sx={{
              fontFamily: "proxima nova",
              fontSize: "1rem",
              fontWeight: 500,
              color: "#414141",
              alignSelf: "center",
              marginLeft: -2.5,
            }}
          >
            Últimas operações
          </Typography>

          <Extrato data={props.data.dados_extrato.slice(0, 3)} />
          <div
            onClick={() => {
              props.mostraExtrato();
            }}
            className="MinhaConta-abrir-extrato-button"
          >
            Ver extrato completo
          </div>
        </section>
      </section>
    </div>
  );
}
export default MinhaConta;
