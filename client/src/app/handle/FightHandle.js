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

        var eventData = event.data;
        var cmd = eventData.cmd;
        var data = eventData.data;
        var that = this;

        cc.log("接受到命令：",cmd);
        switch (cmd){
            case CardUtil.ServerNotify.onJoinRoom:
                var key = data.key;
                this.sceneLayer_.initOneUserInfo(key,FightVo[key]);
                break;
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
                }
                this.sceneLayer_.onDiscard(position,interval);
                break;
            case CardUtil.ServerNotify.onCard:    // 玩家出牌
                var userId = data.userId;
                var cardId = data.cardId;//定义牌的标记
                var isSend = data.isSend;
                var userVo = FightVo.getUserVoByUserId(userId);
                var cardSprite = userVo.getCardSpriteByCardId(cardId);
                this.card_callBack(userId, cardSprite);
                break;
            default :
                break;
        }
    },



    //回调
    //发牌回调
    card_callBack:function(userId,cardSprite){
        var startPos = this.getPositionByUserId(userId,FightConstants.SEND_CARD_START_POS)
        var middlePos = this.getPositionByUserId(userId,FightConstants.SEND_CARD_MIDDLE_POS)
        //var endPos = this.getPositionByUserId(userId,FightConstants.SEND_CARD_END_POS)
        CardAnimation.sendOutCardByUser(cardSprite,startPos,middlePos)
        this.setVisibleByCountDownTimerSprite();//隐藏tips

        if(userId == FightVo.myUser.userId) {
            CardTool.deleteOrgionByCardSprite(cardSprite);
            CardTool.sort();
        }
    },













    //后台相关服务 请求
    joinRoom:function(){
        var fightModel = Singleton.getInstance("FightModel");
        var info = fightModel.joinRoom(FightVo.myUser.userId,null);
    },
    //用户出牌
    card: function(userId,cardSprite){
        var fightModel = Singleton.getInstance("FightModel");
        var info = fightModel.card(userId,cardSprite.cardId_);
        this.card_callBack(userId,cardSprite);
//        var startPos = cardSprite.getPosition();//this.getPositionByUserId(userId,FightConstants.SEND_CARD_START_POS)
//        var middlePos = this.getPositionByUserId(userId,FightConstants.SEND_CARD_MIDDLE_POS)
//        var endPos = this.getPositionByUserId(userId,FightConstants.SEND_CARD_END_POS)
//        CardAnimation.sendOutCardByUser(cardSprite,startPos,middlePos,endPos,null)
//        if(userId == FightVo.myUser.userId) {
//            CardTool.deleteOrgionByCardSprite(cardSprite);
//            CardTool.sort();
//        }
//        this.setVisibleByCountDownTimerSprite();//隐藏tips
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