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
  Cancel: "cancel"  // 取消 
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




CardUtil.canPeng = function(cardsOnHand, currentCard){
  var canPeng = false;
  var countedCards = _.countBy(cardsOnHand, function(c){return c;});
  if(countedCards[currentCard] === 2){
    canPeng = true;
  }
  return canPeng;
};



CardUtil.canGangOnHand = function(cardsOnHand, currentCard){
  var canGang = false;
  var countedCards = _.countBy(cards, function(c){return c;});
  if(countedCards[currentCard] === 3){
    canGang = true;
  }
  return canGang;
};



CardUtil.canGangOnTable = function(cardsOnTable, currentCard){
  var canGang = false;
  if (_.contains(cardsOnTable.thricePeng, currentCard) || _.contains(cardsOnTable.thriceWei, currentCard)){
    canGang = true;
  }
  return canGang;
};



// CardUtil.canChi = function(cards, currentCard){
//   var canChi = false;
//   var countedCards = _.countBy(cards, function(c){return c;});
//   _.each(countedCards, function(value, key){
//     if(value === 3){
//       delete countedCards[key];
//     }
//   });

//   if (countedCards[currentCard-1]){
//     if (countedCards[currentCard-2] || countedCards[currentCard+1]){
//       canChi = true;
//     }
//   } else if (countedCards[currentCard+2]){
//     if (countedCards[currentCard-1] || countedCards[currentCard+1]){
//       canChi = true;
//     }
//   }


//   return canChi;
// };




/**
 * 返回一个重新组合好的 onHandleCardSpriteArr
 * @param CardSprite  onHandleCardSpriteArr其中的一个 cardsprite
 * @param onHandleCardSpriteArr 结构类似CardUtil.riffle返回的数组结构，不过最小单位是 cardsprite
 * @param drag
 */
CardUtil.updateSort = function(CardSprite,onHandleCardSpriteArr,drag) {
    var sortFun = function(){
        var behaveNum = checkint(onHandleCardSpriteArr.length/2)
        for(var i=0;i<onHandleCardSpriteArr.length;i++) {
            var oneOutputCardArr = onHandleCardSpriteArr[i]
            var x = display.cx;
            if (i < behaveNum) {
                x = x - (behaveNum - i) * 75;
            } else {
                x = x + (i - behaveNum) * 75;
            }

            for (var j = 0; j < oneOutputCardArr.length; j++) {
                var y = display.bottom + 115 + j * 115 / 2;
                var cardSprite = oneOutputCardArr[j];
                cardSprite.setCardArrayIndex(i, j);
                cardSprite.setPosition(x, y);
                cardSprite.setLocalZOrder(oneOutputCardArr.length - j);
            }
        }
    }


    var lastX = drag.lastX;
    var lastY = drag.lastY;
    if(lastY > display.cy - 115/2 ) {
        var isSendCard = this.isSendCard_; //当前是否是出牌
        if (!isSendCard) {
            sortFun();
            return onHandleCardSpriteArr;
        }
    }else {//根据自己需求的牌进行排列的操作
        var startX = drag.startX;
        var startY = drag.startY;

        var onHandleCardSpriteArrLen = onHandleCardSpriteArr.length;
        var behaveNum = checkint(onHandleCardSpriteArrLen/2)
        var leftX = display.cx - behaveNum * 75;
        var rightX  = leftX + (onHandleCardSpriteArrLen ) * 75; //display.cx + (i-behaveNum) * 75;




        var spliceOrgion = function(index){
            var oneArr = onHandleCardSpriteArr[index];
            if(!oneArr || oneArr.length < 3){
                return true
            }
            return false;
        }

        var deleteOrgion = function(){
            //首先移除当前的这个卡牌
            var  bigIndex = CardSprite.bigArrayIndex_;
            var smallIndex = CardSprite.smallArrayIndex_;
            var oneSmallArr = onHandleCardSpriteArr[bigIndex];
            oneSmallArr.splice(smallIndex,1);
        }


        if(lastX<leftX){
            deleteOrgion();
            onHandleCardSpriteArr.splice(0,0,[CardSprite]);
        }else if(lastX > rightX ) {
            deleteOrgion();
            onHandleCardSpriteArr.splice(onHandleCardSpriteArrLen, 0, [CardSprite]);
        }else{
            var count = Math.round((lastX - leftX)/75)
            if(count>onHandleCardSpriteArrLen-1) count = onHandleCardSpriteArrLen-1
            var bool = spliceOrgion(count);
            if(bool) {
                deleteOrgion();
                var oneArr = onHandleCardSpriteArr[count];
                oneArr.splice(oneArr.length, 0, CardSprite);
            }

        }
    }


    onHandleCardSpriteArr = _.select(onHandleCardSpriteArr, function(cardSprite){
        return cardSprite && cardSprite.length;
    });



    sortFun();

//    var behaveNum = checkint(onHandleCardSpriteArr.length/2)
//    for(var i=0;i<onHandleCardSpriteArr.length;i++) {
//        var oneOutputCardArr = onHandleCardSpriteArr[i]
//        var x = display.cx;
//        if (i < behaveNum) {
//            x = x - (behaveNum - i) * 75;
//        } else {
//            x = x + (i - behaveNum) * 75;
//        }
//
//        for (var j = 0; j < oneOutputCardArr.length; j++) {
//            var y = display.bottom + 115 + j * 115 / 2;
//            var cardSprite = oneOutputCardArr[j];
//            cardSprite.setCardArrayIndex(i, j);
//            cardSprite.setPosition(x, y);
//            cardSprite.setLocalZOrder(oneOutputCardArr.length - j);
//        }
//    }

    var userCard1 = FightVo.userCard1;
    userCard1.onHandleCardSpriteArr_ = onHandleCardSpriteArr;
    return onHandleCardSpriteArr;
}