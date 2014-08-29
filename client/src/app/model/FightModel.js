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
          break;
        case CardUtil.ServerNotify.onJoinRoom:
          break;
        case CardUtil.ServerNotify.onDiscard: // 等待玩家出牌 data:{userId:,interval:};
            break;
        case CardUtil.ServerNotify.onCard:    // 玩家出牌 data:{userId: userId,cardId: cardId}
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



      var event = {name:"CMD",data:{data:data,cmd:cmd}};
      this.dispatchEvent(event);
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


          //第一个用户加入房间
          var data = {key:"previousUser",value:{nickName:"user1",gold:200,userId:previousUserUserId,isNpc:true}};
          //这里 龙哥要做的是 创建一个user对象 吧这个用户的信息也存储起来 这样能和真实用户的模型保持一致，一个user对象，不仅有一些userInfo的信息，分卓后也会有牌的信息
          //通过userId，能取到用户user info，也能取到自己手上的card info 即可，
          //...to do..
          var event = {
              cmd: CardUtil.ServerNotify.onJoinRoom,
              data:data
          };
          this.onMessageHandle(event);

          //第二个用户加入房间
          var data = {key:"nextUser",value:{nickName:"user3",gold:500,userId:nextUserUserId,isNpc:true}}
          //这里 龙哥要做的是 创建一个user对象 吧这个用户的信息也存储起来 这样能和真实用户的模型保持一致，一个user对象，不仅有一些userInfo的信息，分卓后也会有牌的信息
          //通过userId，能取到用户user info，也能取到自己手上的card info 即可
          //...to do..
          var event = {
              cmd: CardUtil.ServerNotify.onJoinRoom,
              data: data
          };
          this.onMessageHandle(event);


          //配牌
          var isBankerIndex = 0;
          var round = Round.createNew([userId, nextUserUserId,previousUserUserId], isBankerIndex);
          FightVo.round = round;




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
          var bankerUserId = userId
          var onDiscardInterval = CardUtil.cardInterval
          var event = {
            cmd: CardUtil.ServerNotify.onDiscard,
            data: {
              userId: bankerUserId,
              interval: onDiscardInterval
            }
          };
          this.onMessageHandle(event);
          //这里 龙哥要做的是：调用ai  然后下面我写了一个 FightAiAction 你看看我的思路 然后你自己觉得可以学的就学 不好的 就丢弃掉
          //理论来说任何一个onMessageHandle命令后 都要调用ai模拟用户操作，所以ai可以和onMessageHandle命令一一对应
          FightAiAction.onDiscardAction(bankerUserId,onDiscardInterval) //...to do..


      }else if(FightVo.deskType == 2) { //三人网络场
        // callback()
      }
    },



    // 用户出牌
    card: function(userId, cardId, callback){
//        FightCmdTime.stop();//任何一个操作停掉计时器
    },


    // 吃牌
    eat: function(userId, cardId, callback){
//      FightCmdTime.stop();//任何一个操作停掉计时器
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
