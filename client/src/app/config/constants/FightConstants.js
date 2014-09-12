/**
 * FightConstants.js
 * Created by Administrator on 2014/8/25.
 */
var FightConstants = {};

//几个坐标常量
//FightConstants.SEND_CARD_START_POS = "FightConstants.SEND_CARD_START_POS";//发牌起始
//FightConstants.SEND_CARD_END_POS = "FightConstants.SEND_CARD_END_POS";//发牌结束
//FightConstants.SEND_CARD_MIDDLE_POS = "FightConstants.SEND_CARD_MIDDLE_POS";//中间

FightConstants.init = function() {
    //钟表的倒计时 位置
    FightConstants.CountDownTimer_Position = [
        {x: display.left + 100, y: display.top - 100 },
        {x: display.cx - 200, y: display.cy },
        {x: display.right - 100, y: display.top - 100 }
    ];
}




//几种牌的类型
FightConstants.full_card = "full_card";
FightConstants.big_card = "big_card";
FightConstants.small_card = "small_card";