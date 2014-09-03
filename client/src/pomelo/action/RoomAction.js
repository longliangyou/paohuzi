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
    joinRoom: function(user, callBack){
      // 1. 查找 room list，查找空房间加入，如果没有空房间，新建房间。
      // 2. 当前玩家人数为 1 人。创建round，创建定时器，定时加入NPC。
      // 3. 当前玩家人数为 2 人。开局游戏。
      // 4. 玩家数据保存到 round。
      var roomId = RoomList.joinRoom(user.userId);
      user.roomId = roomId;



      if (_.isFunction(callback)) {
        callback();
      }
    }
};