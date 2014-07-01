/**
 * 初始化引擎库
 * Created by Administrator on 2014/6/30.
 */
var EnginInit = {
    init : function(){
        device.init();
        display.init();

        //cc.view.setDesignResolutionSize(800, 450, cc.ResolutionPolicy.SHOW_ALL);
        // cc.view.resizeWithBrowserSize(true);//这里始终让其充满浏览器
    }

}
