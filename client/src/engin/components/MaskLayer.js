/**
 * 遮罩层
 * Created by Administrator on 2014/7/8.
 */
var MaskLayer = cc.LayerColor.extend({
    _listener: null,
    _fixedPriority: 0,
    ctor: function () {
        this._super();
        this._fixedPriority = -129;
    },

    init: function () {
        var bRet = false;
        if (this._super()) {
            bRet = true;
        }
        return bRet;
    },

    onEnter: function () {
        this._super();
        this.setColor(cc.color.BLACK);
        this.setOpacity(160);
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            }
        });

        this._listener = listener;
        cc.eventManager.addListener(this._listener, this);
    },

    onExit: function () {
        cc.eventManager.removeListener(this._listener);
        this._super();
    }
});

MaskLayer.create = function () {
    var sg = new MaskLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};