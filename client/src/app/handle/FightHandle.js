/**
 * 战斗控制层
 * Created by xhl on 2014/7/19.
 */
var FightHandle = BaseHandle.extend({

    ctor:function(){
        //监听model的相关cmd事件
        var fightModel = Singleton.getInstance("FightModel");

        var callBack = Util.proxy(this.onMessageHandle,this)
        fightModel.addEventListener("CMD",callBack)
    },


    onMessageHandle:function(event){

        var data = event.data;
        var cmd = data.cmd;

        cc.log("接受到命令：",cmd);
        switch (cmd){
            case CardUtil.ServerNotify.onNewRound:
                this.sceneLayer_.sendCard();
                break;

            default :
                break;
        }
    },





    joinRoom:function(){
        var callBack = function(result){
            var data = result.data;
            if(data.previousUser)
                this.sceneLayer_.initOneUserInfo("previousUser",FightVo.previousUser);
            if(data.nextUser)
                this.sceneLayer_.initOneUserInfo("nextUser",FightVo.nextUser);
        }
        var fightModel = Singleton.getInstance("FightModel");
        var info = fightModel.joinRoom(Util.proxy(callBack,this));
    }



})