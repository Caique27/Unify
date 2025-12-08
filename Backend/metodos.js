import Time from "./Time.js";
export default class Conta {
  // static listaContas = [];
  constructor(numeroConta, nomeCliente, senha, saldo) {
    this._numeroConta = numeroConta;
    this._nomeCliente = nomeCliente;
    this._senha = senha;
    this._saldo = saldo;
    this.agencia = "0001";
    this._transacoes = [];
    //   Conta.listaContas.push(this);
  }
  get numeroConta() {
    return this._numeroConta;
  }
  get nomeCliente() {
    return this._nomeCliente;
  }
  get saldo() {
    return this._saldo;
  }
  sacar(valor, destino) {
    if (this.saldo > valor && valor > 0) {
      this._saldo -= valor;
    }
    if (destino == "saque") {
      this._transacoes.push({
        valor: valor,
        tipo: "Saque",
        dia: Time()[0],
        hora: Time()[1],
      });
    }
  }
  depositar(valor, fonte) {
    if (valor > 0) {
      this._saldo += valor;
    }
    this._transacoes.push({
      valor: valor,
      tipo: fonte == "deposito" ? "Depósito" : "Transferência Recebida",
      dia: Time()[0],
      hora: Time()[1],
    });
  }
  transferir(valor, conta) {
    this.sacar(valor, "transferencia");
    conta.depositar(valor, "transferencia");
    this._transacoes.push({
      valor: valor,
      tipo: "Transferência Realizada",
      dia: Time()[0],
      hora: Time()[1],
      beneficiario: conta.nomeCliente,
    });
  }
}
var conta1 = new Conta(3413, "Joao", 1234, 1000);
var conta2 = new Conta(2343, "Maria", 1234, 3000);

