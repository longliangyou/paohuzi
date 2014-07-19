/**
 * 牌的一些动画类
 * Created by xhl on 2014/7/19.
 */
var CardAnimation = {};


/**
 * 从卡槽里抽出一张牌出来 的动画
 * @param  cardSprite对象
 * @param sendDirection 方位，自己为0，逆时针分别累加
 */
CardAnimation.outputAnimationByOne = function(cardSprite,sendDirection){
    var action = cc.FadeIn.create(0.01)
    var action = cc.MoveTo.create(0.1, cc.p(display.cx, display.top-75 + i*0.2))

}






















