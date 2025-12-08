import React, { useState, useContext } from "react";
import {
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./DadosPessoais.css";
import LoginButton from "../LoginButton/LoginButton.jsx";
import Validacao from "../../contexts/Validacao.js";
import { useHistory } from "react-router-dom";
function DadosPessoais(props) {
  const history = useHistory();
  const [buttonStatus, setButtonStatus] = useState("waiting");

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [idade, setIdade] = useState("");
  const [genero, setGenero] = useState("Masculino");

  const [errosNome, setErrosNome] = useState({ valido: true, texto: "" });
  const [errosSobrenome, setErrosSobrenome] = useState({
    valido: true,
    texto: "",
  });
  const [errosIdade, setErrosIdade] = useState({ valido: true, texto: "" });

  var emptyFields = nome == "" || sobrenome == "" || idade == "";
  var noErrors = errosNome.valido && errosSobrenome.valido && errosIdade.valido;
  const validacoes = useContext(Validacao);
  function checarCampo(id, func, value) {
    //teste preenchimento
    if (id == "Idade") {
      func(validacoes.numero(value));
    } else {
      func(validacoes.preenchimento(value));
    }
  }
  function finalCheck() {
    checarCampo("Nome", setErrosNome, nome);
    checarCampo("Sobrenome", setErrosSobrenome, sobrenome);
    checarCampo("Idade", setErrosIdade, idade);
  }
  function avancar() {
    setButtonStatus("loading");

    if (emptyFields) {
      setTimeout(() => {
        setButtonStatus("waiting");
      }, 500);

      finalCheck();
    } else if (buttonStatus == "waiting" && noErrors) {
      props.atualizar({
        nome: nome.charAt(0).toUpperCase() + nome.slice(1),
        sobrenome: sobrenome,
        idade: idade,
        genero: genero,
      });

      setButtonStatus("waiting");

      props.proximaPagina();
    } else {
      setTimeout(() => {
        setButtonStatus("waiting");
      }, 500);
    }
  }

  return (
    <form
      className="DadosPessoais-form"
      onSubmit={(event) => {
        //   autenticar(event);
        event.preventDefault();

        avancar();
      }}
    >
      <div className="DadosPessoais-nome">
        <TextField
          onBlur={(event) => checarCampo(event.target.id, setErrosNome, nome)}
          id="Nome"
          label="Nome"
          value={nome}
          onChange={(event) => {
            setNome(event.target.value);
          }}
          helperText={errosNome.texto}
          variant="outlined"
          margin="normal"
          autoComplete="off"
          error={!errosNome.valido}
          color={errosNome.valido ? "third" : "error"}
          focused
          disabled={buttonStatus == "loading" ? true : false}
          sx={{ width: "140%" }}
          inputProps={{
            style: {
              height: "1.7rem",
            },
          }}
        />
        <TextField
          onBlur={(event) =>
            checarCampo(event.target.id, setErrosSobrenome, sobrenome)
          }
          id="Sobrenome"
          label="Sobrenome"
          value={sobrenome}
          onChange={(event) => {
            setSobrenome(event.target.value);
          }}
          helperText={errosSobrenome.texto}
          variant="outlined"
          margin="normal"
          autoComplete="off"
          error={!errosSobrenome.valido}
          color={errosSobrenome.valido ? "third" : "error"}
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

      <div className="DadosPessoais-info">
        <TextField
          onBlur={(event) => checarCampo(event.target.id, setErrosIdade, idade)}
          id="Idade"
          label="Idade"
          helperText={errosIdade.texto}
          value={idade}
          onChange={(event) => {
            setIdade(event.target.value);
          }}
          variant="outlined"
          margin="none"
          error={!errosIdade.valido}
          color={errosIdade.valido ? "third" : "error"}
          focused
          disabled={buttonStatus == "loading" ? true : false}
          InputProps={{
            style: {
              marginBottom: "0.01%",
              height: "90%",
              width: "110%",
            },

            form: {
              autocomplete: "off",
            },
          }}
        />
        <div className="DadosPessoais-genero">
          <FormLabel>
            <Typography sx={{ fontSize: "80%", color: "#07cf00" }}>
              Gênero
            </Typography>
          </FormLabel>
          <RadioGroup
            onChange={(event) => {
              setGenero(event.target.value);
            }}
            aria-label="gender"
            defaultValue="Masculino"
            name="radio-buttons-group"
            row
          >
            <FormControlLabel
              value="Masculino"
              control={<Radio />}
              label="Masculino"
              key={"masculino"}
            />
            <FormControlLabel
              value="Feminino"
              control={<Radio />}
              label="Feminino"
              key={"feminino"}
            />
            <FormControlLabel
              value="Outro"
              control={<Radio />}
              label="Outro"
              key={"Outro"}
            />
          </RadioGroup>
        </div>
      </div>

      <LoginButton texto="Próximo >" status={buttonStatus} />
      <div
        className="DadosPessoais-link"
        onClick={() => {
          history.replace(`/`);
        }}
      >
        Voltar a página de Login
      </div>
      <div id="margin">.</div>
    </form>
  );
}
export default DadosPessoais;
