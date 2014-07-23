/**
 * 战斗场景
 * Created by Administrator on 2014/7/7.
 */
var FightLayer =  BaseScene.extend({
    ctor: function () {
        this._super();

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

        var fight_card_storage= display.newSprite("#fight_card_storage.png",display.cx,display.top-140)
        fight_card_storage.align(display.BOTTOM_CENTER);
        batch.addChild(fight_card_storage);
        fight_card_storage.setVisible(false);
        this.fight_card_storage_ = fight_card_storage;

        //发牌
        for(var i=0;i<80;i++) {
            var cardSprite = new CardSprite();
            cardSprite.initData();
            cardSprite.initView(false,"fight_wash_card.png");
            batch.addChild(cardSprite);
            cardSprite.setPosition(display.cx, display.top + 40);
            this.allCardSpt_.push(cardSprite)
            transition.moveTo(cardSprite,{delay:i*0.01,time:0.1,y:display.cy + i*0.5})
        }


        //洗牌  太复杂  直接用cocostudio做动画算了
        var that =this;
        var onComplete = function(){
            //请求服务器配卓
            that.callMethod("joinDesk")
        }
        this.backgroundLayer_.performWithDelay(onComplete,2)
    },
    /**
     * 发牌
     */
    sendCard:function(){
        //庄家 以及 玩家分配过来并初始化


        //纯牌的夹子安排
        this.fight_card_storage_.setVisible(true);//存牌的夹子
        var fight_card_storage= display.newSprite("#fight_up_card_storage.png",display.cx-2,display.top-140+5)
        fight_card_storage.align(display.BOTTOM_CENTER);
        this.batch_.addChild(fight_card_storage);

        for(var i=0;i<80;i++) {
            var cardSprite = this.allCardSpt_[80-i-1];//索引为0的放上面
            cardSprite.initView(false,"fight_small_card.png");
            cardSprite.setPosition(display.cx,display.top-75-40 + i*0.2);
        }



        //开始发牌
        for(var i=0;i<15;i++){
            //庄家
            var index = i*3;
            var delay = i * 0.04;

            //从我开始逆时针发牌
            var cardSprite0 = this.allCardSpt_[index];
            cardSprite0.initView(false,"fight_big_card.png");
            TouchUtil.addTouchEndEventListener(cardSprite0,function(){
                cc.log("点击牌");
                CardAnimation.outputAnimationByOne(cardSprite0);
            });
            transition.moveTo(cardSprite0,{delay:delay,time:0.2,y:display.bottom + 10})


            var cardSprite1 = this.allCardSpt_[index+1];
            cardSprite1.initView(false,"fight_big_card.png");
            cardSprite1.setRotation(90);
            transition.moveTo(cardSprite1,{delay:delay,time:0.2,x:display.right + 100})

            var cardSprite2 = this.allCardSpt_[index+2];
            cardSprite2.initView(false,"fight_big_card.png");
            cardSprite2.setRotation(90);
            transition.moveTo(cardSprite2,{delay:delay,time:0.2,x:display.left - 100})
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
    onEnter: function () {
        this._super();
        display.addSpriteFrames("res/Sheet_Fight.plist","res/Sheet_Fight.png")


        var layer = new FightLayer();
        this.addChild(layer);

        //依赖注入mvc中的视图
        var handle = new FightHandle();
        handle.setView(layer);
        layer.setHandle(handle);
    }
});



