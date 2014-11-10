/**
 * FightAIAction.js
 * 战斗的相关action
 * Created by long on 2014/8/31.
 */
var FightAIAction = {


    /**
     * 等待玩家出牌，如果是 NPC, 则自动出单牌
     * @param round 本局游戏所有数据
     * @param 
     */
    onDisCardAction: function(round, userId){
        var npcHandle = function(){
            CardAction.card(userId,null)
        }


        if (UserAction.isNpcByUserId(userId)){
            npcHandle();
        } else {
            // 开局发牌
            var onDiscardEvent = {
                cmd:CardUtil.ServerNotify.onDisCard,
                data:{
                    userId: userId
                }
            };
            ServerNotifyManager.sendCmdResponse(onDiscardEvent);
            var roomId = RoomList.getRoomIdByUserId(userId)
            RoomList.setTimeout(roomId,setTimeOut(npcHandle,CardUtil.cardInterval))
        }
    },

    /**
     * 我userId出了一张牌以后  看其他玩家的操作
     * @param round
     * @param userId
     * @param cardId
     */
    onCardAction: function(roomId,round, userId, cardId){
        var nextUserId = round.getNextUserId(userId);
        var previousUserId = round.getPreviousUserId(userId);

        //先判断下一家的操作
        var actions = round.getActions(nextUserId, cardId);
        cc.log("FightAIAction 当前拥有的操作:",actions.canHu,actions.canPeng,actions.canGang,actions.canChi);
//        if(actions.canHu){
//            HuAction.hu(nextUserId, cardId, null);
//            return;
//        }else
        if(actions.canPeng){
            PengAction.peng(nextUserId, cardId, null)
            return;
        }else if(actions.canGang){
            GangAction.gang(nextUserId, cardId, null)
            return;
        }else if(actions.canChi){


        }


        //var handResule = RoundAction.newDisardByMyHand(roomId, userId, cardId);
        /**
        1：handResule 判断是否有跑，有跑直接发送 ServerNotifyManager
        2:没有的话，判断是否是npc，如果是npc直接从 handResule 取一个操作 ServerNotifyManager 发送即可
                                     如果不是npc，启动倒计时，直接从 handResule 取一个操作 ServerNotifyManager 发送即可
         */

    },

    /**
     * 用户碰以后的操作
      * @param roomId
     * @param round
     * @param userId
     * @param cardId
     */
    onPengAction:function(roomId,round, userId, cardId){
        if (UserAction.isNpcByUserId(userId)){
            //碰了后  随便出一张牌
            CardAction.card(userId,null,null)
        }
    },



    onEatAction: function(round, userId, cardId){

    }

};
