/**
 * CCSScrollView.js
 * Created by Administrator on 2014/7/9.
 */
var CCSScrollView = cc.Node.extend({
    init: function (param) {
        if (this._super()) {
            var size = param.size;
            var direction = param.direction;
            var cellSize = param.cellSize;
            var cellName = param.cellName;
            var array = param.array || [];


            // Create the scrollview
            var scrollView = ccui.ScrollView.create();
            scrollView.setDirection(direction);
            scrollView.setTouchEnabled(true);
            scrollView.setSize(size);
            this.addChild(scrollView);
            //cc.eventManager.addListener(this.listener, scrollView);

            //加载cell
            var callBack = function(){//js加载成功

                for(var i=0;i<array.length;i++){
                    var one = array[i];
                    var cla = eval("new "+cellName +"()");
                    cla.init(one);
                    scrollView.addNode(cla)
                    //TouchUtil.addTouchEndEventListener(cla.spt,this.onTouchEnded)

                    var claX = 0
                    var claY = 0
                    if(direction == ccui.ScrollView.DIR_HORIZONTAL) {//横板
                        claX = i * cellSize.width + cellSize.width/2;
                        claY = cellSize.height/2;
                    }else {
                        claX = cellSize.width/2;
                        claY = i * cellSize.height + cellSize.height/2;
                    }


                    cla.setPosition(claX,claY);
                }




                if(direction == ccui.ScrollView.DIR_HORIZONTAL) {//横板
                    var  innerContainerlen =  array.length * cellSize.width;
                    scrollView.setInnerContainerSize(cc.size( innerContainerlen, size.height));//scrollHeight 就是可以滑动的高度
                }else{
                    var  innerContainerlen =  array.length * cellSize.height;
                    scrollView.setInnerContainerSize(cc.size(size.width, size.height + scrollHeight));//scrollHeight 就是可以滑动的高度
                }

            }
            var jsName = cellName + ".js";
            cc.loader.loadJs("src/engin/components/ccsscrollView/",[jsName],callBack);



//            //加载ccs的ui
//            for(var i=0;i<array.length;i++) {
//                var button = ccui.Button.create();
//                button.setTouchEnabled(true);
//                button.loadTextures("res/hall_image_3ren.png", "res/hall_image_3ren.png", "");
//                button.x  = i * cellSize.width;
//                button.y = scrollView.getInnerContainerSize().height - button.height / 2;
//                scrollView.addChild(button);
//            }







//            var imageView = ccui.ImageView.create();
//            imageView.loadTexture("res/cocosui/ccicon.png");
////
//            var innerWidth = scrollView.width;
//            var innerHeight = scrollView.height  imageView.height;
//
//            scrollView.setInnerContainerSize(cc.size(innerWidth, innerHeight));
//
//            var button = ccui.Button.create();
//            button.setTouchEnabled(true);
//            button.loadTextures("res/cocosui/animationbuttonnormal.png", "res/cocosui/animationbuttonpressed.png", "");
//            button.x = innerWidth / 2;
//            button.y = scrollView.getInnerContainerSize().height - button.height / 2;
//            scrollView.addChild(button);
//
//            var textButton = ccui.Button.create();
//            textButton.setTouchEnabled(true);
//            textButton.loadTextures("res/cocosui/backtotopnormal.png", "res/cocosui/backtotoppressed.png", "");
//            textButton.setTitleText("Text Button");
//            textButton.x = innerWidth / 2;
//            textButton.y = button.getBottomInParent() - button.height;
//            scrollView.addChild(textButton);
//
//            var button_scale9 = ccui.Button.create();
//            button_scale9.setTouchEnabled(true);
//            button_scale9.setScale9Enabled(true);
//            button_scale9.loadTextures("res/cocosui/button.png", "res/cocosui/buttonHighlighted.png", "");
//            button_scale9.width = 100;
//            button_scale9.height = 32;
//            button_scale9.x = innerWidth / 2;
//            button_scale9.y = textButton.getBottomInParent() - textButton.height;
//            scrollView.addChild(button_scale9);
//
//            imageView.x = innerWidth / 2;
//            imageView.y = imageView.height / 2;
//            scrollView.addChild(imageView);

            return true;
        }
        return false;
    },
    listener : cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches:true,
        onTouchBegan: function(touch, event){
            cc.log("===onTouchBegan=========");
            return true
        }
    })


});