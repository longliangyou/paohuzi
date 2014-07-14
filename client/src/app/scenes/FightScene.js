/**
 * 战斗场景
 * Created by Administrator on 2014/7/7.
 */
var FightLayer =  BaseScene.extend({
    ctor: function (data) {
        this._super();

        //数据存储
        this.data_ = data;

        //背景层
        var backgroundLayer = this.backgroundLayer_;
        var bg = display.newColorLayer(display.COLOR_BLUE);
        backgroundLayer.addChild(bg);

        var bg = display.newSprite("#fight_bg.png",display.cx,display.cy,null)
        bg.setContentSizeScale(display.width,display.height);
        backgroundLayer.addChild(bg);

        var bg_down = display.newSprite("#fight_down_bg.png",display.cx,50,null)
        bg_down.setContentSizeScale(display.width,100);
        backgroundLayer.addChild(bg_down);


        //加载三个头像显示





        return true;
    },

    /**
     * 帧刷新事件
     * @param dt
     */
    tick:function(dt){
        this._super(dt);
    }
});






var FightScene = cc.Scene.extend({
    initData:function(data){
        this.data_ = data;
    },
    onEnter: function () {
        this._super();
        display.addSpriteFrames("res/Sheet_Fight.plist","res/Sheet_Fight.png")

        var layer = new FightLayer(this.data_);
        this.addChild(layer);
    }
});



