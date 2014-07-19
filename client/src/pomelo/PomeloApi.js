// pomeloApi 调用方法指南

// 1. 初始化, uid 类似于博雅斗地主的游客ID
//    pomeloApi.init(uid, function(){})
// 
// 2. 判断是否已经连接到服务器。
//    pomeloApi.isReady()
// 
// 3. pomeloApi.remote(methodName, options, callback)
//    调用其它函数，这个 remote 会根据 methodName 查找 methods 里面对应的路由
//    然后访问服务器，callback 是回调函数。
//    根据需要填充 methods 数组。
// 如
// methods: [
//   {
//     name: "login", // 客户端定一个这个调用的名字。
//     options: {
//     }, // 要传递的参数。
//     route: "connector.entryHandler.login" // 由服务端来填充。
//   },
//   ...
// ]

var PomeloApi = {};

PomeloApi.ctor = function() {
    var pomelo = null;
    var gate = {
        route: "gate.gateHandler.queryEntry",
        host: "127.0.0.1",
        port: "3014"
    };

    var connector = {};

    var status = false;

    var uid = null;

    // 在这里增加需要调用服务器的资源。
    // name 调用方法，可以自己定义。
    // options 传递到服务器的参数
    // route 服务器路由，由服务端来写，客户端不需要写。
    var methods = [
        {
            name: "login",
            options: {
            },
            route: "connector.entryHandler.login"
        }
        // {
        //   name: String,
        //   options: {
        //     key: value
        //   },
        //   route: String
        // }
    ];
}






PomeloApi.init = function(userId, callback){
    PomeloApi.ctor();

    pomelo = window.pomelo;
    uid = userId;
    pomelo.init({
      host: gate.host,
      port: gate.port,
      log: true
    }, function(){
      pomelo.request(gate.route, {uid: userId}, function(data){
        console.log(data);
        if (data){
          connector.host = data.host;
          connector.port = data.port;
        }
        pomelo.disconnect();
        pomelo.init({
          host: connector.host,
          port: connector.port,
          log: true
        }, function(){
          status = true;
          callback(null);
        });
      });
    });
 }

PomeloApi.isReady = function(){
    return this.status;
}

PomeloApi.remote = function(methodName, options, callback){
    method = _.find(methods, function(method){ return (method.name == methodName);} );
    if (!_.isObject(options)){
      options = {};
    }
    options = _.extend(options, {uid: uid});
    pomelo.request(method.route, options, callback);
 }
