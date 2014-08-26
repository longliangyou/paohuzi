/**
 * 登陆的 LoginModel.js
 * Created by xhl on 2014/7/19.
 */
var LoginModel = BaseModel.extend({


    /**
     *  连接
      * @param ip
     * @param port 端口
     */
   connect:function(ip,port){

   },

    /**
     * 登陆
     * 需要返回 当前用户的角色等各种信息
     * @param userName
     * @param passWord
     * @return 当前用户的角色等各种信息
     */
   login:function(userName,passWord,callBack){
        if(FightVo.deskType == 0 ){ //单机
            var myUser =  {nickName:"user2",gold:10000,userId:2};
            FightVo.initOneUserInfo("myUser",myUser);
            if(callBack){
                callBack({success:true});
            }
        }else if(FightVo.deskType == 2){
            alert("网络连接失败！")
        }
   },






    /**
     * 在大厅hall中  去加入大厅的某个房间
     * @param deskType //0表示单机 1表示私人场  2表示三人网络场
     */
    joinHallRoom:function(deskType,callBack){
        if(deskType == 0 ){ //单机
            FightVo.deskType = 0;
            this.login(null,null,callBack);//如果是单机 手动触发下登陆 伪登陆
        }else if(deskType == 2) {//三人网络场
            FightVo.deskType = 2;
            this.login(null,null,callBack);//如果是单机 手动触发下登陆 伪登陆
        }
    }


})

