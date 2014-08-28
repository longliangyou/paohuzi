/**
 * FightCmdTime.js
 * 服务端命令计时器
 * Created by Administrator on 2014/8/28.
 */
var FightCmdTime = {


    /**
     * 启动
     * @param isLess 表示是否是倒计时 是加还是减
     * @param allDt 所有的dt所需
     */
    start:function(allDt,onComplete){
        this.allDt_ = allDt || 15;
        this.onComplete_ = onComplete;
        this.dt_ = 0;

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
                if(this.allDt_==0){
                    this.stop();

                    if(this.onComplete_){
                        this.onComplete_();
                    }
                }
            }
        }
    }
}