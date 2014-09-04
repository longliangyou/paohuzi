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
    newRound: function(roomId, callback){

      var userIds = RoomList.getUserIdsByRoomId(roomId);
      var round = Round.createNew(userIds, _.random(3)-1);
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
      if (UserAction.isNpc(banker)){
        // TODO
      } else {
        // 开局发牌
        var onDiscardEvent = {
          cmd:CardUtil.ServerNotify.onDisCard,
          data:{
            userId: userId
          }
        };
        ServerNotifyManager.sendCmdResponse(onDiscardEvent);
      }
    }
};