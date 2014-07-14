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
        display.addSpriteFrames("res/Sheet_Hall.plist","res/Sheet_Hall.png")

        var layer = new FightLayer(this.data_);
        this.addChild(layer);
    }
});



