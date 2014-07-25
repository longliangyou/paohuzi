/**
 * 战斗控制层
 * Created by xhl on 2014/7/19.
 */
var FightHandle = BaseHandle.extend({

    joinDesk:function(){
        var callBack = function(result){
            if(result.success){
                this.sceneLayer_.sendCard();
            }
        }

        var fightModel = Singleton.getInstance("FightModel");
        var info = fightModel.joinDesk(Util.proxy(callBack,this));
//        var info = fightModel.joinDesk(callBack.bind(this));
    }



})