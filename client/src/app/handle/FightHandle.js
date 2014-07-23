/**
 * 战斗控制层
 * Created by xhl on 2014/7/19.
 */
var FightHandle = BaseHandle.extend({

    /**
     * 配桌子
     */
    joinDesk:function(){
        var fightModel = Singleton.getInstance("FightModel");
        var info = fightModel.joinDesk();
        cc.log(info);
    }



})