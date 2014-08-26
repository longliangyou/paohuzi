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


    onMessageHandle: function(event){
      var cmd = event.cmd;
      var data = event.data;
      //这里无论是网络还是单机  都统一到这个回调   然后我在吧牌写到fightvo内存中 在fightvo中吧array解析出来
      // 开局之后，用户会收到牌的信息
      // 可以在 joinRoom 里面查看 data 的结构。
      // 这种结构由你来定，可以自己改为适合你的方式。

      switch (cmd){
        case CardUtil.ServerNotify.onNewRound:
          // [previousUser, myUser, nextUser]
          FightVo.initUserCard(data);
          break;
        case CardUtil.ServerNotify.onJoinRoom:
          //onJoinRoom(data);
          break;

          case CardUtil.ServerNotify.onCard:    // 玩家出牌
          /**
           * data: {
                  userId: userId,
                  cardId: cardId //定义牌的标记 1-20  1-10 表示小写  11-20表示大写
                }
           */
          break;

          case CardUtil.ServerNotify.onEat:     // 玩家吃牌
          /** data: {
                  userId: userId,
            cardId: cardId //定义牌的标记 1-20  1-10 表示小写  11-20表示大写
          }
           **/
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

        case CardUtil.ServerNotify.onDiscard: // 等待玩家出牌
            //等待那个玩家 {user:谁出的，分别有三种情况(previousUser/myUser/nextUser) ，}

            // 结构如下
            // data: {
            //   userId: ""
            //   interval: CardUtil.cardInterval # 倒计时秒数，默认值为 15 秒
            // }
            // 比较 userId, 如果 参数 userId 等于自己的 userId，那么就是自己出牌。
            // 出牌 调用 下面的card 方法
            // 如 interval 时间内，用户没有选择任何牌出牌，则随机自动出一张牌。
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
          var isBankerIndex = 1;
          var round = Round.createNew([userId, "user2", "user3"], isBankerIndex);
          FightVo.round = round;

          // 这里第一个参数是 error, 为 null 表示没有错误，服务器返回正确数据。
          var result = {
              rect : 1,
              data :{
                  previousUser: {nickName:"user1",gold:200,userId:1},
                  nextUser: {nickName:"user3",gold:500,userId:3}
              }
          };


          if(result.rect==1){//成功
              var data = result.data;
              if(data.previousUser)
                  FightVo.initOneUserInfo("previousUser",data.previousUser);
              if(data.nextUser)
                  FightVo.initOneUserInfo("nextUser",data.nextUser);

              callBack(result);

              //触发开桌
              var event = {
                  cmd: CardUtil.ServerNotify.onNewRound,
                  data: FightVo.round.getCardsByUserId(userId)
              };
              this.onMessageHandle(event);

              // 等待庄家出牌
              var event = {
                cmd: CardUtil.ServerNotify.onDiscard,
                data: {
                  userId: userId,
                  interval: CardUtil.cardInterval
                }
              };
              this.onMessageHandle(event);
          }


      }else if(FightVo.deskType == 2) { //三人网络场
        // callback()
      }
    },



    // 用户出牌
    card: function(userId, cardId, callback){
      var cardEvent = {
        cmd: CardUtil.ServerNotify.onCard,
        data: {
          userId: userId,
          cardId: cardId // cardId 定义牌的标记 1-20  1-10 表示小写  11-20表示大写
        }
      };
      if (FightVo.deskType == 1){
        this.onMessageHandle(event);
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
      var cardEvent = {
        cmd: CardUtil.ServerNotify.onEat,
        data: {
          userId: userId,
          cardId: cardId // cardId 定义牌的标记 1-20  1-10 表示小写  11-20表示大写
        }
      };
      this.onMessageHandle(event);
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
