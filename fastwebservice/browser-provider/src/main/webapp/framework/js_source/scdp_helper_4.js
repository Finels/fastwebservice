/**
 * Description: 模块描述.
 * Copyright: © 2016 CSNT. All rights reserved.
 * Company:CSNT
 *
 * @author duwanjiang
 * @version 1.0
 * @timestamp 2017/5/19 9:13
 */
/**
 * 公共数据请求对象
 * @param url action的url
 * @param params 参数
 * @param success 成功返回函数
 * @param failure 失败返回函数
 * @param maskid 等待标签的id
 * @param async 是否异步
 * @param fileid 文件上传标签的id
 */
Scdp.doAction = function (url, params, success, failure, maskid, async, fileid) {
    success = success || function () {
        };
    failure = failure || function () {
        };
    params = params || {};
    "sys-user-login" !== url && (params.userId = Scdp.CacheUtil.get(Scdp.Const.USER_ID));
    params.userLocaleId = Scdp.getSysConfig("locale_id");
    params.timestamp = Date.now();
    params.network = window.NETWORK_DELAY;
    Scdp.ObjUtil.isEmpty(params.menuCode) && (params.menuCode = Scdp.getActiveModule() ? Scdp.getActiveModule() : null );
    params.signature = Scdp.getSign(url, params);
    if (Scdp.ObjUtil.isNotEmpty(fileid)) {
        params = Scdp.JSON.encode(params);
        var h;
        $.ajaxFileUpload({
            url: Scdp.Const.JSON_ACTION,
            type: "post",
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: fileid, //文件上传域的ID
            dataType: 'json', //返回值类型 一般设置为json
            data: {
                actionName: url,
                postData: params
            },
            success: function (a, b) {
                h = a;
                var biz = h.bizexception;
                var sys = h.sysexception;
                var errorCode = h.errorcode;
                if(biz || sys || errorCode) {
                    Scdp.ObjUtil.isNotEmpty(h.message) && Scdp.Msg.info(h.message);
                    var bizexception = h.bizexception
                        , e = h.sysexception;
                    bizexception ? Scdp.Msg.warn(Scdp.StrUtil.htmlEncode(bizexception).replace("\\n", "\x3cbr/\x3e").replace("\n", "\x3cbr/\x3e")): e && Scdp.Msg.error(e + "\x3cbr/\x3e\x3cbr/\x3e[Error Code:" + h.stack + "]");
                    failure(h);
                    h.loginTimeout &&
                    (window.LOGIN_TIMEOUT = h.loginTimeout);
                    return;
                }
                success(h);
                h.loginTimeout && (window.LOGIN_TIMEOUT = h.loginTimeout)
            },
            failure: function (a, b) {
                h = JSON.parse(b.response.responseText);
                Scdp.ObjUtil.isNotEmpty(h.message) && Scdp.Msg.info(h.message);
                var bizexception = h.bizexception
                    , e = h.sysexception;
                bizexception ? Scdp.Msg.warn(Scdp.StrUtil.htmlEncode(bizexception).replace("\\n", "\x3cbr/\x3e").replace("\n", "\x3cbr/\x3e")) : e && Scdp.Msg.error(e + "\x3cbr/\x3e\x3cbr/\x3e[Error Code:" + h.stack + "]");
                failure(h);
                if(h.loginTimeout) {
                    Scdp.Utils.setUserOutTime(h.loginTimeout);
                }
                //(window.LOGIN_TIMEOUT = h.loginTimeout)
            }
        });
    } else
        return Scdp.Utils.ajax({
            url: Scdp.Const.JSON_ACTION,
            action: url,
            postdata: params,
            mask: maskid,
            async: async,
            successFn: success,
            failureFn: failure
        })
}

/**
 * 公共查询方法
 * @param url 请求url
 * @param param 请求参数
 * @param formItemId 查询条件form的itemId
 * @param successFn 成功返回函数
 * @param failureFn 失败返回函数
 * @param async 是否异步
 */
Scdp.commonAction = function (url, param, formItemId, successFn, failureFn, async) {
    var postData = param || {};
    postData.viewdata = Scdp.getFormData(formItemId);
    Scdp.doAction(url, postData, function (retData) {
        if (retData.success)
            if (successFn) {
                successFn(retData);
            }
    }, failureFn, false, async);
}

/**
 * 公共删除函数
 * @param url
 * @param param 选择记录的数组
 * @param successFn
 * @param failureFn
 * @param async
 */
Scdp.commonDeleteAction = function (url, param, successFn, failureFn, async) {
    var postData = param || {};
    var uuids = [];
    for (var i in postData) {
        uuids.push(postData[i].uuid);
    }
    Scdp.doAction(url, {uuids: uuids}, function (retData) {
        if (retData.success)
            if (successFn) {
                successFn(retData);
            }
    }, failureFn, false, async);
}

Scdp.loadFreeMarkerPage = function (action, params, success, failure) {
    success = success || function () {
        };
    failure = failure || function () {
        };
    params = params || {};
    params.userId = Scdp.CacheUtil.get(Scdp.Const.USER_ID);
    params.userLocaleId = Scdp.getSysConfig("locale_id");
    params.network = window.NETWORK_DELAY;
    params.actionName = action;
    var start = new Date().getTime();
    Scdp.ObjUtil.isEmpty(params.menuCode) && (params.menuCode = Scdp.getActiveModule() ? Scdp.getActiveModule() : null );

    var cacheKey = Scdp.StrUtil.getMd5(Scdp.JSON.encode(params));
    var cacheObj = null;
    if(!Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_INFO_LAYOUT, cacheKey) || !Scdp.DebugUtil.isProdMode()) {
        params.timestamp = Date.now();
        params.signature = Scdp.getSign(action, params);
        cacheObj = Scdp.Utils.ajax({
            url: Scdp.Const.FREEMARKER_LOAD_PAGE,
            action: action,
            postdata: params,
            successFn: cacheSuccess,
            failureFn: failure,
            dataType:'html'
        });
    } else {
        var newParam = {};
        newParam.action = Scdp.getActiveModule() ? Scdp.getActiveModule() : null;
        newParam.actionId = Scdp.StrUtil.getUUID(),
            newParam.actionParam = JSON.stringify(params);
        newParam.startTime = new Date();
        newParam.actionType = "MENU";
        var end = new Date().getTime();
        newParam.duration = end - start;
        Scdp.doAction("log-action-history", newParam);
        cacheObj = Scdp.CacheUtil.getPage(Scdp.Const.CACHE_TYPE_INFO_LAYOUT, cacheKey);
        success(cacheObj);
    }

    function cacheSuccess(retdata) {
        if (Scdp.DebugUtil.isProdMode()) {
            Scdp.CacheUtil.setPage(Scdp.Const.CACHE_TYPE_INFO_LAYOUT, cacheKey, retdata);
        }
        success(retdata);
    }
};

Scdp.loadFreeMarkerAction = function (action, postData, success, failure) {
    var params = {};
    params.viewdata = postData;
    return Scdp.doAction(action, params, success, failure);
};

Scdp.getRedirectPath = function (configKey) {
    if(Scdp.ObjUtil.isNotEmpty(window[("SYSCONFIG_REDIRECTPATH").toUpperCase()])) {
        return window[("SYSCONFIG_REDIRECT_PATH").toUpperCase()];
    } else {
        return window[("SYSCONFIG_" + configKey).toUpperCase()];
    }
};

Scdp.getSign = function (actionName, postdata) {
    var data = actionName + "\n",
        key = Scdp.CacheUtil.get(Scdp.Const.USER_TOKEN);
    data += Scdp.JSON.encode(postdata || {});
    key = Scdp.ObjUtil.isEmpty(key) ? "SCDP" : key;
    return Scdp.StrUtil.getHMACSHA256(data, key);
};

//Get sys config properties
Scdp.getSysConfig = function (configKey) {
    return window[("SYSCONFIG_" + configKey).toUpperCase()];
};

Scdp.initComboStores = function(ele, menuCode, pageCacheRefresh) {
    if(pageCacheRefresh == null || pageCacheRefresh == undefined) {
        pageCacheRefresh = false;
    }
    var xtypeSel = ["[xtype='bCheckGroup']","[xtype='bRadioGroup']","[xtype='bComboxSin']","[xtype='e_combobox']","[xtype='e_combotree']","[xtype='e_combogrid']","[xtype='e_tree']", "[coltype='combtree']", "[coltype='combobox']"];
    var comboList = [];
    var treeList =[];
    var cacheKeyLst =[];
    $.each(xtypeSel, function(i, xtype){
        $(xtype, ele).each(function(j, comp) {
            getCacheKeyAndParams($(comp),menuCode, cacheKeyLst, comboList, treeList, pageCacheRefresh);
        });
    });
    var postdata = {};
    postdata.menu_code = menuCode;
    postdata.combo_item_list = comboList;
    postdata.tree_item_list = treeList;

    if(comboList.length > 0 || treeList.length > 0) {
        Scdp.doAction("common-component-init-load", postdata, function(retData) {
            if(retData && retData.comboItemList) {
                var listCombStore = retData.comboItemList.root;
                $.each(listCombStore, function(i, rowMap){
                    Scdp.CacheUtil.setPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, rowMap.cacheKey, rowMap.cacheObj);
                });
            }
            if(retData && retData.workflowDefinitionKey) {
                var postdata = {};
                postdata.menuCode = menuCode;
                var cacheKeyWithMenuCode = Scdp.StrUtil.getMd5(Scdp.JSON.encode(postdata));
                Scdp.CacheUtil.setPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithMenuCode, retData.workflowDefinitionKey);
            }
            if(retData && retData.treeItemList) {
                var treeCombStore = retData.treeItemList;
                $.each(treeCombStore, function(i, rowMap){
                    Scdp.CacheUtil.setPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, rowMap.cacheKey, rowMap.cacheObj);
                });
            }
        });
    }

    function getCacheKeyAndParams (compEle, menuCode, cacheKeyLst, comboList, treeList, pageCacheRefresh) {
        var xtype = compEle.attr("xtype");
        if(Scdp.ObjUtil.isEmpty(xtype)) {
            xtype = compEle.attr("coltype");
        }

        if("bCheckGroup" == xtype || "bRadioGroup" == xtype) {
            var comboType = "scdp_fmcode";
            var codeType = compEle.attr("codeType");
            var postdata = {};
            postdata.comboType = Scdp.StrUtil.replaceNull(comboType);
            postdata.codeType = Scdp.StrUtil.replaceNull(codeType);
            postdata.filterMap = {};
            var cacheKey = Scdp.StrUtil.getMd5(Scdp.JSON.encode(postdata));
            postdata.menuCode = Scdp.StrUtil.replaceNull(menuCode);
            var cacheKeyWithMenuCode = Scdp.StrUtil.getMd5(Scdp.JSON.encode(postdata));

            if(pageCacheRefresh == true) {
                if($.inArray(cacheKey,cacheKeyLst) ==-1) {
                    cacheKeyLst.push(cacheKey);
                    comboList.push({cacheKey:cacheKey,cacheKeyWithMenuCode:cacheKeyWithMenuCode, cacheObj: postdata});
                }
            } else {
                if(!Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithMenuCode)
                    && !Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKey) && ($.inArray(cacheKey,cacheKeyLst) ==-1)) {
                    cacheKeyLst.push(cacheKey);
                    comboList.push({cacheKey:cacheKey,cacheKeyWithMenuCode:cacheKeyWithMenuCode, cacheObj: postdata});
                }
            }

        } else if("bComboxSin" == xtype || "e_combobox" == xtype || "combobox" == xtype) {
            var comboType = Scdp.StrUtil.replaceNull(compEle.attr("combType"), "scdp_fmcode");
            var codeType = compEle.attr("codeType");
            var filterFields = compEle.attr("filterFields");
            var postdata = {};
            postdata.comboType = Scdp.StrUtil.replaceNull(comboType);
            postdata.codeType = Scdp.StrUtil.replaceNull(codeType);
            postdata.filterMap = getFilterMap(filterFields);
            var cacheKey = Scdp.StrUtil.getMd5(Scdp.JSON.encode(postdata));
            postdata.menuCode = Scdp.StrUtil.replaceNull(menuCode);
            var cacheKeyWithMenuCode = Scdp.StrUtil.getMd5(Scdp.JSON.encode(postdata));
            if(pageCacheRefresh == true) {
                if($.inArray(cacheKey,cacheKeyLst) ==-1) {
                    cacheKeyLst.push(cacheKey);
                    comboList.push({cacheKey:cacheKey,cacheKeyWithMenuCode:cacheKeyWithMenuCode, cacheObj: postdata});
                }
            } else {
                if(!Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithMenuCode)
                    && !Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKey) && ($.inArray(cacheKey,cacheKeyLst) ==-1)) {
                    cacheKeyLst.push(cacheKey);
                    comboList.push({cacheKey:cacheKey,cacheKeyWithMenuCode:cacheKeyWithMenuCode, cacheObj: postdata});
                }
            }

        } else if("e_combotree" == xtype || "e_combogrid" == xtype || "e_tree" == xtype || "combtree" == xtype) {
            var comboType = Scdp.StrUtil.replaceNull(compEle.attr("combType"), "scdp_fmcode");
            if("e_tree" == xtype) {
                comboType = compEle.attr("storeAction");
            }
            var filterFields = compEle.attr("filterFields");
            var itemId = compEle.attr("itemId");
            var postdata = {};
            postdata.comboType = Scdp.StrUtil.replaceNull(comboType);
            postdata.filterMap = getFilterMap(filterFields);
            //postdata.itemId = itemId;
            var cacheKey = Scdp.StrUtil.getMd5(Scdp.JSON.encode(postdata));
            postdata.itemId = Scdp.StrUtil.replaceNull(itemId);
            // tree 以ItemId 代替menuCode
            var cacheKeyWithMenuCode = Scdp.StrUtil.getMd5(Scdp.JSON.encode(postdata));
            if(pageCacheRefresh == true) {
                if($.inArray(cacheKey,cacheKeyLst) ==-1) {
                    cacheKeyLst.push(cacheKey);
                    treeList.push({cacheKey:cacheKey,cacheKeyWithMenuCode:cacheKeyWithMenuCode, cacheObj: postdata});
                }
                Scdp.CacheUtil.removePage(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithMenuCode);
            } else {
                if(!Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithMenuCode)
                    && !Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKey) && ($.inArray(cacheKey,cacheKeyLst) ==-1)) {
                    cacheKeyLst.push(cacheKey);
                    treeList.push({cacheKey:cacheKey,cacheKeyWithMenuCode:cacheKeyWithMenuCode, cacheObj: postdata});
                }
            }
        }
    }

    function getFilterMap(filterFields) {
        var filterMap = {};
        if (Scdp.ObjUtil.isNotEmpty(filterFields)) {
            var filter = Scdp.StrUtil.split(filterFields,",");
            $.each(filter, function (i,item) {
                if(item.indexOf(":") != -1) {
                    var itemMapping = Scdp.StrUtil.split(item,":");
                    filterMap[itemMapping[0]] = itemMapping[1];
                } else {
                    var itemMapping = Scdp.StrUtil.split(item,"|");
                    var value = null;
                    value = Scdp.StrUtil.replaceNull(value);
                    if (Scdp.ObjUtil.isNotEmpty(itemMapping[1])) {
                        filterMap[itemMapping[1]] = value;
                    } else {
                        filterMap[itemMapping[0]] = value;
                    }
                }
            });
        }
        return filterMap;
    }
};

/**
 * 重写框架中的getComboStoreDate，将action名和查询条件作为缓存的存储条件
 * @param comboType
 * @param codeType
 * @param menuCode
 * @param filterMap
 * @param needCache
 * @returns {*}
 */
Scdp.getComboStoreDate = function (comboType, codeType, menuCode, filterMap, needCache) {
    var postdata = {};
    postdata.comboType = Scdp.StrUtil.replaceNull(comboType);
    postdata.codeType = Scdp.StrUtil.replaceNull(codeType);

    postdata.filterMap = filterMap || {};

    var cacheKey = Scdp.StrUtil.getMd5(Scdp.JSON.encode(postdata));
    postdata.menuCode = Scdp.StrUtil.replaceNull(menuCode);

    var cacheKeyWithMenuCode = Scdp.StrUtil.getMd5(Scdp.JSON.encode(postdata));

    var cacheObj = Scdp.CacheUtil.getPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKey);
    var cacheObjWithMenuCode = Scdp.CacheUtil.getPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithMenuCode);

    if ((needCache === false) || (!Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithMenuCode)
        && !Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKey))) {
        postdata.cacheKey = cacheKey;
        postdata.cacheKeyWithMenuCode = cacheKeyWithMenuCode;

        var retData = Scdp.doAction("common-combostore-load", postdata, null, null, false, false);
        Scdp.DebugUtil.logInfo("Combo Type:" + postdata.comboType + " " + "Code Type:" + postdata.comboType + " " + "Filter:" + Scdp.JSON.encode(postdata.filterMap) + " Load Data from Server!");
        if (!retData && !retData.success) {
            return;
        }
        cacheObj = retData.root;
        var trueCacheKey = retData.cacheKey;
        Scdp.CacheUtil.setPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, trueCacheKey, cacheObj);
    } else if (Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithMenuCode)) {
        return cacheObjWithMenuCode;
    }

    return cacheObj;
};


/**
 * 获取combo的数据
 * @param daoType
 * @param codeType 当daotype 为 scdp_fmcode时，才使用
 * @param filterMap
 * @param notNeedAll
 * @param needCache
 */
Scdp.getComboxData = function (daoType, codeType, filterMap, notNeedAll, needCache) {
    var comboxdata = Scdp.getComboStoreDate(daoType, codeType, null, filterMap, needCache);
    if (!notNeedAll) {
        comboxdata.unshift({code: "", codedesc: "--全部--"});
    }
    return comboxdata;
}


/**
 * 打开页面方法
 * @param linkhref 页面路径
 * @param title 页面title
 * @param itemid 页面编码
 * @param menutype 页面类型
 * @param actionparams 页面参数
 * @param refresh 是否刷新页面
 */
Scdp.openTab = function (linkhref, title, itemid, menutype, actionparams, refresh,orgCtr) {
    var tabStrip = Scdp.ModuleManager.getObject("scdpNavTab");
    var tempParams = {};
    if (Scdp.ObjUtil.isNotEmpty(actionparams) && actionparams != 'null' && actionparams != 'undefined') {
        tempParams = actionparams;
    }
    if (menutype == Scdp.Const.MENU_TYPE_CTL) {
        Scdp.openTabCtrl(linkhref, title, itemid, menutype, tempParams, refresh, orgCtr);
        return
    }
    //判断裁断类型，如果不为目标页面  不能打开
    if (menutype != Scdp.Const.MENU_TYPE_URL) {
        return;
    }
    //更新路由信息
    Scdp.updateRoute(itemid);

    //获取页面url
    function getUrl() {
        if (linkhref.indexOf("ReportServer?") == -1) {
            return linkhref;
            //return '/framework/' + linkhref;
        } else {
            //获取当前用户的部门编码
            function getDeptCode() {
                var deptcode;
                var orgcode = Scdp.CacheUtil.get(Scdp.Const.USER_DEPARTMENT_CODE);
                deptcode = (orgcode == "*" || orgcode == "CENTER" || orgcode == "REPAIR" ? "OWNER" : orgcode);
                return deptcode;
            }

            //获取老系统编码
            function getOldCode() {
                var oldcode = "", deptcode = getDeptCode();
                if (deptcode.indexOf("_") > -1) {
                    oldcode = deptcode.substring(deptcode.lastIndexOf("_") + 1);
                }
                return oldcode;
            }

            //获取用户等级 0:最高级 1:营运公司 2:路段 3:收费站
            function getLevel() {
                var len, deptcode = getDeptCode();
                len = deptcode.split("_").length;
                len--;
                return len;
            }

            Scdp.DebugUtil.logInfo("current user deptcode = '" + getDeptCode() + "';oldcode = '" + getOldCode() + "';level = '" + getLevel() + "'");

            return window.SYSCONFIG_REPORT_SERVER_ADDR + linkhref + "&departmentcode=" + Scdp.CacheUtil.get(Scdp.Const.USER_DEPARTMENT_CODE) + //用户当前部门
                "&usercode=" + Scdp.CacheUtil.get(Scdp.Const.USER_ID) +
                "&deptcode=" + getDeptCode() + //用户路公司部门
                "&oldcode=" + getOldCode() + //用户所属部门的老系统编码 我编码则为空
                "&deptlevel=" + getLevel(); //当前用户所属部门等级 0:路公司以上级别 1:营运公司 2:路段 3:收费站
        }
    }

    //获取iframe
    function getFrame() {
        return '<iframe id="iframe_' + itemid + '" src="' + getUrl() + '" width="100%" height="100%" frameborder="0" scrolling="yes"  />';
    }

    //查找是否已经存在该tab
    var tabcount = tabStrip.isExist(itemid); //获取是否已存在该id的tab
    if (tabcount > 0) {
        tabStrip.select(itemid);//选中这个tabid的tab
    } else {
        var framehtml = getFrame();

        //添加tab页面
        tabStrip.addTab({
            tabId: itemid,
            title: title,
            content: framehtml
        });
        //是否为收藏页
        var isFavorite = false;
        var favorites = Scdp.getFavoriteMenus();
        for (var j in favorites) {
            var item = favorites[j];
            if (item.menuCode == itemid) {
                isFavorite = true;
            }
        }
        if (isFavorite) {
            tabStrip.setFavorite(itemid, true);
        } else {
            tabStrip.setFavorite(itemid, false);
        }
    }

    /**
     *移除不具备操作权限的按钮
     */
    function removeButtons(iframe, itemid) {
        var buttons = MP.getMenuButtonsPrivilege(itemid);
        if (buttons != null && buttons.length > 0) {
            for (var i = 0; i < buttons.length; i++) {
                var item = buttons[i];
                if (!item.authorized) { //判断按钮权限
                    var element = iframe.contentWindow.document.getElementById(item.funcCode);
                    if (element) {
                        //移除元素
                        element.parentNode.removeChild(element);
                        //element.style.display='none';
                    }
                }
                //$("#"+buttons[i].funcCode).css("display","none");
            }
        }
    }

    //页面参数 初始化
    var oldiframe = $("#iframe_" + itemid)[0];
    oldiframe && (oldiframe.contentWindow.actionparams = actionparams);
    //是否自动属性tab页面
    if ((refresh || refresh == 'true') && tabcount > 0 && oldiframe) {
        var parentIfram = $(oldiframe).parent();
        try {//跨域会拒绝访问，这里处理掉该异常
            oldiframe.contentWindow.document.write('');
            oldiframe.contentWindow.close();
        } catch (e) {
            //Do nothing
        }
        oldiframe.remove();
        if ($.browser && $.browser.msie) {
            CollectGarbage();
        }

        //创建新的iframe
        var iframe = document.createElement("iframe");
        iframe.src = linkhref;
        iframe.id = "iframe_" + itemid;
        iframe.frameBorder = 0;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.scrolling = 'yes';

        if (iframe.attachEvent) {
            iframe.attachEvent("onload", function () {
                removeButtons(this, itemid);
                //todo 去除等待加载界面
                //$([$mask[0], $maskMessage[0]]).fadeOut(params.iframe.delay || 'normal', function () {
                //    $(this).remove();
                //    if ($(this).hasClass('mask-message')) {
                //        $containterMask.fadeOut(params.iframe.delay || 'normal', function () {
                //            $(this).remove();
                //        });
                //    }
                //});
            });
        } else {
            iframe.onload = function () {
                removeButtons(this, itemid);
                //todo 去除等待加载界面
                //$([$mask[0], $maskMessage[0]]).fadeOut(params.iframe.delay || 'normal', function () {
                //    $(this).remove();
                //    if ($(this).hasClass('mask-message')) {
                //        $containterMask.fadeOut(params.iframe.delay || 'normal', function () {
                //            $(this).remove();
                //        });
                //    }
                //});
            };
        }

        parentIfram.append(iframe);
        //
        iframe.contentWindow.actionparams = actionparams;
    }
};

Scdp.openTabCtrl = function (linkhref, title, itemid, menutype, actionparams, refresh, orgCtr) {
    var tabStrip = Scdp.ModuleManager.getObject("scdpNavTab");
    if (Scdp.MainFrameEvents.fireEvent('beforeModuleOpen', linkhref, actionparams, itemid, menutype) === false)
        return;
    //判断裁断类型，如果不为目标页面  不能打开
    if (menutype == Scdp.Const.MENU_TYPE_CTL) {
        //更新路由信息
        Scdp.updateRoute(itemid);
        //查找是否已经存在该tab
        var tabcount = tabStrip.isExist(itemid); //获取是否已存在该id的tab
        if (tabcount > 0 && !refresh) {
            tabStrip.select(itemid);//选中这个tabid的tab
            return;
        }
        if(refresh) {
            //tabStrip.closeTab($("[href='#content_"+ itemid + "']"));
            if(orgCtr && typeof orgCtr == "object" && orgCtr.UDID && actionparams && typeof actionparams == "object") {
                Scdp.ModuleManager.putObject(orgCtr.UDID, orgCtr);
                actionparams.orgCtrUDID = orgCtr.UDID;
            }
        }
        //获取页面url
        Scdp.loadComponent(linkhref)
            .done(function(controller) {
                if(!!itemid) {
                    Scdp.CacheUtil.setTemp(Scdp.Const.CACHE_ACTIVE_MODULE, Scdp.Const.CACHE_ACTIVE_MODULE_KEY, itemid);
                }

                var param = {};
                var pagePath = controller.pagePath;
                if(pagePath) {
                    param.pagePath = pagePath;
                }
                var loadPageAction = Scdp.ObjUtil.isEmpty(controller.loadPageAction)?Scdp.Const.COMMON_LOADPAGE:controller.loadPageAction;
                Scdp.loadFreeMarkerPage(loadPageAction, param, function(data, status){
                    var framehtml = '<div style="z-index:-1" id="iframe_' + itemid + '" >' + data + '</div>';

                    framehtml = framehtml;
                    //添加tab页面
                    tabcount = tabStrip.isExist(itemid);
                    if(tabcount>0 && refresh) {
                        tabStrip.refresh(itemid, framehtml);
                    } else if(tabcount >0 && !refresh) {
                        return;
                    } else {
                        tabStrip.addTab({tabId: itemid,
                            title: title,
                            content: framehtml,
                            mask:true
                        });
                    }

                    var t = setTimeout(function(){
                        Scdp.initComboStores($("#iframe_" + itemid), itemid, controller.pageCacheRefresh);

                        $.parser.parse($("#iframe_" + itemid));
                        $.parser.onComplete = function () {
                            tabStrip.removeMask(itemid);
                        };

                        Scdp.bootstrapParse($("#iframe_" + itemid), controller, itemid, true).done(function(){
                            controller.init($("#iframe_" + itemid), actionparams, itemid, title);
                            Scdp.registDoLayout($("#iframe_" + itemid));
                            //console.log("controller先");
                            Scdp.eaysUiQueryPanelCollapse($("#iframe_" + itemid));
                            Scdp.easyUiLayoutResize($("#iframe_" + itemid));
                            Scdp.initDragableResize();
                        });
                        tabStrip.removeMask(itemid);
                        //console.log("Mask先");
                    }, 10);
                    //var t2 = setTimeout(function(){
                    //    tabStrip.removeMask(itemid);
                    //}, 10);
                    //添加收藏菜单
                    //是否为收藏页
                    if(tabcount<=0) {
                        var isFavorite = false;
                        var favorites = Scdp.getFavoriteMenus();
                        for (var j in favorites) {
                            var item = favorites[j];
                            if (item.menuCode == itemid) {
                                isFavorite = true;
                            }
                        }
                        if (isFavorite) {
                            tabStrip.setFavorite(itemid, true);
                        } else {
                            tabStrip.setFavorite(itemid, false);
                        }
                    }
                },function() {
                    throw new Error("Can not load Module " + linkhref)
                })
            })
            .fail(function() {
                throw new Error("Can not load Module " + linkhref)
            });
        return;
    }
};
Scdp.eaysUiQueryPanelCollapse = function (framePanel) {
    if(!Scdp.getSysConfig("pure_bootstrap")) {
        if ($(framePanel).find("[itemid='conditionPanel']").length > 0) {
            var conditionPanel = $(framePanel).find("[itemid='conditionPanel']");
            var panelBody = conditionPanel.children(".box-body");
            var showRows = conditionPanel.attr("showrows");
            var orgHeight = conditionPanel.data("orgHeight");
            if (Scdp.ObjUtil.isNotEmpty(showRows) && $.isNumeric(showRows) && orgHeight == null) {
                var rows = parseInt(showRows);
                var groups = conditionPanel.find(".form-group");
                var rowHeight = 31;
                if (groups.length > 0) {
                    rowHeight = $(groups[0]).height();
                    if (rowHeight < 31) {
                        rowHeight = 31;
                    }
                }

                var orgPanelBodyHeight = panelBody.outerHeight();
                conditionPanel.data("orgHeight", orgPanelBodyHeight);

                var padTop = parseInt(panelBody.css('padding-top'));
                var padBot = parseInt(panelBody.css('padding-bottom'));
                panelBody.css("overflow-y", "hidden");
                var bodyHeight = rowHeight * rows + padTop + padBot;
                panelBody.css("height", bodyHeight + 'px');
                panelBody.css("overflow-y", "hidden");
                panelBody.mCustomScrollbar({autoHideScrollbar: true, autoDraggerLength: true});
                conditionPanel.data("collapseHeight", panelBody.outerHeight());
                conditionPanel.data("isCollapse", 1);
            } else {
                var isCollapse = conditionPanel.data("isCollapse");
                if(isCollapse && isCollapse ==1) {
                    conditionPanel.find("[itemid='moreCondition']>span").text("收起条件");
                    conditionPanel.find("[itemid='moreCondition']>i").removeClass("fa-angle-double-down").addClass("fa-angle-double-up");

                    var orgHeight = conditionPanel.data("orgHeight");
                    panelBody.animate({height: orgHeight + 'px'}, function () {
                        Scdp.easyUiLayoutResize(framePanel);
                    });
                    conditionPanel.data("isCollapse", 0);
                } else {
                    conditionPanel.find("[itemid='moreCondition']>span").text("更多条件");
                    conditionPanel.find("[itemid='moreCondition']>i").removeClass("fa-angle-double-up").addClass("fa-angle-double-down");
                    var collapseHeight = conditionPanel.data("collapseHeight");
                    panelBody.animate({height: collapseHeight + 'px'}, function () {
                        Scdp.easyUiLayoutResize(framePanel);
                    });
                    conditionPanel.data("isCollapse", 1);
                }
            }
        }
    }
};

Scdp.easyUiLayoutResize = function (framePanel) {
    var windowHeight = $(window).height();
    var footerOffset = windowHeight;
    if($('footer.main-footer').length>0) {
        footerOffset = $('footer.main-footer').offset().top;
    }


    if(!Scdp.getSysConfig("pure_bootstrap")) {
        if($(framePanel).find("[itemid='resultPanel'] .datagrid>.panel-body").length>0 && $(framePanel).find("[itemid='resultPanel'] .datagrid>.panel-body").is(':visible')) {
            var offsetTop = $(framePanel).find("[itemid='queryPanel']>[itemid='resultPanel'] .datagrid>.panel-body").offset().top;

            $(framePanel).find("[itemid='queryPanel']>[itemid='resultPanel'] [xtype='e_datagrid']").datagrid("resize",{minHeight:footerOffset-offsetTop-15});
        }
        if($(framePanel).find("[itemid='resultPanel'] .bootstrap-table>.fixed-table-toolbar").length>0 && $(framePanel).find("[itemid='resultPanel'] .bootstrap-table>.fixed-table-toolbar").is(':visible')) {
            var offsetTop = $(framePanel).find("[itemid='queryPanel']>[itemid='resultPanel'] .bootstrap-table>.fixed-table-toolbar").offset().top;
            $(framePanel).find("[itemid='queryPanel']>[itemid='resultPanel'] [xtype='bt_table']").bootstrapTable("resetView",{height:footerOffset-offsetTop-15});
        }

        if($(framePanel).find("[itemid='editPanel']").length>0) {
            var editpanelOffsetTop = $(framePanel).find("[itemid='editPanel']").offset().top;
            var querypanelOffsetTop = null;
            if($(framePanel).find("[itemid='queryPanel']").length>0) {
                querypanelOffsetTop = $(framePanel).find("[itemid='queryPanel']").offset().top;
            }
            var editpanelOffsetTop = $(framePanel).find("[itemid='editPanel']").offset().top;
            var desktopContentOffset = $(".tab-content").offset().top;
            var stdOffsetTop = null;
            if(querypanelOffsetTop && querypanelOffsetTop >0) {
                stdOffsetTop = querypanelOffsetTop;
            } else {
                stdOffsetTop = desktopContentOffset;
            }
            $(framePanel).find("[itemid='editPanel']").css({minHeight: footerOffset - stdOffsetTop - 15});
            // $(framePanel).find(".scdp-view-left").css({height: footerOffset - desktopContentOffset - 15,overflowY: 'hidden'});

            /**
             * author:王令 修改开始
             * time: 2017-9-22
             * describe:编辑界面，定义界面的高度，编辑内容的高度，目的是固定操作栏位置
             */
            if($(framePanel).find("[itemid='editPanelContent']").length>0)
            {
                $(framePanel).find("[itemid='editPanelContent']").css({height: footerOffset - 120 -72,overflowY:'auto'});
                $(framePanel).find("[itemid='editPanel']").css({height: footerOffset - 120,overflowY:'hidden'});
            }

            if($(framePanel).find("[itemid='queryPanel']>[itemid='queryPanelContent']").length>0)
            {
               var queryContentTop = $(framePanel).find("[itemid='queryPanel']>[itemid='queryPanelContent']").height();
                Scdp.Const.dataGridHeight = footerOffset-queryContentTop-120;
                //为了兼容分辨率特别低的情况，就不做屏幕高度处理，直接设置表格的高度为500
                if(Scdp.Const.dataGridHeight<500)
                {
                    Scdp.Const.dataGridHeight=500;
                }
            }
            /**
             * author:王令 修改结束
             * */
        }
    }
};
Scdp.updateRoute = function (itemid) {
    var a = null;
    var loadMenuInfo = function (a, b) {
        var c = null;
        if (Scdp.ObjUtil.isEmpty(b)) {
            var d = Scdp.CacheUtil.getTemp(Scdp.Const.CACHE_TYPE_SYS_MENU, "{}", !0, !0);
            Scdp.ObjUtil.isNotEmpty(d) && (d = d.treeData.menu,
            Scdp.ObjUtil.isNotEmpty(d) && Scdp.ObjUtil.isNotEmpty(d.items) && (b = d.items))
        }
        Scdp.ObjUtil.isNotEmpty(b) && $.each(b, function (i,b) {
            if (null != c)
                return !1;
            var d = b.menuType;
            if (b.menu && "MENU_DIR" == d && Scdp.ObjUtil.isNotEmpty(b.menu.items)) {
                c = loadMenuInfo(a, b.menu.items)
            } else if ("MENU_ITEM_CTL" == d && a == b.menuCode) {
                c = b
            }
        });
        return c;
    };
    a = loadMenuInfo(itemid, null);
    var routeHtml = "";
    if (a != null && Scdp.ObjUtil.isNotEmpty(a.route)){
        var route = a.route.split("->");
        $.each(route, function (i, menuName) {
            if (i == 0){
                routeHtml += '<li><i class="fa fa-dashboard"></i> ' + menuName + '</li>'
            } else if (i == (route.length - 1)){
                routeHtml += '<li class="active">' + menuName + '</li>';
            } else {
                routeHtml += '<li>' + menuName + '</li>';
            }
        });
    } else {
        if (itemid == "home" || itemid == "indexmenu")itemid = "桌面";
        routeHtml = '<li><i class="fa fa-dashboard"></i> ' + itemid + '</li>'
    }
    $(".route .breadcrumb-footer").html(routeHtml);
};

Scdp.loadWorkflowDefinitionKey = function (menuCode) {
    var postdata = {};
    postdata.menuCode = menuCode;
    var cacheKeyWithMenuCode = Scdp.StrUtil.getMd5(Scdp.JSON.encode(postdata));
    var workFlowDefinitionKey = null;
    var retData = null;
    if(!Scdp.CacheUtil.pageContainsKey(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithMenuCode)) {
        retData = Scdp.doAction("workflow-def-key-query-action", postdata, null, null, true, false);
        Scdp.CacheUtil.setPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithMenuCode, retData);
    } else {
        retData =  Scdp.CacheUtil.getPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, cacheKeyWithMenuCode);
    }
    if (retData.lstWorkFlowDefinitionKey) {
        workFlowDefinitionKey = retData.lstWorkFlowDefinitionKey[0];
    }
    return workFlowDefinitionKey;
}

/**
 * 显示mask等待信息
 * @param id 标签的id
 */
Scdp.mask = function (id) {
    var selector = "";
    if(id != null && id!=true && $(id).length>0){
        selector = '#content_'+ Scdp.getActiveModule();
    } else if(Scdp.getActiveModule() != null) {
        selector = '#content_'+ Scdp.getActiveModule();
    } else {
        selector = 'body';
    }
    id = Scdp.ObjUtil.isEmpty(id) || id == true || id == 'true' ? selector : id;
    //$("<div style='z-index: 10000;' class=\"datagrid-mask\"><i class=\"fa fa-refresh\"></i></div>").css({
    //    display: "block",
    //    width: "100%",
    //    height: $(window).height()
    //}).appendTo(id);
    //$("<div style='z-index: 10000;' class=\"datagrid-mask-msg\"></div>").html(Scdp.I18N.MASK_WAITING).appendTo(id).css({
    //    display: "block",
    //    height: 40,
    //    //padding:"5 5 10 30",
    //    left: ($(document.body).outerWidth(true) - 190) / 2,
    //    top: ($(window).height() + 100) / 2
    //});
    //$('<div style="z-index: 10000;"><div class="loader-inner line-scale"><div></div><div></div><div></div><div></div><div></div></div></div>').appendTo(id).css({
    //    display: "block",
    //    height: 40,
    //    //padding:"5 5 10 30",
    //    left: ($(document.body).outerWidth(true) - 190) / 2,
    //    top: ($(window).height() + 100) / 2
    //});

    var mask = '<div id="loading" class="loading-mask-action" > '+
            //'<h4>加载中....</h4>' +
        '<div class="loader" style="position: absolute; left: calc(50% - 20px); top: calc(50% - 20px);"><div class="loader-inner line-scale"><div></div><div></div><div></div><div></div><div></div></div></div>'+
            //'<div class="fl spinner3" style="position: absolute; left: calc(50% - 20px); top: calc(50% - 20px);"><div class="dot1"></div><div class="dot2"></div></div>' +
        '</div>';
    $(mask).appendTo(id);
}

/**
 * 隐藏mask显示
 */
Scdp.unmask = function () {
    var datagridMask = $(".loading-mask-action");
    //var datagridMaskMsg = $(".loader-inner");
    (datagridMask.length > 0) && datagridMask.remove();
    //(datagridMaskMsg.length > 0) && datagridMaskMsg.remove();
};

Scdp.saveData = function (actionurl, viewData, uistatus, dtoclass, modulePath, uniqueValidateFields, successFn, failureFn) {
    var postdata = {};
    postdata.viewdata = viewData;
    postdata.dtoClass = dtoclass;
    postdata.uistatus = uistatus;
    postdata.modulePath = modulePath;
    postdata.uniqueValidateFields = uniqueValidateFields;
    return Scdp.doAction(actionurl, postdata, successFn, failureFn, true, true);
};

Scdp.deleteDataByUnids = function (uuids, actionurl, dtoClass, isVoid, callback) {
    var postdata = {};
    postdata.uuids = uuids;
    postdata.dtoClass = dtoClass;
    postdata.isVoid = !!isVoid;
    return Scdp.doAction(actionurl, postdata, callback);
};

/**
 * 获取查询条件
 * @param formItemId 查询条件的formItemId
 * @returns {{}}
 */
Scdp.getFormData = function (formItemId) {
    var postData = {};
    $("[itemId=" + formItemId + "]").serializeArray().map(function (x) {
        if (Scdp.ObjUtil.isNotEmpty(x.value)) {
            postData[x.name] = x.value;
        }
    });
    //判断form中存在check未选中项,并赋值为0
    $('input[type=checkbox]', "[itemId=" + formItemId + "]").not("input:checked").map(function (value, obj) {
        postData[obj.name] = 0;
    });
    return postData;
}

/**
 * 公共参数处理
 * @param actionName 请求名
 * @param viewdata 业务参数
 * @returns {*|{}}
 */
Scdp.commonParamsFactory = function (actionName, viewdata) {
    var b = b || {};
    "sys-user-login" !== actionName && (b.userId = Scdp.CacheUtil.get(Scdp.Const.USER_ID));
    b.userLocaleId = Scdp.getSysConfig("locale_id");
    b.timestamp = Date.now();
    b.network = window.NETWORK_DELAY;
    //Scdp.ObjUtil.isEmpty(b.menuCode) && (b.menuCode = Scdp.getActiveModule() ? Scdp.getActiveModule().menuCode : null );
    b.viewdata = viewdata;
    b.signature = Scdp.getSign(actionName, b);
    return b;
}

/**
 * 查询条件封装函数
 */
Scdp.searchParams = function (actionName, formItemId) {
    return Scdp.commonParamsFactory(actionName, Scdp.getFormData(formItemId));
}

/**
 * 通过页面获取用户页面按钮权限
 * （此权限为禁止使用权限）
 * @param menucode 菜单编码
 */
Scdp.getMenuButtonsPrivilege = function (menucode) {
    var functions = null;
    var menuArr = Scdp.CacheUtil.get(Scdp.Const.USER_PRIVILEGES);
    var menu = menuArr[menucode];
    if (Scdp.ObjUtil.isNotEmpty(menu)) {
        functions = menu.functionList;
    }
    return functions;
}

/**
 * 获取用户收藏页面
 */
Scdp.getFavoriteMenus = function () {
    var menus = Scdp.CacheUtil.getTemp(Scdp.Const.CACHE_TYPE_SYS_MENU, {}, !0, !0);
    var favorites = menus.userFavorites;
    return favorites;
}


Scdp.getCurrentUserId = function () {
    return Scdp.CacheUtil.get(Scdp.Const.USER_ID);
};

Scdp.getUserCountry = function () {
    return Scdp.CacheUtil.get(Scdp.Const.USER_COUNTRY_CODE);
};

Scdp.getUserCity = function () {
    return Scdp.CacheUtil.get(Scdp.Const.USER_CITY_CODE);
};

Scdp.getUserCurrency = function () {
    return Scdp.CacheUtil.get(Scdp.Const.USER_CURRENCY_CODE);
};

Scdp.wrapDataForRemoveSystemFields = function (data) {
    if (Scdp.ObjUtil.isEmpty(data)) {
        return;
    }

    if (data instanceof Array) {
        $.each(data, function (dataItem) {
            Scdp.wrapDataForRemoveSystemFields(dataItem);
        })
    } else if (data instanceof Object) {
        for (var item in data) {
            if (!data.hasOwnProperty(item)) continue;//防止获得原型链中的属性

            if ((item == 'createBy') || (item == 'createTime') || (item == 'updateBy') || (item == 'updateTime')
                || (item == 'isVoid') || (item == 'locTimezone') || (item == 'tblVersion') || (item == 'uuid')) {
                data[item] = null;
            } else if (item == 'editflag') {
                data[item] = '+';
            } else if (data[item] instanceof Array || data[item] instanceof Object) {
                Scdp.wrapDataForRemoveSystemFields(data[item]);
            }
        }
    }
};

Scdp.getExportFileName = function (moduleName, template) {
    var filename = Scdp.StrUtil.replaceAll(template, '{module}', moduleName);
    var datePatten = template.match(/\{D(.*)}/);
    if (datePatten !== null && datePatten.length == 2) {
        var mon = moment(new Date(Date.now()));
        filename = Scdp.StrUtil.replaceAll(filename, datePatten[0],
            mon.format(datePatten[1]));
    }
    return filename;
};


/**
 * 日期格式化
 * @param date
 * @returns {string}
 */
Scdp.dateFormatter = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
}

/**
 * 时间格式化
 * @param datetime
 * @returns {*}
 */
Scdp.datetimeFormatter = function (datetime) {
    if (datetime == null || datetime == "")
        return "";
    else {
        var date = new Date(datetime);
        var y = date.getFullYear();
        var mon = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        return y + '-' + (mon < 10 ? ('0' + mon) : mon) + '-' + (d < 10 ? ('0' + d) : d) + ' ' + (h < 10 ? ('0' + h) : h) + ':' + (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s);
    }
}

/**
 * 将日期格式(yyyy-MM-dd)的字符串值转化为日期类型
 * @param s
 * @returns {Date}
 */
Scdp.dateParser = function dateParser(s) {
    if (!s) return new Date();
    var ss = (s.split('-'));
    var y = parseInt(ss[0], 10);
    var m = parseInt(ss[1], 10);
    var d = parseInt(ss[2], 10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
        return new Date(y, m - 1, d);
    } else {
        return new Date();
    }
};

/**
 * 日期比较
 * @param startDate
 * @param endDate
 * @returns {boolean}
 */
Scdp.dateCompare = function (startDate, endDate) {
    debugger;
    if (Scdp.dateParser(startDate) > Scdp.dateParser(endDate))
    {
        return false;
    }
    else
        return true;
}

/**
 * 检查日期是否合法
 * @param date   yyyy-MM-dd
 * @returns {boolean}
 */
Scdp.dateCheck = function (date) {
    return (new Date(date).getDate() == date.substring(date.length - 2));
}

/**
 * 检查时间是否合法
 * @param date yyyy-MM-dd hh:mm:ss
 * @returns {boolean}
 */
Scdp.timeCheck = function (date) {
    return (new Date(date).getSeconds() == date.substring(date.length - 2));
}

Scdp.setFavoriteMenu = function () {
    var count = 0;
    var favorite = Scdp.getFavoriteMenus();
    if (favorite) {
        count = favorite.length;
    }
    var html = "";
    for (var i in favorite) {
        var moduleData = favorite[i];
        html += '<li style="width:100%;float: left "><a href="javascript:void(0)"  class="taglink" itemId="' + moduleData.menuCode +
            '" menutype="' + moduleData.menuType + '" actionparams="' + moduleData.actionParams +
            '" taglinkref="' + moduleData.menuAction + '" title="' + moduleData.text + '" style="float: left;width: 90%;vertical-align: middle">' +
            '<i class="fa fa-circle-o text-aqua"></i> <span>' + moduleData.text + '</span>' +
            '</a><i style="cursor:pointer" itemId="favoriteliremove" menucode="' + moduleData.menuCode + '" class="fa fa-trash favoretRemove"></i></li>';
    }
    $("#favoritemenu").children().remove();
    $("#favoritemenu").append(html);
    //设置收藏页个数
    $("#favoritecount").text(count);
    $("#favoriteheader").text("你有" + count + "个收藏页面");

    //注册收藏菜单点击事件
    $("#favoritemenu a").click(function (e) {
        if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
            var title = $(this).attr("title") == "" ? $(this).text() : $(this).attr("title");
            var linkhref = $(this).attr("taglinkref");
            var itemid = $(this).attr("itemid");
            var timestamp =  new Date().getTime();
            if(Scdp.ObjUtil.isNotEmpty(Scdp.CacheUtil.getTemp(Scdp.Const.CACHE_MODULE_TAB, itemid)) && (timestamp - Scdp.CacheUtil.getTemp(Scdp.Const.CACHE_MODULE_TAB, itemid)) < 3000) {
                return;
            } else {
                Scdp.CacheUtil.setTemp(Scdp.Const.CACHE_MODULE_TAB, itemid, new Date().getTime())
            }
            //判断页面类型
            var menutype = $(this).attr("menutype");
            //参数设置
            var actionparams = $(this).attr("actionparams");
            Scdp.openTab(linkhref, title, itemid, menutype, actionparams);
        }
    });
    //注册删除按钮点击事件
    $("#favoritemenu [itemId=favoriteliremove]").click(function (e) {
        var itemid = $(this).attr("menucode");
        //改变一打开收藏也的图标
        var star= $("#navtabstrip [itemId=star]")
        //删除收藏
        Scdp.removeFavorite(itemid, star);
    });
}

/**
 * 添加收藏页
 * @param menuCode
 * @param star 收藏按钮对象
 */
Scdp.addFavorite = function (menuCode, star) {
    Scdp.Msg.confirm("提示", Scdp.I18N.ADD_TO_MY_FAVORITE, function (ok) {
        if (ok) {
            if (star) {
                star.removeClass();
                star.addClass("fa fa-star");
            }
            Scdp.doAction("sys-menu-add-favorite", {
                menuCode: menuCode
            }, function (a) {
                var sys_menu = Scdp.CacheUtil.getTemp(Scdp.Const.CACHE_TYPE_SYS_MENU, {}, !0, !0);
                sys_menu.userFavorites = a.userFavorites;
                Scdp.CacheUtil.setTemp(Scdp.Const.CACHE_TYPE_SYS_MENU, {}, sys_menu, !0, !0);
                Scdp.setFavoriteMenu();
            })
        }
    })
}

/**
 * 删除收藏页
 * @param menuCode
 * @param star 收藏按钮对象
 */
Scdp.removeFavorite = function (menuCode, star) {
    Scdp.Msg.confirm("提示", Scdp.I18N.REMOVE_FROM_MY_FAVORITE, function (ok) {
        if (ok) {
            if (star) {
                star.removeClass();
                star.addClass("fa fa-star-o");
            }
            Scdp.doAction("sys-menu-remove-favorite", {
                menuCode: menuCode
            }, function (a) {
                var sys_menu = Scdp.CacheUtil.getTemp(Scdp.Const.CACHE_TYPE_SYS_MENU, {}, !0, !0);
                sys_menu.userFavorites = a.userFavorites;
                Scdp.CacheUtil.setTemp(Scdp.Const.CACHE_TYPE_SYS_MENU, {}, sys_menu, !0, !0);
                Scdp.setFavoriteMenu();
            })
        }
    })
}

Scdp.uploadFile = function (uploadaction, windowId, fileId, buttonId, caller, oldfile, callback) {
    Scdp.calPopupWindowPosition(windowId, caller);
    caller.view.getCmp(windowId).modal({backdrop: 'static', keyboard: false});
    caller.view.getCmp(windowId).modal('show');
    caller.view.getCmp(windowId).getCmp(buttonId).sotEnable();
    if(oldfile){
        caller.view.getCmp(windowId).getCmp(fileId).sotValue(oldfile);
    }
    caller.view.getCmp(windowId).getCmp(buttonId).bind('click',function(e){
        var param = {};
        caller.view.getCmp(windowId).getCmp(buttonId).sotDisable();
        var fileName = caller.view.getCmp(windowId).getCmp(fileId).gotValue();
        param.type = fileName.slice(fileName.lastIndexOf(".")+1);
        param.fileName = fileName;
        param.actionName = uploadaction;
        if(Scdp.ObjUtil.isEmpty(param.fileName)) {
            return;
        }
        caller.view.getCmp(fileId).bFile("uploadFiles", param,
            function (data) {
                if(data.success) {
                    caller.view.getCmp(windowId).modal('hide');
                    Scdp.Msg.info("上传成功！");
                    var fileData = data.fileData;
                    if(callback){
                        callback(fileData);
                    }
                }
            }, null, null,null, null, function(e){});
    })
};

Scdp.fileDownLoad = function (fileList) {
    if (Scdp.ObjUtil.isEmpty(fileList)) {
        Scdp.Msg.info("请选择记录！");
    } else {
        var postData = {};
        postData.uuids = fileList;
        var ret = Scdp.doAction("filemanager-filedownload", postData, function(ret){
            var urlList = ret.URL_LIST;
            if (urlList && urlList.length > 0) {
                for (var i = 0; i < urlList.length; i++) {
                    window.open(urlList[i]);
                }
            }
        }, null, false, false);
    }
};

Scdp.popWindow = function (linkhref, title, itemid, actionparams, width, showbtn, callback) {
    var modalId = "popWindowModal" + itemid;
    var closeBtnId = "popWinCloseBtn" + itemid;
    var bottomCloseBtnId = "popWinCloseBtnBottom" + itemid;
    var okBtnId = "popWinOkBtn" + itemid;
    var winHtml = '<div class="modal fade popup-modal" id="'+ modalId  + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';

    if(width) {
        winHtml += '<div class="modal-dialog" style="width: '+ width+'">';
    } else {
        winHtml += '<div class="modal-dialog">';
    }
    winHtml += '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" id="'+ closeBtnId + '"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
        '<h5 class="modal-title" id="popWindowTitle"><i class="fa fa-file-text" style="color: #337ab7; padding-right: 2px;"></i>'+ title + '</h5>' +
        '</div>' +
        '<div class="modal-body"><style>#'+ modalId + ' .col-xs-12,.col-sm-12,.col-md-12,.col-lg-12{float: none}</style>' +
        ' </div>' + showButton(showbtn) +
        '</div>' +
        '</div>' +
        '</div>';
    $("body").append(winHtml);

    var modal = $('#'+ modalId);
    //控制弹窗高度
    var height = showbtn ? "calc(100vh - 181px)" : "calc(100vh - 108px)";
    modal.find(".modal-dialog .modal-body").css({"maxHeight": height, "overflow": "hidden"});

    modal.find(".modal-dialog .modal-body").slimscroll({
        height: 'inherit',
        alwaysVisible: false,
        size: "3px"
    });
    //结束

    modal.modal({backdrop: 'static', keyboard: false}).show();
    modal.on("show.bs.modal", function(e){
        $('#' + modalId).off("click.dismiss.bs.modal");
    });
    modal.on("hidden.bs.modal", function(e){
        if(e.target == $('#' + modalId)[0]) {
            $('#' + modalId,$("body")).remove();
        }
    });
    $("#" + closeBtnId).on("click", function(e){
        $('#'+ modalId).modal("hide");
    });
    $("#" + bottomCloseBtnId).on("click", function(e){
        $('#'+ modalId).modal("hide");
    });
    var popController = null;
    $("#" + okBtnId).on("click", function(e){
        if(popController && popController.validate){
            if(popController.validate()){
                $('#' + modalId).modal("hide");
            } else {
                return;
            }
        } else {
            $('#' + modalId).modal("hide");
        }
        if(callback && popController){
            var postdata = null;
            if(popController.prepareCallBackData){
                postdata = popController.prepareCallBackData();
            } else {
                postdata = popController.view.gotValue();
            }
            callback(postdata);
        }
    });
    function showButton(showbtn){
        if(showbtn && showbtn == true){
            return ' <div class="modal-footer">' +
                '<button type="button" id="' + bottomCloseBtnId + '" class="btn btn-default" data-dismiss="modal">取消</button>' +
                '<button type="button" id="' + okBtnId +'" class="btn btn-primary">确定</button>' +
                '</div>';
        } else {
            return '';
        }
    };
    //setTimeout(function(){
    Scdp.loadComponent(linkhref)
        .done(function(controller) {
            //if(!!itemid) {
            //    Scdp.CacheUtil.setTemp(Scdp.Const.CACHE_ACTIVE_MODULE, Scdp.Const.CACHE_ACTIVE_MODULE_KEY, itemid);
            //}

            var params = actionparams || {};
            if(controller.pagePath){
                params.pagePath = controller.pagePath;
            }
            Scdp.loadFreeMarkerPage(Scdp.ObjUtil.isEmpty(controller.loadPageAction)?Scdp.Const.COMMON_LOADPAGE:controller.loadPageAction, params, function(data, status){
                $("#" + modalId +" .modal-body").append(data);
                Scdp.initComboStores($('#' + modalId), itemid, controller.pageCacheRefresh);
                if(typeof($.parser) != 'undefined' && typeof($.parser) != 'null') {
                    $.parser.parse($('#' + modalId));
                }
                Scdp.bootstrapParse($('#' + modalId), controller, itemid);
                controller.init($('#' + modalId), params, itemid, title);
                popController = controller;
                Scdp.calPopupWindowPositionWithController(modalId);
            })
        })
        .fail(function() {
            throw new Error("Load component " + linkhref + " fail !");
        });
    //}, 200);

};

Scdp.popupSearch = function (caller, queryWinId, queryConditionPanelId, queryResultGridId, queryConditionFormId, reffield, queryAction, postdata, callback, dblclickaction, multiple) {
    Scdp.calPopupWindowPosition(queryWinId, caller);
    //控制弹窗高度
    var height = "calc(100vh - 181px)";
    caller.view.getCmp(queryWinId).find(".modal-dialog .modal-body").css({"maxHeight": height, "overflow": "hidden"});
    // $winHtml.find(".modal-dialog,.modal-content").css({"maxHeight": "calc(100vh - 60px)", "overflow": "hidden"});
    caller.view.getCmp(queryWinId).find(".modal-dialog .modal-body").slimscroll({
        height: 'inherit',
        alwaysVisible: false,
        size: "3px"
    });
    //结束


    caller.view.getCmp(queryWinId).modal({backdrop: 'static', keyboard: false});
    caller.view.getCmp(queryWinId).on('shown.bs.modal', function () {
        $(this).doLayout();
    });
    caller.view.getCmp(queryWinId).modal('show');
    var conditionPanel = caller.view.getCmp(queryWinId).getCmp(queryConditionPanelId);
    if (Scdp.ObjUtil.isNotEmpty(postdata) && Scdp.ObjUtil.isNotEmpty(queryConditionFormId)) {
        conditionPanel.getCmp(queryConditionFormId).sotValue(postdata);
    }
    caller.view.getCmp(queryWinId).getCmp("queryButton").unbind('click').bind('click', function (e) {
        var param = conditionPanel.bPanel("gotCondition");
        //me._resultTableLoadData(param, queryAction);
        param.btnQuery = 1;
        param.actionName = queryAction;
        param.xtype = "e_datagrid";
        var resultGrid = caller.view.getCmp(queryWinId).getCmp(queryResultGridId);
        param.columns = resultGrid.datagrid('getColumnFields');
        resultGrid.data("datagrid").options.loader =
            function (param, success, error) {
                Scdp.loadFreeMarkerAction(param.actionName, param, function (data) {
                    success(data);
                }, function (e) {
                    error(e);
                });
            };
        resultGrid.datagrid('load', param);
        resultGrid.data("datagrid").options.onDblClickRow = function (index, row) {
            if(Scdp.ObjUtil.isNotEmpty(dblclickaction)) {
                dblclickaction(index,row);
            }
        }
    });
    if(caller.view.getCmp(queryWinId).getCmp("resetBtn") && caller.view.getCmp(queryWinId).getCmp("resetBtn") != null){
        caller.view.getCmp(queryWinId).getCmp("resetBtn").unbind('click').bind('click', function (e) {
            conditionPanel.getCmp(queryConditionFormId).sotValue(null);
        });
    }
    if(caller.view.getCmp(queryWinId).getCmp("cancelBtn") && caller.view.getCmp(queryWinId).getCmp("cancelBtn") != null){
        caller.view.getCmp(queryWinId).getCmp("cancelBtn").unbind('click').bind('click', function (e) {
            caller.view.getCmp(queryWinId).modal('hide');
        });
    }
    if(caller.view.getCmp(queryWinId).getCmp("okBtn") && caller.view.getCmp(queryWinId).getCmp("okBtn") != null){
        caller.view.getCmp(queryWinId).getCmp("okBtn").unbind('click').bind('click', function (e) {
            var selections = caller.view.getCmp(queryWinId).getCmp(queryResultGridId).datagrid("getSelections");
            if(Scdp.ObjUtil.isEmpty(selections)){
                Scdp.Msg.warn("请选择一条记录！");
            } else {
                var selectRecord = selections[0];
                if(Scdp.ObjUtil.isNotEmpty(reffield)) {
                    var fields = reffield.split(",");
                    for(var i = 0; i < fields.length; i++){
                        var field = fields [i];
                        if(field.indexOf("|") != -1){
                            field = field.split("|");
                            caller.view.getCmp(field[0]).sotValue(selectRecord[field[1]]);
                        } else {
                            caller.view.getCmp(field).sotValue(selectRecord[field]);
                        }
                    }
                }
                if (callback) {
                    if(multiple) {
                        callback(selections);
                    } else {
                        callback(selectRecord);
                    }
                }
                caller.view.getCmp(queryWinId).modal('hide');
            }
        });
    }

};

Scdp.popupSearchColWin = function (linkhref, title, actionparams, queryResultGridId, style, callback, dblclickaction) {

    queryResultGridId = queryResultGridId || "resultGrid";

    var winId = "popupSearchColWin_" + Scdp.StrUtil.getUUID();

    var winHtml = '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';

    if(style) {
        winHtml += '<div class="modal-dialog" style="'+ style + '">';
    } else {
        winHtml += '<div class="modal-dialog modal-lg">';
    }
    winHtml += '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
        '<h5 class="modal-title" id="popWindowTitle"><i class="fa fa-file-text" style="color: #337ab7; padding-right: 2px;"></i>'+ title + '</h5>' +
        '</div>' +
        '<div class="modal-body">' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
        '<button type="button" itemId="okBtn" class="btn btn-primary">确定</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    var $winHtml = $(winHtml);
    $winHtml.attr("id", winId);
    //控制弹窗高度
    var height = "calc(100vh - 181px)";
    $winHtml.find(".modal-dialog .modal-body").css({"maxHeight": height, "overflow": "hidden"});
    // $winHtml.find(".modal-dialog,.modal-content").css({"maxHeight": "calc(100vh - 60px)", "overflow": "hidden"});
    $("body").append($winHtml);
    $winHtml.find(".modal-dialog .modal-body").slimscroll({
        height: 'inherit',
        alwaysVisible: false,
        size: "3px"
    });
    //结束
    $winHtml.on("hidden.bs.modal", function(e){
        if(e.target == $('#' + winId)[0]) {
            $('#' + winId, $("body")).remove();
        }
    });

    setTimeout(function(){
        Scdp.loadComponent(linkhref)
            .done(function (controller) {
                var params = actionparams || {};
                if (controller.pagePath) {
                    params.pagePath = controller.pagePath;
                }
                Scdp.loadFreeMarkerPage(Scdp.ObjUtil.isEmpty(controller.loadPageAction) ? Scdp.Const.COMMON_LOADPAGE : controller.loadPageAction, params, function (data, status) {
                    $winHtml.find(".modal-body").append(data);
                    if (typeof($.parser) != 'undefined' && typeof($.parser) != 'null') {
                        $.parser.parse($winHtml);
                    }

                    Scdp.bootstrapParse($winHtml, controller);
                    controller.init($winHtml, params, null, title);

                    var resultGrid = $winHtml.getCmp(queryResultGridId);
                    resultGrid.data("datagrid").options.onDblClickRow = dblclickaction;
                    if($winHtml.getCmp("okBtn") && $winHtml.getCmp("okBtn") != null){
                        $winHtml.getCmp("okBtn").unbind('click').bind('click', function (e) {
                            var selections = $winHtml.getCmp(queryResultGridId).datagrid("getSelections");
                            if(Scdp.ObjUtil.isEmpty(selections)){
                                Scdp.Msg.warn("请选择一条记录！");
                            } else {
                                if (callback) {
                                    callback(selections);
                                }
                                $winHtml.modal('hide');
                            }
                        });
                    }
                })
            })
            .fail(function () {
                throw new Error("Load component " + linkhref + " fail !");});
    }, 100);
    $winHtml.modal({backdrop: 'static', keyboard: false}).show();
};
Scdp.fileExport = function (action, data) {
    var postData = data || {};
    postData.actionName = action;
    postData.userId = Scdp.CacheUtil.get(Scdp.Const.USER_ID);
    postData.userLocaleId = Scdp.getSysConfig("locale_id");
    postData.timestamp = Date.now();
    postData.network = window.NETWORK_DELAY;
    postData.signature = Scdp.getSign(action, postData);

    var timestamp = new Date().getTime();
    var formId = "scdpHiddenJspForm" + timestamp;

    var formatFormId = "#" + formId;
    var form=$('<form class="hidden" id="'+ formId + '" action="controller/json.action" method="post" style="display:none"></form>');
    form.append('<input type="hidden" name="postData" id="postData"/>');
    form.append('<input type="hidden" name="actionName" id="actionName"/>');

    $("body").append(form);
    $("#postData", $(formatFormId)).val(Scdp.JSON.encode(postData));
    $("#actionName", $(formatFormId)).val(action);
    form.submit();
    $(formatFormId).remove();
};

//调整弹出框的位置, for 弹出的页面在基本的ftl页面里面
Scdp.calPopupWindowPosition = function (componentId, calller) {
    calller.view.getCmp(componentId).off('show.bs.modal').on('show.bs.modal', function () {
        var $this = $(this);
        calller.view.getCmp(componentId).css("display", "block");
        calller.view.getCmp(componentId + " .modal-dialog").css({
            "margin": "0px",
            "top": function () {
                return (document.documentElement.clientHeight - $this.find(".modal-dialog").height()) / 2 + "px";
            },
            "left": function () {
                return (document.documentElement.clientWidth - $this.find(".modal-dialog").width()) / 2 + "px";
            }
        });
    })
};

//调整弹出框的位置，for弹出的页面用controller的方式实现
Scdp.calPopupWindowPositionWithController = function(id){
    var thisWin = $('#'+ id ).length > 0 ? $('#'+ id ) : $('[itemId="'+id+'"]') ;
    thisWin.off('shown.bs.modal').on('shown.bs.modal', function () {
        $(this).doLayout();
        setTimeout(function(){
            $(thisWin).find(" .modal-dialog").css({
                "margin": "0px",
                "top": function () {
                    return (document.documentElement.clientHeight  - $(thisWin).find(" .modal-dialog").height()) / 2 + "px";
                },
                "left": function () {
                    return (document.documentElement.clientWidth  - $(thisWin).find(" .modal-dialog").width()) / 2 + "px";
                }
            });
        },200);

    })
    thisWin.modal({backdrop: 'static', keyboard: false});
    thisWin.modal('show');
};


//窗体大小改变延时触发事件方法
Scdp.resizeDelayed = function (ele, options) {
    var defaults = {
        delay: 200,
        callback: null
    };

    var o = $.extend(defaults, options);

    var resize = {
        _timeout: false,
        init: function () {
            var me = this;
            ele.on("resize", function () {
                me.initResize();
            });
        },
        getUTCDate: function (h) {
            h = h || new Date();
            return Date.UTC(h.getUTCFullYear(), h.getUTCMonth(), h.getUTCDate(), h.getUTCHours(), h.getUTCMinutes(), h.getUTCSeconds(), h.getUTCMilliseconds());
        },
        initResize: function () {
            var me = this;
            me.controlTime = me.getUTCDate();
            if (me._timeout === false) {
                me._timeout = true;
                return setTimeout(function() {
                    return me.runCallback(me)
                }, me.delay)
            }
        },
        runCallback: function (me) {
            var g = me.getUTCDate();
            if (g - me.controlTime < o.delay) {
                return setTimeout(function () {
                    return me.runCallback(me)
                }, o.delay)
            } else {
                me._timeout = false;
                return o.callback&&o.callback()
            }
        }
    };
    resize.init();
    return ele;
};
/**
 * 计算调整左侧树形面板，并给树加滚动条
 * @param framePanel
 */
Scdp.calculateLeftPanelHeight = function (framePanel) {
    var windowHeight = $(window).height();
    var footerOffset = windowHeight;
    if($('footer.main-footer').length>0) {
        footerOffset = $('footer.main-footer').offset().top;
    }
    var querypanelOffsetTop = null;
    if($(framePanel).find("[itemid='queryPanel']").length>0) {
        querypanelOffsetTop = $(framePanel).find("[itemid='queryPanel']").offset().top;
    }
    var desktopContentOffset = $("#desktop-content").offset().top;
    var stdOffsetTop = null;
    if(querypanelOffsetTop && querypanelOffsetTop >0) {
        stdOffsetTop = querypanelOffsetTop;
    } else {
        stdOffsetTop = desktopContentOffset;
    }
    //设置左侧面板高度
    $(framePanel).find("[itemid='queryPanel']").css({minHeight: footerOffset - stdOffsetTop - 15});

    var headerHeight = $(framePanel).find("[itemid='queryPanel']>.box-header").outerHeight(true);
    //设置内容body高度
    $(framePanel).find("[itemid='queryPanel']>.box-body").css({height: footerOffset - stdOffsetTop - 15 - headerHeight});

    var treeTop = $(framePanel).find("[itemid='treeMenu']").offset().top;

    var childrens = $(framePanel).find("[itemid='queryPanel']>.box-body").children();
    if(childrens.length>0) {
        var boxbodyHeight = $(framePanel).find("[itemid='queryPanel']>.box-body").height();
        var treeDiv = null;
        //减去不属于树形控件的组件高度
        $.each(childrens, function (i, comp) {
            if($(comp).has("[itemid='treeMenu']").length>0  || $(comp).is("[itemid='treeMenu']")) {
                treeDiv = $(comp);
            } else {
                boxbodyHeight = boxbodyHeight - $(comp).outerHeight(true);
            }
        });
        if(treeDiv) {
            treeDiv.css({height: boxbodyHeight});
            if(!treeDiv.is("[itemid='treeMenu']")) {
                //树形组件里还有其他组件的情况
                boxbodyHeight  = treeDiv.height();
                childrens = treeDiv.children();
                $.each(childrens, function (i, comp) {
                    if($(comp).has("[itemid='treeMenu']").length>0  || $(comp).is("[itemid='treeMenu']")) {
                        treeDiv = $(comp);
                    } else {
                        boxbodyHeight = boxbodyHeight - $(comp).outerHeight(true);
                    }
                });
                treeDiv.css({height: boxbodyHeight});
            }
            treeDiv.slimscroll({
                height: boxbodyHeight + 'px',
                alwaysVisible: false,
                size: "3px"
            });
        }
    }
}

//计算动态计算dom高度方法
Scdp.calculateHeight = function (view, options) {

    var defaults = {
        slimscrollDomItemId: null,
        needCalculateDomItemId: null,
        needCutHeightDomItemIds: [],
        cutExtraHeight: 0
    };
    var o = $.extend(defaults, options);
    view.getCmp(o.slimscrollDomItemId).slimscroll({
        height: '100%',
        alwaysVisible: false,
        size: "3px"
    });

    var calculate = function(){
        var innerHeight = window.innerHeight;
        var $navtab = $("#navtabstrip").find(".nav-tabs").eq(0);
        var $header = $("header.main-header");
        var $footer = $("footer.main-footer");
        var resultPanel = view.getCmp(o.needCalculateDomItemId);
        var height = innerHeight - ($navtab.outerHeight() + $header.outerHeight() + $footer.outerHeight() + o.cutExtraHeight);

        $.each(o.needCutHeightDomItemIds, function (i, itemId) {
            height = height - view.getCmp(itemId).outerHeight();
        });

        //resultPanel.outerHeight(height);
        resultPanel.animate({'height': height},200);
    };

    Scdp.resizeDelayed($(window),{
        callback: calculate
    });
    calculate();
}

Scdp.registDoLayout = function(ele) {
    $(ele).on("click", '[data-widget="collapse"]', function(e) {
        $(this).closest("[xtype='bPanel']").bPanel("doLayout");
    });
}
Scdp.initDragableResize = function () {
    $(".scdp-draggable").each(function (j, obj) {
        var id = Scdp.Utils.getCompKey($(this));
        $(this).draggable({onStopDrag : function () {
            Scdp.CacheUtil.set(id, $(this).attr("style"));
        }});
        $(this).resizable({onStopResize: function () {
            Scdp.CacheUtil.set(id, $(this).attr("style"));
        }});
        //存储原style信息
        Scdp.CacheUtil.set(id+"_org", $(this).attr("style"));
    });
    $(".scdp-draggable").each(function (i, obj) {
        var id = Scdp.Utils.getCompKey($(this));
        var style = Scdp.CacheUtil.get(id);
        $(this).attr("style", style);
    });
}
Scdp.dragableResizeRestore = function () {
    $(".scdp-draggable").each(function (i, obj) {
        var id = Scdp.Utils.getCompKey($(this));
        var style = Scdp.CacheUtil.get(id+"_org");
        $(this).attr("style", style);
        Scdp.CacheUtil.set(id, style);
    });
};

Scdp.downloadFile = function (action, data) {
    var postData = data || {};
    postData.actionName = action;
    postData.userId = Scdp.CacheUtil.get(Scdp.Const.USER_ID);
    postData.userLocaleId = Scdp.getSysConfig("locale_id");
    postData.userTzOffset = -1 * (new Date).getTimezoneOffset();
    postData.timestamp = Date.now();
    postData.timeZone = jstz.determine().name();
    postData.network = window.NETWORK_DELAY;
    postData.signature = Scdp.getSign(action, postData);

    var timestamp = new Date().getTime();
    var formId = "scdpHiddenJspForm" + timestamp;

    var formatFormId = "#" + formId;
    var form = $('<form class="hidden" id="' + formId + '" action="controller/json.action" method="post" style="display:none"></form>');
    form.append('<input type="hidden" name="postData" id="postData"/>');
    form.append('<input type="hidden" name="actionName" id="actionName"/>');

    $("body").append(form);
    $("#postData", $(formatFormId)).val(Scdp.JSON.encode(postData));
    $("#actionName", $(formatFormId)).val(action);
    form.submit();
    $(formatFormId).remove();
}