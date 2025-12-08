import "./Operacoes.css";
import React, { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoginButton from "../LoginButton/LoginButton";
import axios from "axios";
function Operacoes(props) {
  const [component, setComponent] = useState("menu");

  const [valor, setValor] = useState("");
  const [banco, setBanco] = useState("");
  const [conta, setConta] = useState("");
  const [senha, setSenha] = useState("");

  const [buttonStatus, setButtonStatus] = useState("waiting");

  async function manageRequest(type) {
    setButtonStatus("loading");

    var responseMessage;
    try {
      if (type == "deposito") {
        var response = await axios.put("http://localhost:8877/deposito", {
          idConta: props.id,
          valor: Number(valor),
          banco: banco,
          senha: senha,
        });
        responseMessage = response.data.message;
        props.setSnackbar({
          open: true,
          severity: "success",
          text: responseMessage,
        });
        setSenha("");
        setConta("");
        setValor("");
        setBanco("");
      } else {
        var response = await axios.put("http://localhost:8877/transferencia", {
          idOrigem: props.id,
          numDestino: conta,
          valor: Number(valor),
          banco: banco,
          senha: senha,
        });
        responseMessage = response.data.message;
        props.setSnackbar({
          open: true,
          severity: "success",
          text: responseMessage,
        });
        setSenha("");
        setConta("");
        setValor("");
      }
    } catch (err) {
      err.response.data
        ? props.setSnackbar({
            open: true,
            severity: "error",
            text: err.response.data.message,
          })
        : props.setSnackbar({
            open: true,
            severity: "error",
            text: "Falha ao realizar operação. Tente mais tarde.",
          });
    }

    setTimeout(() => {
      setButtonStatus("waiting");
    }, 500);
  }

  return (
    <div className="Operacoes-div">
      <section className="Operacoes-box">
        {component == "menu" ? (
          <>
            <Typography
              sx={{
                fontFamily: "proxima nova",
                fontSize: "2rem",
                fontWeight: 500,
                color: "#414141",
                marginTop: "5vh",
              }}
            >
              Qual operação deseja realizar?
            </Typography>
            <div
              style={{
                display: "flex",
                marginTop: "5%",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setComponent("deposito");
                }}
                sx={{
                  fontFamily: "proxima nova",
                  height: "8vh",
                  width: "30vh",
                }}
                size="large"
              >
                Depósito
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setComponent("transferencia");
                }}
                sx={{
                  fontFamily: "proxima nova",
                  marginLeft: "5%",
                  width: "30vh",
                }}
                size="large"
              >
                Transferência
              </Button>
            </div>
          </>
        ) : component == "deposito" ? (
          <>
            <Button
              variant="Text"
              startIcon={<ArrowBackIcon />}
              style={{
                alignSelf: "flex-start",
                margin: "3%",
              }}
              onClick={() => {
                setComponent("menu");
                setSenha("");
                setConta("");
                setValor("");
              }}
            >
              Voltar
            </Button>
            <section className="Operacoes-form">
              <Typography
                sx={{
                  fontFamily: "proxima nova",
                  fontSize: "1.5rem",
                  fontWeight: 499,
                  color: "#414141",
                  marginTop: "3vh",
                }}
              >
                Depósito
              </Typography>
              <TextField
                label="Valor(R$)"
                variant="filled"
                focused
                color="secondary"
                sx={{
                  marginTop: "7%",
                }}
                value={valor}
                onChange={(event) => {
                  setValor(event.target.value);
                }}
              />
              <FormControl
                variant="filled"
                focused
                color="secondary"
                sx={{ marginTop: "5%", width: "28vh" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Banco
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  focused
                  variant="filled"
                  color="secondary"
                  value={banco}
                  onChange={(event) => {
                    setBanco(event.target.value);
                  }}
                  label="Banco"
                >
                  {props.contas.map((option) => (
                    <MenuItem value={option.banco}>
                      {option.banco} - Pessoa {option.tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Senha"
                variant="filled"
                focused
                color="secondary"
                sx={{
                  marginTop: "5%",
                }}
                value={senha}
                type="password"
                onChange={(event) => {
                  setSenha(event.target.value);
                }}
              />
              <div
                className="Operacoes-button_container"
                onClick={() => {
                  manageRequest("deposito");
                }}
              >
                <LoginButton texto="Realizar Operação" status={buttonStatus} />
              </div>
            </section>
          </>
        ) : (
          <>
            <Button
              variant="Text"
              startIcon={<ArrowBackIcon />}
              style={{
                alignSelf: "flex-start",
                margin: "3%",
              }}
              onClick={() => {
                setComponent("menu");
                setSenha("");
                setConta("");
                setValor("");
              }}
            >
              Voltar
            </Button>
            <section className="Operacoes-form">
              <Typography
                sx={{
                  fontFamily: "proxima nova",
                  fontSize: "1.5rem",
                  fontWeight: 499,
                  color: "#414141",
                  marginTop: "3vh",
                }}
              >
                Transferência
              </Typography>
              <TextField
                label="Valor(R$)"
                variant="filled"
                focused
                color="secondary"
                sx={{
                  marginTop: "7%",
                }}
                value={valor}
                onChange={(event) => {
                  setValor(event.target.value);
                }}
              />
              <TextField
                label="N° da conta"
                variant="filled"
                focused
                color="secondary"
                sx={{
                  marginTop: "5%",
                }}
                value={conta}
                onChange={(event) => {
                  setConta(event.target.value);
                }}
              />
              <FormControl
                variant="filled"
                focused
                color="secondary"
                sx={{ marginTop: "5%", width: "28vh" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Banco
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  focused
                  variant="filled"
                  color="secondary"
                  value={banco}
                  onChange={(event) => {
                    setBanco(event.target.value);
                  }}
                  label="Banco"
                >
                  {props.contas.map((option) => (
                    <MenuItem value={option.banco}>
                      {option.banco} - Pessoa {option.tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Senha"
                variant="filled"
                focused
                color="secondary"
                sx={{
                  marginTop: "5%",
                }}
                value={senha}
                type="password"
                onChange={(event) => {
                  setSenha(event.target.value);
                }}
              />
              <div
                className="Operacoes-button_container"
                onClick={() => {
                  manageRequest("transferencia");
                }}
              >
                <LoginButton texto="Realizar Operação" status={buttonStatus} />
              </div>
            </section>
          </>
        )}
      </section>
    </div>
  );
}
export default Operacoes;
