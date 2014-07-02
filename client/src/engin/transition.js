/**
 *
 为图像创造效果
 * Created by Administrator on 2014/7/2.
 */
var transition = []

var ACTION_EASING = []
ACTION_EASING["BACKIN"]           = [CCEaseBackIn, 1];
ACTION_EASING["BACKINOUT"]        = [CCEaseBackInOut, 1]
ACTION_EASING["BACKOUT"]          = [CCEaseBackOut, 1]
ACTION_EASING["BOUNCE"]           = [CCEaseBounce, 1]
ACTION_EASING["BOUNCEIN"]         = [CCEaseBounceIn, 1]
ACTION_EASING["BOUNCEINOUT"]      = [CCEaseBounceInOut, 1]
ACTION_EASING["BOUNCEOUT"]        = [CCEaseBounceOut, 1]
ACTION_EASING["ELASTIC"]          = [CCEaseElastic, 2, 0.3]
ACTION_EASING["ELASTICIN"]        = [CCEaseElasticIn, 2, 0.3]
ACTION_EASING["ELASTICINOUT"]     = [CCEaseElasticInOut, 2, 0.3]
ACTION_EASING["ELASTICOUT"]       = [CCEaseElasticOut, 2, 0.3]
ACTION_EASING["EXPONENTIALIN"]    = [CCEaseExponentialIn, 1]
ACTION_EASING["EXPONENTIALINOUT"] = [CCEaseExponentialInOut, 1]
ACTION_EASING["EXPONENTIALOUT"]   = [CCEaseExponentialOut, 1]
ACTION_EASING["IN"]               = [CCEaseIn, 2, 1]
ACTION_EASING["INOUT"]            = [CCEaseInOut, 2, 1]
ACTION_EASING["OUT"]              = [CCEaseOut, 2, 1]
ACTION_EASING["RATEACTION"]       = [CCEaseRateAction, 2, 1]
ACTION_EASING["SINEIN"]           = [CCEaseSineIn, 1]
ACTION_EASING["SINEINOUT"]        = [CCEaseSineInOut, 1]
ACTION_EASING["SINEOUT"]          = [CCEaseSineOut, 1]


//transition.newEasing=function(action, easingName, more)
//    var key = string.upper(tostring(easingName))
//    if(string.sub(key, 1, 6) == "CCEASE")
//        key = string.sub(key, 7)
//
//
//    var easing
//    if( ACTION_EASING[key]) {
//        //var cls, count, default = unpack(ACTION_EASING[key])
//        if (count == 2)
//            easing = cls.create(action, more ||default)
//        else
//            easing = cls.create(action)
//    }
//    return easing || action
//}