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
    login: function(userName, passWorld){
        var isConnect = false; //这里到时通过pomelo判断是否连接
        if(isConnect){

        }else{
            var userId = 2;
            var user = UserAction.createUser(myUserId,userName);
            //todo 将我自己即user 保持到一个数据实体里面
        }
    }
};