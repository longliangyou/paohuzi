/**
 * Created by Administrator on 2014/9/10.
 */
var UserList = {};
UserList.users = {};


// private
UserList.login = function(user){
    var userId = user.userId;
    this.users[userId] = user;

    return user;
};


// private
UserList.logout = function(userId){
    var user = this.users[userId];
    this.users[userId] = null;

    return user;
};



// public
UserList.getUserByUserId = function(userId){
    var user = this.users[userId];

    return user;
};