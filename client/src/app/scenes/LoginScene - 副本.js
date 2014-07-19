/**
 * 登陆场景
 */
var LoginLayer =  BaseScene.extend({
    ctor: function () {
        this._super();

        //创建一个sprite
        display.addSpriteFrames("res/explosion.plist","res/explosion.png")
        var sprite1 =display.newSprite("#explosion_08.png");
        this.addChild(sprite1);
        sprite1.setPosition(display.cx,display.cy)
        var param = {
            onTouchEndedHandle : function(){
                cc.log("onTouchEndedHandle 点击到了");
            }
        }
        TouchUtil.addTouchEventListener(sprite1,param)




        //创建动画
        var decorationParma = {
            framesName   : "explosion_",
            framesBegin  : 1,
            framesLength : 8,
            framesTime   : 1.0 / 20,
            zorder       : -2,
            playForever  : true,
            autoplay     : true,
            offsetX      : 10,
            offsetY      : -4
        };

        var decoration = new Decoration(decorationParma,1)
        decoration.createView(this)
        var view = decoration.getView()
        decoration.setDisplayFrameIndex(1);
        view.setPosition(display.cx , display.cy)
        view.flippedX =true






        return true;
    },

    /**
     * 帧刷新事件
     * @param dt
     */
    tick:function(dt){
        this._super(dt);
    }
});






var LoginScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new LoginLayer();
        this.addChild(layer);
    }
});













//一下是之前的HelloScene 备份
//var HelloWorldLayer = cc.Layer.extend({
//    sprite:null,
//    ctor:function () {
//        //////////////////////////////
//        // 1. super init first
//        this._super();
//
//        /////////////////////////////
//        // 2. add a menu item with "X" image, which is clicked to quit the program
//        //    you may modify it.
//        // ask director the window size
//        var size = cc.director.getWinSize();
//
//        // add a "close" icon to exit the progress. it's an autorelease object
//        var closeItem = cc.MenuItemImage.create(
//            res.CloseNormal_png,
//            res.CloseSelected_png,
//            function () {
//                cc.log("Menu is clicked!");
//            }, this);
//        closeItem.attr({
//            x: size.width - 20,
//            y: 20,
//            anchorX: 0.5,
//            anchorY: 0.5
//        });
//
//        var menu = cc.Menu.create(closeItem);
//        menu.x = 0;
//        menu.y = 0;
//        this.addChild(menu, 1);
//
//        /////////////////////////////
//        // 3. add your codes below...
//        // add a label shows "Hello World"
//        // create and initialize a label
//        var helloLabel = cc.LabelTTF.create("Hello World", "Arial", 38);
//        // position the label on the center of the screen
//        helloLabel.x = size.width / 2;
//        helloLabel.y = 0;
//        // add the label as a child to this layer
//        this.addChild(helloLabel, 5);
//
//        // add "HelloWorld" splash screen"
//        this.sprite = cc.Sprite.create(res.HelloWorld_png);
//        this.sprite.attr({
//            x: size.width / 2,
//            y: size.height / 2,
//            scale: 0.5,
//            rotation: 180
//        });
//        this.addChild(this.sprite, 0);
//
//        var rotateToA = cc.RotateTo.create(2, 0);
//        var scaleToA = cc.ScaleTo.create(2, 1, 1);
//
//        this.sprite.runAction(cc.Sequence.create(rotateToA, scaleToA));
//        helloLabel.runAction(cc.Spawn.create(cc.MoveBy.create(2.5, cc.p(0, size.height - 40)),cc.TintTo.create(2.5,255,125,0)));
//        return true;
//    }
//});
//
//var HelloWorldScene = cc.Scene.extend({
//    onEnter:function () {
//        this._super();
//        var layer = new HelloWorldLayer();
//        this.addChild(layer);
//    }
//});

