var pomeloApi = {
  pomelo: window.pomelo,
  route: {
    gate: "gate.gateHandler.queryEntry",
    connect: "connector.entryHandler.enter"
  },
  gateServer: {
    host: "127.0.0.1",
    port: "3014"
  },
  connectServer: {
    host: "",
    port: ""
  },
  status: {
    IDLE: 0,
    CONNECTED: 1
  },
  currentStatus: 0
};


pomeloApi.autoTest = function(){
  self = this;
  self.connectGateServer(self.gateServer.host, self.gateServer.port);

}

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
      if (data){
        self.connectServer.host = data.host;
        self.connectServer.port = data.port;
        self.currentStatus = self.status.CONNECTED;
      }
      pomelo.disconnect();
    });
  });

};
