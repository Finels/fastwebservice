/**
**/
(function ($) {
    "use strict";
    
    var CheckBox = function (options) {
        var tableOptions = options.bt_table.bootstrapTable("getOptions");
        var table = options.bt_table.data('bootstrap.table');
        var colOptions = getColumOptions(tableOptions, options.field);
        options = $.extend(colOptions.editable, options);
        this.table = table;
        this.xtype = "bCheckBox";
        options.xtype = "bCheckBox";
        this.colOptions = colOptions;
        this.init('checkbox', options, CheckBox.defaults);
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
    $.fn.editableutils.inherit(CheckBox, $.fn.editabletypes.abstractinput);

    $.extend(CheckBox.prototype, {
        render: function() {
            this.setClass();
            this.setAttr('placeholder');
            this.itemId = Scdp.StrUtil.getUUID();
            this.ele = $(this.$input);

            this.options.itemId = this.itemId;
            this.setAttr('itemId');
            Scdp.parseComponent(this.ele, this.options);
        },
        prerender: function() {
            this.$tpl = $('<input type="checkbox" value="1"><label style="margin-left: 5px;">'+ this.colOptions.title +'</label>');
            this.$input = this.$tpl.filter("input");
            this.$clear = null;              //clear button
            this.error = null;               //error message, if input cannot be rendered
        },
        str2value: function(str) {
            return str;
        },
        value2html: function(value, element) {
            if(Scdp.ObjUtil.isNotEmpty(value) && value == 1) {
                $(element).html("<input type='checkbox' checked />");
            } else {
                $(element).html("<input type='checkbox' />");
            }
        },

        value2input: function(value) {
           this.ele[this.xtype]("sotValue", value);
        },
       

        input2value: function() {
           var value = this.ele[this.xtype]("gotValue");

            return value;
        },

        activate: function() {
            // this.$input.filter('[name="city"]').focus();
        },
        destroy: function() {
            this.ele[this.xtype]("destroy");
        }

    });

    CheckBox.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: '<input type="text">',
        placeholder: null,
        clear: false,
        bt_table: null,
        field: null,

    });

    $.fn.editabletypes.checkbox = CheckBox;

}(window.jQuery));