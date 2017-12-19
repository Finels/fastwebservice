/**
 * Created by XieJuan on 2016/11/2.
 * 登录业务处理
 */
//页面加载完成事件
$(function () {
    doLogin();
});

//初始化控件
function init() {
    $("[itemId=remember]").attr("value", Scdp.I18N.REMEBER_USER_ID);
    $("[itemId=footer]").attr("value", Scdp.I18N.COPYRIGHT_TEXT);
    $("[itemId=title]").text(Scdp.I18N.SYSTEM_NAME);
}

//登录处理
function doLogin() {
        var encryptCode=getQueryString("param");
        var a = {};
        a.encryptCodeStr=encryptCode;
        a.OTP = Scdp.CryptUtil.getTOTP(Scdp.Const.TOTP);
        a.userTzOffset = -1 * (new Date).getTimezoneOffset();
        a.timeZone = jstz.determine().name();
        a.userLocaleId = Scdp.getSysConfig("locale_id");
        window.SYSCONFIG_RSA_DISABLED || (a.publicKey = Scdp.CryptUtil.getClientPublicKey());
        Scdp.doAction("user-login-width-encrypt-code", a, function (c) {
            if (0 != c.resultCode) {
                $("#business_system_loading").attr("src","/bizmodules/images/resouce/warn.png");
                $("#business_system_loading_msg").text("用户登录失败:"+c.resultInfo);
                $("#business_system_loading_msg").css("color","red");
            }
            else {
                afterLoginSuccess(c);
            }
        }, function () {
            $("#business_system_loading").attr("src","/bizmodules/images/resouce/warn.png");
            $("#business_system_loading_msg").text("连接业务系统失败！");
            $("#business_system_loading_msg").css("color","red");
        }, false, true);
}

/**
 * 登录成功后函数
 * */
function afterLoginSuccess(b) {
    var isCloseSiderbar=getQueryString("isCloseSiderbar");
    var closeSiderbarStr;
    if(isCloseSiderbar=="false"){
        closeSiderbarStr="isCloseSiderbar=false";
    }else{
        closeSiderbarStr="isCloseSiderbar=true";
    }
    var c = Scdp.getSysConfig("BASE_PATH") + "bizmodules/jsp/mainframe_light.jsp?"+closeSiderbarStr;
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
/**
 * 加载图标
 */
function afterLogin() {
    Scdp.doAction("company-logo-load",{},function (ret) {
        if(ret.logo){
            Scdp.CacheUtil.set(Scdp.Const.USER_SYSTEM_LOGO, 'bizmodules/images/company/logo/' + ret.logo);
        }
        if(ret.title){
            Scdp.CacheUtil.set(Scdp.Const.USER_SYSTEM_TITLE, ret.title);
        }
    })
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
/**
 * 或的请求字符串的方法
 * @param name
 * @returns {*}
 * @constructor
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  decodeURI (r[2]); return null;
}


