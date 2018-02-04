/**
 * Created by FL on 2017/6/29.
 */
Scdp.define("filemanage.controller.filemanageController", {
    extend: 'Scdp.bootstrap.mvc.AbstractCrudController',
    extraEvents: [
        {itemId: 'plantselect_searchbtn', name: 'click', fn: 'doSearch'}
    ],
    viewClass: 'filemanage.view.filemanageView',
    pagePath: "filemanage/filemanage",
    initCtr: function () {
    },

    doSearch: function () {
        var me = this;
        var grid = me.view.getCmp("plan_query_grid");
        var param = {};
        var selectFileType = me.view.getCmp("selectFileType").combobox('getValue');
        if (Scdp.ObjUtil.isNotEmpty(selectFileType)) {
            if (selectFileType !== 0) {
                param.selectFileType = selectFileType;
            }
        }
        grid.datagrid('options').queryParams = param;
        grid.datagrid({
            loader: me.gridLoader
        });
    },
    gridLoader: function (params, success, fail) {
        params.limit = params.rows;
        params.start = params.page;
        BR.doAjax("/file/query.action", params, true, function (ret) {
            success(ret.resultBody)
        }, fail);
    },
    doDownload: function (url) {
        var me = this;
        window.location.href = url;
    }
});