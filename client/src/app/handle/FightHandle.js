/**
 * 战斗控制层
 * Created by xhl on 2014/7/19.
 */
var FightHandle = BaseHandle.extend({


    joinDesk:function(){
        var info = this.model_.joinDesk();
        if(info){
            var fightVo = new FightVo();
            fightVo.init(info)
            this.sceneLayer_.sendCard();
        }
    }



})