/**
 * 战斗控制层
 * Created by xhl on 2014/7/19.
 */
var FightHandle = BaseHandle.extend({

    init:function(){
        //监听model的相关cmd事件
        var fightModel = Singleton.getInstance("FightModel");

        var callBack = Util.proxy(this.onMessageHandle,this)
        fightModel.addEventListener("CMD",callBack)
        fightModel.joinRoom();
    },


    onMessageHandle:function(event){
        var eventData = event.data;
        var cmd = eventData.cmd;
        var data = eventData.data;
        var self = this;
        var loginModel = Singleton.getInstance("LoginModel");
        var me = loginModel.user;

        cc.log("接受到命令：",cmd);
        switch (cmd){
            case CardUtil.ServerNotify.onJoinRoom:
                var direct = data.direct;
                var user = data.user;
                if(me.userId == user.userId){//存储自己的风味
                    me.direct = direct;
                }
                var key = this.getSureDirectByServerDirect(direct);
                this.sceneLayer_.joinRoom(key,user);
                break;
            case CardUtil.ServerNotify.onNewRound://开局
                var onHand = data.onHand;
                var userId = data.userId;
                if(me.userId == userId){//存储自己的风味
                    me.onHand = onHand;
                }
                this.onNewRoundNum_ = checkint(this.onNewRoundNum_) + 1;
                if(this.onNewRoundNum_ == 3 ){
                    this.sceneLayer_.onNewRound(me.onHand);
                }
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
        var info = fightModel.joinRoom(UserVo.userId,null);
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
    },
    /**通过后台的index获取用户相对自己的风味**/
    getSureDirectByServerDirect:function(serverDirect){
        var loginModel = Singleton.getInstance("LoginModel");
        var me = loginModel.user;
        var key = serverDirect;
        if(me.direct == 0){//我是上位时
            key = key + 1;
            if(key>2)
                key = 0;
        }else if(me.direct == 2){
            key = key - 1;
            if(key<0)
                key = 2;
        }
        return key;
    }

})