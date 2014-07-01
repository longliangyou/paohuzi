var PomeloApi = function(){
  var pomelo = window.pomelo;

  var route = {
    gate: "gate.gateHandler.queryEntry",
    connect: "connector.entryHandler.enter"
  };

  console.log("hello pomeloApi!");

  this.connectGateServer = function (host, port, gr){
    if (gr){
      route.gate = gr;
    }
    pomelo.init({
      host: host,
      port: port,
      log: true
    }, function(){
      pomelo.request(route.gate, function(data){
        pomelo.disconnect();
      });
    });
  };
  return this;
};