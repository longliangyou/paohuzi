var userDao = function() {
  this.$id = "userDao";
};

// TODO
userDao.prototype.getUserInfo = function(uid, callback) {
  callback(null, {uid: uid});
};

module.exports = userDao;