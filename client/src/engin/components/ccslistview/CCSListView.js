/**
 * CCSListView.js
 * 使用方法：
 *  var param = {
        size : cc.size(960, 255),
        cellSize:cc.size(220,255),
        direction:ccui.ScrollView.DIR_HORIZONTAL //ccui.ScrollView.DIR_VERTICAL
    }
    var ccsListView = new CCSListView()
    ccsListView.init(param);
    ccsListView.setPosition(0,display.cy-255/2+30);
    backgroundLayer.addChild(ccsListView);

 * Created by Administrator on 2014/7/8.
 */

var CCSListView = cc.Node.extend({
    init: function (param) {
        var size = param.size;
        var direction = param.direction;
        var cellSize = param.cellSize;
        var itemsMargin = param.itemsMargin || 0;

        this._array = [];
        for (var i = 0; i < 20; ++i) {
            this._array.push("item_" + i);
        }

        // Create the list view
        var listView = ccui.ListView.create();
        // set list view ex direction
        listView.setDirection(direction);
        listView.setTouchEnabled(true);
        listView.setBounceEnabled(true);
//        listView.setBackGroundImage("res/cocosui/green_edit.png");
//        listView.setBackGroundImageScale9Enabled(true);
        listView.setSize(size);
//        listView.x = (widgetSize.width - background.width) / 2 + (background.width - listView.width) / 2;
//        listView.y = (widgetSize.height - background.height) / 2 + (background.height - listView.height) / 2;
        listView.addEventListenerListView(this.selectedItemEvent, this);
        this.addChild(listView);


        // create model
        var default_button = ccui.Button.create();
        default_button.setName("TextButton");
        default_button.setTouchEnabled(true);
        default_button.loadTextures("res/hall_image_3ren.png", "res/hall_image_3ren.png", "");//100 30

        var default_item = ccui.Layout.create();
        default_item.setTouchEnabled(true);
//        default_item.setSize(default_button.getSize());
        default_item.setSize(cellSize);
//        default_item.width = listView.width;
        default_button.x = default_item.width / 2;
        default_button.y = default_item.height / 2;
        default_item.addChild(default_button);

        // set model
        listView.setItemModel(default_item);

        // add default item
        var count = this._array.length;
        for (var i = 0; i < count / 4; ++i) {
            listView.pushBackDefaultItem();
        }
        // insert default item
        for (var i = 0; i < count / 4; ++i) {
            listView.insertDefaultItem(0);
        }


        var startSpt = display.newSprite("#hall_image_bisai.png",200,0)
        listView.addNode(startSpt);

        var imageView = ccui.ImageView.create();
        imageView.loadTexture("res/hall_image_bisai.png");
        listView.addChild(imageView);

            // insert default item
//            for (var i = 0; i < count / 4; ++i) {
//                listView.insertDefaultItem(0);
//            }

//            // add custom item
//            for (var i = 0; i < count / 4; ++i) {
//                var custom_button = ccui.Button.create();
//                custom_button.setName("TextButton");
//                custom_button.setTouchEnabled(true);
//                custom_button.setScale9Enabled(true);
//                custom_button.loadTextures("res/cocosui/button.png", "res/cocosui/buttonHighlighted.png", "");
//                custom_button.setSize(default_button.getSize());
//
//                var custom_item = ccui.Layout.create();
//                custom_item.setSize(custom_button.getSize());
//                custom_item.width = listView.width;
//                custom_button.x = custom_item.width / 2;
//                custom_button.y = custom_item.height / 2;
//                custom_item.addChild(custom_button);
//
//                listView.pushBackCustomItem(custom_item);
//            }
//            // insert custom item
//            var items = listView.getItems();
//            var items_count = items.length;
//            for (var i = 0; i < count / 4; ++i) {
//                var custom_button = ccui.Button.create();
//                custom_button.setName("TextButton");
//                custom_button.setTouchEnabled(true);
//                custom_button.setScale9Enabled(true);
//                custom_button.loadTextures("res/cocosui/button.png", "res/cocosui/buttonHighlighted.png", "");
//                custom_button.setSize(default_button.getSize());
//
//                var custom_item = ccui.Layout.create();
//                custom_item.setSize(custom_button.getSize());
//                custom_item.width = listView.width;
//                custom_button.x = custom_item.width / 2;
//                custom_button.y = custom_item.height / 2;
//                custom_item.addChild(custom_button);
//
//                listView.insertCustomItem(custom_item, items_count);
//            }
//
//            // set item data
//            items_count = items.length;
//            for (var i = 0; i < items_count; ++i) {
//                var item = listView.getItem(i);
//                var button = item.getChildByName("TextButton");
//                var index = listView.getIndex(item);
//                button.setTitleText(this._array[index]);
//            }
//
//            // remove last item
//            listView.removeLastItem();
//
//            // remove item by index
//            items_count = items.length;
//            listView.removeItem(items_count - 1);
//
//            // set all items layout gravity
//            listView.setGravity(ccui.ListView.GRAVITY_CENTER_VERTICAL);

//              // set items margin
              listView.setItemsMargin(itemsMargin);

            return true;



    },

    getListView:function(){
       return this.listView_;
    },
    selectedItemEvent: function (sender, type) {
        switch (type) {
            case ccui.ListView.EVENT_SELECTED_ITEM:
                var listViewEx = sender;
                cc.log("select child index = " + listViewEx.getCurSelectedIndex());
                break;

            default:
                break;
        }
    }
});