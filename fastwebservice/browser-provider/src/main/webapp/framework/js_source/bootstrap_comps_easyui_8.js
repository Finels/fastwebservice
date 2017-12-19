/**
 * Created by lxj on 16/12/22.
 */
Scdp.define("e_comp", {
    extend: 'scdp_comp',
    bind: function(eventName, fn) {
        var me = this;
        var e_type = null;
        if(me.e_type) {
            e_type = me.e_type;
        } else {
            e_type = me.xtype.substring(2);
        }
        var opts = $.data(me.ele[0], e_type).options;
        var orgEventFun = null;
        if(opts) {
            //opts[eventName] = fn;
            orgEventFun = opts[eventName];
            if(orgEventFun) {
                var eventFun = function () {
                    if(orgEventFun.apply(this,arguments) == false) {
                        return false;
                    }
                    if(fn.apply(this,arguments) == false) {
                        return false;
                    }
                };
                opts[eventName] = eventFun;
            }
        }
        var easyUiObj = $.data(me.ele[0], e_type);
        if(!orgEventFun) {
            //对子控件设置
            $.each(easyUiObj, function(key, subObj) {
                if(subObj instanceof jQuery && subObj[0] && $.data(subObj[0], key)) {
                    var optsSub = $.data(subObj[0], key).options;
                    if(optsSub && optsSub[eventName]) {
                        var orgEventFunSub = optsSub[eventName];
                        var eventFunSub = function () {
                            if(orgEventFunSub.apply(this,arguments) == false) {
                                return false;
                            }
                            if(fn.apply(this,arguments) == false) {
                                return false;
                            }
                        };
                        optsSub[eventName] = eventFunSub;
                    }
                }
            })
        }
        var easyUiDataObjs = $.data(me.ele[0]);
        var xtypeObj = $.data(me.ele[0], me.xtype);
        if(easyUiDataObjs) {
            //对同辈对象
            $.each(easyUiDataObjs, function(key, subObj) {
                if(subObj == easyUiObj || subObj == xtypeObj) {
                    return;
                }
                if($.isPlainObject(subObj) && subObj.options && $.isPlainObject(subObj.options)) {
                    var orgEventFunSub = subObj.options[eventName];
                    var eventFunSub = function () {
                        if(orgEventFunSub.apply(this,arguments) == false) {
                            return false;
                        }
                        if(fn.apply(this,arguments) == false) {
                            return false;
                        }
                    };
                    subObj.options[eventName] = eventFunSub;
                }
            });
        }
    }
});
Scdp.define("e_value_comp", {
    extend: 'e_comp',
    mixins: ['scdp_value_comp']
});

Scdp.define("e_validatebox", {
    extend: 'e_value_comp',
    init: function () {
        var me = this;
        me.ele.combobox(this.options);
    },
    destroy: function() {
        this.ele.validatebox("destroy");
    },
    gotValue: function() {
        return this.ele.validatebox("getValue");
    },
    sotValue: function(value) {
        this.ele.validatebox("setValue", value);
    },
    sotDisable: function () {
        this.ele.validatebox("disable");
    },
    sotEnable: function() {
        this.ele.validatebox("enable");
    }
});

Scdp.define("e_textbox", {
    extend: 'e_value_comp',
    init: function () {
        var me = this;
        me.ele.textbox(this.options);
    },
    destroy: function() {
        this.ele.textbox("destroy");
    },
    gotValue: function() {
        return this.ele.textbox("getValue");
    },
    sotValue: function(value) {
        this.ele.textbox("setValue", value);
    },
    sotDisable: function () {
        this.ele.textbox("disable");
    },
    sotEnable: function() {
        this.ele.textbox("enable");
    }
});

Scdp.define("e_textareabox", {
    extend: 'e_value_comp',
    textbox: null,
    tempAreaId:null,
    init: function () {
        var me = this;
        this.options.multiline = true;
        me.ele.textbox(this.options);
        me.textbox = me.ele.textbox("textbox");
        if(this.options.autoHeight) {

            var tempArea = $("<textarea style='position: absolute;left: -9999px'></textarea>");
            me.tempAreaId = Scdp.StrUtil.getUUID();
            tempArea.attr("id", me.tempAreaId);
            $("body").append(tempArea);
            me.textbox.on("keyup", function () {
                $("#"+me.tempAreaId).css("width", $(this).width());
                $("#"+me.tempAreaId).val($(this).val());

                var height = $("#"+me.tempAreaId)[0].scrollTop + $("#"+me.tempAreaId)[0].scrollHeight + "px";
                var style = $(this).attr("style");
                var styleList = style.split(";");
                var index = -1;
                $.each(styleList, function (i, v) {
                    if(v.indexOf("height:") !=-1) {
                        index = i;
                    }
                });
                if(index != -1) {
                    styleList[index] = " height:" +height + " !important";
                } else {
                    styleList.push(" height:" +height + " !important");
                }
                $(this).attr("style", styleList.join(";"));
            });
            me.textbox.css("overflow-y","hidden");
            var op = me.ele.textbox("options");
            op.onResize = function (w,h) {
                me._heightResize();
            };
        }
    },

    _heightResize: function () {
        var me = this;
        var textbox = me.ele.textbox("textbox");
        $("#"+me.tempAreaId).css("width", $(textbox).width());
        $("#"+me.tempAreaId).val($(textbox).val());

        var height = $("#"+me.tempAreaId)[0].scrollTop + $("#"+me.tempAreaId)[0].scrollHeight + "px";
        var style = $(textbox).attr("style");
        var styleList = style.split(";");
        var index = -1;
        $.each(styleList, function (i, v) {
            if(v.indexOf("height:") !=-1) {
                index = i;
            }
        });
        if(index != -1) {
            styleList[index] = " height:" +height + " !important";
        } else {
            styleList.push(" height:" +height + " !important");
        }
        textbox.attr("style", styleList.join(";"));
    },
    destroy: function() {
        this.ele.textbox("destroy");
    },
    gotValue: function() {
        return this.ele.textbox("getValue");
    },
    sotValue: function(value) {
        this.ele.textbox("setValue", value);
    },
    sotDisable: function () {
        this.ele.textbox("disable");
    },
    sotEnable: function() {
        this.ele.textbox("enable");
    }
});

Scdp.define("e_passwordbox", {
    extend: 'e_value_comp',
    init: function () {
        var me = this;
        me.ele.passwordbox(this.options);
    },
    destroy: function() {
        this.ele.passwordbox("destroy");
    },
    gotValue: function() {
        return this.ele.passwordbox("getValue");
    },
    sotValue: function(value) {
        this.ele.passwordbox("setValue", value);
    },
    sotDisable: function () {
        this.ele.passwordbox("disable");
    },
    sotEnable: function() {
        this.ele.passwordbox("enable");
    }
});

Scdp.define("e_combo", {
    extend: 'e_value_comp',
    init: function () {
        var me = this;
        if(this.options.separator == null) {
            this.options.separator = "|";
        }
        me.ele.combo(this.options);
    },
    destroy: function() {
        this.ele.combo("destroy");
    },
    gotValue: function() {
        var combo = $.data(this.ele[0], 'combo');
        var opts=combo.options;
        if(opts.multiple) {
            if(this.options.arrayValue) {
                return this.ele.combo("getValues");
            } else {
                var values = this.ele.combo("getValues");
                var value = null;
                if($.isArray(values)) {
                    value = values.join(opts.valueSeparator);
                } else {
                    value = values;
                }
                if(Scdp.ObjUtil.isNotEmpty(value)) {
                    return opts.valueSeparator + value + opts.valueSeparator;
                } else {
                    return null;
                }
            }
        } else {
            return this.ele.combo("getValue");
        }
    },
    sotValue: function(value) {
        var combo = $.data(this.ele[0], 'combo');
        var opts=combo.options;
        if(Scdp.ObjUtil.isEmpty(value)) {
            this.ele.combo("clear");
            return;
        }
        if(opts.multiple) {
            if($.isArray(value)) {
                this.ele.combo("setValues", value);
            } else {
                var values = Scdp.StrUtil.split(value,opts.valueSeparator);
                this.ele.combo("setValues", Scdp.ArrayUtil.removeEmpty(values));
            }
        } else {
            this.ele.combo("setValue", value);
        }
    },
    sotDisable: function () {
        this.ele.combo("disable");
    },
    sotEnable: function() {
        this.ele.combo("enable");
    }
});

Scdp.define("e_combobox", {
    extend: 'e_value_comp',
    combType:null,
    codeType:null,
    idPrefix:null,
    loaded:false,
    combData:null,
    init: function () {
        this.combType = this.ele.attr("combType");
        if(Scdp.ObjUtil.isEmpty(this.combType)) {
            this.combType = Scdp.StrUtil.replaceNull(this.options.combType);
        }

        this.codeType = this.ele.attr("codeType");
        if(Scdp.ObjUtil.isEmpty(this.codeType)) {
            this.codeType = Scdp.StrUtil.replaceNull(this.options.codeType);
        }

        var me = this;
        if(!this.combType) {
            this.combType="scdp_fmcode"
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
                //if(initFlg) {
                //    initFlg = false;
                //    return;
                //}
                var upForm = me.ele.parents("[xtype='bForm'],[xtype='bPanel']");
                me.reload(upForm).done(function(ret, bolCache) {
                    if(ret && !bolCache) {
                        success(ret);
                    }
                });
            };
        }

        this.options.onChange = function(newValue,oldValue) {
            me.cascadeLoad(true);
            me.refreshTarget(me);
            var icon = me.ele.data("textbox").textbox.find(".icon-clear");
            if(icon && Scdp.ObjUtil.isNotEmpty(newValue)) {
                icon.css('visibility','visible');
            } else if(icon) {
                icon.css('visibility','hidden');
            }
            me.ele.trigger("change", [oldValue, newValue]);
        };
        this.options.onShowPanel = function() {
            //var rows = me.ele.combobox("getData");
            //if(Scdp.ObjUtil.isEmpty(rows) || me.options.needCache == false) {
                me.ele.combobox("reload");
            //}
        };
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
    destroy: function() {
        this.ele.combobox("destroy");
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
                    value = values.join(opts.valueSeparator);
                } else {
                    value = values;
                }
                if(Scdp.ObjUtil.isNotEmpty(value)) {
                    return opts.valueSeparator + value + opts.valueSeparator;
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
        var upForm = me.ele.parents("[xtype='bForm'],[xtype='bPanel']");
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
                var values = Scdp.StrUtil.split(value, opts.valueSeparator);
                this.ele.combobox("setValues", Scdp.ArrayUtil.removeEmpty(values));
            }
        } else {
            this.ele.combobox("setValue", value);
            me.cascadeLoad(true);
            me.refreshTarget(me);
        }
    },
    sotDisable: function () {
        this.ele.combobox("disable");
    },
    sotEnable: function() {
        this.ele.combobox("enable");
    },
    reload: function (upContainer, record) {
        var me = this;
        me.loaded = true;
        var dtd = $.Deferred();
        var filterMap = this.filterMap || {};
        if (Scdp.ObjUtil.isNotEmpty(me.filterFields) && upContainer.length > 0) {
            var filter = Scdp.StrUtil.split(this.filterFields, ",");
            $.each(filter, function (i,item) {
                if(item.indexOf(":") != -1) {
                    var itemMapping = Scdp.StrUtil.split(item,":");
                    filterMap[itemMapping[0]] = itemMapping[1];
                } else {
                    var itemMapping = Scdp.StrUtil.split(item,"|");
                    var value = null;
                    if (upContainer.getCmp(itemMapping[0])) {
                        value = upContainer.getCmp(itemMapping[0]).gotValue();
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
        var listData = Scdp.getComboStoreDate(this.combType, this.codeType, this.menuCode, filterMap, me.options.needCache);
        if(this.combData === listData) {
            dtd.resolve(this.combData, true);
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
    }
});

Scdp.define("e_combotree", {
    extend: 'e_combobox',
    combType:null,
    idPrefix:null,
    loaded:false,
    combData:null,
    init: function () {
        this.combType = this.ele.attr("combType");
        if(Scdp.ObjUtil.isEmpty(this.combType)) {
            this.combType = Scdp.StrUtil.replaceNull(this.options.combType);
        }

        var me = this;
        if(!this.combType) {
            this.combType="scdp_fmcode"
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
        this.idPrefix = this.combType;

        //this.options.mode = 'remote';
        var initFlg = true;
        this.options.loader = function(param,success,error) {
            if(initFlg) {
                initFlg = false;
                return;
            }
            var upForm = me.ele.parents("[xtype='bForm'],[xtype='bPanel']");
            me.reload(upForm).done(function(ret, bolCache) {
                if(ret && $.isArray(ret)) {
                    success(ret);
                } else if(ret) {
                    success([ret]);
                }
            });
        };
        this.options.onChange = function(newValue,oldValue) {
            me.cascadeLoad(true);
            me.refreshTarget(me);
            var icon = me.ele.data("textbox").textbox.find(".icon-clear");
            if(icon && Scdp.ObjUtil.isNotEmpty(newValue)) {
                icon.css('visibility','visible');
            } else if(icon) {
                icon.css('visibility','hidden');
            }
            me.ele.trigger("change", [oldValue, newValue]);
        };
        this.options.onShowPanel = function() {
            //var combotree=$.data(me.ele[0],"combotree");
            //var tree=combotree.tree;
            //var roots = tree.tree("getRoots");
            me.ele.combotree("reload");
        };
        this.options.onSelect = function() {
            me.ele.combotree("validate");
        };

        me.ele.combotree(this.options);
        var icon = me.ele.data("textbox").textbox.find(".icon-clear");
        if(icon && Scdp.ObjUtil.isNotEmpty(me.gotValue())) {
            icon.css('visibility','visible');
        } else if(icon) {
            icon.css('visibility','hidden');
        }
    },
    destroy: function() {
        this.ele.combotree("destroy");
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
                    value = values.join(opts.valueSeparator);
                } else {
                    value = values;
                }
                if(Scdp.ObjUtil.isNotEmpty(value)) {
                    return opts.valueSeparator + value + opts.valueSeparator;
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
                var values = Scdp.StrUtil.split(value,opts.valueSeparator);
                this.ele.combotree("setValues", Scdp.ArrayUtil.removeEmpty(values));
            }
        } else {
            this.ele.combotree("setValue", value);
            me.cascadeLoad(true);
            me.refreshTarget(me);
        }
    },
    sotDisable: function () {
        this.ele.combotree("disable");
    },
    sotEnable: function() {
        this.ele.combotree("enable");
    },
    reload: function (upContainer, record) {
        var me = this;
        me.loaded = true;
        var dtd = $.Deferred();
        var filterMap = this.filterMap || {};
        if (Scdp.ObjUtil.isNotEmpty(me.filterFields) && upContainer.length > 0) {
            var filter = Scdp.StrUtil.split(me.filterFields,",");
            $.each(filter, function (i,item) {
                if(item.indexOf(":") != -1) {
                    var itemMapping = Scdp.StrUtil.split(item,":");
                    filterMap[itemMapping[0]] = itemMapping[1];
                } else {
                    var itemMapping = Scdp.StrUtil.split(item,"|");
                    var value = null;
                    if (upContainer.getCmp(itemMapping[0])) {
                        value = upContainer.getCmp(itemMapping[0]).gotValue();
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
        postdata.comboType = Scdp.StrUtil.replaceNull(this.combType);
        postdata.filterMap = filterMap || {};
        var cacheKey = Scdp.StrUtil.getMd5(Scdp.JSON.encode(postdata));
        postdata.itemId = me.itemId;
        var cacheKeyWithItem = Scdp.StrUtil.getMd5(Scdp.JSON.encode(postdata));
        var cacheObj = null;
        if(me.options.needCache === false || !Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKey) && !Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithItem)) {
            var listData = Scdp.doAction(this.combType, filterMap, null, null, false, false);
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
    }
});

Scdp.define("e_combogrid", {
    extend: 'e_combobox',
    combType:null,

    idPrefix:null,
    loaded:false,
    combData:null,
    init: function () {
        this.combType = this.ele.attr("combType");
        if(Scdp.ObjUtil.isEmpty(this.combType)) {
            this.combType = this.options.combType;
        }

        var me = this;
        if(!this.combType) {
            this.combType="scdp_fmcode"
        }
        this.idPrefix = this.combType;
        //if(this.options.readonly == null) {
        //    this.options.readonly = false;
        //    this.options.editable = true;
        //}

        if(this.options.valueSeparator == null) {
            this.options.valueSeparator = "|";
        }
        this.options.mode = 'remote';
        var initFlg = true;
        this.options.loader = function(param,success,error) {
            if(initFlg) {
                initFlg = false;
                return;
            }
            var upForm = me.ele.parents("[xtype='bForm'],[xtype='bPanel']");
            me.reload(upForm).done(function(retData) {
                if(retData) {
                    var listData = null;
                    if(me.options.data) {
                        listData = retData[me.options.data];
                    } else {
                        listData = retData.data;
                    }
                    success(listData);
                }
            });
        };
        this.options.onChange = function(newValue,oldValue) {
            me.cascadeLoad(true);
            me.refreshTarget(me);
            var icon = me.ele.data("textbox").textbox.find(".icon-clear");
            if(icon && Scdp.ObjUtil.isNotEmpty(newValue)) {
                icon.css('visibility','visible');
            } else if(icon) {
                icon.css('visibility','hidden');
            }
            me.ele.trigger("change", [oldValue, newValue]);
        };
        this.options.onShowPanel = function() {
            var dg = $(this).combogrid("grid");

            var upForm = me.ele.parents("[xtype='bForm'],[xtype='bPanel']");
            me.reload(upForm).done(function(retData) {
                if(retData) {
                    var listData = null;
                    if(me.options.data) {
                        listData = retData[me.options.data];
                    } else {
                        listData = retData.data;
                    }
                    dg.datagrid("loadData", listData);
                }
            });
        };
        me.ele.combogrid(this.options);
        var icon = me.ele.data("textbox").textbox.find(".icon-clear");
        if(icon && Scdp.ObjUtil.isNotEmpty(me.gotValue())) {
            icon.css('visibility','visible');
        } else if(icon) {
            icon.css('visibility','hidden');
        }
    },
    destroy: function() {
        this.ele.combogrid("destroy");
    },
    gotRecord:function() {
        var me = this;
        var values = this.ele.combogrid("getValues");
        var records = [];
        if(values && values.length >0) {
            $.each(values, function(i, value) {
                records.push(me.ele.combogrid("options").finder.getRow(me.ele[0], value));
            });
        }
        return records
    },
    gotValue: function() {
        var combo = $.data(this.ele[0], 'combogrid');
        var opts=combo.options;
        if(this.options.multiple) {
            if(this.options.arrayValue) {
                return this.ele.combogrid("getValues");
            } else {
                var values = this.ele.combogrid("getValues");
                var value = null;
                if($.isArray(values)) {
                    value = values.join(opts.valueSeparator);
                } else {
                    value = values;
                }
                if(Scdp.ObjUtil.isNotEmpty(value)) {
                    return opts.valueSeparator + value + opts.valueSeparator;
                } else {
                    return null;
                }
            }
        } else {
            return this.ele.combogrid("getValue");
        }
    },
    sotValue: function(value) {
        var me = this;
        var combo = $.data(this.ele[0], 'combogrid');
        var opts=combo.options;
        var upForm = me.ele.parents("[xtype='bForm'],[xtype='bPanel']");
        if(value !== null) {
            me.ele.combogrid("reload");
        }
        if(Scdp.ObjUtil.isEmpty(value)) {
            this.ele.combogrid("clear");
            return;
        }
        if(this.options.multiple) {
            if($.isArray(value)) {
                this.ele.combogrid("setValues", value);
            } else {
                var values = Scdp.StrUtil.split(value,opts.valueSeparator);
                this.ele.combogrid("setValues", Scdp.ArrayUtil.removeEmpty(values));
            }
        } else {
            this.ele.combogrid("setValue", value);
            me.cascadeLoad(true);
            me.refreshTarget(me);
        }
    },
    sotDisable: function () {
        this.ele.combogrid("disable");
    },
    sotEnable: function() {
        this.ele.combogrid("enable");
    },
    reload: function (upContainer, record) {
        var me = this;
        me.loaded = true;
        var dtd = $.Deferred();
        var filterMap = this.filterMap || {};
        if (Scdp.ObjUtil.isNotEmpty(me.filterFields) && upContainer.length > 0) {
            var filter = Scdp.StrUtil.split(me.filterFields,",");
            $.each(filter, function (i,item) {
                if(item.indexOf(":") != -1) {
                    var itemMapping = Scdp.StrUtil.split(item,":");
                    filterMap[itemMapping[0]] = itemMapping[1];
                } else {
                    var itemMapping = Scdp.StrUtil.split(item,"|");
                    var value = null;
                    if (upContainer.getCmp(itemMapping[0])) {
                        value = upContainer.getCmp(itemMapping[0]).gotValue();
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
        postdata.comboType = Scdp.StrUtil.replaceNull(this.combType);
        postdata.filterMap = filterMap || {};
        var cacheKey = Scdp.StrUtil.getMd5(Scdp.JSON.encode(postdata));
        postdata.itemId = me.itemId;
        var cacheKeyWithItem = Scdp.StrUtil.getMd5(Scdp.JSON.encode(postdata));
        var cacheObj = null;

        if(me.options.needCache === false || !Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKey) && !Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithItem)) {
            var listData = Scdp.doAction(this.combType, filterMap, null, null, false, false);
            this.combData = listData;
            cacheObj = listData;
            var trueCacheKey = cacheKeyWithItem;
            Scdp.CacheUtil.setPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, trueCacheKey, cacheObj);
            dtd.resolve(listData);
        } else {
            if(Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithItem)) {
                cacheObj = Scdp.CacheUtil.getPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithItem);
            } else if (Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKey)) {
                cacheObj = Scdp.copy({},Scdp.CacheUtil.getPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKey), true);
                Scdp.CacheUtil.setPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithItem, cacheObj);
            }
            dtd.resolve(cacheObj);
        }
        return dtd.promise();
    }
});

Scdp.define("e_numberbox", {
    extend: 'e_value_comp',
    init: function () {
        var me = this;
        me.ele.numberbox(this.options);
    },
    destroy: function() {
        this.ele.numberbox("destroy");
    },
    gotValue: function() {
        return this.ele.numberbox("getValue");
    },
    sotValue: function(value) {
        this.ele.numberbox("setValue", value);
    },
    sotDisable: function () {
        this.ele.numberbox("disable");
    },
    sotEnable: function() {
        this.ele.numberbox("enable");
    }
});

Scdp.define("e_datebox", {
    extend: 'e_value_comp',
    init: function () {
        var me = this;
        this.options.onChange = function(date) {
            me.ele.trigger("change", [date]);
        };
        var format = this.ele.attr("format");
        if(Scdp.ObjUtil.isEmpty(format)) {
            format = this.options.format;
        }
        this.options.formatter = function(date) {
            if(Scdp.ObjUtil.isEmpty(format)) {
                format = "YYYY-MM-DD";
            }
            return moment(date).format(format);
        };

        this.options.onChange = function(newValue,oldValue) {
            var icon = me.ele.data("textbox").textbox.find(".icon-clear");
            if(icon && Scdp.ObjUtil.isNotEmpty(newValue)) {
                icon.css('visibility','visible');
            } else if(icon) {
                icon.css('visibility','hidden');
            }
            if(Scdp.ObjUtil.isNotEmpty(newValue)) {
                var t = Date.parse(newValue);
                if (!isNaN(t)){
                    var told = Date.parse(oldValue);
                    if (isNaN(told)){
                        oldValue = null;
                    }
                    me.ele.trigger("change", [oldValue, newValue]);
                }
            } else {
                if(Scdp.ObjUtil.isNotEmpty(oldValue)) {
                    var t = Date.parse(oldValue);
                    if (!isNaN(t)){
                        me.ele.trigger("change", [oldValue, newValue]);
                    }
                }
            }
        };
        if(Scdp.ObjUtil.isEmpty(this.options.editable)) {
            this.options.editable = true;
        }
        me.ele.datebox(this.options);
        var icon = me.ele.data("textbox").textbox.find(".icon-clear");
        if(icon && Scdp.ObjUtil.isNotEmpty(me.gotValue())) {
            icon.css('visibility','visible');
        } else if(icon) {
            icon.css('visibility','hidden');
        }
        if($.fn.inputmask && this.options.editable == true) {
            this.ele.datebox("textbox").inputmask({alias:'yyyy-mm-dd',"clearIncomplete": true,
                "onincomplete": function(){ me.sotValue(null)}
            });
        }
    },
    destroy: function() {
        this.ele.datebox("destroy");
    },
    gotValue: function() {
        var value = this.ele.datebox("getValue");
        if(value) {
            return moment(value).toDate();
        } else {
            return null;
        }
    },
    sotValue: function(value) {
        var date = null;
        if(typeof value =="string") {
            date = moment(value).format("YYYY-MM-DD");
        } else if(value instanceof Date){
            date = Scdp.DateUtil.formatDate(value)
        }
        this.ele.datebox("setValue", date);
    },
    sotDisable: function () {
        this.ele.datebox("disable");
    },
    sotEnable: function() {
        this.ele.datebox("enable");
    }
});

Scdp.define("e_datetimebox", {
    extend: 'e_value_comp',
    init: function () {
        var me = this;
        this.options.onChange = function(date) {
            me.ele.trigger("change", [date]);
        };
        var format = this.ele.attr("format");
        if(Scdp.ObjUtil.isEmpty(format)) {
            format = this.options.format;
        }
        this.options.formatter = function(date) {
            if(Scdp.ObjUtil.isEmpty(format)) {
                format = "YYYY-MM-DD HH:mm:ss";
            }
            return moment(date).format(format);
        };

        this.options.onChange = function(newValue,oldValue) {
            var icon = me.ele.data("textbox").textbox.find(".icon-clear");
            if(icon && Scdp.ObjUtil.isNotEmpty(newValue)) {
                icon.css('visibility','visible');
            } else if(icon) {
                icon.css('visibility','hidden');
            }

            if(Scdp.ObjUtil.isNotEmpty(newValue)) {
                var t = Date.parse(newValue);
                if (!isNaN(t)){
                    var told = Date.parse(oldValue);
                    if (isNaN(told)){
                        oldValue = null;
                    }
                    me.ele.trigger("change", [oldValue, newValue]);
                }
            } else {
                if(Scdp.ObjUtil.isNotEmpty(oldValue)) {
                    var t = Date.parse(oldValue);
                    if (!isNaN(t)){
                        me.ele.trigger("change", [oldValue, newValue]);
                    }
                }
            }
        };
        if(Scdp.ObjUtil.isEmpty(this.options.editable)) {
            this.options.editable = true;
        }
        me.ele.datetimebox(this.options);
        var icon = me.ele.data("textbox").textbox.find(".icon-clear");
        if(icon && Scdp.ObjUtil.isNotEmpty(me.gotValue())) {
            icon.css('visibility','visible');
        } else if(icon) {
            icon.css('visibility','hidden');
        }
        if($.fn.inputmask && this.options.editable == true) {
            this.ele.datebox("textbox").inputmask({ mask:'y-m-d h:s:s', alias:'datetime',placeholder: "yyyy-mm-dd hh:ss:ss",
                "clearIncomplete": true,
                "onincomplete": function(){ me.sotValue(null)}
            });
        }
    },
    destroy: function() {
        this.ele.datetimebox("destroy");
    },
    gotValue: function() {
        var value = this.ele.datetimebox("getValue");
        if(value) {
            value = moment(value).toDate();
            if (this.options.needTz && Scdp.ObjUtil.isNotEmpty(value)) {
                var utcTime = value.getTime();
                var localOffset = value.getTimezoneOffset() * 60000;
                var localTime = utcTime + localOffset;
                return new Date(localTime);
            }
            return value;
        } else {
            return null;
        }
    },
    sotValue: function(value) {
        var me = this;
        var date = null;
        if(typeof value =="string") {
            value = moment(value).toDate();
            if (me.options.needTz && Scdp.ObjUtil.isNotEmpty(value)) {
                value = Scdp.DateUtil.parseDateToLocal(value);
            }
            date = moment(value).format("YYYY-MM-DD HH:mm:ss");
        } else if(value instanceof Date){
            if (me.options.needTz && Scdp.ObjUtil.isNotEmpty(value)) {
                value = Scdp.DateUtil.parseDateToLocal(value);
            }
            date = Scdp.DateUtil.formatDate(value, Scdp.Const.LONG_DATE_FORMAT)
        }
        this.ele.datetimebox("setValue", date);
    },
    sotDisable: function () {
        this.ele.datetimebox("disable");
    },
    sotEnable: function() {
        this.ele.datetimebox("enable");
    }
});

Scdp.define("e_spinner", {
    extend: 'e_value_comp',
    init: function () {
        var me = this;
        me.ele.spinner(this.options);
    },
    destroy: function() {
        this.ele.spinner("destroy");
    },
    gotValue: function() {
        return this.ele.spinner("getValue");
    },
    sotValue: function(value) {
        this.ele.spinner("setValue", value);
    },
    sotDisable: function () {
        this.ele.spinner("disable");
    },
    sotEnable: function() {
        this.ele.spinner("enable");
    }
});

Scdp.define("e_numberspinner", {
    extend: 'e_value_comp',
    init: function () {
        var me = this;
        me.ele.numberspinner(this.options);
    },
    destroy: function() {
        this.ele.numberspinner("destroy");
    },
    gotValue: function() {
        return this.ele.numberspinner("getValue");
    },
    sotValue: function(value) {
        this.ele.numberspinner("setValue", value);
    },
    sotDisable: function () {
        this.ele.numberspinner("disable");
    },
    sotEnable: function() {
        this.ele.numberspinner("enable");
    }
});

Scdp.define("e_slider", {
    extend: 'e_value_comp',
    init: function () {
        var me = this;
        me.ele.slider(this.options);
    },
    destroy: function() {
        this.ele.slider("destroy");
    },
    gotValue: function() {
        return this.ele.slider("getValue");
    },
    sotValue: function(value) {
        this.ele.slider("setValue", value);
    },
    sotDisable: function () {
        this.ele.slider("disable");
    },
    sotEnable: function() {
        this.ele.slider("enable");
    }
});

Scdp.define("e_datetimespinner", {
    extend: 'e_value_comp',
    init: function () {
        var me = this;
        me.ele.datetimespinner(this.options);
    },
    destroy: function() {
        this.ele.datetimespinner("destroy");
    },
    gotValue: function() {
        return this.ele.datetimespinner("getValue");
    },
    sotValue: function(value) {
        this.ele.datetimespinner("setValue", value);
    },
    sotDisable: function () {
        this.ele.datetimespinner("disable");
    },
    sotEnable: function() {
        this.ele.datetimespinner("enable");
    }
});

Scdp.define("e_timespinner", {
    extend: 'e_value_comp',
    init: function () {
        var me = this;
        me.ele.timespinner(this.options);
    },
    destroy: function() {
        this.ele.timespinner("destroy");
    },
    gotValue: function() {
        return this.ele.timespinner("getValue");
    },
    sotValue: function(value) {
        this.ele.timespinner("setValue", value);
    },
    sotDisable: function () {
        this.ele.timespinner("disable");
    },
    sotEnable: function() {
        this.ele.timespinner("enable");
    }
});

Scdp.define("e_filebox", {
    extend: 'e_value_comp',
    init: function () {
        var me = this;
        me.ele.filebox(this.options);
    },
    destroy: function() {
        this.ele.filebox("destroy");
    },
    gotValue: function() {
        return this.ele.filebox("getValue");
    },
    sotValue: function(value) {
        this.ele.filebox("setValue", value);
    },
    sotDisable: function () {
        this.ele.filebox("disable");
    },
    sotEnable: function() {
        this.ele.filebox("enable");
    }
});

Scdp.define("e_searchbox", {
    extend: 'e_value_comp',
    init: function () {
        var me = this;

        this.options.onChange = function(newValue,oldValue) {
            var icon = me.ele.data("textbox").textbox.find(".icon-clear");
            if(icon && Scdp.ObjUtil.isNotEmpty(newValue)) {
                icon.css('visibility','visible');
            } else if(icon) {
                icon.css('visibility','hidden');
            }
            me.ele.trigger("change", [oldValue, newValue]);
            me.refreshTarget(me);
        };
        me.ele.searchbox(this.options);
        var icon = me.ele.data("textbox").textbox.find(".icon-clear");
        if(icon && Scdp.ObjUtil.isNotEmpty(me.gotValue())) {
            icon.css('visibility','visible');
        } else if(icon) {
            icon.css('visibility','hidden');
        }
    },

    destroy: function() {
        this.ele.searchbox("destroy");
    },
    gotRecord: function(){
        return this.record;
    },
    sotRecord: function(record){
        this.record = record;
    },
    gotValue: function() {
        return this.ele.searchbox("getValue");
    },
    sotValue: function(value) {
        this.ele.searchbox("setValue", value);
    },
    sotDisable: function () {
        this.ele.searchbox("disable");
    },
    sotEnable: function() {
        this.ele.searchbox("enable");
    }
});

Scdp.define("e_linkbutton", {
    extend: 'e_comp',
    init: function () {
        var me = this;
        me.ele.linkbutton(this.options);
        me.ele.addClass("btn");
    },
    destroy: function() {
        this.ele.linkbutton("destroy");
    },
    sotDisable: function () {
        this.ele.linkbutton("disable");
    },
    sotEnable: function() {
        this.ele.linkbutton("enable");
    }
});

Scdp.define("e_calendar", {
    extend: 'e_value_comp',
    init: function () {
        var me = this;
        me.ele.calendar(this.options);
    },
    destroy: function() {
        this.ele.calendar("destroy");
    },
    gotValue: function() {
        return this.ele.calendar("getValue");
    },
    sotValue: function(value) {
        this.ele.calendar("setValue", value);
    },
    sotDisable: function () {
        this.ele.calendar("disable");
    },
    sotEnable: function() {
        this.ele.calendar("enable");
    }
});

Scdp.define("e_datalist", {
    extend: 'e_value_comp',
    init: function () {
        var me = this;
        me.ele.datalist(this.options);
    },
    destroy: function() {
        this.ele.datalist("destroy");
    },
    gotValue: function() {
        //return this.ele.datalist("getValue");
    },
    sotValue: function(value) {
        //this.ele.datalist("setValue", value);
    },
    sotDisable: function () {
        this.ele.datalist("disable");
    },
    sotEnable: function() {
        this.ele.datalist("enable");
    }
});

Scdp.define("e_tree", {
    extend: 'e_value_comp',
    fnClick: null,
    fnBeforeSelect:null,
    fnBeforeExpand:null,
    fnBeforeCollapse:null,
    fnBeforeCheck:null,
    storeAction:null,
    orgValues:null,
    searchbox:null,
    init: function () {
        var me = this;
        me.searchbox = me.ele.siblings(".treeSearchBox");
        this.storeAction = this.ele.attr("storeAction");
        if(Scdp.ObjUtil.isEmpty(this.storeAction)) {
            this.storeAction = this.options.storeAction;
        }
        if(me.options.needCache == null) {
            me.options.needCache = true;
        }
        if(me.options.collapseAll == null) {
            me.options.collapseAll = true;
        }

        this.options.loader = function(param,success,error) {
            if(param && param.id) {
                return;
            }
            me._reload().done(function(ret) {
                if(ret && $.isArray(ret)) {
                    success(ret);
                } else {
                    if(Scdp.ObjUtil.isNotEmpty(ret)) {
                        success([ret]);
                    }
                }
            });
        };
        var filterResultList = [];
        this.options.filter = function(filterText, node){
            var n = me.ele.tree("find", node.id);
            if(filterText != null && filterText != "" && node.text.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) {
                me.ele.tree("expandTo",n.target);
                filterResultList.push(node);
            }
            return me.options.notFilterChild? me._isParentMatch(filterText, n) : node.text.toLowerCase().indexOf(filterText.toLowerCase()) >= 0;
        };
        me.ele.tree(this.options);

        if(me.getSearchInput()) {
            var searchInput = me.getSearchInput();
            searchInput.attr("itemid", "searchbox" + me.UNIQUE_KEY);
            var searchInputOptions = searchInput.textbox("options");
            searchInputOptions.onChange = function (newv, oldv) {
                filterResultList = [];
                me.ele.tree('doFilter', newv);
                me.ele.trigger("filter", [filterResultList]);
            }
        }
    },
    _isParentMatch: function (filterText, node) {
        var me = this;
        if(node.text.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) {
            return true;
        }
        var parentNode = me.ele.tree("getParent", node.target);
        if(parentNode) {
            return me._isParentMatch(filterText, parentNode);
        } else {
            return false;
        }
    },
    _reload: function (upContainer, record) {
        var me = this;
        me.loaded = true;
        var dtd = $.Deferred();
        if(me.options.needCache) {
            var postdata = {};
            postdata.comboType = this.storeAction;
            postdata.filterMap = {};
            var cacheKey = Scdp.StrUtil.getMd5(Scdp.JSON.encode(postdata));
            postdata.itemId = me.itemId;
            postdata.menuCode = me.menuCode;
            var cacheKeyWithItem = Scdp.StrUtil.getMd5(Scdp.JSON.encode(postdata));
            var cacheObj = null;

            if(!Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKey)  && !Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithItem)) {
                var listData = Scdp.doAction(this.storeAction, {}, null, null, false, false);
                if(listData && listData.children) {
                    Scdp.TreeUtil.mappingData(listData.children, me.options);
                    cacheObj = listData;
                    Scdp.CacheUtil.setPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithItem, cacheObj);
                    dtd.resolve(cacheObj.children);
                } else {
                    dtd.resolve([]);
                }
            } else {
                if(Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithItem)) {
                    cacheObj = Scdp.CacheUtil.getPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithItem);
                } else if (Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKey)) {
                    cacheObj = Scdp.copy({},Scdp.CacheUtil.getPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKey), true);
                    Scdp.CacheUtil.setPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithItem, cacheObj);
                }
                Scdp.TreeUtil.mappingData(cacheObj.children, me.options);
                dtd.resolve(cacheObj.children);
            }
        } else {
            var listData = Scdp.doAction(this.storeAction, {}, null, null, false, false);
            if(listData && listData.children) {
                Scdp.TreeUtil.mappingData(listData.children, me.options);
                dtd.resolve(listData.children);
            } else {
                dtd.resolve([]);
            }
        }

        return dtd.promise();
    },
    reload: function() {
        this.ele.tree("reload");
    },
    destroy: function() {
        this.ele.tree("destroy");
    },
    getChecked: function() {
        return this.ele.tree('getChecked', ['checked','indeterminate']);
    },
    gotSelected: function() {
        return this.ele.tree("getSelected");
    },
    addNode: function(param, parentNode) {
        if(parentNode) {
            param.parent = parentNode;
        }
        this.ele.tree("append", param);
    },
    removeNode: function(node) {
        var delNode = node;
        if(!node) {
            delNode = this.gotSelected();
        }
        if($(delNode.target).parent().prev().children().length > 0){
            $(delNode.target).parent().prev().children().click();
        }else if($(delNode.target).parent().next().children().length > 0){
            $(delNode.target).parent().next().children().click();
        }else{
            if(this.ele.tree('getParent', delNode.target)) {
                $(this.ele.tree('getParent', delNode.target).target).click();
            }
        }
        if(delNode && delNode.target) {
            this.ele.tree('remove', delNode.target);
        }
    },
    updateNode: function(param) {
        this.ele.tree("update", param);
    },
    _check: function(bol, nodes) {
        var me = this;
        if(nodes) {
            $.each(nodes, function(i, node) {
                if(bol) {
                    if(node.checkState != null && me.ele.tree("find", node.id).target) {
                        me.ele.tree("check", me.ele.tree("find", node.id).target);
                    }
                    if(node.children) {
                        me._check(bol, node.children);
                    }
                } else {
                    if(node.checkState != null && me.ele.tree("find", node.id).target) {
                        me.ele.tree("uncheck", me.ele.tree("find", node.id).target);
                    }
                    if(node.children) {
                        me._check(bol, node.children);
                    }
                }
            });
        }
    },
    checkAll: function() {
        var me = this;
        var nodes = this.ele.tree("getRoots");
        me._check(true, nodes);
    },

    uncheckAll: function() {
        var me = this;
        var nodes = this.ele.tree("getRoots");
        me._check(false, nodes);
    },
    gotValue: function(dirtyOnly, editflag) {
        var me = this;
        var checkNodes = this.ele.tree('getChecked', ['checked','indeterminate']);
        var inserts = [];
        var deletes = [];
        var rows =[];
        var filed = me.options.valueField;

        function generateBindingId(checkNode) {
            if (me.options.bindingid) {
                var bindingid = me.options.bindingid;
                var tmpBindid = checkNode.id;
                if (Scdp.ObjUtil.isEmpty(tmpBindid)) {
                    tmpBindid = checkNode.uuid;
                }
                checkNode[bindingid] = tmpBindid;
            }
        }
        if(editflag && editflag == "+") {
            $.each(checkNodes, function(j, checkNode) {
                generateBindingId(checkNode);
            });
            inserts = inserts.concat(checkNodes);
        } else if(Scdp.ObjUtil.isEmpty(me.orgValues) && Scdp.ObjUtil.isNotEmpty(checkNodes)) {
            $.each(checkNodes, function(j, checkNode) {
                generateBindingId(checkNode);
            });
            inserts = inserts.concat(checkNodes);
        } else if(Scdp.ObjUtil.isNotEmpty(me.orgValues) && Scdp.ObjUtil.isEmpty(checkNodes)) {
            deletes = deletes.concat(me.orgValues);
        } else if(Scdp.ObjUtil.isNotEmpty(me.orgValues) && Scdp.ObjUtil.isNotEmpty(checkNodes)) {
            $.each(me.orgValues, function(i,orgValue) {
                var remain = false;
                $.each(checkNodes, function(j, checkNode) {
                    var id = null;
                    if (filed) {
                        id = orgValue[filed];
                    } else {
                        id = orgValue.id;
                    }
                    if(id === checkNode.id) {
                        remain = true;
                        return false;
                    }
                });
                if(!remain) {
                    deletes.push(orgValue);
                }
            });

            $.each(checkNodes, function(j, checkNode) {
                var remain = false;
                generateBindingId(checkNode);
                $.each(me.orgValues, function(i,orgValue) {
                    var id = null;
                    if (filed) {
                        id = orgValue[filed];
                    } else {
                        id = orgValue.id;
                    }
                    if(id === checkNode.id) {
                        remain = true;
                        return false;
                    }
                });
                if(!remain) {
                    inserts.push(checkNode);
                }
            });
        }
        $.each(inserts, function(i, row) {
            row.editflag = "+";
        });
        $.each(deletes, function(i, row) {
            row.editflag = "-";
        });
        rows = rows.concat(inserts, deletes);
        $.each(rows, function(i, row){
            row.target = null;
        });
        return rows;
    },
    sotValue: function(value) {
        var me = this;
        var opts = $.data(me.ele[0], "tree").options;
        var tempBeforeCheck = opts.onBeforeCheck;
        opts.onBeforeCheck = $.noop;
        var tmpCascadeCheck = opts.cascadeCheck;
        opts.cascadeCheck = false;
        me.orgValues = value;
        var filed = me.options.bindingid;
        if(Scdp.ObjUtil.isEmpty(filed)) {
            filed = me.options.valueField;
        }
        var text = me.options.textField;
        me.uncheckAll();
        if (value && $.isArray(value)) {
            $.each(value, function (i, v) {
                if (v) {
                    var id = null;
                    if (filed) {
                        id = v[filed];
                    } else {
                        id = v.id;
                    }
                    var node = me.ele.tree("find", id);
                    if (Scdp.ObjUtil.isNotEmpty(node) && node.checkState != null) {
                        me.ele.tree("check", node.target);
                    }
                }
            });
        }
        opts.onBeforeCheck = tempBeforeCheck;
        opts.cascadeCheck = tmpCascadeCheck;
    },
    sotDisable: function () {
        var me = this;
        var opts = $.data(me.ele[0], "tree").options;
        var fnNoop = function() {
            return false;
        };

        if(!me.fnClick) {
            me.fnClick = opts.onClick;
            me.fnBeforeSelect = opts.onBeforeSelect;
            me.fnBeforeCheck = opts.onBeforeCheck;
            //me.fnBeforeExpand = opts.onBeforeExpand;
            //me.fnBeforeCollapse = opts.onBeforeCollapse;
            opts.onClick = fnNoop;
            opts.onBeforeSelect = fnNoop;
            opts.onBeforeCheck = fnNoop;
            //opts.onBeforeExpand = fnNoop;
            //opts.onBeforeCollapse = fnNoop;
            me.ele.css("backgroundColor","#f5f5f5");
        }
    },
    sotEnable: function() {
        var me = this;
        var opts = $.data(me.ele[0], "tree").options;
        if(me.fnClick) {
            opts.onClick = me.fnClick;
            opts.onBeforeSelect = me.fnBeforeSelect;
            opts.onBeforeCheck = me.fnBeforeCheck;
            //opts.onBeforeExpand = me.fnBeforeExpand;
            //opts.onBeforeCollapse = me.fnBeforeCollapse;
            me.ele.css("backgroundColor","");

            me.fnClick = null;
            me.fnBeforeSelect = null;
            me.fnBeforeCheck = null;
            //me.fnBeforeExpand = null;
            //me.fnBeforeCollapse = null;
        }
    },
    gotMappingKey: function(){
        return Scdp.StrUtil.replaceNull(this.options.valueField, "id");
    },
    gotMappingTextKey: function(){
        return Scdp.StrUtil.replaceNull(this.options.textField, "text");
    },
    findNode: function(key) {
        return this.ele.tree('find', key);
    },
    getSearchInput: function () {
        var me = this;
        var input = me.searchbox.find('[xtype="e_textbox"]');
        if(input.length>0) {
            return input;
        } else {
            return null;
        }
    }
});

Scdp.define("e_datagrid", {
    extend: 'e_value_comp',
    e_type:'datagrid',
    editIndex: undefined,
    selectedIndex: -1,
    aggfuns:null,
    init: function () {
        var me = this;
        me.aggfuns = {};
        function onSelect(index,row) {
            me.selectedIndex = index;
            me.ele.trigger("select", [index, row]);
        }
        function onUnselect(index,row) {
            me.ele.trigger("unselect", [index, row]);
        }
        var defaultOptions = {
            onSelect: onSelect,
            onUnselect:onUnselect
        };
        var toolbar = me.ele.attr("toolbar");
        if(this.options.toolbar) {
        } else if(toolbar){
            defaultOptions.toolbar = toolbar;
        }
        var excelExp = this.controller.exportXlsAction;
        var useBootstrapExportXls = this.controller.useBootstrapExportXls;
        if(excelExp && useBootstrapExportXls) {
            this.options.excelExp = true;
        } else {
            this.options.excelExp = false;
        }
        defaultOptions.columns = [me.paseColumns()];
        this.options = $.extend(this.options,  defaultOptions);
        this.options.toolbar = this._changeToolBarSelector(this.options.toolbar);
        this.options.onHeaderContextMenu = function(e, field){
            e.preventDefault();
            if (!cmenu){
                createColumnMenu();
            }
            cmenu.menu('show', {
                left:e.pageX,
                top:e.pageY
            });
        }
        var cmenu = null;
        function createColumnMenu(){
            cmenu = $('<div/>').appendTo('body');
            cmenu.menu({
                onClick: function(item){
                    if (item.iconCls == 'fa fa-check'){
                        me.ele.datagrid('hideColumn', item.name);
                        cmenu.menu('setIcon', {
                            target: item.target,
                            iconCls: 'icon-empty'
                        });
                    } else {
                        me.ele.datagrid('showColumn', item.name);
                        cmenu.menu('setIcon', {
                            target: item.target,
                            iconCls: 'fa fa-check'
                        });
                    }
                }
            });
            var fields = me.ele.datagrid('getColumnFields');
            for(var i=0; i<fields.length; i++){
                var field = fields[i];
                var col = me.ele.datagrid('getColumnOption', field);
                if(col.title) {
                    cmenu.menu('appendItem', {
                        text: col.title,
                        name: field,
                        iconCls: 'fa fa-check'
                    });
                }
            }
        }
        me.ele.datagrid(this.options);
        var panel = me.ele.datagrid("getPanel");
        if(this.options.excelExp) {
            var exportExcelBtn = $('<a itemId="excelExpBtn" class="btn" title="Excel 导出" style="color: green"> <i class="fa fa-file-excel-o"></i></a>');
            if($(".datagrid-toolbar", panel).length == 0) {
                var toolbar = $('<div class="datagrid-toolbar"></div>').append(exportExcelBtn);
                toolbar.prependTo(panel);
            } else {
                if($(".datagrid-toolbar", panel).children("table").length > 0) {
                    var tb = $(".datagrid-toolbar", panel).children("table");
                    var tr = tb.find("tr");
                    var td = $("<td></td>").appendTo(tr);
                    exportExcelBtn.appendTo(td);
                } else {
                    exportExcelBtn.appendTo($(".datagrid-toolbar", panel));
                }
            }
        }
        me._bind(defaultOptions.columns);
    },
    _changeToolBarSelector: function(orgToolbarSelector){
        var retSelector = null;
        if(!$.isArray(orgToolbarSelector)) {
            var parentPanel = this.ele.closest("div[xtype='bPanel']");
            if(parentPanel.length ==0) {
                parentPanel = this.ele.parent().parent();
                for(var i=0; i<3; i++) {
                    if($(orgToolbarSelector, parentPanel).length == 0) {
                        parentPanel = this.ele.parent().parent();
                    } else {
                        break;
                    }
                }
            }
            var toolbar = $(orgToolbarSelector, parentPanel);
            if(toolbar.length > 0) {
                var toolbarid = this.itemId + this.UNIQUE_KEY;
                toolbar.attr("toolbarid", toolbarid);
                retSelector = "[toolbarid='" +toolbarid+"']";
            } else {
                retSelector = null;
            }
        } else {
            retSelector = orgToolbarSelector;
        }
        return retSelector;
    },
    _bind: function (columns) {
        var me = this;
        $.each(columns, function (i, column) {
            $.each(column, function (j, col) {
                if ((col.xtype && col.xtype == "bTActionCol") || (col.coltype && col.coltype == "actioncol")){
                    me.ele.datagrid("getPanel").on("click",'[field=' + col.field + ']',function (event) {
                        var field = $(this).attr("field");
                        var btnItemId = $(event.target).parent().attr("itemId");
                        var actionColItems = me.ele.datagrid("options").actionColItems;
                        if (!actionColItems)return;
                        $.each(actionColItems, function (i, actionColItem) {
                            var items = actionColItem[field];
                            $.each(items, function (h, item) {
                                if (item.itemId == btnItemId){
                                    item.handler(me, $(event.currentTarget).parent().attr("datagrid-row-index"));
                                    return false;
                                }
                            });
                        });
                    });
                }
            });
        });
    },
    loadDataPage: function(param, action) {
        var me = this;
        param.btnQuery = 1;
        param.actionName = action;
        param.xtype = "e_datagrid";
        var grid = me.ele;
        param.columns = grid.datagrid('getColumnFields');
        param.aggfuns = me.aggfuns;
        grid.data("datagrid").options.loader =
            function(param, success, error){
                if(param && param.btnQuery) {
                    Scdp.loadFreeMarkerAction(param.actionName, param, function(data) {
                        if(data && (data.rows || $.isArray(data))) {
                            success(data);
                        } else {
                            success({rows:[],total:0});
                        }
                    }, function(e) {
                        error(e);
                    } );
                } else {
                    return false;
                }
            };
        grid.datagrid('load', param);
        grid.data("datagrid").options.onDblClickRow = function(index, row) {
            me.controller.loadItem(row[me.controller.view.uuidMapping]);
        };
    },
    paseColumns: function() {
        var me = this;
        var cols = $('th', me.ele);
        var retColums = [];
        $.each(cols, function(i, th) {
            var col = {};
            var option = $.parser.parseOptions(th);
            col = $.extend(col, option);
            var xtype = $(th).attr("xtype");
            if(Scdp.ObjUtil.isNotEmpty(xtype)) {
                col = $.extend(true, {}, Scdp.DefaultOptions[xtype], col);
            }
            var coltype = $(th).attr("coltype");
            if(Scdp.ObjUtil.isNotEmpty(coltype)) {
                col = $.extend(true,{}, Scdp.DefaultOptions[coltype],col);
            }
            if(!col.align) {
                col.align = "center";
            }
            if(col.sortable == null) {
                col.sortable = true;
            }

            var s = $(th).attr("orderable");
            if("false" == s) {
                col.sortable = false;
            }
            if(Scdp.ObjUtil.isNotEmpty(coltype)) {
                col.title = $(th).attr("title");
                col.coltype = coltype;
                if("textbox" == coltype) {
                } else if("numberbox" == coltype) {
                    var precision = $(th).attr("precision");
                    if(precision) {
                        precision = parseInt(precision)
                    } else {
                        precision = 0;
                    }
                    col.formatter = function(value,row,index) {
                        if(value === null || value === "") {
                            return "";
                        }
                        if (precision != null) {
                            return Scdp.Utils.formatNumber(value, precision);
                        } else {
                            return value;
                        }
                    }
                } else if("datebox" == coltype) {
                    var format = $(th).attr("format");
                    if(!format) {
                        format = "YYYY-MM-DD";
                    }
                    col.formatter = function(value,row,index){
                        if(Scdp.ObjUtil.isNotEmpty(value)) {
                            var date = moment(value).toDate();
                            var localDate = date;
                            if (me.checkTimezoneforGrid(row, col)) {
                                localDate = Scdp.DateUtil.parseDateToLocal(date);
                            }
                            return moment(localDate).format(format)
                        } else {
                            return "";
                        }
                    }
                } else if("datetimebox" == coltype) {
                    var format = $(th).attr("format");
                    if(!format) {
                        format = "YYYY-MM-DD HH:mm:ss";
                    }
                    col.formatter = function(value,row,index){
                        if(Scdp.ObjUtil.isNotEmpty(value)) {
                            var date = moment(value).toDate();
                            var localDate = date;
                            if (me.checkTimezoneforGrid(row, col)) {
                                localDate = Scdp.DateUtil.parseDateToLocal(date);
                            }
                            return moment(localDate).format(format)
                        } else {
                            return "";
                        }
                    }
                } else if("checkbox" == coltype) {
                    col.formatter = function(value,row,index){
                        if(Scdp.ObjUtil.isNotEmpty(value) && value == 1) {
                            return "<input type='checkbox' checked readonly disabled/>"
                        } else {
                            return "<input type='checkbox' readonly disabled/>";
                        }
                    }
                } else if("combobox" == coltype) {
                } else if("actioncol" == coltype){
                    col.formatter = function(data, row, meta) {
                        var actionColItems = me.ele.datagrid("options").actionColItems;
                        var items = [];
                        $.each(actionColItems, function (i, actionColItem) {
                            if (actionColItem[col.field]){
                                items = actionColItem[col.field];
                                return false;
                            }
                        });
                        if (items.length > 0){
                            var html = "";
                            $.each(items, function (i, item) {
                                html += "<a itemId='" + item.itemId + "' href='javascript:void(0)'><i class='" + (item.iconCls||"fa fa-sun-o") + "'></i> <span> " + (item.text||"") + "</span></a>";
                            });
                            return html;
                        }
                        return data;
                    }
                }
            } else if(Scdp.ObjUtil.isNotEmpty(xtype)) {
                col.xtype = xtype;
                col.field = $(th).attr("field");
                if(col.field == 'ck' && col.checkbox) {
                    col.field = "";
                }
                col.title = $(th).text();
                var v = $(th).attr("visible");
                if("false" == v) {
                    col.hidden = true;
                }

                var w = $(th).attr("width");
                if(w) {
                    col.width = w;
                }

                if("bTnumCol" == xtype) {
                    var precision = $(th).attr("precision");
                    if(precision) {
                        precision = parseInt(precision)
                    } else {
                        precision = 0;
                    }
                    col.formatter = function(value,row,index) {
                        if(value === null || value === "") {
                            return "";
                        }
                        if (precision != null) {
                            return Scdp.Utils.formatNumber(value, precision);
                        } else {
                            return value;
                        }
                    }
                } else if("bTCheckCol" == xtype) {
                    col.formatter = function(value,row,index){
                        if(Scdp.ObjUtil.isNotEmpty(value) && value == 1) {
                            return "<input type='checkbox' checked readonly disabled/>"
                        } else {
                            return "<input type='checkbox' readonly disabled/>";
                        }
                    }
                } else if("bTdateCol" == xtype) {
                    var format = $(th).attr("format");
                    if(!format) {
                        format = "YYYY-MM-DD HH:mm:ss";
                    }
                    col.formatter = function(value,row,index){
                        if(Scdp.ObjUtil.isNotEmpty(value)) {
                            var date = moment(value).toDate();
                            var localDate = date;
                            if (me.checkTimezoneforGrid(row, col)) {
                                localDate = Scdp.DateUtil.parseDateToLocal(date);
                            }
                            return moment(localDate).format(format)
                        } else {
                            return "";
                        }
                    }
                } else if("bTActionCol" === xtype) {
                    col.formatter = function(data, type, row, meta) {
                        var actionColItems = me.ele.datagrid("options").actionColItems;
                        var items = [];
                        $.each(actionColItems, function (i, actionColItem) {
                            if (actionColItem[col.field]){
                                items = actionColItem[col.field];
                                return false;
                            }
                        });
                        if (items.length > 0){
                            var html = "";
                            $.each(items, function (i, item) {
                                html += "<a itemId='" + item.itemId + "' href='javascript:void(0)'><i class='" + (item.iconCls||"fa fa-sun-o") + "'></i> <span> " + (item.text||"") + "</span></a>";
                            });
                            return html;
                        }
                        return data;
                    }
                }
            }
            if(col.aggfun && col.field) {
                me.aggfuns[col.field] = col.aggfun;
            }
            if(col.styler) {
                var styler = col.styler;
                col.styler = function (value,row,index) {
                    if(me.controller[styler] && $.isFunction(me.controller[styler])) {
                        return me.controller[styler].apply(me.controller,[value,row,index]);
                    } else if($.isPlainObject(styler)) {
                        return styler;
                    }
                }
            }
            retColums.push(col);
        });
        cols.remove();
        //$(me.ele.attr("toolbar")).remove();

        return retColums;
    },
    checkTimezoneforGrid: function(row, col) {
        return col.needTz ||
            (
                (col.field == 'createTime' || col.field == 'updateTime') && //process create time and update time column
                ((typeof row.locTimezone != 'undefined' && row.locTimezone != Scdp.getSysConfig("server_tz")) ||
                    (//or data has not locTimezone column and using utc is true
                        !row.locTimezone && Scdp.getSysConfig("using_utc") === true
                    )
                )
            );
    },
    destroy: function() {
        this.editIndex = undefined;
        this.ele.datagrid("destroy");
    },
    gotRow: function(index) {
        var me = this;
        var dataGrid = $.data(me.ele[0], 'datagrid');
        var opts=dataGrid.options;
        return opts.finder.getRow(me.ele[0], index)
    },
    gotSelectedRows: function () {
       var me = this;
        return me.ele.datagrid("getSelections");
    },
    gotValue: function(dirtyOnly, editflag) {
        var me = this;
        if(editflag && editflag == "+") {
            var allRows = me.gotAllRows();
            if(allRows) {
                $.each(allRows, function(index, row) {
                    row.editflag = "+";
                })
            }
            return allRows;
        } else {
            var insertedRows = me.ele.datagrid('getChanges',"inserted");
            var deletedRows = me.ele.datagrid('getChanges',"deleted");
            var updatedRows = me.ele.datagrid('getChanges',"updated");
            $.each(insertedRows, function(index, row){
                row.editflag = "+";
            });
            $.each(deletedRows, function(index, row){
                row.editflag = "-";
            });
            $.each(updatedRows, function(index, row){
                row.editflag = "*";
            });
            var rows=[];
            rows=rows.concat(insertedRows);
            rows=rows.concat(deletedRows);
            rows=rows.concat(updatedRows);
            return rows;
        }
    },
    gotAllRows: function() {
        var me = this;
        var dataGrid = $.data(me.ele[0], 'datagrid');
        var opts=dataGrid.options;
        if(opts.clientPage) {
            return this.ele.datagrid("getAllRows");
        } else {
            return this.ele.datagrid("getRows");
        }
    },
    sotValue: function(value) {
        var me = this;
        if(value && ($.isArray(value) || value.rows)) {
            var rows = null;
            if(!$.isArray(value)) {
                rows = value.rows
            } else {
                rows = value;
            }
            var opts = $.data(this.ele[0], "datagrid").options;
            var columns = opts.columns;
            $.each(columns, function(i,colum) {
                $.each(colum, function(i,colopt) {
                    if("datebox" == colopt.coltype || "datetimebox" == colopt.coltype) {
                        $.each(rows, function(j,row) {
                            if(row[colopt.field] && typeof row[colopt.field] == 'string') {
                                row[colopt.field] = moment(row[colopt.field]).toDate();
                            }
                        })
                    }
                });
            });
            if(opts.pagination) {
                this.ele.datagrid('clientPaging');
            }

            this.ele.datagrid("loadData", value);
        } else {
            me.ele.datagrid("clear");
        }
    },
    sotFooter: function(rows) {
        var me = this;
        if(rows && $.isArray(rows) && rows.length>0) {
            me.ele.datagrid("reloadFooter", rows);
        }
    },
    sotSingleSelect: function(bol) {
        var me = this;
        var dataGrid = $.data(me.ele[0], 'datagrid');
        var opts=dataGrid.options;
        opts.singleSelect = bol;
    },
    sotDisable: function () {
        var me = this;
        var dataGrid=$.data(me.ele[0],"datagrid");
        var toolbar = $("div.datagrid-toolbar",dataGrid.panel);
        $("a", toolbar).each(function(i, btn) {
            $(btn).addClass("l-btn-disabled disabled");
            if($.data(btn, "linkbutton")) {
                $(btn).linkbutton("disable");
            }
        });
        me.ele.datagrid("options").onClickCell = function(){};
        dataGrid.panel.css("backgroundColor","#f5f5f5");
    },
    sotEnable: function() {
        var me = this;
        var dataGrid = $.data(me.ele[0], "datagrid");
        var toolbar = $("div.datagrid-toolbar", dataGrid.panel);
        $("a", toolbar).each(function (i, btn) {
            $(btn).removeClass("l-btn-disabled disabled");
            if($.data(btn, "linkbutton")) {
                $(btn).linkbutton("enable");
            }
        });
        dataGrid.panel.css("backgroundColor","");
    },
    isObjectEqual: function(rowOrg, rowDest) {
        var me = this;
        var equal = true;
        if((rowOrg == null && rowDest != null) || (rowOrg != null && rowDest == null)) {
            equal = false;
            return false;
        }
        $.each(rowOrg, function(key, value) {
            var destValue = rowDest[key];
            if((value == null || value == "" || value == undefined) && (destValue == null || destValue == "" || destValue == undefined)) {
                return;
            } else if(value instanceof Date && destValue instanceof Date) {
                if(Scdp.DateUtil.formatDate(value, Scdp.Const.LONG_DATE_FORMAT) == Scdp.DateUtil.formatDate(destValue, Scdp.Const.LONG_DATE_FORMAT)) {
                    return;
                } else {
                    equal = false;
                    return false;
                }
            } else if(typeof value =='object') {
                var sub = me.isObjectEqual(value, destValue);
                if(!sub) {
                    equal = false;
                    return false;
                }
            } else if(value !== destValue) {
                equal = false;
                return false;
            }
        });
        return equal;
    }
});

Scdp.define("e_editgrid", {
    extend: 'e_datagrid',
    e_type:'datagrid',
    append: null,
    remove: null,
    undo:null,
    ok:null,
    onDblClickCell: null,
    onClickCell:null,
    editIndex: undefined,
    _updateRow: null,
    refreshUndoStatus:null,
    timeOut:null,
    selectedIndex: -1,
    bindId: null,
    bindIndex: null,
    sysFormFlg: true,
    gridId:null,
    rowEditable: false,
    init: function () {
        var me = this;
        this.gridId = Scdp.StrUtil.getUUID();
        this.bindId = this.ele.attr("bindId");
        if(Scdp.ObjUtil.isEmpty(this.bindId)) {
            this.bindId = this.options.bindId;
        }
        function onClickCell(index, field,value){
            var coltype = me.ele.datagrid("getColumnOption",field).coltype;
            if("actioncol" == coltype) {
                return;
            }
            if (me.endEditing()){
                me.editIndex = index;
                if(me.rowEditable) {
                    me.ele.datagrid('selectRow', index).datagrid('beginEdit', index);
                }
                var dataGrid = $.data(me.ele[0], 'datagrid');
                var opts=dataGrid.options;
                var tr = opts.finder.getTr(me.ele[0],index);
                tr.css({color:"black", background:"#d0e9c6"});
                var t;
                var panel = me.ele.datagrid("getPanel");
                //tr.unbind('focusout').bind('focusout', function(e){
                //    t = setTimeout(function(){
                //        endEditing();
                //    }, 200);
                //});
                //$(document).on("click", function(event){
                //    var target = event.target;
                //    if($(target).parents(".combo-panel").length >0) {
                //        return
                //    }
                //    console.log("click");
                //    endEditing();
                //});
                //tr.unbind('focusin').bind('focusin', function(e){
                //    console.log("in");
                //    if(!tr.hasClass("datagrid-row-editing")) {
                //        console.log("in");
                //        me.ele.datagrid('beginEdit', index);
                //    }
                //});

                var ed = me.ele.datagrid('getEditor', {index:index,field:field});
                if (ed){
                    ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
                }
                me._updateRow = $.extend({},opts.finder.getRow(me.ele[0], index));
                setEditing(me.editIndex);
                refreshUndoStatus();
            } else {
                setTimeout(function(){
                    me.ele.datagrid('selectRow', me.editIndex);
                },0);
            }
        }
        function setEditing(rowIndex){
            var cols = me.options.columns[0];
            var existCalculate = false;
            var calFields = [];
            var calMethodsObj = [];
            for(var i=0; i<cols.length; i++) {
                var col = cols[i];
                if(col.calculate) {
                    var calObj = {};
                    calFields.push(col.field);
                    calObj.field = col.field;
                    calObj.calculate = col.calculate;
                    calMethodsObj.push(calObj);
                    existCalculate = true;
                }
            }
            if(existCalculate) {
                var editors = me.ele.datagrid('getEditors', rowIndex);
                $.each(editors, function (i, editor) {
                    var field = editor.field;
                    var type = editor.type;
                    var target = editor.target;
                    var comps = target.data();
                    if(comps && $.inArray(field, calFields) == -1){
                        $.each(comps, function (key, obj) {
                            obj.options.onChange = calculate;
                        });
                    }
                });

                function calculate(){
                    var dataGrid = $.data(me.ele[0], 'datagrid');
                    var opts=dataGrid.options;
                    var rowStatic = opts.finder.getRow(me.ele[0], me.editIndex);
                    var rowEditor = {};
                    $.each(editors, function (i, editor) {
                        var field = editor.field;
                        var value = editor.actions.getValue(editor.target);
                        rowEditor[field] = value;
                    });
                    var row = $.extend({}, rowStatic, rowEditor);
                    $.each(calMethodsObj, function (i, calMethod) {
                        var retValue = me.controller[calMethod.calculate](row);
                        var editor = getEditor(calMethod.field);
                        editor.actions.setValue(editor.target, retValue);
                    });
                }
                function getEditor(field) {
                    var editors = me.ele.datagrid('getEditors', rowIndex);
                    var retEditor = null;
                    $.each(editors, function (i, editor) {
                        var f = editor.field;
                        if(f === field) {
                            retEditor = editor;
                        }
                    });
                    return retEditor;
                }
            }
        }
        me.onClickCell = onClickCell;
        function onEndEdit(index, row){
            var dataGrid = $.data(me.ele[0], 'datagrid');
            var opts=dataGrid.options;
            if (me.ele.datagrid('validateRow', index)){
                var tr = opts.finder.getTr(me.ele[0],index);
                tr.css({color:"", background:""});
                return true;
            } else {
                return false;
            }
            refreshUndoStatus();
        }
        function refreshUndoStatus () {
            var dataGrid=$.data(me.ele[0],"datagrid");
            var toolbar = $("div.datagrid-toolbar",dataGrid.panel);
            var changes = me.gotChange();
            var undoBtn = $("a", toolbar).filter("#"+me.gridId + "undoBtn");
            if(undoBtn.length > 0) {
                if(changes && changes.length >0) {
                    undoBtn.removeClass("l-btn-disabled disabled");
                    if($.data(undoBtn[0], "linkbutton")) {
                        undoBtn.linkbutton("enable");
                    }
                } else {
                    undoBtn.addClass("l-btn-disabled disabled");
                    if($.data(undoBtn[0], "linkbutton")) {
                        undoBtn.linkbutton("disable");
                    }
                }
            }
        }
        this.refreshUndoStatus = refreshUndoStatus;
        function append(){
            if (me.endEditing()){
                var row = me.ele.triggerHandler("beforeappendrow");
                me.ele.datagrid('appendRow',row || {});
                me.editIndex = me.ele.datagrid('getRows').length-1;
                me.ele.datagrid('selectRow', me.editIndex).datagrid('beginEdit', me.editIndex);
                var dataGrid = $.data(me.ele[0], 'datagrid');
                var opts=dataGrid.options;
                var tr = opts.finder.getTr(me.ele[0],me.editIndex);
                var t;
                //tr.unbind('focusout').bind('focusout', function(){
                //    t = setTimeout(function(){
                //        endEditing();
                //    }, 200);
                //});
                //tr.unbind('focusin').bind('focusin', function(){
                //    if(t) {
                //        clearTimeout(t);
                //    }
                //});
                setEditing(me.editIndex);
                tr.css({color:"black", background:"#d0e9c6"});
                me.ele.trigger("appendrow", [me.editIndex]);
            }
            me.synRefreshBind();
            refreshUndoStatus();
        }
        me.append = append;
        function remove(){
            var selectedRows = me.ele.datagrid('getSelections');
            var rowIndexs =[];
            for (var i=0; i<selectedRows.length; i++) {
                var index = me.ele.datagrid('getRowIndex', selectedRows[i]);
                //if(index !=-1) {
                //    me.ele.datagrid('cancelEdit', index)
                //        .datagrid('deleteRow', index);
                //}
                rowIndexs.push(index);
            }
            var ret = me.ele.triggerHandler("removerow", [rowIndexs]);
            if(!ret) {
                $.each(rowIndexs, function(i,index) {
                    if(index !=-1) {
                        me.ele.datagrid('cancelEdit', index)
                            .datagrid('deleteRow', index);
                    }
                });
            }

            me.synRefreshBind();
            me.selectedIndex = -1;
            refreshUndoStatus();
        }
        me.remove = remove;
        function accept(){
            if (me.endEditing()){
                me.ele.datagrid('acceptChanges');
            }
        }
        function undo(){
            me.ele.datagrid('rejectChanges');
            me.ele.trigger("undorow", me.editIndex);
            me.editIndex = undefined;
            me.synRefreshBind();
            refreshUndoStatus();
        }
        me.undo = undo;
        function onSelect(index,row) {
            me.selectedIndex = index;
            me.synBindSubGridEndEditing();
            me.synRefreshBind();
            me.ele.trigger("select", [index, row]);
        }
        function onBeforeSelect(index, row) {
            me.synBindFormSelf(me.selectedIndex);
        }
        function onUnselect(index,row) {
            //me.synRefreshBind();
            me.ele.trigger("unselect", [index, row]);
        }
        function ok() {
            me.synBindFormSelf();
            me.endEditing();
            me.ele.trigger("confirmrow");
            refreshUndoStatus();
        }
        me.ok = ok;
        if(me.hasBindForm()) {
            me.append = function() {
                me.synBindFormSelf();
                me.ele.datagrid('appendRow',{});
                var index = me.ele.datagrid('getRows').length-1;
                me.ele.datagrid('selectRow', index);
                me.ele.trigger("appendrow", [index]);
            };
            me.onClickCell = function() {
                me.synBindFormSelf();
            }
        }
        var addIcon = this.ele.attr("addIcon");
        if(!addIcon) {
            addIcon = "fa fa-plus";
        }
        var rmvIcon = this.ele.attr("rmvIcon");
        if(!rmvIcon) {
            rmvIcon = "fa fa-remove";
        }
        var undIcon = this.ele.attr("undIcon");
        if(!undIcon) {
            undIcon = "fa fa-reply";
        }
        var okIcon = this.ele.attr("okIcon");
        if(!okIcon) {
            okIcon = "fa fa-check";
        }

        var defaultOptions = {
            toolbar: [{
                id: me.gridId + 'addBtn',
                iconCls: addIcon,
                text:'添加',
                handler: me.append
            },{
                id: me.gridId + 'removeBtn',
                iconCls: rmvIcon,
                text:'删除',
                handler: me.remove
            },{
                id: me.gridId + 'undoBtn',
                iconCls: undIcon,
                text:'撤销',
                disabled:true,
                handler: me.undo
            }],
            onClickCell: me.onClickCell,
            onEndEdit: onEndEdit,
            onSelect: onSelect,
            onUnselect:onUnselect,
            onBeforeSelect: onBeforeSelect
        };
        if(!me.hasBindForm()) {
            //defaultOptions.toolbar.push('-');
            defaultOptions.toolbar.push({
                id: me.gridId + 'okBtn',
                iconCls: okIcon,
                text:'确认',
                handler: me.ok
            });
        }
        var editable = me.ele.attr("editable");
        defaultOptions.editable = editable;
        if("false" == editable) {
            defaultOptions.toolbar = null;
            defaultOptions.onClickCell = function() {};
        }
        var hidebtn = me.ele.attr("hidebtn");
        var hideeditbtn = me.ele.attr("hideeditbtn");
        defaultOptions.hidebtn = hidebtn;
        defaultOptions.hideeditbtn = hideeditbtn;

        var toolbarAppend= me.ele.attr("toolbar");
        defaultOptions.columns = [me.paseColumns()];
        this.options = $.extend(this.options,defaultOptions);
        me.ele.datagrid(this.options);
        var panel = me.ele.datagrid("getPanel");
        toolbarAppend = this._changeToolBarSelector(toolbarAppend);

        if($(".datagrid-toolbar", panel).length == 0) {
            if(toolbarAppend) {
                $(toolbarAppend).addClass("datagrid-toolbar").prependTo(panel);
            }
        } else if(toolbarAppend){
            if($(".datagrid-toolbar", panel).children("table").length > 0) {
                var tb = $(".datagrid-toolbar", panel).children("table");
                var tr = tb.find("tr");
                $(toolbarAppend).children().each(function(i, btn) {
                    var td = $("<td></td>").appendTo(tr);
                    $(btn).appendTo(td);
                })
            } else {
                $(toolbarAppend).children().each(function(i, btn) {
                    $(btn).appendTo($(".datagrid-toolbar", panel));
                })
            }
            $(toolbarAppend).remove();
        }
        if(me.options.hidebtn == "true") {
            me.hideBtn();
        }
        if(me.options.hideeditbtn == "true") {
            me.hideEditBtn();
        }
        me.listenBindForm();
        me._bind(defaultOptions.columns);
    },
    endEditing: function (){
        var me = this;
        if (me.editIndex == undefined){return true}
        if (me.ele.datagrid('validateRow', me.editIndex) && me.synBindSubGridEndEditing()){
            me.ele.datagrid('endEdit', me.editIndex);
            me.editIndex = undefined;
            return true;
        } else {
            return false;
        }
    },
    listenBindForm: function() {
        var me = this;
        var bindForm = $("[bindId='" + this.itemId + ".bind']", this.context);
        if(bindForm.length>0) {
            $.each(bindForm, function(i,form)  {
                var xtype = $(form).attr("xtype");
                if("bForm" == xtype) {
                    $(form).bind("change blur formchange focusout", function(){
                        if(me.sysFormFlg) {
                            me.synBindForm();
                        }
                    });
                }
            });
        }
    },
    hideBtn: function() {
        var me = this;
        var panel = me.ele.datagrid("getPanel");
        if($(".datagrid-toolbar", panel).length !== 0) {
            $(".datagrid-toolbar", panel).addClass("hidden");
        }
    },
    showBtn: function() {
        var me = this;
        var panel = me.ele.datagrid("getPanel");
        if($(".datagrid-toolbar", panel).length !== 0) {
            $(".datagrid-toolbar", panel).removeClass("hidden");
        }
    },
    hideEditBtn: function() {
        var me = this;
        var addBtnSel = "#"+me.gridId + 'addBtn';
        var rmvBtnSel = "#"+me.gridId + 'removeBtn';
        var undBtnSel = "#"+me.gridId + 'undoBtn';
        var okBtnSel = "#"+me.gridId + 'okBtn';

        var panel = me.ele.datagrid("getPanel");
        if($(".datagrid-toolbar", panel).length !== 0) {
            var toolbar = $(".datagrid-toolbar", panel);
            var tds = $('td', toolbar);
            for(var i=0; i<tds.length; i++) {
                var td = tds[i];
                $(td).filter(addBtnSel + "," + rmvBtnSel+"," + undBtnSel + "," + okBtnSel).addClass("hidden");
                if($(td).filter(addBtnSel + "," + rmvBtnSel+"," + undBtnSel + "," + okBtnSel).length>0) {
                    if((i+1)<tds.length) {
                        $(tds[i+1]).has(".datagrid-btn-separator").addClass("hidden");
                    }
                }
            }
        }
    },
    showEditBtn: function() {
        var me = this;
        var addBtnSel = "#"+me.gridId + 'addBtn';
        var rmvBtnSel = "#"+me.gridId + 'removeBtn';
        var undBtnSel = "#"+me.gridId + 'undoBtn';
        var okBtnSel = "#"+me.gridId + 'okBtn';
        var panel = me.ele.datagrid("getPanel");
        if($(".datagrid-toolbar", panel).length !== 0) {
            var toolbar = $(".datagrid-toolbar", panel);
            var tds = $('td', toolbar);
            for(var i=0; i<tds.length; i++) {
                var td = tds[i];
                $(td).filter(addBtnSel + "," + rmvBtnSel+"," + undBtnSel + "," + okBtnSel).removeClass("hidden");
                if($(td).filter(addBtnSel + "," + rmvBtnSel+"," + undBtnSel + "," + okBtnSel).length>0) {
                    if((i+1)<tds.length) {
                        $(tds[i+1]).has(".datagrid-btn-separator").removeClass("hidden");
                    }
                }
            }
        }
    },

    paseColumns: function() {
        var me = this;
        var cols = $('th', me.ele);
        var retColums = [];
        $.each(cols, function(i, th) {
            var col = {};
            var option = $.parser.parseOptions(th);
            col = $.extend(col, option);
            col.title = $(th).attr("title");
            var type = $(th).attr("coltype");
            col.coltype = type;
            if(Scdp.ObjUtil.isNotEmpty(col.coltype)) {
                col = $.extend(true,{},Scdp.DefaultOptions[col.coltype], col);
            }
            if(!col.align) {
                col.align = "center";
            }
            //if(col.sortable == null) {
            //    col.sortable = true;
            //}
            var ctrlOnchange = col.onChange;
            col.onChange = function (nv, ov, combRec) {
                var row = $(this).parentsUntil(".datagrid-row").parent();
                if(me.controller[ctrlOnchange]) {
                    me.controller[ctrlOnchange].apply(me.controller, [nv, ov, row, combRec]);
                }
            };

            var s = $(th).attr("orderable");
            if("false" == s) {
                col.sortable = false;
            }
            if(Scdp.ObjUtil.isNotEmpty($(th).attr("editable"))) {
                col.editable = $(th).attr("editable");
            }
            if("false" == col.editable || false === col.editable) {
                // col.editor = null;
                col.editable = false;
                col.disabled = true;
            }
            if("textbox" == type) {
                var editorOptions = $.extend({}, col);
                col.editor = {
                    type:'textbox',
                    options:editorOptions
                };
                col.editor = $.extend(true, col.editor, option.editor);
            } else if("numberbox" == type) {
                var editorOptions = $.extend({}, col,{
                    decimalSeparator:'.',
                    groupSeparator:','
                });
                col.editor = {
                    type:'numberbox',
                    options:editorOptions
                };
                col.editor = $.extend(true, col.editor, option.editor);
            } else if("datebox" == type) {
                var editorOptions = $.extend({}, col);
                col.editor = {
                    type:'datebox',
                    options:editorOptions
                };
                col.editor = $.extend(true, col.editor, option.editor);

                var format = $(th).attr("format");
                if(!format) {
                    format = "YYYY-MM-DD";
                }
                col.formatter = function(value,row,index){
                    if(Scdp.ObjUtil.isNotEmpty(value)) {
                        var date = moment(value).toDate();
                        var localDate = date;
                        if (me.checkTimezoneforGrid(row, col)) {
                            localDate = Scdp.DateUtil.parseDateToLocal(date);
                        }
                        return moment(localDate).format(format)
                    } else {
                        return "";
                    }
                }
            } else if("datetimebox" == type) {
                var editorOptions = $.extend({}, col);
                col.editor = {
                    type:'datetimebox',
                    options:editorOptions
                };
                col.editor = $.extend(true, col.editor, option.editor);
                var format = $(th).attr("format");
                if(!format) {
                    format = "YYYY-MM-DD HH:mm:ss";
                }
                col.formatter = function(value,row,index){
                    if(Scdp.ObjUtil.isNotEmpty(value)) {
                        var date = moment(value).toDate();
                        var localDate = date;
                        if (me.checkTimezoneforGrid(row, col)) {
                            localDate = Scdp.DateUtil.parseDateToLocal(date);
                        }
                        return moment(localDate).format(format)
                    } else {
                        return "";
                    }
                }
            } else if("checkbox" == type) {
                var editorOptions = $.extend({}, col);
                col.editor = {
                    type:'checkbox',
                    options: $.extend(editorOptions,{on: 1,off:0})
                };
                col.editor = $.extend(true, col.editor, option.editor);
                col.formatter = function(value,row,index){
                    if(Scdp.ObjUtil.isNotEmpty(value) && value && value !== '0') {
                        return "<input type='checkbox' checked readonly disabled/>"
                    } else {
                        return "<input type='checkbox' readonly disabled/>";
                    }
                }
            } else if("combobox" == type) {
                col.combType = $(th).attr("combType");
                col.codeType = $(th).attr("codeType");
                col.cascadeField = $(th).attr("cascadeField");
                col.filterFields = $(th).attr("filterFields");
                col.target = $(th).attr("target");
                var editorOptions = $.extend({}, col,{
                    editgrid:me.ele,
                    menuCode:me.menuCode
                });
                col.editor = {
                    type:'combcol',
                    options: editorOptions
                };
                col.editor = $.extend(true, col.editor, option.editor);
                col.formatter = function(value,row,index){
                    var comboStore = reloadCombo(col, row);
                    if(comboStore) {
                        var valueField = Scdp.StrUtil.replaceNull(col.valueField, "code");
                        var textField = Scdp.StrUtil.replaceNull(col.textField, "codedesc");
                        var separator = Scdp.StrUtil.replaceNull(col.separator, "|");
                        var valueSeparator = Scdp.StrUtil.replaceNull(col.valueSeparator, "|");
                        if(col.multiple && Scdp.ObjUtil.isNotEmpty(value)) {
                            var values = Scdp.StrUtil.split(value,valueSeparator);
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
                                return  showDesc.join(separator);
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
                };

                function reloadCombo (col, record) {
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
                }
            } else if("combtree" == type) {
                col.combType = $(th).attr("combType");
                col.cascadeField = $(th).attr("cascadeField");
                col.filterFields = $(th).attr("filterFields");
                col.target = $(th).attr("target");
                var editorOptions = $.extend({}, col,{
                    editgrid:me.ele,
                    menuCode:me.menuCode
                });
                col.editor = {
                    type: type,
                    options: editorOptions
                };
                col.editor = $.extend(true, col.editor, option.editor);
                col.formatter = function(value,row,index){
                    var comboStore = reloadCombotree(col, row);
                    if(comboStore) {
                        var valueField = Scdp.StrUtil.replaceNull(col.valueField, "id");
                        var textField = Scdp.StrUtil.replaceNull(col.textField, "text");
                        var separator = Scdp.StrUtil.replaceNull(col.separator, "|");
                        var valueSeparator = Scdp.StrUtil.replaceNull(col.valueSeparator, "|");
                        if(col.multiple && Scdp.ObjUtil.isNotEmpty(value)) {
                            var values = Scdp.StrUtil.split(value,valueSeparator);
                            values = Scdp.ArrayUtil.removeEmpty(values);
                            var showDesc = [];
                            $.each(values, function(i,v) {
                                var record = Scdp.TreeUtil.findRecord(comboStore, valueField, v);
                                if(record) {
                                    showDesc.push(record[textField]);
                                } else {
                                    showDesc.push(v);
                                }
                            });
                            if(showDesc.length > 0) {
                                return  showDesc.join(separator);
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
                };

                function reloadCombotree (col, record) {
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
                }

            } else if("searchbox" == type){
                col.itemId = $(th).attr("itemId");
                col.target = $(th).attr("target");

                var editorOptions = $.extend({}, col,{
                    itemId:col.itemId,
                    valueField: col.valueField,
                    textField: col.textField,
                    editgrid:me.ele,
                    linkhref:col.linkhref,
                    actionParams: col.actionParams,
                    style:col.style,
                    target: col.target,
                    resultGridId: col.resultGridId,
                    winTitle:col.winTitle,
                    field: col.field
                });
                col.editor = {
                    type: type,
                    options: editorOptions
                };
                col.editor = $.extend(true, col.editor, option.editor);
            } else if ("actioncol" == type){
                col.formatter = function(data, row, meta) {
                    var actionColItems = me.ele.datagrid("options").actionColItems;
                    var items = [];
                    $.each(actionColItems, function (i, actionColItem) {
                        if (actionColItem[col.field]){
                            items = actionColItem[col.field];
                            return false;
                        }
                    });
                    if (items.length > 0){
                        var html = "";
                        $.each(items, function (i, item) {
                            if(item.showValue) {
                                html += "<a itemId='" + item.itemId + "' href='javascript:void(0)'> <span> " + data + "</span></a>";
                            } else {
                                html += "<a itemId='" + item.itemId + "' href='javascript:void(0)'><i class='" + (item.iconCls||"fa fa-sun-o") + "'></i> <span> " + (item.text||"") + "</span></a>";
                            }
                        });
                        return html;
                    }
                    return data;
                }
            }
            if(Scdp.ObjUtil.isNotEmpty($(th).attr("editable"))) {
                col.editable = $(th).attr("editable");
            }

            if(col.field != 'ck' && col.hidden != true && "false" != col.editable && false !== col.editable) {
                me.rowEditable = true;
            }
            retColums.push(col);
        });
        cols.remove();

        return retColums;
    },
    hasBindForm: function () {
        var bindForm = $("[bindId='" + this.itemId + ".bind'][xtype='bForm']", this.context);
        if(bindForm && bindForm.length>0) {
            return true;
        } else {
            return false;
        }
    },
    gotRow: function(index) {
        var me = this;
        //me.endEditing();
        var dataGrid = $.data(me.ele[0], 'datagrid');
        var opts=dataGrid.options;
        return opts.finder.getRow(me.ele[0], index)
    },
    updateRow: function(index, row) {
        var me = this;
        me.endEditing();
        var updateRow = $.extend({}, row);
        updateRow.editflag = '*';
        updateRow._updateVersion = Scdp.StrUtil.getUUID();
        me.ele.datagrid("updateRow", {index: index, row:updateRow});
    },
    gotSelectedRows: function () {
        var me = this;
        me.endEditing();
        return me.ele.datagrid("getSelections");
    },
    gotAllRows: function() {
        var me = this;
        me.endEditing();
        var dataGrid = $.data(me.ele[0], 'datagrid');
        var opts=dataGrid.options;
        if(opts.clientPage) {
            return this.ele.datagrid("getAllRows");
        } else {
            return this.ele.datagrid("getRows");
        }
    },
    gotValue: function(dirtyOnly, editflag) {
        var me = this;
        if (me.editIndex != undefined){
            me.ele.datagrid('endEdit',me.editIndex);
        }
        me.synBindFormSelf();
        me.synBindSubGrid();
        if(editflag && editflag == "+") {
            var allRows = me.gotAllRows();
            if(allRows) {
                $.each(allRows, function(index, row) {
                    row.editflag = "+";
                })
            }
            return allRows;
        } else {
            var insertedRows = me.ele.datagrid('getChanges',"inserted");
            var deletedRows = me.ele.datagrid('getChanges',"deleted");
            var updatedRows = me.ele.datagrid('getChanges',"updated");
            var orgRows = $.data(me.ele[0], "datagrid").originalRows;
            var ind = [];
            var tempUpdateRows = $.grep(updatedRows, function (row,i) {
                var hasEqual = false;
                $.each(orgRows, function (j, destRow) {
                    if (me.isObjectEqual(row, destRow)) {
                        hasEqual = true;
                        return false;
                    }
                });
                if(hasEqual) {
                    return false;
                } else {
                    return true;
                }
            });

            $.each(insertedRows, function(index, row){
                row.editflag = "+";
            });
            $.each(deletedRows, function(index, row){
                row.editflag = "-";
            });
            $.each(tempUpdateRows, function(index, row){
                row.editflag = "*";
            });
            var rows=[];
            rows=rows.concat(insertedRows);
            rows=rows.concat(deletedRows);
            rows=rows.concat(tempUpdateRows);
            if(me.bindId) {
                return me.gotAllRows();
            } else {
                return rows;
            }
        }
    },
    gotChange: function() {
        var me = this;
        var insertedRows = me.ele.datagrid('getChanges',"inserted");
        var deletedRows = me.ele.datagrid('getChanges',"deleted");
        var updatedRows = me.ele.datagrid('getChanges',"updated");
        var orgRows = $.data(me.ele[0], "datagrid").originalRows;
        var ind = [];
        var tempUpdateRows = $.grep(updatedRows, function (row,i) {
            var hasEqual = false;
            $.each(orgRows, function (j, destRow) {
                if (me.isObjectEqual(row, destRow)) {
                    hasEqual = true;
                    return false;
                }
            });
            if(hasEqual) {
                return false;
            } else {
                return true;
            }
        });

        var rows=[];
        rows=rows.concat(insertedRows);
        rows=rows.concat(deletedRows);
        rows=rows.concat(tempUpdateRows);
        return rows;
    },
    sotValue: function(value, bindIndex) {
        var me = this;
        me.bindIndex = bindIndex;
        me.editIndex = undefined;
        if(value && ($.isArray(value) || value.rows)) {
            var opts = $.data(this.ele[0], "datagrid").options;
            var columns = opts.columns;
            var rows = null;
            if(!$.isArray(value)) {
                rows = value.rows
            } else {
                rows = value;
            }
            $.each(columns, function(i,colum) {
                $.each(colum, function(i,colopt) {
                    if("datebox" == colopt.coltype || "datetimebox" == colopt.coltype) {
                        $.each(rows, function(j,row) {
                            if(row[colopt.field] && typeof row[colopt.field] == 'string') {
                                row[colopt.field] = moment(row[colopt.field]).toDate();
                            }
                        })
                    }
                });
            });
            if(opts.pagination) {
                this.ele.datagrid('clientPaging');
            }

            this.ele.datagrid("loadData", value);
        } else {
            me.ele.datagrid("clear");
        }
        me.synRefreshBind();
    },
    synRefreshBind: function() {
        var me = this;
        var bindObjs = $("[bindId='" + me.itemId + ".bind']", me.context);
        if(bindObjs.length>0) {
            $.each(bindObjs, function(i, bindObj) {
                var itemId = $(bindObj).attr("itemId");
                var record = me.ele.datagrid('getSelected');
                if(!record) {
                    record = me.gotRow(0);
                }
                var xtype = $(bindObj).attr("xtype");
                me.sysFormFlg = false;
                if(record) {
                    var index = me.ele.datagrid("getRowIndex", record);
                    if("e_editgrid" == xtype) {
                        if(record[itemId] == null) {
                            record[itemId] = [];
                        }
                        $(bindObj).e_editgrid("sotValue", record[itemId], index);
                    } else if("bForm" == xtype) {
                        $(bindObj).sotValue(record);
                    }
                } else {
                    if("e_editgrid" == xtype) {
                        $(bindObj).e_editgrid("sotValue", null, null);
                    } else if("bForm" == xtype) {
                        $(bindObj).sotValue(null);
                    }
                }
                me.sysFormFlg = true;
            });
        }
    },
    synBindForm: function() {
        var me = this;
        if(me.editIndex != undefined) {
        } else if(me.hasBindForm()) {
            var bindForm, selrow,rowIndex;
            bindForm = $("[bindId='" + me.itemId + ".bind']", me.context);
            selrow = me.ele.datagrid("getSelected");
            if(selrow) {
                rowIndex = me.ele.datagrid("getRowIndex", selrow);
            }

            if(rowIndex != null && rowIndex != -1) {
                clearTimeout(me.timeOut);
                me.timeOut = setTimeout(function() {
                    var formValue = bindForm.gotValue();
                    me.ele.datagrid('updateRow',{
                        index: rowIndex,
                        row: formValue
                    });
                    me.refreshUndoStatus();
                    me.ele.datagrid('selectRow', rowIndex);
                },100);
            }
        }
    },
    synBindFormSelf: function(index) {
        var me = this;
        if(me.editIndex != undefined) {
        } else if(me.hasBindForm()) {
            var bindForm, selrow,rowIndex;
            bindForm = $("[bindId='" + me.itemId + ".bind']", me.context);
            selrow = me.ele.datagrid("getSelected");
            if(selrow) {
                rowIndex = me.ele.datagrid("getRowIndex", selrow);
            }
            if(rowIndex == null || rowIndex == -1) {
                rowIndex = index;
            }
            if(rowIndex != null && rowIndex != -1) {
                var formValue = bindForm.gotValue();
                me.ele.datagrid('updateRow',{
                    index: rowIndex,
                    row: formValue
                });
                me.refreshUndoStatus();
                if(index == null || index == -1) {
                    me.ele.datagrid('selectRow', rowIndex);
                }
            }
        }
    },
    getBindIndex: function() {
        return this.bindIndex;
    },
    synBindSubGrid: function() {
        var me = this;
        var bindObjs = $("[bindId='" + me.itemId + ".bind']", me.context);
        if(bindObjs.length>0) {
            $.each(bindObjs, function(i, bindObj) {
                var itemId = $(bindObj).attr("itemId");
                var xtype = $(bindObj).attr("xtype");
                if("e_editgrid" == xtype) {
                    var index = $(bindObj)[xtype]("getBindIndex");
                    if(index != null) {
                        var value = $(bindObj).gotValue();
                        var record = me.gotRow(index);
                        record[itemId] = value;
                        var copyRecord = $.extend(true, {}, record);
                        copyRecord.editflag = "*";
                        me.ele.datagrid('updateRow',{
                            index: index,
                            row: copyRecord
                        });
                    }
                }
            });
        }
    },
    synBindSubGridEndEditing: function() {
        var me = this;
        var ret = true;
        var bindObjs = $("[bindId='" + me.itemId + ".bind']", me.context);
        if(bindObjs.length>0) {
            $.each(bindObjs, function(i, bindObj) {
                var itemId = $(bindObj).attr("itemId");
                var xtype = $(bindObj).attr("xtype");
                if("e_editgrid" == xtype) {
                    var index = $(bindObj)[xtype]("getBindIndex");
                    if(index != null) {
                        var value = $(bindObj).e_editgrid("endEditing");
                        if(value == false) {
                            ret = false;
                        }
                    }
                }
            });
        }
        return ret;
    },
    sotDisable: function () {
        var me = this;
        var dataGrid=$.data(me.ele[0],"datagrid");
        var toolbar = $("div.datagrid-toolbar",dataGrid.panel);
        $("a", toolbar).each(function(i, btn) {
            $(btn).addClass("l-btn-disabled disabled");
            if($.data(btn, "linkbutton")) {
                $(btn).linkbutton("disable");
            }
        });
        me.ele.datagrid("options").onClickCell = function(){};
        dataGrid.panel.css("backgroundColor","#f5f5f5");
    },
    sotEnable: function() {
        var me = this;
        var dataGrid = $.data(me.ele[0], "datagrid");
        var toolbar = $("div.datagrid-toolbar", dataGrid.panel);
        $("a", toolbar).each(function (i, btn) {
            $(btn).removeClass("l-btn-disabled disabled");
            if($.data(btn, "linkbutton")) {
                $(btn).linkbutton("enable");
            }
        });
        if(me.options.editable !== 'false') {
            me.ele.datagrid("options").onClickCell = me.onClickCell;
        }
        me.refreshUndoStatus();
        dataGrid.panel.css("backgroundColor","");
    }
});

Scdp.define("edit_comb", {
    ele:null,
    editgrid: null,
    editIndex: null,
    init: function (ele, options) {

        this.editgrid = options.editgrid;

        this.editIndex = $(this.editgrid).data("e_editgrid").editIndex;
        var me = this;
        if(!options.combType) {
            options.combType="scdp_fmcode"
        }
        if(options.arrayValue == null) {
            options.arrayValue = false;
        }
        if(options.separator == null) {
            options.separator = "|";
        }

        //options.mode = 'remote';
        if(!options.valueField) {
            options.valueField = 'code';
        }
        if(!options.textField) {
            options.textField = 'codedesc';
        }

        options.loader = function(param,success,error) {
            me.reload(options).done(function(ret) {
                if(ret) {
                    success(ret);
                }
            });
        };
        //options.formatter = function(row){
        //    var opts = $(this).combobox('options');
        //    return "("+row[opts.valueField]+") "+row[opts.textField];
        //};
        var orgOnchange = options.onChange;
        options.onChange = function(newValue,oldValue) {
            me.cascadeLoad(options);
            me.refreshTarget(me, options, me.ele);
            var combRec = me.gotRecord(this);
            orgOnchange.call(this, newValue, oldValue, combRec);
        };
        options.onShowPanel = function() {
            me.ele.combobox("reload");
        };
        me.ele = $("<input type=\"text\" class=\"datagrid-editable-input\" style='width:100%;'>").appendTo(ele);
        return me.ele.combobox(options);
    },
    destroy: function(target) {
        $(target).combobox("destroy");
    },
    gotRecord:function(target) {
        var me = $(target);
        var values = $(target).combobox("getValues");
        var records = [];
        if(values && values.length >0) {
            $.each(values, function(i, value) {
                records.push(me.combobox("options").finder.getRow(me[0], value));
            });
        }
        return records
    },
    getValue: function(target) {
        var opts = $(target).combobox("options");
        if(opts.multiple) {
            if(opts.arrayValue) {
                return $(target).combobox("getValues");
            } else {
                var values = $(target).combobox("getValues");
                var value = null;
                if($.isArray(values)) {
                    value = values.join(opts.valueSeparator);
                } else {
                    value = values;
                }
                if(Scdp.ObjUtil.isNotEmpty(value)) {
                    return opts.valueSeparator + value + opts.valueSeparator;
                } else {
                    return null;
                }
            }
        } else {
            return $(target).combobox("getValue");
        }
    },
    setValue: function(target, value) {
        var opts = $(target).combobox("options");
        if(Scdp.ObjUtil.isEmpty(value)) {
            $(target).combobox("clear");
            return;
        }
        if(opts.multiple) {
            if($.isArray(value)) {
                $(target).combobox("setValues", value);
            } else {
                var values = Scdp.StrUtil.split(value,opts.valueSeparator);
                $(target).combobox("setValues", Scdp.ArrayUtil.removeEmpty(values));
            }
        } else {
            $(target).combobox("setValue", value);
            this.cascadeLoad(opts);
            this.refreshTarget(this, opts, target);
        }
    },
    resize: function(target, width){
        $(target)._outerWidth(width);
    },

    reload: function (options) {
        var me = this;
        var dtd = $.Deferred();
        var filterMap = {};
        var record = $(options.editgrid).data("e_editgrid").gotRow(me.editIndex);
        if (Scdp.ObjUtil.isNotEmpty(options.filterFields) && record != null) {
            var filter = Scdp.StrUtil.split(options.filterFields,",");
            $.each(filter, function (i,item) {
                if(item.indexOf(":") != -1) {
                    var itemMapping = Scdp.StrUtil.split(item,":");
                    filterMap[itemMapping[0]] = itemMapping[1];
                } else {
                    var itemMapping = Scdp.StrUtil.split(item,"|");
                    var value = null;
                    var editor = options.editgrid.datagrid('getEditor', {index:me.editIndex,field:itemMapping[0]});
                    if(editor) {
                        value = editor.actions.getValue(editor.target);
                    } else {
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
        var listData = Scdp.getComboStoreDate(options.combType, options.codeType, options.menuCode, filterMap, options.needCache);
        if(listData && listData.length>0) {
            dtd.resolve(listData);
        } else {
            dtd.resolve([]);
        }
        return dtd.promise();
    },
    cascadeLoad: function (options) {
        var me = this;
        if (Scdp.ObjUtil.isNotEmpty(options.cascadeField)) {
            var cascadeFieldArr = Scdp.StrUtil.split(options.cascadeField,",");
            for (var i = 0; i < cascadeFieldArr.length; i++) {
                var cascadeObj = null;
                cascadeObj = me.editgrid.datagrid('getEditor', {index:me.editIndex,field:cascadeFieldArr[i]});
                if (Scdp.ObjUtil.isNotEmpty(cascadeObj)) {
                    cascadeObj.actions.setValue(cascadeObj.target, null);
                }
            }
        }
    },
    refreshTarget: function (obj, options, ele) {
        var me = obj;
        if (Scdp.ObjUtil.isNotEmpty(options.target)) {
            var targetFields = Scdp.StrUtil.split(options.target,",");
            var rowEditors = me.editgrid.datagrid("getEditors", me.editIndex);
            $.each(targetFields, function (i, item) {
                var itemMapping = Scdp.StrUtil.split(item,"|");
                var targetObj = null;
                targetObj = me.editgrid.datagrid('getEditor', {index:me.editIndex,field:itemMapping[0]});
                var record = obj.gotRecord(ele);
                if(record && $.isArray(record) && record.length == 1) {
                    record = record[0];
                }

                if (Scdp.ObjUtil.isNotEmpty(targetObj)) {
                    if (Scdp.ObjUtil.isNotEmpty(record)) {
                        var rData = record;
                        if (Scdp.ObjUtil.isNotEmpty(itemMapping[1])) {
                            if($.isArray(rData)) {
                                var separator = Scdp.StrUtil.replaceNull(options.separator, "|");
                                var values = [];
                                $.each(rData, function(i, row) {
                                    values.push(row[itemMapping[1]]);
                                });
                                var targetValue = values.join(separator);
                                targetObj.actions.setValue(targetObj.target, targetValue);
                            } else {
                                targetObj.actions.setValue(targetObj.target, rData[itemMapping[1]]);
                            }
                        } else {
                            if($.isArray(rData)) {
                                var separator = Scdp.StrUtil.replaceNull(options.separator, "|");
                                var values = [];
                                $.each(rData, function(i, row) {
                                    values.push(row.codedesc);
                                });
                                var targetValue = values.join(separator);
                                targetObj.actions.setValue(targetObj.target, targetValue);
                            } else {
                                targetObj.actions.setValue(targetObj.target, rData.codedesc);
                            }
                        }
                    } else {
                        targetObj.actions.setValue(targetObj.target, null);
                    }
                } else {
                    var gridRecord = me.editgrid.e_editgrid('gotRow', me.editIndex);
                    if(Scdp.ObjUtil.isNotEmpty(gridRecord)) {
                        if (Scdp.ObjUtil.isNotEmpty(record)) {
                            var rData = record;
                            if (Scdp.ObjUtil.isNotEmpty(itemMapping[1])) {
                                if($.isArray(rData)) {
                                    var separator = Scdp.StrUtil.replaceNull(options.separator, "|");
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
                                    var separator = Scdp.StrUtil.replaceNull(options.separator, "|");
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
                }
            })
        }
    }
});

Scdp.define("edit_combtree", {
    extend:'edit_comb',
    ele:null,
    editgrid: null,
    editIndex: null,
    init: function (ele, options) {

        this.editgrid = options.editgrid;

        this.editIndex = $(this.editgrid).data("e_editgrid").editIndex;
        var me = this;
        if(!options.combType) {
            options.combType="scdp_fmcode"
        }
        if(options.arrayValue == null) {
            options.arrayValue = false;
        }
        if(options.separator == null) {
            options.separator = "|";
        }
        if(options.fuzzySearch) {
        } else {
            options.mode = 'remote';
        }
        
        if(!options.valueField) {
            options.valueField = 'id';
        }
        if(!options.textField) {
            options.textField = 'text';
        }
        if(options.fuzzySearch) {
            options.readonly = false;
            options.editable = true;
            if(Scdp.ObjUtil.isEmpty(options.validType)) {
                options.validType = "comboTreeIsExist";
            } else if ($.isArray(options.validType)){
                options.validType.push("comboTreeIsExist")
            } else{
                if(typeof options.validType=="string"){
                    var validType = [options.validType, 'comboTreeIsExist'];
                    options.validType = validType;
                } else if($.isPlainObject(options.validType)){
                    options.validType.comboTreeIsExist = "";
                }
            }
            options.onSelect = function (node) {
                me.ele.textbox("validate");
            }
        }
        options.loader = function(param,success,error) {
            me.reload(options).done(function(ret) {
                if(ret && $.isArray(ret)) {
                    success(ret);
                } else if(ret) {
                    success([ret]);
                }
            });
        };
        var orgOnchange = options.onChange;
        options.onChange = function(newValue,oldValue) {
            me.cascadeLoad(options);
            me.refreshTarget(me, options, me.ele);
            var combRec = me.gotRecord(this);
            orgOnchange.call(this, newValue, oldValue, combRec);
        };
        options.onShowPanel = function() {
            me.ele.combotree("reload");
        };
        me.ele = $("<input type=\"text\" class=\"datagrid-editable-input\" style='width:100%;'>").appendTo(ele);
        return me.ele.combotree(options);
    },
    destroy: function(target) {
        $(target).combotree("destroy");
    },
    gotRecord:function(target) {
        var combotree=$.data(target,"combotree");
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
    getValue: function(target) {
        var opts = $(target).combotree("options");
        if(opts.multiple) {
            if(opts.arrayValue) {
                return $(target).combotree("getValues");
            } else {
                var values = $(target).combotree("getValues");
                var value = null;
                if($.isArray(values)) {
                    value = values.join(opts.valueSeparator);
                } else {
                    value = values;
                }
                if(Scdp.ObjUtil.isNotEmpty(value)) {
                    return opts.valueSeparator + value + opts.valueSeparator;
                } else {
                    return null;
                }
            }
        } else {
            return $(target).combotree("getValue");
        }
    },
    setValue: function(target, value) {
        var opts = $(target).combotree("options");
        if(Scdp.ObjUtil.isEmpty(value)) {
            $(target).combotree("clear");
            return;
        }
        if(opts.multiple) {
            if($.isArray(value)) {
                $(target).combotree("setValues", value);
            } else {
                var values = Scdp.StrUtil.split(value,opts.valueSeparator);
                $(target).combotree("setValues", Scdp.ArrayUtil.removeEmpty(values));
            }
        } else {
            $(target).combotree("setValue", value);
            this.cascadeLoad(opts);
            this.refreshTarget(this, opts, target);
        }
    },
    resize: function(target, width){
        $(target)._outerWidth(width);
    },

    reload: function (options) {
        var me = this;
        var dtd = $.Deferred();
        var filterMap = {};
        var record = $(options.editgrid).data("e_editgrid").gotRow(me.editIndex);
        if (Scdp.ObjUtil.isNotEmpty(options.filterFields) && record != null) {
            var filter = Scdp.StrUtil.split(options.filterFields,",");
            $.each(filter, function (i,item) {
                if(item.indexOf(":") != -1) {
                    var itemMapping = Scdp.StrUtil.split(item,":");
                    filterMap[itemMapping[0]] = itemMapping[1];
                } else {
                    var itemMapping = Scdp.StrUtil.split(item,"|");
                    var value = null;
                    var editor = options.editgrid.datagrid('getEditor', {index:me.editIndex,field:itemMapping[0]});
                    if(editor) {
                        value = editor.actions.getValue(editor.target);
                    } else {
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
        postdata.comboType = Scdp.StrUtil.replaceNull(options.combType);
        postdata.filterMap = filterMap || {};
        var cacheKey = Scdp.StrUtil.getMd5(Scdp.JSON.encode(postdata));
        var cacheObj = null;
        if(!Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKey)) {
            var listData = Scdp.doAction(options.combType, filterMap, null, null, false, false);
            if(listData && listData.children) {
                cacheObj = Scdp.copy({},listData, true);
                Scdp.TreeUtil.mappingData(listData, options);
                Scdp.CacheUtil.setPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKey, cacheObj);
                dtd.resolve(listData.children);
            } else {
                dtd.resolve(null);
            }
        } else {
            cacheObj = Scdp.copy({},Scdp.CacheUtil.getPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKey), true);
            Scdp.TreeUtil.mappingData(cacheObj, options);
            dtd.resolve(cacheObj.children);
        }

        return dtd.promise();
    }
});

Scdp.define("edit_searchbox", {
    extend:'edit_comb',
    ele:null,
    editgrid: null,
    editIndex: null,
    desc: null,
    valueField: null,
    init: function (ele, options) {
        var me = this;

        //dataOptions="valueField:'uuid',textField:'menuName',field:'inventoryUuid',width:'120px',linkhref:'WorkFlowConsign.controller.WorkFlowConsignController',winTitle:'选择设备',resultGridId:'resultGrid'"

        this.editgrid = options.editgrid;
        me.desc = options.textField || options.valueField + "Desc";
        this.valueField = options.valueField = options.valueField || options.field;
        this.textField = options.textField = me.desc ;

        this.editIndex = $(this.editgrid).data("e_editgrid").editIndex;


        options.searcher = function(){
            Scdp.popupSearchColWin(options.linkhref, options.winTitle, options.actionParams, options.resultGridId, options.style, function(selectRecord){
                selectRecord = selectRecord[0];
                me.ele.getCmp(options.textField).searchbox("setValue",selectRecord[options.textField]);
                me.ele.getCmp(options.valueField).val(selectRecord[options.valueField]);
                $(me.editgrid).trigger(options.itemId + "searcher",[selectRecord]);
                var opts = me.ele.getCmp(me.desc).searchbox("options");
                me.refreshTarget(me, opts, me.ele);
            });
        };

        var html = "<table border='0'><tr><td><input itemId='" + options.valueField + "' type='hidden'>" +
            "<input type='text' itemId='" + options.textField + "' class='datagrid-editable-input'></td></tr></table>";

        me.ele = $(html).appendTo(ele);
        me.ele.getCmp(options.textField).searchbox(options);
        return me.ele;
    },
    destroy: function(target) {
        $(target).getCmp(this.desc).searchbox("destroy");
    },
    getValue: function(target) {
        //var opts = $(target).getCmp(this.desc).searchbox("options");
        //return $(target).getCmp(this.valueField).val();
        return $(target).getCmp(this.desc).searchbox("getValue");
    },
    setValue: function(target, value) {
        var me = this;
        var opts = $(target).getCmp(this.desc).searchbox("options");
        $(target).getCmp(this.valueField).val(me.editgrid.e_editgrid('gotRow', me.editIndex)[opts.target]);
        $(target).getCmp(this.desc).searchbox("setValue", value);
        this.refreshTarget(this, opts, target);
    },
    resize: function(target, width){
        $(target).getCmp(this.desc).searchbox("resize", width);
    },

    gotRecord:function(target) {
        var me = this;
        var searchbox=$.data(target,"searchbox");
        var records = $(target).getCmp(this.valueField).val();

        var data = {};
        data[me.desc] = $(target).getCmp(this.desc).searchbox("getValue");
        data[me.valueField] = records;
        return data;
    }
});

Scdp.define("edit_datebox", {
    ele:null,
    editgrid: null,
    init: function (ele, options) {

        this.editgrid = options.editgrid;

        var me = this;

        me.ele = $("<input type=\"text\" class=\"datagrid-editable-input\" >").appendTo(ele);

        if(Scdp.ObjUtil.isEmpty(options.editable)) {
            options.editable = true;
        }
        var datebox = me.ele.datebox(options);
        if($.fn.inputmask && options.editable == true) {
            datebox.datebox("textbox").inputmask({alias:'yyyy-mm-dd'});
        }
        return datebox;
    }
});

Scdp.define("edit_datetimebox", {
    ele:null,
    editgrid: null,
    init: function (ele, options) {

        this.editgrid = options.editgrid;

        var me = this;

        me.ele = $("<input type=\"text\" class=\"datagrid-editable-input\" >").appendTo(ele);

        if(Scdp.ObjUtil.isEmpty(options.editable)) {
            options.editable = true;
        }
        var datetimebox = me.ele.datetimebox(options);
        if($.fn.inputmask && options.editable == true) {
            datetimebox.datetimebox("textbox").inputmask({alias:'y-m-d h:s:s'});
        }
        return datetimebox;
    }
});

Scdp.define("e_tablist", {
    extend: 'e_comp',
    ul: null,
    contentList:null,
    init: function () {
        var me = this;

        me.ul = $("ul.tab-list:first", me.ele);
        me.contentList = me.ul.siblings("div[xtype='e_tab']");
        var activeIndex = 0;
        $.each(me.contentList, function(i, content){
           var title = $(content).attr("title");
           var active = $(content).attr("active");
            var li;
            if("true" == active) {
                activeIndex = i;
            }
            li = $("<li><a>" + title + "</a></li>");
            li.attr("index", i);
            $(content).attr("index", i);
            me.ul.append(li);
        });
        $('li',me.ul).eq(activeIndex).addClass("on");
        me.contentList.hide().eq(activeIndex).stop().show();
        $('li',me.ul).click(function(){
            var index = $(this).index();
            if($(this).hasClass("tab-disable")) {
                return;
            }
            $(this).addClass("on").siblings("li").removeClass("on");
            me.contentList.hide().eq(index).stop().show(function(){
                me.contentList.eq(index).e_tab("doLayout");
            });
        });
    },
    sotTabDisable: function (index) {
        var me = this;
        $('li',me.ul).eq(index).addClass("tab-disable").removeClass("on");
        me.contentList.eq(index).hide();
    },
    sotTabEnable: function (index) {
        var me = this;
        $('li',me.ul).eq(index).removeClass("tab-disable");
    },
    sotTabDisableById: function (itemId) {
        var me = this;
        var currentIndex = -1;
        $.each(me.contentList, function(index, content) {
            var key = Scdp.Utils.getCompKey($(content));
            if(itemId == key) {
                currentIndex = index;
            }
        });
        if(currentIndex != -1) {
            me.sotTabDisable(currentIndex);
        }
    },
    sotTabEnableById: function (itemId) {
        var me = this;
        var currentIndex = -1;
        $.each(me.contentList, function(index, content) {
            var key = Scdp.Utils.getCompKey($(content));
            if(itemId == key) {
                currentIndex = index;
            }
        });
        if(currentIndex != -1) {
            me.sotTabEnable(currentIndex);
        }
    }
});

Scdp.define("e_tab", {
    extend: 'bPanel',
    init: function () {
        var me = this;
        var title = me.ele.attr("title");
        if(Scdp.ObjUtil.isNotEmpty(title)) {
            me.options.title = title;
        }
        var active = me.ele.attr("active");
        if(Scdp.ObjUtil.isNotEmpty(active)) {
            me.options.active = active;
        }
    },
    sotVisable: function (){
        this.ele.removeClass("hidden");
        var index = this.ele.attr("index");
        this.ele.siblings("ul").find("li[index='"+index+"']").removeClass("hidden");
    },
    sotHidden: function(needPostion) {
        this.ele.addClass("hidden");
        var index = this.ele.attr("index");
        this.ele.siblings("ul").find("li[index='"+index+"']").addClass("hidden");
    }
});

Scdp.define("bt_table", {
    extend: 'e_value_comp',
    e_type:'bootstrap.table',
    editIndex: undefined,
    clickIndex: null,
    clickRow:null,
    timeOut:null,
    gridId: null,
    bindId: null,
    bindIndex: null,
    aggfuns:{},
    columnFields:[],
    searchTable:null,
    hasCkfield:false,
    clickSelectRow:[],
    orgData: [],
    sysFormFlg: true,
    formBindFlg:false,
    defaultRow: null,
    init: function () {
        var me = this;
        var defaultOptions = {
            locale: me._getLocalId(),
            exportTypes:['json','txt', 'xml', 'csv', 'pdf'],
            exportDataType:"all",
            exportOptions:{ignoreColumn:['']},
            actionColItems:[]
        };
        this.gridId = Scdp.StrUtil.getUUID();
        this.bindId = this.ele.attr("bindId");
        if(Scdp.ObjUtil.isEmpty(this.bindId)) {
            this.bindId = this.options.bindId;
        }
        me.searchTable = me.ele.attr("searchTable");
        if("true" == me.searchTable) {// 查询表格
            var defaultSetting = {pagination:true,search:true,showRefresh:true,showToggle:true,showColumns:true,showExport:true,clickToSelect:true};
            this.options = $.extend(defaultSetting, this.options);

            var toolbar = me.ele.attr("toolbar");
            if(toolbar) {
                this.options.toolbar = toolbar;
            }
            var appendToolbar = me.ele.attr("appendToolbar");
            if(appendToolbar) {
                this.options.toolbar = this.options.toolbar + "," + appendToolbar;
            }
        } else {//编辑表格
            defaultOptions.exportDataType = "basic";
            var defaultSetting = {search:true,showToggle:true,showColumns:true,showExport:true, clickToSelect:true};
            this.options = $.extend(defaultSetting, this.options);

            this.options.clickToSelect = true;
            var _toolbar = $("<div>\
                <a class='btn' itemId='addBtn" + this.UNIQUE_KEY+"'><i class='fa fa-plus' style='color:#2b98f3'></i> <span> 添加</span></a>\
                <a class='btn' itemId='delBtn" + this.UNIQUE_KEY+"'><i class='fa fa-times' style='color:#DE235D'></i> <span> 删除</span></a>\
                <a class='btn' itemId='undoBtn" + this.UNIQUE_KEY+"'><i class='fa fa-reply' style='color:#38de10'></i> <span> 撤消</span></a>\
                </div>");

            _toolbar.find("[itemId^='addBtn']").on("click", function (e) {
                if(me.defaultRow) {
                    me.appendRow($.extend({editflag:"+"}, me.defaultRow));
                } else {
                    me.appendRow({editflag:"+"});
                }
            });
            _toolbar.find("[itemId^='delBtn']").on("click", function (e) {
                me.deleteRows(me.gotSelectedRows());
                //删除，重新刷新
                me.clickIndex = null;
                me.clickRow = null;
                me.synRefreshBind();
            });
            _toolbar.find("[itemId^='undoBtn']").on("click", function (e) {
                //还原
                me.clickIndex = null;
                me.clickRow = null;
                me.undo();
            });
            var toolbar = me.ele.attr("toolbar");
            if(toolbar) {
                this.options.toolbar = toolbar;
            } else {
                if(this.options.editable == false) {
                    toolbar = $("<span/>");
                } else {
                    toolbar = _toolbar;
                }
                var appendToolbar = me.ele.attr("appendToolbar");
                if(appendToolbar) {
                    toolbar.append($(appendToolbar, me.context));
                }
            }

            if(this.options.toolbar == false || this.options.toolbar == "false") {
                this.options.toolbar = null;
                this.options.search = false;
                this.options.showToggle = false;
                this.options.showColumns = false;
                this.options.showExport = false;
            } else {
                this.options.toolbar = toolbar;
            }
            this.options.onEditableSave = function (field, row, oldValue, table) {
                if(row.editflag != "+" && row.editflag != "-") {
                    row.editflag = "*"
                }
            }
        }

        if(me.hasBindForm()) {
            me.formBindFlg = true;
        }
        defaultOptions.columns = [me.paseColumns()];
        if(!me.hasCkfield) {
            if(this.options.singleSelect == null || this.options.singleSelect == undefined) {
                defaultOptions.singleSelect = true;
            }
            defaultOptions.onClickRow = function (row, ele, field) {
                var opts = me.ele.bootstrapTable('getOptions');
                me.synBindFormSelf();
                me.synBindSubGrid();
                me.clickIndex = ele.data("index");
                me.clickRow = row;
                me.synRefreshBind();
                if(opts.singleSelect) {
                    me.clickSelectRow = [];
                    me.clickSelectRow.push(row);
                    $(ele).siblings().removeClass("selected");
                } else {
                    if($.inArray(row, me.clickSelectRow) == -1) {
                        me.clickSelectRow.push(row);
                    } else {
                        me.clickSelectRow.splice($.inArray(row, me.clickSelectRow), 1);
                    }
                }
                $(ele).addClass("selected");
            }
        }
        this.options = $.extend(this.options,  defaultOptions);
        if($.bootstrapTable) {
            me.ele.bootstrapTable(this.options);
            me.ele.bootstrapTable("resetView");
        }

        me.listenBindForm();
        me._bind(defaultOptions.columns);

        me.ele.on("click", "input[type='checkbox']", function (event) {
             if($(this).is(":disabled")) {
                 return;
             }
             var field = $(this).attr("data-field");
             var index = $(event.currentTarget).parents("tr").attr("data-index");
             var data = me.ele.data('bootstrap.table').options.data;
             if(data[index]) {
                 var row = data[index];
                 if($(this).is(":checked")) {
                     row[field] = 1;
                 } else {
                     row[field] = 0;
                 }
                 me.updateRow(index, row);
             }
        });
    },
    _getLocalId: function () {
        var lang = Scdp.getSysConfig("locale_id");
        return Scdp.StrUtil.replaceAll(lang, "_","-");
    },

    _bind: function (columns) {
        var me = this;
        $.each(columns, function (i, column) {
            $.each(column, function (j, col) {
                if ((col.xtype && col.xtype == "bTActionCol") || (col.coltype && col.coltype == "actioncol")){
                    me.ele.on("click",'a[field=' + col.field + ']',function (event) {
                        var field = $(this).attr("field");
                        var btnItemId = $(event.target).parent().attr("itemId");
                        var actionColItems = me.gotOptions().actionColItems;
                        if (!actionColItems)return;
                        $.each(actionColItems, function (i, actionColItem) {
                            var items = actionColItem[field];
                            $.each(items, function (h, item) {
                                if (item.itemId == btnItemId){
                                    item.handler(me, $(event.currentTarget).parents("tr").attr("data-index"));
                                    return false;
                                }
                            });
                        });
                    });
                }
            });
        });
    },
    hasBindForm: function () {
        var bindForm = $("[bindId='" + this.itemId + ".bind'][xtype='bForm']", this.context);
        if(bindForm && bindForm.length>0) {
            return true;
        } else {
            return false;
        }
    },
    listenBindForm: function() {
        var me = this;
        var bindForm = $("[bindId='" + this.itemId + ".bind']", this.context);
        if(bindForm.length>0) {
            $.each(bindForm, function(i,form)  {
                var xtype = $(form).attr("xtype");
                if("bForm" == xtype) {
                    $(form).bind("change blur formchange focusout", function(){
                        if(me.sysFormFlg) {
                            me.synBindForm();
                        }
                    });
                }
            });
        }
    },
    synBindForm: function() {
        var me = this;
        if(me.editIndex != undefined) {
        } else if(me.hasBindForm()) {
            var bindForm, selrow,rowIndex;
            bindForm = $("[bindId='" + me.itemId + ".bind']", me.context);
            selrow = me.clickRow;
            rowIndex = me.clickIndex;

            if(rowIndex != null && rowIndex != -1) {
                clearTimeout(me.timeOut);
                me.timeOut = setTimeout(function() {
                    var formValue = bindForm.gotValue();
                    me.updateRow(rowIndex, formValue);
                    me.refreshUndoStatus();
                    // me.ele.datagrid('selectRow', rowIndex);
                },100);
            }
        }
    },
    synBindFormSelf: function(index) {
        var me = this;
        if(me.editIndex != undefined) {
        } else if(me.hasBindForm()) {
            var bindForm, selrow,rowIndex;
            bindForm = $("[bindId='" + me.itemId + ".bind']", me.context);
            selrow = me.clickRow;
            rowIndex = me.clickIndex;

            if(rowIndex != null && rowIndex != -1) {
                var formValue = bindForm.gotValue();
                me._updateNoRefresh(rowIndex, formValue);
                me.refreshUndoStatus();
            }
        }
    },
    getBindIndex: function() {
        return this.bindIndex;
    },
    synBindSubGrid: function() {
        var me = this;
        var bindObjs = $("[bindId='" + me.itemId + ".bind']", me.context);
        if(bindObjs.length>0) {
            $.each(bindObjs, function(i, bindObj) {
                var itemId = $(bindObj).attr("itemId");
                var xtype = $(bindObj).attr("xtype");
                if("bt_table" == xtype) {
                    var index = $(bindObj)[xtype]("getBindIndex");
                    if(index != null) {
                        var value = $(bindObj).gotValue();
                        var changeValue = $(bindObj)[xtype]("gotChange");
                        var record = me.gotRow(index);
                        record[itemId] = value;
                        if(Scdp.ObjUtil.isNotEmpty(changeValue)) {
                            var copyRecord = $.extend(true, {}, record);
                            copyRecord.editflag = "*";
                            me._updateNoRefresh(index,copyRecord);
                        }
                    }
                }
            });
        }
    },
    //点击，刷新bind的数据
    synRefreshBind: function() {
        var me = this;
        var bindObjs = $("[bindId='" + me.itemId + ".bind']", me.context);
        if(bindObjs.length>0) {
            $.each(bindObjs, function(i, bindObj) {
                var itemId = $(bindObj).attr("itemId");
                var record = me.clickRow;
                var index = me.clickIndex;
                if(!record) {
                    record = me.gotRow(0);
                    index = 0;
                }
                var xtype = $(bindObj).attr("xtype");
                me.sysFormFlg = false;
                if(record) {
                    if("bt_table" == xtype) {
                        if(record[itemId] == null) {
                            record[itemId] = [];
                        }
                        $(bindObj).bt_table("sotValue", record[itemId], index);
                    } else if("bForm" == xtype) {
                        $(bindObj).sotValue(record);
                    }
                } else {
                    if("bt_table" == xtype) {
                        $(bindObj).bt_table("sotValue", null, null);
                    } else if("bForm" == xtype) {
                        $(bindObj).sotValue(null);
                    }
                }
                me.sysFormFlg = true;
            });
        }
    },
    refreshUndoStatus: function () {
    },
    loadDataPage: function(param, action) {
        var me = this;
        param.btnQuery = 1;
        param.actionName = action;
        param.xtype = "e_datagrid";
        var grid = me.ele;
        param.columns = me.columnFields;
        param.aggfuns = me.aggfuns;

        grid.data('bootstrap.table').options.sidePagination = "server";
        grid.data('bootstrap.table').options.ajax = function (orgAjax) {
            param.rows = orgAjax.data.limit;
            param.page = parseInt(orgAjax.data.offset/orgAjax.data.limit) + 1;
            param = $.extend(param, orgAjax.data);
            if(param && param.btnQuery) {
                Scdp.loadFreeMarkerAction(param.actionName, param, function(data) {

                    if(data && (data.rows || $.isArray(data))) {
                        if(data.footer) {
                            setFooter(data.footer);
                        }
                        orgAjax.success(data);
                    } else {
                        orgAjax.success({rows:[],total:0});
                    }
                }, function(e) {
                    Scdp.DebugUtil.logErr(e);
                } );
            } else {
                return false;
            }
        };
        grid.bootstrapTable('refresh', param);
        grid.data('bootstrap.table').options.onDblClickRow = function(row, element, field) {
            me.controller.loadItem(row[me.controller.view.uuidMapping]);
        };

        function setFooter(footer) {
            var columns = grid.data('bootstrap.table').options.columns;
            $.each(columns[columns.length-1], function (i, col) {
                $.each(footer[0], function (key, value) {
                    if(key == col.field) {
                        col.footerFormatter = value + "";
                    }
                })
            })
        }
    },
    paseColumns: function() {
        var me = this;
        var cols = $('th', me.ele);
        var retColums = [];
        var colLength = cols.length;
        if(me.options.rownumber) {
            var rowNumCol = {field:'', width:'20px',sortable:false, formatter: function (value,row,index) {
                return index + 1;
            }};
            retColums.push(rowNumCol);
        }
        $.each(cols, function(i, th) {
            var col = {};
            var option = $.parser.parseOptions(th);
            col = $.extend(col, option);
            col.title = $(th).attr("title");
            var coltype = $(th).attr("coltype");
            col.coltype = coltype;
            if(col.field == 'ck' && col.checkbox) {
                col.field = "";
                col.sortable=false;
                col.width = '22px';
                me.hasCkfield = true;
            } else {
                me.columnFields.push(col.field);
            }
            if(Scdp.ObjUtil.isNotEmpty(coltype)) {
                col = $.extend(true,{}, Scdp.DefaultOptions[coltype],col);
            }
            if(!col.align) {
                col.align = "center";
            }
            if(col.sortable == null) {
                col.sortable = true;
            }
            if(col.editable == true) {
                col.editable = {};
            }
            if(Scdp.ObjUtil.isNotEmpty(coltype)) {
                if("btcol" == coltype) {

                } else if("textbox" == coltype) {
                    if(col.editable && $.isPlainObject(col.editable)) {
                        col.editable = $.extend(col.editable,{type:'text',emptytext:'---'});
                    }
                } else if("textarea" == coltype) {
                    if(col.editable && $.isPlainObject(col.editable)) {
                        col.editable = $.extend(col.editable,{type:'textarea',emptytext:'---'});
                    }
                } else if("numberbox" == coltype) {
                    var precision = col.precision;
                    if(precision) {
                        precision = parseInt(precision)
                    } else {
                        precision = 0;
                    }
                    col.formatter = function(value,row,index) {
                        if(value === null || value === "") {
                            return "";
                        }
                        if (precision != null) {
                            return Scdp.Utils.formatNumber(value, precision);
                        } else {
                            return value;
                        }
                    }
                    if(col.editable && $.isPlainObject(col.editable)) {
                        col.editable = $.extend(col.editable,{precision:precision, bt_table: me.ele, field: col.field, type:'component',xtype:'e_numberbox',emptytext:'---'});
                    }
                } else if("datebox" == coltype) {
                    var format = col.format;
                    if(!format) {
                        format = "YYYY-MM-DD";
                    }
                    col.formatter = function(value,row,index){
                        if(Scdp.ObjUtil.isNotEmpty(value)) {
                            var date = moment(value).toDate();
                            var localDate = date;
                            if (me.checkTimezoneforGrid(row, col)) {
                                localDate = Scdp.DateUtil.parseDateToLocal(date);
                            }
                            return moment(localDate).format(format)
                        } else {
                            return "";
                        }
                    }
                    if(col.editable && $.isPlainObject(col.editable)) {
                        col.editable = $.extend(col.editable,{onblur:'ignore', bt_table: me.ele, field: col.field, type:'component',xtype:'e_datebox',emptytext:'---'});
                    }
                } else if("datetimebox" == coltype) {
                    var format = col.format;
                    if(!format) {
                        format = "YYYY-MM-DD HH:mm:ss";
                    }
                    col.formatter = function(value,row,index){
                        if(Scdp.ObjUtil.isNotEmpty(value)) {
                            var date = moment(value).toDate();
                            var localDate = date;
                            if (me.checkTimezoneforGrid(row, col)) {
                                localDate = Scdp.DateUtil.parseDateToLocal(date);
                            }
                            return moment(localDate).format(format)
                        } else {
                            return "";
                        }
                    }
                    if(col.editable && $.isPlainObject(col.editable)) {
                        col.editable = $.extend(col.editable,{onblur:'ignore', bt_table: me.ele, field: col.field, type:'component',xtype:'e_datetimebox',emptytext:'---'});
                    }
                } else if("checkbox" == coltype) {
                    if($.isPlainObject(col.editable)) {
                        col.formatter = function(value, row, index){
                            if(Scdp.ObjUtil.isNotEmpty(value) && value == 1) {
                                return "<input data-field='"+col.field+"' type='checkbox' checked />"
                            } else {
                                return "<input data-field='"+col.field+"' type='checkbox'/>";
                            }
                        };
                    } else {
                        col.formatter = function(value,row,index){
                            if(Scdp.ObjUtil.isNotEmpty(value) && value == 1) {
                                return "<input data-field='"+col.field+"' type='checkbox' checked readonly disabled/>"
                            } else {
                                return "<input data-field='"+col.field+"' type='checkbox' readonly disabled/>";
                            }
                        };
                    }
                    col.editable = null;
                } else if("combobox" == coltype) {
                    if(col.editable && $.isPlainObject(col.editable)) {
                        col.editable = $.extend(col.editable,{onblur:'ignore',bt_table: me.ele, field: col.field, type:'combobox',emptytext:'---'});
                    }
                    col.formatter = function(value,row,index){
                        if(Scdp.ObjUtil.isNotEmpty(value)) {
                            return value
                        } else {
                            return ""
                        }
                    };

                } else if("combotree" == coltype) {
                    if(col.editable && $.isPlainObject(col.editable)) {
                        col.editable = $.extend(col.editable,{onblur:'ignore',bt_table: me.ele, field: col.field, type:'combotree',emptytext:'---'});
                    }
                    col.formatter = function(value,row,index){
                        if(Scdp.ObjUtil.isNotEmpty(value)) {
                            return value
                        } else {
                            return ""
                        }
                    };
                } else if("queryfield" == coltype){
                    if(col.editable && $.isPlainObject(col.editable)) {
                        col.editable = $.extend(col.editable,{onblur:'ignore',bt_table: me.ele, field: col.field, type:'queryfield',emptytext:'---'});
                    }
                    col.formatter = function(value,row,index){
                        if(Scdp.ObjUtil.isNotEmpty(value)) {
                            return value
                        } else {
                            return ""
                        }
                    };
                } else if("actioncol" == coltype){
                    col.formatter = function(data, row, meta) {
                        var actionColItems = me.ele.bootstrapTable('getOptions').actionColItems;
                        var items = [];
                        $.each(actionColItems, function (i, actionColItem) {
                            if (actionColItem[col.field]){
                                items = actionColItem[col.field];
                                return false;
                            }
                        });
                        if (items.length > 0){
                            var html = "";
                            $.each(items, function (i, item) {
                                html += "<a field='"+col.field+"' itemId='" + item.itemId + "' href='javascript:void(0)'><i class='" + (item.iconCls||"fa fa-sun-o") + "'></i> <span> " + (item.text||"") + "</span></a>";
                            });
                            return html;
                        }
                        return data;
                    }
                }
                if(i<2 && col.editable) {
                    col.editable.placement = 'right';
                }
                if(i>=(colLength-2) && col.editable) {
                    col.editable.placement = 'left';
                }
            }
            if(me.formBindFlg) {
                col.editable = null;
            }
            if(col.aggfun && col.field) {
                me.aggfuns[col.field] = col.aggfun;
            }

            if(col.cellStyle) {
                var cellStyle = col.cellStyle;
                col.cellStyle = function (value,row,index, field) {
                    if(me.controller[cellStyle] && $.isFunction(me.controller[cellStyle])) {
                        return me.controller[cellStyle].apply(me.controller,[value,row,index, field]);
                    } else if($.isPlainObject(cellStyle)) {
                        return cellStyle;
                    }
                }
            }
            retColums.push(col);
        });
        cols.remove();
        return retColums;
    },
    gotOptions: function () {
       return this.ele.bootstrapTable('getOptions');
    },
    gotColumnFields: function () {
        return this.columnFields;
    },
    checkTimezoneforGrid: function(row, col) {
        return col.needTz ||
            (
                (col.field == 'createTime' || col.field == 'updateTime') && //process create time and update time column
                ((typeof row.locTimezone != 'undefined' && row.locTimezone != Scdp.getSysConfig("server_tz")) ||
                    (//or data has not locTimezone column and using utc is true
                        !row.locTimezone && Scdp.getSysConfig("using_utc") === true
                    )
                )
            );
    },
    destroy: function() {
        this.editIndex = undefined;
        this.ele.bootstrapTable("destroy");
    },
    gotRow: function(index) {
        var me = this;
        var data = me.ele.bootstrapTable("getData");
        if(data && data.length>=(index+1)) {
            return data[index];
        } else {
            return null;
        }
    },
    gotSelectedRows: function () {
        var me = this;
        if(!me.hasCkfield) {
            return me.clickSelectRow;
        } else {
            return me.ele.bootstrapTable("getAllSelections");
        }
    },
    gotAllRows: function() {
        var me = this;
        return me.ele.bootstrapTable("getData");
    },
    gotValue: function(dirtyOnly, editflag) {
        var me = this;
        if(me.searchTable == "true") {
            return me.gotAllRows();
        } else {
            me.synBindFormSelf();
            me.synBindSubGrid();
            if("+" == editflag) {
                var allRows = me.gotAllRows();
                if(allRows) {
                    $.each(allRows, function(index, row) {
                        row.editflag = "+";
                    })
                }
                return allRows;
            } else {
                var allRows = me.gotAllRows();
                var changeRows = me.gotChange();
                if(me.bindId) {
                    return allRows;
                } else {
                    return changeRows;
                }
            }
        }
    },
    gotChange: function() {
        var me = this;
        var allRows = me.gotAllRows();
        var rows = [];
        $.each(allRows, function (j, row) {
            if(row.editflag == "+" && $.inArray(row, rows) == -1) {
                rows.push(row);
            }
            if(row.editflag == "*" && $.inArray(row, rows) == -1) {
                rows.push(row);
            }
            if(row.editflag == "-" && $.inArray(row, rows) == -1) {
                rows.push(row);
            }
        });
        return rows;
    },
    sotValue: function(value, bindIndex) {
        var me = this;
        me.bindIndex = bindIndex;
        if(value && ($.isArray(value) || value.rows)) {
            var rows = null;
            if(!$.isArray(value)) {
                rows = value.rows
            } else {
                rows = value;
            }
            var opts = this.ele.data('bootstrap.table').options;
            var columns = opts.columns;
            $.each(columns, function(i,colum) {
                $.each(colum, function(i,colopt) {
                    if("datebox" == colopt.coltype || "datetimebox" == colopt.coltype) {
                        $.each(rows, function(j,row) {
                            if(row[colopt.field] && typeof row[colopt.field] == 'string') {
                                row[colopt.field] = moment(row[colopt.field]).toDate();
                            }
                        })
                    }
                });
            });
            me.orgData = $.map(rows, function(obj){
                    return $.extend(true,{},obj);//返回对象的深拷贝
                });
            var hiddenRows = this.ele.bootstrapTable("getHiddenRows");
            hiddenRows.splice(0);
            $.each(rows, function (i, row) {
                if(row.editflag == "-") {
                    hiddenRows.push(row);
                }
            });
            this.ele.bootstrapTable("load", rows);
        } else {
            me.orgData = [];
            me.ele.bootstrapTable("removeAll");
        }
        me._reset();
        me.synRefreshBind();
    },
    _reset: function () {
        this.clickIndex = null;
        this.clickRow = null;
        this.clickSelectRow = [];
    },
    // sotFooter: function(rows) {
    //     var me = this;
    //     if(rows && $.isArray(rows) && rows.length>0) {
    //         me.ele.datagrid("reloadFooter", rows);
    //     }
    // },
    sotSingleSelect: function(bol) {
        var me = this;
        var dataGrid = me.ele;
        var opts= dataGrid.data('bootstrap.table').options.
        opts.singleSelect = bol;
    },
    sotDisable: function () {
        var me = this;
        var dataGrid=$.data(me.ele[0],"datagrid");
        var toolbar = $("div.datagrid-toolbar",dataGrid.panel);
        $("a", toolbar).each(function(i, btn) {
            $(btn).addClass("l-btn-disabled disabled");
            if($.data(btn, "linkbutton")) {
                $(btn).linkbutton("disable");
            }
        });
        me.ele.datagrid("options").onClickCell = function(){};
        dataGrid.panel.css("backgroundColor","#f5f5f5");
    },
    sotEnable: function() {
        var me = this;
        var dataGrid = $.data(me.ele[0], "datagrid");
        var toolbar = $("div.datagrid-toolbar", dataGrid.panel);
        $("a", toolbar).each(function (i, btn) {
            $(btn).removeClass("l-btn-disabled disabled");
            if($.data(btn, "linkbutton")) {
                $(btn).linkbutton("enable");
            }
        });
        dataGrid.panel.css("backgroundColor","");
    },
    isObjectEqual: function(rowOrg, rowDest) {
        var me = this;
        var equal = true;
        if((rowOrg == null && rowDest != null) || (rowOrg != null && rowDest == null)) {
            equal = false;
            return false;
        }
        $.each(rowOrg, function(key, value) {
            var destValue = rowDest[key];
            if((value == null || value == "" || value == undefined) && (destValue == null || destValue == "" || destValue == undefined)) {
                return;
            } else if(value instanceof Date && destValue instanceof Date) {
                if(Scdp.DateUtil.formatDate(value, Scdp.Const.LONG_DATE_FORMAT) == Scdp.DateUtil.formatDate(destValue, Scdp.Const.LONG_DATE_FORMAT)) {
                    return;
                } else {
                    equal = false;
                    return false;
                }
            } else if(typeof value =='object') {
                var sub = me.isObjectEqual(value, destValue);
                if(!sub) {
                    equal = false;
                    return false;
                }
            } else if(value !== destValue) {
                equal = false;
                return false;
            }
        });
        return equal;
    },
    appendRow: function (row) {
        row.editflag = "+";
        this.ele.bootstrapTable("append",[row]);
        var data = this.ele.data('bootstrap.table').options.data;
        this.clickIndex = data.length -1;
        this.clickRow = data[this.clickIndex];
        this.synRefreshBind();
    },
    _updateNoRefresh: function (index, row) {
        var data = this.ele.data('bootstrap.table').options.data;
        if(data[index]) {
            if(data[index].editflag == "+") {
                row.editflag = "+";
            } else {
                row.editflag = "*";
            }
            $.extend(data[index], row);
        }
    },
    updateRow: function (index, row) {
        var data = this.ele.data('bootstrap.table').options.data;
        if(data[index]) {
            if(data[index].editflag == "+") {
                row.editflag = "+";
            } else {
                row.editflag = "*";
            }
            this.ele.bootstrapTable("updateRow",{index:index, row: row});
        }
    },
    deleteRow: function (index) {
        var data = this.ele.data('bootstrap.table').options.data;
        if(data[index]) {
            if(data[index].editflag != "+") {
                data[index].editflag = "-";
                this.ele.data('bootstrap.table').hideRow({index:index});
            } else {
                data.splice(index, 1);
            }
        }
        this.ele.bootstrapTable("refresh", true);
    },
    deleteRows: function (rows) {
        var me = this;
        var data = this.ele.data('bootstrap.table').options.data;
        $.each(rows, function (i, row) {
            for(var j=data.length-1; j>=0; j--) {
                var orgRow = data[j];
                if(orgRow == row) {
                    if(orgRow.editflag != "+") {
                        orgRow.editflag = "-";
                        me.ele.data('bootstrap.table').hideRow({index:j});
                    } else {
                        data.splice(j, 1);
                    }
                }
            }
        });

        this.ele.bootstrapTable("refresh", true);
    },
    sotDefaultRow: function (row) {
        this.defaultRow = row;
    },
    undo: function () {
        this.sotValue(this.orgData, this.bindIndex);
    }
});