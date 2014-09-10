/**
 * RoomAction.js
 * 服务器 房间相关的处理
 * Created by Administrator on 2014/8/29.
 */
var RoomAction = {

    // 1. 查找 room list，查找空房间加入，如果没有空房间，新建房间。
    // 2. 当前玩家人数为 1 人。创建round，创建定时器，定时加入NPC。
    // 3. 当前玩家人数为 2 人。开局游戏。
    // 4. 玩家数据保存到 round。
    joinRoom: function(userId, roomId, callBack){
      // 1. 查找 room list，查找空房间加入，如果没有空房间，新建房间。
      // 2. 当前玩家人数为 1 人。创建round，创建定时器，定时加入NPC。
      // 3. 当前玩家人数为 2 人。开局游戏。
      // 4. 玩家数据保存到 round。
      var user = UserList.getUserByUserId(userId)
      roomId = RoomList.joinRoom(user, roomId);


      // 发消息通知其他玩家加入房间
      var joinRoomEvent = {
        cmd:CardUtil.ServerNotify.onJoinRoom,
        data:{
          user: user
        }
      };
      ServerNotifyManager.sendCmdResponse(joinRoomEvent);


      if (RoomList.isFull(roomId)){
        RoundAction.newRound(roomId, callback);
        RoomList.clearTimeout(roomId);
      } else {
        RoundList.setTimeout(roomId, setTimeOut(function(){
          RoomAction.joinRoom(UserAction.createNpcUser(), roomId, function(){});
        }, 5*1000));
      }

      // CardUtil.ServerNotify.onJoinRoom:
      if (_.isFunction(callback)) {
        callback();
      }
    },



    joinPrivateRoom: function(user, roomId, password, callback) {
      if(RoomLisst.joinPrivateRoom(user, roomId, password))
      {
        // 发消息通知其他玩家加入房间
        var joinRoomEvent = {
          cmd:CardUtil.ServerNotify.onJoinRoom,
          data:{
            user: user
          }
        };
        ServerNotifyManager.sendCmdResponse(joinRoomEvent);


        if(roomList.isFull(roomId)){
          RoundAction.newRound(roomId, callback);
        }
      }

      if (_.isFunction(callback)) {
        callback();
      }
    },


    createRoom: function(user, password, callback){

    }
};