var Round = {
  // players: [
  //   {
  //     num: Number, // 玩家编号
  //     uid: String, // 用户 ID
  //     onTable: [[Number]...], // 玩家桌上的牌
  //     onHand: [Number...],    // 玩家手里的牌
  //     onTrash: [Number...],   // 玩家打出的牌
  //     unFollow: [Number],     // 玩家没有吃的牌
  //     unTouch: [Number],      // 玩家没有碰的牌
  //   }
  // ]
  // onTable: [] // 桌上的底牌
  // @return []
  createNew: function(userIds, bankerNum){
    // var userIds = ["long", "hua", "zhuang"];
    // var bankerNum = 2;


    var round = {};

    var players = [{num: 0}, {num: 1}, {num: 2}];

    var cardRange = _.range(1,21);
    var cards = cardRange.concat(cardRange).concat(cardRange).concat(cardRange);
    var onTable = _.shuffle(cards);

    var bankerNumer = bankerNumer;


    // if (userIds.length !== 3 || (bankerNum > 2 && bankerNum < 0)){
    //   return false;
    // }

    _.each (players, function(player, index){
      player.uid = userIds[index];
      player.onHand = _.sortBy(_.first(onTable, 20), function(c){return c;});
      player.onTable = [];
      player.onTrash = [];
      player.unFollow = [];
      player.unTouch = [];
      if (bankerNumer === index)
      {
        player.isBanker = true;
      } else {
        player.isBanker = false;
      }
      onTable = _.rest(onTable, 20);
    });

    players[bankerNum].onHand.push(onTable.pop());

    var getOtherPlayerCards = function(player){
      var otherPlayer = {
        num: player.num,
        uid: player.uid,
        onHandLength: player.onHand.length,
        onTable: player.onTable,
        onTrash: player.onTrash
      };
      return otherPlayer;
    };

    round.getCardsByUserId = function(uid) {
      player = _.find(players, function(player){return player.uid == uid;});

      nextPlayer = getOtherPlayerCards(players[(player.num+1)%3]);
      previousPlayer = getOtherPlayerCards(players[(player.num + 2)%3]);
      // console.log(player.onHand);
      CardUtil.riffle(player.onHand);
      return [previousPlayer, player, nextPlayer];
    };

    return round;
  }
};