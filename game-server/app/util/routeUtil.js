var _ = require("underscore");

var RouteUtil = function(){
  this.$id = "routeUtil";
  this.$dispatcher = null;
};

RouteUtil.prototype.chat = function(session, msg, app, cb) {
  var chatServers = app.getServersByType("chat");

  if (!chatServers || chatServers.length === 0){
    cb(new Error("can not find chat servers."));
    return;
  }

  var res = this.$dispatcher.dispath(session.get("rid"), chatServers);

  cb(null, res.id);
};


RouteUtil.prototype.play = function(session, msg, app, cb) {
  var servers = app.getServersByType("playroom");

  if (!servers || servers.length === 0 || !msg.playroomId){
    cb(new Error("can not find playroom."));
    return;
  }

  server = _.find(servers, function(s) {return s.id == msg.playroomId;});

  if(server){
    cb(null, server.id);
  }else{
    cb(new Error("can not find playroom " + msg.playroomId));
  }

};
module.exports = RouteUtil;