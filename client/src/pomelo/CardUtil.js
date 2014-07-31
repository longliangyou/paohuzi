var CardUtil = {};

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
    if(value && countedCards[k+1] && countedCards[k+2]){
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
    if(value && countedCards[k+1]){
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