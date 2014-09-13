/**
 * 基本函数
 * Created by Administrator on 2014/7/2.
 */


/**
 * 判断一个array中是否含有某个元素
 * 使用
 * var arr=["a","b"];
 alert(arr.in_array("a"))
 * @type {string}
 */
//Array.prototype.S=String.fromCharCode(2);
//Array.prototype.in_array=function(e){
//    var r=new RegExp(this.S+e+this.S);
//    return (r.test(this.S+this.join(this.S)+this.S));
//}

/**
 * 判断某个element 是否在数组 array 中
 * @param array
 * @param element
 */
isInArray = function(array,element){
    if(array){
        for(var i=0;i<array.length;i++){
            if(array[i] == element){
                return true
            }
        }

        return true;
    }
    return false;
}


/**
 * 转化为string函数
 *
 * @param str
 * @returns {*}
 */
tostring = function(str){
    return str.toString()
}

/**
    检查值是否是一个表格，如果不是则返回一个空表格

@param mixed value 要检查的值

@return table
**/
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}


/**
 检查值是否是function

 @param mixed value 要检查的值

 @return table
 **/
function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]'
}

/**
 检查值是否是number

 @param mixed value 要检查的值

 @return table
 **/
function isNumber(obj) {
    return Object.prototype.toString.call(obj) === '[object Number]'
}
/**
    检查并尝试转换为数值，如果无法转换则返回
 把给定的值转换成数字（可以是整数或浮点数）。
 还记得parseInt()和 parseFloat() 方法只转换第一个无效字符之前的字符串，因此"4.5.6"将被转换为"4.5"。
 用Number()进行强制类型转换，"4.5.6"将返回NaN，
 因为整个字符串值不能转换成数字。
 如果字符串能被完整地转换，Number()将判断是调用parseInt()方法还是调用parseFloat()方法。

@param mixed value 要检查的值
@param [integer base] 进制，默认为十进制
@return number
**/
checknumber=function(value) {
    if(value==null)
        value = 0;
    var num = Number(value);
//    var num =  parseFloat(value).tofixed(1);
    return num
}

/**
检查并尝试转换为整数，如果无法转换则返回 0
@param mixed value 要检查的值
@return integer
 */
 checkint= function(value){
//     return Math.round(checknumber(value))
     return Math.floor(checknumber(value));
 }

/**
检查并尝试转换为布尔值，除了 nil 和 false，其他任何值都会返回 true
@param mixed value 要检查的值
@return boolean
**/
checkbool=function(value){
    return Boolean(value);
}


/**
 * 格式化字符串输出
 *类似c++中的string.format %d
 */

stringFormat =function(pattern, index){
//    var arr = pattern.split("%"); //字符分割
//    var oneStr = arr[1];
//    var dIndex = oneStr.indexOf("d");
//    var dafter=oneStr.substring(dIndex+1);
//    var nd = parseInt(oneStr.split("d")[0]); // 提取出 % 和d中间的数字
//
//
//    var newIndexStr = tostring(index);
//    var lenght = newIndexStr.length;
//
//    var num = "";
//    var bu0 = nd-lenght;
//    if (bu0>0){
//        for(var i=0;i<bu0;i++){
//            num = num + "0"
//        }
//    }
//    newIndexStr = num + newIndexStr
//
//    var newStr = arr[0] + newIndexStr + dafter;

    var newStr = pattern + "0" + index + ".png";
    return newStr

}


/**
* 客户端伪造一个定时器
* @param callback
* @param inval
*/
var timeHandleArr = {};
setTimeOut = function(callback, inval){
    var complete = function(){
        var callback = timeHandleArr.timeId ;
        if ( _.isFunction(callback)) {
            callback();
        }
    }
    var scene = display.getRunningScene();
    var timeId = scene.performWithDelay(complete,inval/1000);
    timeHandleArr.timeId = callback;
    return timeId;
}
destroyTimeout = function(timeId){
    timeHandleArr.timeId = null;
}
