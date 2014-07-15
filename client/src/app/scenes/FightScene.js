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
        avatarSprite1.setPosition(display.left + 100,display.top - 40);
        flysLayer.addChild(avatarSprite1);
        this.avatarSprite1_ = avatarSprite1

        var avatarSprite2 = new AvatarSprite(1);
        avatarSprite2.setPosition(display.right - 100,display.top - 40);
        flysLayer.addChild(avatarSprite2);
        this.avatarSprite2_ = avatarSprite2


        this.sendCard();

        return true;
    },
    /**
     * 发牌
     */
    sendCard:function(){
        var batch = this.batch_

        var cardSprite = new CardSprite();
        cardSprite.initData();
        cardSprite.initView();
        batch.addChild(cardSprite);
        cardSprite.setPosition(display.cx,display.cy);

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



