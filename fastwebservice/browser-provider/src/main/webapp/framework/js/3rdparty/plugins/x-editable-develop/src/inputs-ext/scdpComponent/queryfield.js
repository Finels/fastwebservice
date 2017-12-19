/**
**/
(function ($) {
    "use strict";
    
    var QueryField = function (options) {
        var tableOptions = options.bt_table.bootstrapTable("getOptions");
        var table = options.bt_table.data('bootstrap.table');
        var colOptions = getColumOptions(tableOptions, options.field);
        options = $.extend(colOptions.editable, options);
        this.table = table;
        this.xtype = "e_queryfield";
        options.xtype = "e_queryfield";
        this.colOptions = colOptions;
        this.init('queryfield', options, QueryField.defaults);

        var data = this.table.getData();
        this.index = $(options.scope).parents('tr[data-index]').data('index');
        this.row = data[this.index];

        this.valueField = options.valueField = options.valueField || options.field;
        this.textField = options.textField = options.textField || options.valueField + "Desc";
    };
    function getColumOptions(tableOptions, field) {
        var colOptions = {};
        $.each(tableOptions.columns, function (i, cols) {
            $.each(cols,function (j, col) {
                if(col.field == field) {
                    colOptions = col;
                    return;
                }
            });
        });
        return colOptions;
    }

    //inherit from Abstract input
    $.fn.editableutils.inherit(QueryField, $.fn.editabletypes.abstractinput);

    $.extend(QueryField.prototype, {
        prerender: function() {
            this.$tpl = $("<span><input itemId='" + this.valueField + "' type='hidden'><input type='text' itemId='" + this.textField + "' class='datagrid-editable-input'></span>"); //whole tpl as jquery object
            this.$input = this.$tpl.getCmp(this.textField);         //control itself, can be changed in render method
            this.$valueInput = this.$tpl.getCmp(this.valueField);
            this.$clear = null;              //clear button
            this.error = null;               //error message, if input cannot be rendered
        },
        render: function() {
            this.setClass();
            this.setAttr('placeholder');
            this.itemId = Scdp.StrUtil.getUUID();
            this.ele = $(this.$input);

            this.options.itemId = this.itemId;
            // this.setAttr('itemId');
            // Scdp.parseComponent(this.ele, this.options);
            this.parseComponent();
        },

        str2value: function(str) {
            return str;
        },
        value2html: function(value, element) {
            var showFormater = this.formatter(value, this.row, this.index, this.options);
            $(element)[this.options.escape ? 'text' : 'html']($.trim(showFormater));
        },

        value2input: function(value) {
           this.sotValue(value);
        },
       
        input2value: function() {
           var value = this.gotValue();
           return value;
        },
        value2submit: function(value) {
            var me = this;
            this.cascadeLoad();
            this.refreshTarget();
            this.row[this.options.field] = value;
            setTimeout(function () {
                me.table.updateRow({index:me.index, row: me.row});
            },300);
            return value;
        },
        activate: function() {
            // this.$input.filter('[name="city"]').focus();
        },
        destroy: function() {
            this.ele[this.xtype]("destroy");
        },
        formatter: function(value,row,index, col){
            return value;
        },

        gotRecord:function(target) {
            var me = this;
            var records = this.$input.val();
            var data = {};
            data[me.textField] = this.$tpl.getCmp(me.textField).searchbox("getValue");
            data[me.valueField] = records;
            return data;
        },
        gotValue: function() {
            return this.$tpl.getCmp(me.textField).searchbox("getValue");
        },
        sotValue: function(value) {
            var me = this;
            this.$valueInput.val(value);
            this.$input.searchbox("setValue", value);
        },

        parseComponent: function () {
            var me = this;
            var options = this.options;
            this.options.searcher = function(){
                Scdp.popupSearchColWin(options.linkhref, options.winTitle, null, options.resultGridId, options.style, function(selectRecord){
                    selectRecord = selectRecord[0];
                    me.$input.searchbox("setValue",selectRecord[options.textField]);
                    me.$valueInput.val(selectRecord[options.valueField]);
                    $(options.bt_table).trigger(options.itemId + "searcher",[selectRecord]);
                    var opts = me.$input.searchbox("options");
                });
            };
            this.$input.searchbox(options);
        },

        cascadeLoad: function () {
            var me = this;
            if (Scdp.ObjUtil.isNotEmpty(me.options.cascadeField)) {
                var cascadeFieldArr = Scdp.StrUtil.split(me.options.cascadeField,",");
                for (var i = 0; i < cascadeFieldArr.length; i++) {
                    var cascadeField = cascadeFieldArr[i];
                    this.row[cascadeField] = null;
                }
            }
        },
        refreshTarget: function () {
            var me = this;
            var record = me.gotRecord();
            if(record && $.isArray(record) && record.length == 1) {
                record = record[0];
            }
            var gridRecord = me.row;
            if (Scdp.ObjUtil.isNotEmpty(this.options.target)) {
                var targetFields = Scdp.StrUtil.split(this.options.target,",");
                $.each(targetFields, function (i, item) {
                    var itemMapping = Scdp.StrUtil.split(item,"|");
                    if(Scdp.ObjUtil.isNotEmpty(gridRecord)) {
                        if (Scdp.ObjUtil.isNotEmpty(record)) {
                            var rData = record;
                            if (Scdp.ObjUtil.isNotEmpty(itemMapping[1])) {
                                if($.isArray(rData)) {
                                    var separator = Scdp.StrUtil.replaceNull(me.options.separator, "|");
                                    var values = [];
                                    $.each(rData, function(i, row) {
                                        values.push(row[itemMapping[1]]);
                                    });
                                    var targetValue = values.join(separator);
                                    gridRecord[itemMapping[0]] = targetValue;
                                } else {
                                    gridRecord[itemMapping[0]] = rData[itemMapping[1]];
                                }
                            } else {
                                if($.isArray(rData)) {
                                    var separator = Scdp.StrUtil.replaceNull(me.options.separator, "|");
                                    var values = [];
                                    $.each(rData, function(i, row) {
                                        values.push(row.codedesc);
                                    });
                                    var targetValue = values.join(separator);
                                    gridRecord[itemMapping[0]] = targetValue;
                                } else {
                                    gridRecord[itemMapping[0]] = rData.codedesc;
                                }
                            }
                        } else {
                            gridRecord[itemMapping[0]] = null;
                        }
                    }
                })
            }
        }
    });

    QueryField.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: '<input type="text">',
        placeholder: null,
        clear: false,
        bt_table: null,
        field: null,

    });

    $.fn.editabletypes.queryfield = QueryField;

}(window.jQuery));