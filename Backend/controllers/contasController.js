import axios from "axios";

class ContaController {
  static listarContas = async (req, res) => {
    const request = await axios.get(`http://localhost:3001/Contas`);
    const contas = request.data;
    res.status(200).json(contas);
  };

  static listarContaPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const request = await axios.get(`http://localhost:3001/Contas/${id}`);
      const conta = request.data;

      res.status(200).json(conta);
    } catch {
      res.status(400).send({
        message: `Conta não existe`,
      });
    }
  };

  static buscaID = async (req, res) => {
    const conta = req.params.conta;
    const request = await axios.get(`http://localhost:3001/Contas`);
    const contaslist = request.data;

    for (var c in contaslist) {
      if (contaslist[c]._numeroConta == conta) {
        res.status(200).send({ id: contaslist[c].id });

        return;
      }
    }
    res.status(500).send({ erro: "conta não existe" });
    return;
  };

  static autenticacao = async (req, res) => {
    var login = req.body.login;
    var senha = req.body.senha;
    var agencia = req.body.agencia;
    const request = await axios.get(`http://localhost:3001/Contas`);
    const listaContas = request.data;
    var clienteExiste = false;

    for (var conta in listaContas) {
      if (listaContas[conta]._numeroConta == login) {
        clienteExiste = true;
        var contaSelecionada = listaContas[conta];
      }
    }
    if (clienteExiste && agencia == "0001") {
      var senhaCorreta = contaSelecionada._senha == senha;
      if (senhaCorreta) {
        res.status(200).send({ Autenticado: true, erro: "" });
      } else {
        res.status(200).send({
          Autenticado: false,
          erro: "senha incorreta",
        });
      }
    } else {
      res.status(200).send({
        Autenticado: false,
        erro: "*Conta não existe",
      });
    }
  };
  static cadastrarConta = async (req, res) => {
    const request = await axios.get(`http://localhost:3001/Contas`);
    const listaContas = request.data;

    var numeros = [];
    for (var c in listaContas) {
      numeros.push(listaContas[c]._numeroConta);
    }

    var num = Math.floor(Math.random() * 9999) + 1;
    while (numeros.includes(num)) {
      num = Math.floor(Math.random() * 9999) + 1;
    }

    let novaConta = { _numeroConta: num, ...req.body };

    try {
      await axios.post(`http://localhost:3001/Contas`, novaConta);
      res.status(200).send({
        message: "Conta criada com sucesso",
        info: num,
      });
    } catch {
      res.status(500).send({
        message: `${err.message} - falha ao criar conta.`,
      });
    }
  };

  //static excluirConta = (req, res) => {
  //const id = req.params.id;
  //contas.findByIdAndDelete(id, (err) => {
  //if (!err) {
  //res.status(200).send({ message: "Conta removida com sucesso" });
  //} else {
  //res.status(500).send({ message: err.message });
  //}
  //});
  //};
}

export default ContaController;
