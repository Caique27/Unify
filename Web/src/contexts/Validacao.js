import React from "react";
const Validacoes = React.createContext({
  numero: checarNumero,
  preenchimento: checarPreenchimento,
});
function checarNumero(dados) {
  if (checarPreenchimento(dados).valido) {
    var isString = isNaN(dados);
    if (isString) {
      return { valido: false, texto: "*Deve ser um número" };
    }

    return { valido: true, texto: "" };
  } else {
    return { valido: false, texto: "*Campo obrigatório" };
  }
}
function checarPreenchimento(dados) {
  if (dados == "") {
    return { valido: false, texto: "*Campo obrigatório" };
  }
  return { valido: true, texto: "" };
}
export default Validacoes;
