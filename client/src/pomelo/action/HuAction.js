/**
 * HuAction.js
 * 用户的相关 action
 * Created by long on 2014/9/1.
 */
var HuAction = {
    /**
     * 吃牌
     * 吃牌动作加入到 round, 由 round，判断是否吃牌。
     * 
     */
    hu: function(userId, cardId, callback){
        var newRoundEvent = {
            cmd:CardUtil.ServerNotify.onWin,
            data:{
                cardId: cardId,
                userId: userId
            }
        };
        ServerNotifyManager.sendCmdResponse(newRoundEvent);
    }
};
