/**
 * Timer.js
 * timer定时器，为了保证每个场景只允许一个timer
 * 所有每个场景用一个统一的Timer类管理
 * 当进入新场景时 会自动启用，退出场景会自动销毁
 * Created by Administrator on 2014/8/11.
 */
var Timer = cc.Class.extend({

    ctor:function(){
        this._super();
        EventProtocol.extend(this);


        this.second_dt_ = 0;

        return true;
    },


    tick:function(dt){
        //每帧抛出一个事件
        var event = {name:TimerEvent.TIMER}
        this.dispatchEvent(event);


        this.second_dt_ = this.second_dt_ + dt;
        if(this.second_dt_>1){
            this.second_dt_ = 0;

            var event = {name:TimerEvent.TIMER_SECOND_COMPLETE}
            this.dispatchEvent(event);
        }
    },
    /**
     * 销毁
     */
    dispose:function(){
        this.second_dt_ = 0;
        this.removeAllEventListeners();
    }
});







