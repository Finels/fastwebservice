/**
 * Created by XieJuan on 2016/11/2.
 * 登录业务处理
 */


//页面加载完成事件
$(function () {
    //设置光标的移动速度及移动终点
    $(".light").animate({left: "29rem"}, 1500);
    //初始化控件
    //init();
    //设置cookie，记住用户名
    //cookiePro();

    $("[itemId=loginOkBtn]").on("click", login);
    $("[itemId=password]").on('keydown', function (a) {
        if (a && a.keyCode === 13) {
            login();
        }
    });

    var loginName = localStorage.getItem('loginName');
    // var loginPassword = localStorage.getItem('loginPassword');
    if (loginName) {
        loginName = loginName.split(",");
        // loginPassword = loginPassword.split(",");

        var html = "";
        for (var i = 0; i < loginName.length; i++) {
            if(i>10){
                break;
            }
            html += "<p class='historyName' style='color:#b2b2b2;padding:10px 13px;font-size:14px;text-align:left;cursor: pointer;'>" + loginName[i] + "</p>";
        }
        $('#loginHistoryName').html(html);
        $("[itemId=username]").val(loginName[0]);
        // $("[itemId=password]").val(loginPassword[0]);
    }

    $("[itemId=username]").on('focus', function () {
        if ($("#loginHistoryName").html()) {
            $("#loginHistoryName").show();
        }
    });
    $("[itemId=username]").on('blur', function () {
        $("#loginHistoryName").hide();
    });
    $('#loginHistoryName').hover(function () {
        $("[itemId=username]").off('blur');
    }, function () {
        $("[itemId=username]").on('blur', function () {
            $("#loginHistoryName").hide();
        });
    });

    $(".historyName").on('click', function (e) {
        var index = $(e.currentTarget).index();
        $("[itemId=username]").val(loginName[index]);
        // $("[itemId=password]").val(loginPassword[index]);
        $("#loginHistoryName").hide();
    });


    $('.historyName').hover(function () {
        $(this).css('color', '#000');
    }, function () {
        $(this).css('color', '#b2b2b2');
    });
});

//初始化控件
function init() {
    $("[itemId=remember]").attr("value", Scdp.I18N.REMEBER_USER_ID);
    $("[itemId=footer]").attr("value", Scdp.I18N.COPYRIGHT_TEXT);
    $("[itemId=title]").text(Scdp.I18N.SYSTEM_NAME);
}

//登录处理
function doLogin(username, password) {
    $("[itemId=username]").attr("disabled", true);
    $("[itemId=password]").attr("disabled", true);
    $("[itemId=loginOkBtn]").attr("disabled", true);
    $("[itemId=loginOkBtn]").html("登录中... ...");
    $(".datagrid-mask").display = "none";


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
                var info = $("[itemId=msgSpan]");
                info.text(c.resultInfo),
                    //info.css({color: 'red'}),
                    1 == c.resultCode ? $("[itemId=username]").focus() : $("[itemId=password]").focus(),
                    $("[itemId=username]").attr("disabled", false),
                    $("[itemId=password]").attr("disabled", false),
                    $("[itemId=loginOkBtn]").attr("disabled", false),
                    $("[itemId=loginOkBtn]").html("登录");
                $("#foo").hide();
            }
            else {
                afterLoginSuccess(c);

                var loginName = localStorage.getItem('loginName');
                // var loginPassword = localStorage.getItem('loginPassword');

                // if (!loginName || !loginPassword) {
                if (!loginName) {
                    loginName = [];
                    // loginPassword = [];
                    loginName.unshift(username);
                    // loginPassword.unshift(password);
                } else {
                    loginName = loginName.split(",");
                    // loginPassword = loginPassword.split(",");
                    var indexOfName = loginName.indexOf(username);
                    // var indexOfPassword = loginPassword.indexOf(password);
                    // if (indexOfName == -1 && indexOfPassword == -1) {
                    if (indexOfName != -1) {
                        loginName.splice(indexOfName, 1);
                        // loginPassword.unshift(password);
                    }
                    loginName.unshift(username);

                }

                localStorage.setItem('loginName', loginName);
                // localStorage.setItem('loginPassword', loginPassword);
            }
        }, function () {
            $("[itemId=username]").attr("disabled", false);
            $("[itemId=password]").attr("disabled", false);
            $("[itemId=loginOkBtn]").attr("disabled", false);
            $("[itemId=loginOkBtn]").html("登录");
        }, true, true);
    })
}


//登陆方法
function login() {
    //清除缓存
//        Scdp.CacheUtil.removeAllTemp();
//    if (window.sessionStorage.getItem("isActiveTag")) {
//        $("[itemId=msgSpan]").html("请退出另一个账号后再登录系统！");
//        return;
//    }
    window.sessionStorage.clear();

    //清除消息提示框内容
    $("[itemId=msgSpan]").html("");
    var username = $("[itemId=username]").val();
    var password = $("[itemId=password]").val();
    //var remember = $("[itemId=remember]").prop("checked");
    if (Scdp.ObjUtil.isEmpty(username)) {
        $("[itemId=msgSpan]").html("请输入登录用户名！");
        $("[itemId=username]").focus();
        $("#foo").hide();
        return;
    }
    if (Scdp.ObjUtil.isEmpty(password)) {
        $("[itemId=msgSpan]").html("请输入登录密码！");
        $("[itemId=password]").focus();
        $("#foo").hide();
        return;
    }
    //if (Scdp.ObjUtil.isEmpty(username) || Scdp.ObjUtil.isEmpty(password)) {
    //    Scdp.MsgUtil.warn(Scdp.I18N.FORGOT_PASSWORD)
    //    return;
    //}
    //保存checked状态
    //Scdp.CookieUtil.setCookie('checked', remember);
    //if (remember == true) {
    //    Scdp.CookieUtil.setCookie('username', username);
    //} else {
    //    Scdp.CookieUtil.setCookie('username', '');
    //}

    //登陆
    doLogin(username, password);
}


/**
 * 登录成功后函数
 * */
function afterLoginSuccess(b) {
    //window.sessionStorage.setItem("isActiveTag", true);
    var c = Scdp.getSysConfig("BASE_PATH") + "bizmodules/jsp/mainframe_light.jsp";
    if ("1" == b.userToken.substr(0, 1)) {
        var a = Scdp.StrUtil.decodeab(b.userToken.substr(2));
        Scdp.CryptUtil.decryptRSA(a, Scdp.RSA.ClientKey, function (a) {
            b.userToken = a;
            saveLoginData(b);
            //doSomething after login
            afterLogin && afterLogin(b),
                window.location.replace(c)
        })
    } else
        b.userToken = b.userToken.substr(2),
            saveLoginData(b),
            //doSomething after login
        afterLogin && afterLogin(b),
            window.location.replace(c)
}

function afterLogin() {
    //Scdp.doAction("load-user-extral-info",{},function (ret) {
    //    Scdp.CacheUtil.set("ORG_CODE", ret.orgcode);
    //    Scdp.CacheUtil.set("ORG_TYPE", ret.orgtype);
    //    Scdp.CacheUtil.set("ORG_UUID", ret.orguuid);
    //    if(ret.logo){
    //        Scdp.CacheUtil.set(Scdp.Const.USER_SYSTEM_LOGO, 'bizmodules/images/company/logo/' + ret.logo);
    //    }
    //    if(ret.title){
    //        Scdp.CacheUtil.set(Scdp.Const.USER_SYSTEM_TITLE, ret.title);
    //    }
    //},null, true, false);
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


//设置cookie，记住用户名
function cookiePro() {
    var remember = Scdp.CookieUtil.getCookie('checked');
    var usernamecookie = Scdp.CookieUtil.getCookie('username');
    if (usernamecookie != null && remember == 'true') {
        $("[itemId=username]").val(usernamecookie);
        $("[itemId=remember]").attr("checked", true);
    } else {
        $("[itemId=remember]").attr("checked", false);
    }
}

