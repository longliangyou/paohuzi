var bearcat = require("bearcat");
var pomelo = require('pomelo');
var _ = require("underscore");

var ConnectorHandler = function() {
  this.$id = "connectorHandler";
  this.$userDao = null;
  this.app = pomelo.app;
};

/**
 * New client login chat server.
 *
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next stemp callback
 * @return {Void}
 */
ConnectorHandler.prototype.login = function(msg, session, next) {
  console.log("login");
	var self = this;
	var uid = msg.uid;
	var sessionService = self.app.get('sessionService');


	session.bind(uid);
	session.on('closed', onUserLeave.bind(null, self.app));

  var servers = this.app.getServersByType('playroom');

  servers = _.map(servers, function(s){
    return _.pick(s, "id", "name");
  });

  this.$userDao.getUserInfo(uid, function(error, user){
    next(null, {code: 200, user: user, servers: servers, msg: "login success! "});
  });

};


/**
 * User log out handler
 *
 * @param {Object} app current application
 * @param {Object} session current session object
 *
 */
var onUserLeave = function(app, session) {
	if(!session || !session.uid) {
		return;
	}
	app.rpc.chat.chatRemote.kick(session, session.uid, app.get('serverId'), session.get('rid'), null);
};


module.exports = function() {
  return bearcat.getBean(ConnectorHandler);
};