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

    //牌的初始位置 出牌的起始位置
    FightConstants.Start_Position = [
        {x: display.left, y: display.top - 150 },
        {x: display.cx , y: display.cy },
        {x: display.right, y: display.top - 150 }
    ];
    //出了牌后放各自中间的牌 出的牌在中间暂时
    FightConstants.Middle_Position = [
        {x: display.cx - 100, y: display.top - 150 },
        {x: display.cx , y: display.cy },
        {x: display.cx + 100, y: display.top - 150 }
    ];

    //碰的牌的位置
    FightConstants.Peng_Position = [
        {x: display.left -100, y: display.top - 150 -100 },
        {x: display.cx-100 , y: display.cy -100 },
        {x: display.right - 100, y: display.top - 150 -100 }
    ];
}




//几种牌的类型
FightConstants.full_card = "full_card";
FightConstants.big_card = "big_card";
FightConstants.small_card = "small_card";