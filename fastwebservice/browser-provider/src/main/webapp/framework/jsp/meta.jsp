<%@ page import="java.util.Locale" %>
<%@ page import="java.util.TimeZone" %>
<%@ page import="org.fast.service.util.StringUtil" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ page session="false" %>
<%
    String jsGlobal = "";
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    String languageId = "";
    jsGlobal += "<script type='text/javascript'>";
    jsGlobal += "window.SYSCONFIG_PRODUCT_MODE = true;";
    jsGlobal += "window.SYSCONFIG_DEMO_MODE = true;";
    jsGlobal += "window.SYSCONFIG_PRODUCT_CODE = 'apsid';";
    jsGlobal += "window.SYSCONFIG_IS_SAAS = false;";
    jsGlobal += "window.SYSCONFIG_LOCALE_ID = '" + languageId + "';";
    jsGlobal += "window.SYSCONFIG_BASE_PATH = '" + basePath + "';";
    jsGlobal += "window.SYSCONFIG_SERVER_NAME = '" + request.getServerName() + ":" + request.getServerPort() + "';";
    jsGlobal += "window.SYSCONFIG_RSA_DISABLED = true;";
    jsGlobal += "window.SYSCONFIG_RSA_KEY_LEN = 1024;";
    jsGlobal += "window.SYSCONFIG_OTP_DISABLED = true;";
    jsGlobal += "window.SYSCONFIG_TREE_MENU = true;";
    jsGlobal += "window.SYSCONFIG_TREE_MENU_ALWAYS_ON = true;";
    jsGlobal += "window.SYSCONFIG_MAINFRAME_STYLE_VERSION = '2';";
    jsGlobal += "window.SYSCONFIG_HELP_DOCUMENT_URL = 'http://www.baidu.com';";
    jsGlobal += "window.SYSCONFIG_SERVER_TZ = '" + TimeZone.getDefault().getID() + "';";
    jsGlobal += "window.SYSCONFIG_USING_UTC = false;";
    jsGlobal += "window.SYSCONFIG_HAS_WS = true;";
    jsGlobal += "window.SYSCONFIG_NEED_WORKFLOW = false;";
    jsGlobal += "</script>";
%>
<base href="<%=basePath%>">
<%--<link rel="shortcut icon" href="favicon.ico">--%>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
<meta name="renderer" content="webkit">
<noscript>
    <meta http-equiv="refresh" content="0;url=framework/warning/noscript.html">
</noscript>
<!--[if lte IE 8]>
<script type='text/javascript'>top.location.href = "framework/warning/browserwarning.html";</script>
<![endif]-->
<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lte IE 9]>
<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
<!-- The HTML5 shim, for IE6-8 support of HTML5 elements -->
<%--<!--[if lte IE 9]>--%>
<%--<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>--%>
<%--<![endif]-->--%>

<%=jsGlobal%>
<script type="text/javascript" src="/framework/js/3rdparty/jQuery/jquery-1.11.3.min.js"></script>

<link rel="stylesheet" type="text/css" href="/framework/css/scdp_common.css?201712140231"/>
<%--<link rel="stylesheet" type="text/css" href="framework/css/scdp_enhance.css"/>--%>

<%--<link rel="stylesheet" type="text/css" href="sysmodules/css/sysmodules.css?201712140231"/>--%>

<%--<script src="framework/js/3rdparty/adminlte/kendo/js/jquery.min.js"></script>--%>
<script type="text/javascript" src="/framework/js/3rdparty/jstz-1.0.4.min.js"></script>
<script type="text/javascript" src="/framework/js/3rdparty/crypt/md5.js"></script>
<!--[if !IE]><!-->
<script type="text/javascript" src="/framework/js/3rdparty/crypt/asmcrypto.js"></script>
<!--<![endif]-->
<!--[if IE 9]>
<script type="text/javascript" src="/framework/js/3rdparty/crypt/sha1.js"></script>
<script type="text/javascript" src="/framework/js/3rdparty/crypt/hmac-sha1.js"></script>
<script type="text/javascript" src="/framework/js/3rdparty/crypt/hmac-sha256.js"></script>
<![endif]-->

<script type="text/javascript" src="/framework/js_source/scdp_const_1.js?201712140231"></script>
<script type="text/javascript" src="/framework/js_source/scdp_init_2.js?201712140231"></script>
<script type="text/javascript" src="/framework/js_source/scdp_utils_3.js?201712140231"></script>
<script type="text/javascript" src="/framework/js_source/scdp_helper_4.js?201712140231"></script>
<script type="text/javascript" src="/framework/js_source/bootstrap_module_core_5.js?201712140231"></script>
<script type="text/javascript" src="/framework/js_source/bootstrap_mvc_6.js?201712140231"></script>
<%--<script type="text/javascript" src="/framework/js_source/bootstrap_comps_easyui_8.js?201712140231"></script>--%>
<script type="text/javascript" src="/framework/js_source/bootstrap_validator_9.js?201712140231"></script>
<script type="text/javascript" src="/framework/js_source/bootstrap_comps_options_10.js?201712140231"></script>

<script type="text/javascript" src="/framework/js_source/bootstrap_comps_7.js?201712140231"></script>
<%--<script type="text/javascript" src="framework/I18N/resource_<%=languageId%>.js"></script>--%>
<%--<script type="text/javascript" src="sysmodules/I18N/resource_<%=languageId%>.js"></script>--%>
<%--<script type="text/javascript" src="bizmodules/I18N/resource_<%=languageId%>.js"></script>--%>

<%--<script type="text/javascript" src="sysmodules/js/sysmodules.js?201712140231"></script>--%>

<%@include file="/bizmodules/jsp/bizmodules.jsp" %>
<link rel="stylesheet" href="/framework/js/3rdparty/plugins/animate/animate.min.css">
<!-- file input -->
<link rel="stylesheet" href="/framework/js/3rdparty/plugins/bootstrap-fileinput/css/fileinput.min.css">
<script type="text/javascript" src="/framework/js/3rdparty/plugins/bootstrap-fileinput/js/fileinput.min.js"></script>
<%--<script type="text/javascript" src="framework/js/3rdparty/plugins/bootstrap-fileinput/js/locales/<%=languageId%>.js"></script>--%>

