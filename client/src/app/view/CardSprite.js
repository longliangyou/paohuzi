/**
 * 一张牌
 * Created by Administrator on 2014/7/14.
 */
//var CardSprite = cc.LayerRGBA.extend({
var CardSprite = cc.Sprite.extend({
//    var CardSprite = cc.Layer.extend({
//    var CardSprite = cc.Node.extend({

    /**
     * 初始化
     * initData({cardId:})
     * @param param
     */
    initData:function(param){
        if(param == null) param ={}

        this.cardId_ = param.cardId;//定义牌的标记 0-79

        this.cardType_ = this.cardId_> 39 ? "d":"x" ;//定义大小 d 或者 x
        this.cardNum_ = checkint((this.cardId_ )%10);//定义卡片的数字
        if(this.cardNum_ == 0) this.cardNum_ = 10;
    },
    /**
     * 显示视图
     * @param showFlag  是否显示卡牌的正面
     * @param imageName 以下两种情况
     *                  当showFlag为true时，imageName 表示牌的大小类型，有 full_card、big_card、small_card 三种类型
     *                  当showFlag为true时，imageName 表示显示牌的背面的图片(fight_full_card.png、fight_big_card.png、fight_small_card.png、fight_wash_card.png)
     */
    initView:function(showFlag,imageName){
        if(showFlag) {
            var imageName = "fight_" + imageName + "_" + this.cardType_ + this.cardNum_ + ".png";
            var spriteFrame = display.newSpriteFrame(imageName)
            //在需要时，修改 Sprite 的显示内容
            this.setSpriteFrame(spriteFrame)
        }else{
            var spriteFrame = display.newSpriteFrame(imageName)
            //cardSpt.initWithSpriteFrame(spriteFrame)
            this.setSpriteFrame(spriteFrame);
        }
    },

    /**
     * 设置能够点击  点击拖动
     */
    setIsSendCard:function(isSendCard){//设置当前状态是不是滑动出牌状态还是其他状态
        this.isSendCard_ = isSendCard;
    },
    setCardArrayIndex:function(bigIndex,smallIndex){//记录当前卡牌所在的数组索引
        this.bigArrayIndex_ = bigIndex;
        this.smallArrayIndex_ = smallIndex;
    },
    setTouch:function() {
        var that = this;
        var param = {
            onTouchBeganHandle:function(touch,event){
                var x = touch.getLocationX();
                var y = touch.getLocationY();
                that.drag = {
                    startX: that.getPositionX(),
                    startY:  that.getPositionY(),
                    lastX: x,
                    lastY: y,
                    offsetX: 0,
                    offsetY: 0,
                    moveOffsetX: 0,
                    moveOffsetY: 0,
                    time: 0
                }
            },
            onTouchMovedHandle:function(touch,event){
                var x = touch.getLocationX();
                var y = touch.getLocationY();
                that.setPosition(x,y);
            },
            onTouchEndedHandle:function(touch,event){
                var x = touch.getLocationX();
                var y = touch.getLocationY();
                if(y > display.cy - 115/2 ) {
                    var isSendCard = this.isSendCard_; //当前是否是出牌
                    if (!isSendCard) {
                        that.setPosition(that.drag.startX, that.drag.startY);
                    } else {
                        that.setPosition(display.cx, display.cy + 115 / 2);
                    }
                }else{//根据自己需求的牌进行排列的操作
                    var userCard1 = FightVo.userCard1;
                    var onHandleCardSpriteArr = userCard1.onHandleCardSpriteArr_;



                    var currentBigIndexCardSpriteArray = onHandleCardSpriteArr[this.bigArrayIndex_];

                    var startOnHandleCardSprite = onHandleCardSpriteArr[0][0];
                    var startOnHandleCardSpriteX = startOnHandleCardSprite.getPositionX();
                    if(startOnHandleCardSprite == that){
                        startOnHandleCardSpriteX = that.drag.startX;
                    }
                    if(x < startOnHandleCardSpriteX){
                        if(startOnHandleCardSprite != that){
//                            currentBigIndexCardSpriteArray
                            onHandleCardSpriteArr.splice(0,0,[startOnHandleCardSprite]);
                        }
                    }

//                    var endOnHandleCardSprite = onHandleCardSpriteArr[onHandleCardSpriteArr.length-1][0];
//                    if(){
//
//                    }



                }

                that.drag = null
            }
        }
        TouchUtil.addTouchEventListener(this,param,this);
        this.setTouchEnabled(true);
    }
//    setRotation:function(newRotation){
//        var cardSpt = this.cardSpt_
//        if(cardSpt)
//            cardSpt.setRotation(newRotation);
//    }
})