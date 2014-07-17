/**
 * 战斗场景
 * Created by Administrator on 2014/7/7.
 */
var FightLayer =  BaseScene.extend({
    ctor: function (data) {
        this._super();

        //数据存储  {index:房间类型}
        this.data_ = data;

        //背景层
        var backgroundLayer = this.backgroundLayer_;
        var bg = display.newColorLayer(display.COLOR_BLUE);
        backgroundLayer.addChild(bg);

        var bg = display.newSprite("#fight_bg.png",display.cx,display.cy,null)
        bg.setContentSizeScale(display.width,display.height);
        backgroundLayer.addChild(bg);

        var bg_down = display.newSprite("#fight_down_bg.png")
        bg_down.align(display.BOTTOM_LEFT,display.cx,0);
        bg_down.setContentSizeScale(display.width,159);
        backgroundLayer.addChild(bg_down);









        //加载三个头像显示
        var flysLayer = this.flysLayer_
        var avatarSprite0 = new AvatarSprite();
        avatarSprite0.setPosition(display.cx,display.bottom + 40);
        flysLayer.addChild(avatarSprite0);
        this.avatarSprite0_ = avatarSprite0


        var avatarSprite1 = new AvatarSprite();
        avatarSprite1.setPosition(display.left + 120,display.top - 40);
        flysLayer.addChild(avatarSprite1);
        this.avatarSprite1_ = avatarSprite1

        var avatarSprite2 = new AvatarSprite(1);
        avatarSprite2.setPosition(display.right - 120,display.top - 40);
        flysLayer.addChild(avatarSprite2);
        this.avatarSprite2_ = avatarSprite2


        this.shuffleCard();

        return true;
    },
    /**
     * 洗牌
     */
    shuffleCard:function(){
        var batch = this.batch_
        this.allCardSpt_ = [];



        //发牌
        for(var i=0;i<80;i++) {
            var cardSprite = new CardSprite();
            cardSprite.initData();
            cardSprite.initView();
            batch.addChild(cardSprite);
            cardSprite.setPosition(display.cx, display.top + 40);
            this.allCardSpt_.push(cardSprite)
            transition.moveTo(cardSprite,{delay:i*0.01,time:0.1,y:display.cy + i*0.5})
        }


        //洗牌  太复杂  直接用cocostudio做动画算了
        var onComplete = function(){
//            for(var i=0;i<40;i++) {
//                var cardSprite = this.allCardSpt_[i];
//
//                if(i>30){
//
//                }else if(i>20){
//
//                }
//            }
            this.sendCard();
        }
        this.backgroundLayer_.performWithDelay(onComplete,2);



    },
    /**
     * 发牌
     */
    sendCard:function(){
        var batch = this.batch_
        var fight_card_storage= display.newSprite("#fight_card_storage.png",display.cx,display.top-40)
        batch.addChild(fight_card_storage);

        for(var i=0;i<80;i++) {
            var cardSprite = this.allCardSpt_[i];
            //cardSprite.setPosition(display.cx,display.top-40 + i*0.5);
        }
    },
    /**
     * 帧刷新事件
     * @param dt
     */
    tick:function(dt){
        this._super(dt);
    }
});






var FightScene = cc.Scene.extend({
    initData:function(data){
        this.data_ = data;
    },
    onEnter: function () {
        this._super();
        display.addSpriteFrames("res/Sheet_Fight.plist","res/Sheet_Fight.png")

        var layer = new FightLayer(this.data_);
        this.addChild(layer);
    }
});



