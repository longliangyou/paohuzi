/**
 * CCSTableViewList
 * Created by Administrator on 2014/7/8.
 */

var CCSTableViewList=cc.Class.extend({
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
        var tableView = cc.TableView.create(this.array_, this.size_, this)//cc.TableView.create = function (dataSource, size, container) {
        this.batch_.addChild(tableView)

        tableView.setDirection(this.direction_)
        //tableView:registerScriptHandler(handler(self,self.kTableCellSizeForIndex),CCTableView.kTableCellSizeForIndex)
        //tableView:registerScriptHandler(handler(self,self.kTableCellSizeAtIndex),CCTableView.kTableCellSizeAtIndex)
        //tableView:registerScriptHandler(handler(self,self.kNumberOfCellsInTableView),CCTableView.kNumberOfCellsInTableView)
        //tableView:registerScriptHandler(handler(self,self.scrollViewDidScroll),CCTableView.kTableViewScroll)
        //tableView:registerScriptHandler(handler(self,self.scrollViewDidZoom),CCTableView.kTableViewZoom)
        //tableView:registerScriptHandler(handler(self,self.tableCellTouched),CCTableView.kTableCellTouched)
        //tableView:registerScriptHandler(handler(self,self.kTableCellUnhighLight),CCTableView.kTableCellUnhighLight)
        //tableView.setTouchMode(cc.EventListener.TOUCH_ONE_BY_ONE)
        tableView.reloadData()
        this.tableView_ = tableView
    }

});