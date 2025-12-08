import dataAtual from "./Tempo.js"


class TempoController{
  static dataAtual = (req,res)=> {
  var answer =  dataAtual()
    res.status(200).json(answer)
  
}



}

export default TempoController