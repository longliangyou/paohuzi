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
        //第一个用户加入房间
        var userId = Math.random();
        var data = {key:"previousUser",value:{nickName:"user1",gold:200,userId:userId,isNpc:true}};
        //这里 龙哥要做的是 创建一个user对象 吧这个用户的信息也存储起来 这样能和真实用户的模型保持一致，一个user对象，不仅有一些userInfo的信息，分卓后也会有牌的信息
        //通过userId，能取到用户user info，也能取到自己手上的card info 即可，
        //...to do..
        var event = {
            cmd: CardUtil.ServerNotify.onJoinRoom,
            data:data
        };

    }


}
