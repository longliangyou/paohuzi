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

        this.onHandleCardSprite_ =[] ;//自己手上牌的sprite
        this.onHandleCardSpriteArr_ =[];//自己手上排好序的

        return this;
    },

    initUserInfo:function(data){
        this.nickName = data.nickName;
        this.avatarImageName = data.avatarImageName || "res/avatar/avatar1.png";
        this.gold = data.gold;
        this.userId = data.userId;

        return this;
    }
};







var FightVo = {}
FightVo.deskType = 0; //0表示单机 1表示私人场  2表示三人网络场
FightVo.isSendCard = false;
/**
 * 初始化 某个用户的角色信息
 * @param key 用户比如：
                 previousUser
                 nextUser
                 myUser
 * @param data 角色的相关信息
                 {nickName:"user1",gold:200,userId:1,avatarImageName:""}
 */
FightVo.initOneUserInfo = function(key,data){
    //这里分别存储三个玩家的用户角色信息 以及 用户的牌
    //this.previousUser
    //this.myUser
    //this.nextUser

    if(this[key] == null){
        this[key] = cc.clone(oneUserVo);
    }

    this[key].initUserInfo(data);

    return this[key]
}


/**
 * 初始化 fightvo 的牌的数据信息
 * @param info
 */
FightVo.initUserCard = function(data){
    this.previousUser.initUserCard(data[0]);
    this.nextUser.initUserCard(data[2]);
    this.myUser.initUserCard(data[1]);

}