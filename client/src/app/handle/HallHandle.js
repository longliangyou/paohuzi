/**
 * 大厅控制层
 * Created by xhl on 2014/7/19.
 */
var HallHandle = BaseHandle.extend({

    init:function(){
        //当没有登陆时  登陆一个默认账户
        var loginModel = Singleton.getInstance("LoginModel");
        if(loginModel.user == null){
            var sceneLayer = this.sceneLayer_;
            var callBack = function(){
                sceneLayer.login(loginModel.user);
            }
            loginModel.login(null,null,callBack);//如果是单机 手动触发下登陆 伪登陆
        }
    },

    /**
     * 在大厅hall中  去加入大厅的某个房间
     * @param deskType //0表示单机 1表示私人场  2表示三人网络场
     */
    joinHallRoom:function(deskType){
        var onComplete = function(result){
           GameApp.enterScene("FightScene")
        }

        var loginModel = Singleton.getInstance("LoginModel");
        loginModel.joinHallRoom(deskType,onComplete);
    }
})






