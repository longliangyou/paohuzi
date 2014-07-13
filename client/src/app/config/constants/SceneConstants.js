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


                //plist
                "res/Sheet_Hall.plist"

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







/*SceneConstants 常量**/

//指定父类的显示层
SceneConstants.BACKGROUND_LAYER="backgroundLayer";//返回背景图
SceneConstants.DEBUG_LAYER="debugLayer";//debug层

SceneConstants.FLOORS_LAYER="floorsLayer";//地板层
SceneConstants.FLY_LAYER="flysLayer";//建筑的上一飞行层
SceneConstants.BATCH_LAYER="batchLayer";//中间建筑层

SceneConstants.TOUCH_LAYER="touchLayer";//触摸层
SceneConstants.UI_LAYER="uiLayer";//ui层
SceneConstants.LOADING_LAYER="loadingLayer"; //地图的loading层
SceneConstants.TIP_LAYER="tipLayer";//tips层


