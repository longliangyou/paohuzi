/**
 * CardTool.js
 * Created by Administrator on 2014/8/25.
 */
var CardTool = {};


/**
 * 排序
 */
CardTool.sort = function(){
    var myUser = FightVo.myUser;
    var onHandleCardSpriteArr = myUser.onHandleCardSpriteArr_;

    onHandleCardSpriteArr = _.select(onHandleCardSpriteArr, function(cardSprite){
        return cardSprite && cardSprite.length;
    });


    //重新整理排序
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

    sortFun();


    myUser.onHandleCardSpriteArr_ = onHandleCardSpriteArr;
    return onHandleCardSpriteArr;
}






CardTool.deleteOrgionByCardSprite = function(cardSprite){
    var myUser = FightVo.myUser;
    var onHandleCardSpriteArr = myUser.onHandleCardSpriteArr_;

    //首先移除当前的这个卡牌
    var  bigIndex = cardSprite.bigArrayIndex_;
    var smallIndex = cardSprite.smallArrayIndex_;
    var oneSmallArr = onHandleCardSpriteArr[bigIndex];
    oneSmallArr.splice(smallIndex,1);

    myUser.onHandleCardSpriteArr_ = onHandleCardSpriteArr;
    return onHandleCardSpriteArr;
}





/**
 * 返回一个重新组合好的 onHandleCardSpriteArr
 * @param CardSprite  onHandleCardSpriteArr其中的一个 cardsprite
 * @param onHandleCardSpriteArr 结构类似 CardUtil.riffle 返回的数组结构，不过最小单位是 cardsprite
 * @param drag
 */
CardTool.updateSort = function(CardSprite,drag) {
    var myUser = FightVo.myUser;
    var onHandleCardSpriteArr = myUser.onHandleCardSpriteArr_;


    var lastX = drag.lastX;
    var lastY = drag.lastY;
    if(lastY > display.cy  ) {
        var isSendCard = FightVo.isSendCard ; //当前是否是出牌
        if (isSendCard) {
            var handle = Singleton.getInstance("FightHandle");
            handle.card(card);
        }else{
            onHandleCardSpriteArr = CardTool.sort(onHandleCardSpriteArr);
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

        if(lastX<leftX){//最左边
            CardTool.deleteOrgionByCardSprite(CardSprite);
            onHandleCardSpriteArr.splice(0,0,[CardSprite]);
        }else if(lastX > rightX ) {//最右边
            CardTool.deleteOrgionByCardSprite(CardSprite);
            onHandleCardSpriteArr.splice(onHandleCardSpriteArrLen, 0, [CardSprite]);
        }else{//中间插入 插出等
            var count = Math.round((lastX - leftX)/75)
            if(count>onHandleCardSpriteArrLen-1) count = onHandleCardSpriteArrLen-1
            var bool = spliceOrgion(count);
            if(bool) {
                CardTool.deleteOrgionByCardSprite(CardSprite);
                var oneArr = onHandleCardSpriteArr[count];
                oneArr.splice(oneArr.length, 0, CardSprite);
            }
        }
    }


    onHandleCardSpriteArr = CardTool.sort(onHandleCardSpriteArr);
    return onHandleCardSpriteArr;
}

















