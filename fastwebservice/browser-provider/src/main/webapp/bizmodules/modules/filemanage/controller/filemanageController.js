/**
 * Created by FL on 2017/6/29.
 */
Scdp.define("filemanage.controller.filemanageController", {
    extend: 'Scdp.bootstrap.mvc.AbstractCrudController',
    extraEvents: [
        {itemId: 'add_btn', name: 'click', fn: 'doOpenAdd'},
        {itemId: 'cancle_btn', name: 'click', fn: 'doCloseAdd'},
        {itemId: 'save_btn', name: 'click', fn: 'doSave'},
        {itemId: 'delete_btn', name: 'click', fn: 'doDelete'},
        {itemId: 'search_userfeedback', name: 'click', fn: 'doSearch'}
    ],
    viewClass: 'filemanage.view.filemanageView',
    pagePath: "userquery/userquery",
    initCtr: function () {
    },
    doOpenAdd: function () {
        var me = this;
        me.view.getCmp("insert_div").show();
        MP.getCmp('feedbakc_form', 'title').textbox('setValue', '');
        var feedback_content = UM.getEditor('feedback_content');
        feedback_content.setContent('');
        me.view.getCmp("feedbackList").hide();
    },
    doCloseAdd: function () {
        var me = this;
        me.view.getCmp("insert_div").hide();
        me.view.getCmp("feedbackList").show();
        me.view.loadGrid();
    },
    doSave: function () {
        var me = this;
        var viewdata = MP.getFormData("feedbakc_form", me);
        if (!viewdata.title) {
            MP.Msg.warm('请填写标题！');
            return;
        }
        if (!viewdata.content) {
            MP.Msg.warm('请填文件描述！');
            return;
        }
        BR.doAction("scdp-user-feedback-add", {viewdata: viewdata}, function () {
            MP.Msg.info("保存成功");
            me.doCloseAdd();
        }, null, true, true);
    },
    doSearch: function () {
        var me = this;
        me.view.getCmp("userFeedBackList").datagrid('reload');
    },
    doDelete: function () {
        var me = this;
        var row = me.view.getCmp("userFeedBackList").datagrid('getSelected');
        if (row) {
            MP.doAction("scdp-user-feedback-delete", {uuid: row.uuid}, function () {
                MP.Msg.info("删除成功");
                me.view.getCmp("userFeedBackList").datagrid('reload');
            }, null, true, true);
        } else {
            MP.Msg.warn("请先选择一条记录");
        }
    }
});