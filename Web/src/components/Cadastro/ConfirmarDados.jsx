import React, { useState } from "react";
import LoginButton from "../LoginButton/LoginButton.jsx";
import BackButton from "../BackButton/BackButton.jsx";
import {
  Typography,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./ConfirmarDados.css";
function ConfirmarDados(props) {
 
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleClickShowPassword = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.registrarConta();
      }}
      className="ConfirmarDados-form"
    >
      <Typography
        sx={{
          fontFamily: "proxima nova",
          fontSize: "110%",
          fontWeight: 500,
        }}
        align="center"
      >
        Confirme os dados
      </Typography>
      <div className="ConfirmarDados-nome">
        <TextField
          id="Nome"
          helperText="Nome"
          value={props.dados.nome}
          focused
          size="small"
          color="fifth"
          sx={{ width: "140%" }}
          inputProps={{
            style: {
              color: "#a6a6a6",
            },
          }}
        />
        <TextField
          id="Sobrenome"
          helperText="Sobrenome"
          value={props.dados.sobrenome}
          focused
          size="small"
          color="fifth"
          sx={{ width: "140%" }}
          inputProps={{
            style: {
              color: "#a6a6a6",
            },
          }}
        />
      </div>
      <div className="ConfirmarDados-info">
        <TextField
          id="Idade"
          helperText="Idade"
          value={props.dados.idade}
          focused
          size="small"
          color="fifth"
          sx={{ width: "140%" }}
          inputProps={{
            style: {
              color: "#a6a6a6",
            },
          }}
        />
        <TextField
          id="Gênero"
          helperText="Gênero"
          value={props.dados.genero}
          focused
          
          size="small"
          color="fifth"
          sx={{ width: "140%" }}
          inputProps={{
            style: {
              color: "#a6a6a6",
            },
          }}
        />
      </div>
      <div className="ConfirmarDados-login">
        <TextField
          id="Email"
          helperText="Email"
          value={props.dados.email}
          focused
          size="small"
          color="fifth"
          sx={{ width: "110%" }}
          inputProps={{
            style: {
              color: "#a6a6a6",
            },
          }}
        />
        <TextField
          id="Senha"
          type={mostrarSenha ? "text" : "password"}
          value={props.dados.senha}
          focused
          size="small"
          color="fifth"
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
              color: "#a6a6a6",
            },
          }}
        />
      </div>
      <div className="ConfirmarDados-buttons">
        <BackButton aoClicar={props.voltarPagina} />
        <LoginButton texto="Finalizar >" status={props.status} size="small" />
      </div>
    </form>
  );
}
export default ConfirmarDados;
