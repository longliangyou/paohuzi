/**
 * LoginAction.js
 * 登陆
 * Created by Administrator on 2014/9/9.
 */
var LoginAction = {


    /**
     * 登陆
     * @param userName
     * @param passWorld
     */
    login: function(userName, passWorld,callBack){
        var isConnect = false; //这里到时通过pomelo判断是否连接
        if(isConnect){

        }else{
            var userId = 2;
            var user = UserAction.createUser(userId,userName,5000,false);


            callBack({rect:STATUS_SUCCESS,data:user}); //rect=0成功
        }
    }
};