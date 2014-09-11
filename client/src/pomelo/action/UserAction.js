/**
 * UserAction.js
 * 用户的相关action
 * Created by Administrator on 2014/8/29.
 */
var UserAction = {


    /**
     * 创建用户
     */
    createUser:function(userId,nickName,gold,isNpc){
        var isNpc = isNpc;
        var user = {
            userId:userId,
            nickName:nickName,
            gold:gold,
            avatarImageName:"res/avatar/avatar1.png",
            isNpc:isNpc
        }
        UserList.login(user);
        return user;
    },




    /**
     * 创建一个虚拟的npc用户
     * @param userId
     */
    createNpcUser:function(){
      // 1. 生成玩家数据
      var userId = Math.random();
      var nickName = "nickName_ " + userId;
      var user = this.createUser(userId,nickName,2000,true);
      return user;
    }
};
