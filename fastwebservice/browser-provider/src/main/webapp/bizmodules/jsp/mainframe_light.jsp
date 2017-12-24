<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%--
  Created by IntelliJ IDEA.
  User: john
  Date: 2016/5/26
  Time: 12:53
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/framework/jsp/meta.jsp" %>
<%
    String bizpath = "bizmodules/adminlte";
%>
<!DOCTYPE html>
<head>
    <meta charset="utf-8" contentType="text/html;charset=UTF-8" pageEncoding="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>川高系统高速公路收费综合管理平台 | 首页</title>

    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

    <!-- 富文本样式文件 -->
    <link rel="stylesheet" href="<%=bizpath%>/umeditor/themes/default/css/umeditor.css">

    <!-- Bootstrap 3.3.6 -->
    <link rel="stylesheet" href="<%=bizpath%>/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="<%=bizpath%>/dist/css/Font-Awesome-4.6/css/font-awesome.min.css">
    <link rel="stylesheet"
          href="/bizmodules/adminlte/bootstrap_extension/bootstrap-table-develop/dist/bootstrap-table.css">

    <!-- x-editable -->
    <link href="/bizmodules/adminlte/bootstrap_extension/x-editable-develop/dist/bootstrap3-editable/css/bootstrap-editable.css"
          rel="stylesheet">

    <!-- toastr 提示框 -->
    <link href="/bizmodules/adminlte/toastr/css/toastr.css" rel="stylesheet" type="text/css"/>

    <!-- Ionicons -->
    <link rel="stylesheet" href="<%=bizpath%>/dist/css/ionicons.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="<%=bizpath%>/dist/css/AdminLTE.min.css">

    <link rel="stylesheet" href="<%=bizpath%>/dist/css/skins/_all-skins.min.css">
    <link rel="stylesheet" href="<%=bizpath%>/dist/css/skins/skins-menu.css">
    <link rel="stylesheet" href="<%=bizpath%>/plugins/iCheck/flat/blue.css">
    <link rel="stylesheet" href="<%=bizpath%>/plugins/morris/morris.css">
    <link rel="stylesheet" href="<%=bizpath%>/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">
    <link rel="stylesheet" href="<%=bizpath%>/dist/css/darktooltip.css">
    <link rel="stylesheet" href="/bizmodules/adminlte/dist/css/magic-check.css">
    <link rel="stylesheet" href="<%=bizpath%>/jquery-easyui-1.5/themes/bootstrap/easyui.css">

    <link rel="stylesheet" href="<%=bizpath%>/jquery-easyui-1.5/themes/icon.css">
    <link rel="stylesheet" href="<%=bizpath%>/jquery-easyui-1.5/themes/color.css">

    <!--框架封装样式-->
    <link rel="stylesheet" href="framework/js/3rdparty/plugins/iCheck/square/blue.css">
    <link rel="stylesheet" href="framework/js/3rdparty/plugins/bootstrap-tabdrop/tabdrop.css">
    <script src="framework/js/3rdparty/plugins/bootstrap-tabdrop/bootstrap-tabdrop.js"></script>

    <!--引用白色系列皮肤-->
    <link rel="stylesheet" href="bizmodules/css/homepage.css">
    <link rel="stylesheet" href="<%=bizpath%>/dist/css/cs-bizmodules-light.css">
    <script src="<%=bizpath%>/dist/js/pages/mainframe.init.js"></script>

    <!-- Bootstrap 3.3.6 -->
    <script src="<%=bizpath%>/plugins/jQuery/ajaxfileupload.js"></script>
    <script src="/bizmodules/adminlte/bootstrap_extension/bootstrap-table-develop/dist/bootstrap-table.js"></script>
    <script src="/bizmodules/adminlte/bootstrap_extension/bootstrap-table-develop/dist/locale/bootstrap-table-zh-CN.js"></script>
    <script src="/bizmodules/adminlte/bootstrap_extension/bootstrap-table-develop/dist/extensions/export/bootstrap-table-export.js"></script>
    <script src="/bizmodules/adminlte/bootstrap_extension/tableExport/libs/pdfmake/pdfmake.min.js"></script>
    <script src="/bizmodules/adminlte/bootstrap_extension/tableExport/libs/pdfmake/vfs_fonts.js"></script>
    <script type="text/javascript"
            src="/bizmodules/adminlte/bootstrap_extension/tableExport/libs/FileSaver/FileSaver.min.js"></script>
    <script type="text/javascript"
            src="/bizmodules/adminlte/bootstrap_extension/tableExport/libs/jsPDF/jspdf.min.js"></script>
    <script type="text/javascript"
            src="/bizmodules/adminlte/bootstrap_extension/tableExport/libs/jsPDF-AutoTable/jspdf.plugin.autotable.js"></script>
    <script type="text/javascript" src="/bizmodules/adminlte/bootstrap_extension/tableExport/tableExport.js"></script>

    <!-- x-editable -->
    <script src="/bizmodules/adminlte/bootstrap_extension/x-editable-develop/dist/bootstrap3-editable/js/bootstrap-editable.js"></script>
    <script src="/bizmodules/adminlte/bootstrap_extension/bootstrap-table-develop/dist/extensions/editable/bootstrap-table-editable.js"></script>

    <script src="<%=bizpath%>/bootstrap/js/bootstrap.min.js"></script>
    <!-- Slimscroll -->
    <script src="<%=bizpath%>/plugins/slimScroll/jquery.slimscroll.min.js"></script>
    <link rel="stylesheet" href="<%=bizpath%>/dist/css/jquery.flipster.css">
    <%--相册--%>
    <link rel="stylesheet" href="bizmodules/adminlte/imagealbum_jquery_plus/css/viewer.css">

</head>

<style>
    .tr-2 > td > div {
        width: 90px;
    }
</style>
<body></body>
</html>
