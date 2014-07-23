/**
 * 工具集合类
 * Created by Administrator on 2014/7/23.
 */
var Util = {};


/**
 * proxy 绑定this
 */
Util.proxy = function(fun,that){
    return function(){
        fun.apply(that,arguments);
    }
}

