/**
 * FightVo.js
 * 战斗牌桌的一些信息vo类
 *
 * Created by xhl on 2014/7/19.
 */


//某一家的牌
var oneUserVo = {
    //初始化数据
    initUserCard:function(data){
        //num 自己家编号
        //uid 自己家的uid
        this.onHandleLength = data.onHandleLength // 手里牌的数量
        this.onTable  = data.onTable //自己家吃的牌 在桌面上的牌
        this.onTrash  = data.onTrash; // 自己家扔掉的牌
        this.onHand = data.onHand; //自己手上的牌
        this.isBanker = data.isBanker;//是否是庄家

        this.onHandleCardSpriteArr_ =[];//自己手上排好序的

        return this;
    },

    initUserInfo:function(data){
        this.nickName = data.nickName;
        this.avatarImageName = data.avatarImageName || "res/avatar/avatar1.png";
        this.gold = data.gold;
        this.userId = data.userId;
        this.isNpc = data.isNpc;


        return this;
    },


    //删除一张卡牌
    deleteCardByCardId:function(cardId,key){
        var arr = this[key];
        for(var i=0;i<arr.length;i++){
            var one = arr[i];
            if(one == cardId){
                this[key].splice(i,1);
                break;
            }
        }
    },

    //随机获取一张卡牌 一般会从右边获取 只是获取 并没去删除
    getMathCardId:function(){
//        var onHandleCardSpriteArr = this.onHandleCardSpriteArr_;
//        var length = onHandleCardSpriteArr.length
//        var bigArr = onHandleCardSpriteArr[length-1];
//        var smallLength = bigArr.length;
//        var cardSprite = bigArr[smallLength-1]
        var onHand = this.onHand;
        return onHand[0];
    },
    //根据cardid 获取一个 cardsprite 的视图，这个主要客户端使用，如果当前玩家是自己的话，为直接从 this.onHandleCardSpriteArr_ 寻找，否则会新实例化一个出来
    getCardSpriteByCardId:function(cardId){
        if(FightVo.myUser.userId == this.userId ){
            for(var i =0;i<this.onHandleCardSpriteArr_.length;i++){
                var array = this.onHandleCardSpriteArr_[i];
                for(var j =0;j< array.length;j++){
                    var one = array[j];
                    if(one.cardId_ == cardId){
                        return one;
                    }
                }
            }
        }else{
            var cardSprite = new CardSprite();
            cardSprite.initData({cardId:cardId});
            cardSprite.initView(true,FightConstants.full_card);
            this.sceneLayer_.batch_.addChild(cardSprite);
            return cardSprite;
        }

    }
};









var FightVo = {
    deskType : 0, //0表示单机 1表示私人场  2表示三人网络场
    bankerUser :null,//庄家的用户
    isSendCard : false,//这个主要是为了客户端发牌使用
    /**
     * 初始化 某个用户的角色信息
     * @param key 用户比如：
                     previousUser
                     nextUser
                     myUser
     * @param data 角色的相关信息
                     {nickName:"user1",gold:200,userId:1,avatarImageName:""}
     */
    initOneUserInfo : function(key,data){
        //这里分别存储三个玩家的用户角色信息 以及 用户的牌   //this.previousUser  //this.myUser //this.nextUser
        if(this[key] == null){
            this[key] = cc.clone(oneUserVo);
        }
        this[key].initUserInfo(data);
        return this[key]
    },


    /**
     * 配卓时  初始化 fightvo 的牌的数据信息
     * @param info
     */
    initUserCard : function(data){
        this.previousUser.initUserCard(data[0]);
        this.nextUser.initUserCard(data[2]);
        this.myUser.initUserCard(data[1]);

        if(this.previousUser.isBanker){
            this.bankerUser = this.previousUser;
        }else if(this.nextUser.isBanker){
            this.bankerUser = this.nextUser;
        }else if(this.myUser.isBanker){
            this.bankerUser = this.myUser;
        }
    },

    /**
     * 通过一个用户的 userId
     */
    getUserVoByUserId:function(userId){
        var oneUser ;
        if(this.previousUser.userId == userId){
            oneUser = this.previousUser;
        }else  if(this.nextUser.userId == userId){
            oneUser = this.nextUser;
        }else if(this.myUser.userId == userId){
            oneUser = this.myUser;
        }
        return oneUser;
    },
    getNextUserByCurrentUserId:function(userId){
        var oneUser ;
        if(this.previousUser.userId == userId){
            oneUser = this.myUser;
        }else  if(this.nextUser.userId == userId){
            oneUser = this.previousUser;
        }else if(this.myUser.userId == userId){
            oneUser = this.nextUser;
        }
        return oneUser;
    },
    getPreviousUserByCurrentUserId:function(userId){
        var oneUser ;
        if(this.previousUser.userId == userId){
            oneUser = this.nextUser;
        }else  if(this.nextUser.userId == userId){
            oneUser = this.myUser;
        }else if(this.myUser.userId == userId){
            oneUser = this.previousUser;
        }
        return oneUser;
    }



}