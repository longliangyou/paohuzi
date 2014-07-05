/**
 * 音乐音效相关封装类
 * Created by xhl on 2014/7/5.
 */
var audio = {};


/**
    返回音乐的音量值
    @return number 返回值在 0.0 到 1.0 之间，0.0 表示完全静音，1.0 表示 100% 音量
**/
audio.getMusicVolume=function(){
    var volume = cc.audioEngine.getBackgroundMusicVolume()
    return volume;
}


/**
    设置音乐的音量
    @param number volume 音量在 0.0 到 1.0 之间, 0.0 表示完全静音，1.0 表示 100% 音量
**/
audio.setMusicVolume=function(volume){
    volume = checknumber(volume)
    cc.audioEngine.setBackgroundMusicVolume(volume)
}


/**
    返回音效的音量值
    @return number 返回值在 0.0 到 1.0 之间, 0.0 表示完全静音，1.0 表示 100% 音量
**/
audio.getSoundsVolume=function() {
    var volume = cc.audioEngine.getEffectsVolume()
    return volume
}


/**
    设置音效的音量
    @param number volume 音量在 0.0 到 1.0 之间, 0.0 表示完全静音，1.0 表示 100% 音量
**/
audio.setSoundsVolume=function(volume) {
    volume = checknumber(volume)
    var volume = cc.audioEngine.setEffectsVolume(volume)
    return volume
}



/**
    预载入一个音乐文件
    在播放音乐前预先载入，可以在需要播放音乐时无延迟立即播放。
不过限于硬件设备和操作系统的限制，通常只能预载入一个音乐文件。
@param string filename 音乐文件名
**/
audio.preloadMusic=function(filename) {
    if (!filename) {
        cc.log("error", "audio.preloadMusic() - invalid filename")
        return;
    }
    cc.audioEngine.preloadBackgroundMusic(filename)
}



/**
    播放音乐
    如果音乐文件尚未载入，则会首先载入音乐文件，然后开始播放。

注意：即便音乐音量为 0.0，audio.playMusic() 仍然会进行播放操作。
如果希望停止音乐来降低 CPU 占用，应该使用 audio.stopMusic() 接口完全停止音乐播放。


@param string filename 音乐文件名
@param boolean isLoop 是否循环播放，默认为 true
**/
audio.playMusic=function(filename, isLoop) {
    if (!filename) {
        cc.log("error", "audio.playMusic() - invalid filename")
        return;
    }
    if (isBoolean(isLoop)) {
        isLoop = true
    }
    audio.stopMusic()
    cc.audioEngine.playBackgroundMusic(filename, isLoop)
}


/**
    停止播放音乐
    @param boolean isReleaseData 是否释放音乐数据，默认为 true
**/
audio.stopMusic=function(isReleaseData){
    isReleaseData = checkbool(isReleaseData)
    cc.audioEngine.stopBackgroundMusic(isReleaseData)
}



/**
    暂停音乐的播放
**/
audio.pauseMusic=function(){
    cc.audioEngine.pauseBackgroundMusic()
}


/**
 * 恢复暂停的音乐
  */
audio.resumeMusic=function() {
    cc.audioEngine.resumeBackgroundMusic()
}


/**
    从头开始重新播放当前音乐
**/
audio.rewindMusic=function(){
    cc.audioEngine.rewindBackgroundMusic()
}

/**
    检查是否可以开始播放音乐
    如果可以则返回 true。
如果尚未载入音乐，或者载入的音乐格式不被设备所支持，该方法将返回 false。
@return boolean
**/
audio.willPlayMusic=function(){
    var ret =  cc.audioEngine.willPlayBackgroundMusic()
    return ret
}

/**
    检查当前是否正在播放音乐
    如果有音乐正在播放则返回 true，否则返回 false
@return boolean
**/
audio.isMusicPlaying=function(){
    var ret =  cc.audioEngine.isBackgroundMusicPlaying()
    return ret
}









/****************音乐特效**************************************************************/


/**
    播放音效，并返回音效句柄
如果音效尚未载入，则会载入后开始播放。
该方法返回的音效句柄用于 audio.stopSound()、audio.pauseSound() 等方法。
@param string filename 音效文件名
@param boolean isLoop 是否重复播放，默认为 false
@return integer 音效句柄
**/
audio.playSound=function(filename, isLoop) {
    if (!filename) {
        cc.log("audio.playSound() - invalid filename")
        return
    }
    if (isBoolean(isLoop)) {
        isLoop = false
    }

    return cc.audioEngine.playEffect(filename, isLoop)
}




/**
    暂停指定的音效
    @param integer 音效句柄
**/
audio.pauseSound=function(handle){
    if(!handle){
        cc.log("audio.pauseSound() - invalid handle")
        return
    }
    cc.audioEngine.pauseEffect(handle)
}
/**
    暂停所有音效
**/
audio.pauseAllSounds=function(){
    cc.audioEngine.pauseAllEffects()
}

/**
    恢复暂停的音效
    @param integer 音效句柄
**/
audio.resumeSound=function(handle) {
    if (!handle) {
        cc.log("audio.pauseSound() - invalid handle")
        return
    }
    cc.audioEngine.resumeEffect(handle)
}


/**
    恢复所有的音效
**/
audio.resumeAllSounds=function(){
    cc.audioEngine.resumeAllEffects(handle)
}


/**
    停止指定的音效
    @param integer 音效句柄
**/
audio.stopSound=function(handle){
    if (!handle) {
        cc.log("audio.stopSound() - invalid handle")
        return
    }
    cc.audioEngine.stopEffect(handle)
}


/**
    停止所有音效
**/
audio.stopAllSounds=function() {
    cc.audioEngine.stopAllEffects()
}




/**
    预载入一个音效文件
    可以在进入场景前，载入该场景需要的所有音效。这样就不会因为首次播放某个未载入的音效，而导致游戏暂停执行。
@param string 音效文件名
**/
audio.preloadSound=function(filename){
    if(!filename)
        printError("audio.preloadSound() - invalid filename")
    cc.audioEngine.preloadEffect(filename)
}



/**
    从内存卸载一个音效
    退出场景时，可以卸载掉只有该场景使用的音效，从而节约内存。
@param string 音效文件名
**/
audio.unloadSound=function(filename){
    if(!filename)
        printError("audio.unloadSound() - invalid filename")
    cc.audioEngine.unloadEffect(filename)
}

