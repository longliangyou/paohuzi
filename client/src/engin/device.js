/**
 * 提供设备相关属性的查询，以及设备功能的访问

 当框架初始完成后，device 模块提供下列属性：

 -   device.platform 返回当前运行平台的名字，可用值： ios, android, mac, windows.
 -   device.model 返回设备型号，可用值： unknown, iphone, ipad
 -   device.language 返回设备当前使用的语言，可用值：
 -   cn：中文
 -   fr：法语
 -   it：意大利语
 -   gr：德语
 -   sp：西班牙语
 -   ru：俄语
 -   jp：日语
 -   en：英语
 -   device.writablePath 返回设备上可以写入数据的首选路径：
 -   iOS 上返回应用程序所在的 Documents 目录
 -   Android 上返回存储卡的根目录
 -   其他平台的返回值由 quick-x-player 决定
 -   device.cachePath 返回设备上可以写入数据的缓存目录：
 -   iOS 上返回应用程序所在的 Library/Caches 目录
 -   其他平台的返回值同 device.writablePath
 -   device.directorySeparator 目录分隔符，在 Windows 平台上是 “\”，其他平台都是 “/”
 -   device.pathSeparator 路径分隔符，在 Windows 平台上是 “;”，其他平台都是 “:”

 * Created by Administrator on 2014/6/30.
 */

var device = {}

device.platform    = "unknown"
device.model       = "unknown"


device.init = function(){
//    var sharedApplication = cc.Application.getInstance()
//    var target =cc.platform // cc .Application .getInstance().getTargetPlatform()
//    if( target == cc.PLATFORM_OS_WINDOWS)
//        this.platform = "windows"
//    else if(target == cc.PLATFORM_OS_MAC)
//        this.platform = "mac"
//    else if(target == cc.PLATFORM_OS_ANDROID)
//        this.platform = "android"
//    else if(target == cc.PLATFORM_OS_IPHONE ||  target == cc.PLATFORM_OS_IPAD)
//        this.platform = "ios"
//    if(target == cc.PLATFORM_OS_IPHONE)
//        this.model = "iphone"
//    else
//        this.model = "ipad"


    var language_ = cc.sys.language;//sharedApplication.getCurrentLanguage()
    if(language_ == cc.LANGUAGE_CHINESE)
        language_ = "cn"
    else if (language_ == cc.LANGUAGE_FRENCH)
            language_ = "fr"
    else if (language_ == cc.LANGUAGE_ITALIAN)
        language_ = "it"
    else if (language_ == cc.LANGUAGE_GERMAN)
        language_ = "gr"
    else if (language_ == cc.LANGUAGE_SPANISH)
        language_ = "sp"
    else if (language_ == cc.LANGUAGE_RUSSIAN)
        language_ = "ru"
    else if (language_ == cc.LANGUAGE_KOREAN)
        language_ = "kr"
    else if (language_ == cc.LANGUAGE_JAPANESE)
        language_ = "jp"
    else if (language_ == cc.LANGUAGE_HUNGARIAN)
        language_ = "hu"
    else if (language_ == cc.LANGUAGE_PORTUGUESE)
        language_ = "pt"
    else if (language_ == cc.LANGUAGE_ARABIC)
        language_ = "ar"
    else
        language_ = "en"


    this.language = language_
    //this.writablePath = cc.FileUtils.getWritablePath()// .FileUtils.getInstance().getWritablePath()
    // device.cachePath = cc.FileUtils:getInstance():getCachePath()
    this.directorySeparator = "/"
    this.pathSeparator = ":"
    if (this.platform == "windows") {
        this.directorySeparator = "\\"
        this.pathSeparator = ";"
    }

    cc.log("# device.platform              = " + this.platform)
    cc.log("# device.model                 = " + this.model)
    cc.log("# device.language              = " + this.language)
    cc.log("# device.writablePath          = " + this.writablePath)
    //cc.log("# device.cachePath             = " + device.cachePath)
    cc.log("# device.directorySeparator    = " + this.directorySeparator)
    cc.log("# device.pathSeparator         = " + this.pathSeparator)
    cc.log("#")
}

