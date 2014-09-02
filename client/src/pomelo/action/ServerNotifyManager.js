/**
 * ServerNotifyManager.js
 * 服务器的消息发送
 * 发送消息的同事 ，还会通过EventProtocol dispath一个event
 * Created by Administrator on 2014/8/29.
 */
var ServerNotifyManager = {

    // 发送命令给客户端。
    sendCmdResponse: function(event){//event结构 {cmd:,data:}
        var cmd = event.cmd;
        var data = event.data;


        var event = {name:"CMD",data:event};
        this.dispatchEvent(event);
    },

    sendAdminMessage: function(event){

    },

    sendPrivateMessage: function(event){
      
    }
};


EventProtocol.extend(ServerNotifyManager);