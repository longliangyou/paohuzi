require("config.js")
require("engin.init.js")
/**
 * GameApp.js
 * 游戏主类
 * Created by Administrator on 2014/6/30.
 */
var app ={};


//该程序的包
app.packageRoot = "app";



/**
 * 程序第一次启动运行
 */
app.run =function(){
    cc.game.onStart = function(){
        cc.view.setDesignResolutionSize(800, 450, cc.ResolutionPolicy.SHOW_ALL);
        cc.view.resizeWithBrowserSize(true);


        //load resources
        cc.LoaderScene.preload(g_resources, function () {
            cc.director.runScene(new LoginScene());
        }, this);
        //这里其实想改成如下使用  通过调用enterScene 方法进入场景
        //var sceneName,backScaneName = SceneConstants.getScene();
        //this.enterScene(sceneName,backScaneName)
    };
    cc.game.run();
}





/**
 *  进入某一个场景
 * @param sceneName  当前场景名称
 * @param backScaneName 当前场景的上一个返回场景
 * @param param 进入场景的一些参数
 */
app.enterScene = function(sceneName,backScaneName, param){
    enterSceneFun = function(sceneName, args){
        var scenePackageName = this. packageRoot + ".scenes." + sceneName;
        var sceneClass = scenePackageName; //这里就是动态加载一个类

        //cc.LoaderScene.preload(g_resources, function () {
            var scene = sceneClass.new(args)
            cc.director.runScene(scne);
        //}, this);
        return scene
    }



    if(param == null){
        param = {
            sceneName : sceneName
        };
    }


    //进入场景  并记录  上一个场景名称  当前场景名称  以及当前场景实例
    var scene = enterSceneFun(sceneName,param);
    this.previousSceneName_ = this.currentSceneName_;
    this.currentSceneName_ = sceneName;
    this.currentScene_ = scene;//display.getRunningScene();
}





/**
 * 返回到上一个场景
 */
app.backScene = function(){
    var sceneName,backScaneName = SceneConstants.getScene();
    if(backScaneName) {
        this.enterScene(sceneName,backScaneName)
    }else{
        cc.game.exit();
    }
}