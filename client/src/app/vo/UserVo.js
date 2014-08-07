/**
 * UserVo.js
 * 当前的用户所有信息  当然还包括系统的一些信息
 * 用户的一些信息vo类
 *
 * Created by xhl on 2014/7/19.
 */
var UserVo = {}


/**
 * 获取用户的信息
 */
UserVo.getUserInfoData = function(){
    var data = {
        nickName:"自己",
        gold:2000,
        userId:2,
        avatarImageName:null
    }
    return data;
}



