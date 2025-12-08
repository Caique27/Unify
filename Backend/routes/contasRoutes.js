import express from "express";
import ContaController from "../controllers/contasController.js";
import TempoController from "../controllers/TempoController.js";
import OperacaoController from "../controllers/OperacaoController.js";
const router = express.Router();
router
  .get("/contas", ContaController.listarContas)
  .get("/contas/:id", ContaController.listarContaPorId)
  .get("/buscaId/:conta", ContaController.buscaID)
  .get("/tempo", TempoController.dataAtual)
  .post("/contas", ContaController.cadastrarConta)
  .put("/autenticar", ContaController.autenticacao)
  .put("/deposito", OperacaoController.deposito)
  .put("/transferencia", OperacaoController.transferencia);
//.delete("/contas/:id", ContaController.excluirConta);

export default router;
