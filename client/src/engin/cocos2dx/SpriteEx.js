/**
 * node基类
 * Created by Administrator on 2014/7/2.
 */

var SpriteEx={

    init: function (target) {
        NodeEx.init(target);

        target.playAnimationOnce = function (animation, removeWhenFinished, onComplete, delay) {
            return transition.playAnimationOnce(target, animation, removeWhenFinished, onComplete, delay)
        },
        target.playAnimationForever = function (animation, delay) {
            return transition.playAnimationForever(target, animation, delay)
        }
    }


};






//NodeEx:schedule=function(callback, interval)
//var seq = transition.sequence({
//    CCDelayTime:create(interval),
//    CCCallFunc:create(callback),
//})
//local action = CCRepeatForever:create(seq)
//self:runAction(action)
//return action
//end
//


