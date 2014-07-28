/**
 * FightVo.js
 * 战斗牌桌的一些信息vo类
 *
 * Created by xhl on 2014/7/19.
 */


//某一家的牌
var oneUserCard = {
    //初始化数据
    initData:function(data){
        //num 自己家编号
        //uid 自己家的uid
        this.onHandleLength = data.onHandleLength // 手里牌的数量
        this.onTable  = data.onTable //自己家吃的牌 在桌面上的牌
        this.onTrash  = data.onTrash; // 自己家扔掉的牌
        this.onHand = data.onHand; //自己手上的牌


        this.onHandleCardSprite_ =[] ;//自己手上牌的sprite

        return this;
    }
};




var FightVo = {}
FightVo.deskType = 0; //0表示单机 1表示私人场  2表示三人网络场

/**
 * 初始化 fightvo 的牌的数据信息
 * @param info
 */
FightVo.init = function(data){
    this.userCard0 = cc.clone(oneUserCard.initData(data[0]));
    this.userCard1 = cc.clone(oneUserCard.initData(data[1]));
    this.userCard2 = cc.clone(oneUserCard.initData(data[2]));
}