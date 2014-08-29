/**
 * FightAiAction.js
 * 战斗的ai逻辑
 * 这ai无论单机和服务器都可以直接使用，所以务必保证 FightAiAction 依赖的数据模型必须一致
 * Created by Administrator on 2014/8/29.
 */
var FightAiAction = {


    /**
     *  等待玩家出牌
     * @param userId  当前提示要出牌的玩家userId
     * @param interval 倒计时
     */
    onDiscardAction:function(userId,interval){
        //思路：
        //1:通过userId取得这个用户的user对象，
       //2:判断这个user对象是不是 isNpc
        if(isNpc){//如果是npc
            //3:如果这个用户是npc， 直接给他出随机一张牌（---）
        }else{
            //3:如果这个用户不是npc，启动一个倒计时
            //4-1:当倒计时到了用户还没操作，则直接给他出一张牌，并吧这个用户的user对象的isNpc设置为true
              //4-2：当倒计时之中有用户操作，则不需要做任何处理，直接走其他cmd流程
        }
    }







};