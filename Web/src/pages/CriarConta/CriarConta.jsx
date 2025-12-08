import React, { useState } from "react";
import "./CriarConta.css";
import Image from "../../assets/img/Logo2.png";
import { Typography, Box, Tabs, Tab, Alert, Snackbar } from "@mui/material";
import Stepper from "../../components/Stepper/Stepper.jsx";
import SwipeableViews from "react-swipeable-views";
import DadosPessoais from "../../components/Cadastro/DadosPessoais.jsx";
import DadosLogin from "../../components/Cadastro/DadosLogin.jsx";
import ConfirmarDados from "../../components/Cadastro/ConfirmarDados.jsx";
import Feedback from "../../components/Cadastro/Feedback.jsx";
import { useTheme } from "@mui/material/styles";
import { adicionar, busca } from "../../axios/api.js";
function CriarConta() {
  const theme = useTheme();
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [dadosColetados, setDados] = useState({});
  const [buttonStatus, setButtonStatus] = useState("waiting");
  const [numeroFeedback, setNumeroFeedback] = useState();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const componenteConfirmacao = (
    <ConfirmarDados
      voltarPagina={anterior}
      registrarConta={registrarConta}
      status={buttonStatus}
      dados={dadosColetados}
      key={2}
    />
  );
  const pages = [
    <DadosPessoais proximaPagina={proximo} atualizar={atualizar} key={0} />,
    <DadosLogin
      voltarPagina={anterior}
      proximaPagina={proximo}
      atualizar={atualizar}
      key={1}
    />,
    etapaAtual == 2 ? componenteConfirmacao : <h1 key={2}>confirmacao</h1>,
    <Feedback numeroConta={numeroFeedback} key={3} />,
  ];
  function proximo() {
    if (etapaAtual < 3) {
      setEtapaAtual(etapaAtual + 1);
    }
  }
  function anterior() {
    if (etapaAtual > 0) {
      setEtapaAtual(etapaAtual - 1);
    }
  }
  function atualizar(dados) {
    //console.log(data[0]);

    if (etapaAtual == 0) {
      setDados({ ...dadosColetados, ...dados });
    } else if (etapaAtual == 1) {
      setDados({ ...dadosColetados, ...dados });
    }
  }

  async function formatarConta() {
    return {
      _nomeCliente: dadosColetados.nome,
      genero: dadosColetados.genero,
      _senha: dadosColetados.senha,
      contas: [],
      agencia: "0001",
      _transacoes: [],
    };
  }

  async function registrarConta() {
    setButtonStatus("loading");
    try {
      const contaFormatada = await formatarConta();
      var numeroConta = (await adicionar("/contas", contaFormatada)).info;
      setNumeroFeedback(numeroConta);

      proximo();
    } catch {
      console.log("erro");
      setOpen(true);
      setTimeout(() => {
        setButtonStatus("waiting");
      }, 2500);
    }
  }
  return (
    <section className="CriarConta-page">
      <header className="CriarConta-header">
        <img src={Image} alt="Logo" className="CriarConta-logo" />
        <h1 className="CriarConta-nome">Unify</h1>
      </header>

      <div className="CriarConta-box">
        <Box>
          <Tabs
            sx={{ borderBottom: 0.5, borderColor: "divider" }}
            value={0}
            variant="fullWidth"
            textColor="secondary"
            indicatorColor="primary"
          >
            <Tab
              label="Criar Conta"
              disableRipple
              sx={{
                fontFamily: "proxima nova",
                fontSize: "110%",
              }}
            />
          </Tabs>
        </Box>
        <Stepper currentStep={etapaAtual} />
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={etapaAtual}
        >
          {pages}
        </SwipeableViews>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
            Falha ao criar conta. Tente novamente mais tarde.
          </Alert>
        </Snackbar>
      </div>
    </section>
  );
}

export default CriarConta;
