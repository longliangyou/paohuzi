/**
 * 战斗的 FightModel.js
 * Created by xhl on 2014/7/19.
 */
var FightModel = BaseModel.extend({


    ctor:function(){
        this._super();
        //监听后台消息
        //PomeloApi.addEventListener("onMessageHandle",this.onMessageHandle)
        return true;
    },



    onMessageHandle: function(event,notSendUserIdArray){
      var cmd = event.cmd;
      var data = event.data;
      var that = this;

      switch (cmd){
        case CardUtil.ServerNotify.onNewRound:
          FightVo.initUserCard(data);//data是大家牌的数据
          break;
        case CardUtil.ServerNotify.onJoinRoom:
          FightVo.initOneUserInfo(data.key,data.value);//data:{key:"",value:{}}
          break;
        case CardUtil.ServerNotify.onDiscard: // 等待玩家出牌 data:{userId:,interval:};
            break;
          case CardUtil.ServerNotify.onCard:    // 玩家出牌 data:{userId: userId,cardId: cardId}
          var userId = data.userId;
          var cardId = data.cardId;
          var userVo = FightVo.getUserVoByUserId(userId);
          userVo.deleteCardByCardId(cardId,"onHand");
          break;

          case CardUtil.ServerNotify.onEat:     // 玩家吃牌
          break;

        case CardUtil.ServerNotify.onPeng:    // 玩家碰牌
            //{   cardId:牌的数字,user:谁出的，分别有三种情况(previousUser/myUser/nextUser) }
          break;

        case CardUtil.ServerNotify.onWei:     // 玩家偎牌
            //{   cardId:牌的数字,user:谁出的，分别有三种情况(previousUser/myUser/nextUser) }
          break;

        case CardUtil.ServerNotify.onWin:     // 玩家胡牌
          //onWin(data);
          break;

        case CardUtil.ServerNotify.onTi:      // 玩家提牌
          //onTi(data);
          break;

        case CardUtil.ServerNotify.onPao:     // 玩家跑牌
          //onPao(data);
          break;

        case CardUtil.ServerNotify.onNewCard: // 新底牌
            //{   cardId:牌的数字 }// cardId 定义牌的标记 1-20  1-10 表示小写  11-20表示大写
          break;



        default:
          break;
      }


      var myUser = FightVo.myUser;
      if(! isInArray(notSendUserIdArray,myUser.userId)){
        var event = {name:"CMD",data:{data:data,cmd:cmd}};
        this.dispatchEvent(event);
      }



      //根据是否是npc 做ai相关的操作
      switch (cmd){
          case CardUtil.ServerNotify.onDiscard: // 等待玩家出牌 data:{userId:,interval:};
              var userId = data.userId;
              var interval = data.interval;
              var userVo = FightVo.getUserVoByUserId(userId);
              var callBackFun = function(){
                  that.card(userId,null,null);
              }
              if(userVo.isNpc){
                  callBackFun();
              }else{
                  FightCmdTime.start(interval,callBackFun)
              }
              break;
          case CardUtil.ServerNotify.onCard:    // 玩家出牌 data:{userId: userId,cardId: cardId}
              var userId = data.userId;
              var cardId = data.cardId;
//              var nextUser = FightVo.getNextUserByCurrentUserId(userId)//下一家
//              var nextNextUser = FightVo.getNextUserByCurrentUserId(nextUser.userId);//下下一家
//              var canPeng = CardUtil.canPeng(nextUser.onHand,cardId);
//              if(canPeng){
//
//              }
              break;
      }
    },





    /**
     * 进入到战斗以后  然后配卓发牌
     * 配卓成功 需要返回其他人的角色信息
     * 等待服务器通知 CardUtil.ServerNotify.onNewRound 才是开局
     * @return {rect:1,data:data}  rect为0表示失败，1表示成功
     */
    joinRoom: function(userId,callBack){
      if(FightVo.deskType === 0) {//单机版
          var previousUserUserId = 1;//写死上一个玩家的userId
          var nextUserUserId = 3;//写死下一个玩家的userId

          var isBankerIndex = 0;
          var round = Round.createNew([userId, nextUserUserId,previousUserUserId], isBankerIndex);
          FightVo.round = round;

          //第一个用户加入房间
          var event = {
              cmd: CardUtil.ServerNotify.onJoinRoom,
              data:{key:"previousUser",value:{nickName:"user1",gold:200,userId:previousUserUserId,isNpc:true}}
          };
          this.onMessageHandle(event);

          //第二个用户加入房间
          var event = {
              cmd: CardUtil.ServerNotify.onJoinRoom,
              data: {key:"nextUser",value:{nickName:"user3",gold:500,userId:nextUserUserId,isNpc:true}}
          };
          this.onMessageHandle(event);


          if(callBack)
            callBack();



          //发送牌  触发开桌
          var data = FightVo.round.getCardsByUserId(userId);
          var event = {
              cmd: CardUtil.ServerNotify.onNewRound,
              data: data //获取这个用户的牌
          };
          this.onMessageHandle(event);


          // 等待庄家出牌
          var event = {
            cmd: CardUtil.ServerNotify.onDiscard,
            data: {
              userId: FightVo.bankerUser.userId,
              interval: CardUtil.cardInterval
            }
          };
          this.onMessageHandle(event);



      }else if(FightVo.deskType == 2) { //三人网络场
        // callback()
      }
    },



    // 用户出牌
    card: function(userId, cardId, callback){
        FightCmdTime.stop();

        if (FightVo.deskType == 0) { //0表示单机 1表示私人场  2表示三人网络场    这里应该是1和2都要转发吧
            var user = FightVo.getUserVoByUserId(userId);
            var event = {
                cmd: CardUtil.ServerNotify.onCard,
                data: {
                    userId: userId,
                    cardId: cardId || user.getMathCardId() // cardId 定义牌的标记 1-20  1-10 表示小写  11-20表示大写
                }
            };

            var notSendUserIdArray = null
            if(cardId)
                notSendUserIdArray = [userId];
            this.onMessageHandle(event,notSendUserIdArray);
        }

        if(callback) {
            var result = {
                rect: 1
            };
          callback(result);
        }
    },


    // 吃牌
    eat: function(userId, cardId, callback){
//      FightCmdTime.stop();//任何一个操作停掉计时器
//      var cardEvent = {
//        cmd: CardUtil.ServerNotify.onEat,
//        data: {
//          userId: userId,
//          cardId: cardId // cardId 定义牌的标记 1-20  1-10 表示小写  11-20表示大写
//        }
//      };
//      this.onMessageHandle(event);
    },

    // 碰牌
    peng: function(userId, cardId, callback){
//        FightCmdTime.stop();//任何一个操作停掉计时器
    },

    // 胡牌
    win: function(userId, cardId, callback){
//        FightCmdTime.stop();//任何一个操作停掉计时器
    },

    // 取消操作
    cancel: function(userId, cardId, callback){
//        FightCmdTime.stop();//任何一个操作停掉计时器
    }
});
