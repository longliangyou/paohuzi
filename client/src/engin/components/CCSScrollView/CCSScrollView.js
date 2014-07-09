/**
 * CCSScrollView.js
 * Created by Administrator on 2014/7/9.
 */
var CCSListView = cc.Node.extend({
    init: function () {
        if (this._super()) {
            // Create the scrollview
            var scrollView = ccui.ScrollView.create();
            scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
            scrollView.setTouchEnabled(true);
            scrollView.setSize(cc.size(280, 150));
            this.addChild(scrollView);

            var imageView = ccui.ImageView.create();
            imageView.loadTexture("res/cocosui/ccicon.png");

            var innerWidth = scrollView.width;
            var innerHeight = scrollView.height + imageView.height;

            scrollView.setInnerContainerSize(cc.size(innerWidth, innerHeight));

            var button = ccui.Button.create();
            button.setTouchEnabled(true);
            button.loadTextures("res/cocosui/animationbuttonnormal.png", "res/cocosui/animationbuttonpressed.png", "");
            button.x = innerWidth / 2;
            button.y = scrollView.getInnerContainerSize().height - button.height / 2;
            scrollView.addChild(button);

            var textButton = ccui.Button.create();
            textButton.setTouchEnabled(true);
            textButton.loadTextures("res/cocosui/backtotopnormal.png", "res/cocosui/backtotoppressed.png", "");
            textButton.setTitleText("Text Button");
            textButton.x = innerWidth / 2;
            textButton.y = button.getBottomInParent() - button.height;
            scrollView.addChild(textButton);

            var button_scale9 = ccui.Button.create();
            button_scale9.setTouchEnabled(true);
            button_scale9.setScale9Enabled(true);
            button_scale9.loadTextures("res/cocosui/button.png", "res/cocosui/buttonHighlighted.png", "");
            button_scale9.width = 100;
            button_scale9.height = 32;
            button_scale9.x = innerWidth / 2;
            button_scale9.y = textButton.getBottomInParent() - textButton.height;
            scrollView.addChild(button_scale9);

            imageView.x = innerWidth / 2;
            imageView.y = imageView.height / 2;
            scrollView.addChild(imageView);

            return true;
        }
        return false;
    }


});