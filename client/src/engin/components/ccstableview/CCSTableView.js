/**
 * CCSTableView
 * Created by Administrator on 2014/7/8.
 */

var CCSTableView=cc.Class.extend({
    initData: function (param) {
        this.size_ = param.size;
        this.cellSize_ = param.cellSize
        this.direction_ = param.direction || cc.SCROLLVIEW_DIRECTION_VERTICAL //  kCCScrollViewDirectionVertical;//kCCScrollViewDirectionVertical, --kCCScrollViewDirectionHorizontal,
        this.array_ = param.array;
        this.isPress_ = param.isPress;//是否长按
        this.showArryNum_ = param.showArryNum
        this.dispath_kNumberOfCellsInTableView_ = param.dispath_kNumberOfCellsInTableView;//是否触发CCTableView.kNumberOfCellsInTableView事件


        this.scrollCellName_ = param.scrollCellName || "BagTableCellView";

        //var oneTableCell = require("client.view.ccs.ui.base.tableCell." + self.scrollCellName_)
        //this.updataTableCell_ = oneTableCell.new(self);

        this.batch_ = param.batch;
        this.allItemView_ = [];
    },


    initView: function () {
        cc.log(cc.TableView);
        this.PROPS_LIST = [
            {name: "props1", fee: 0.9, desc: "道具1", image: "hall_image_3ren.png"},
            {name: "props2", fee: 1.9, desc: "道具2", image: "hall_image_3ren.png"},
            {name: "props3", fee: 2.9, desc: "道具3", image: "hall_image_3ren.png"},
            {name: "props4", fee: 3.9, desc: "道具4", image: "hall_image_3ren.png"},
            {name: "props5", fee: 4.9, desc: "道具5", image: "hall_image_3ren.png"},
            {name: "props6", fee: 5.9, desc: "道具6", image: "hall_image_3ren.png"}
        ];
        var dataSource = {
            numberOfCellsInTableView: function (target) {
                if (this.propsList) {
                    return this.propsList.length;
                }
                return 0;
            },
            tableCellAtIndex: function (table, idx) {
                cc.log("tableCellAtIndex");
                var strValue = idx.toFixed(0);
                var cell = table.dequeueCell();
                var label;
                if (!cell) {
                    cell = new cc.TableViewCell();
                    var node = cc.BuilderReader.loadAsNodeFrom("", "GamePropsItemSprite", cell);
                    node.setAnchorPoint(cc.p(0, 0));
                    node.setPosition(cc.p(0, 0));
                    cell.addChild(node);
                    cc.log("cell add node");
                }
                cell.bgSprite.selected = false;
                cell.bgSprite.initWithSpriteFrameName("#hall_image_3ren.png");
                cc.log("idx==" + idx)
                var props = this.propsList[idx];
                cc.log("props==" + props.name);
                if (PROPS_SELECT.contains(props.name)) {
                    cell.bgSprite.selected = true;
                    cell.bgSprite.initWithSpriteFrameName("#hall_image_3ren.png");
                }
                cell.cellName.setString(props.desc);
                cell.cellGold.setString(props.fee + "￥");
                cell.cellIcon.initWithSpriteFrameName(props.image);
                cell.props = props;
                return cell;
            },
            tableCellSizeForIndex: function (table, idx) {
                cc.log("tableCellSizeForIndex");
                //return self.cellSize_.width,self.cellSize_.height;
            },
            cellSizeForTable: function (table) {
                return cc.size(481, 125);
            }
        }



        this.tableView = cc.TableView.create(dataSource, cc.size(200, 200),this);
        this.tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.tableView.setPosition(cc.p(display.cx, display.cy));
        this.tableView.setDelegate(this);
        this.tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(this.tableView);
        this.tableView.reloadData();

        this.tableView_ = tableView
    }
});