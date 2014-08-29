/**
 * HttpRequest.js
 * Created by Administrator on 2014/8/29.
 */


/**
 * 获取URL中的请求参数的值----此方法接收参数名
 * @param name
 * @returns {*}
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURIComponent(r[2]);
    return null;
};


/**
 * 远程图片加载
 * @param target
 * @param imgUrl
 * @param p
 * @param tag
 */
function loadImgFromUrl(target, imgUrl, p, tag) {
    if(!imgUrl)
        return;
    var self = target;
    var loadCb = function(err, img){
        cc.textureCache.addImage(imgUrl);
        var texture2d = new cc.Texture2D();
        texture2d.initWithElement(img);
        texture2d.handleLoadedTexture();
        var sp = new cc.Sprite();
        sp.initWithTexture(texture2d);
        self.addChild(sp);
        sp.x = p.x;
        sp.y = p.y;
        sp.tag = tag;
    };
    cc.loader.loadImg(imgUrl, {isCrossOrigin : false }, loadCb);
}


/**
 * XMLHttpRequest
 * @param url
 * @param params
 * @param isPost
 * @param callback
 * @param errorcallback
 */
function sendRequest(url, params, isPost, callback, errorcallback){
    if(url == null || url == '')
        return;
    var xhr = cc.loader.getXMLHttpRequest();
    if(isPost){
        xhr.open("POST",url);
    }else{
        xhr.open("GET",url);
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && xhr.status == 200){
            var response = xhr.responseText;
            if(callback)
                callback(response);
        }else if(xhr.readyState == 4 && xhr.status != 200){
            var response = xhr.responseText;
            if(errorcallback)
                errorcallback(response);
        }
    };
    if(params == null || params == ""){
        xhr.send();
    }else{
        xhr.send(params);
    }
};

//JSON解析以及上述sendRequest的回调方法
var callback = function (response) {
    var jsonData = JSON.parse(response);
    var data = jsonData["users"];
    if(data){
        alert(data["name"]);
    }
};