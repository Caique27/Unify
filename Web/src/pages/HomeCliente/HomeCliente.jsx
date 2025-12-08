import React, { useState, useContext, useEffect } from "react";
import "./HomeCliente.css";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import {
  Tabs,
  Tab,
  Box,
  Step,
  Stepper,
  StepLabel,
  Alert,
  Snackbar,
} from "@mui/material";
import MinhaConta from "../../components/MinhaConta/MinhaConta";
import Extrato from "../../components/Extrato/Extrato";
import Operacoes from "../../components/Operacoes/Operacoes";
import Saldos from "../../components/Saldos/Saldos";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { busca } from "../../axios/api.js";

function HomeCliente() {
  const [dados, setDados] = useState({
    _saldo: 0,
    _nomeCliente: "...",
    _transacoes: [],
    contas: [],
  });
  const { conta } = useParams();
  const [id, setId] = useState(0);
  //const []
  //async function initialRequest(){
  //  setDados(await buscaDados.dados(conta))
  //}
  //initialRequest()//Requisição inicial de dados da API para exibição
  const [snackbar, setSnackbar] = useState({
    open: false,
    text: "",
    severity: "error",
  });
  const handleClose = () => {
    setSnackbar({
      open: false,
      text: "",
      severity: "error",
    });
  };

  async function buscaDados(conta) {
    var id = (await busca(`/buscaId/${conta}`)).id;
    setId(id);

    var dados = await busca(`/contas/${id}`);

    console.log(await dados);
    return dados;
  }

  useEffect(() => {
    setInterval(async () => setDados(await buscaDados(conta)), 10000);
  }, []);
  useEffect(() => {
    setTimeout(async () => setDados(await buscaDados(conta)), 0);
  }, []);

  const theme = useTheme();

  const [value, setValue] = useState(0);
  const menus = [
    <MinhaConta
      data={{ contas: dados.contas, id: id, dados_extrato: dados._transacoes }}
      mostraExtrato={() => {
        setValue(1);
      }}
      mostraOperacoes={() => {
        setValue(2);
      }}
    />,
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Saldos data={dados.contas} />
      <Extrato data={dados._transacoes} complete />
    </div>,
    <Operacoes setSnackbar={setSnackbar} id={id} contas={dados.contas} />,
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <main className="HomeCliente-page">
      <Header nome={dados._nomeCliente} />
      <section className="HomeCliente-content">
        <Box
          sx={{
            width: "100%",
            borderBottom: 2,
            borderColor: "divider",
            height: "85vh",
          }}
        >
          <Box>
            <Tabs
              sx={{ borderBottom: 0.5, borderColor: "divider" }}
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="primary"
              centered
            >
              <Tab
                label="Minha Conta"
                disableRipple
                sx={{
                  fontFamily: "proxima nova",
                  fontSize: "110%",
                  marginRight: "5%",
                }}
              />
              <Tab
                label="Extrato"
                disableRipple
                sx={{
                  fontFamily: "proxima nova",
                  fontSize: "110%",
                }}
              />
              <Tab
                label="Operações"
                disableRipple
                sx={{
                  fontFamily: "proxima nova",
                  fontSize: "110%",
                  marginLeft: "5%",
                }}
              />
            </Tabs>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
            >
              <div className="HomeCliente-menu">{menus[0]}</div>
              <div className="HomeCliente-menu">{menus[1]}</div>
              <div className="HomeCliente-menu">{menus[2]}</div>
            </SwipeableViews>
          </Box>
        </Box>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            variant="filled"
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.text}
          </Alert>
        </Snackbar>
      </section>
    </main>
  );
}
export default HomeCliente;
