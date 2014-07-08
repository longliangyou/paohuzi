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
//    var glview =  cc.director.getOpenGLView()  //cc.director.getWinSize();//sharedDirector.getOpenGLView()
    var glview = cc.view;
    var size = cc.view.getFrameSize()
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

            cc.log( CONFIG_SCREEN_WIDTH,CONFIG_SCREEN_HEIGHT);

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
    cc.log("# CONFIG_SCREEN_AUTOSCALE      = %s     =", CONFIG_SCREEN_AUTOSCALE)
    cc.log("# CONFIG_SCREEN_WIDTH          = %0.2f  =", CONFIG_SCREEN_WIDTH)
    cc.log("# CONFIG_SCREEN_HEIGHT         = %0.2f  =", CONFIG_SCREEN_HEIGHT)
    cc.log("# display.widthInPixels        = %0.2f  =", this.widthInPixels)
    cc.log("# display.heightInPixels       = %0.2f  =", this.heightInPixels)
    cc.log("# display.contentScaleFactor   = %0.2f  =", this.contentScaleFactor)
    cc.log("# display.width                = %0.2f  =", this.width)
    cc.log("# display.height               = %0.2f  =", this.height)
    cc.log("# display.cx                   = %0.2f  =", this.cx)
    cc.log("# display.cy                   = %0.2f  =", this.cy)
    cc.log("# display.left                 = %0.2f  =", this.left)
    cc.log("# display.right                = %0.2f  =", this.right)
    cc.log("# display.top                  = %0.2f  =", this.top)
    cc.log("# display.bottom               = %0.2f  =", this.bottom)
    cc.log("# display.c_left               = %0.2f  =", this.c_left)
    cc.log("# display.c_right              = %0.2f  =", this.c_right)
    cc.log("# display.c_top                = %0.2f  =", this.c_top)
    cc.log("# display.c_bottom             = %0.2f  =", this.c_bottom)
    cc.log("#")
}










display.COLOR_WHITE = cc.color.WHITE
display.COLOR_BLACK = cc.color.BLACK
display.COLOR_RED   = cc.color.RED
display.COLOR_GREEN = cc.color.GREEN
display.COLOR_BLUE  = cc.color.BLUE


display.CENTER        = 0
display.LEFT_TOP      = 1; display.TOP_LEFT      = 1
display.CENTER_TOP    = 2; display.TOP_CENTER    = 2
display.RIGHT_TOP     = 3; display.TOP_RIGHT     = 3
display.CENTER_LEFT   = 4; display.LEFT_CENTER   = 4
display.CENTER_RIGHT  = 5; display.RIGHT_CENTER  = 5
display.BOTTOM_LEFT   = 6; display.LEFT_BOTTOM   = 6
display.BOTTOM_RIGHT  = 7; display.RIGHT_BOTTOM  = 7
display.BOTTOM_CENTER = 8; display.CENTER_BOTTOM = 8

display.ANCHOR_POINTS = [
    {x:0.5, y:0.5},  // CENTER
    {x:0, y:1},      // TOP_LEFT
    {x:0.5, y:1},    // TOP_CENTER
    {x:1, y:1},      // TOP_RIGHT
    {x:0, y:0.5},    // CENTER_LEFT
    {x:1,y: 0.5},    // CENTER_RIGHT
    {x:0, y:0},      // BOTTOM_LEFT
    {x:1,y: 0},      // BOTTOM_RIGHT
    {x:0.5,y: 0}    // BOTTOM_CENTER
]










display.newNode = function(){
    var node = cc.Node.create();
    NodeEx.init(node);
    return node //cc.Node.create();
//    return NodeEx.create();
}

/**
 *  * 1.
 * //create a SpriteBatchNode with image path
 * var spriteBatchNode = cc.SpriteBatchNode.create("res/animations/grossini.png", 50);
 * 2.
 * //create a SpriteBatchNode with texture
 * var texture = cc.textureCache.addImage("res/animations/grossini.png");
 * var spriteBatchNode = cc.SpriteBatchNode.create(texture,50);
 *
 * @param image
 * @param capacity
 * @returns {image}
 */
display.newBatchNode = function(image, capacity){
    return cc.SpriteBatchNode.create(image);
}

display.newLayer = function(){
    var layer = cc.Layer.create();
    LayerEx.init(layer);
    return layer;
}
display.newColorLayer = function(color,x,y){
    //cc.color(255, 100, 100, 128)
    //ws.width / 2, ws.height / 2
    if(color && !color.a)
        color.a = 255;

    var layer = cc.LayerColor.create(color,x,y);
    LayerEx.init(layer);
    return layer
}

/**
 //1 var cache = display.addSpriteFrames(res.explosion);
 var sprite = cc.Sprite.create('#explosion_03.png');
 this.addChild(sprite);


 var texture = cc.textureCache.addImage("res/CloseNormal.png");
 //        var sprite4 = cc.Sprite.create(texture);
 //        var sprite5 = cc.Sprite.create(texture, cc.rect(0,0,480,320));
 //        this.addChild(sprite4);
 //        this.addChild(sprite5);
 * @param name
 * @param rect  cc.rect(x, y, 85, 121)
 * @returns {name}
 */
display.newSprite = function(name,rect){
    var sprite =  cc.Sprite.create(name,rect);
    SpriteEx.init(sprite);
    return sprite
}

/**
    创建并返回一个 Sprite9Scale 显示对象。
第一种方法：
 var blocks_scaled_with_insets = cc.Scale9Sprite.create();
 blocks_scaled_with_insets.updateWithBatchNode(batchNode_scaled_with_insets, cc.rect(0, 0, 96, 96), false, cc.rect(32, 32, 32, 32));
 blocks_scaled_with_insets.width = 96 * 4.5;
 blocks_scaled_with_insets.height = 96 * 2.5;
 blocks_scaled_with_insets.x = x;
 blocks_scaled_with_insets.y = y;
 this.addChild(blocks_scaled_with_insets);
第二种方法：
 var blocks_with_insets = cc.Scale9Sprite.createWithSpriteFrameName('blocks9.png', cc.rect(32, 32, 32, 32));
第三种方法：
 var s = cc.Scale9Sprite.createWithSpriteFrameName('button_normal.png');
 s.x = x;
 s.y = y;
 s.width = 21 * 16;
 s.height = 13 * 16;
 this.addChild(s);

 * @method create
 * @param {String|rect_object|String|String} str
 * @param {rect_object|String|rect_object} rect
 * @param {rect_object} rect
 * @return {cc.Scale9Sprite|cc.Scale9Sprite|cc.Scale9Sprite|cc.Scale9Sprite|cc.Scale9Sprite}
**/
display.newScale9Sprite = function(str, rect, rect) {
    var sprite = cc.Scale9Sprite.createWithSpriteFrameName(str,rect,rect);
    return sprite;
//    return this.newSprite(filename, x, y, {class = cc.Scale9Sprite, size = size)
}
/**
 第一种方法：
 创建并返回一个图像帧对象。
 display.addSpriteFrames("Sprites.plist", "Sprites.png")
 -- 创建一个 Sprite
 local sprite = display.newSprite("#Yes.png")
 -- 创建一个图像帧
 local frameNo = display.newSpriteFrame("No.png")
 -- 在需要时，修改 Sprite 的显示内容
 sprite:setDisplayFrame(frameNo)

 第二种方法：
 //3.Create a sprite with a sprite frame
 var spriteFrame = display.newSpriteFrame("explosion_03.png");
 var sprite2 = cc.Sprite.create(spriteFrame);
 this.addChild(sprite2);

 @param string 图像帧名称

 @return SpriteFrameCache
 **/
display.newSpriteFrame =function(frameName) {
    var frame = cc.spriteFrameCache.getSpriteFrame(frameName);
    if (frame=null){
        cc.log("error","display.newSpriteFrame() - invalid frameName %s", frameName)
    }
    return frame
}

/**
以特定模式创建一个包含多个图像帧对象的数组。
-- 创建一个数组，包含 Walk0001.png 到 Walk0008.png 的 8 个图像帧对象
local frames = display.newFrames("Walk%04d.png", 1, 8)
-- 创建一个数组，包含 Walk0008.png 到 Walk0001.png 的 8 个图像帧对象
local frames = display.newFrames("Walk%04d.png", 1, 8, true)
@param string pattern 模式字符串
@param integer begin 起始索引
@param integer length 长度
@param boolean isReversed 是否是递减索引
@return table 图像帧数组
**/
display.newFrames = function(pattern, begin, length, isReversed){
    var frames = []
    var step = 1
    var last = begin + length //- 1
    if (isReversed){
        last=begin;
        begin = begin;
        step = -1
    }

    for (var index = begin; index < last; index = index + step) {
        var frameName = stringFormat(pattern, index)
        cc.log(frameName);
        var frame = cc.spriteFrameCache.getSpriteFrame(frameName)
        if (frame == null) {
            cc.log("error", "display.newFrames() - invalid frame, name %s", frameName)
            return
        }
        frames.push(frame);
    }
    return frames
}


/**
    以包含图像帧的数组创建一个动画对象。
local frames = display.newFrames("Walk%04d.png", 1, 8)
local animation = display.newAnimation(frames, 0.5 / 8) -- 0.5 秒播放 8 桢
sprite:playAnimationOnce(animation) -- 播放一次动画
@param table frames 图像帧的数组
@param number time 每一桢动画之间的间隔时间
@return Animation Animation对象
**/
display.newAnimation =function(frames, time,loops) {
    var count = frames.length
    //-- local array = Array:create()
    //-- for i = 1, count do
    //    --     array:addObject(frames[i])
    //-- end
    time = time || 1.0 / count
    return cc.Animation.create(frames, time,loops)//frames, delay, loops
}












display.TEXTURES_PIXEL_FORMAT = {};
/**
    设置材质格式。
为了节约内存，我们会使用一些颜色品质较低的材质格式，例如针对背景图使用 cc.TEXTURE2_D_PIXEL_FORMAT_RG_B565 格式。
display.setTexturePixelFormat() 可以指定材质文件的材质格式，这样在加载材质文件时就会使用指定的格式。
@param string filename 材质文件名
@param integer format 材质格式
@see Texture Pixel Format
**/
display.setTexturePixelFormat=function(filename, format) {
    this.TEXTURES_PIXEL_FORMAT[filename] = format
}
/**
 display.addSpriteFramesWithFile(数据文件名, 材质文件名)
 display.addSpriteFramesWithFile("Sprites.plist", "Sprites.png")
 Sprite Sheets 通俗一点解释就是包含多张图片的集合。Sprite Sheets 材质文件由多张图片组成，而数据文件则记录了图片在材质文件中的位置等信息。
注意的是这个plist必须要在loading中加载并定义 Sprites.plist  否则不会读取到plist中的小图片

 @param string plistFilename 数据文件名
 @param string image 材质文件名
 @see Sprite Sheets
 **/
display.addSpriteFrames = function(plistFilename, image, handler){
    var async = false
//    if(handler && typeof(handler) == "function")
//        async = true;

    if(async) {
        asyncHandler = function () {
            cc.log("%s, %s async done.", plistFilename, image);
            var texture = sharedTextureCache.textureForKey(image)
            cc.log("error:", texture, "The texture %s, %s is unavailable.", plistFilename, image);
            cc.spriteFrameCache.addSpriteFrames(plistFilename, image)

            handler(plistFilename, image)
        }
    }
    if(this.TEXTURES_PIXEL_FORMAT[image]){
        CCTexture2D.setDefaultAlphaPixelFormat(this.TEXTURES_PIXEL_FORMAT[image])
        if(async)
            sharedTextureCache.addImageAsync(image, asyncHandler)
        else {
            return cc.spriteFrameCache.addSpriteFrames(plistFilename, image)
        }

        CCTexture2D.setDefaultAlphaPixelFormat(kCCTexture2DPixelFormat_RGBA8888)
    }else{
        if(async)
            return sharedTextureCache.addImageAsync(image, asyncHandler)
        else {
            //sharedSpriteFrameCache.addSpriteFramesWithFile(plistFilename, image)
            return cc.spriteFrameCache.addSpriteFrames(plistFilename, image)
//            var explosionTexture = cc.textureCache.addImage(res.explosion_png);
//            this._explosions = cc.SpriteBatchNode.create(explosionTexture);
        }
    }
}

/**
 从内存中卸载 Sprite Sheets 材质和数据文件
 @param string plistFilename 数据文件名
 @param string image 材质文件名
 **/
display.removeSpriteFramesWithFile= function(plistFilename, imageName) {
    var sharedSpriteFrameCache = cc.spriteFrameCache
    sharedSpriteFrameCache.removeSpriteFramesFromFile(plistFilename)
    if(imageName)
        this.removeSpriteFrameByImageName(imageName)
}

/**
 从图像帧缓存中删除一个图像。
 有时候，某些图像仅在特定场景中使用，例如背景图。那么在场景退出时，就可以用 display.removeSpriteFrameByImageName() 从缓存里删除不再使用的图像数据。
 此外，CCScene 提供了 markAutoCleanupImage() 接口，可以指定场景退出时需要自动清理的图像，推荐使用。
 @param string 图像文件名
 **/
display.removeSpriteFrameByImageName=function(imageName) {
    var sharedSpriteFrameCache = cc.sharedSpriteFrameCache;
    sharedSpriteFrameCache.removeSpriteFrameByName(imageName)
    cc.textureCache.removeTextureForKey(imageName)
}



