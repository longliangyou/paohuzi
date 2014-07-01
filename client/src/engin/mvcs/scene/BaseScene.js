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


        this.schedule(this.tick);
        return true;
    },


    /**
     * 帧刷新事件
     * @param dt
     */
    tick:function(dt){
        cc.log(dt,"xxxxxxxxxxxxx");
    }
});


