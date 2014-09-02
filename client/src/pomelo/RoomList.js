var RoomList = {};

RoomList.rooms = {};



RoomList.getEmptyRoom = function(){
  var self = this;

  var roomId = 0;
  var hasEmptyRoom = false;

  // 遍历所有房间
  _.find(self.rooms, function(value, key){
    if(value.userIds.length < 3){
      hasEmptyRoom = true;
      roomId = key;
      return true;
    }
  });


  if(!hasEmptyRoom){
    var roomIdsString = _.keys(this.rooms);
    var roomIds = _.map(roomIdsString, function(r){return parseInt(r, 10);});
    if(roomIds.length){
      roomId = _.min(_.difference(_.range(1, 10000), roomIds));
    } else {
      roomId = 1;
    }

    self.rooms[roomId] = {
      roomId: roomId,
      userIds: []
    };
  }
  return roomId;
};



RoomList.getUserIdsByRoomId = function(roomId){
  return this.rooms[roomId].userIds;
};


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


RoomList.joinRoom = function(userId) {
  var roomId = this.getRoomIdByUserId(userId);
  if (!roomId){
    roomId = this.getEmptyRoom();
    this.rooms[roomId].userIds.push(userId);
  }
  return roomId;
};



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