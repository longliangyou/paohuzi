/**
 * UserAction.js
 * 用户的相关action
 * Created by Administrator on 2014/8/29.
 */
var UserAction = {


    /**
     * 创建用户
     */
    createUser:function(userId,nickName){
        var isNpc = false;
        var user = {
            userId: userId,
            nickName: nickName,
            isNpc: isNpc
        };
    },




    /**
     * 创建一个虚拟的npc用户
     * @param userId
     */
    createNpcUser:function(){
      // 1. 生成玩家数据
      var userId = Math.random();
      var nickName = "nickName_ " + userId;
      var user = {
          userId: userId,
          nickName: nickName,
          isNpc: true
      };
    }
};
