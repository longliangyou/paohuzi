/**
 * 房间类型选项
 *  比如 三人场  单机场
 * Created by Administrator on 2014/7/10.
 */
var CCSScrollCellView_HallType = cc.Class.extend({
//var CCSScrollCellView_HallType = cc.Node.extend({


    /**
     *初始化
     * @param index  房间类型
     * @param data  单个cell的数据
     * @param batch 父显示类
     */
    init:function(index,data,batch,scene){
        var image = data.image;
        /**
        var spt = display.newSprite(image)
        this.addChild(spt);
        **/

//        this.sprite_ = ccui.ImageView.create();
//        this.sprite_.loadTexture("res/hall_image_3ren.png");
//        batch.addChild(this.sprite_);


        var textButton = ccui.Button.create();
        textButton.setTouchEnabled(true);
        textButton.loadTextures("res/hall_image_3ren.png", "res/hall_image_3ren.png", "");
        //textButton.setTitleText("Title Button");
        textButton.addTouchEventListener(function (sender, type) {
                if (type == ccui.Widget.TOUCH_ENDED) {
                    scene.joinHallRoom(0);
                }
        } ,this);
        this.sprite_ =textButton;
        batch.addChild(this.sprite_);


        /**
        var param = {
            onTouchEndedHandle : function(){
                var arr = SceneConstants.getSceneName("FightScene");
                GameApp.enterScene(arr.scene,arr.backScene,arr.loadResources)
            }
        }
        TouchUtil.addTouchEventListener(this.sprite_,param)
     **/
    },
    setPosition:function(x,y){
        this.sprite_.setPosition(x,y);
    },
    getView:function(){
        return this.sprite_
    }
})