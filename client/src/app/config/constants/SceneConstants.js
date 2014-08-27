/**
 * 游戏中的所有场景
 *  主要方便配置场景的前进 后退场景  以及进入该场景要加载的资源
 * Created by Administrator on 2014/6/30.
 */




var SceneConstants = {
    scene : {
        LoginScene:  {//战斗场景
            scene:"LoginScene",
            loadResources:[
                //image


                //plist
                "res/explosion.plist"

                //fnt

                //tmx

                //bgm

                //effect
            ]
        },
        HallScene:{
            scene:"HallScene",
            loadResources:[
                //image


                //plist
                "res/Sheet_Hall.plist"

                //fnt

                //tmx

                //bgm

                //effect
            ]
        },
        FightScene: {//战斗场景
            scene:"FightScene",
            backScene:"HallScene",
            loadResources:[
                //image
                "res/font/Sheet_Timer_Number.png",
                "res/avatar/avatar1.png",
                "res/Sheet_Fight.png",

                //plist
                "res/Sheet_Fight.plist"

                //fnt

                //tmx

                //bgm

                //effect
            ]
        }



    },


    /**
     * 通过当前场景 获取当前和上一个场景名称
     * @param currentSceneName
     */
    getSceneName : function(currentSceneName){
        var arr = this.scene[currentSceneName]
        return arr;
    },

    /**
     * 通过当前场景
     * @param currentSceneName
     */
    getScene : function(currentSceneName){
        var arr = this.scene[currentSceneName]
        var sceneName = arr.scene;
//        if(sceneName == "LoginScene" ){
//            return new LoginScene();
//        }
        var sceneCla = eval("new "+sceneName +"()");
        return sceneCla

        return null;
    },
    /**
     * 通过当前场景 获取上一个场景名称
     * @param currentSceneName
     */
    getBackScene : function(currentSceneName){
        var arr = this.scene[currentSceneName]
        var backScene = arr.backScene;

        return backScene;
    }
}










