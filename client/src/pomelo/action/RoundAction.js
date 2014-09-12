/**
 * RoundAction.js
 * 用户的相关 action
 * Created by long on 2014/9/1.
 */
var RoundAction = {
    /**
     * 开桌
     * 
     */
    newRound: function(roomId){

      var userIds = RoomList.getUserIdsByRoomId(roomId);
      var bankIndex = 0// _.random(2);
      var round = Round.createNew(userIds, bankIndex);
      RoomList.setRound(roomId, round);

      var cards;
      _.each(userIds, function(userId){
        cards = round.getCardsByUserId(userId);

        // 开局发牌
        var newRoundEvent = {
          cmd:CardUtil.ServerNotify.onNewRound,
          data:{
            cards: cards,
            userId: userId
          }
        };
        ServerNotifyManager.sendCmdResponse(newRoundEvent);

      });




      var bankId = round.getBankerId();
      var banker = RoomList.getUserByUserId(bankId);
      //启动ai
      FightAIAction.onDisCardAction(round,banker.userId)
    }


    // 判断是否能自动杠，自动偎，自动跑
    newDisard: function(roomId, userId, cardId){

    }
};