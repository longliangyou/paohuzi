var pomeloApi = {
  pomelo: window.pomelo,
  route: {
    gate: "gate.gateHandler.queryEntry",
    connector: {
      login: "connector.entryHandler.login",
      register: "connector.entryHandler.register"
    }
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
  currentStatus: 0,
  user: {
    uid: "long"
  }
};



pomeloApi.autoTest = function(){
  var self = this;
  self.connectGateServer(self.gateServer.host, self.gateServer.port);
};


// example: pomeloApi.register("long", "111111", callback)
pomeloApi.register = function(username, password, callback){
  var self = this;
  self.pomelo.request(self.route.connector.register, {
    username: username,
    password: password
  }, function(data){
    console.log("#register: ", JSON.stringify(data));
    callback(data);
  })
};


/**
 * login
 *
 * choose one in password and loginToken
 * @param  {
 *   username: "username",
 *   password: "password",
 *   logintoken: "loginToken"
 * }
 *
 * example:
 * pomeloApi.login({username: "long", password: "111111"}, callback)
 * pomeloApi.login({username: "long", loginToken: "lsdjf34u9f0uds0fu"}, callback)
 *
 * @return {data}
 */
pomeloApi.login = function(loginOption, callback) {
  var self = this;
  console.log("Connect Server: ", self.connectServer.host, self.connectServer.port, self.currentStatus);
  if (!self.connectServer.host || !self.connectServer.port || !self.currentStatus){
    return;
  }

  if (loginOption.password){
    option = {
      uid: self.uid,
      username: loginOption.username,
      password: loginOption.password
    }
  } else {
    option = {
      uid: self.uid,
      username: loginOption.username,
      loginToken: loginOption.loginToken
    }
  }

  self.pomelo.request(self.route.connector.login, option, function(data){
    console.log("#login: ", JSON.stringify(data));
    callback(data);
  });
};




pomeloApi.connectGateServer = function(host, port, gateRoute){
  var self = this;
  if (!self.pomelo) {
    self.pomelo = window.pomelo;
  }

  if (gateRoute){
    self.route.gate = gateRoute;
  }

  self.pomelo.init({
    host: host,
    port: port,
    log: true
  }, function(){
    self.pomelo.request(self.route.gate, {uid: self.user.uid}, function(data){
      console.log("#entry", data);
      if (data){
        self.connectServer.host = data.host;
        self.connectServer.port = data.port;
        self.currentStatus = self.status.CONNECTED;
      }
      self.pomelo.disconnect();
      self.pomelo.init({
        host: self.connectServer.host,
        port: self.connectServer.port,
        log: true
      }, function(){
        self.currentStatus = self.status.CONNECTED;
      });
    });
  });
};
