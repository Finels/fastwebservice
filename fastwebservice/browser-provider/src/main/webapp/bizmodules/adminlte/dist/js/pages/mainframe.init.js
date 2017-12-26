/**
 * 框架初始标签和菜单功能
 * 2016/06/01
 * create by duwanjiang
 */

//重定向到后台管理页面
function manager() {
    // window.open('localhost:8888/framework/jsp/mainframe.jsp');
}

var index_url = "/index.jsp";

//页面初始化加载事件
$(document).ready(function () {
    loadModule();
    //InitBaseUser();
    //导航处理
    tab_pro();
    //初始化标签
    init();
    //检测登录是否过期
    //checkIsLogin();
    ///注册菜单查询事件和回车事件
    //$("#search-btn_mainsidebar").click(doMenuSearch);
    ////Scdp.openTab("Index.controller.indexController", "桌面", "indexmenu", Scdp.Const.MENU_TYPE_CTL, {}, false);
    $("#loadingMainframe").remove();
});

function InitBaseUser() {
    Scdp.doAction("load-user-extral-info", {}, function (ret) {
        Scdp.CacheUtil.set("ORG_CODE", ret.orgcode);
        Scdp.CacheUtil.set("ORG_TYPE", ret.orgtype);
        Scdp.CacheUtil.set("ORG_UUID", ret.orguuid);
        if (ret.logo) {
            Scdp.CacheUtil.set(Scdp.Const.USER_SYSTEM_LOGO, 'bizmodules/images/company/logo/' + ret.logo);
        }
        if (ret.title) {
            Scdp.CacheUtil.set(Scdp.Const.USER_SYSTEM_TITLE, ret.title);
        }
    }, null, true, false);
}

/**
 * 初始化标签
 */
function init() {
    var getCompanyName = function (a) {
        return "ADMIN" == a ? Scdp.I18N.USER_ADMIN : a
    };

    if (BR.getCookie("signature") == null) {
        Scdp.Msg.warn("用户登陆信息过期，请重新登陆", function () {
            window.location.replace(index_url);
        });
    }
    //初始化用户名
    $('[itemId=username]').text(Scdp.CacheUtil.get(Scdp.Const.USER_NAME));
    //初始化系统时间
    setInterval(function () {
        var date = new Date();
        $('[itemId=datetime]').text(MP.datetimeFormatter(date));
    }, 1000);
    //初始化所属公司
    $('[itemId=usercompany]').text(getCompanyName((Scdp.CacheUtil.get(Scdp.Const.USER_COMPANY_NAME))));

    var w = window.innerHeight;//获得原始高
    var content = document.getElementsByClassName('tab-content');//获得元素
    var content_menubar = document.getElementById('menubar');//获得元素
    // $(content[0]).slimScroll({
    //     height:w-151+'px'
    // });
    content[0].style.overflowX = "hidden";
    content[0].style.height = w - 85 + 'px';//设置高度
    content[0].style.overflowY = "auto"

    var content_menubar = document.getElementById('menubar');//获得元素
    content_menubar.style.height = w - 100 + 'px';//设置高度
    content_menubar.style.overflowY = "auto";

    $(window).resize(function () {
        var w = window.innerHeight;//获得原始高
        var content = document.getElementsByClassName('tab-content');//获得元素
        // $(content[0]).slimScroll({
        //     height:w-151+'px'
        // });
        content[0].style.overflowX = "hidden";
        content[0].style.height = w - 85 + 'px';//设置高度
        content[0].style.overflowY = "auto";

        var content_menubar = document.getElementById('menubar');//获得元素
        content_menubar.style.height = w - 100 + 'px';//设置高度
        content_menubar.style.overflowY = "auto";
    });

    //修改菜单展示样式
    $('.nav-tabs').tabdrop({
        text: function (collects) {
            if (collects.length > 4) {
                MP.Msg.warn("打开页面较多，建议关闭不用的页面。");
            }
            if (collects && collects.length > 0) {
                for (var i = 0; i < collects.length; i++) {
                    if ($(collects[i]).hasClass("active")) {
                        var title = $(collects[i]).text();
                        return '<i class="fa fa-list"></i><span class="bs-tab-title" style="max-width: 70px" title="' + title + '">' + title + '</span>';
                    }
                }
                return '<i class="fa fa-list"></i>';
            } else {
                return null;
            }
        }
    });

    //加载未读消息
    //loadUnReadReceive();
}

/**
 * 加载未读消息
 */
function loadUnReadReceive() {
    var queryUnReadMsg = "mp-msgcenter-load-unreadmsg";
    var msgcount = 0;

    function setText(msgcount) {
        $("#messagescount").text(msgcount);
        $("#messagesheader").text("你有" + msgcount + "条新消息！");
    }

    MP.doAction(queryUnReadMsg, {}, function (retdata) {
        if (retdata && retdata.root) {
            //存储未读消息内容
            msgContent = retdata.root;
            var imgsrc = "";
            var html = "";
            for (var i in retdata.root) {
                var moduleData = retdata.root[i];
                //判断消息子类型
                if (moduleData.msgSubtype != MP.Const.MSG_TYPE_WF_MSG) {
                    imgsrc = "/bizmodules/images/msgItem.png";
                    html += '<li style="width:100%;float: left ">' +
                        '<a href="javascript:void(0)"  class="taglink" itemId="' +
                        '" menutype=' + moduleData.msgSubtype + ' title="' + moduleData.msgSubject +
                        '" businessKey="' + moduleData.uuid + '" indexId="' + i +
                        '" style="float: left;width: 100%;vertical-align: middle">' +
                        '<img height="16" width="16" src="' + imgsrc + '"/>' +
                        ' <span style=\"color: #72afd2;\">' + moduleData.msgSubject + '</span>' +
                        '<i style="float: right" class="fa fa-hand-pointer-o text-aqua"></i></a>';
                }
            }
            $("#messagesmenu").children().remove();
            $("#messagesmenu").append(html);
            //设置未读消息条数
            msgcount = retdata.root.length
            setText(msgcount);
        }

        //注册未读消息点击事件
        $("#messagesmenu a").click(function (e) {
            if (e.type != "keypress" || 13 == e.keyCode) {
                var indexId = $(this).attr("indexId");
                //获取消息类型
                var menutype = $(this).attr("menutype");
                if (menutype != MP.Const.MSG_TYPE_WF_MSG) {
                    //参数设置
                    MP.openMsgTab(msgContent[indexId]);
                    //移除当前选项
                    $(this).remove();
                    msgcount--;
                    if (msgcount >= 0) {
                        setText(msgcount);
                    }
                }
            }
        });

        //注册打开消息中心事件
        $("#messagesOpenTab").click(function () {
            MP.openMsgTab();
        })
    })
}

/**
 * 点击加载tab页
 */
function append(e) {

}
/**
 * kendo tab 操作
 * 作用：导航处理
 */
function tab_pro() {


    var tabStrip = Scdp.ModuleManager.getObject("scdpNavTab");
    //单击左边栏时添加新的tab页
    $("#main_sidebar_menu_div").on("click", ".taglink", function (e) {
        if (e.type != "keypress" || 13 == e.keyCode) {
            var title = $(this).attr("title") == "" ? $(this).text() : $(this).attr("title");
            var linkhref = $(this).attr("taglinkref");
            var itemid = $(this).attr("itemid");
            //判断页面类型
            var menutype = $(this).attr("menutype");
            //参数设置
            var actionparams = $(this).attr("actionparams");

            $('.sidebar-mini.sidebar-collapse .sidebar-menu>li:hover>.treeview-menu').addClass('closeMenu');
            Scdp.openTab(linkhref, title, itemid, menutype, actionparams, false);
            $('li.navbar-right.closeAllTabs').show();
            $('.treeview-menu').removeClass('closeMenu');
        }
    });
    //绑定关闭事件
    $("#navtabstrip").on("click", ".fa-times-circle", function () {
        tabStrip.closeTab(this);
        //tabStrip.select("home");
    });

    //绑定关闭所有窗口事件
    $("#navtabstrip").on("click", ".closeAllTabs", function () {
        $("#navtabstrip").find("#route-tabs .fa-times-circle").click();
        setTimeout(function () {
            tabStrip.select("home")
        }, 400);
    });

    //绑定收藏事件
    $("#navtabstrip").on("click", "[itemId=star]", function () {
        //获取菜单编码
        var menucode = tabStrip.getMenuCode(this);
        //找到当前选中的星星
        var star = $(this);
        //判断是否收藏
        if (star.hasClass("fa fa-star")) {
            Scdp.removeFavorite(menucode, star);
        } else {
            Scdp.addFavorite(menucode, star);
        }
    });

    //登出事件
    $("[itemId=logout]").on("click", function () {
        Scdp.Msg.confirm("提示", Scdp.I18N.QUIT_SYSTEM_CONFIRM, function (a) {
            a && Scdp.doAction("sys-user-logout", {}, function () {
                Scdp.CacheUtil.removeAllTemp();
                window.sessionStorage.clear();
                window.location.replace(Scdp.getSysConfig("base_path"))
            }, false, false)
        })
    })
}
//kendo out

//使用递归算法遍历菜单
function analysisModule(module) {
    var html = "";
    var moduleData = module;
    for (var i = 0; i < moduleData.length; i++) {
        if (null != moduleData[i].menu) { //是含有为子节点
            html += '<li class="treeview fullWidth" style="cursor:pointer;">' +
                '<a href="javascript:void(0)" menutype="' + moduleData[i].menuType + '" itemId="' + moduleData[i].menuCode + '">' +

                    //判断是否已配置图标，如果为配置图标则统一使用模板图标
                (moduleData[i].imgCls ?
                '<img src="' + moduleData[i].imgCls + '" class="imgCls_img">&nbsp;'
                    : '<img src="/bizmodules/images/menu/jcsj_img.png" class="imgCls_img">') +
                (moduleData[i].iconSmallPath ?
                '<img src="' + moduleData[i].iconSmallPath + '" class="iconSmall_img">&nbsp;'
                    : '<i class="fa fa-circle-o text-aqua iconSmall_img"></i>') +

                ' <span>' + moduleData[i].text + '</span> <i class="fa fa-angle-left pull-right"></i>' +
                '</a>' +
                '<ul class="treeview-menu showAllTreeViewMenu">' +
                analysisModule(moduleData[i].menu) +
                '</ul>' +
                '</li>';
        } else {
            html += '<li>' +
                '<a href="javascript:void(0)"  class="taglink" ' +
                'itemId="' + moduleData[i].menuCode +               //菜单编码
                '" menutype="' + moduleData[i].menuType +           //菜单类型
                '" actionparams="' + moduleData[i].actionParams +   //菜单参数
                '" taglinkref="' + moduleData[i].menuAction +       //菜单地址
                '" title="' + moduleData[i].text + '">' +              //菜单名称

                    //判断是否已配置图标，如果为配置图标则统一使用模板图标
                (moduleData[i].iconSmallPath ?
                '<img src="' + moduleData[i].iconSmallPath + '">&nbsp;'
                    : '<i class="fa fa-circle-o text-aqua"></i>') +       //菜单图标

                '<span>' + moduleData[i].text + '</span>' +         //菜单名称
                '</a>' +
                '</li>';
        }
    }
    return html;
}
/**
 * 给菜单拼接数据
 */
function loadModule() {
    var params = {}
    var data = JSON.stringify(params)
    //var sys_menu = Scdp.CacheUtil.getTemp(Scdp.Const.CACHE_TYPE_SYS_MENU, data, !0, !0);
    //if (Scdp.ObjUtil.isEmpty(sys_menu) || Scdp.ObjUtil.isEmpty(sys_menu.treeData) || Scdp.ObjUtil.isEmpty(sys_menu.treeData.menu) || Scdp.ObjUtil.isEmpty(sys_menu.treeData.menu.items)) {
    //    Scdp.doAction("sys-user-mainframeinit", params, function (a) {
    //        if (a.success) {
    //            sys_menu = a;
    //            Scdp.CacheUtil.setTemp(Scdp.Const.CACHE_TYPE_SYS_MENU, data, sys_menu, true, true);
    //        }
    //    }, null, false, false)
    //} else {
    //    //Scdp.doAction("common-null", params, null, null, false, true);
    //}
    BR.doAjax("/menu/load.action", {}, true,
        function (ret) {
            var menu = ret.resultBody.data;
            $("#menubar").append(analysisModule(menu));
        },
        function () {

        });
    ////加载菜单
    //if (Scdp.ObjUtil.isNotEmpty(sys_menu.treeData.menu)) {
    //    var moduleData = sys_menu.treeData.menu.items, menu = {items: []};
    //    //判断根节点是否为绿通项目节点，如果不是，则不加载
    //    for (var i = 0; i < moduleData.length; i++) {
    //        if (moduleData[i].menuCode != 'MNU_LTMANAGEMENT') {
    //            menu.items.push(moduleData[i]);
    //        }
    //    }
    //
    //
    //    // $("#menubar").append(analysisModule(sys_menu.treeData.menu));
    //}
}
/**
 * 判断用户是否登录
 */
function islogin() {
    //判断cookie 是否登录
    if (Scdp.CacheUtil.get(Scdp.Const.USER_ID) == "") {
        window.location.replace(Scdp.getSysConfig("base_path"))
    }
}

/**
 * 检测登录是否过期（定时器轮询）
 */
function checkIsLogin() {
    var run = function () {
        if (!(0 == window.LOGIN_TIMEOUT || window.reloginwin && window.reloginwin.isVisible())) {
            var a = window.LOGIN_TIMEOUT - Date.now();
            a >= 6E4 * Scdp.Const.LOGIN_TIMEOUT_NOTIFY_TIME ? void(0) : 0 >= a ? (window.reloginwin = reLoginWin(),
                window.reloginwin.show()) : void("登录即将过期！")
        }
        setTimeout(run, 1E3);
    };
    // !0 === window.enableSessionTimer && run();
    run();
}

//查询方法代码
/**
 * 菜单查询事件
 */
function doMenuSearch(e) {
    e.preventDefault();
    function iterator(node, text) {
        var result = [];
        var moduleData = node.items;
        //判断是否为查询节点
        if (node.text.indexOf(text) > -1) {
            result.push(node);
        }
        if (node.menu.length > 0) {
            result.push(iterator(node.children, text));
        }
        return result;
    }

    var searchText = $("#search-text_mainsidebar").val();
    var span = $("#menubar span");
    var result = [];
    for (var i in span) {
        var item = span[i];
        if (item.innerText && item.innerText.indexOf(searchText) > -1) {
            result.push(item);
        }
    }
    //清除选择节点属性
    clearIndexMenu();
    //定位
    if (result.length > 0) {
        indexMenu(result);
    }
}
/**
 * 清除选择节点属性
 */
function clearIndexMenu() {
    //清除所有颜色
    debugger;
    if (tempItem) {
        $(tempItem).removeAttr("style");
    }
    //关闭所有打开节点
    $(".treeview.active").attr('class', "treeview");
    $(".treeview-menu.menu-open").removeAttr("style");
    $(".treeview-menu.menu-open").attr('class', "treeview-menu");
}
/**
 * 定位到菜单节点
 * @type {number}
 */
var index = 0;
var tempItem;
function indexMenu(result) {
    var item = result[index];
    //定位具体节点
    if (result && index < result.length) {
        $(item).parents('.treeview-menu').attr('class', "treeview-menu menu-open");
        $(item).parents('.treeview').attr('class', "treeview active");
        $(item).css("color", "yellow");
        tempItem = item;
        index++;
    } else {
        index = 0;
    }
}


//登陆超时
function reLoginWin() {
    var uuid = Scdp.StrUtil.getUUID();
    var cid = "reLoginWin_" + uuid;
    var userNameId = "userName_" + uuid;
    var passwordId = "password_" + uuid;
    var userid = Scdp.CacheUtil.get(Scdp.Const.USER_ID);
    var win = {
        cid: cid,
        id: "#" + cid,
        visible: false,
        isVisible: function () {
            return this.visible;
        },
        show: function () {
            if (!win.destroyed) {
                $(this.id).find("#" + userNameId).val(Scdp.CacheUtil.get(Scdp.Const.USER_ID));
                $(this.id).modal({backdrop: 'static', keyboard: false});
                this.visible = true;
            }
        },
        hide: function () {
            $(this.id).modal("hide");
            this.visible = false;
        },
        destroy: function () {
            $(win.id).on("hidden.bs.modal", function () {
                $(win.id).remove();
                win.destroyed = true;
                win.cid = null;
                win.id = null;
            });
            win.hide();
        }
    };

    var loginHtml =
        "<div id='" + cid + "' tabindex='-1' class='modal fade' role='dialog' style='padding-top: 5%;z-index: 2000;' aria-hidden='true'> " +
        "<div class='modal-dialog' id='logintimeout-dialog'>\n" +
        "            <div class='modal-content' id='logintimeout-content'>\n" +
        "                <div class='modal-header' id='logintimeout-header'>\n" +
        "                    <button type='button' class='close' id='logintimeout-closebtn' \n" +
        "                            aria-hidden='true'></button>\n" +
        "                </div>\n" +
        "                <div class='modal-body' id='logintimeout-body'>\n" +
        "                    <form role='form' class='form-horizontal' id='logintimeout-form'>\n" +
        "                        <div class='form-group'>\n" +
        "                            <label for='{" + userNameId + "}' class='col-sm-3 control-label'>用户名</label>\n" +
        "                            <div class='col-sm-9'>\n" +
        "                                <input type='text' disabled class='form-control' id='{" + userNameId + "}' value='" + userid + "' placeholder='用户名'>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                        <div class='form-group'>\n" +
        "                            <label for='" + passwordId + "' class='col-sm-3 control-label'>密码</label>\n" +
        "                            <div class='col-sm-9'>\n" +
        "                                <input type='password' class='form-control' id='" + passwordId + "'  placeholder='密码'>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </form>\n" +
        "                </div>\n" +
        "                <div class='modal-footer' id='logintimeout-footer'>\n" +
        "                    <button class='btn btn-warning btn-block login-btn' id='logintimeout-login-btn'>登录\n" +
        "                    </button>\n" +
        "                </div>\n" +
        "\n" +
        "            </div><!-- /.modal-content -->\n" +
        "        </div>" +
        "</div>";
    //"<div id='"+cid+"' tabindex='-1' class='modal fade' role='dialog' style='padding-top: 10%;' aria-hidden='true'> " +
    //"<div class='modal-dialog'> " +
    //"<div class='modal-content'> " +
    //"<div class='modal-header bg-yellow color-palette' > " +
    //"<h4 class='modal-title'><i class='icon fa fa-warning'></i>登录信息过期请重新登录</h4> " +
    //"</div> " +
    //"<div class='modal-body'> " +
    //"<form role='form' class='form-horizontal'> " +
    //"<div class='form-group'> " +
    //"<label for='"+userNameId+"' class='col-sm-2 control-label'>用户名</label> "+
    //"<div class='col-sm-10'> " +
    //"<input type='text' disabled class='form-control' id='{"+userNameId+"}' placeholder='用户名'> "+
    //"</div> " +
    //"</div> " +
    //"<div class='form-group'> " +
    //"<label for='"+passwordId+"' class='col-sm-2 control-label'>密码</label> "+
    //"<div class='col-sm-10'> " +
    //"<input type='password' class='form-control' id='"+passwordId+"' placeholder='密码'> "+
    //"</div> " +
    //"</div> " +
    //"</form> " +
    //"</div> " +
    //"<div class='modal-footer'> " +
    //"<button class='btn btn-warning btn-block login-btn' >登录<tton>" +
    //"</div> " +
    //"</div>" +
    //"</div>" +
    //"</div>";
    $("body").append(loginHtml);

    //关闭按钮 返回登陆页面
    $("#logintimeout-closebtn").on("click", function () {
        window.location.replace(Scdp.getSysConfig("base_path"))

    })

    function afterLoginSuccess(b) {
        var iframe = $('iframe');
        if ("1" == b.userToken.substr(0, 1)) {
            var a = Scdp.StrUtil.decodeab(b.userToken.substr(2));
            Scdp.CryptUtil.decryptRSA(a, Scdp.RSA.ClientKey, function (a) {
                b.userToken = a;
            })
        } else {
            b.userToken = b.userToken.substr(2);
        }
        saveLoginData(b, true);
        for (var i = 0; i < iframe.length; i++) {
            try {
                iframe[i].contentWindow.saveLoginData.call(iframe[i], b, true);
            } catch (e) {

            }
        }
    }

    function saveLoginData(retData, skipMenuCacheClean) {
        for (var i = 0; i < Scdp.Const.USER_DATA_ARRAY.length; i++) {
            var item = Scdp.Const.USER_DATA_ARRAY[i];
            Scdp.CacheUtil.set(item, retData[item]);
        }
        if (skipMenuCacheClean !== true) {
            Scdp.CacheUtil.removeAllTempByType(Scdp.Const.CACHE_TYPE_SYS_MENU);
        }
    }

    /**
     * 登陆
     * */
    function doLogin(username, password, success, failure) {
        Scdp.CryptUtil.encryptPass(password, function (d) {
            var a = {};
            a.userId = username;
            a.password = d;
            a.OTP = Scdp.CryptUtil.getTOTP(Scdp.Const.TOTP);
            a.userTzOffset = -1 * (new Date).getTimezoneOffset();
            a.timeZone = jstz.determine().name();
            a.userLocaleId = Scdp.getSysConfig("locale_id");
            window.SYSCONFIG_RSA_DISABLED || (a.publicKey = Scdp.CryptUtil.getClientPublicKey());
            Scdp.doAction("sys-user-login", a, function (c) {
                if (0 != c.resultCode) {
                    if (2 == c.resultCode) {
                        var pDom = $("#" + passwordId);
                        pDom.focus();
                        pDom.tooltip({position: 'top', content: '密码错误!'});
                        pDom.tooltip('show');
                        destroyTooltip(pDom, 2000);
                    }
                    failure && failure();
                }
                else {
                    afterLoginSuccess(c);
                    success && success();
                }
            }, failure, false, true);
        })
    }


    var destroyTooltip = function (jqueryDom, time) {
        time = time || 0;
        setTimeout(function () {
            jqueryDom.tooltip('destroy')
        }, time)
    };

    var login = function () {
        var loginBtn = $(this);
        var password = $("#" + passwordId);
        if (!password.val()) {
            password.focus();
            password.tooltip({position: 'top', content: '密码不能为空!'});
            password.tooltip('show');
            destroyTooltip(password, 2000);
            return;
        }
        loginBtn.attr("disabled", true);
        var hideLoading = function () {
            loginBtn.removeAttr("disabled");
        };
        doLogin(Scdp.CacheUtil.get(Scdp.Const.USER_ID), password.val(), function () {
            win.destroy();
        }, hideLoading);
    };

    $(win.id).find(".login-btn").on("click", login);

    $(win.id).on('keydown', function (a) {
        if (a && a.keyCode === 13) {
            login();
        }
    });
    return win;
}