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

        this.cardId_ = param.cardId;//定义牌的标记 1-20  1-10 表示小写  11-20表示大写

        this.cardType_ = this.cardId_> 10 ? "d":"x" ;//定义大小 d 或者 x
        this.cardNum_ = checkint((this.cardId_ )%10);//定义卡片的数字
        if(this.cardNum_ == 0) this.cardNum_ = 10;

        //调试定位原点
        var spt  = display.newSprite("#PointFlag.png");
        this.addChild(spt);
    },
    /**
     * 显示视图
     * @param showFlag  是否显示卡牌的正面
     * @param imageName 以下两种情况
     *                  当showFlag为true时，imageName 表示牌的大小类型，有 full_card、big_card、small_card 三种类型
     *                  当showFlag为false时，imageName 表示显示牌的背面的图片(fight_full_card.png、fight_big_card.png、fight_small_card.png、fight_wash_card.png)
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

//    /**
//     * 设置能够点击  点击拖动
//     */
//    setIsSendCard:function(isSendCard){//设置当前状态是不是滑动出牌状态还是其他状态
//        this.isSendCard_ = isSendCard;
//    },
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
                    startX: x,//that.getPositionX(),
                    startY: y,// that.getPositionY(),
                    lastX: 0,
                    lastY: 0,
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
                that.drag.lastX = x;
                that.drag.lastY = y;

                var newonHandleCardSpriteArr = CardTool.updateSort(that,that.drag) ;
                that.drag = null
            }
        }
        TouchUtil.addTouchEventListener(this,param);
        this.setTouchEnabled(true);
    }
//    setRotation:function(newRotation){
//        var cardSpt = this.cardSpt_
//        if(cardSpt)
//            cardSpt.setRotation(newRotation);
//    }
})