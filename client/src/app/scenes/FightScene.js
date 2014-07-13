/**
 * 战斗场景
 * Created by Administrator on 2014/7/7.
 */
var FightLayer =  BaseScene.extend({
    ctor: function () {
        this._super();


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
    onEnter: function () {
        this._super();
        display.addSpriteFrames("res/Sheet_Hall.plist","res/Sheet_Hall.png")

        var layer = new FightLayer();
        this.addChild(layer);
    }
});



