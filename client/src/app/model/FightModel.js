/**
 * 战斗的 FightModel.js
 * Created by xhl on 2014/7/19.
 */
var FightModel = BaseModel.extend({


    ctor:function(){
        //监听后台消息
        //PomeloApi.addEventListener("onMessageHandle",this.onMessageHandle)
    },

    onMessageHandle:function(event){
        var cmd = event.cmd;
        if(cmd == CardUtil.ServerNotify.onNewRound){ // 开局
          //这里无论是网络还是单机  都统一到这个回调   然后我在吧牌写到fightvo内存中 在fightvo中吧array解析出来
          var onComplete = function(result){
              if(result.success){
                  var data = result.data;
                  FightVo.init(data);
              }
          };
          onComplete(event.result);

        }
    },

    /**
     * 进入到战斗以后  然后配卓发牌
     * 配卓成功 需要返回其他人的角色信息 以及 大家的手上的牌
     * @return
     */
    joinDesk:function(userId, callBack){
        if(FightVo.deskType === 0) {//单机版
            var round = Round.createNew([userId, "user2", "user3"], 1);
            FightVo.round = round;
            var event = {
              cmd: CardUtil.ServerNotify.onNewRound,
              result: {
                data: FightVo.round.getCardsByUserId(userId),
                success: true,
              },
              previousUser: 'user3',
              nextUser: 'user2'
            };
            callback({previousUser: "user3", nextUser: "user3"});
            this.onMessageHandle(event);

        }else if(FightVo.deskType == 2) {//三人网络场
            //onComplete(result);
        }
    }




})

