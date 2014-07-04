/**
 * 帧动画或者精灵显示
 * 使用方法：

     //创建动画
     var decorationParma = {
                framesName   : "explosion_",
                framesBegin  : 1,
                framesLength : 8,
                framesTime   : 1.0 / 20,
                zorder       : -2,
                playForever  : true,
                autoplay     : true,
                offsetX      : 10,
                offsetY      : -4
            };
     var decorationParma = {
                imageName : ["#explosion_08.png", "#explosion_02.png"],
                offsetX   : [-13, -14, -14],
                offsetY   : [5, 5, 5],
                visible   : true,
                scale :1
            }
     var decoration = new Decoration(decorationParma,1)
     decoration.createView(this)
     var view = decoration.getView()
     decoration.setDisplayFrameIndex(1);
     view.setPosition(display.cx , display.cy)
     view.flippedX =true
 *
 * Created by Administrator on 2014/7/3.
 */
var Decoration=cc.Class.extend({
    ctor:function(param,staticIndex){
        this.param_ = param;


        for (key in param){
            var newKey = [key]+"_";
            this[newKey] = param[key];
        }

        if(staticIndex){
            if(isArray(this.imageName_)){
                this.imageName_ = this.imageName_[staticIndex]
            }
            if(isArray(this.offsetX_)){
                this.offsetX_ = this.offsetX_[staticIndex]
            }
            if(isArray(this.offsetY_)){
                this.offsetY_ = this.offsetY_[staticIndex]
            }
        }



        //this.name_    = decorationName
        this.zorder_  = checkint(this.zorder_)
        this.offsetX_ = checkint(this.offsetX_)
        this.offsetY_ = checkint(this.offsetY_)
        this.delay_   = checknumber(this.delay_)
        this.actions_ = [];


        this.scale_    = checknumber(this.scale_);
        if(this.scale_ == 0 || isNaN(this.scale_))
            this.scale_ = 1


        if(this.visible_ ==null  || checkbool (this.visible_)==false)
            this.visible_ = true
    },

    createView:function(batch){
        if(this.framesName_){
            this.frames_ = display.newFrames(this.framesName_, this.framesBegin_, this.framesLength_, this.framesReversed_)
            this.animation_ = display.newAnimation(this.frames_, this.framesTime_)
            this.animation_.retain()
            this.sprite_ = display.newSprite(this.frames_[0])
        }else{
            var imageName = this.imageName_
            if (isArray(imageName))
                imageName = imageName[0]

             cc.log(imageName,"xxx");
            this.sprite_ = display.newSprite(imageName)
        }


        this.sprite_.setScale(this.scale_);
        if(this.visible_ == false)
            this.sprite_.setVisible(false)
        batch.addChild(this.sprite_)

        if (!this.autoplay_)  return
        if(this.playForever_ )
            this.playAnimationForever()
        else
            this.playAnimationOnce()

//        this.sprite_.registerScriptHandler(function(event) {
//            if (event == "exit")
//                this.release();
//        })
    },
    setDisplayFrameIndex:function(index){
        if(this.frames_)
            this.sprite_.setSpriteFrame(this.frames_[index])
    },
    removeView:function(){
        this.stopAnimation()
        this.release()
        if(this.sprite_) {
            this.sprite_.removeSelf()
            this.sprite_ = nil
        }
    },
    release:function(){
        if (this.animation_ ){
            this.animation_.release()
            this.animation_ = nil
        }
    },



    getView:function(onComplete){
        return this.sprite_
    },
    isVisible:function(){
        return this.visible_
    },
    setVisible:function(visible){
        this.sprite_.setVisible(visible)
        this.visible_ = visible
    },





    playAnimationOnce:function(onComplete){
        this.stopAnimation();
        if(this.removeAfterPlay_ ){
            var userOnComplete = onComplete;
            onComplete = function() {
                if (userOnComplete) userOnComplete()
                this.removeView()
            }
        }

        var action =transition.playAnimationOnce(this.animation_, this.removeAfterPlay_, onComplete, this.delay_)
        //var action = this.sprite_.playAnimationOnce(this.animation_, this.removeAfterPlay_, onComplete, this.delay_)
        this.actions_.push( action);
    },
    playAnimationOnceAndRemove:function(onComplete){
        this.stopAnimation();
        var userOnComplete = onComplete;
        onComplete = function() {
            if (userOnComplete) userOnComplete()
            this.removeView()
        }
        var action =transition.playAnimationOnce(this.animation_, this.removeAfterPlay_, onComplete, this.delay_)
        //var action = this.sprite_.playAnimationOnce(this.animation_, this.removeAfterPlay_, onComplete, this.delay_)

        this.actions_.push( action);
    },
    playAnimationForever:function(){
        this.stopAnimation();
        var action = transition.playAnimationForever(this.sprite_,this.animation_,  this.delay_);
//        var action = this.sprite_.runAction(this.animation_,  this.delay_)
        this.actions_.push( action);
    },
    stopAnimation:function(){
        for (x in this.actions_){
            if(action)  transition.removeAction(action)
        }
        this.actions_ = []
    },
    fadeOutAndStopAnimation:function(time, onComplete){
        var action = transition.fadeOut(this.sprite_, {
            time: time,
            onComplete: function (){
                if (onComplete) onComplete()
                this.stopAnimation()
            }
        })
        this.actions_.push( action);
    }














});

