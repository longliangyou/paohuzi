// 1. Connect to Server
// ******************************
// 
// pomelo.init(params, callback);
// 
// ******************************
// pomelo.init({
//   host: host,
//   port: port,
//   user: {},
//   handshakeCallback : function(){}
// }, function() {
//   console.log('success');
// });



// 2. Send request to server with callback 
// *************************************
// 
// pomelo.request(route, msg, callback);
// 
// *************************************
// 
// pomelo.request(route, {
//   rid: rid
//   }, function(data) {
//     console.log(dta);
// });



// 3. Send request to server without callback
// *************************************
// 
// pomelo.notify(route, params);
// 
// *************************************




// 4. Receive message from server
// *************************************
// 
// pomelo.on(route, callback);
// 
// *************************************
// pomelo.on('onChat', function(data) {
//   addMessage(data.from, data.target, data.msg);
//   $("#chatHistory").show();
// });



// 5. disconnect from server
// *************************************
// 
// pomelo.disconnect();
// 
// *************************************