/**
 * Created by lxj on 17/02/23.
 */
Scdp.DefaultOptions = {};
Scdp.DefaultOptions.bCheckBox = {
    checkboxClass: 'icheckbox_square-blue',
    radioClass: 'iradio_square-blue'
}
Scdp.DefaultOptions.bRadioGroup = {
    radioClass: 'iradio_square-blue'
}
Scdp.DefaultOptions.bCheckGroup = {
    checkboxClass: 'icheckbox_square-blue'
}
Scdp.DefaultOptions.bComboxSin = {
    allowClear: true,
    theme: 'bootstrap'
}
Scdp.DefaultOptions.bDate = {
    format: "yyyy-mm-dd",
    //todayBtn: true,
    autoclose: true,
    pickerPosition:'bottom-left',
    viewSelect:'month',
    minView:2
}
Scdp.DefaultOptions.bDateTime = {
    format: "yyyy-mm-dd hh:ii",
    //todayBtn: true,
    autoclose: true,
    pickerPosition:'bottom-left'
    //minuteStep:1
    //viewSelect:'month',
    //minView:2
}
Scdp.DefaultOptions.bFile = {
    previewFileIcon: '<i class="fa fa-file"></i>',
    allowedPreviewTypes: ['image'],
    previewFileIconSettings: {
        'doc': '<i class="fa fa-file-word-o text-primary"></i>',
        'xls': '<i class="fa fa-file-excel-o text-success"></i>',
        'ppt': '<i class="fa fa-file-powerpoint-o text-danger"></i>',
        'pdf': '<i class="fa fa-file-pdf-o text-danger"></i>',
        'zip': '<i class="fa fa-file-archive-o text-muted"></i>',
        'htm': '<i class="fa fa-file-code-o text-info"></i>',
        'txt': '<i class="fa fa-file-text-o text-info"></i>',
        'mov': '<i class="fa fa-file-movie-o text-warning"></i>',
        'mp3': '<i class="fa fa-file-audio-o text-warning"></i>'
    },
    previewFileExtSettings: {
        'doc': function(ext) {
            return ext.match(/(doc|docx)$/i);
        },
        'xls': function(ext) {
            return ext.match(/(xls|xlsx)$/i);
        },
        'ppt': function(ext) {
            return ext.match(/(ppt|pptx)$/i);
        },
        'zip': function(ext) {
            return ext.match(/(zip|rar|tar|gzip|gz|7z)$/i);
        },
        'htm': function(ext) {
            return ext.match(/(php|js|css|htm|html)$/i);
        },
        'txt': function(ext) {
            return ext.match(/(txt|ini|md)$/i);
        },
        'mov': function(ext) {
            return ext.match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i);
        },
        'mp3': function(ext) {
            return ext.match(/(mp3|wav)$/i);
        }
    },
    fileActionSettings: {showUpload: false}
}
Scdp.DefaultOptions.bWysiHtml = {
    locale: "zh-CN",contentEditableMode:true, toolbar:{color:true,"fa": true,size:'xs'}
}
Scdp.DefaultOptions.e_combo = {
    separator:"、",
    valueSeparator:"|",
}
Scdp.DefaultOptions.e_combobox = {
    panelMinHeight: 50,
    panelMaxHeight: 200,
    panelHeight: null,
    separator:"、",
    valueSeparator:"|",
    icons:[{iconCls: "icon-clear",
        handler: function(e){
            $(e.data.target).combobox('clear');
        }}]
}
Scdp.DefaultOptions.e_combotree = {
    separator:"、",
    valueSeparator:"|",
    icons:[{iconCls: "icon-clear",
        handler: function(e){
            $(e.data.target).combotree('clear');
        }}]
}
Scdp.DefaultOptions.e_combogrid = {
    separator:"、",
    valueSeparator:"|",
    valueField:'id',
    textField:'text',
    icons:[{iconCls: "icon-clear",
        handler: function(e){
            $(e.data.target).combogrid('clear');
        }}]
}
Scdp.DefaultOptions.e_datebox = {
    editable:true,
    textField:'text',
    icons:[{iconCls: "icon-clear",
        handler: function(e){
            $(e.data.target).datebox('clear');
        }}]
}
Scdp.DefaultOptions.e_datetimebox = {
    editable:true,
    textField:'text',
    icons:[{iconCls: "icon-clear",
        handler: function(e){
            $(e.data.target).datetimebox('clear');
        }}]
}
Scdp.DefaultOptions.e_searchbox = {
    editable:false,
    icons:[{iconCls: "icon-clear",
        handler: function(e){
            $(e.data.target).searchbox('clear');
        }}]
}
Scdp.DefaultOptions.e_tree = {
    lines:true
}
Scdp.DefaultOptions.e_datagrid = {
    rownumbers: true,
    singleSelect: true,
    selectOnCheck: true,
    checkOnSelect: true,
    fitColumns: true,
    pagination: true,
    pageSize: 15,
    pageList:[10, 15, 20, 30, 40, 50],
    autoRowHeight: false,
    striped: true,
    multiSort: true,
    nowrap: true,
    loadMsg: '<div class="loader-inner line-scale"><div></div><div></div><div></div><div></div><div></div></div>',
    actionColItems: [],
    scrollbarSize:25
}
Scdp.DefaultOptions.e_editgrid = {
    rownumbers:true,
    singleSelect:true,
    autoRowHeight:false,
    striped:true,
    multiSort:true,
    nowrap:true,
    actionColItems: [],
    loadMsg: '<div class="loader-inner line-scale"><div></div><div></div><div></div><div></div><div></div></div>'
}

Scdp.DefaultOptions.bTnumCol = {
    align:'right'
}
Scdp.DefaultOptions.bTcol = {
    align:'left'
}
Scdp.DefaultOptions.textbox = {
    align:'left'
}
Scdp.DefaultOptions.numberbox = {
    align:'right'
}
Scdp.DefaultOptions.combobox = {
    separator:"、",
    valueSeparator:"|"
}
Scdp.DefaultOptions.combtree = {
    separator:"、",
    valueSeparator:"|"
}
