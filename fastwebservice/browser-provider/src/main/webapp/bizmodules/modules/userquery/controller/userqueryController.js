/**
 * Created by FL on 2017/6/29.
 */
Scdp.define("userQuery.controller.userqueryController", {
    extend: 'Scdp.bootstrap.mvc.AbstractCrudController',
    extraEvents: [
        {itemId: 'plantselect_searchbtn', name: 'click', fn: 'doSearch'}
    ],
    viewClass: 'userQuery.view.userqueryView',
    pagePath: "userquery/userquery",
    initCtr: function () {
        this.doSearch();
    },
    doSearch: function () {
        var me = this;
        var grid = me.view.getCmp("plan_query_grid");
        var param = {};
        var starttime = me.view.getCmp("startTime").datetimebox('getValue');
        var endtime = me.view.getCmp("endTime").datetimebox('getValue');
        if (Scdp.ObjUtil.isNotEmpty(starttime)) {
            if (!MP.timeCheck(starttime)) {
                MP.warn("日期格式不正确");
            } else {
                param.starttime = starttime;
            }
        }
        if (Scdp.ObjUtil.isNotEmpty(endtime)) {
            if (!MP.timeCheck(endtime)) {
                MP.warn("日期格式不正确");
            } else {
                param.endtime = endtime;
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
        BR.doAjax("/user/query.action", params, true, function (ret) {
            success(ret.resultBody)
        }, fail);
    }
});