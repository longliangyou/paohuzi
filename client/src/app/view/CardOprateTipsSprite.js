/**
 * CardOprateSprite.js
 * 牌的 吃胡碰 提示
 * Created by Administrator on 2014/8/28.
 */
var CardOprateTipsSprite = cc.Node.extend({
    ctor:function(){
        this._super();

        var oprate_hu_spt  = display.newSprite("#oprate_hu0.png");
        TouchUtil.addTouchEventListener(oprate_hu_spt,{onTouchEndedHandle:this.oprate_hu_touch});
        oprate_hu_spt.setTouchEnabled(true);
        this.addChild(oprate_hu_spt);
        this.oprate_hu_spt_ = oprate_hu_spt

        var oprate_peng_spt  = display.newSprite("#oprate_peng0.png");
        oprate_peng_spt.setPosition(100,0);
        TouchUtil.addTouchEventListener(oprate_peng_spt,{onTouchEndedHandle:this.oprate_peng_touch});
        oprate_peng_spt.setTouchEnabled(true);
        this.addChild(oprate_peng_spt);
        this.oprate_peng_spt_ = oprate_peng_spt

        var oprate_chi_spt  = display.newSprite("#oprate_chi0.png");
        oprate_chi_spt.setPosition(200,0);
        TouchUtil.addTouchEventListener(oprate_chi_spt,{onTouchEndedHandle:this.oprate_chi_touch});
        oprate_chi_spt.setTouchEnabled(true);
        this.addChild(oprate_chi_spt);
        this.oprate_chi_spt_ = oprate_chi_spt

        var oprate_close_spt  = display.newSprite("#oprate_close0.png");
        oprate_close_spt.setPosition(300,0);
        TouchUtil.addTouchEventListener(oprate_close_spt,{onTouchEndedHandle:this.oprate_close_touch});
        oprate_close_spt.setTouchEnabled(true);
        this.addChild(oprate_close_spt);
        this.oprate_close_spt_ = oprate_close_spt


        return true;
    },
    //胡
    oprate_hu_touch:function(){

    },
    //碰
    oprate_peng_touch:function(){

    },
    //吃
    oprate_chi_touch:function(){

    },
    //关闭
    oprate_close_touch:function(touch,event){
        this.setVisible(false);
    },

    initView:function(enableSpriteArray){
        this.oprate_hu_spt_.setTouchEnabled(false);
        this.oprate_peng_spt_.setTouchEnabled(false);
        this.oprate_chi_spt_.setTouchEnabled(false);
        this.oprate_close_spt_.setTouchEnabled(true);

        if(enableSpriteArray) {
            for (var i = 0; i < enableSpriteArray.length; i++) {
                var sptName = enableSpriteArray[i];
                this[sptName + "_spt_"].setTouchEnabled(true);
            }
        }
    }

});