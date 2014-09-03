// public methods
// 1. 加入房间
//   自动选房间：RoomList.joinRoom(userId);
//   加入私人房间: RoomList.joinPrivateRoom(userId, roomId, password);
// 2. 创建私人房间
//   RoomList.createPrivateRoom(userId, password);
// 3. 离开房间
//   RoomList.leaveRoom(userId);

// 4. 工具函数
//   4.1 RoomList.getRoomIdByUserId(userId);
//   4.2 RoomList.getUserIdsByRoomId(roomId);


var RoomList = {};
RoomList.rooms = {};


// private
RoomList.getEmptyRoom = function(){
  var self = this;

  var roomId = 0;
  var hasEmptyRoom = false;

  // 遍历所有房间
  _.find(self.rooms, function(value, key){
    if(value.userIds.length < 3 && !value.password){
      hasEmptyRoom = true;
      roomId = key;
      return true;
    }
  });

  if(!hasEmptyRoom){
    roomId = self.createRoom();
  }
  return roomId;
};


// private
// 获取新的房间 roomId
// 新的 roomId 必须不同于已有房间的 roomId
RoomList.getNewRoomId = function(){
  var roomId = 0;
  var roomIdsString = _.keys(this.rooms);
  var roomIds = _.map(roomIdsString, function(r){return parseInt(r, 10);});
  if(roomIds.length){
    var leftRooms = _.difference(_.range(1, 10000), roomIds);
    if(leftRooms.length){
      roomId = _.min(leftRooms);
    } else {
      return -1;
    }
  } else {
    roomId = 1;
  }
  return roomId;
};


// private
// 创建公共房间
// 公共房间的密码为 ''
RoomList.createRoom = function(){
  var roomId = this.getNewRoomId();
  if(roomId > 0){
    self.rooms[roomId] = {
      roomId: roomId,
      userIds: [],
      password: ''
    };
  }
  return roomId;
};


// public
// 创建私人房间
// 密码不能为空
RoomList.createPrivateRoom = function(userId, password){
  if (!password){
    return -1;
  }
  var roomId = this.getNewRoomId();
  if(roomId > 0){
    self.rooms[roomId] = {
      roomId: roomId,
      userIds: [userId],
      password: password
    };
  }
  return roomId;
};



// public
RoomList.getUserIdsByRoomId = function(roomId){
  return this.rooms[roomId].userIds;
};



// public
RoomList.getRoomIdByUserId = function(userId){
  var roomId = 0;
  _.find(this.rooms, function(value, key){
    if (_.contains(value.userIds, userId)){
      roomId = key;
      return true;
    }
  });
  return roomId;
};



// public
// 用户加入私人房间
// 如果用户已经加入其他房间，则返回其它房间。
// 必须先退出其它房间，才能加入新房间。
RoomList.joinPrivateRoom = function(userId, roomId, password) {
  if (!this.getRoomIdByUserId(userId)){
    if (this.rooms[roomId] && this.rooms[roomId].password === password && this.rooms[roomId].users.length < 3){
      this.rooms[roomId].usersIds.push(userId);
      return true;
    }
  } else {
    return true;
  }
  return false;
};



// public
// 加入公共房间
// 必须先退出其它房间，才能加入新房间。
// 1. 检查用户是否已经加入了房间，如果已经加入了，则返回加入了的房间号。
// 2. 否则获取空房间，加入空房间。
RoomList.joinRoom = function(userId) {
  var roomId = this.getRoomIdByUserId(userId);
  if (!roomId){
    roomId = this.getEmptyRoom();
    this.rooms[roomId].userIds.push(userId);
  }
  return roomId;
};



// public
// 玩家离开房间
// 如果离开的房间当前玩家数为0，则释放房间。
RoomList.leaveRoom = function(userId){
  var roomId = this.getRoomIdByUserId(userId);
  if (roomId){
    this.rooms[roomId].userIds = _.difference(this.rooms[roomId].userIds, [userId]);
    if (this.rooms[roomId].userIds.length === 0){
      delete this.rooms[roomId];
    }
  }
  return true;
};