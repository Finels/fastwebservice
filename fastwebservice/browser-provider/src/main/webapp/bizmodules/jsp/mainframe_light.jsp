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
<body class="hold-transition skin-blue sidebar-mini sidebar-collapse skin-menu-light" style="overflow-y: hidden">
<%@ include file="mainheader.jsp" %>
<%@ include file="mainsidebar.jsp" %>
<input type="hidden" id="actionparams" value="">
<div class="content-wrapper" style="min-height:634px;">
    <div class="nav-tabs-custom frame_tab" id="navtabstrip">
        <%--外层导航--%>
        <ul id="route-tabs" class="nav nav-tabs">
            <li class="active" id="home">
                <a href="#content_home" data-toggle="tab" class="fa fa-home">
                    系统首页
                </a><i class="arrow-right"></i><em></em>
            </li>
            <span class="navbar-right closeAllTabs"><a title="关闭所有打开页" href="javascript:void(0)"><i
                    class="fa fa-times"></i></a></span>
        </ul>

        <%--<div class="pull-right" style="padding-top: 5px;padding-right: 10px;position: absolute;top: 50px;right: 10px;">--%>
        <%--<button type="button" class="btn btn-info btn-sm" id="mainframe_closeall" data-widget="remove" data-toggle="tooltip" title="关闭所有">--%>
        <%--<i class="fa fa-times"></i></button>--%>
        <%--</div>--%>

        <%--导航内容--%>
        <div class="tab-content">
            <div class="tab-pane active" id="content_home">
                <div class="maincont k-content">
                    <section style="padding:10px 15px 0 15px;">

                        <div class="row" style="padding: 5px 15px;">
                            <div class="col-md-3 showStatisticalData">
                                <div class="StatisticalDataPart1" style="padding: 20px;">
                                    <div class="col-md-6 col-sm-6 ">
                                    <span>
                                        <strong>201687478</strong>
                                        <font>本年MTC收入</font>
                                    </span>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <img src="<%=bizpath%>/dist/img/nsr.png" style="height:33px;"/> <br>
                                        <font class="fta" style="color: white;">同比增长0.03%</font>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-3 showStatisticalData">
                                <div class="StatisticalDataPart2">
                                    <div class="col-md-6  col-sm-6">
                                    <span>
                                        <strong>102923263.70</strong>
                                        <font>本年ETC收入</font>
                                    </span>
                                    </div>
                                    <div class="col-md-6  col-sm-6">
                                        <img src="<%=bizpath%>/dist/img/etcIncome.png" style="height:33px;"/> <br>
                                        <font class="fta" style="color: white;">同比增长135.72%</font>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-3 showStatisticalData">
                                <div class="StatisticalDataPart3">
                                    <div class="col-md-6  col-sm-6">
                                    <span>
                                        <strong>2351999</strong>
                                        <font>本年MTC出口站口流量</font>
                                    </span>
                                    </div>
                                    <div class="col-md-6  col-sm-6">
                                        <img src="<%=bizpath%>/dist/img/yhcll.png" style="height:33px;"/> <br>
                                        <font class="fta" style="color: white;">同比增长18.24%</font>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-3 showStatisticalData">
                                <div class="StatisticalDataPart4">
                                    <div class="col-md-6  col-sm-6">
                                    <span>
                                        <strong>1253546</strong>
                                        <font>本年ETC出口站口流量</font>
                                    </span>
                                    </div>
                                    <div class="col-md-6  col-sm-6">
                                        <img src="<%=bizpath%>/dist/img/yhcll.png" style="height:33px;"/> <br>
                                        <font class="fta" style="color: white;">同比增长21.72%</font>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="content" style="padding:0 15px;">

                        <div class="row" style="padding:15px 20px 15px 15px;">

                            <%--<div class="col-md-7" style="padding: 0 0 0 5px;">--%>
                            <%--<div id="echartsMap" style="height:545px;"></div>--%>
                            <%--</div>--%>
                            <div class="col-md-7" style="padding:0 0 0 5px;">
                                <div id="echartsBar_line" style="height:545px;"></div>
                            </div>
                            <div class="col-md-5 " style="padding: 0;">
                                <div class="statisticalGraph" style="padding-left: 15px;">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="padding:0;">
                                        <div class="col-md-6 col-xs-6" style="height: 215px;margin:0 0 15px 0"
                                             id="page11"></div>
                                        <div class="col-md-6 col-xs-6" style="height: 215px;" id="page12"></div>
                                        <span style="position: absolute;bottom: 22%;right: 23%;font-size: 14px;color: red;">超前</span>
                                    </div>
                                    <div class="col-md-12 col-sm-12 col-xs-12" id="homePage_echarts1"></div>
                                </div>
                            </div>


                        </div>

                        <div class="row" style="padding:0 15px">
                            <div class="col-md-6" style="padding: 0 5px">
                                <div class="statisticalGraph" id="homePage_echarts2"></div>
                            </div>
                            <div class="col-md-6" style="padding:0 5px;">
                                <div style="padding:15px;background-color: #fff">
                                    <table class="main-tb-right">
                                        <tr class="main-tr2">
                                            <td style="text-align: left"><span style="margin-left: 10px"><img
                                                    src="<%=bizpath%>/dist/img/main-tongji.png">&nbsp;相关统计
                                    </span></td>
                                            <td></td>
                                        </tr>
                                        <tr class="tr-2">
                                            <td class="mtb-border1">
                                                <img style="margin-left: 25px;margin-top: 5px"
                                                     src="<%=bizpath%>/dist/img/main-shoufei.png">
                                                <div style="float: right;margin-right: 35px;">
                                                    <font class="main-ft">15个 <br></font>
                                                    <font style="font-size: 10px">收费站</font>
                                                </div>
                                            </td>
                                            <td class="mtb-border2">
                                                <img style="margin-left: 20px;margin-top: 5px"
                                                     src="<%=bizpath%>/dist/img/main-guanli.png">
                                                <div style="float: right;margin-right: 35px;">
                                                    <font class="main-ft">135.68公里 <br></font>
                                                    <font style="font-size: 10px">管理里程</font>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="tr-2">
                                            <td class="mtb-border1">
                                                <img style="margin-left: 20px;margin-top: 5px"
                                                     src="<%=bizpath%>/dist/img/main-ETC.png">
                                                <div style="float: right;margin-right: 35px;">
                                                    <font class="main-ft">32个 <br></font>
                                                    <font style="font-size: 10px">ETC车道</font>
                                                </div>
                                            </td>
                                            <td class="mtb-border2">
                                                <img style="margin-left: 20px;margin-top: 5px"
                                                     src="<%=bizpath%>/dist/img/main-chedao.png">
                                                <div style="float: right;margin-right: 35px;">
                                                    <font class="main-ft">74个 <br></font>
                                                    <font style="font-size: 10px">MTC车道</font>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="tr-2">
                                            <td class="mtb-border3">
                                                <img style="margin-left: 20px;margin-top: 5px"
                                                     src="/bizmodules/images/main_stationAdmin.png">
                                                <div style="float: right;margin-right: 35px;">
                                                    <font class="main-ft">42人 <br></font>
                                                    <font style="font-size: 10px">管理人员</font>
                                                </div>
                                            </td>
                                            <td>
                                                <%--<img style="margin-left: 20px;margin-top: 5px"--%>
                                                <%--src="<%=bizpath%>/dist/img/main-chedao.png">--%>
                                                <i class="fa fa-fw fa-users"
                                                   style="font-size: 29px;margin-left: 20px;margin-top: 5px;color: #78dad8;"></i>
                                                <div style="float: right;margin-right: 35px;">
                                                    <font class="main-ft">405人 <br></font>
                                                    <font style="font-size: 10px">收费人员</font>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>

                        </div>

                        <%--<div class="row" style="padding: 5px 15px">--%>
                        <%--<div class="col-md-5" style="padding: 0 10px 0 5px;">--%>
                        <%--<div id="echartsLineLight" style="height: 560px"></div>--%>
                        <%--</div>--%>

                        <%--<div class="col-md-7" style="margin: 15px 0 0 0;padding:0 5px;">--%>
                        <%--<div style="padding:15px;background-color: #fff">--%>
                        <%--<table class="main-tb-left main-tb">--%>
                        <%--<tr class="main-tr">--%>
                        <%--<td>单位名称</td>--%>
                        <%--<td>任务数（元）</td>--%>
                        <%--<td>完成数</td>--%>
                        <%--<td>完成比例</td>--%>
                        <%--</tr>--%>
                        <%--<tr>--%>
                        <%--<td>川北公司</td>--%>
                        <%--<td>￥25,000,000</td>--%>
                        <%--<td>￥20,000,000</td>--%>
                        <%--<td>80%</td>--%>
                        <%--</tr>--%>
                        <%--<tr>--%>
                        <%--<td>川西公司</td>--%>
                        <%--<td>￥25,000,000</td>--%>
                        <%--<td>￥20,000,000</td>--%>
                        <%--<td>80%</td>--%>
                        <%--</tr>--%>
                        <%--<tr>--%>
                        <%--<td>达陕公司</td>--%>
                        <%--<td>￥25,000,000</td>--%>
                        <%--<td>￥20,000,000</td>--%>
                        <%--<td>80%</td>--%>
                        <%--</tr>--%>
                        <%--<tr>--%>
                        <%--<td>川西公司</td>--%>
                        <%--<td>￥25,000,000</td>--%>
                        <%--<td>￥20,000,000</td>--%>
                        <%--<td>80%</td>--%>
                        <%--</tr>--%>
                        <%--</table>--%>
                        <%--</div>--%>
                        <%--</div>--%>
                        <%--</div>--%>

                    </section>
                </div>

            </div>
        </div>
    </div>
</div>


<%--</div>--%>

<!-- ./wrapper -->
<%--<footer class="main-footer">--%>
<%--<div class="pull-right hidden-xs">--%>
<%--<b>Version</b> 2.3.3--%>
<%--</div>--%>
<%--<strong>Copyright © 2011-2016 <a href="" class="c_0a8ad7">中海网络科技股份有限公司</a></strong> . All rights reserved--%>
<%--</footer>--%>

<%@include file="controlsidebar.jsp" %>
<div class="control-sidebar-bg"></div>
<!-- 富文本插件 -->
<script src="<%=bizpath%>/umeditor/third-party/template.min.js"></script>
<!-- 配置文件 -->
<script src="<%=bizpath%>/umeditor/umeditor.config.js"></script>
<!-- 编辑器源码文件 -->
<script src="<%=bizpath%>/umeditor/umeditor.min.js"></script>
<!-- 语言包文件 -->
<script src="<%=bizpath%>/umeditor/lang/zh-cn/zh-cn.js"></script>
<!--/ 富文本插件 -->

<!-- toastr -->
<script src="/bizmodules/adminlte/toastr/js/toastr.js" type="text/javascript"></script>
<!-- Bootstrap 3.3.6 -->

<script src="<%=bizpath%>/plugins/jQuery/ajaxfileupload.js"></script>
<script src="<%=bizpath%>/bootstrap/js/bootstrap.min.js"></script>

<script src="<%=bizpath%>/dist/js/moment.min.js"></script>

<script src="<%=bizpath%>/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
<!-- Slimscroll -->
<script src="<%=bizpath%>/plugins/slimScroll/jquery.slimscroll.min.js"></script>
<!--第二种滚动条样式美化-->
<script src="bizmodules/adminlte/plugins/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js"></script>
<link rel="stylesheet" href="bizmodules/adminlte/plugins/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css">
<!-- FastClick -->
<script src="<%=bizpath%>/plugins/fastclick/fastclick.min.js"></script>
<!-- AdminLTE App -->
<script src="<%=bizpath%>/dist/js/app.min.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="<%=bizpath%>/dist/js/demo.js"></script>


<script type="text/javascript" src="framework/js/3rdparty/plugins/jquery-easyui-1.5/jquery.easyui.min.js"></script>
<script type="text/javascript"
        src="framework/js/3rdparty/plugins/jquery-easyui-1.5/locale//easyui-lang-zh_CN.js"></script>
<!--easyui的label加载-->
<script type="text/javascript"
        src="framework/js/3rdparty/plugins/jquery-easyui-1.5/plugins/datagrid-filter.js"></script>
<script type="text/javascript" src="framework/js/3rdparty/plugins/jquery-easyui-1.5/easyloader.js"></script>
<!--框架解析js-->
<script type="text/javascript" src="framework/js/3rdparty/plugins/iCheck/icheck.js"></script>


<!--日历控件基础文件加载-->
<link rel="stylesheet" href="<%=bizpath%>/plugins/fullcalendar/fullcalendar.css">
<link rel="stylesheet" href="<%=bizpath%>/plugins/fullcalendar/fullcalendar.print.css" media="print">
<script src="<%=bizpath%>/plugins/fullcalendar/fullcalendar.js"></script>
<script src="<%=bizpath%>/plugins/fullcalendar/locale-all.js"></script>

<!--有关echart的js-->
<script type="text/javascript" src="bizmodules/adminlte/echart/echarts.min.js"></script>
<script type="text/javascript" src="bizmodules/adminlte/echart/extendEchart.min.js"></script>
<!--可缩放旋转的相册js-->
<script src="bizmodules/adminlte/imagealbum_jquery_plus/js/main.js"></script>
<script src="bizmodules/adminlte/imagealbum_jquery_plus/js/viewer.min.js"></script>

<script src="/bizmodules/adminlte/echarts/doc/example/www/js/echarts.js" type="text/javascript"></script>
<script src="/bizmodules/adminlte/echarts/doc/example/www/js/chart/map.js" type="text/javascript"></script>

<script src="<%=bizpath%>/dist/js/jquery.flipster.js"></script>

<!--图片控件-->
<link href="bizmodules/adminlte/fileinput/css/fileinput.css" media="all" rel="stylesheet" type="text/css"/>
<script src="bizmodules/adminlte/fileinput/js/fileinput.js"></script>
<script src="bizmodules/adminlte/fileinput/js/locales/zh.js"></script>
<link href="bizmodules/adminlte/imagealbum/css/zoom.css" media="all" rel="stylesheet" type="text/css"/>
<script src="bizmodules/adminlte/imagealbum/js/zoom.min.js"></script>


<script src="<%=bizpath%>/dist/js/mp_common.js"></script>
<script src="<%=bizpath%>/dist/js/pages/datagrid_drop.js"></script>
<script>

    function initGridHight() {
        var tabContents = window.document.getElementsByClassName('tab-content');
        var hight = $(tabContents[0]).height() - 75;
        hight = hight - hight * 0.038;
        MP.Const.dataGridHeight = hight;
    }
    ;
    $(function () {
        initGridHight();
        $('body').addClass('sidebar-collapse');
        $('footer').addClass('main-footer_mainframePage');

        //
        $("#content_home").mCustomScrollbar({});

        //首页添加滚动条
        $(" #menubar >li>.treeview-menu").mCustomScrollbar({});

        var currentWidth = 0;
        $(window).resize(function () {
            currentWidth = document.body.clientWidth;
            if (currentWidth < 768) {
                $('body').removeClass('sidebar-collapse');
            }
        });
        //年度收入
        var oEcharts = echarts.init(document.getElementById('homePage_echarts1'));
        option1 = {
            title: {
                text: '年度收入',
                left: 'center'
            },
            backgroundColor: '#fff',
            tooltip: {
                trigger: 'item',
                formatter: '{a} : {c}'
            },
            legend: {
                left: 'right',
                orient: 'vertical',
                data: ['道口收入', '清分收入'],
                textStyle: {
                    color: '#999'
                }
            },
            xAxis: {
                color: 'red',
                type: 'category',
                splitLine: {show: false},
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
                axisLine: {
                    lineStyle: {
                        color: 'gray'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#03CBE9'
                    }
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            yAxis: {
                type: 'value',
                name: '收入（元）',
                axisLine: {
                    lineStyle: {
                        color: 'gray'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#03CBE9'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#182c49'
                    }
                }
            },
            series: [
                {
                    name: '道口收入',
                    type: 'line',
//                    data: [90, 120, 103, 180, 165, 210, 172, 201],
                    data: [63749136.55, 56486136.05, 64627383.15, 57660455.15, 50951410.25, 55177340.70, 52496876.45, 57560107.90],
                    lineStyle: {
                        normal: {
                            color: '#dad44e'
                        }
                    },
                    symbol: 'circle', //图标形状
                    symbolSize: 10,
                    itemStyle: {
                        normal: {
                            color: "#dad44e"
                        }
                    }
                },
                {
                    name: '清分收入',
                    type: 'line',
//                    data: [65, 92, 98, 120, 160, 150, 220, 230, 250, 180, 170, 250],
                    data: [36966583.55, 33267684.56, 36184713.66, 37213813.10, 34140779.75, 41764146.72, 40273883.90, 44799136.85],
                    symbol: 'circle', //图标形状
                    symbolSize: 10,
                    itemStyle: {
                        normal: {
                            color: "#5bc3a2"
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: '#5bc3a2'
                        }
                    }
                }
            ]
        };
        oEcharts.setOption(option1);

        //历年收入
        var oEchartss = echarts.init(document.getElementById('homePage_echarts2'));
        option2 = {
            title: {
                text: '历年收入',
                left: 'center'
            },
            backgroundColor: '#fff',
            tooltip: {
                trigger: 'item',
                formatter: '{a} : {c}(万元)'
            },
            legend: {
                left: 'right',
                orient: 'vertical',
                data: ['道口收入', '清分收入'],
                textStyle: {
                    color: '#999'
                }
            },
            xAxis: {
                color: 'red',
                type: 'category',
//            name: '时间（日）',
                splitLine: {show: false},
                data: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'],
                axisLine: {
                    lineStyle: {
                        color: 'gray'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#03CBE9'
                    }
                },

            },

            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            yAxis: {
                type: 'value',
                name: '收入（万）',
                axisLine: {
                    lineStyle: {
                        color: 'gray'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#03CBE9'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#182c49'
                    }
                }
            },
            series: [
                {
                    name: '道口收入',
                    type: 'line',
                    data: [43412.48, 47632.94, 62055.08, 69356.67, 62401.22, 77046.92, 57697.32, 63888.16, 69329.68],
                    lineStyle: {
                        normal: {
                            color: '#dad44e'
                        }
                    },
                    symbol: 'circle', //图标形状
                    symbolSize: 10,
                    itemStyle: {
                        normal: {
                            color: "#dad44e"
                        }
                    }
                },
                {
                    name: '清分收入',
                    type: 'line',
                    data: [24118.05, 29770.59, 36502.99, 36503.51, 39000.76, 42803.84, 36060.83, 37581.27, 38516.49],
                    symbol: 'circle', //图标形状
                    symbolSize: 10,
                    itemStyle: {
                        normal: {
                            color: "#5bc3a2"
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: '#5bc3a2'
                        }
                    }
                }
            ]
        };
        oEchartss.setOption(option2);

        //任务完成情况
        var oEchartsa = echarts.init(document.getElementById('page12'));
        option3 = {
            title: {
                text: '任务完成情况',
                x: 'center',
                bottom: 10,
            },
            backgroundColor: '#fff',
            series: [
                {
                    name: '预警',
                    type: 'gauge',
                    center: ['50%', '50%'],
                    radius: '65%',
                    min: -100,
                    max: 100,
                    splitNumber: 8,
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            width: 4,
                            color: [
                                [0.5, 'green'],
                                [1, 'red']
                            ]
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        length: 0,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: 'auto'
                        }
                    },
                    splitLine: {           // 分隔线
                        length: 8,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: 'auto'
                        }
                    },
                    axisLabel: {
                        show: false
                    },
                    pointer: {
                        width: 5
                    },
                    detail: {
                        fontSize: 1,
                        formatter: function (value) {
//                            if (value > 0) {
                            return value + "%";
//                            } else {
//                                return "滞后" + Math.abs(value) + "%";
//                            }
                        }
                    },
                    data: [{value: 0.49}]
                }
            ]
        };
        oEchartsa.setOption(option3);

        //echarts图4
        var oEchartsb = echarts.init(document.getElementById('page11'));
        option4 = {
            grid: {
                left: 0,
                right: 5,
                bottom: '3%',
                containLabel: true
            },
            backgroundColor: '#fff',
            xAxis: {
                type: 'value',
                axisLine: {show: false},
                axisLabel: {show: false},
                axisTick: {show: false},
                splitLine: {show: false}
            },
            yAxis: {
                type: 'category',
                axisLine: {show: false},
                axisTick: {show: false},
                data: ['计划任务', '清分收入', '道口收入']
            },
            series: [
                {
                    name: '收入',
                    type: 'bar',
                    barMaxWidth: 25,
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                var colorList = ['#60C0DD', '#E87C25', '#9BCA63'];
                                return colorList[params.dataIndex]
                            }, label: {
                                show: true,
                                position: 'top',
                                formatter: '{c}(元)'
                            }
                        }
                    },
                    data: [40062093.02, 44799136.85, 70061580.15]
                }
            ]
        };
        oEchartsb.setOption(option4);

    })


</script>
<!--初始化桌面-->
<script>
    var mask = '<div id="loadingMainframe" class="loading-mask" > ' +
        //'<h4>加载中....</h4>' +
        '<div class="loader" style="position: absolute; left: calc(50% - 20px); top: calc(50% - 20px);"><div class="loader-inner line-scale"><div></div><div></div><div></div><div></div><div></div></div></div>' +
        //'<div class="fl spinner3" style="position: absolute; left: calc(50% - 20px); top: calc(50% - 20px);"><div class="dot1"></div><div class="dot2"></div></div>' +
        '</div>';

    $("#content_home").append(mask);

    //清分收入同比图
    var echartsBar_line = echarts.init(document.getElementById('echartsBar_line'));
    var barLineoption = {
        color: ['#A3E1D4', '#78DAD8', '#4297CD'],
        backgroundColor: '#fff',
        title: {
            text: '清分收入同比图',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['上年度', '本年度', '计划数'],
            left: 'left'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
//                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '上年度',
                type: 'bar',
                barWidth: 10,
                data: [32770914, 27800114, 36274874, 29247883, 28196256, 33126037, 27482951.45, 30991714.10]

            },
            {
                name: '本年度',
                type: 'bar',
                barWidth: 10,
                data: [36966583.55, 33267684.56, 36184713.66, 37213813.10, 34140779.75, 41764146.72, 40273883.90, 44799136.85]
            },
            {
                name: '计划数',
                type: 'bar',
                barWidth: 10,
                data: [35862369.88, 34505227.02, 40062093.02, 34570044.3, 39222148.39, 38769767.44, 40062093.02, 40062093.02]
            }
        ]
    };

    echartsBar_line.setOption(barLineoption);
</script>
</body>
</html>
