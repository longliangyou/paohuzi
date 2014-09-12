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
                var serverDirect = data.serverDirect;
                var user = data.user;
                if(me.userId == user.userId){//存储自己的风味
                    me.serverDirect = serverDirect;
                }
                var clientDirect = this.getClientDirectByServerDirect(serverDirect);
                this.sceneLayer_.joinRoom(clientDirect,user);
                break;
            case CardUtil.ServerNotify.onNewRound://开局
                this.onNewRoundNum_ = checkint(this.onNewRoundNum_) + 1;
                if(this.onNewRoundNum_ == 3 ){
                    this.sceneLayer_.onNewRound(FightVo.cards);
                }
                break;
            case CardUtil.ServerNotify.onDisCard: // 等待玩家出牌 data:{userId:,interval:};
                var userId = data.userId;
                var clientDirect = this.getClientDirectByUserId(userId);
                var position = FightConstants.CountDownTimer_Position[clientDirect];
                this.sceneLayer_.setVisibleWithFingerTips(true,position);
                this.sceneLayer_.setVisibleWithCountDownTimerTips(true,position,null);
                break;
            default :
                break;
        }
    },



//    //回调
//    //发牌回调
//    card_callBack:function(userId,cardSprite){
//        var startPos = this.getPositionByUserId(userId,FightConstants.SEND_CARD_START_POS)
//        var middlePos = this.getPositionByUserId(userId,FightConstants.SEND_CARD_MIDDLE_POS)
//        //var endPos = this.getPositionByUserId(userId,FightConstants.SEND_CARD_END_POS)
//        CardAnimation.sendOutCardByUser(cardSprite,startPos,middlePos)
//        this.setVisibleByCountDownTimerSprite();//隐藏tips
//
//        if(userId == FightVo.myUser.userId) {
//            CardTool.deleteOrgionByCardSprite(cardSprite);
//            CardTool.sort();
//        }
//    },













    //后台相关服务 请求
    joinRoom:function(){
        var fightModel = Singleton.getInstance("FightModel");
        var info = fightModel.joinRoom(UserVo.userId,null);
    },
//    //用户出牌
//    card: function(userId,cardSprite){
//        var fightModel = Singleton.getInstance("FightModel");
//        var info = fightModel.card(userId,cardSprite.cardId_);
//        this.card_callBack(userId,cardSprite);
////        var startPos = cardSprite.getPosition();//this.getPositionByUserId(userId,FightConstants.SEND_CARD_START_POS)
////        var middlePos = this.getPositionByUserId(userId,FightConstants.SEND_CARD_MIDDLE_POS)
////        var endPos = this.getPositionByUserId(userId,FightConstants.SEND_CARD_END_POS)
////        CardAnimation.sendOutCardByUser(cardSprite,startPos,middlePos,endPos,null)
////        if(userId == FightVo.myUser.userId) {
////            CardTool.deleteOrgionByCardSprite(cardSprite);
////            CardTool.sort();
////        }
////        this.setVisibleByCountDownTimerSprite();//隐藏tips
//    },





































//    /** 隐藏倒计时 **/
//    setVisibleByCountDownTimerSprite:function(){
//        if(this.sceneLayer_.countDownTimerSprite_){
//            this.sceneLayer_.countDownTimerSprite_.setVisible(false);
//            this.sceneLayer_.fingerTips_.setVisible(false);
//        }
//    },
    /**通过userId 获取用户的上家下家**/
    getClientDirectByUserId:function(userId){
        var cards = FightVo.cards;
        for(var i =0;i<3;i++){
            if(userId == cards[i].userId){
                return i;
            }
        }
    },
    /**加入房间时，因为服务器还没分配上家，我，下家 通过后台的index获取用户相对自己的风味**/
    getClientDirectByServerDirect:function(serverDirect){
        var loginModel = Singleton.getInstance("LoginModel");
        var me = loginModel.user;
        var key = serverDirect;
        if(me.serverDirect == 0){//我是上位时
            key = key + 1;
            if(key>2)
                key = 0;
        }else if(me.serverDirect == 2){
            key = key - 1;
            if(key<0)
                key = 2;
        }
        return key;
    }

})