/**
 * TouchUtil 按钮初始化
 * Created by xhl on 2014/7/5.
 */
var TouchUtil = {};


/**
 * 监听事件
 */
TouchUtil.addTouchEventListener = function(param){
    var target = param.target;
    var onTouchEndedHandle = param.onTouchEndedHandle;
    var onTouchMovedHandle = param.onTouchMovedHandle,onTouchBeganHandle = param.onTouchBeganHandle;

    var onTouchEndedHandleFun = function(){
        if(onTouchEndedHandle){
            onTouchEndedHandle();
        }
    }
    var onTouchMovedHandleFun = function(){
        if(onTouchMovedHandle){
            onTouchMovedHandle();
        }
    }
    var onTouchBeganHandleFun = function(){
        if(onTouchBeganHandle){
            onTouchBeganHandle();
        }
    }

    //监听函数
    var listener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches:true,
        onTouchBegan: function(touch, event){
            var target = event.getCurrentTarget();

            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            if (cc.rectContainsPoint(rect, locationInNode)) {
                cc.log("sprite onTouchBegan.. ");
                //target.setOpacity(180);
                onTouchBeganHandleFun();
                return true;
            }
            return false;
        },
        onTouchMoved: function(touch, event){
            cc.log("sprite onTouchMoved.. ");
            onTouchMovedHandleFun()
        },
        onTouchEnded: function(touch, event){
            cc.log("sprite onTouchesEnded.. ");
            //event.getCurrentTarget().setOpacity(255);
            onTouchEndedHandleFun();
        }
    });
    cc.eventManager.addListener(listener, target);
}