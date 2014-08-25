var CardUtil = {};

// Ti: 提
// Pao: 跑
// Wei: 偎

// Peng: 碰
// Hu: 胡牌
// Chi: 吃牌
// Cancel: 取消
CardUtil.Actions = {
  Ti: "ti",         // 提
  Pao: "pao",       // 跑
  Wei: "wei",       // 偎

  Peng: "peng",     // 碰
  Hu: "hu",         // 胡牌
  Chi: "chi",       // 吃牌
  Cancel: "cancel", // 取消 
  Idle: "idle"      // 无操作
};

// 用户出牌倒计时，单位为秒，默认值为 15 秒
CardUtil.cardInterval = 15;


// CMD
CardUtil.ServerNotify = {
  onNewRound: 1,    // 开局通知
  onJoinRoom: 2,    // 新玩家加入通知
  onCard:     3,    // 玩家出的牌
  onEat:      4,    // 玩家吃牌
  onPeng:     5,    // 玩家碰牌
  onWei:      6,    // 玩家偎牌
  onWin:      7,    // 玩家胡牌
  onTi:       8,    // 玩家提牌
  onPao:      9,    // 玩家跑牌
  onNewCard:  10,   // 新底牌
  onDiscard:  11    // 等待玩家出牌
};
// 组牌
// example: [75, 13, 5, 28, 35, 54, 22, 19, 62, 51, 3, 42, 59, 79, 73, 24, 57, 10, 58, 44]
// =>
// [
//   Array[2],
//   Array[2],
//   Array[2],
//   Array[2],
//   Array[2],
//   Array[2],
//   Array[3],
//   Array[3],
//   Array[2]
// ]
CardUtil.riffle = function(cards) {
  // console.log("cards: ", cards);
  var countedCards = _.countBy(cards, function(c){return c;});
  var riffledCards = [];
  console.log("countedCards: ", countedCards);


  // 1. 四张、三张
  _.each(countedCards, function(value, key){
    if(value === 4){
      riffledCards.push([key,key,key,key]);
      delete countedCards[key];
    } else if (value === 3){
      riffledCards.push([key,key,key]);
      delete countedCards[key];
    }
  });


  // 2. 贰柒拾
  if (countedCards[12] && countedCards[17] && countedCards[20]){
    riffledCards.push([12, 17, 20]);
    countedCards[12]--;
    countedCards[17]--;
    countedCards[20]--;
  }
  if (countedCards[12] && countedCards[17] && countedCards[20]){
    riffledCards.push([12, 17, 20]);
    countedCards[12]--;
    countedCards[17]--;
    countedCards[20]--;
  }


  // 3. 壹贰叁
  if (countedCards[11] && countedCards[12] && countedCards[13]){
    riffledCards.push([11, 12, 13]);
    countedCards[11]--;
    countedCards[12]--;
    countedCards[13]--;
  }
  if (countedCards[11] && countedCards[12] && countedCards[13]){
    riffledCards.push([11, 12, 13]);
    countedCards[11]--;
    countedCards[12]--;
    countedCards[13]--;
  }


  // 4. 二七十
  if (countedCards[2] && countedCards[7] && countedCards[10]){
    riffledCards.push([2, 7, 10]);
    countedCards[2]--;
    countedCards[7]--;
    countedCards[10]--;
  }
  if (countedCards[2] && countedCards[7] && countedCards[10]){
    riffledCards.push([2, 7, 10]);
    countedCards[2]--;
    countedCards[7]--;
    countedCards[10]--;
  }


  // 5. 一二三
  if (countedCards[1] && countedCards[2] && countedCards[3]){
    riffledCards.push([1, 2, 3]);
    countedCards[1]--;
    countedCards[2]--;
    countedCards[3]--;
  }
  if (countedCards[1] && countedCards[2] && countedCards[3]){
    riffledCards.push([1, 2, 3]);
    countedCards[1]--;
    countedCards[2]--;
    countedCards[3]--;
  }



  // 6. 对子
  _.each(countedCards, function(value, key){
    if(value == 2){
      riffledCards.push([key,key]);
      delete countedCards[key];
    }
  });



  // 7. 一句话
  _.each(countedCards, function(value, key){
    k = parseInt(key, 10);
    if(value && countedCards[k+1] && countedCards[k+2] && (k!==10) && (k!==9)){
      riffledCards.push([k, k+1, k+2]);
      countedCards[k]--;
      countedCards[k+1]--;
      countedCards[k+2]--;

    } else if (!value){
      delete countedCards[k];
    }
  });



  // 8. 两张
  _.each(countedCards, function(value, key){
    k = parseInt(key, 10);
    if(value && countedCards[k+1] && (k!==10)){
      riffledCards.push([k, k+1]);
      countedCards[k]--;
      countedCards[k+1]--;
    } else if (!value){
      delete countedCards[k];
    }
  });



  // 9. 散牌
  var countedCardsArray = [];
  _.each(countedCards, function(value, key){
    if (value){
      countedCardsArray.push(key);
      if(countedCardsArray.length === 3){
        riffledCards.push(countedCardsArray);
        countedCardsArray = [];
      }
    } else {
      delete countedCards[key];
    }
  });
  if(countedCardsArray.length > 0){
    riffledCards.push(countedCardsArray);
  }

  console.log('#riffledCards: ', riffledCards, _.sortBy(cards,function(c){return c;}));
  return riffledCards;
};




/**
 * 返回胡息数, 最小单位是四张，三张，一句话(二七十，一二三; 壹贰叁、贰柒拾)
 * @param cards 
 * @param type: CardUtil.Actions 中的一种，包括: 提，跑，偎，碰，吃
 * @return huxi
 */
// 1. 四张大牌--提 12 胡息
// 2. 四张小牌--提 9 胡
// 3. 四张大牌--跑 9 胡息
// 4. 四张小牌--跑 6 胡

// 5. 三张大牌--偎 6 胡
// 6. 三张小牌--偎 3 胡
// 7. 三张大牌-碰 3 胡
// 8. 三张小牌-碰 1 胡

// 9. 壹贰叁、贰柒拾--吃 6 胡
// 10. 一二三、二七十--吃 3 胡
CardUtil.getHuXi = function(cards, type){
  var huxi = 0;
  if ((_.union(cards, [])).length === 1){
  // 1. 四张大牌--提 12 胡息
  // 2. 四张小牌--提 9 胡
  // 3. 四张大牌--跑 9 胡息
  // 4. 四张小牌--跑 6 胡
    if (cards.length === 4){
      switch (type){
        case CardUtil.Actions.Ti:
          if (cards[0] > 10 && cards[0] < 21){
            huxi = 12;
          } else if (cards[0] > 0){
            huxi = 9;
          }
          break;
        case CardUtil.Actions.Pao:
          if (cards[0] > 10 && cards[0] < 21){
            huxi = 9;
          } else if (cards[0] > 0){
            huxi = 6;
          }
          break;
        default:
          break;
      }
    }

    // 5. 三张大牌--偎 6 胡
    // 6. 三张小牌--偎 3 胡
    // 7. 三张大牌-碰 3 胡
    // 8. 三张小牌-碰 1 胡
    if (cards.length === 3){
      switch (type){
        case CardUtil.Actions.Wei:
          if (cards[0] > 10 && cards[0] < 21){
            huxi = 6;
          } else if (cards[0] > 0){
            huxi = 3;
          }
          break;
        case CardUtil.Actions.Peng:
          if (cards[0] > 10 && cards[0] < 21){
            huxi = 3;
          } else if (cards[0] > 0){
            huxi = 1;
          }
          break;
        default:
          break;
      }
    }
  }


  if (cards.length === 3 && type === CardUtil.Actions.Chi){
    // 9. 壹贰叁、贰柒拾 6 胡
    if (_.difference(cards, [11,12,13]).length === 0 || _.difference(cards, [12,17,20]).length === 0){
      huxi = 6;
    }

    // 10. 一二三、二七十 3 胡
    if ((_.difference(cards, [1,2,3]).length === 0) || (_.difference(cards, [2,7,10]).length === 0)){
      huxi = 3;
    }
  }
  return huxi;
};



CardUtil.canHu = function(cardsOnHand, cardsOnTable, currentCard){
  var huxi = 0;
  var copyedCards = _.clone(cardsOnHand);
  if (currentCard !== 0){
    copyedCards.push(currentCard);
  }

  var onHand = CardUtil.shouShun(cardsOnHand);
  if (onHand && onHand.length){
    _.each(onHand, function(cards){
      if ((_.union(cards, [])).length === 1){
        huxi += CardUtil.getHuXi(cards, CardUtil.Actions.Wei);
      } else {
        huxi += CardUtil.getHuXi(cards, CardUtil.Actions.Chi);
      }
    });
    _.each(cardsOnTable.thricePeng, function(c){
      huxi += CardUtil.getHuXi([c,c,c], CardUtil.Actions.Peng);
    });
    _.each(cardsOnTable.thriceWei, function(c){
      huxi += CardUtil.getHuXi([c,c,c], CardUtil.Actions.Wei);
    });
    _.each(cardsOnTable.fourfoldTi, function(c){
      huxi += CardUtil.getHuXi([c,c,c,c], CardUtil.Actions.Ti);
    });
    _.each(cardsOnTable.fourfoldPao, function(c){
      huxi += CardUtil.getHuXi([c,c,c,c], CardUtil.Actions.Pao);
    });
    _.each(cardsOnTable.shunzi, function(cards){
      huxi += CardUtil.getHuXi(cards, CardUtil.Actions.Chi);
    });
  }
  var canHu = (huxi >= 15);

  return [canHu, huxi, onHand];
};



/**
 * 玩家的牌是否无单牌。
 * @param cards: 手中的牌，或者手中的牌加新翻开的底牌。
 */
CardUtil.shouShun = function(cards){
  var countedCards = _.countBy(cards, function(c){return c;});

  var results = [];
  var singleCards = [];

  // 1. 处理三张，并找出所有单张
  _.each(countedCards, function(value, key){
    if (value === 3){
      results.push([key, key, key]);
      delete countedCards[key];
    } else if (value === 1){
      singleCards.push(key);
    }
  });

  var findShunzi = function(singleCard){
    // 贰柒拾
    var diff = _.difference([12,17,20], singleCard);
    if (diff.length !== 3 && countedCards[diff[0]] && countedCards[diff[1]]){
       countedCards[singleCard]--;
       countedCards[diff[1]]--;
       countedCards[diff[0]]--;
       return [singleCard, diff[0], diff[1]];
    }

    // 二七十
    diff = _.difference([2,7,10], singleCard);
    if (diff.length !== 3 && countedCards[diff[0]] && countedCards[diff[1]]){
       countedCards[singleCard]--;
       countedCards[diff[1]]--;
       countedCards[diff[0]]--;
       return [singleCard, diff[0], diff[1]];
    }

    // 顺子
    if(countedCards[singleCard + 1] && countedCards[singleCard+2]){
      countedCards[singleCard]--;
      countedCards[singleCard+1]--;
      countedCards[singleCard+2]--;
      return [singleCard, singleCard+1, singleCard+2];
    }
    if (countedCards[singleCard+1] && countedCards[singleCard-1]){
      countedCards[singleCard]--;
      countedCards[singleCard+1]--;
      countedCards[singleCard-1]--;
      return [singleCard-1, singleCard, singleCard+1];
    }

    if (countedCards[singleCard-1] && countedCards[singleCard-2]){
      countedCards[singleCard]--;
      countedCards[singleCard-1]--;
      countedCards[singleCard-2]--;
      return [singleCard-2, singleCard-1, singleCard];
    }

    // 大小混搭
    if (singleCard > 10 && (countedCards[singleCard-10] > 1)){
      countedCards[singleCard]--;
      countedCards[singleCard-10] -= 2;
      return [singleCard, singleCard-10, singleCard-10];
    }
    if (singleCard < 11 && (countedCards[singleCard+10] > 1)){
      countedCards[singleCard]--;
      countedCards[singleCard+10] -= 2;
      return [singleCard, singleCard+10, singleCard+10];
    }
    return false;
  };

  var shunzi;
  var isSuccess = true;
  _.each(singleCards, function(sCard){
    shunzi = findShunzi(sCard);
    if (shunzi && shunzi.length){
      results.push(shunzi);
    } else {
      isSuccess = false;
    }
  });

  if (!isSuccess){
    return false;
  }


  // 去掉所有组合掉的牌
  _.each(countedCards, function(value, key){
    if(value === 0){
      delete countedCards[key];
    }
  });

  var keys = _.keys(countedCards);
  if (keys.length > 1){
    _.each(countedCards, function(value, key){
      if (value === 2){
        shunzi = findShunzi(key);
        if (shunzi && shunzi.length){{
          results.push(shunzi);
        }}
        shunzi = findShunzi(key);
        if (shunzi && shunzi.length){{
          results.push(shunzi);
        }}
      }
    });
  } else if(keys.length === 1){
    results.push([keys[0], keys[0]]);
  }

  return results;
};


CardUtil.canPeng = function(cardsOnHand, currentCard){
  var canPeng = false;
  var countedCards = _.countBy(cardsOnHand, function(c){return c;});
  if(countedCards[currentCard] === 2){
    canPeng = true;
  }
  return canPeng;
};



CardUtil.canGang = function(cardsOnHand, cardsOnTable, currentCard){
  var canGang = false;
  var countedCards = _.countBy(cards, function(c){return c;});
  if(countedCards[currentCard] === 3){
    canGang = true;
  }
  if (_.contains(cardsOnTable.thricePeng, currentCard) || _.contains(cardsOnTable.thriceWei, currentCard)){
    canGang = true;
  }
  return canGang;
};



/**
 * 玩家是否能吃拍
 * @param cards: 手中的牌。
 * @param currentCard: 新翻开的底牌，或者上家出的牌。
 */
// 1. 顺子
// 2. 2、7、10
// 3. 大小混搭
CardUtil.canChi = function(cards, currentCard){
  var canChi = false;
  var countedCards = _.countBy(cards, function(c){return c;});
  _.each(countedCards, function(value, key){
    if(value === 3){
      delete countedCards[key];
    }
  });

  var smallCount, bigCount, diff;
  if (countedCards[currentCard-1]){
    if (countedCards[currentCard-2] && currentCard !== 11 && currentCard !== 12){
      canChi = true;
    } else if (countedCards[currentCard+1] && currentCard !== 10 && currentCard !== 11){
      canChi = true;
    }
  } else if (countedCards[currentCard+1]){
    if (countedCards[currentCard-1] && currentCard !== 10 && currentCard > 11){
      canChi = true;
    } else if (countedCards[currentCard+2] && currentCard  !==  9 && currentCard > 10){
      canChi = true;
    }
  } else if (currentCard < 11){
    smallCount = countedCards[currentCard] || 0;
    bigCount = countedCards[currentCard + 10] || 0;
    diff = _.difference([2,7,10], currentCard);
    if (smallCount + bigCount > 1){
      canChi = true;
    } else if (diff.length !== 3 && countedCards[diff[0]] && countedCards[diff[1]]){
      canChi = true;
    }
  } else if (currentCard > 10){
    smallCount = countedCards[currentCard - 10] || 0;
    bigCount = countedCards[currentCard] || 0;
    diff = _.difference([12,17,20], currentCard);
    if (smallCount + bigCount > 1){
      canChi = true;
    } else if (diff.length !== 3 && countedCards[diff[0]] && countedCards[diff[1]]){
      canChi = true;
    }
  }
  return canChi;
};


