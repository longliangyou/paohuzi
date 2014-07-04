/**
 * BaseScene
 * 基础场景
 * Created by Administrator on 2014/7/1.
 */
var BaseScene = cc.Layer.extend({

    //构造函数
    ctor: function () {
        this._super();

        this.floorsLayer_ = display.newNode()
        this.addChild(this.floorsLayer_)//底层

        this.batch_=display.newNode()
        this.addChild(this.batch_)//渲染层

        this.flysLayer_=display.newNode()
        this.addChild(this.flysLayer_)//飞行层


        this.uiLayer_=display.newNode()
        this.addChild(this.uiLayer_);//ui层

        this.loadingLayer_=display.newNode()
        this.addChild(this.loadingLayer_);//loading层


        this.tipLayer_=display.newNode();
        this.addChild(this.tipLayer_);//tip层

        //开启当前视窗的触屏响应处理。
        //this.setTouchEnabled(true);
//        if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
            cc.eventManager.addListener(this.onKeyboard, this);
//        }
//        if (cc.sys.capabilities.hasOwnProperty('touches')) {
            cc.eventManager.addListener(this.onTouch, this);
//        }
        this.schedule(this.tick);
        return true;
    },
    onKeyboard:cc.EventListener.create({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: function (keyCode, event) {
            cc.log("onKeyPressed",keyCode);
        },
        onKeyReleased: function (keyCode, event) {
           cc.log("onKeyReleased",keyCode);
            if(keyCode == cc.KEY.back){

            }else if(keyCode == cc.KEY.menu){

            }
        }
    }),
    //http://www.cnblogs.com/linn/p/3658140.html 事件
    onTouch : cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE, //TOUCH_ONE_BY_ONE 为单次触摸事件监听器
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            //var target = event.getCurrentTarget();
            var x = touch.getLocation().x;
            var y = touch.getLocation().y;
            cc.log(event,touch,x,y,touch);
            this.drag = {
                startX  : x,
                startY  : y,
                lastX   : x,
                lastY   : y,
                offsetX : 0,
                offsetY : 0,
                moveOffsetX  : 0,
                moveOffsetY  : 0,
                time : 0
            }
            //BaseScene.touchesBeganHandle(event);//这里为什么不能调用BaseScene.touchesBeganHandle 的方法
            return true
        },
        onTouchesMoved:function (touches, event) {
            //BaseScene.touchesMovedHandle(event);
            cc.log("onTouchEnded");
        },
        onTouchesCancelled :function (touches, event) {
            //BaseScene.touchesCancelledHandle(event);
            cc.log("onTouchesCancelled");
        },
        onTouchEnded: function (touch, event) {
            this.drag = null;
            //BaseScene.touchEndedHandle(event);
            cc.log("onTouchEnded");
        }
    }),
    //当触屏按下事件被响应时的处理。
    touchesBeganHandle:function (event) {
        cc.log("onTouchesBegan");
    },
    //当触屏按下并移动事件被响应时的处理。
    touchesMovedHandle:function (touches, event) {
        cc.log("onTouchesMoved");
    },
    //当触屏松开事件响应时的处理
    touchEndedHandle:function (touches, event) {
        cc.log("onTouchesEnded");
    },
    //当触摸被取消(比如触摸过程中被来电打断),就会调用touchesCancelled方法。
    touchesCancelledHandle:function (touches, event) {
        cc.log("onTouchesCancelled");
    },


    /**
     * 帧刷新事件
     * @param dt
     */
    tick:function(dt){

    }

});


