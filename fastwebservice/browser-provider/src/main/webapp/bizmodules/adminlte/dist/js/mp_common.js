/**
 * 用于项目公共的业务处理逻辑
 */
//命名空间定义
Namespace.register("MP");
Namespace.register("MP.Msg");
Namespace.register("MP.Const");
Namespace.register("MP.Utils");
Namespace.register("MP.DateUtils");

MP.Const.MENU_TYPE_URL = "MENU_ITEM_URL";
MP.Const.MENU_TYPE_DIR = "MENU_DIR";

MP.Const.USER_ORG_CODE = "ORG_CODE";
MP.Const.USER_ORG_TYPE = "ORG_TYPE";
MP.Const.USER_ORG_UUID = "ORG_UUID";
//MP.Const.FIREREPORT_URL = "http://localhost:8075/WebReport/ReportServer?";//测试库
MP.Const.FIREREPORT_URL = "http://101.204.240.105:50003/WebReport/ReportServer?";

//MP.Const.FIREREPORT_URL = "http://101.204.240.105:50217/WebReport/ReportServer?";//正式库


MP.Const.COMMON_QUERY_ACTION = "biz-common-query"; //公共查询actionName
MP.Const.COMMON_ORG_TREE_ACTION = "biz-common-org-tree"; //公共组织机构树actionName
MP.Const.COMMONANDVIR_ORG_TREE_ACTION = "biz-commonandvitual-org-tree"; //公共所有组织机构树actionName

MP.Const.COMMON_ORG_CODE_ACTION = "biz-common-base-code"; //公共数据字典查询actionName

MP.Const.COMMON_MENU_QUERY_ACTION = "biz-common-menu-query"; //菜单查询actionName

MP.Const.DEPT_TYPE_COMPANY = 3;//路公司等级
MP.Const.DEPT_TYPE_MANAGEDEPT = 4;//管理处等级
MP.Const.DEPT_TYPE_STATION = 5;  //收费站等级

MP.Const.dataGridHeight = 800;
MP.Const.dataGridPageSize = 15;
MP.Const.dataGridPageList = [10, 15, 20, 30, 40, 50];

MP.Const.CODE_ASSET_TYPE = "asset_type";      //资产类型
MP.Const.CODE_CLOTHES_CLASSIFICATION = "clothes_classification";   //服装类别
MP.Const.CODE_CLOTHES_TYPE = "clothes_type";    //服装类型
MP.Const.CODE_COMPTURE_RANK = "compture_rank";   //计算机等级
MP.Const.CODE_EDUCATIONAL = "educational";        //学历
MP.Const.CODE_EVALUATE_TYPE = "evaluate_type";    //综合考核类型
MP.Const.CODE_EXAM_RANK = "exam_rank";             //业务考试等级
MP.Const.CODE_EXAM_TYPE = "exam_type";               //考勤种类
MP.Const.CODE_FILE_TYPE = "file_type";               //文件类型
MP.Const.CODE_LIST_CLASSES = "list_classes";          //班次
MP.Const.CODE_LIST_GROUP = "list_group";              //班组
MP.Const.CODE_MANDARIN_RANK = "mandarin_rank";         //普通话等级
MP.Const.CODE_OPERATE_TYPE = "operate_type";            //批文类型
MP.Const.CODE_POLITICS = "politics";                     //政治面貌
MP.Const.CODE_STATION_CLASSIFICATION = "station_ classification";  //收费站类别
MP.Const.CODE_STATION_PROPERTY = "station_ property";       //收费站性质
MP.Const.CODE_STATION_DUTIES = "station_duties";            //收费站职务
MP.Const.CODE_STATION_POST = "station_post";               //收费员岗位
MP.Const.CODE_STATION_STAR = "station_star";               //收费站星级
MP.Const.CODE_STATION_TYPE = "station_type";               //收费站类型
MP.Const.CODE_TRAIN_METHOD = "train_method";              //培训方式
MP.Const.CODE_TRAIN_TYPE = "train_type";                  //培训类型
MP.Const.CODE_BILLCARDINOUT_TICKET_TYPE = "pm-billcardinout-tickettype"; //调拨票券类型
MP.Const.CODE_BILLCARDINOUT_TICKET_SUB_TYPE = "pm-billcardinout-tickettype-subtype"; //调拨票券子类型
MP.Const.CODE_BASICCARD_TYPE = "basiccard_type";   //基础卡类型
MP.Const.CODE_BASICCARD_STATE = "basiccard_state";   //基础卡状态
var management_getImagesUrl = "orginfo-base-management-loadimgs";   //管理处读取图片url

//====================消息类型===================
MP.Const.MSG_TYPE_WF_MSG = "WF_MSG"; //待办事项
MP.Const.MSG_TYPE_NOTICE_MSG = "NOTICE_MSG"; //个人消息
MP.Const.MSG_TYPE_EXCEPTION_MSG = "EXCEPTION_MSG"; //异常消息
MP.Const.MSG_TYPE_SYS_MSG = "SYS_MSG"; //系统消息


//自定义川高排班模式 后台对应：com.csnt.scdp.bizmodules.attributes.CommonAttribute.MAIN_SHIFT_TYPE_1;
MP.Const.MAIN_SHIFT_TYPE_1 = "1";
MP.Const.MAIN_SHIFT_TYPE_2 = "2";
MP.Const.MAIN_SHIFT_TYPE_3 = "3";
MP.Const.MAIN_SHIFT_TYPE_4 = "4";
MP.Const.MAIN_SHIFT_TYPE_5 = "5";


//考勤类型 部分;
MP.Const.EXAM_TYPE_1 = 1;//上班
MP.Const.EXAM_TYPE_2 = 2;//替班
MP.Const.EXAM_TYPE_3 = 3;//加班
MP.Const.EXAM_TYPE_4 = 4;//休息
MP.Const.EXAM_TYPE_5 = 5;//请假
MP.Const.EXAM_TYPE_6 = 6;//还班
MP.Const.EXAM_TYPE_7 = 7;//旷工
MP.Const.EXAM_TYPE_8 = 8;//早退
MP.Const.EXAM_TYPE_9 = 9;//迟到

//请假类型 部分;
MP.Const.leave_type_1 = 1;//
MP.Const.leave_type_2 = 2;//
MP.Const.leave_type_3 = 3;//
MP.Const.leave_type_4 = 4;//
MP.Const.leave_type_5 = 5;//
MP.Const.leave_type_6 = 6;//
MP.Const.leave_type_7 = 7;//

//绿通审核页面全局变量
MP.Const.imgArray = [];
MP.Const.imgArrayIndex = 0;

//日常巡查详情页面的全局变量
MP.Const.dailyInspectArray = [];
MP.Const.dailyInspectArrayIndex = 0;


/**
 * 通过id获取组件
 * @param parentItemId 父级对象itemid
 * @param componentId 组件id
 * @returns {*|jQuery}
 */

MP.getCmp = function (parentItemId, componentId) {
    return $("[itemId=" + parentItemId + "]").find("[itemId=" + componentId + "]");
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
MP.commonAction = function (url, param, formItemId, successFn, failureFn, async) {
    var postData = param || {};
    postData.viewdata = MP.getFormData(formItemId);
    MP.doAction(url, postData, function (retData) {
        if (retData.success)
            if (successFn) {
                successFn(retData);
            }
    }, failureFn, true, async);
}

/**
 * 公共删除函数
 * @param url
 * @param param 选择记录的数组
 * @param successFn
 * @param failureFn
 * @param async
 */
MP.commonDeleteAction = function (url, param, successFn, failureFn, async) {
    var postData = param || {};
    var uuids = [];
    for (var i in postData) {
        uuids.push(postData[i].uuid);
    }
    MP.doAction(url, {uuids: uuids}, function (retData) {
        if (retData.success)
            if (successFn) {
                successFn(retData);
            }
    }, failureFn, false, async);
}

/**
 * 获取表格中的数据
 * @param formItemId 查询条件的formItemId,
 * @notnull context,当前的controller对象
 * @returns {{}}
 */
MP.getFormData = function (formItemId, context) {
    var postData = {};
    context = context.view.ele;
    $("[itemId=" + formItemId + "]", context).serializeArray().map(function (x) {
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
MP.commonParamsFactory = function (actionName, viewdata) {
    var b = b || {};
    "sys-user-login" !== actionName && (b.userId = Scdp.CacheUtil.get(Scdp.Const.USER_ID));
    b.userLocaleId = Scdp.getSysConfig("locale_id");
    b.timestamp = Date.now();
    b.network = window.NETWORK_DELAY;
    Scdp.ObjUtil.isEmpty(b.menuCode) && (b.menuCode = Scdp.getActiveModule() ? Scdp.getActiveModule().menuCode : null );
    b.viewdata = viewdata;
    b.signature = Scdp.getSign(actionName, b);
    return b;
}

/**
 * 查询条件封装函数
 */
MP.searchParams = function (actionName, formItemId) {
    return MP.commonParamsFactory(actionName, MP.getFormData(formItemId));
}


/**
 * 初始化toastr提示框
 */
toastrInit = function (time) {
    toastr.options = {
        "closeButton": true, //是否显示关闭按钮
        "debug": false, //是否使用debug模式
        "positionClass": "toast-top-right",//弹出窗的位置
        "showDuration": "300",//显示的动画时间
        "hideDuration": "1000",//消失的动画时间
        "timeOut": time, //展示时间
        "extendedTimeOut": "1000",//加长展示时间
        "showEasing": "swing",//显示时的动画缓冲方式
        "hideEasing": "linear",//消失时的动画缓冲方式
        "showMethod": "fadeIn",//显示时的动画方式
        "hideMethod": "fadeOut" //消失时的动画方式
    };
}
/**
 * 消息提示
 * @param message
 * @param fn
 */
MP.Msg.info = function (message, fn) {
    toastrInit(3000);
    ;
    toastr.success(message);
    // MP.Msg.alertMessage("success", "提示", message, fn);
}

MP.Msg.Wininfo = function (message, fn) {
    MP.Msg.alertMessage("success", "提示", message, fn);
}


MP.Msg.WininfoError = function (message, fn) {
    MP.Msg.alertMessage("error", "提示", message, fn);
}
/**
 * 消息警告
 * @param message
 * @param fn
 */
MP.Msg.warn = function (message, fn) {
    toastrInit(3600);

    var currentMesSizes = $('div.toast-message').size();
    if (currentMesSizes != 0) {
        for (var i = 1; i <= currentMesSizes; i++) {
            var IsCreate;
            var target = "#toast-container div.toast-message:eq(" + (i - 1) + ")";
            var currentMes = $(target).text();
            if (currentMes == message) {
                IsCreate = false;
                break;
            } else {
                IsCreate = true;
            }
        }
        if (IsCreate) {
            toastr.warning(message);
        }
    } else {
        toastr.warning(message);
    }

    //MP.Msg.alertMessage("warning", "警告", message, fn);
}

/**
 * 消息错误
 * @param message
 * @param fn
 */
MP.Msg.error = function (message, fn) {
    toastrInit(3500);

    var currentMesSizes = $('div.toast-message').size();
    if (currentMesSizes != 0) {
        for (var i = 1; i <= currentMesSizes; i++) {
            var IsCreate;
            var target = "#toast-container div.toast-message:eq(" + (i - 1) + ")";
            var currentMes = $(target).text();
            if (currentMes == message) {
                IsCreate = false;
                break;
            } else {
                IsCreate = true;
            }
        }
        if (IsCreate) {
            toastr.error(message);
        }
    } else {
        toastr.error(message);
    }

    //MP.Msg.alertMessage("error", "错误", message, fn);
}

/**
 * 确认框
 * @param title
 * @param message
 * @param callback 参数为：true,false
 */
MP.Msg.confirm = function (title, message, callback) {
    MPMsg.confirm({type: "warning", title: title, message: message}).on(callback);
}

/**
 * 弹出提示消息
 * @param type 消息类型
 * @param title 消息标题
 * @param message 消息内容
 */
MP.Msg.alertMessage = function (type, title, message, fn, width) {
    MPMsg.alert({type: type, title: title, message: message}).on(function (e) {
        fn && fn();
    });
};
(function ($) {

    window.MPMsg = function () {
        var success_html = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
            '<div class="modal-dialog modal-lg">' +
            '<div class="modal-content">' +
            '<div class="bg-green color-palette" style="height: 40px;"> <h4 style="color: white;padding:10px;"><i class="icon fa fa-check"></i> [Title]</h4> </div>' +
            '<div class="modal-body">' +
            '<p>[Message]</p>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-default cancel" data-dismiss="modal">[BtnCancel]</button>' +
            '<button type="button" class="btn btn-success ok" data-dismiss="modal">[BtnOk]</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        var warning_html = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
            '<div class="modal-dialog modal-sm">' +
            '<div class="modal-content">' +
            '<div class="bg-yellow color-palette" style="height: 40px;"> <h4 style="color: white;padding:10px;"><i class="icon fa fa-warning"></i> [Title]</h4> </div>' +
            '<div class="modal-body">' +
            '<p>[Message]</p>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-default cancel" data-dismiss="modal">[BtnCancel]</button>' +
            '<button type="button" class="btn btn-warning ok" data-dismiss="modal">[BtnOk]</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        var error_html = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
            '<div class="modal-dialog modal-sm">' +
            '<div class="modal-content">' +
            '<div class="bg-red color-palette" style="height: 40px;"> <h4 style="color: white;padding:10px;"><i class="icon fa fa-ban"></i> [Title]</h4> </div>' +
            '<div class="modal-body">' +
            '<p>[Message]</p>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-default cancel" data-dismiss="modal">[BtnCancel]</button>' +
            '<button type="button" class="btn btn-danger ok" data-dismiss="modal">[BtnOk]</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
        var generateId = function () {
            var date = new Date();
            return 'mdl' + date.valueOf();
        }
        var init = function (options) {
            options = $.extend({}, {
                type: "success",
                title: "操作提示",
                message: "提示内容",
                btnok: "确定",
                btncl: "取消",
                width: 200,
                auto: false
            }, options || {});
            var modalId = generateId();
            html = success_html;
            if (options.type == "error") {
                html = error_html;
            }
            if (options.type == "warning") {
                html = warning_html;
            }
            if (options.type == "success") {
                html = success_html;
            }
            var content = html.replace(reg, function (node, key) {
                return {
                    Id: modalId,
                    Title: options.title,
                    Message: options.message,
                    BtnOk: options.btnok,
                    BtnCancel: options.btncl
                }[key];
            });
            $('body').append(content);
            $('#' + modalId).modal({
                width: options.width,
                backdrop: 'static'
            });
            $('#' + modalId).on('hide.bs.modal', function (e) {
                $('body').find('#' + modalId).remove();
            });
            return modalId;
        }

        return {
            alert: function (options) {
                if (typeof options == 'string') {
                    options = {
                        message: options
                    };
                }
                var id = init(options);
                var modal = $('#' + id);
                modal.find('.cancel').hide();

                return {
                    id: id,
                    on: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.find('.ok').click(function () {
                                callback(true);
                            });
                        }
                    },
                    hide: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.on('hide.bs.modal', function (e) {
                                callback(e);
                            });
                        }
                    }
                };
            },
            confirm: function (options) {
                var id = init(options);
                var modal = $('#' + id);
                $('#' + id + '>div.modal-dialog').css('margin', '200px auto');
                modal.find('.cancel').show();
                return {
                    id: id,
                    on: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.find('.ok').click(function () {
                                callback(true);
                            });
                            modal.find('.cancel').click(function () {
                                callback(false);
                            });
                        }
                    },
                    hide: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.on('hide.bs.modal', function (e) {
                                callback(e);
                            });
                        }
                    }
                };
            }
        }
    }();
})(jQuery);

/**
 * 通过页面获取用户页面按钮权限
 * （此权限为禁止使用权限）
 * @param menucode 菜单编码
 */
MP.getMenuButtonsPrivilege = function (menucode) {
    var functions = null;
    var menuArr = Scdp.CacheUtil.get(Scdp.Const.USER_PRIVILEGES);
    var menu = menuArr[menucode];
    if (Scdp.ObjUtil.isNotEmpty(menu)) {
        functions = menu.functionList;
    }
    return functions;
}

/**
 * 显示mask等待信息
 * @param id 标签的id
 */
MP.mask = function (id) {
    id = Scdp.ObjUtil.isEmpty(id) || id == true || id == 'true' ? "body" : "#" + id;
    $("<div class=\"datagrid-mask\" style='z-index: 99999;'><i class=\"fa fa-refresh\"></i></div>").css({
        display: "block",
        width: "100%",
        height: $(window).height()
    }).appendTo(id);
    $("<div class=\"datagrid-mask-msg\" style='z-index: 99998;'></div>").html(Scdp.I18N.MASK_WAITING).appendTo(id).css({
        display: "block",
        height: 40,
        //padding:"5 5 10 30",
        left: ($(document.body).outerWidth(true) - 190) / 2,
        top: ($(window).height() + 100) / 2
    });
}

/**
 * 隐藏mask显示
 */
MP.unmask = function () {
    $(".datagrid-mask").remove();
    $(".datagrid-mask-msg").remove();
}

/**
 * 公共ajax请求
 * @param data 请求参数
 * @returns {*}
 */
MP.Utils.ajax = function (data) {
    var retdata = {},
        success = data.successFn || function () {
            },
        failure = data.failureFn || function () {
            },
        param = {
            actionName: data.action,
            limit: data.postdata.limit,
            start: data.postdata.start,
            postData: Scdp.JSON.encode(data.postdata || {}),
        },
        mask = data.mask;
    var async = data.async;
    Scdp.ObjUtil.isEmpty(async) && (async = false);
    mask = (mask == 'false' || mask == false) ? null : mask;
    Scdp.ObjUtil.isNotEmpty(mask) && Scdp.mask(mask);
    if (!data.dataType) {
        data.dataType = "json";
    }

    $.ajax({
        //提交数据的类型 POST GET
        type: "POST",
        //提交的网址
        url: data.url,
        //提交的数据
        data: param,
        //返回数据的格式
        dataType: data.dataType,//"xml", "html", "script", "json", "jsonp", "text".
        async: async,
        //在请求之前调用的函数
        beforeSend: function () {
        },
        //成功返回之后调用的函数
        success: function (ret) {
            retdata = ret;
            Scdp.ObjUtil.isNotEmpty(retdata.message) && Scdp.Msg.info(retdata.message);
            var biz = retdata.bizexception;
            var sys = retdata.sysexception;
            var errorCode = retdata.errorcode;
            biz ? (Scdp.Msg.warn(Scdp.StrUtil.htmlEncode(biz).replace("\n", "\x3cbr/\x3e"),
                function () {
                    if ("3" === errorCode.substr(0, 1)) {
                        window.location.replace(Scdp.getSysConfig("base_path"));
                        Scdp.CacheUtil.removeAllTemp();
                        window.sessionStorage.clear();
                    }
                }), failure()) : sys ? (errorCode = retdata.stack,
                Scdp.Msg.error(sys + "\x3cbr/\x3e\x3cbr/\x3e[Error Code:" + errorCode + "]"),
                failure()) : success(retdata);
            retdata.loginTimeout && (window.LOGIN_TIMEOUT = retdata.loginTimeout)
        },
        //调用执行后调用的函数
        complete: function (XMLHttpRequest, textStatus) {
            Scdp.ObjUtil.isNotEmpty(mask) && Scdp.unmask();
        },
        //调用出错执行的函数
        error: function () {
            //请求出错处理
            Scdp.Msg.error(Scdp.I18N.CONNECT_ERROR);
            failure()
        }
    });
    if (false == async) {
        return retdata
    }
};


/**
 * 公共数据请求对象
 * @param url action的url
 * @param params 参数
 * @param success 成功返回函数
 * @param failure 失败返回函数
 * @param maskid 等待标签的id
 * @param async 是否异步
 * @param fileid 文件上传标签的id(如果有多个文件，则id用“,”分隔)
 */
MP.doAction = function (url, params, success, failure, maskid, async, fileid) {
    success = success || function () {
        };
    failure = failure || function () {
        };
    params = params || {};
    "sys-user-login" !== url && (params.userId = Scdp.CacheUtil.get(Scdp.Const.USER_ID));
    params.userLocaleId = Scdp.getSysConfig("locale_id");
    params.timestamp = Date.now();
    params.network = window.NETWORK_DELAY;
    //Scdp.ObjUtil.isEmpty(params.menuCode) && (params.menuCode = Scdp.getActiveModule() ? Scdp.getActiveModule().menuCode : null );
    params.signature = Scdp.getSign(url, params);
    if (Scdp.ObjUtil.isNotEmpty(fileid)) {
        params = JSON.stringify(params);
        var h,
            mask = maskid;
        Scdp.ObjUtil.isEmpty(async) && (async = false);
        mask = (mask == 'false' || mask == false) ? null : mask;
        Scdp.ObjUtil.isNotEmpty(mask) && $("#" + fileid) && ($("#" + fileid).length > 0) && MP.mask(mask);
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
                Scdp.ObjUtil.isNotEmpty(mask) && MP.unmask();
                success(h);
                h.loginTimeout && (window.LOGIN_TIMEOUT = h.loginTimeout)
            },
            failure: function (a, b) {
                Scdp.ObjUtil.isNotEmpty(mask) && MP.unmask();
                h = JSON.parse(b.response.responseText);
                Scdp.ObjUtil.isNotEmpty(h.message) && Scdp.Msg.info(h.message);
                var bizexception = h.bizexception
                    , e = h.sysexception;
                bizexception ? Scdp.Msg.warn(Scdp.StrUtil.htmlEncode(bizexception).replace("\n", "\x3cbr/\x3e")) : e && Scdp.Msg.error(e + "\x3cbr/\x3e\x3cbr/\x3e[Error Code:" + h.stack + "]");
                failure();
                h.loginTimeout &&
                (window.LOGIN_TIMEOUT = h.loginTimeout)
            },
            complete: function () {
                Scdp.ObjUtil.isNotEmpty(mask) && MP.unmask();
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

//日期格式化
MP.dateFormatter = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
}

//时间格式化
MP.datetimeFormatter = function (datetime) {
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


//将日期格式(yyyy-MM-dd)的字符串值转化为日期类型
MP.dateParser = function dateParser(s) {
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
 * 时间相隔距离 以天、时、分、秒、毫秒表示
 * @param sDate1
 * @param sDate2
 * @returns {{}}  时间对象，包含（天、时、分、秒、毫秒）
 */
MP.getDateDiff = function (sDate1, sDate2) { //sDate1和sDate2是字符串 yyyy-MM-dd格式
    var oDate1, oDate2;
    if (Scdp.ObjUtil.isEmpty(sDate1) || Scdp.ObjUtil.isEmpty(sDate2)) {
        return;
    }
    oDate1 = new Date(sDate1);
    oDate2 = new Date(sDate2);
    var timeSpan = {};
    var TotalMilliseconds = Math.abs(oDate1 - oDate2);//相差的毫秒数
    timeSpan.Days = parseInt((TotalMilliseconds / 1000 / 60 / 60 / 24).toFixed(0));
    timeSpan.TotalHours = parseInt((TotalMilliseconds / 1000 / 60 / 60).toFixed(0));
    timeSpan.Hours = timeSpan.TotalHours % 24;
    timeSpan.TotalMinutes = parseInt((TotalMilliseconds / 1000 / 60).toFixed(0));
    timeSpan.Minutes = timeSpan.TotalMinutes % 60;
    timeSpan.TotalSeconds = parseInt((TotalMilliseconds / 1000).toFixed(0));
    timeSpan.Seconds = timeSpan.TotalSeconds % 60;
    timeSpan.TotalMilliseconds = TotalMilliseconds;
    timeSpan.Milliseconds = TotalMilliseconds % 1000;
    return timeSpan;
}

//日期比较
MP.dateCompare = function (startDate, endDate) {
    // 
    var startDate1 = new Date(startDate);
    var endDate1 = new Date(endDate);

    if (startDate1 > endDate1) {
        return false;
    }
    else
        return true;
}


//date日期字符串yyyy-MM-dd 增加减少day天数 返回日期字符串yyyy-MM-dd
MP.dateAddDay = function (date, day) {
    var date1 = new Date(date);
    var datetime = date1.getTime() + (1000 * 60 * 60 * 24 * day);//加day天
    date1.setTime(datetime);
    date = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
    return date;
}

//date日期字符串yyyy-MM 增加减少Month数 返回日期字符串yyyy-MM
MP.dateAddMonth = function (date, month) {
    var date1 = new Date(date);
    var cmonth = date1.getMonth();
    cmonth = parseInt(cmonth) + parseInt(month);
    date1.setMonth(cmonth);
    date = date1.getFullYear() + "-" + (date1.getMonth() + 1);
    return date;
}

//date日期字符串yyyy-MM-dd 增加减少year数 返回日期字符串yyyy-MM-dd
MP.addYear = function (date, years) {
    var date1 = new Date(date);
    var cyear = date1.getFullYear();
    cyear = parseInt(cyear) + parseInt(years);
    date1.setYear(cyear);
    date = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
    return date;
}
/**
 * 检查日期是否合法
 * @param date   yyyy-MM-dd
 * @returns {boolean}
 */
MP.dateCheck = function (date) {
    return (new Date(date).getDate() == date.substring(date.length - 2));
}
/**
 * 检查时间是否合法
 * @param date yyyy-MM-dd hh:mm:ss
 * @returns {boolean}
 */
MP.timeCheck = function (date) {
    return (new Date(date).getSeconds() == date.substring(date.length - 2));
}
/**
 * 获取datagrid的列名和显示名
 * @param dataGridId
 */
MP.getGdFiledAndHeadTitle = function (dataGridId) {
    var columnName = [];
    var columnFriendlyName = [];
    var allColumns = $("#" + dataGridId).datagrid('options').columns;
    for (i = 0; i < allColumns.length; i++) {
        var column_row = allColumns[i];
        for (j = 0; j < column_row.length; j++) {
            if (column_row[j].field != null && column_row[j].field != ""
                && column_row[j].title != null && column_row[j].title != ""
                && column_row[j].hidden != true) {
                columnName.push(column_row[j].field);
                columnFriendlyName.push(column_row[j].title);
            }
        }
    }
    var result = {columnName: columnName, columnFriendlyName: columnFriendlyName};
    return result;
}
/**
 * @author 彭湃
 * 获取这个月的总天数
 * @param data 时间  格式yyyy-MM-dd
 */
MP.getCountDays = function (data) {
    var curDate = new Date(data);
    var curMonth = curDate.getMonth();
    curDate.setMonth(curMonth + 1);
    curDate.setDate(0);
    return curDate.getDate();
}

/**
 * 清除form中的数据
 * @param formid
 */
MP.clearFormData = function (formid) {
    $("#" + formid).form("clear");
}

/**
 * 获取combo的数据
 * @param daoType
 * @param codeType 当daotype 为 scdp_fmcode时，才使用
 * @param filterMap
 * @param notNeedAll
 */
MP.getComboxData = function (daoType, codeType, filterMap, notNeedAll) {
    var comboxdata = MP.getComboStoreDate(daoType, codeType, null, filterMap);
    if (!notNeedAll) {
        comboxdata.unshift({code: "", codedesc: "--全部--"});
    }
    return comboxdata;
}


/**
 * 重写框架中的getComboStoreDate，将action名和查询条件作为缓存的存储条件
 * @param a
 * @param b
 * @param c
 * @param d
 * @returns {*}
 */
MP.getComboStoreDate = function (a, b, c, d) {
    var e = {};
    e.comboType = Scdp.StrUtil.replaceNull(a);
    e.codeType = Scdp.StrUtil.replaceNull(b);
    e.menuCode = Scdp.StrUtil.replaceNull(c);
    e.filterMap = d || {};
    a = Scdp.StrUtil.getMd5(JSON.stringify(e));
    b = Scdp.CacheUtil.getPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, a + e);//获取所有页面中 CACHE_TYPE_COMBO_STORE 缓存
    if (Scdp.ObjUtil.isEmpty(b)) {
        b = Scdp.doAction("common-combostore-load", e, null, null, !1, !1);
        Scdp.DebugUtil.logInfo("Combo Type:" + e.comboType + " Code Type:" + e.comboType + " Filter:" + JSON.stringify(e.filterMap) + " Load Data from Server!");
        if (!b && !b.success)
            return;
        b = b.root;
        Scdp.CacheUtil.setPage(Scdp.Const.CACHE_TYPE_COMBO_STORE, a + e, b)
    }
    return b
}


/**
 * ip验证
 * @param ip
 */
MP.Utils.verifyIp = function (ip) {
    if (!ip.match(/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/)) {
        MP.Msg.warn("请输入有效的IP！");
        return false;
    }
    return true;
}

/**
 * 设置form中元素是否可编辑
 * @param boolean
 */
MP.setFormDisabled = function (id, boolean) {
    var form = $("#" + id)[0];
    for (var i = 0; i < form.length; i++) {
        var element = form.elements[i];
        element.disabled = boolean;
    }
}


/*
 后台时间显示去掉 T
 */
MP.TranslateTime = function (value) {
    return Scdp.StrUtil.replaceFirst(value, "T", " ");
}
/*
 后台时间显示去掉 T00:00:00
 */
MP.TranslateTimeAll = function (value) {
    return Scdp.StrUtil.replaceFirst(value, "T00:00:00", " ");
}
/*
 后台时间去掉时分秒
 */
MP.formatterDateNoSecond = function (value) {
    if (value && value.length > 0) {
        var date = new Date(MP.TranslateTime(value));
        var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
        var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
        + (date.getMonth() + 1);
        return date.getFullYear() + '-' + month + '-' + day;
    }
    return "";

}
/**
 * 公共执行导出函数--XieJuan
 * @param searchForm 查询条件的FormID
 * @param dataGrid 数据展示的DataGrid的ID
 * @param fileName 导出文件名称
 * @param success
 */
MP.doExport = function (formId, gridId, url, fileName, success) {
    var viewData = MP.getGdFiledAndHeadTitle(gridId);
    var formData = MP.getFormData(formId);
    viewData["formData"] = formData;
    debugger
    var param = {
        exportFileName: fileName,
        queryResultColumnNames: viewData.columnName,
        queryResultColumnFriendlyNames: viewData.columnFriendlyName,
        viewdata: formData,
        isexport: 1
    };
    MP.doAction(url, param, success, null, true, true, "export");
}

/**
 * 将时间控件转换为只能选择年和月的方法--luoxiaojian
 * @param dateboxId 控件的id
 */
MP.makeDateboxYearMouth = function (dateboxId) {
    // var p = $('#' + dateboxId).datebox('panel'), // 日期选择对象
    //     tds = false, // 日期选择对象中月份
    //     span = p.find('span.calendar-text'); // 显示月份层的触发控件
    $('#' + dateboxId).datebox({
        // onShowPanel: function () {// 显示日趋选择对象后再触发弹出月份层的事件，初始化时没有生成月份层
        //     span.trigger('click'); // 触发click事件弹出月份层
        //     if (!tds)
        //         setTimeout(function () {// 延时触发获取月份对象，因为上面的事件触发和对象生成有时间间隔
        //             tds = p.find('div.calendar-menu-month-inner td');
        //             tds.click(function (e) {
        //                 e.stopPropagation(); // 禁止冒泡执行easyui给月份绑定的事件
        //                 var year = /\d{4}/.exec(span.html())[0]// 得到年份
        //                     , month = parseInt($(this).attr('abbr'), 10) + 1; // 月份
        //                 $('#' + dateboxId).datebox('hidePanel')// 隐藏日期对象
        //                     .datebox('setValue', year + '-' + month); // 设置日期的值
        //             });
        //         }, 0);
        // },
        parser: function (s) {// 配置parser，返回选择的日期
            debugger
            if (!s)
                return new Date();
            var arr = s.split('-');
            return new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, 1);
        },
        formatter: function (d) {
            debugger
            var month = d.getMonth() + 1;

            if (month < 10) {
                month = "0" + month;
            }
            return d.getFullYear() + '-' + month;

        }// 配置formatter，只返回年月
    });
}

/* mcg 2016-10-17
 为easyui控件添加placeholder属性
 使用方式如下：
 <input class="easyui-combobox" style="width: 85%" name="sex"
 id="sex"  placeholder="请选择性别..."/>
 */
MP.placeholder = function () {
    $('input[class^="easyui"]').each(function (i) {
        var span = $(this).siblings("span")[0];
        var targetInput = $(span).find("input:first");
        if (targetInput) {
            $(targetInput).attr("placeholder", $(this).attr("placeholder"));
        }
    })
}
/**
 * 加密提交参数
 */
MP.paramsEncrypt = function (url, params) {
    params = params || {};
    "sys-user-login" !== url && (params.userId = Scdp.CacheUtil.get(Scdp.Const.USER_ID));
    params.userLocaleId = Scdp.getSysConfig("locale_id");
    params.timestamp = Date.now();
    params.network = window.NETWORK_DELAY;
    //Scdp.ObjUtil.isEmpty(params.menuCode) && (params.menuCode = Scdp.getActiveModule() ? Scdp.getActiveModule().menuCode : null );
    params.signature = Scdp.getSign(url, params);
    var param = {
        actionName: url,
        postData: Scdp.JSON.encode(params || {})
    };
    return param;
}

/**
 * 删除图片方法
 */
MP.deleteImg = function (uuid, galleryname, getimageUrl, orgcode, checkUser, checkStation) {
    MP.doAction("file-delete", {key: uuid}, function (d) {
        var parm = {};
        parm.orgcode = orgcode;
        parm.checkUser = checkUser;
        parm.checkStation = checkStation;
        if (d.statusCode = 10200) {
            //删除成功，刷新
            MP.Msg.info("图片删除成功！");
            MP.loadAlbumData(galleryname, getimageUrl, parm);
        }
    }, function () {
    }, true, true);
}
/**
 * 加载图片
 * @param galleryname 加载图片的div容器 id名称保证唯一
 * @param getimageUrl 图片后台注解路径
 * @param param 前台查询参数
 */
MP.loadAlbumData = function (galleryname, getimageUrl, param) {
    //为相册赋值

    var imgs = MP.getPicJson(getimageUrl, param);
    if (null != imgs) {
        //移除所有节点
        $("#" + galleryname).find("li").remove();
        for (var index in imgs.imgInfos) {
            var a = '<li class="file-preview-frame file-preview-initial" style="width:180px;height: 150px;" ><a href="' + imgs.imgInfos[index].imgPath + '"><img src="' + imgs.imgInfos[index].imgTumbPath + '" width="180px" height="120px" />' +
                '<div class="file-footer-caption">' + imgs.imgInfos[index].imgFileName + '</div></a>' + '<div class="file-actions">' +
                '<div class="file-footer-buttons">' +
                '<button type="button" itemId="test1" onclick="MP.deleteImg(\'' + imgs.imgInfos[index].fileUuid + '\',\'' + galleryname + '\',\'' + getimageUrl + '\',\'' + param.orgcode + '\',\'' + param.checkUser + '\',\'' + param.checkStation + '\')" class="kv-file-remove btn btn-xs btn-default" title="删除文件"><i class="glyphicon glyphicon-trash text-danger"></i></button>' +
                '</div>' +
                '</div>' +
                '</li>';
            $("#" + galleryname).append(a);
        }
        //添加监听
        $(".zoom, .gallery li a").on("click", loadAlbum);
    }
}


/**
 * 加载图片(去掉删除)
 * @param galleryname 加载图片的div容器 id名称保证唯一
 * @param getimageUrl 图片后台注解路径
 */
MP.loadPictureData = function (galleryname, getimageUrl, param) {
    //为相册赋值
    var imgs = MP.getPicJson(getimageUrl, param);
    if (null != imgs) {
        //移除所有节点
        $("#" + galleryname).find("li").remove();
        for (var index in imgs.imgInfos) {
            var a = '<li class="file-preview-frame file-preview-initial" style="width:180px;height: 150px;" ><a href="' + imgs.imgInfos[index].imgPath + '"><img src="' + imgs.imgInfos[index].imgTumbPath + '" width="180px" height="120px" />' +
                '<div class="file-footer-caption">' + imgs.imgInfos[index].imgFileName + '</div></a>' + '<div class="file-actions">' +
                '</div>' +
                '</li>';
            $("#" + galleryname).append(a);
        }
        //添加监听
        $(".zoom, .gallery li a").on("click", loadAlbum);
    }
}

/**
 * 加载图片 使用bootstrap自带插件展示(去掉删除)
 * @param galleryname 加载图片的div容器 id名称保证唯一
 * @param getimageUrl 图片后台注解路径
 */
MP.loadPictureData_bootstrap = function (galleryname, getimageUrl, param) {
    //为相册赋值
    var imgs = MP.getPicJson(getimageUrl, param);
    var imgLength = imgs.imageConfig.length;
    $("#" + galleryname + " ol.carousel-indicators").find("li").remove();
    $("#" + galleryname).find("a").remove();
    $("#" + galleryname).find("p").remove();
    $("#" + galleryname + " div.carousel-inner").find("div.item").remove();
    if (imgLength != 0) {
        for (var index in imgs.imgInfos) {
            var a = '<li data-target="#' + galleryname + '" data-slide-to="' + index + '" style="border-color:#000;"></li>';
            var imgInfo = '<div class="item"><img src="' + imgs.imgInfos[index].imgTumbPath + '" style="height:100%;width:100%;" alt="' + imgs.imgInfos[index].imgFileName + '"><div class="carousel-caption" style="color:#000;">' + imgs.imgInfos[index].imgFileName + '</div></div>';
            $("#" + galleryname + " ol.carousel-indicators").append(a);
            $("#" + galleryname + " div.carousel-inner").append(imgInfo);
        }
        var b = '<a class="carousel-control left" href="#' + galleryname + '"data-slide="prev" style="width:50px;color:#000;line-height:300px;font-size:45px;position: absolute;left:-50px;">&lsaquo;</a>' +
            '<a class="carousel-control right" href="#' + galleryname + '"data-slide="next" style="width:50px;color:#000;line-height:300px;font-size:45px;position: absolute;right: -50px;">&rsaquo;</a>';
        $("#" + galleryname).append(b);
        $("#" + galleryname + " ol.carousel-indicators li:first-child").addClass('active');
        $("#" + galleryname + " div.carousel-inner div:first-child").addClass('active');
    } else {
        $("#" + galleryname).append("<p style='text-align: center;line-height: 115px;font-size: 30px;'><br>暂无图片信息</p>");
        // $("#" + galleryname).removeClass('orgGallery');
    }
}
/**
 * 从服务器获得图片json数据
 */
MP.getPicJson = function (getimageUrl, param) {
    var imgs = {};
    //图片上传预览
    var imgPreview = [];
    //图片配置
    var imgConfig = [];
    //图片信息
    var imgInfos = [];
    //获得本站json数据
    MP.doAction(getimageUrl, param, function (data) {
        for (var index in data.data) {
            if (null == data.data[index].filePath || data.data[index].filePath == "") {
                continue;
            }
            var imgInfo = {};
            imgPreview.push("<img src='" + data.data[index].thumbPath + "' class='file-preview-image'/>");
            imgConfig.push({
                caption: data.data[index].fileName,
                width: "180px",
                url: Scdp.Const.JSON_ACTION,
                key: data.data[index].fileUuid
            })
            imgInfo.imgPath = data.data[index].filePath;
            imgInfo.imgTumbPath = data.data[index].thumbPath;
            imgInfo.imgFileName = data.data[index].fileName;
            imgInfo.fileUuid = data.data[index].fileUuid;
            imgInfos.push(imgInfo)
        }

    }, null, null, false);
    imgs.imagePreview = imgPreview;
    imgs.imageConfig = imgConfig;
    imgs.imgInfos = imgInfos
    return imgs;
}

/**
 * 初始化相册
 * @param nodename 上传文件的id id名称保证唯一
 * @param uploadnode 上传div框对象
 * @param albumnode 初始化div框对象
 * @param galleryname 加载图片的div容器 id名称保证唯一
 * @param getimageUrl 获取图片后台注解
 * @param fileurl 保存图片后台注解
 * @param param 图片保存参数
 */
MP.initImage = function (nodename, uploadnode, albumnode, galleryname, getimageUrl, fileurl, param) {
    $("#" + nodename).fileinput({
        uploadUrl: Scdp.Const.JSON_ACTION,
        language: 'zh',
        minFileCount: 1,
        deleteUrl: Scdp.Const.JSON_ACTION,
        maxFileCount: 3,
        mainClass: "input-group-lg",
        allowedFileExtensions: ['jpg', 'png', 'gif'],
        showPreview: true,
        showUpload: true,
        //是否显示文件选择按钮
        showBrowse: true,
        // //定义图片
        // initialPreview: imgs.imagePreview,
        // //定义图片配置
        // initialPreviewConfig: imgs.imageConfig,
        previewSettings: {image: {width: "180px", height: "auto"}},
        uploadExtraData: function () {  // callback example
            return MP.paramsEncrypt("file-add", {});
        },
        deleteExtraData: function () {
            return MP.paramsEncrypt("file-delete", {});
        }
        //图片删除后执行的方法
    }).off('filedeleted').on('filedeleted', function (event, data) {


    }).off('fileclear').on('fileclear', function () {
        uploadnode.hide();
        albumnode.show();
        MP.loadAlbumData(galleryname, getimageUrl, param);
        return false;
    }).off('fileuploaded').on('fileuploaded', function (event, data) {
        //保存图片管理路径

        if (null != data.response.data && data.response.data.length > 0 && data.response.data[0].uuid) {
            param.fileUuid = data.response.data[0].uuid;
            MP.doAction(fileurl, param, function () {
                //uploadnode.empty();
                uploadnode.hide();
                albumnode.show();
                MP.loadAlbumData(galleryname, getimageUrl, param);
                MP.Msg.info("图片上传成功！");
                $("div.file-live-thumbs").empty();   //清空上传的图片
                $("div.file-live-thumbs").height(180);
                return true;
            }, null, false, false);
        }

    }).off('filesuccessremove').on('filesuccessremove', function (event, data) {
        MP.doAction("file-delete", {}, function (d) {
            if (d.statusCode = 10200) {

                MP.Msg.info("图片删除成功！");
            }
        }, null, false, false);

    }).on('fileselect', function (data) {

    });
}

/**
 * fl tab 切换 control.js可以调用
 */
MP.tabChange = function (context) {
    $(".tab-list li").click(function () {
        $(".tab-list li", context.view.ele).eq($(this).index()).addClass("on").siblings().removeClass("on");
        $(".div-content", context.view.ele).hide().eq($(this).index()).stop().show();
    });
}
MP.formatterDate = function (date) {
    var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
    + (date.getMonth() + 1);
    return date.getFullYear() + '-' + month + '-' + day;
};
/**
 * @create by 杜万江
 * 获取传入月份的最后一天日期
 * @param date
 * @returns {string}
 */
MP.getMonthLastDate = function (date) {
    if (!date) {
        return
    }
    if ("string" == typeof date) {
        date = new Date(date)
    }
    var day = MP.getCountDays(date);
    day = day > 9 ? day : "0" + day;
    var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
    + (date.getMonth() + 1);
    return date.getFullYear() + '-' + month + '-' + day;
};
/**
 * @create by 杜万江
 * 获取传入月份的最后一天时间
 * @param date
 * @returns {string}
 */
MP.getMonthLastDateTime = function (date) {
    if (!date) {
        return
    }
    return MP.getMonthLastDate(date) + " 23:59:59";
};

/**   王令
 * 下拉框下面加入 全部，选择类型
 * @param jsonData 后台数据
 * @param textString 类别名字
 * @param textFiled text名字
 * @param valueFiled value名字
 */
MP.addCommboxTitle = function (jsonData, textString, textFiled, valueFiled) {
    if (textString == null) {
        textString = "全部类别";
    }
    if (textFiled == null) {
        textFiled = "text";
    }
    if (valueFiled == null) {
        valueFiled = "id";
    }
    var station_posttoll = {};
    station_posttoll[textFiled] = textString;
    station_posttoll[valueFiled] = "";
    var target = 1;
    if (jsonData.length > 0) {
        for (var i = 0; i < jsonData.length; i++) {
            if (jsonData[i].id == "" && jsonData[i].text == textString || jsonData[i].code == "") {
                //防止缓存多写入数据，不在添加
                target = 2;
            }
        }
    }
    if (target == 1) {
        jsonData.unshift(station_posttoll);
    }
    return jsonData;
}

/**   王令
 * 字符串转为日期
 * @param jsonString 数据库日期
 */
MP.StringToDate = function (jsonString) {
    return jsonString.substring(0, 10);
}

/**   谭根源
 * 富文本初始化
 * @param textareaId
 */
MP.UMEditorFun = function (textareaId) {
    UM.delEditor(textareaId);
    return UM.getEditor(textareaId);
}
/**   谭根源
 * 富文本图片移除
 * @param value 富文本 text
 */
MP.UMEditorImgHide = function (value) {
    return value.replace(/<img/g, "<img style='display:none'");
}

/**   王令
 * echart图表设置动画效果
 * @param echartdata  echart数据源
 * @param echarOption  echart绑定数据 如：rate_echarts_div.setOption(rate_echarts_option);
 */
MP.AnimationEacharts = function (echartData, echartId, echartOption) {

    var timer = null;
    var i = 0;
    var arr = echartData;
    var clone = arr[0];
    var newArr = arr.concat(clone);
    timer = setInterval(function () {
        i++;
        if (i == newArr.length) {
            newArr[i - 1].selected = false;
            i = 1;
        }
        newArr[i - 1].selected = false;
        newArr[i].selected = true;
        echartId.setOption(echartOption);
    }, 1500);
}

/**
 * 获取当前月
 * @returns {string}
 */
MP.DateUtils.getCurrentMonth = function () {
    var nowDate = new Date();
    var nowYearMonth = nowDate.getFullYear() + "-" + ( parseInt(new Date().getMonth()) < 9 ? "0" + (parseInt(new Date().getMonth()) + 1) : parseInt(new Date().getMonth()) + 1);
    return nowYearMonth;
}
/**
 * @author luoxiaojian(qinchengshiyu@foxmail.com)
 * 根据相册的url加载相册图片
 * @param getimageUrl 相册地址
 * @param param 获取相册的参数
 * @param galleryname 相册div的名字  本方法有两种模式，如果本参数为空，方法将会返回一个html对象 ，此时需要调用initAlbumView();方法进行监听。
 * 若传有div id参数则不用，方法会自动监听
 *
 */
MP.loadAlbumData_Photo = function (getimageUrl, param, galleryname) {
    //为相册赋值
    var imgs = MP.getPicJson(getimageUrl, param);
    var img_ul = '<div class="docs-pictures carousel-inner">';
    var indicators_silde = '<ol class="carousel-indicators">';

    var html = '';
    if (null != imgs) {
        //移除所有节点
        $("#" + galleryname).find("li").remove();

        if (imgs.imgInfos.length == 0) {
            html = "<p style='text-align:center;line-height:80px;font-size:30px;'><br>暂无图片信息!</p>";
            $("#" + galleryname).html(html);
            return;
        }


        var a, b;
        for (var index = 0; index < imgs.imgInfos.length; index++) {
            if (index == 0) {
                b = '<li data-target="#' + galleryname + '" data-slide-to="' + index + '" class="active"></li>';
                a = '<div class="item file-preview-frame file-preview-initial active" style="width:97%;padding:5px;height: 250px;float: left;margin-left: 10px;cursor: pointer" >' +
                    '<img data-original="' + imgs.imgInfos[index].imgPath + '" src="' + imgs.imgInfos[index].imgPath + '" alt="' + imgs.imgInfos[index].imgFileName + '" style="padding:0;width: 100%;height: 240px">' +
                    '</div>';
            } else {
                b = '<li data-target="#' + galleryname + '" data-slide-to="' + index + '"></li>';
                a = '<div class="item file-preview-frame file-preview-initial" style="width:97%;height:250px;padding:5px;float: left;margin-left: 10px;cursor: pointer" >' +
                    '<img data-original="' + imgs.imgInfos[index].imgPath + '" src="' + imgs.imgInfos[index].imgPath + '" alt="' + imgs.imgInfos[index].imgFileName + '" style="padding:0;width: 100%;height: 240px">' +
                    '</div>';
            }

            indicators_silde += b;
            img_ul += a;
        }
        indicators_silde += '</ol>';
        img_ul += "</div>";
        html = indicators_silde + img_ul;

        html += '<a class="carousel-control left" href="#' + galleryname + '" data-slide="prev"><i class="fa fa-chevron-circle-left"></i></a>' +
            '<a class="carousel-control right" href="#' + galleryname + '" data-slide="next"><i class="fa fa-chevron-circle-right"></i></a>';

        if (null != galleryname) {

            $("#" + galleryname).html(html);
            //调用相册监听
            initAlbumView();
        } else {
            return html;
        }
    }
};

/**
 * 打开消息页面
 * @param actionparams
 */
MP.openMsgTab = function (actionparams) {
    //Scdp.openTab("Messagecenter.controller.messagecenterController", "消息中心", "MNU_BASEDATA_MESAGE", "MENU_ITEM_CTL", "null", false);
    var menucode = "MNU_BASEDATA_MESAGE";
    var title = "消息中心";
    Scdp.openTab("Messagecenter.controller.messagecenterController", title, menucode, Scdp.Const.MENU_TYPE_CTL, actionparams, true);
}

/**
 * 数组去重
 * @returns {Array}
 */
MP.Utils.arrayUnique = function (array) {
    var res = [];
    var json = {};
    for (var i = 0; i < array.length; i++) {
        if (!json[array[i]]) {
            res.push(array[i]);
            json[array[i]] = 1;
        }
    }
    return res;
}

/**
 * @Create 杜万江
 * 获取与当前时间差值
 * @param value 比较时间
 * @returns {string}
 */
MP.getDiffCurrentDate = function (value) {
    var result = "";
    if (Scdp.ObjUtil.isNotEmpty(value)) {
        var diffDate = MP.getDateDiff(new Date(), value);
        if (diffDate.Days) {
            result += diffDate.Days + '天';
        }
        if (diffDate.Hours) {
            result += diffDate.Hours + '小时';
        }
        if (diffDate.Minutes) {
            result += diffDate.Minutes + '分';
        }
        if (diffDate.Seconds) {
            result += diffDate.Seconds + '秒';
        }
        result += " 之前";
    }
    return result;
};

/**
 * @Create 马泽腾
 * 显示隐藏查询面板
 * @param e  点击事件对象
 */
MP.toggleConditionPanel = function (e) {
    var queryResultDiv = $(e.currentTarget).parentsUntil('section.content', '.queryResultDiv');
    queryResultDiv.parentsUntil('div.tab-pane', 'section').find('.queryConditionDiv').toggle();
    queryResultDiv.toggleClass('col-md-9').toggleClass('col-md-12');

    var backgroundUrl = $(e.currentTarget).css('background');
    if (backgroundUrl.indexOf('leftIn') == -1) {
        $(e.currentTarget).css('background', 'url(/bizmodules/images/icon/leftIn.png) no-repeat center');
    } else {
        $(e.currentTarget).css('background', 'url(/bizmodules/images/icon/rightOut.png) no-repeat center');
    }
};
/**
 * @Create 马泽腾
 * 上传文件 校验
 * @param id  上传文本框的id值
 * */
MP.filepathChange = function (id, type) {
    var f = document.getElementById(id).files;
    var name = f[0].name;
    var size = f[0].size;
    var names = name.split('.');
    var s = names[(names.length - 1)].toLowerCase();

    if (s != "pdf") {
        MP.Msg.warn("仅支持pdf文件，请重新选择文件！");
        document.getElementById(id).value = "";
    } else if (size > 1024 * 1024 * 20) {
        //不能大于20M
        MP.Msg.warn("文件不能大于20M，请重新选择！");
        document.getElementById(id).value = "";
    }
};
/**
 * @Create 马泽腾
 * 上传文件 校验
 * @param id  上传文本框的id值
 * */
MP.filepathChangeApk = function (id, type) {
    var f = document.getElementById(id).files;
    var name = f[0].name;
    var size = f[0].size;
    var names = name.split('.');
    var s = names[(names.length - 1)].toLowerCase();

    if (s != "apk") {
        MP.Msg.warn("仅支持apk文件，请重新选择文件！");
        document.getElementById(id).value = "";
    } else if (size > 1024 * 1024 * 50) {
        //不能大于20M
        MP.Msg.warn("文件不能大于50M，请重新选择！");
        document.getElementById(id).value = "";
    }
};

MP.doGreenPassCheckShowModal = function (i) {
    var me = this;
    $("#greenpasscheckModal").show();
    $("#greencheckClose").click(function () {
        $("#greenpasscheckModal").hide();
    });
    $("#greenPassCheckImgPrior").click(function () {
        if (MP.Const.imgArrayIndex != 0) {
            MP.Const.imgArrayIndex -= 1;
        }
        MP.doGreenPassCheckShowImg();
    });
    $("#greenPassCheckImgNext").click(function () {
        if (MP.Const.imgArrayIndex != MP.Const.imgArray) {
            MP.Const.imgArrayIndex += 1;
        }
        MP.doGreenPassCheckShowImg();
    });
    MP.Const.imgArrayIndex = i;
    MP.doGreenPassCheckShowImg();
};
MP.doGreenPassCheckShowImg = function () {
    var me = this;
    $("#greencheckImg").attr('src', MP.Const.imgArray[MP.Const.imgArrayIndex]);
};

/**
 * 绑定控件自动计算方法，传递formID和上下文对象
 *
 * 根据控件属性值，绑定change方法
 */
MP.bindSubSequence = function (formId, context) {
    var liNodes = $("[itemId=" + formId + "]", context).find('li.scdp-list-group-item');
    for (var index = 0; index < liNodes.length; index++) {
        $(liNodes[index]).find('input[subSequence="active"]').numberbox({
            onChange: function (a, b) {
                var subVal = $(this).numberbox('getValue');
                var subedVal = $(this).parents('li.scdp-list-group-item').find('input[subSequence="passive"]').numberbox('getValue');
                subVal = subVal == '' || subVal == null ? 0 : subVal;
                subedVal = subedVal == '' || subedVal == null ? 0 : subedVal;

                $(this).parents('li.scdp-list-group-item').find('input[subSequence="result"]').numberbox('setValue', subVal - subedVal);
                var showTotalA = $(this).parents('div.tollWorkReported-parent-div').find('input[subSequence="showTotal-active"]');
                var showTotalP = $(this).parents('div.tollWorkReported-parent-div').find('input[subSequence="showTotal-passive"]');
                var showTotalResult = $(this).parents('div.tollWorkReported-parent-div').find('input[subSequence="showTotal-result"]');
                showTotalA.numberbox('setValue', parseInt(showTotalA.numberbox('getValue') == '' || showTotalA.numberbox('getValue') == null ? 0 : showTotalA.numberbox('getValue')) + parseInt(subVal) - (b == '' || b == null ? 0 : b));
                //showTotalP.val(parseInt(showTotalP.val()==''||showTotalP.val()==null?0:showTotalP.val()) + parseInt(subedVal));
                showTotalResult.numberbox('setValue', showTotalA.numberbox('getValue') - showTotalP.numberbox('getValue'));
            }
        });
        $(liNodes[index]).find('input[subSequence="passive"]').numberbox({
            onChange: function (a, b) {
                var subedVal = $(this).numberbox('getValue');
                var subVal = $(this).parents('li.scdp-list-group-item').find('input[subSequence="active"]').numberbox('getValue');
                subVal = subVal == '' || subVal == null ? 0 : subVal;
                subedVal = subedVal == '' || subedVal == null ? 0 : subedVal;

                $(this).parents('li.scdp-list-group-item').find('input[subSequence="result"]').numberbox('setValue', subVal - subedVal);
                var showTotalA = $(this).parents('div.tollWorkReported-parent-div').find('input[subSequence="showTotal-active"]');
                var showTotalP = $(this).parents('div.tollWorkReported-parent-div').find('input[subSequence="showTotal-passive"]');
                var showTotalResult = $(this).parents('div.tollWorkReported-parent-div').find('input[subSequence="showTotal-result"]');
                //showTotalA.val(parseInt(showTotalA.val()==''||showTotalA.val()==null?0:showTotalA.val()) + parseInt(subVal));
                showTotalP.numberbox('setValue', parseInt(showTotalP.numberbox('getValue') == '' || showTotalP.numberbox('getValue') == null ? 0 : showTotalP.numberbox('getValue')) + parseInt(subedVal) - (b == '' || b == null ? 0 : b));
                showTotalResult.numberbox('setValue', showTotalA.numberbox('getValue') - showTotalP.numberbox('getValue'));
            }
        });
    }
}
/**
 * 日常巡查详情item项点击事件：打开模态框
 */
MP.dailyInspectDetailClick = function (uuid) {
    $("#opeInspectionDetailModal").modal('show');
    MP.Const.dailyInspectArrayIndex = 0;
    MP.doAction("inspect-result-get-single-items", {uuid: uuid}, function (ret) {
        //问题描述框和处理情况框赋值
        $("#dailyInspectDetailQuestion").text(ret.qandA.problemDescription == null ? "暂无" : ret.qandA.problemDescription);
        $("#dailyInspectDetailAnswer").text(ret.qandA.problemSolution == null ? "暂无" : ret.qandA.problemSolution);
        MP.Const.dailyInspectArray = ret.img;
        //绑定上一张图片按钮的事件
        $("#dailyInspectImgPrior").unbind('click');
        $("#dailyInspectImgPrior").click(function () {
            if (MP.Const.dailyInspectArrayIndex != 0) {
                MP.Const.dailyInspectArrayIndex -= 1;
            }
            MP.dailyInspectDetailShowImg();
        });
        //绑定下一张图片按钮的事件
        $("#dailyInspectImgNext").unbind('click');
        $("#dailyInspectImgNext").click(function () {
            if (MP.Const.dailyInspectArrayIndex != MP.Const.dailyInspectArray.length - 1) {
                MP.Const.dailyInspectArrayIndex += 1;
            }
            MP.dailyInspectDetailShowImg();
        });

        MP.dailyInspectDetailShowImg();
    }, null, true, true);

}
/**
 * 加载日常巡查详情Item所属的图片信息
 */
MP.dailyInspectDetailShowImg = function () {
    var me = this;
    $("#dailyInspectDetailImgDiv").attr('src', MP.Const.dailyInspectArray[MP.Const.dailyInspectArrayIndex]);
};

