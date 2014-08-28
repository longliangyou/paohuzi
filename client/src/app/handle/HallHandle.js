/**
 * 大厅控制层
 * Created by xhl on 2014/7/19.
 */
var HallHandle = BaseHandle.extend({



    /**
     * 在大厅hall中  去加入大厅的某个房间
     * @param deskType //0表示单机 1表示私人场  2表示三人网络场
     */
    joinHallRoom:function(deskType){
        var onComplete = function(result){
            if(result.success){
                GameApp.enterScene("FightScene")
            }
        }

        var loginModel = Singleton.getInstance("LoginModel");
        loginModel.joinHallRoom(deskType,onComplete);
    }
})






