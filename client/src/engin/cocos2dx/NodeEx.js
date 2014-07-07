/**
 * node基类
 * Created by Administrator on 2014/7/2.
 */

var NodeEx={

    init: function (target) {
        target.performWithDelay = function (callback, delay) {
            var action = transition.sequence([
                cc.DelayTime.create(delay),
                cc.CallFunc.create(callback)
            ]);
            target.runAction(action);
            return action
        },

        target.align=function(anchorPoint, x, y){
            var anchorPoint = display.ANCHOR_POINTS[anchorPoint] || {x:0,y:0}
            target.setAnchorPoint(anchorPoint.x,anchorPoint.y);
            if(x && y){
                target.setPosition(x, y)
            }
            return target
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


