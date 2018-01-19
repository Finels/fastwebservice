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
                //{field: "ck", checkbox: true},
                {
                    field: "firstname",
                    width: 120,
                    title: "First Name",
                    sortable: "true"
                }
                , {
                    field: "middlename",
                    width: 120,
                    title: "Middle Name",
                    sortable: "true"
                }
                , {
                    field: "lastname",
                    width: 120,
                    title: "Last Name",
                    sortable: "true"
                }
                , {
                    field: "position",
                    width: 180,
                    title: "Position",
                    sortable: "true"
                }, {
                    field: "institution",
                    width: 180,
                    title: "Institution",
                    sortable: "true"
                }
                , {
                    field: "city",
                    width: 120,
                    title: "City",
                    sortable: "true"
                }, {
                    field: "country",
                    width: 120,
                    title: "Country",
                    sortable: "true"
                }
                , {
                    field: "address",
                    width: 120,
                    title: "Address"
                }
                , {
                    field: "email",
                    width: 180,
                    title: "E-mail",
                    sortable: "true",
                    formatter: MP.TranslateTime
                }, {
                    field: "creattime",
                    width: 160,
                    title: "Register Time",
                    sortable: "true"
                },
                {
                    field: "code",
                    width: 120,
                    title: "Register Code",
                    sortable: "true"
                }
            ]],
            onLoadSuccess: function (data) {
                grid.datagrid("columnMoving");     //设置列拖动
            },
            //loader: function (params, success, fail) {
            //    params.limit = params.rows;
            //    params.start = params.page;
            //    BR.doAjax("/user/query.action", params, true, function (ret) {
            //        success(ret.resultBody)
            //    }, fail);
            //}
        });
    },

});