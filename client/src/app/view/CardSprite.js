/**
 * 一张牌
 * Created by Administrator on 2014/7/14.
 */
//var CardSprite = cc.LayerRGBA.extend({
var CardSprite = cc.Sprite.extend({
//    var CardSprite = cc.Layer.extend({
//    var CardSprite = cc.Node.extend({
//     ctor:function(){
//         TouchUtil.addTouchEndEventListener(this,function(){
//             CardAnimation.outputAnimationByOne(this);
//         });
//         this.setTouchEnabled(false);
//     },
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
            cc.log(this.cardId_,this.cardNum_);
            var imageName = "fight_" + imageName + "_" + this.cardType_ + this.cardNum_ + ".png";
            var spriteFrame = display.newSpriteFrame(imageName)
            //在需要时，修改 Sprite 的显示内容
            this.setSpriteFrame(spriteFrame)
        }else{
            var spriteFrame = display.newSpriteFrame(imageName)
            //cardSpt.initWithSpriteFrame(spriteFrame)
            this.setSpriteFrame(spriteFrame);
        }
    }
//    setRotation:function(newRotation){
//        var cardSpt = this.cardSpt_
//        if(cardSpt)
//            cardSpt.setRotation(newRotation);
//    }
})