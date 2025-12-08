import React from "react";
import "./Extrato.css";
import Operacao from "../../components/Operacao/Operacao.jsx";
function Extrato({ data, complete }) {
  return (
    <div className="Extrato-div">
      <section className="Extrato-box">
        {data.map((operacao) => (
          <Operacao dados={operacao} complete={complete} />
        ))}
      </section>
    </div>
  );
}
export default Extrato;
