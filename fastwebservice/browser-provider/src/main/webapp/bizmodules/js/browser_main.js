/**
 * Created by FL on 2017/10/10.
 */
var Namespace = new Object();
Namespace.register = function (path) {
    var arr = path.split(".");
    var ns = "";
    for (var i = 0; i < arr.length; i++) {
        if (i > 0) ns += ".";
        ns += arr[i];
        eval("if(typeof(" + ns + ") == 'undefined') " + ns + " = new Object();");
    }
}

Namespace.register("BR");
Namespace.register("BR.Msg");
Namespace.register("BR.Const");
Namespace.register("BR.Utils");
Namespace.register("BR.DateUtils");

BR.doAjax = function (url, param, maskid, success, complete, error) {
    //param = JSON.stringify(param);
    //var params = {
    //    actionUrl: url,
    //    postData:
    //};
    var a = {};
    a.dataBody = param;
    a.signature = window.sessionStorage.signature;
    a.timestamp = Date.now();
    a.network = window.NETWORK_DELAY;
    maskid = (maskid == 'false' || maskid == false) ? null : maskid;
    Scdp.ObjUtil.isNotEmpty(maskid) && Scdp.mask(maskid);
    $.ajax({
        //提交数据的类型 POST GET
        type: "POST",
        //提交的网址
        url: url,
        //提交的数据
        data: JSON.stringify(a),
        //返回数据的格式
        dataType: "json",//"xml", "html", "script", "json", "jsonp", "text".
        //jsonp:"callback",
        //jsonpCallback:"",
        contentType: "application/json",
        async: true,//true,false
        //在请求之前调用的函数
        beforeSend: function () {
        },
        //成功返回之后调用的函数
        success: success,//ret
        //调用执行后调用的函数
        complete: function (ret) {
            Scdp.ObjUtil.isNotEmpty(maskid) && Scdp.unmask();
            if (ret.status == 500) {
                MP.Msg.error(ret.status + "错误：" + (ret.responseJSON == null || ret.responseJSON.errorDescription == null ? "未知错误" : ret.responseJSON.errorDescription) + "<br>原因：" + (ret.responseJSON.errorStack == null || ret.responseJSON.errorStack == '' ? "未知原因" : ret.responseJSON.errorStack));
            } else if (ret.status != 200) {
                MP.Msg.warn(ret.status + "错误：" + (ret.responseJSON == null || ret.responseJSON.errorDescription == null ? "未知错误" : ret.responseJSON.errorDescription));
            }
        },//XMLHttpRequest, textStatus
        //调用出错执行的函数
        error: error
    });
}