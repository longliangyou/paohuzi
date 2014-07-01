
//这里交给 GameApp　处理
cc.game.onStart = function(){
    EnginInit.init();
    //cc.view.setDesignResolutionSize(800, 450, cc.ResolutionPolicy.SHOW_ALL);
   // cc.view.resizeWithBrowserSize(true);//这里始终让其充满浏览器

    GameApp.run();
};
cc.game.run();



///**
// * 老的启动游戏
// */
//cc.game.onStart = function(){
//    cc.view.setDesignResolutionSize(800, 450, cc.ResolutionPolicy.SHOW_ALL);
//    cc.view.resizeWithBrowserSize(true);
//
//
//    //load resources
//    cc.LoaderScene.preload(g_resources, function () {
//        cc.director.runScene(new HelloWorldScene());
//    }, this);
//};
//cc.game.run();