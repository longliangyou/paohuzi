/**
 * BaseScene
 * 基础场景
 * Created by Administrator on 2014/7/1.
 */
var BaseScene = cc.Layer.extend({
    /**
     * 依赖注入控制器
     * @param handle
     */
    setHandle:function(handle){
        this.handle_ = handle;
    },
    //构造函数
    ctor: function () {
        this._super();

        this.mapLayer_ = display.newNode()
        this.mapLayer_.align(display.LEFT_BOTTOM, 0, 0)
        this.addChild(this.mapLayer_)


        this.backgroundLayer_ = display.newNode()
        this.mapLayer_.addChild(this.backgroundLayer_)//背景层


        this.floorsLayer_ = display.newNode()
        this.mapLayer_.addChild(this.floorsLayer_)//底层

        this.batch_ = display.newNode()
        this.mapLayer_.addChild(this.batch_)//渲染层

        this.flysLayer_ = display.newNode()
        this.mapLayer_.addChild(this.flysLayer_)//飞行层


        this.uiLayer_ = display.newNode()
        this.mapLayer_.addChild(this.uiLayer_);//ui层

        this.loadingLayer_ = display.newNode()
        this.mapLayer_.addChild(this.loadingLayer_);//loading层


        this.tipLayer_ = display.newNode();
        this.mapLayer_.addChild(this.tipLayer_);//tip层

        //开启当前视窗的触屏响应处理。
        //if (cc.sys.capabilities.hasOwnProperty('keyboard'))
        cc.eventManager.addListener(this.onKeyboard, this);

        //tick帧开启
        //this.timer_ = new Timer();
        this.schedule(this.tick);


        return true;
    },
    setTouchEnabled: function (enable) {
        if (enable) {
//           if (cc.sys.capabilities.hasOwnProperty('touches'))
            cc.eventManager.addListener(this.onTouch, this);
        } else {
            cc.eventManager.removeListener(this.onTouch, this);
        }
    },
    onKeyboard: cc.EventListener.create({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: function (keyCode, event) {
            cc.log("onKeyPressed", keyCode);
        },
        onKeyReleased: function (keyCode, event) {
            cc.log("onKeyReleased", keyCode);
            if (keyCode == cc.KEY.back) {

            } else if (keyCode == cc.KEY.menu) {

            }
        }
    }),
    //http://www.cnblogs.com/linn/p/3658140.html 事件
    onTouch: cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE, //TOUCH_ONE_BY_ONE 为单次触摸事件监听器
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            //var target = event.getCurrentTarget();
            var x = touch.getLocation().x;
            var y = touch.getLocation().y;
            this.drag = {
                startX: x,
                startY: y,
                lastX: x,
                lastY: y,
                offsetX: 0,
                offsetY: 0,
                moveOffsetX: 0,
                moveOffsetY: 0,
                time: 0
            }
            //BaseScene.touchesBeganHandle(event);//这里为什么不能调用BaseScene.touchesBeganHandle 的方法
            return true
        },
        onTouchMoved: function (touches, event) {
            //BaseScene.touchesMovedHandle(event);
            cc.log("onTouchesMoved");
            return true
        },
        onTouchCancelled: function (touches, event) {
            //BaseScene.touchesCancelledHandle(event);
            cc.log("onTouchCancelled");
        },
        onTouchEnded: function (touch, event) {
            this.drag = null;
            //BaseScene.touchEndedHandle(event);
            cc.log("onTouchEnded");
        }
    }),
    //当触屏按下事件被响应时的处理。
    touchesBeganHandle: function (event) {
        cc.log("onTouchesBegan");
    },
    //当触屏按下并移动事件被响应时的处理。
    touchesMovedHandle: function (touches, event) {
        cc.log("onTouchesMoved");
    },
    //当触屏松开事件响应时的处理
    touchEndedHandle: function (touches, event) {
        cc.log("onTouchesEnded");
    },
    //当触摸被取消(比如触摸过程中被来电打断),就会调用touchesCancelled方法。
    touchesCancelledHandle: function (touches, event) {
        cc.log("onTouchesCancelled");
    },


    /**get 数据**/
    /**
     通过制定的layerName获取层
     **/
    getLayerBySceneLayerName: function (parentLayerName) {
        var currentLayer;

        if (parentLayerName == SceneConstants.BACKGROUND_LAYER)//背景层
            currentLayer = this.backgroundLayer_
        else if (parentLayerName == SceneConstants.FLOORS_LAYER)//地板层
            currentLayer = this.floorsLayer_
        else if (parentLayerName == SceneConstants.FLY_LAYER) //飞行层
            currentLayer = this.flysLayer_
        else if (parentLayerName == SceneConstants.TOUCH_LAYER) //触摸层
            currentLayer = this
        else if (parentLayerName == SceneConstants.UI_LAYER) //ui层
            currentLayer = this.uiLayer_
        else if (parentLayerName == SceneConstants.LOADING_LAYER) //地图的loading层
            currentLayer = this.loadingLayer_
        else if (parentLayerName == SceneConstants.TIP_LAYER)//tips层
            currentLayer = this.tipLayer_
        else
            currentLayer = this.batch_
        return currentLayer;
    },


    /**
     * 帧刷新事件
     * @param dt
     */
    tick:function(dt){
        //this.timer_.tick(dt);
    },
    onCleanUp:function(){
        cc.log("onCleanUp 销毁");
        //this.timer_.dispose();
//        cc.TextureCache.getInstance().removeAllTextures();
//        cc.TextureCache.getInstance().dumpCachedTextureInfo();//test 打印仍然在使用的纹理
//        cc.TextureCache.purgeSharedTextureCache();
//        cc.SpriteFrameCache.getInstance().removeSpriteFrames();
//        cc.SpriteFrameCache.purgeSharedSpriteFrameCache();
//        cc.ShaderCache.purgeSharedShaderCache();
//        ccs.ArmatureDataManager.purge();
    },


    /**
     * 调用handle控制器的类
     * @param methodName
     * @param param 参数  依次排开
     */
    callMethod:function(){
//        var methodName = arguments.shift();
//        [].shift.apply(arguments)
        var methodName = Array.prototype.shift.apply(arguments)
//        methodName.apply(this.handle_, arguments)
        this.handle_[methodName].apply(this.handle_, arguments)
    }
});


