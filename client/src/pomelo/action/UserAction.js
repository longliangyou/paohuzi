/**
 * UserAction.js
 * 用户的相关action
 * Created by Administrator on 2014/8/29.
 */
var UserAction = {
    /**
     * 创建一个虚拟的npc用户
     * @param userId
     */
    createNpcUser:function(){
      // 1. 生成玩家数据
      var userId = Math.random();
      var nickName = "nickName " + userId;
      var user = {
          userId: userId,
          nickName: nickName,
          isNpc: true
      };
    }
};
