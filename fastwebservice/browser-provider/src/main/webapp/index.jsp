<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%--
  Created by IntelliJ IDEA.
  User: XieJuan
  Date: 2016/11/2
  登录界面
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String bizpath = "bizmodules/adminlte";
%>
<!DOCTYPE html>
<html lang="en" style="height: 100%;">
<head>
    <title>ASPI后台管理系统 | 登录</title>
    <%@include file="bizmodules/jsp/biz_meta.jsp" %>
    <meta charset="UTF-8">
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <link rel="stylesheet" href="<%=bizpath%>/bootstrap/css/bootstrap.min.css">
    <%--<link rel="stylesheet" href="<%=bizpath%>/dist/css/login.css">--%>
    <link rel="stylesheet" href="<%=bizpath%>/dist/css/basic.css">

</head>

<style>
    .footer {
        height: 40px;
        position: fixed;
        bottom: 0px;
        left: 0px;
        width: 100%;
        text-align: center;
        font-size: 14px;
        background: #eee;
        line-height: 40px;
    }

    #login_bg {
        height: 100%;
        background: url("bizmodules/images/index_header.png");
        background-repeat: no-repeat;
        background-size: 100%;
    }
    /*.login-logo{*/
        /*background: url("bizmodules/images/logo_white.png");*/
        /*background-repeat: no-repeat;*/
        /*background-size:auto 100%;*/
    /*}*/

    #login-logo{
        background: url("bizmodules/images/logo_white.png");
        background-repeat: no-repeat;
        width: 72px;
        height: 40px;
        display: inline-block;
        background-size: 100%;
    }
    #loginHistoryName{
        display: none;
        width: 367px;
        height:200px;
        overflow-y: auto;
        position: absolute;
        top:34px;
        right:0;
        z-index:5;
        background-color: #fff;
        border: 1px solid #b2b2b2;
    }
</style>

<body style="text-align: center;height: 100%;">
<script>
    $(function () {
//        resizeLayout();
//        $(window).resize(function(){
//            resizeLayout();
//        });

        //点击登录转圈效果初始化开始
        var opts = {
            lines: 9, // The number of lines to draw
            length: 0, // The length of each line
            width: 10, // The line thickness
            radius: 20, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            color: '#ffffff', // #rgb or #rrggbb
            speed: 1.5, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 'auto', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        };
        var target = document.getElementById('foo');
        var spinner = new Spinner(opts).spin(target);
        //点击登录转圈初始化结束

        //点击登录按钮转圈效果出现
        $(".btn-primary").click(function () {
            $("#foo").show();
        });
        //键盘Enter键转圈效果出现
        var loginLoad = document.getElementById('loginPassword');
        loginLoad.addEventListener("keydown", function (a) {
            if (a && a.keyCode == 13) {
                $("#foo").show();
            }
        });


        var width = $(window).width();
        //按比例计算出背景蓝色部分的高度 再计算出padding-top的距离
        var height = (width / 2000) * 400 - 140;
        $("#login_div").css("padding-top", height);


        $(window).resize(function () {
            var width = $(window).width();
            //按比例计算出背景蓝色部分的高度 再计算出padding-top的距离
            var height = (width / 2000) * 400 - 140;
            $("#login_div").css("padding-top", height)
        });


    });

    function resizeLayout() {
        var hei = $(window).height()
        $(".login_wrap").css("height", hei)
    }

</script>

<div id="login_bg">
    <%--<img src="bizmodules/images/index_header.png" style="height: 100%" width="100%"/>--%>
    <div class="col-md-3" id="login_div"
         style="min-width: 440px;text-align: center;float: none; "
    >
        <div class="login-box">
            <div class="login-logo"
                 style="color: #ffffff;padding-top: 10px; border: 1px solid #ffffff;padding-bottom: 10px;  border-radius: 3px;text-align: center;font-size: 34px;line-height: initial;">
               <i id="login-logo"></i> ASPI后台管理系统
            </div>
            <!-- /.login-logo -->
            <div class="login-box-body">

                <div class="form-group has-feedback" style="color: #f1f1f1;padding-top: 20px;padding-bottom: 50px">
                    <%--<span>为客户提供专业服务，智能，高效，安全，稳定</span>--%>
                </div>

                <div class="form-group has-feedback">
                    <div class="input-group">
                        <div class="input-group-addon" style="background: #4fc1e9;border: 0px">
                            <i class="fa fa-fw fa-user" style="color: #ffffff"></i>
                        </div>
                        <input type="text" itemId="username" class="form-control"  placeholder="账号/手机号"
                               onfocus="if(placeholder=='username') {placeholder=''}"
                               onblur="if (placeholder=='') {placeholder='username'}">
                        <div id="loginHistoryName"></div>
                    </div>
                </div>

                <div class="form-group has-feedback">
                    <div class="input-group">
                        <div class="input-group-addon" style="background: #4fc1e9;border: 0px">
                            <i class="fa fa-fw fa-unlock-alt" style="color: #ffffff"></i>
                        </div>
                        <input type="password" class="form-control" placeholder="密码" itemId="password"
                               id="loginPassword"
                               onfocus="if(placeholder=='password') {placeholder=''}"
                               onblur="if (placeholder=='') {placeholder='password'}">
                    </div>
                </div>

                <div class="form-group has-feedback">

                    <!-- /.col -->
                        <button type="submit" itemId="loginOkBtn" class="btn btn-primary btn-block btn-flat"
                                style="font-size: 16px;background: #4fc1e9;border-color:#4fc1e9">登 陆
                        </button>
                        <div id="foo" style="display: none;"></div>
                        <br>
                        <span itemId="msgSpan" style="color: red;"></span>
                    <!-- /.col -->
                </div>

            </div>
            <!-- /.login-box-body -->
        </div>
        <!-- /.login-box -->
    </div>
    <div class="footer">
        <div class="pull-right hidden-xs" style="padding-right: 20px">
            <a href="bizmodules/templates/chrome.exe">下载Chrome浏览器</a>
        </div>
        <%--<strong>Copyright © 2011-2016 <a href="" class="c_0a8ad7">中海网络科技股份有限公司</a></strong> . All rights reserved--%>
    </div>

</div>


<script src="<%=bizpath%>/dist/js/spin.min.js"></script>
<script src="<%=bizpath%>/bootstrap/js/bootstrap.js"></script>
<script src="/bizmodules/js/login.js"></script>
</body>
</html>
