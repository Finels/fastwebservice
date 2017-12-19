/**
 * 框架初始标签和菜单功能
 * 2016/06/01
 * create by duwanjiang
 */


//页面初始化加载事件
$(document).ready(function () {
    InitSSOLoginAction().done(
        function(){
            var main_url = Scdp.getSysConfig("BASE_PATH") + "bizmodules/jsp/mainframe_light.jsp";
            window.location.replace(main_url);
        }
    ).fail(function()
    {
        window.location.replace("http://172.16.9.2:8080");
    })
});


/**
 * 单点登陆action
 * @author duwanjiang
 */
function InitSSOLoginAction (){
    var dtd = $.Deferred();
    var a = {};
    a.userId = "";
    a.OTP = Scdp.CryptUtil.getTOTP(Scdp.Const.TOTP);
    a.userTzOffset = -1 * (new Date).getTimezoneOffset();
    a.timeZone = jstz.determine().name();
    a.userLocaleId = Scdp.getSysConfig("locale_id");
    window.SYSCONFIG_RSA_DISABLED || (a.publicKey = Scdp.CryptUtil.getClientPublicKey());
    Scdp.doAction("init-sso-login", a, function (c) {
        if (0 != c.resultCode) {
            dtd.reject();
        }else {
            afterLoginSuccess(c);
        }
    }, function () {
        dtd.reject();
    },true,true);

    /**
     * 登录成功后函数
     * */
    function afterLoginSuccess(b) {
        if ("1" == b.userToken.substr(0, 1)) {
            var a = Scdp.StrUtil.decodeab(b.userToken.substr(2));
            Scdp.CryptUtil.decryptRSA(a, Scdp.RSA.ClientKey, function (a) {
                b.userToken = a;
            })
        } else
        {
            b.userToken = b.userToken.substr(2);
        }
        saveLoginData(b);
    }

    function saveLoginData(retData, skipMenuCacheClean) {
        for (var i = 0; i < Scdp.Const.USER_DATA_ARRAY.length; i++) {
            var item = Scdp.Const.USER_DATA_ARRAY[i];
            Scdp.CacheUtil.set(item, retData[item]);
        }
        if (skipMenuCacheClean !== true) {
            Scdp.CacheUtil.removeAllTempByType(Scdp.Const.CACHE_TYPE_SYS_MENU);
        }
        dtd.resolve();
    }

    return dtd.promise();
}

