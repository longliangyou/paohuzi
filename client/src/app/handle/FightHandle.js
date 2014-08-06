/**
 * 战斗控制层
 * Created by xhl on 2014/7/19.
 */
var FightHandle = BaseHandle.extend({


    ctor:function(){
        this._super();

        //监听model的相关cmd事件
        var fightModel = Singleton.getInstance("FightModel");
        fightModel.addEventListener("CMD",this.onMessageHandle())
    },

    onMessageHandle:function(event){
        var data = event.data;
        var cmd = data.cmd;
        if(cmd == CardUtil.ServerNotify.onNewRound){

        }
    },




    joinDesk:function(){
//        var callBack = function(result){
//            if(result.success){
//                this.sceneLayer_.sendCard();
//            }
//        }

        var fightModel = Singleton.getInstance("FightModel");
        var info = fightModel.joinDesk();
//        var info = fightModel.joinDesk(callBack.bind(this));
    }



})