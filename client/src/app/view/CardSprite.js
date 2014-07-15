/**
 * 一张牌
 * Created by Administrator on 2014/7/14.
 */
var CardSprite = cc.Node.extend({

    initData:function(param){
        if(param == null) param ={}
        this.show_ = param.show || false;//是否显示牌
        this.imageType_ = param.imageType;//定义图片的大小类型
        this.cardType_ = param.cardType;//定义大小 d 或者 x
        this.cardNum_ = param.cardNum;//定义卡片的数字
    },
    initView:function(){
        var cardSpt = display.newSprite()
        this.addChild(cardSpt);
        this.cardSpt_ = cardSpt;




        if( this.show_ ) {
            var imageName = "#fight_" + this.imageType_ + "_" + this.cardType_ + this.cardNum_ + ".png";
            var spriteFrame = display.newSpriteFrame(imageName)
            //在需要时，修改 Sprite 的显示内容
            cardSpt.setSpriteFrame(spriteFrame)
        }else{
            var spriteFrame = display.newSpriteFrame("fight_wash_card.png")
//            cardSpt.initWithSpriteFrame(spriteFrame)
            cardSpt.setSpriteFrame(spriteFrame);
        }
    }
})