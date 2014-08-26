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
                FightVo.isSendCard = false;
                var position = this.getPositionByUserId(userId)
                if(userId == FightVo.myUser.userId) {//如果是我自动随机出一张牌
                    FightVo.isSendCard = true;
                    var onComplete = function () {
                        var myUser = FightVo.myUser;
                        if (userId == myUser.userId) {
                            this.card();
                        }
                    }
                }
                this.sceneLayer_.onDiscard(position,interval,onComplete);
                break;
            case CardUtil.ServerNotify.onCard:    // 玩家出牌
                var userId = data.userId;
                var cardId = data.cardId;//定义牌的标记
                var startPos = this.getPositionByUserId(userId,FightConstants.SEND_CARD_START_POS)
                var middlePos = this.getPositionByUserId(userId,FightConstants.SEND_CARD_MIDDLE_POS)
                var endPos = this.getPositionByUserId(userId,FightConstants.SEND_CARD_END_POS)
                var cardSprite = new CardSprite();
                cardSprite.initData({cardId:cardId});
                cardSprite.initView(true,FightConstants.full_card);
                this.sceneLayer_.batch_.addChild(cardSprite);
                CardAnimation.sendOutCardByUser(cardSprite,startPos,middlePos,endPos)
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
        var info = fightModel.joinRoom(FightVo.myUser.userId,Util.proxy(callBack,this));
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
    getPositionByUserId: function (userId,mark) {
        var fightModel = Singleton.getInstance("FightModel");
        var previousUser =  FightVo.previousUser;
        var nextUser =  FightVo.nextUser;
        var myUser =  FightVo.myUser;

        var position = {x: display.cx, y: display.cy};
        if(mark == FightConstants.SEND_CARD_START_POS ) {

            if (previousUser.userId == userId) {
                position = {x: display.left - 50, y: display.top - 100}
            } else if (myUser.userId == userId) {
                position = {x: 0, y: 0};
            } else if (nextUser.userId == userId) {
                position = {x: display.right + 50, y: display.top - 100}
            }
        }else  if(mark == FightConstants.SEND_CARD_END_POS ) {

            if (previousUser.userId == userId) {
                position = {x : display.left,y:display.top - 200 };
            } else if (myUser.userId == userId) {
                position = {x : display.right,y:display.bottom + 10 };
            } else if (nextUser.userId == userId) {
                position = {x : display.right,y:display.top - 200 };
            }
        }else {  //FightConstants.SEND_CARD_MIDDLE_POS
            if (previousUser.userId == userId) {
                position = {x: display.left + 200, y: display.top - 200}
            } else if (myUser.userId == userId) {
                position = {x: display.cx, y: display.cy};
            } else if (nextUser.userId == userId) {
                position = {x: display.right - 200, y: display.top - 200}
            }
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