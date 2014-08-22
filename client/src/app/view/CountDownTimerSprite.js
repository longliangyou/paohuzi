/**
 * CountDownTimerSprite.js
 * 倒计时
 * Created by Administrator on 2014/8/12.
 */
//var CountDownTimerSprite = cc.Node.extend({
var CountDownTimerSprite = cc.LabelAtlas.extend({

    ctor:function(){
        this._super('', "res/font/Sheet_Timer_Number.png",32,42, '0');

        this.dt_ = 0;
        this.start_ = false;
        this.schedule(this.tick);
    },


//    initData:function(allDt,isLess){
//        this.isLess_ = isLess || true;
//        this.allDt_ = allDt || 10;
//    },
    initView:function(){
        this.setString(this.allDt_);
    },
    /**
     * 启动
     * @param isLess 表示是否是倒计时 是加还是减
     * @param allDt 所有的dt所需
     */
    start:function(allDt,isLess,onComplete){
        this.isLess_ = isLess || true;
        this.allDt_ = allDt || 15;
        this.onComplete_ = onComplete;

        this.start_ = true;
    },
    stop:function(){
        this.start_ = false;
    },



    /**
     * 帧刷新事件
     * @param dt
     */
    tick:function(dt){
        if(this.start_){
            this.dt_ = this.dt_ + dt;
            if(this.dt_ > 1){
                this.dt_ = 0;
                this.allDt_ = this.allDt_ - 1;
                this.initView();
                if(this.allDt_==0){
                    this.stop();

                    if(this.onComplete_){
                        this.onComplete_();
                    }
                }
            }
        }
    }
});



