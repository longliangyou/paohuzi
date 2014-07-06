var bearcat = require("bearcat");
var pomelo = require('pomelo');

var ConnectorHandler = function() {
  this.$id = "connectorHandler";
  this.app = pomelo.app;
};

/**
* New client register.
*
*
* @param  {Object}   msg     request message
* @param  {Object}   session current session object
* @param  {Function} next    next stemp callback
* @return {Void}
*/
ConnectorHandler.prototype.register = function(msg, session, next) {
  var self = this;
  var rid = msg.rid;
  var uid = msg.username + '*' + rid;
  var username = msg.username;
  var password = msg.password;

  // TODO 2. register
  if (username === "test" || !password){
    next(null, {code: 500, error: true});
    return;
  }
  next(null, {code: 200, token: "loginToken"});
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
	var self = this;
	var rid = msg.rid;
	var uid = msg.username + '*' + rid
	var sessionService = self.app.get('sessionService');

  var username = msg.username;
  var password = msg.password;

	//duplicate log in
	if( !! sessionService.getByUid(uid)) {
		next(null, {
			code: 500,
			error: true
		});
		return;
	}

  // TODO 1. auth
  if (username !== "long" || password !== "123456"){
    next(null, {code: 500, error: true});
    return;
  }

  console.log("#login: passwd auth");

	session.bind(uid);
	session.set('rid', rid);
	session.push('rid', function(err) {
		if(err) {
			console.error('set rid for session service failed! error is : %j', err.stack);
		}
	});
	session.on('closed', onUserLeave.bind(null, self.app));
  next(null, {code: 200, error: false});

  console.log("#login: end");

	//put user into channel
//	self.app.rpc.chat.chatRemote.add(session, uid, self.app.get('serverId'), rid, true, function(users){
//		next(null, {
//			users:users
//		});
//	});
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