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
  var riffledCards = [];

  var bigCards = [];
  var smallCards = [];

  // 0 标记牌
  _.each(cards, function(card){
    if (card > 40){
      bigCards.push(card);
    } else {
      smallCards.push(card);
    }
  });


  // 1 相同的牌一组
  var bigGroup = _.groupBy(bigCards, function(card){
    var number = card % 10;
    if (number === 0){
      number = 10;
    }
    return number;
  });

  var smallGroup = _.groupBy(smallCards, function(card){
    var number = card % 10;
    if (number === 0){
      number = 10;
    }
    return number;
  });

  var restCards = [];
  _.each(bigGroup, function(value, key){
    if (value.length > 1){
      riffledCards.push(value);
    }else{
      restCards.push(value[0]);
    }
  });
  _.each(smallGroup, function(value, key){
    if (value.length > 1){
      riffledCards.push(value);
    }else{
      restCards.push(value[0]);
    }
  });

  var tempCards = [];
  var restGroup = _.groupBy(restCards, function(card){return card % 10;});
  _.each(restGroup, function(value, key){
    if (value.length > 1){
      riffledCards.push(value);
    }else{
      tempCards.push(value[0]);
    }
  });


  // 2 按顺序相邻3张一组。
  var group1 = [];
  var group2 = [];
  var group3 = [];
  _.each(tempCards, function(card){
    number = card % 10;
    if (number === 0){
      number = 10;
    }
    if (number < 4){
      group1.push(card);
    }else if (number > 6 ){
      group2.push(card);
    } else {
      group3.push(card);
    }
  });

  riffledCards.push(group1);
  riffledCards.push(group2);
  riffledCards.push(group3);
  riffledCards = _.reject(riffledCards, function (group){
    return !group.length;
  });
  return riffledCards;
};


/**
 * 返回一个重新组合好的 onHandleCardSpriteArr
 * @param CardSprite  onHandleCardSpriteArr其中的一个 cardsprite
 * @param onHandleCardSpriteArr 结构类似CardUtil.riffle返回的数组结构，不过最小单位是 cardsprite
 * @param drag
 */
CardUtil.updateSort = function(CardSprite,onHandleCardSpriteArr,drag) {
    if(y > display.cy - 115/2 ) {
        var isSendCard = that.isSendCard_; //当前是否是出牌
        if (!isSendCard) {
            return onHandleCardSpriteArr;
        }
    }else {//根据自己需求的牌进行排列的操作
        var startX = drag.startX;
        var startY = drag.startY;
        var lastX = drag.lastX;
        var lastY = drag.lastY;

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





    var behaveNum = checkint(onHandleCardSpriteArr.length/2)
    for(var i=0;i<onHandleCardSpriteArr.length;i++) {
        var oneOutputCardArr = onHandleCardSpriteArr[i]
        var x = display.cx;
        if (i < behaveNum) {
            x = x - (behaveNum - i) * 75;
        } else {
            x = x + (i - behaveNum) * 75;
        }

        cc.log(oneOutputCardArr.length,x);
        for (var j = 0; j < oneOutputCardArr.length; j++) {
            var y = display.bottom + 115 + j * 115 / 2;
            var cardSprite = oneOutputCardArr[j];
            cardSprite.setCardArrayIndex(i, j);
            cardSprite.setPosition(x, y);
            cardSprite.setLocalZOrder(oneOutputCardArr.length - j);
        }
    }

    var userCard1 = FightVo.userCard1;
    userCard1.onHandleCardSpriteArr_ = onHandleCardSpriteArr;
    return onHandleCardSpriteArr;
}