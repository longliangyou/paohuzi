/**
 * 大厅
 *  可以选择 ： 三人场  私人场  比赛场  单机场
 * Created by Administrator on 2014/7/7.
 */
var HallLayer =  BaseScene.extend({
    ctor: function () {
        this._super();


        var bg = display.newColorLayer(display.COLOR_BLUE);
        this.addChild(bg);


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






var HallScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HallLayer();
        this.addChild(layer);
    }
});



