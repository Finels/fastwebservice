/**
**/
(function ($) {
    "use strict";
    
    var Component = function (options) {
        var tableOptions = options.bt_table.bootstrapTable("getOptions");
        var table = options.bt_table.data('bootstrap.table');
        var colOptions = getColumOptions(tableOptions, options.field);
        options = $.extend(colOptions.editable, options);
        this.table = table;
        this.xtype = options.xtype;
        this.colOptions = colOptions;
        this.init('component', options, Component.defaults);

        var data = this.table.getData();
        this.index = $(options.scope).parents('tr[data-index]').data('index');
        this.row = data[this.index];
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
    $.fn.editableutils.inherit(Component, $.fn.editabletypes.abstractinput);

    $.extend(Component.prototype, {
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
            this.$tpl = $(this.options.tpl); //whole tpl as jquery object
            this.$input = this.$tpl;
            this.$clear = null;              //clear button
            this.error = null;               //error message, if input cannot be rendered
        },
        str2value: function(str) {
            return str;
        },
        value2html: function(value, element) {
            if(this.colOptions.formatter) {
                var text = this.colOptions._formatter(value, this.row, this.index);
                $(element).html($.trim(text));
            } else {
                $(element)[this.options.escape ? 'text' : 'html']($.trim(value));
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

    Component.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: '<input type="text">',
        placeholder: null,
        clear: false,
        bt_table: null,
        field: null,

    });

    $.fn.editabletypes.component = Component;

}(window.jQuery));


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

(function ($) {
    "use strict";

    var ComboBox = function (options) {
        var tableOptions = options.bt_table.bootstrapTable("getOptions");
        var table = options.bt_table.data('bootstrap.table');
        var colOptions = getColumOptions(tableOptions, options.field);
        options = $.extend(colOptions.editable, options);
        this.table = table;
        this.xtype = "e_combobox";
        options.xtype = "e_combobox";
        this.colOptions = colOptions;
        this.init('combobox', options, ComboBox.defaults);

        var data = this.table.getData();
        this.index = $(options.scope).parents('tr[data-index]').data('index');
        this.row = data[this.index];
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
    $.fn.editableutils.inherit(ComboBox, $.fn.editabletypes.abstractinput);

    $.extend(ComboBox.prototype, {
        render: function() {
            this.setClass();
            this.setAttr('placeholder');
            this.itemId = Scdp.StrUtil.getUUID();
            this.ele = $(this.$input);

            this.options.itemId = this.itemId;
            this.setAttr('itemId');
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
            var comboStore = this.reloadCombo(col, row);
            if(comboStore) {
                var valueField = Scdp.StrUtil.replaceNull(col.valueField, "code");
                var textField = Scdp.StrUtil.replaceNull(col.textField, "codedesc");
                var separator = Scdp.StrUtil.replaceNull(col.separator, "|");
                if(col.multiple && Scdp.ObjUtil.isNotEmpty(value)) {
                    var values = Scdp.StrUtil.split(value,separator);
                    values = Scdp.ArrayUtil.removeEmpty(values);
                    var showDesc = [];
                    $.each(values, function(i,v) {
                        var record = Scdp.ArrayUtil.findRecord(comboStore, valueField, v);
                        if(record) {
                            showDesc.push(record[textField]);
                        } else {
                            showDesc.push(v);
                        }
                    });
                    if(showDesc.length > 0) {
                        return  separator + showDesc.join(separator) + separator;
                    } else {
                        return "";
                    }

                } else {
                    var record = Scdp.ArrayUtil.findRecord(comboStore, valueField, value);
                    if(record) {
                        return record[textField];
                    } else {
                        return value;
                    }
                }
            } else {
                return value;
            }
        },

        reloadCombo: function(col, record) {
            var filterMap = {};
            if (Scdp.ObjUtil.isNotEmpty(col.filterFields) && record != null) {
                var filter = Scdp.StrUtil.split(col.filterFields,",");
                $.each(filter, function (i,item) {
                    if(item.indexOf(":") != -1) {
                        var itemMapping = Scdp.StrUtil.split(item,":");
                        filterMap[itemMapping[0]] = itemMapping[1];
                    } else {
                        var itemMapping = Scdp.StrUtil.split(item,"|");
                        var value = record[itemMapping[0]];
                        value = Scdp.StrUtil.replaceNull(value);
                        if (Scdp.ObjUtil.isNotEmpty(itemMapping[1])) {
                            filterMap[itemMapping[1]] = value;
                        } else {
                            filterMap[itemMapping[0]] = value;
                        }
                    }
                });
            }
            var listData = Scdp.getComboStoreDate(col.combType, col.codeType, col.menuCode, filterMap, col.needCache);
            if(listData && listData.length>0) {
                return listData;
            } else {
                return null;
            }
        },

        gotValue: function() {
            var combo = $.data(this.ele[0], 'combobox');
            var opts=combo.options;
            if(this.options.multiple) {
                if(this.options.arrayValue) {
                    return this.ele.combobox("getValues");
                } else {
                    var values = this.ele.combobox("getValues");
                    var value = null;
                    if($.isArray(values)) {
                        value = values.join(opts.separator);
                    } else {
                        value = values;
                    }
                    if(Scdp.ObjUtil.isNotEmpty(value)) {
                        return opts.separator + value + opts.separator;
                    } else {
                        return null;
                    }
                }
            } else {
                return this.ele.combobox("getValue");
            }
        },
        sotValue: function(value) {
            var me = this;
            var combo = $.data(this.ele[0], 'combobox');
            var opts=combo.options;
            if(value !== null) {
                me.ele.combobox("reload");
            }
            if(Scdp.ObjUtil.isEmpty(value)) {
                this.ele.combobox("clear");
                return;
            }
            if(this.options.multiple) {
                if($.isArray(value)) {
                    this.ele.combobox("setValues", value);
                } else {
                    var values = Scdp.StrUtil.split(value, opts.separator);
                    this.ele.combobox("setValues", Scdp.ArrayUtil.removeEmpty(values));
                }
            } else {
                this.ele.combobox("setValue", value);
                // me.cascadeLoad(true);
                // me.refreshTarget(me);
            }
        },

        parseComponent: function () {
            var me = this;
            if(!this.options.combType) {
                this.options.combType="scdp_fmcode"
            }
            this.idPrefix = this.combType + "_" + this.codeType;

            //this.options.mode = 'remote';
            if(!this.options.valueField) {
                this.options.valueField = 'code';
            }
            if(!this.options.textField) {
                this.options.textField = 'codedesc';
            }
            if(this.options.editable == null) {
                this.options.editable = false;
            }

            if(this.options.fuzzySearch) {
                this.options.readonly = false;
                this.options.editable = true;
                if(Scdp.ObjUtil.isEmpty(this.options.validType)) {
                    this.options.validType = "comboValueIsExist";
                } else if ($.isArray(this.options.validType)){
                    this.options.validType.push("comboValueIsExist")
                } else{
                    if(typeof this.options.validType=="string"){
                        var validType = [this.options.validType, 'comboValueIsExist'];
                        this.options.validType = validType;
                    } else if($.isPlainObject(this.options.validType)){
                        this.options.validType.comboValueIsExist = "";
                    }
                }
            }

            if(this.options.separator == null) {
                this.options.separator = "|";
            }

            var initFlg = true;
            if(!this.options.data) {
                this.options.loader = function(param,success,error) {
                    me.reload(me.row).done(function(ret, bolCache) {
                        if(ret && !bolCache) {
                            success(ret);
                        }
                    });
                };
            }

            this.options.onChange = function(newValue,oldValue) {
                // me.cascadeLoad();
                // me.refreshTarget();
                if(me.ele.data("textbox") && me.ele.data("textbox").textbox) {
                    var icon = me.ele.data("textbox").textbox.find(".icon-clear");
                    if(icon && Scdp.ObjUtil.isNotEmpty(newValue)) {
                        icon.css('visibility','visible');
                    } else if(icon) {
                        icon.css('visibility','hidden');
                    }
                }
                me.ele.trigger("change", [oldValue, newValue]);
            };
            this.options.onShowPanel = function() {
                me.ele.combobox("reload");
            };
            this.options = $.extend(this.options, {
                panelMinHeight: 50,
                panelMaxHeight: 200,
                panelHeight: null,
                icons:[{iconCls: "icon-clear",
                    handler: function(e){
                        $(e.data.target).combobox('clear');
                    }}]
            });
            me.ele.combobox(this.options);
            var icon = me.ele.data("textbox").textbox.find(".icon-clear");
            if(icon && Scdp.ObjUtil.isNotEmpty(me.gotValue())) {
                icon.css('visibility','visible');
            } else if(icon) {
                icon.css('visibility','hidden');
            }
            me.ele.data("textbox").textbox.find("input[type='text']").on("keyup", function(e) {
                if(this.value != null) {
                    this.value=this.value.replace(/\'|\%/g,'');
                }
            });
        },
        reload: function (record) {
            var me = this;
            me.loaded = true;
            var dtd = $.Deferred();
            var filterMap = this.filterMap || {};
            if (Scdp.ObjUtil.isNotEmpty(me.options.filterFields) && record) {
                var filter = Scdp.StrUtil.split(me.options.filterFields, ",");
                $.each(filter, function (i,item) {
                    if(item.indexOf(":") != -1) {
                        var itemMapping = Scdp.StrUtil.split(item,":");
                        filterMap[itemMapping[0]] = itemMapping[1];
                    } else {
                        var itemMapping = Scdp.StrUtil.split(item,"|");
                        var value = null;
                        if (record) {
                            value = record[itemMapping[0]];
                        }

                        value = Scdp.StrUtil.replaceNull(value);
                        if (Scdp.ObjUtil.isNotEmpty(itemMapping[1])) {
                            filterMap[itemMapping[1]] = value;
                        } else {
                            filterMap[itemMapping[0]] = value;
                        }
                    }
                });
            }
            var listData = Scdp.getComboStoreDate(me.options.combType, me.options.codeType, me.options.menuCode, filterMap, me.options.needCache);
            if(this.combData === listData) {
                dtd.resolve(this.combData);
                return dtd.promise();
            } else {
                this.combData = listData;
            }
            if(listData && listData.length>0) {
                $.map(listData, function (obj) {
                    obj.id = obj.code; // replace pk with your identifier
                    obj.text = obj.codedesc;
                });
                dtd.resolve(listData);
            } else {
                dtd.resolve([]);
            }
            return dtd.promise();
        },
        gotRecord:function() {
            var me = this;
            var values = this.ele.combobox("getValues");
            var records = [];
            if(values && values.length >0) {
                $.each(values, function(i, value) {
                    records.push(me.ele.combobox("options").finder.getRow(me.ele[0], value));
                });
            }
            return records
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
        refreshTarget: function (ele) {
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

    ComboBox.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: '<input type="text">',
        placeholder: null,
        clear: false,
        bt_table: null,
        field: null,

    });

    $.fn.editabletypes.combobox = ComboBox;

}(window.jQuery));

(function ($) {
    "use strict";

    var ComboTree = function (options) {
        var tableOptions = options.bt_table.bootstrapTable("getOptions");
        var table = options.bt_table.data('bootstrap.table');
        var colOptions = getColumOptions(tableOptions, options.field);
        options = $.extend(colOptions.editable, options);
        this.table = table;
        this.xtype = "e_combotree";
        options.xtype = "e_combotree";
        this.colOptions = colOptions;
        this.init('combotree', options, ComboTree.defaults);

        var data = this.table.getData();
        this.index = $(options.scope).parents('tr[data-index]').data('index');
        this.row = data[this.index];
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
    $.fn.editableutils.inherit(ComboTree, $.fn.editabletypes.abstractinput);

    $.extend(ComboTree.prototype, {
        render: function() {
            this.setClass();
            this.setAttr('placeholder');
            this.itemId = Scdp.StrUtil.getUUID();
            this.ele = $(this.$input);

            this.options.itemId = this.itemId;
            this.setAttr('itemId');
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
            var comboStore = this.reloadCombo(col, row);
            if(comboStore) {
                var valueField = Scdp.StrUtil.replaceNull(col.valueField, "id");
                var textField = Scdp.StrUtil.replaceNull(col.textField, "text");
                var separator = Scdp.StrUtil.replaceNull(col.separator, "|");
                if(col.multiple && Scdp.ObjUtil.isNotEmpty(value)) {
                    var values = Scdp.StrUtil.split(value,separator);
                    values = Scdp.ArrayUtil.removeEmpty(values);
                    var showDesc = [];
                    $.each(values, function(i,v) {
                        var record = Scdp.ArrayUtil.findRecord(comboStore, valueField, v);
                        if(record) {
                            showDesc.push(record[textField]);
                        } else {
                            showDesc.push(v);
                        }
                    });
                    if(showDesc.length > 0) {
                        return  separator + showDesc.join(separator) + separator;
                    } else {
                        return "";
                    }
                } else {
                    var record = Scdp.TreeUtil.findRecord(comboStore, valueField, value);
                    if(record) {
                        return record[textField];
                    } else {
                        return value;
                    }
                }

            } else {
                return value;
            }
        },

        reloadCombo: function(col, record) {
            var filterMap = {};
            if (Scdp.ObjUtil.isNotEmpty(col.filterFields) && record != null) {
                var filter = Scdp.StrUtil.split(col.filterFields,",");
                $.each(filter, function (i,item) {
                    if(item.indexOf(":") != -1) {
                        var itemMapping = Scdp.StrUtil.split(item,":");
                        filterMap[itemMapping[0]] = itemMapping[1];
                    } else {
                        var itemMapping = Scdp.StrUtil.split(item,"|");
                        var value = record[itemMapping[0]];
                        value = Scdp.StrUtil.replaceNull(value);
                        if (Scdp.ObjUtil.isNotEmpty(itemMapping[1])) {
                            filterMap[itemMapping[1]] = value;
                        } else {
                            filterMap[itemMapping[0]] = value;
                        }
                    }
                });
            }
            var postdata = {};
            postdata.comboType = Scdp.StrUtil.replaceNull(col.combType);
            postdata.filterMap = filterMap || {};
            var cacheKey = Scdp.StrUtil.getMd5(Scdp.JSON.encode(postdata));
            var cacheObj = null;
            if(col.needCache===false || !Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKey)) {
                var listData = Scdp.doAction(col.combType, filterMap, null, null, false, false);
                if(listData && listData.children) {
                    cacheObj = Scdp.copy({},listData, true);
                    Scdp.TreeUtil.mappingData(listData, col);
                    Scdp.CacheUtil.setPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKey, cacheObj);
                    return listData.children;
                } else {
                    return null;
                }
            } else {
                cacheObj = Scdp.copy({},Scdp.CacheUtil.getPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKey), true);
                Scdp.TreeUtil.mappingData(cacheObj, col);
                return cacheObj.children;
            }
        },

        gotRecord:function() {
            var combotree=$.data(this.ele[0],"combotree");
            var options=combotree.options;
            var tree=combotree.tree;
            var records = null;
            if(options.multiple) {
                records = tree.tree('getChecked', ['checked','indeterminate']);
            } else {
                records = tree.tree("getSelected");
            }
            return records;
        },
        gotValue: function() {
            var combo = $.data(this.ele[0], 'combotree');
            var opts=combo.options;

            if(this.options.multiple) {
                if(this.options.arrayValue) {
                    return this.ele.combotree("getValues");
                } else {
                    var values = this.ele.combotree("getValues");
                    var value = null;
                    if($.isArray(values)) {
                        value = values.join(opts.separator);
                    } else {
                        value = values;
                    }
                    if(Scdp.ObjUtil.isNotEmpty(value)) {
                        return opts.separator + value + opts.separator;
                    } else {
                        return null;
                    }
                }
            } else {
                return this.ele.combotree("getValue");
            }
        },
        sotValue: function(value) {
            var me = this;
            var combo = $.data(this.ele[0], 'combotree');
            var opts=combo.options;
            var upForm = me.ele.parents("[xtype='bForm'],[xtype='bPanel']");
            if(value !== null) {
                me.ele.combotree("reload");
            }
            if(Scdp.ObjUtil.isEmpty(value)) {
                this.ele.combotree("clear");
                return;
            }
            if(this.options.multiple) {
                if($.isArray(value)) {
                    this.ele.combotree("setValues", value);
                } else {
                    var values = Scdp.StrUtil.split(value,opts.separator);
                    this.ele.combotree("setValues", Scdp.ArrayUtil.removeEmpty(values));
                }
            } else {
                this.ele.combotree("setValue", value);
            }
        },

        parseComponent: function () {
            var me = this;
            if(!this.options.combType) {
                this.options.combType="scdp_fmcode"
            }
            if(this.options.editable == null) {
                this.options.editable = false;
            }

            if(this.options.fuzzySearch) {
                this.options.readonly = false;
                this.options.editable = true;
                if(Scdp.ObjUtil.isEmpty(this.options.validType)) {
                    this.options.validType = "comboTreeIsExist";
                } else if ($.isArray(this.options.validType)){
                    this.options.validType.push("comboTreeIsExist")
                } else{
                    if(typeof this.options.validType=="string"){
                        var validType = [this.options.validType, 'comboTreeIsExist'];
                        this.options.validType = validType;
                    } else if($.isPlainObject(this.options.validType)){
                        this.options.validType.comboTreeIsExist = "";
                    }
                }
            }
            if(this.options.separator == null) {
                this.options.separator = "|";
            }
            this.idPrefix = this.options.combType;

            var initFlg = true;
            this.options.loader = function(param,success,error) {
                if(initFlg) {
                    initFlg = false;
                    return;
                }
                me.reload(me.row).done(function(ret, bolCache) {
                    if(ret && $.isArray(ret)) {
                        success(ret);
                    } else if(ret) {
                        success([ret]);
                    }
                });
            };
            this.options.onChange = function(newValue,oldValue) {
                if(me.ele.data("textbox") && me.ele.data("textbox").textbox) {
                    var icon = me.ele.data("textbox").textbox.find(".icon-clear");
                    if(icon && Scdp.ObjUtil.isNotEmpty(newValue)) {
                        icon.css('visibility','visible');
                    } else if(icon) {
                        icon.css('visibility','hidden');
                    }
                }
                me.ele.trigger("change", [oldValue, newValue]);
            };
            this.options.onShowPanel = function() {
                me.ele.combotree("reload");
            };
            this.options.onSelect = function() {
                me.ele.combotree("validate");
            };
            this.options = $.extend(this.options, {
                icons:[{iconCls: "icon-clear",
                    handler: function(e){
                        $(e.data.target).combotree('clear');
                    }}]
            });
            me.ele.combotree(this.options);
            var icon = me.ele.data("textbox").textbox.find(".icon-clear");
            if(icon && Scdp.ObjUtil.isNotEmpty(me.gotValue())) {
                icon.css('visibility','visible');
            } else if(icon) {
                icon.css('visibility','hidden');
            }
        },
        reload: function (record) {
            var me = this;
            me.loaded = true;
            var dtd = $.Deferred();
            var filterMap = this.filterMap || {};
            if (Scdp.ObjUtil.isNotEmpty(me.options.filterFields) && record) {
                var filter = Scdp.StrUtil.split(me.options.filterFields, ",");
                $.each(filter, function (i,item) {
                    if(item.indexOf(":") != -1) {
                        var itemMapping = Scdp.StrUtil.split(item,":");
                        filterMap[itemMapping[0]] = itemMapping[1];
                    } else {
                        var itemMapping = Scdp.StrUtil.split(item,"|");
                        var value = null;
                        if (record) {
                            value = record[itemMapping[0]];
                        }

                        value = Scdp.StrUtil.replaceNull(value);
                        if (Scdp.ObjUtil.isNotEmpty(itemMapping[1])) {
                            filterMap[itemMapping[1]] = value;
                        } else {
                            filterMap[itemMapping[0]] = value;
                        }
                    }
                });
            }
            var postdata = {};
            postdata.comboType = Scdp.StrUtil.replaceNull(me.options.combType);
            postdata.filterMap = filterMap || {};
            var cacheKey = Scdp.StrUtil.getMd5(Scdp.JSON.encode(postdata));
            postdata.itemId = me.itemId;
            var cacheKeyWithItem = Scdp.StrUtil.getMd5(Scdp.JSON.encode(postdata));
            var cacheObj = null;
            if(me.options.needCache === false || !Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKey) && !Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithItem)) {
                var listData = Scdp.doAction(me.options.combType, filterMap, null, null, false, false);
                Scdp.TreeUtil.mappingData(listData.children, me.options);
                this.combData = listData.children;
                cacheObj = listData;
                var trueCacheKey = cacheKeyWithItem;
                Scdp.CacheUtil.setPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, trueCacheKey, cacheObj);
                dtd.resolve(listData.children);
            } else {
                if(Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithItem)) {
                    cacheObj = Scdp.CacheUtil.getPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithItem);
                } else if(Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKey)) {
                    cacheObj = Scdp.copy({},Scdp.CacheUtil.getPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKey), true);
                    Scdp.CacheUtil.setPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithItem, cacheObj);
                }

                Scdp.TreeUtil.mappingData(cacheObj.children, me.options);
                dtd.resolve(cacheObj.children, true);
            }
            return dtd.promise();
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
        refreshTarget: function (ele) {
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

    ComboTree.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: '<input type="text">',
        placeholder: null,
        clear: false,
        bt_table: null,
        field: null,

    });

    $.fn.editabletypes.combotree = ComboTree;

}(window.jQuery));

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