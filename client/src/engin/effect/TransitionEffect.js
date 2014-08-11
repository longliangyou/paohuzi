/**
 * TransitionEffect.js
 * 动画
 * Created by Administrator on 2014/8/8.
 */
var TransitionEffect = {}


/**
 * 来回滑动
 */
TransitionEffect.backAndForth = function(sprite,x,y){
    var l1 = transition.moveBy(sprite,{x : -100, y : -100, time : 1.5})
//    var l2 = transition.moveBy(sprite,{x : 100, y : 100, time : 1.5})
//    var zuhe = transition.sequence([l1,l2]);//.repeatForever()
//
//    var repeat = zuhe.repeatForever();
////    zuhe.repeatForever();
//    //var zuheRep = CCRepeatForever.create(zuhe);
//    sprite.runAction(repeat)
    sprite.runAction(cc.MoveBy.create(0.3, cc.p(-100, 100)).repeatForever());
}


