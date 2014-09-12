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
            var roomId = RoomList.getRoomIdByUserId(userId)
            RoomList.clearTimeout(roomId);

            CardAction.card(userId,cardId, callback)
        }

        if (UserAction.isNpc(banker)){
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
            setTimeOut(npcHandle,CardUtil.cardInterval)
        }
    },

    onCardAction: function(round, userId, cardId){

    },


    onEatAction: function(round, userId, cardId){

    }

};
