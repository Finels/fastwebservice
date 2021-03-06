<%--remark:头部导航--%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--<meat>--%>
<%--<link rel="stylesheet" href="/bizmodules/adminlte/dist/css/cs-bizmodules.css">--%>
<%--</meat>--%>
<header class="main-header">
    <!-- Logo -->
    <a class="logo" style="padding-left: 0px;">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <%--<span class="logo-mini"></span>--%>
        <!-- logo for regular state and mobile devices -->
          <span style="font-size: 18px;padding:5px;">
          	<img id="logoImg" src=""
                 onerror="var img=event.srcElement;img.src='/bizmodules/adminlte/dist/img/logo-cg.png';img.onerror=null;"
                 width="44" height="19">
              <%--<span id="logoTitle">&nbsp川高大数据门户</span>--%>
          </span>
        <%--<!--<span  id="logo-lg" class="logo-lg"><b>Admin</b>LTE</span>-->--%>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
        <!-- Sidebar toggle button-->
        <a href="javascript:void(0)" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
        </a>
        <span style="line-height: 50px;color: #fff;font-size: 18px;">APSID 2018 后台管理系统</span>

        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
                <!-- Messages:未读消息-->
                <li class="dropdown messages-menu">
                    <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-bell-o" style="position: relative;top: 2px;font-size: 18px;"></i>
                        <span class="label label-success" id="messagescount">0</span>
                    </a>
                    <ul class="dropdown-menu info_arrowDiv flipInX animated">
                        <li class="header" id="messagesheader">你有0个未读消息</li>
                        <li>
                            <!-- inner menu: contains the actual data -->
                            <ul class="menu" id="messagesmenu" style="border:0">
                            </ul>
                        </li>
                        <%--<li class="footer" id="messagesOpenTab"><a href="javascript:void(0)">消息中心</a></li>--%>
                        <s class="menu_arrow"><i></i></s>
                    </ul>
                </li>
                <!-- favorite:用户收藏-->
                <li class="dropdown messages-menu">
                    <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-star-o" style="position: relative;top: 3px;font-size: 18px;"></i>
                        <span class="label label-success" id="favoritecount">0</span>
                    </a>
                    <ul class="dropdown-menu info_arrowDiv flipInX animated">
                        <li class="header" id="favoriteheader">你有0个收藏页面</li>
                        <li>
                            <!-- inner menu: contains the actual data -->
                            <ul class="menu" id="favoritemenu" style="border:0">
                            </ul>
                        </li>
                        <%--<li class="footer"><a href="javascript:void(0)"></a></li>--%>
                        <s class="menu_arrow"><i></i></s>
                    </ul>
                </li>
                <!-- Messages: style can be found in dropdown.less-->

                <li class="dropdown user user-menu">
                    <%--<a href="javascript:showUserInfo()">--%>
                    <a href="javascript:void(0)">
                        <img src="/framework/images/userblue.png" class="user-image" alt="User Image">
                        <%--<span itemId="datetime" class="hidden-xs"></span>--%>
                        <span itemId="username"></span>
                    </a>
                    <%-- <ul class="dropdown-menu">
                         <!-- User image -->
                         <li class="user-header">
                             <img src="framework/images/userblue.png" class="img-circle" alt="User Image">

                             <p itemId="usercompany">
                                 <small>Member since Nov. 2012</small>
                             </p>
                         </li>

                         <li class="user-footer">
                             <div class="pull-left">
                                 <a href="javascript:showUserInfo()" ><i class="fa fa-cog" style="font-size: xx-large" title="个人信息"></i></a>
                             </div>
                             <div class="pull-right">
                                 <a href="javascript:void(0)"  itemId="logout"><i class="fa fa-sign-out" style="font-size: xx-large;" title="退出"></i></a>
                             </div>
                         </li>
                     </ul>--%>
                </li>
                <li>
                    <a href="javascript:void(0)" itemId="logout"><img src="/bizmodules/images/icon/exitLogin.png"
                                                                      alt="登出"></a>
                </li>
                <!-- 换肤 -->
                <li>
                    <a href="#" data-toggle="control-sidebar"><img src="/bizmodules/images/icon/changeSkin.png"
                                                                   alt="换肤"></a>
                </li>
            </ul>
        </div>
    </nav>
</header>
<script type="application/javascript">
    $(function () {
        $("#logoImg").attr("src", '/bizmodules/images/logoCG.png');
//        $("#logoImg").attr("src", Scdp.CacheUtil.get(Scdp.Const.USER_SYSTEM_LOGO));
//        if(Scdp.CacheUtil.get(Scdp.Const.USER_SYSTEM_LOGO)==null){
//            $("#logoImg").attr("src","bizmodules/images/company/logo/logo-cg.png");
//        }
        $("#logoTitle").text('测试logoTitle');
        //判断请求参数中是否有isCloseSiderbar
        var closeSiderBar = getQueryString("isCloseSiderbar");
        if (closeSiderBar == "true") {
            $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
        } else {
            $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
        }
    })
    function logoOnErrorFn(event) {
        var img = event.srcElement;
        img.src = "/bizmodules/adminlte/dist/img/logo.png";
        img.onerror = null;
    }
    //获得请求参数的方法
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return decodeURI(r[2]);
        return null;
    }
</script>
<%--用户信息修改相关--%>
<%--<script>--%>
<%--function showUserInfo(){--%>
<%--//        $("#main_userinfo").show();--%>
<%--//        MP.placeholder();--%>
<%--Scdp.openTabCtrl("UserInfo.controller.userinfoController","用户个人信息","MUN_USERINFO","MENU_ITEM_CTL");--%>
<%--}--%>
<%--function closeUserInfo(){--%>
<%--$("#main_userinfo").hide();--%>
<%--$("#main_userinfo_form").form("clear");--%>
<%--}--%>
<%--function commitUserInfo(){--%>
<%--var parm ={};--%>
<%--parm.userId = Scdp.CacheUtil.get(Scdp.Const.USER_COMPANY_UUID);--%>
<%--parm.userOriPass="";--%>
<%--parm.userNewPass="";--%>
<%--parm.nickname = "";--%>
<%--parm.userMail = "";--%>
<%--parm.userMobile = "";--%>
<%--if($("#main_userinfo_useremail").val()!=null){--%>
<%--parm.userMail = $("#main_userinfo_useremail").val();--%>
<%--}--%>
<%--if($("#main_userinfo_mobiletel").val()!=null){--%>
<%--parm.userMobile = $("#main_userinfo_mobiletel").val();--%>
<%--}--%>
<%--Scdp.CryptUtil.encryptPass($("#main_userinfo_realyPassword").val(), function (passwd) {--%>
<%--parm.userOriPass=passwd;--%>
<%--if($("#main_userinfo_newPassword").val() == $("#main_userinfo_newPasswordTrue").val()) {--%>
<%--Scdp.CryptUtil.encryptPass($("#main_userinfo_newPasswordTrue").val(), function (passwd) {--%>
<%--parm.userNewPass=passwd;--%>
<%--if($("#main_userinfo_newPasswordTrue").val()==null && $("#main_userinfo_newPassword").val() == null){--%>
<%--parm.userNewPass="";--%>
<%--}--%>
<%--MP.doAction("sys-user-modify-info",parm,function(data){--%>
<%--if(data.resultCode == "-1"){--%>
<%--MP.Msg.warn(data.resultInfo);--%>
<%--return;--%>
<%--}--%>
<%--if(data.resultCode == "0"){--%>
<%--if(parm.userNewPass!=""){--%>
<%--MP.doAction("bis-userbaseinfo-Synchronize-action",parm,null,null,false,true);--%>
<%--MP.Msg.info("信息保存成功！");--%>
<%--return;--%>
<%--}--%>
<%--if(parm.userMobile!=""){--%>
<%--MP.Msg.info("信息保存成功！");--%>
<%--return;--%>
<%--}--%>
<%--if(parm.userMail!=""){--%>
<%--MP.Msg.info("信息保存成功！");--%>
<%--return;--%>
<%--}--%>
<%--MP.Msg.warn("没有修改信息！");--%>
<%--return;--%>
<%--}--%>
<%--if(data.resultCode == "1"){--%>
<%--MP.Msg.warn("该用户不存在");--%>
<%--return;--%>
<%--}--%>
<%--if(data.resultCode == "2"){--%>
<%--MP.Msg.warn("密码错误");--%>
<%--return;--%>
<%--}--%>

<%--},null,true,true);--%>
<%--});--%>
<%--}else{--%>
<%--MP.Msg.warn("新密码和确认密码不相同！");--%>
<%--return;--%>
<%--}--%>
<%--});--%>
<%--}--%>
<%--$(function () {//设置消息菜单--%>
<%--var html = "";--%>
<%--var count = 0;--%>
<%--MP.doAction("mp-msgcenter-load-unreadmsg", {}, function (ret) {--%>
<%--if (ret.success) {--%>
<%--count=ret.root.length;--%>
<%--$.each(ret.root,function (i,obj) {--%>
<%--html +='<li><a href="javascript:void(0)" itemId="' + obj.uuid +'">'+--%>
<%--'<div class="pull-left">'+--%>
<%--'<img src="framework/js/3rdparty/adminlte/dist/img/user4-128x128.jpg"class="img-circle" alt="User Image">'+--%>
<%--'</div>'+--%>
<%--'<h4>'+--%>
<%--obj.sendFrom +--%>
<%--'<small><i class="fa fa-clock-o"></i> '+obj.receiptTime+'</small>'+--%>
<%--'</h4><p>' + obj.msgSubject +--%>
<%--'</p></a></li>';--%>
<%--});--%>
<%--}--%>
<%--});--%>
<%--$("#messagesmenu").children().remove();--%>
<%--$("#messagesmenu").append(html);--%>
<%--$("#messagescount").text(count);--%>
<%--$("#messagesheader").text("你有" + count + "个未读消息");--%>
<%--$("#messagesOpenTab").click(function () {--%>
<%--Scdp.openTab("Messagecenter.controller.messagecenterController", "消息中心", "MNU_BASEDATA_MESAGE", "MENU_ITEM_CTL", "null", false);--%>
<%--});--%>
<%--})--%>
<%--</script>--%>