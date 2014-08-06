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


    onMessageHandle:function(event){
        var cmd = event.cmd;
        var data = event.data;
        var rect = event.rect;//0 表示失败 1表示成功


        if(rect == 0){//服务请求失败

            return;
        }

        if(cmd == CardUtil.ServerNotify.onNewRound){ // 开局
            //这里无论是网络还是单机  都统一到这个回调   然后我在吧牌写到fightvo内存中 在fightvo中吧array解析出来
            var cards = data.cards;
            FightVo.init(cards);

        }


        //派送事件给handle
        var event = {name :"CMD",data : {cmd : cmd}}
        this.dispatchEvent(event);
    },











    /**
     * 进入到战斗以后  请假配卓
     * 这个方法仅仅是请求配卓  无任何返回
     */
    joinDesk:function(){
        if(FightVo.deskType === 0) {//单机版

            var userId = null;
            var round = Round.createNew([userId, "user2", "user3"], 1);
            FightVo.round = round;

            var event = {
                cmd: CardUtil.ServerNotify.onNewRound,
                rect:1,
                data:{
                    cards:FightVo.round.getCardsByUserId(userId),
                    previousUser: 'user3',
                    nextUser: 'user2'
                }
            };
            this.onMessageHandle(event);

        }else if(FightVo.deskType == 2) {//三人网络场
            //onComplete(result);
        }
    }




})

