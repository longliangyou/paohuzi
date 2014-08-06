/**
 * 战斗的 FightModel.js
 * Created by xhl on 2014/7/19.
 */
var FightModel = BaseModel.extend({


    ctor:function(){
        this._super();
        //监听后台消息
        //PomeloApi.addEventListener("onMessageHandle",this.onMessageHandle)
    },


    onMessageHandle: function(event){
      var cmd = event.cmd;

      //这里无论是网络还是单机  都统一到这个回调   然后我在吧牌写到fightvo内存中 在fightvo中吧array解析出来
      // TODO 华哥
      // 开局之后，用户会收到牌的信息
      // 可以在 joinRoom 里面查看 data 的结构。
      // 这种结构由你来定，可以自己改为适合你的方式。
      var onNewRound = function(data){
        FightVo.init(data);
      };


      var onJoinRoom = function(data){

      };

      var onCard = function(data){

      };

      var onEat = function(data){

      };

      var onPeng = function(data){

      };

      var onWei = function(data){

      };

      var onWin = function(data){

      };

      var onTi = function(data){

      };

      var onPao = function(data){

      };

      var onNewCard = function(data){

      };


      switch (cmd){
        case CardUtil.ServerNotify.onNewRound:
          // TODO 华哥
          //  你按照这里写的data 结构把要传给你的 data 的完整数据都列出来
          //  所有的 case 都要，我就知道要传什么数据了。

          // data 结构
          // [previousPlayer, player, nextPlayer]
          onNewRound(event.data);
          break;
        case CardUtil.ServerNotify.onJoinRoom:
          onJoinRoom(event.data);
          break;

        case CardUtil.ServerNotify.onCard:    // 玩家出牌
          onCard(event.data);
          break;

        case CardUtil.ServerNotify.onEat:     // 玩家吃牌
          onEat(event.data);
          break;

        case CardUtil.ServerNotify.onPeng:    // 玩家碰牌
          onPeng(event.data);
          break;

        case CardUtil.ServerNotify.onWei:     // 玩家偎牌
          onWei(event.data);
          break;

        case CardUtil.ServerNotify.onWin:     // 玩家胡牌
          onWin(event.data);
          break;

        case CardUtil.ServerNotify.onTi:      // 玩家提牌
          onTi(event.data);
          break;

        case CardUtil.ServerNotify.onPao:     // 玩家跑牌
          onPao(event.data);
          break;

        case CardUtil.ServerNotify.onNewCard: // 新底牌
          onNewCard(event.data);
          break;

        default:
          break;
      }
    },


    /**
     * 进入到战斗以后  然后配卓发牌
     * 配卓成功 需要返回其他人的角色信息
     * 等待服务器通知 CardUtil.ServerNotify.onNewRound 才是开局
     * @return
     */
    joinRoom: function(userId, callBack){
      if(FightVo.deskType === 0) {//单机版
          var round = Round.createNew([userId, "user2", "user3"], 1);
          FightVo.round = round;
          var event = {
            cmd: CardUtil.ServerNotify.onNewRound,
            data: FightVo.round.getCardsByUserId(userId),
          };
          // TODO 华哥，这里的参数你定一下结构，你需要什么我就传什么
          // 这里第一个参数是 error, 为 null 表示没有错误，服务器返回正确数据。
          callback(null, {previousUser: "user3", nextUser: "user3"});

          this.onMessageHandle(event);
      }else if(FightVo.deskType == 2) { //三人网络场
        // callback()
      }
    }

});
