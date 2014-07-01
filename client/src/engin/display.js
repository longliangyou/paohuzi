/**
 * 负责根据 config.js 中定义的分辨率设定计算屏幕的设计分辨率。
 * 框架初始化后，display 模块提供下列属性：

 -   display.sizeInPixels.width,
 -   display.sizeInPixels.height 屏幕的像素分辨率
 -   display.widthInPixels,
 -   display.heightInPixels 屏幕的像素分辨率
 -   display.contentScaleFactor 内容缩放因子
 -   display.size.width,
 -   display.size.height 屏幕的设计分辨率
 -   display.width,
 -   display.height 屏幕的设计分辨率
 -   display.cx,
 -   display.cy 屏幕中央的 x 坐标和 y 坐标
 -   display.left,
 -   display.top,
 -   display.right,
 -   display.bottom 屏幕四边的坐标
 -   display.c_left,
 -   display.c_top,
 -   display.c_right,
 -   display.c_bottom 当父对象在屏幕中央时，屏幕四边的坐标
 *
 *
 * Created by Administrator on 2014/6/30.
 */
var display = {};



display.init = function(){
//    cc.director = cc.Director.getInstance();
//    cc.winSize = cc.director.getWinSize();
//    cc.view = cc.director.getOpenGLView();
    //var sharedDirector         = cc.director.sharedDirector;
    var glview =  cc.view //cc.director.getWinSize();//sharedDirector.getOpenGLView()
    var size = glview.getFrameSize()
    this.sizeInPixels = {width : size.width, height : size.height} //真实的屏幕像素

    var w = this.sizeInPixels.width
    var h = this.sizeInPixels.height


    if ( CONFIG_SCREEN_WIDTH == null || CONFIG_SCREEN_HEIGHT == null){
        CONFIG_SCREEN_WIDTH = w
        CONFIG_SCREEN_HEIGHT = h
    }


    if(CONFIG_SCREEN_AUTOSCALE == null){
        if( w > h)
            CONFIG_SCREEN_AUTOSCALE = "FIXED_HEIGHT"
        else
            CONFIG_SCREEN_AUTOSCALE = "FIXED_WIDTH"
    }else{
        CONFIG_SCREEN_AUTOSCALE = CONFIG_SCREEN_AUTOSCALE.toUpperCase();
    }



    var scale, scaleX, scaleY
    if (CONFIG_SCREEN_AUTOSCALE){
        if( typeof(CONFIG_SCREEN_AUTOSCALE_CALLBACK) == "function"){
            scaleX, scaleY = CONFIG_SCREEN_AUTOSCALE_CALLBACK(w, h, device.model)
        }

        if(scaleX == null || scaleY == null){
            scaleX = w / CONFIG_SCREEN_WIDTH;
            scaleY = h / CONFIG_SCREEN_HEIGHT
        }

        if(CONFIG_SCREEN_AUTOSCALE == "FIXED_WIDTH") {
            scale = scaleX
            CONFIG_SCREEN_HEIGHT = h / scale;

        }else if(CONFIG_SCREEN_AUTOSCALE == "FIXED_HEIGHT"){
            scale = scaleY
            CONFIG_SCREEN_WIDTH = parseFloat(w / scale)
        }else{
            scale = 1.0
            cc.log("display - invalid CONFIG_SCREEN_AUTOSCALE \"%s\"", CONFIG_SCREEN_AUTOSCALE)
        }

        glview.setDesignResolutionSize(CONFIG_SCREEN_WIDTH, CONFIG_SCREEN_HEIGHT, cc.ResolutionPolicy.NO_BORDER)
    }




    //记录一些display的信息
    var winSize = cc.director.getWinSize(); //sharedDirector.getWinSize()
    this.contentScaleFactor = scale
    this.size               = {width : winSize.width, height : winSize.height}
    this.width              = this.size.width
    this.height             = this.size.height
    this.cx                 = this.width / 2
    this.cy                 = this.height / 2
    this.c_left             = -this.width / 2
    this.c_right            = this.width / 2
    this.c_top              = this.height / 2
    this.c_bottom           = -this.height / 2
    this.left               = 0
    this.right              = this.width
    this.top                = this.height
    this.bottom             = 0
    this.widthInPixels      = this.sizeInPixels.width
    this.heightInPixels     = this.sizeInPixels.height

    //打印信息
    cc.log("# CONFIG_SCREEN_AUTOSCALE      = %s", CONFIG_SCREEN_AUTOSCALE)
    cc.log("# CONFIG_SCREEN_WIDTH          = %0.2f", CONFIG_SCREEN_WIDTH)
    cc.log("# CONFIG_SCREEN_HEIGHT         = %0.2f", CONFIG_SCREEN_HEIGHT)
    cc.log("# display.widthInPixels        = %0.2f", this.widthInPixels)
    cc.log("# display.heightInPixels       = %0.2f", this.heightInPixels)
    cc.log("# display.contentScaleFactor   = %0.2f", this.contentScaleFactor)
    cc.log("# display.width                = %0.2f", this.width)
    cc.log("# display.height               = %0.2f", this.height)
    cc.log("# display.cx                   = %0.2f", this.cx)
    cc.log("# display.cy                   = %0.2f", this.cy)
    cc.log("# display.left                 = %0.2f", this.left)
    cc.log("# display.right                = %0.2f", this.right)
    cc.log("# display.top                  = %0.2f", this.top)
    cc.log("# display.bottom               = %0.2f", this.bottom)
    cc.log("# display.c_left               = %0.2f", this.c_left)
    cc.log("# display.c_right              = %0.2f", this.c_right)
    cc.log("# display.c_top                = %0.2f", this.c_top)
    cc.log("# display.c_bottom             = %0.2f", this.c_bottom)
    cc.log("#")
}





