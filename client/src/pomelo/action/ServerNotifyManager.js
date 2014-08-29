/**
 * ServerNotifyManager.js
 * 服务器的消息发送
 * 发送消息的同事 ，还会通过EventProtocol dispath一个event
 * Created by Administrator on 2014/8/29.
 */
var ServerNotifyManager ={

    ctor:function(){
        //让其继承事件类
        EventProtocol.extend(this)
    },

    //发送消息给clent客户端
    sendNotifyToClient:function(){

    }
}