/**
 * Created by FL on 2017/6/29.
 */
Scdp.define("filemanage.view.filemanageView", {
    extend: 'Scdp.bootstrap.mvc.AbstractCrudView',
    initView: function () {
        this.loadGrid();
    },
    loadGrid: function () {
        var me = this;
        var grid = me.getCmp("plan_query_grid");
        grid.datagrid({
            height: MP.Const.dataGridHeight,
            fitColumns: false,
            collapsible: true,
            pageSize: MP.Const.dataGridPageSize,
            pageList: MP.Const.dataGridPageList,
            pagination: true,
            singleSelect: true,
            striped: true,
            columns: [[
                {field: "ck", checkbox: true},
                {
                    field: "infoTypeDesc",
                    width: 120,
                    title: "文件名",
                    sortable: "true"
                }
                , {
                    field: "userName",
                    width: 180,
                    title: "文件路径",
                    sortable: "true"
                }
                , {
                    field: "companyCodeDesc",
                    width: 120,
                    title: "上传时间"
                }
            ]],
            onLoadSuccess: function (data) {
                grid.datagrid("columnMoving");     //设置列拖动
            },
            loader: function (params, success, fail) {
                params.limit = params.rows;
                params.start = params.page;
                MP.doAction("scdp-user-feedback-query", params, success, fail, true, true);
            }
        });
    },

});