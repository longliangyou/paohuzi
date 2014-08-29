
/**
 * 自定义Loading界面
 * 基础的加载进度控制
 * Created by Administrator on 2014/7/7.
 */
var MyLoaderScene = cc.Scene.extend({
    _interval : null,
    _length : 0,
    _count : 0,
    _label : null,
    _className:"MyLoaderScene",
    init : function(){
        var self = this;

        // bg
        var bgLayer = self._bgLayer = cc.LayerColor.create(cc.color(32, 32, 32, 255));
        bgLayer.setPosition(cc.visibleRect.bottomLeft);
        self.addChild(bgLayer, 0);

        //loading percent
        var label = self._label = cc.LabelTTF.create("玩命加载中... 0%", "Arial", 24);
        label.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(0, 0)));
        label.setColor(cc.color(180, 180, 180));
        bgLayer.addChild(this._label, 10);
        return true;
    },
    _initStage: function (img, centerPos) {
        var self = this;
        var texture2d = self._texture2d = new cc.Texture2D();
        texture2d.initWithElement(img);
        texture2d.handleLoadedTexture();
        var logo = self._logo = cc.Sprite.create(texture2d);
        logo.setScale(cc.contentScaleFactor());
        logo.x = centerPos.x;
        logo.y = centerPos.y;
        self._bgLayer.addChild(logo, 10);
    },
    onEnter: function () {
        var self = this;
        cc.Node.prototype.onEnter.call(self);
        self.schedule(self._startLoading, 0.3);
    },
    onExit: function () {
        cc.Node.prototype.onExit.call(this);
        var tmpStr = "玩命加载中... 0%";
        this._label.setString(tmpStr);
    },

    /**
     * init with resources
     * @param {Array} resources
     * @param {Function|String} cb
     * */
    initWithResources: function (resources, cb) {
        if(typeof resources == "string")
            resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
    },
    _startLoading: function () {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;
        self._length = res.length;
        self._count = 0;
        cc.loader.load(res, function(result, count){
            self._count = count; }, function(){
            if(self.cb)
                self.cb();
        });
        self.schedule(self._updatePercent);
    },
    _updatePercent: function () {
        var self = this;
        var count = self._count;
        var length = self._length;
        var percent = (count / length * 100) | 0;
        percent = Math.min(percent, 100);
        self._label.setString("玩命加载中... " + percent + "%");
        if(count >= length) self.unschedule(self._updatePercent);
    }
});

MyLoaderScene.preload = function(resources, cb){
    var _myLoaderScene = null;
    if(!_myLoaderScene) {
        _myLoaderScene = new MyLoaderScene();
        _myLoaderScene.init();
    }
    _myLoaderScene.initWithResources(resources, cb);
    cc.director.runScene(_myLoaderScene);
    return _myLoaderScene;
};
