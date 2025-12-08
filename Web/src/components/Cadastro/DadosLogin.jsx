import React, { useState, useContext } from "react";
import {
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./DadosLogin.css";
import LoginButton from "../LoginButton/LoginButton.jsx";
import BackButton from "../BackButton/BackButton.jsx";
import Validacao from "../../contexts/Validacao.js";
function DadosLogin(props) {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [buttonStatus, setButtonStatus] = useState("waiting");

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const [errosEmail, setErrosEmail] = useState({ valido: true, texto: "" });
  const [errosSenha, setErrosSenha] = useState({
    valido: true,
    texto: "",
  });
  const [errosConfirmar, setErrosConfirmar] = useState({
    valido: true,
    texto: "",
  });

  var emptyFields = email == "" || senha == "" || confirmar == "";
  var noErrors =
    errosEmail.valido && errosSenha.valido && errosConfirmar.valido;
  const validacoes = useContext(Validacao);
  const handleClickShowPassword = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function checarCampo(id, func, value) {
    //teste preenchimento

    func(validacoes.preenchimento(value));
    if (senha != "" && confirmar != "") {
      const match = senha == confirmar;
      setErrosConfirmar({
        valido: match,
        texto: match ? "" : "*Senhas não coincidem",
      });
    }
  }

  function finalCheck() {
    checarCampo("Email", setErrosEmail, email);
    checarCampo("Senha", setErrosSenha, senha);
    checarCampo("Confirmar", setErrosConfirmar, confirmar);
  }
  function avancar() {
    setButtonStatus("loading");

    if (emptyFields) {
      setTimeout(() => {
        setButtonStatus("waiting");
      }, 500);

      finalCheck();
    } else if (buttonStatus == "waiting" && noErrors) {
      setTimeout(() => {
        setButtonStatus("waiting");
        props.proximaPagina();
      }, 1500);

      props.atualizar({ email: email, senha: senha });
    } else {
      setTimeout(() => {
        setButtonStatus("waiting");
      }, 500);
    }
  }

  return (
    <form
      className="DadosLogin-form"
      onSubmit={(event) => {
        avancar();
        event.preventDefault();
        //  props.proximaPagina();
      }}
    >
      <div className="DadosLogin-dados-email">
        <TextField
          onBlur={(event) => checarCampo(event.target.id, setErrosEmail, email)}
          id="Email"
          label="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          helperText={errosEmail.texto}
          variant="outlined"
          margin="normal"
          autoComplete="off"
          error={!errosEmail.valido}
          color={errosEmail.valido ? "third" : "error"}
          focused
          disabled={buttonStatus == "loading" ? true : false}
          sx={{ width: "140%" }}
          inputProps={{
            style: {
              height: "1.7rem",
            },
          }}
        />
      </div>

      <div className="DadosLogin-senha">
        <TextField
          onBlur={(event) => checarCampo(event.target.id, setErrosSenha, senha)}
          id="Senha"
          label="Senha"
          helperText={errosSenha.texto}
          type={mostrarSenha ? "text" : "password"}
          value={senha}
          onChange={(event) => {
            setSenha(event.target.value);
          }}
          variant="outlined"
          margin="none"
          error={!errosSenha.valido}
          color={errosSenha.valido ? "third" : "error"}
          focused
          disabled={buttonStatus == "loading" ? true : false}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {!mostrarSenha ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            style: {
              marginBottom: "0.01%",
              height: "90%",
            },

            form: {
              autocomplete: "off",
            },
          }}
        />
        <TextField
          onBlur={(event) =>
            checarCampo(event.target.id, setErrosConfirmar, confirmar)
          }
          id="Confirmar"
          label="Confirmar Senha"
          helperText={errosConfirmar.texto}
          type={mostrarSenha ? "text" : "password"}
          value={confirmar}
          onChange={(event) => {
            setConfirmar(event.target.value);
          }}
          variant="outlined"
          margin="none"
          error={!errosConfirmar.valido}
          color={errosConfirmar.valido ? "third" : "error"}
          focused
          disabled={buttonStatus == "loading" ? true : false}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {true ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            style: {
              marginBottom: "0.01%",
              height: "90%",
            },

            form: {
              autocomplete: "off",
            },
          }}
        />
      </div>
      <div className="DadosLogin-buttons">
        <BackButton aoClicar={props.voltarPagina} />
        <LoginButton texto="Próximo >" status={buttonStatus} size="small" />
      </div>

      <div id="margin">.</div>
    </form>
  );
}
export default DadosLogin;
