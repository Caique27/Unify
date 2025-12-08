import React, { useState } from "react";
import "./Operacao.css";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { Checkbox } from "@mui/material";
import Image from "../../assets/img/LogoItau.png";
import Image2 from "../../assets/img/LogoNubank.png";
import Image3 from "../../assets/img/LogoBTG.png";

function Operacao({ dados, complete }) {
  //   const[Icone,setIcone] = useState(<CallMadeIcon color="third" fontSize="large"/>)
  var Icone = <CallMadeIcon color="third" fontSize="large" />;
  var Cor = "Cor-verde";
  if (dados.tipo == "Depósito") {
    Icone = <CallMadeIcon color="third" fontSize="large" />;
    Cor = "Cor-verde";
  } else if (dados.tipo == "Transferência Realizada") {
    Icone = <CompareArrowsIcon color="error" fontSize="large" />;

    Cor = "Cor-vermelho";
  } else if (dados.tipo == "Transferência Recebida") {
    Icone = <CompareArrowsIcon color="third" fontSize="large" />;
    Cor = "Cor-verde";
  }
  return (
    <section className="Operacao-section">
      <div className="Operacao-descricao">
        <div className="Operacao-icone">{Icone}</div>
        <div className="Operacao-info">
          <p className="Operacao-tipo">{dados.tipo}</p>

          <div className="Operacao-banco">
            {dados.banco == "Itaú" ? (
              <img
                src={Image}
                alt="Logo"
                className="Operacao-logo"
                width={20}
              />
            ) : dados.banco == "Nubank" ? (
              <img
                src={Image2}
                alt="Logo"
                className="Operacao-logo"
                width={20}
              />
            ) : (
              <img
                src={Image3}
                alt="Logo"
                className="Operacao-logo"
                width={20}
              />
            )}
            <p className="Operacao-banconome">
              {dados.banco} - Pessoa {dados.tipoConta}
            </p>
          </div>
          <div className="Operacao-time">
            <p className="Operacao-data">{dados.dia}</p>
            <p className="Operacao-hora">{dados.hora}</p>
            <div className="Operacao-negocio">
              {complete ? (
                <>
                  <p> Negócio</p>
                  <Checkbox
                    defaultChecked
                    color="success"
                    sx={{ marginLeft: "2%", marginTop: "-1.7vh" }}
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className={`Operacao-valor ${Cor}`}>
        <p className="Operacao-valor">
          R$ {Cor == "Cor-vermelho" ? "-" : ""} {dados.valor.toFixed(2)}{" "}
        </p>
      </div>
    </section>
  );
}
export default Operacao;
