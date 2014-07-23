/**
 * 战斗的 FightModel.js
 * Created by xhl on 2014/7/19.
 */
var FightModel = BaseModel.extend({




    /**
     * 进入到战斗以后  然后配卓发牌
     * 配卓成功 需要返回其他人的角色信息 以及 大家的手上的牌
     * @return
     */
    joinDesk:function(){
        if(FightVo.deskType == 0) {//单机版
            FightVo.round = Round.createNew(["user1", "user2", "user3"], 1);
            return getCardsByUserId("user1");
        }else if(FightVo.deskType == 2) {//三人网络场

        }
    }




})

