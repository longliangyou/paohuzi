var crc = require("crc");

var Dispatcher = function() {
  this.$id = "dispatcher";
};

Dispatcher.prototype.dispatch = function(uid, connectors) {
  var index = Math.abs(crc.crc32(uid)) % connectors.length;
  console.log("user : " + uid + " diapatch to " + index);
  return connectors[index];
};

module.exports = Dispatcher;