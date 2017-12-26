<!--左边导航展示-->
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!-- Left side column. contains the logo and sidebar -->
<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <!-- Sidebar user panel -->
        <div class="user-panel">
            <div class="pull-left image">
                <img src="/bizmodules/adminlte/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image" width="120px" height="120px" />
            </div>
            <div class="pull-left info">
                <p itemId="username"></p>
                <a ><i class="fa fa-circle text-success"></i>管理员</a>
            </div>
        </div>
        <!-- search form -->
        <form class="sidebar-form">
            <div class="input-group">
                <input type="text" name="q" id="search-text_mainsidebar" class="form-control" placeholder="菜单查询...">
                <span class="input-group-btn">
                <button type="button" name="search" id="search-btn_mainsidebar" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
            </div>
        </form>
        <div id="main_sidebar_menu_div">
        <!-- 下面这个ul是菜单区域-->
            <ul class="sidebar-menu" id="menubar">
                <%--<li class="header"></li>--%>
                <%--<hr width="90%" style="margin-left:auto;margin-right:auto;border-color: black">--%>
            </ul>
        </div>
    </section>
    <!-- /.sidebar -->
    <!--这段代码用来生成菜单滚动条-->
    <script type="text/javascript">
        var w=window.innerHeight
        w=w-200;
//        $("#main_sidebar_menu_div").slimScroll({
//            height:w+'px'
//        });



    </script>
</aside>
