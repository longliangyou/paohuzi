/**
 * 一张牌
 * Created by Administrator on 2014/7/14.
 */
//var CardSprite = cc.LayerRGBA.extend({
var CardSprite = cc.Sprite.extend({
//    var CardSprite = cc.Layer.extend({
//    var CardSprite = cc.Node.extend({

    initData:function(param){
        if(param == null) param ={}

        this.cardId_ = param.cardId;//定义牌的标记 0-79

        this.cardType_ = param.cardType;//定义大小 d 或者 x
        this.cardNum_ = param.cardNum;//定义卡片的数字
    },
    initView:function(){
        var cardSpt = display.newSprite()
        this.addChild(cardSpt);
        this.cardSpt_ = cardSpt;
    },
    /**
     * 更改显示
     * @param showFlag  是否显示卡牌的正面
     * @param imageName 以下两种情况
     *                  当showFlag为true时，imageName 表示牌的大小类型，有full、big、small三种类型
     *                  当showFlag为true时，imageName 表示显示牌的背面的图片(fight_full_card.png、fight_big_card.png、fight_small_card.png、fight_wash_card.png)
     */
    updateShow:function(showFlag,imageName){
        var cardSpt = this.cardSpt_
        if(showFlag) {
            var imageName = "#fight_" + this.imageType_ + "_" + this.cardType_ + this.cardNum_ + ".png";
            var spriteFrame = display.newSpriteFrame(imageName)
            //在需要时，修改 Sprite 的显示内容
            cardSpt.setSpriteFrame(spriteFrame)
        }else{
            var spriteFrame = display.newSpriteFrame(imageName)
            //cardSpt.initWithSpriteFrame(spriteFrame)
            cardSpt.setSpriteFrame(spriteFrame);
        }
    }
//    setRotation:function(newRotation){
//        var cardSpt = this.cardSpt_
//        if(cardSpt)
//            cardSpt.setRotation(newRotation);
//    }
})