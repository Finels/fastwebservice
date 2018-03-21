/**
 * Created by FL on 2017/6/29.
 */
Scdp.define("filemanage.view.filemanageView", {
    extend: 'Scdp.bootstrap.mvc.AbstractCrudView',
    initView: function () {
        this.initCondition();
        this.loadGrid();
    },
    initCondition: function () {
        var me = this;
        me.getCmp("selectFileType").combobox({
            valueField: 'id',
            textField: 'text',

            data: [
                {id: 0, text: '全部'},
                {id: 1, text: 'The main Symposium for PID'},
                {id: 2, text: 'Rheumatology and Allergic Diseases'},
                {id: 3, text: 'Respiratory and Infectious Disease'},
                {id: 4, text: 'Hematology and Transplantation'},
            ]
        });
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
                    field: "opt",
                    width: 80,
                    title: "操作",
                    formatter: function () {
                        var html = "<a class='easyui-linkbutton l-btn l-btn-small l-btn-plain' href='javascript:void(0)'> " +
                            "<button type='button' class='btn btn-danger btn-xs'><i class='fa fa-fw fa-sign-in'></i>下载</button></a>"
                        return html;
                    }
                },
                {
                    field: "rncode",
                    width: 160,
                    title: "RNCode",
                },
                {
                    field: "filename",
                    width: 160,
                    title: "论文名",
                }
                , {
                    field: "username",
                    width: 240,
                    title: "上传者",
                }
                , {
                    field: "filetype",
                    width: 280,
                    title: "论坛类型",
                    formatter: function (value) {
                        if (value == 1) {
                            return "The main Symposium for PID"
                        } else if (value == 2) {
                            return "Rheumatology and Allergic Diseases"
                        } else if (value == 3) {
                            return "Respiratory and Infectious Disease"
                        } else if (value == 4) {
                            return "Hematology and Transplantation"
                        }
                    }
                },
                {
                    field: "createtime",
                    width: 160,
                    title: "上传时间",
                    sortable: "true"
                }
            ]],
            onLoadSuccess: function (data) {
                grid.datagrid("columnMoving");     //设置列拖动
            },
            // loader: function (params, success, fail) {
            //     params.limit = params.rows;
            //     params.start = params.page;
            //     MP.doAction("scdp-user-feedback-query", params, success, fail, true, true);
            // },
            onClickCell: function (rowIndex, field, value) {
                if (field == 'opt') {
                    var url = grid.datagrid("getRows")[rowIndex].filepath;
                    me.controller.doDownload(url);
                }
            }
        });
    },

});