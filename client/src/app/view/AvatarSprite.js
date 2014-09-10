/**
 * 用户头像的详细信息
 * Created by Administrator on 2014/7/14.
 */
var AvatarSprite = cc.Node.extend({

    ctor:function(type){
        this._super();


        var fight_userinfo_bg3 = display.newSprite("#fight_userinfo_bg3.png")
        this.addChild(fight_userinfo_bg3);




        //全部头像显示
        var userInfoImage = display.newNode();
        var fight_userinfo_circle_bg = display.newSprite("#fight_userinfo_circle_bg.png")
        userInfoImage.addChild(fight_userinfo_circle_bg);

        //加载一张默认的用户头像
        var avatarSpt = display.newSprite();
        avatarSpt.setScale(0.4);
        this.avatarSpt_ = avatarSpt;
        userInfoImage.addChild(avatarSpt);

        var phz_userinfoback1FG = display.newSprite("#phz_userinfoback1FG.png",0,-27)
        userInfoImage.addChild(phz_userinfoback1FG);
        this.addChild(userInfoImage);

        if (type==1) {//头像在右
            userInfoImage.setPosition(100,0);
        }else{
            userInfoImage.setPosition(-100,0);
        }



        return true;
    },

    initViw:function(user){
        var avatarImageName = user.avatarImageName;
        this.avatarSpt_.setTexture(avatarImageName);
    }




})