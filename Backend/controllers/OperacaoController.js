import TempoController from "./TempoController.js";
import dataAtual from "./Tempo.js";
import axios from "axios";

class OperacaoController {
  static deposito = async (req, res) => {
    var id = req.body.idConta;
    var valor = req.body.valor;
    var senha = req.body.senha;
    var banco = req.body.banco;

    if (valor <= 0) {
      res.status(400).send({ message: "O valor deve ser positivo" });
      return;
    }

    const request = await axios.get(`http://localhost:3001/Contas`);
    const listaContas = request.data;

    for (var conta in listaContas) {
      if (listaContas[conta].id == id) {
        var contaSelecionada = listaContas[conta];
      }
    }

    if (contaSelecionada._senha != senha) {
      res.status(400).send({ message: "Senha incorreta" });
      return;
    }

    var contas = contaSelecionada.contas;

    for (var indexConta in contas) {
      if (contas[indexConta].banco == banco) {
        contas[indexConta].saldo += valor;
      }
    }

    var transacoes = contaSelecionada._transacoes;
    //Atualização de variáveis
    var novaTransacao = {
      id: crypto.randomUUID(),
      valor: valor,
      tipo: "Depósito",
      banco: banco,
      tipoConta: contaSelecionada.tipo,
      dia: dataAtual().dia,
      hora: dataAtual().hora,
    };
    transacoes = [novaTransacao, ...transacoes];

    contaSelecionada._transacoes = transacoes;
    contaSelecionada.contas = contas;

    //Upload das atualizações
    try {
      await axios.put(
        `http://localhost:3001/Contas/${contaSelecionada.id}`,
        contaSelecionada
      );

      res.status(200).send({
        message: "Operação realizada com sucesso.",
      });
    } catch {
      res.status(500).send({ message: "Erro ao realizar operação" });
    }
  };

  static transferencia = async (req, res) => {
    var idOrigem = req.body.idOrigem;
    var numDestino = req.body.numDestino;
    var valor = req.body.valor;
    var senha = req.body.senha;
    var banco = req.body.banco;

    if (valor <= 0) {
      res.status(400).send({ message: "O valor deve ser positivo" });
      return;
    }

    const request = await axios.get(`http://localhost:3001/Contas`);
    const listaContas = request.data;

    for (var conta in listaContas) {
      if (listaContas[conta].id == idOrigem) {
        var contaOrigem = listaContas[conta];
      }
    }

    for (var conta in listaContas) {
      if (listaContas[conta]._numeroConta == numDestino) {
        var contaDestino = listaContas[conta];
      }
    }
    if (contaDestino == undefined) {
      res.status(400).send({ message: "A conta de destino não existe." });
      return;
    }

    if (contaOrigem._senha != senha) {
      res.status(400).send({ message: "Senha incorreta" });
      return;
    }

    var transacoesOrigem = contaOrigem._transacoes;
    //Atualização de variáveis

    var tipoContaSelecionada;

    var contasOrigem = contaOrigem.contas;
    for (var indexConta in contasOrigem) {
      if (contasOrigem[indexConta].banco == banco) {
        contasOrigem[indexConta].saldo -= valor;
      }
    }

    var novaTransacao = {
      id: crypto.randomUUID(),

      tipoConta: "jurídica",
      valor: valor,
      tipo: "Transferência Realizada",
      dia: dataAtual().dia,
      hora: dataAtual().hora,
      banco: banco,
    };
    transacoesOrigem = [novaTransacao, ...transacoesOrigem];

    contaOrigem._transacoes = transacoesOrigem;
    contaOrigem.contas = contasOrigem;

    var saldoDestino = contaDestino._saldo;

    var contasDestino = contaDestino.contas;
    contasDestino[0].saldo -= valor;

    var transacoesDestino = contaDestino._transacoes;
    //Atualização de variáveis
    saldoDestino = saldoDestino + valor;
    var novaTransacao = {
      id: crypto.randomUUID(),

      tipoConta: "jurídica",
      valor: valor,
      tipo: "Transferência Recebida",
      dia: dataAtual().dia,
      hora: dataAtual().hora,
      banco: contasDestino[0].banco,
    };
    transacoesDestino = [novaTransacao, ...transacoesDestino];

    contaDestino._transacoes = transacoesDestino;
    contaDestino.contas = contasDestino;

    //Upload das atualizações
    try {
      await axios.put(
        `http://localhost:3001/Contas/${contaOrigem.id}`,
        contaOrigem
      );
      await axios.put(
        `http://localhost:3001/Contas/${contaDestino.id}`,
        contaDestino
      );

      res.status(200).send({
        message: "Operação realizada com sucesso.",
      });
    } catch {
      res.status(500).send({ message: "Erro ao realizar operação" });
    }
  };
}

export default OperacaoController;
