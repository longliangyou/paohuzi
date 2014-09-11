/**
 * 战斗的 FightModel.js
 * Created by xhl on 2014/7/19.
 */
var FightModel = BaseModel.extend({


    ctor:function(){
        this._super();

        //网络场 通过服务器的http请求监听服务器的 ServerNotifyManager 消息
        //PomeloApi.addEventListener("onMessageHandle",this.onMessageHandle)

        //单机场时 通过事件监听后台 ServerNotifyManager 消息
        var self = this;
        var callBack = function(event){
            cc.log("aaaaaaaaaaa",event);
            var eventData = event.data;
            self.onMessageHandle(eventData)
        }
        ServerNotifyManager.addEventListener("CMD",callBack)
        return true;
    },



    onMessageHandle: function(event){
      var cmd = event.cmd;
      var data = event.data;
      var self = this;

      switch (cmd){

        case CardUtil.ServerNotify.onJoinRoom:
          break;
        case CardUtil.ServerNotify.onNewRound:
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
    joinRoom: function(callBack){
        var loginModel = Singleton.getInstance("LoginModel");
      if(FightVo.deskType === 0) {//单机版
            RoomAction.joinRoom(loginModel.userId,null,callBack)
      }else if(FightVo.deskType == 2) { //三人网络场
        // callback()
      }
    },



    // 用户出牌
    card: function(userId, cardId, callback){
      // 用户出牌
      // 1. 发送消息到服务器，收到response，调用callback
      if (FightVo.deskType === 0){
        callback();
        // 单机情况下， 发一个 onCard 消息，然后由 onCard 消息处理这个牌的信息。


      }
    },


    // 吃牌
    eat: function(userId, cardIds, callback){
    },

    // 碰牌
    peng: function(userId, cardId, callback){
    },

    // 胡牌
    win: function(userId, cardId, callback){
    },

    // 取消操作
    cancel: function(userId, cardId, callback){
    }
});
