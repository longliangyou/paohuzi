/**
 * 基本函数
 * Created by Administrator on 2014/7/2.
 */


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
 还记得parseInt()和parseFloat()方法只转换第一个无效字符之前的字符串，因此"4.5.6"将被转换为"4.5"。
 用Number()进行强制类型转换，"4.5.6"将返回NaN，
 因为整个字符串值不能转换成数字。
 如果字符串能被完整地转换，Number()将判断是调用parseInt()方法还是调用parseFloat()方法。

@param mixed value 要检查的值
@param [integer base] 进制，默认为十进制
@return number
**/
checknumber=function(value) {
    //return parseFloat(value)
    return Number(value)
}

/**
检查并尝试转换为整数，如果无法转换则返回 0
@param mixed value 要检查的值
@return integer
 */
 checkint= function(value){
     return Math.round(checknumber(value))
 }

/**
检查并尝试转换为布尔值，除了 nil 和 false，其他任何值都会返回 true
@param mixed value 要检查的值
@return boolean
**/
checkbool=function(value){
    return Boolean(value);
}