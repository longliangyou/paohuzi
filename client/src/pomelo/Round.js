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

    var bankerNumer = bankerNum;
    var currentPlayer = function(uid){
      return _.find(players, function(player){return player.uid == uid;});
    };


    // if (userIds.length !== 3 || (bankerNum > 2 && bankerNum < 0)){
    //   return false;
    // }

    _.each (players, function(player, index){//遍历每个玩家都初始化牌
      player.uid = userIds[index];
      player.onHand = _.sortBy(_.first(onTable, 20), function(c){return c;});
      player.onTable = {shunzi: [], thricePeng: [], thriceWei: [], fourfoldTi: [], fourfoldPao: []};
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

    players[bankerNum].onHand.push(onTable.pop());//庄家在给多一张牌

    var getOtherPlayerCards = function(player){
      var otherPlayer = {
        num: player.num,
        uid: player.uid,
        onHand:player.onHand,
        onHandLength: player.onHand.length,
        onTable: player.onTable,
        onTrash: player.onTrash
      };
      return otherPlayer;
    };

    round.getCardsByUserId = function(uid) {
      var player = currentPlayer(uid);

      nextPlayer = getOtherPlayerCards(players[(player.num+1)%3]);
      previousPlayer = getOtherPlayerCards(players[(player.num + 2)%3]);
      // console.log(player.onHand);
      CardUtil.riffle(player.onHand);
      CardUtil.riffle(nextPlayer.onHand);
      CardUtil.riffle(previousPlayer.onHand);
      return [previousPlayer, player, nextPlayer];
    };

    // 碰牌
    round.peng = function(uid, card){
      var player = currentPlayer(uid);
      if (CardUtil.canPeng(player.onHand, card.currentCard)){
        player.onHand = _.reject(player.onHand, function(card){ return card.currentCard == card;});
        player.onTable.thricePeng.push(card.currentCard);
        return CardUtil.Actions.Peng;
      }
      return CardUtil.Actions.Idle;
    };

    // 偎牌
    round.wei = function(uid, card){
      var player = currentPlayer(uid);
      if (CardUtil.canPeng(player.onHand, card.currentCard)){
        player.onHand = _.reject(player.onHand, function(card){ return card.currentCard == card;});
        player.onTable.thriceWei.push(card.currentCard);
        return CardUtil.Actions.Wei;
      }
      return CardUtil.Actions.Idle;

    };

    // 提牌或者跑牌
    round.gang = function(uid, card){
      var action = CardUtil.Actions.Idle;
      var player = currentPlayer(uid);
      if (CardUtil.canGang(player.onHand, player.onTable, card.currentCard)){
        var isOnHand = _.find(player.onHand, card.currentCard);
        if (isOnHand){
          player.onHand = _.reject(player.onHand, function(card){ return card.currentCard == card;});
          if(card.uid === uid){
            player.onTable.fourfoldTi.push(currentCard);
            action = CardUtil.Actions.Ti;
          } else {
            player.onTable.fourfoldPao.push(currentCard);
            action = CardUtil.Actions.Pao;
          }
        } else if (!!(isOnPeng = _.find(player.onTable.thricePeng, card.currentCard))){
          player.onTable.thricePeng = _.reject(player.onTable.thricePeng, function(card){ return card.currentCard == card;});
          player.onTable.fourfoldPao.push(currentCard);
          action = CardUtil.Actions.Pao;
        } else if (!!(isOnWei = _.find(player.onTable.thriceWei, card.currentCard))){
          player.onTable.thriceWei = _.reject(player.onTable.thriceWei, function(card){ return card.currentCard == card;});
          if(card.uid === uid){
            player.onTable.fourfoldTi.push(currentCard);
            action = CardUtil.Actions.Ti;
          } else {
            player.onTable.fourfoldPao.push(currentCard);
            action = CardUtil.Actions.Pao;
          }
        }
      }
      return action;
    };
    return round;
  }
};