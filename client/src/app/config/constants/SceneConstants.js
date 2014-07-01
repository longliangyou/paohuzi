/**
 * 游戏中的所有场景
 *  主要方便配置场景的前进 后退场景
 * Created by Administrator on 2014/6/30.
 */




var SceneConstants = {
    scene : {
        LoginScene: ["LoginScene"],//登陆场景
        FightLoadingScene: ["FightLoadingScene"], //战斗loading场景
        FightScene: ["FightScene", "LoginScene"]//战斗场景
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
        var sceneName = arr[0];
        if(sceneName == "LoginScene" ){
            return new LoginScene();
        }

        return null;
    },
    /**
     * 通过当前场景 获取上一个场景名称
     * @param currentSceneName
     */
    getBackScene : function(currentSceneName){
        var arr = this.scene[currentSceneName]
        var backScene = arr[1];

        return backScene;
    }
}









