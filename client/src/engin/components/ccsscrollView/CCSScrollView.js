/**
 * CCSScrollView.js
 * Created by Administrator on 2014/7/9.
 */
var CCSScrollView = cc.Node.extend({
    init: function (param,scene) {
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
                    cla.init(i,one,scrollView,scene);
                    //scrollView.addNode(cla)
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



            //加载ccs的ui
//            for(var i=0;i<array.length;i++) {
//                var button = ccui.Button.create();
//                button.setTouchEnabled(true);
//                button.loadTextures("res/hall_image_3ren.png", "res/hall_image_3ren.png", "");
//                button.x  = i * cellSize.width;
//                button.y = scrollView.getInnerContainerSize().height - button.height / 2;
//                scrollView.addChild(button);
//            }

            return true;
        }
        return false;
    }
//    listener : cc.EventListener.create({
//        event: cc.EventListener.TOUCH_ONE_BY_ONE,
//        swallowTouches:true,
//        onTouchBegan: function(touch, event){
//            cc.log("===onTouchBegan=========");
//            return true
//        }
//    })


});