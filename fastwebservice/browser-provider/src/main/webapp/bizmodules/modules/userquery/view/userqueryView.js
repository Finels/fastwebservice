/**
 * Created by FL on 2017/6/29.
 */
Scdp.define("userQuery.view.userqueryView", {
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
                    title: "姓名",
                    sortable: "true"
                }
                , {
                    field: "userName",
                    width: 180,
                    title: "单位",
                    sortable: "true"
                }
                , {
                    field: "companyCodeDesc",
                    width: 120,
                    title: "专业"
                }
                , {
                    field: "createTime",
                    width: 120,
                    title: "注册时间",
                    sortable: "true",
                    formatter: MP.TranslateTime
                }, {
                    field: "isHandle",
                    width: 160,
                    title: "手机号",
                    sortable: "true"
                },
                {
                    field: "isPublish",
                    width: 160,
                    title: "Email",
                    sortable: "true"
                },
                {
                    field: "摘要题目",
                    width: 200,
                    title: "回复时间",
                    formatter: MP.TranslateTime
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