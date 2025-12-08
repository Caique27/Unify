function dataAtual(){
    var getData = new Date();
  
    var day = `${getData.getDate()<10?
      `0${getData.getDate()}`
      :getData.getDate()
    }/${
      getData.getMonth() <9?
      `0${getData.getMonth()+1}`:
      getData.getMonth()
    }/${getData.getFullYear()}`;
  
    var minutos = String(
      getData.getMinutes() < 10
        ? "0" + getData.getMinutes()
        : getData.getMinutes()
    );
  
    var time = String(getData.getHours() + ":" + minutos);
    var answer = { dia: String(day), hora: String(time) }
    return answer
      
    
  }
export default dataAtual