/**
 * CardAction.js
 * 用户的相关action
 * Created by long on 2014/9/1.
 */
var CardAction = {

    /**
     * 玩家出牌
     * 1:cardId 如果没有cardId，随机从round用户手中抽取一张牌 （round中需要新增一个方法，就是随机抽取一张牌）
     * 2：round中这个userId的牌的数据增删
     * 3：转发给用户出了牌
     * @param userId
     * @param cardId
     * @param callback
     */
    card: function(userId, cardId, callback){
        var roomId = RoomList.getRoomIdByUserId(userId);
        RoomList.clearTimeout(roomId);
        var round = RoomList.getRound(roomId);

        var isDiscardByClient = true;//当前uerId这个客户端这张牌是否已经出了，、 或者没出，服务端主要随机获取一张的
        if(cardId == null){ //随机给其出一张牌
            isDiscardByClient = false;
            cardId = round.discardForNpc(userId);
        }

        round.discard(userId, cardId);

        if ( _.isFunction(callback)) {
            callback({rect:STATUS_SUCCESS,data:null});
        }

        var onDiscardEvent = {
            cmd:CardUtil.ServerNotify.onCard,
            data:{
                isDiscardByClient:isDiscardByClient,//标记这张牌是否是客户端已经出了的，还是服务器随机获取的
                userId: userId,
                cardId: cardId
            }
        };
        ServerNotifyManager.sendCmdResponse(onDiscardEvent);
        RoundAction.newDisard(roomId, userId, cardId);


    }
};
