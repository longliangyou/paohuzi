/**
 * PengAction.js
 * 用户的相关 action
 * Created by long on 2014/9/1.
 */
var PengAction = {

    /**
     * 碰牌
     * @param userId
     * @param cardId
     * @param callback
     * @param alreadyHandle 是否已经处理了
     */
    peng: function(userId, cardId, callback,alreadyHandle) {
        var roomId = RoomList.getRoomIdByUserId(userId);
        var round = RoomList.getRound(roomId);

        var rect = STATUS_FAILE;
        //操作牌
        var action = round.peng(userId, {currentCard:cardId});
        if (action == CardUtil.Actions.Peng) {
            rect = STATUS_SUCCESS;
            var newRoundEvent = {
                cmd: CardUtil.ServerNotify.onPeng,
                data: {
                    cardId: cardId,
                    userId: userId
                }
            };
            ServerNotifyManager.sendCmdResponse(newRoundEvent);
        }


        if (_.isFunction(callback)) {
            callback({rect: rect, data: null});
        }
    }
};
