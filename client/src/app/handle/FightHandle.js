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
            case CardUtil.ServerNotify.onNewRound://开桌发牌
                this.sceneLayer_.sendCard();
                break;
            case CardUtil.ServerNotify.onDiscard: // 等待玩家出牌 倒计时
                var userId = data.userId;
                var interval = data.interval;
                var position = this.getPositionByUserId(userId)
                this.sceneLayer_.onDiscard(position,interval);
                break;
            case CardUtil.ServerNotify.onCard:    // 玩家出牌
                var userId = data.userId;
                var cardId = data.cardId;//定义牌的标记

                //var myUser =  FightVo.myUser;
                //if(userId != myUser.userId){//不是自己
                //}
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
    },
    //用户主动出牌
    card: function(card){
        var myUser = FightVo.myUser;
        if(card == null){
            card = myUser.getMathCard();
        }

        var fightModel = Singleton.getInstance("FightModel");
        fightModel.card(myUser.userId,card);

        card.setPosition(display.cx,display.cy);
        CardTool.deleteOrgionByCardSprite(card);
        CardTool.sort();
        this.setVisibleByCountDownTimerSprite();//隐藏tips
    },




    //一些handle的工具
    /**
     * 根据用户userid获取相应对应的坐标
     * @param userId
     */
    getPositionByUserId: function (userId) {
        var fightModel = Singleton.getInstance("FightModel");
        var previousUser =  FightVo.previousUser;
        var nextUser =  FightVo.nextUser;
        var myUser =  FightVo.myUser;


        var position = {x:display.cx,y:display.cy};
        FightVo.isSendCard = false;
        if(myUser.previousUser == userId ){
            position = {x:display.left + 200,y:display.top - 200}
        }else if (myUser.userId == userId){
            FightVo.isSendCard = true;
        }else if (nextUser.userId == userId){
            position = {x:display.right - 200,y:display.top - 200}
        }

        return position
    },
    /** 隐藏倒计时 **/
    setVisibleByCountDownTimerSprite:function(){
        if(this.sceneLayer_.countDownTimerSprite_){
            this.sceneLayer_.countDownTimerSprite_.setVisible(false);
            this.sceneLayer_.fingerTips_.setVisible(false);
        }
    }

})