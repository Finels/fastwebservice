/**
 * Created by FL on 2017/6/29.
 */
Scdp.define("filemanage.controller.filemanageController", {
    extend: 'Scdp.bootstrap.mvc.AbstractCrudController',
    extraEvents: [
        {itemId: 'plantselect_searchbtn', name: 'click', fn: 'doSearch'},
        {itemId: 'plantselect_downloadbtn', name: 'click', fn: 'doDownloadAll'}
    ],
    viewClass: 'filemanage.view.filemanageView',
    pagePath: "filemanage/filemanage",
    urls: null,
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
        var me = this;
        params.limit = params.rows;
        params.start = params.page;
        BR.doAjax("/file/query.action", params, true, function (ret) {
            MP.Const.globalParams1 = ret.resultBody.rows;
            success(ret.resultBody)
        }, fail);
    },
    doDownload: function (url) {
        var me = this;
        window.open(url);
    },
    doDownloadAll: function () {
        var me = this;
        // var rows = MP.Const.globalParams1;
        // if (rows == null || rows.length == 0) {
        //     MP.Msg.warn("查询数据为空，暂无无可下载文档");
        //     return;
        // }
        // for (var index in rows) {
        //     if (rows[index].filepath) {
        //         var url = rows[index].filepath;
        //         me.doDownload(url);
        //     }
        // }
        BR.doAjax("/file/download.action", {}, true, null, null);
    },
    doDownload: function (url) {
        setTimeout(function () {
            var frame = $('<iframe style="display: none;" class="multi-download"></iframe>');
            frame.attr('src', url);
            $(document.body).after(frame);
            setTimeout(function () {
                frame.remove();
            }, 1000);
        }, 100);
    }
});