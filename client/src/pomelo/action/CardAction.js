/**
 * CardAction.js
 * 用户的相关action
 * Created by long on 2014/9/1.
 */
var CardAction = {

    /**
     * 玩家出牌
     * 1. 发广播消息。
     * 2. 判断是否能被偎，被杠，被跑，如果可以则调用偎，杠，跑
     * @param userId
     * @param cardId
     * @param callback
     */
    card: function(userId, cardId, callback){
        /**
         * todo-龙
         * 1:cardId 如果没有cardId，随机从round用户手中抽取一张牌
         * 2：round数据增删
         * 3：转发给用户出了牌
         */
        if(cardId == null){ //随机给其出一张牌

        }

    }
};
