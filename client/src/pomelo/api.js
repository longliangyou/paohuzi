var pomeloApi = {
  pomelo: window.pomelo,
  route: {
    gate: "gate.gateHandler.queryEntry",
    connect: "connector.entryHandler.enter"
  }
};


pomeloApi.conenctGateServer = function(host, port, gateRoute){
  self = this;
  if (gateRoute){
    self.route.gate = gateRoute;
  }

  self.pomelo.init({
    host: host,
    port: port,
    log: true
  }, function(){
    pomelo.request(self.route.gate, function(data){
      console.log(data);
      pomelo.disconnect();
    });
  });

};
