/**
 * AdminLTE Demo Menu
 * ------------------
 * You should not use this file in production.
 * This file is for demo purposes only.
 */
(function ($, AdminLTE) {

    "use strict";

    /**
     * List of all the available skins
     *
     * @type Array
     */
    var my_skins = [
        "skin-blue",
        "skin-black",
        "skin-red",
        "skin-yellow",
        "skin-purple",
        "skin-green",
        "skin-blue-light",
        "skin-black-light",
        "skin-red-light",
        "skin-yellow-light",
        "skin-purple-light",
        "skin-green-light"
    ];
    var my_skins_menue = [
        "skin-menu-light",
        "skin-menu-black",
        "skin-menu-blue",
        "skin-menu-red",
        "skin-menu-yellow",
        "skin-menu-green",
        "skin-menu-purple",
        "skin-menu-road"
    ];


    var currentBg_content = '';
    //Create the new tab
    var tab_pane = $("<div />", {
        "id": "control-sidebar-theme-demo-options-tab",
        "class": "tab-pane active"
    });

    //Create the tab button
    var tab_button = $("<li />", {"class": "active"})
        .html("<a href='#control-sidebar-theme-demo-options-tab' style='display: none' data-toggle='tab'>"
            + "<i class='fa fa-wrench'></i>"
            + "</a>");

    //Add the tab button to the right sidebar tabs
    $("ul.control-sidebar-tabs")
        .before(tab_button);


    //-----------------------------------------------------------------header背景色-----------------------------------------------------------------
    var demo_settings = $("<div />");
    //Layout options
    // demo_settings.append(
    //     "<h4 class='control-sidebar-heading'>"
    //     + "布局选项"
    //     + "</h4>"
    //         //Fixed layout
    //     + "<div class='form-group'>"
    //     + "<label class='control-sidebar-subheading'>"
    //     + "<input type='checkbox' data-layout='fixed'class='pull-right'/> "
    //     + "固定布局"
    //     + "</label>"
    //     //+ "<p>Activate the fixed layout. You can't use fixed and boxed layouts together</p>"
    //     + "</div>"
    //         //Boxed layout
    //     + "<div class='form-group'>"
    //     + "<label class='control-sidebar-subheading'>"
    //     + "<input type='checkbox' data-layout='layout-boxed'class='pull-right'/> "
    //     + "盒式布局"
    //     + "</label>"
    //     //+ "<p>Activate the boxed layout</p>"
    //     + "</div>"
    //         //Sidebar Toggle
    //     + "<div class='form-group'>"
    //     + "<label class='control-sidebar-subheading'>"
    //     + "<input type='checkbox' data-layout='sidebar-collapse' class='pull-right'/> "
    //     + "切换侧边栏"
    //     + "</label>"
    //     //+ "<p>Toggle the left sidebar's state (open or collapse)</p>"
    //     + "</div>"
    //         //Sidebar mini expand on hover toggle
    //     + "<div class='form-group'>"
    //     + "<label class='control-sidebar-subheading'>"
    //     + "<input type='checkbox' data-enable='expandOnHover' class='pull-right'/> "
    //     + "悬浮时侧边栏扩展"
    //     + "</label>"
    //     //+ "<p>Let the sidebar mini expand on hover</p>"
    //     + "</div>"
    //         //Control Sidebar Toggle
    //     + "<div class='form-group'>"
    //     + "<label class='control-sidebar-subheading'>"
    //     + "<input type='checkbox' data-controlsidebar='control-sidebar-open' class='pull-right'/> "
    //     + "右侧边栏的滑动切换"
    //     + "</label>"
    //     //+ "<p>Toggle between slide over content and push content effects</p>"
    //     + "</div>"
    //         //Control Sidebar Skin Toggle
    //     + "<div class='form-group'>"
    //     + "<label class='control-sidebar-subheading'>"
    //     + "<input type='checkbox' data-sidebarskin='toggle' class='pull-right'/> "
    //     + "切换右侧边栏的皮肤"
    //     + "</label>"
    //     //+ "<p>Toggle between dark and light skins for the right sidebar</p>"
    //     + "</div>"
    // );
    var skins_list = $("<ul />", {"class": 'list-unstyled clearfix'});
    var skin_blue =
        $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
            .append("<a href='javascript:void(0);' data-skin='skin-blue' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 10px; background: #367fa9;'></span><span class='bg-light-blue' style='display:block; width: 80%; float: left; height: 10px;'></span></div>"
                + "</a>");
    skins_list.append(skin_blue);
    var skin_purple =
        $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
            .append("<a href='javascript:void(0);' data-skin='skin-purple' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 10px;' class='bg-purple-active'></span><span class='bg-purple' style='display:block; width: 80%; float: left; height: 10px;'></span></div>"
                + "</a>");
    skins_list.append(skin_purple);
    var skin_green =
        $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
            .append("<a href='javascript:void(0);' data-skin='skin-green' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 10px;' class='bg-green-active'></span><span class='bg-green' style='display:block; width: 80%; float: left; height: 10px;'></span></div>"
                + "</a>");
    skins_list.append(skin_green);
    var skin_red =
        $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
            .append("<a href='javascript:void(0);' data-skin='skin-red' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 10px;' class='bg-red-active'></span><span class='bg-red' style='display:block; width: 80%; float: left; height: 10px;'></span></div>"
                + "</a>");
    skins_list.append(skin_red);
    //var skin_yellow =
    //    $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
    //        .append("<a href='javascript:void(0);' data-skin='skin-yellow' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
    //            + "<div><span style='display:block; width: 20%; float: left; height: 10px;' class='bg-yellow-active'></span><span class='bg-yellow' style='display:block; width: 80%; float: left; height: 10px;'></span></div>"
    //            + "</a>");
    //skins_list.append(skin_yellow);
    demo_settings.append("<h4 class='control-sidebar-heading'>标题栏</h4>");
    demo_settings.append(skins_list);

    tab_pane.append(demo_settings);


    //-----------------------------------------------------------------菜单换背景色-----------------------------------------------------------------
    var demo_menuBg = $("<div />");
    var skins_list_menu = $("<ul />", {"class": 'list-unstyled clearfix'});

    var skin_gary_menu =
        $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
            .append("<a href='javascript:void(0);' data-skin-menu='skin-menu-light'  style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #fff;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                + "</a>");
    skins_list_menu.append(skin_gary_menu);
    var skin_black_menu =
        $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
            .append("<a href='javascript:void(0);' data-skin-menu='skin-menu-black' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #374850;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                + "</a>");
    skins_list_menu.append(skin_black_menu);
    var skin_blue_menu =
        $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
            .append("<a href='javascript:void(0);' data-skin-menu='skin-menu-blue' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #367fa9;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                + "</a>");
    skins_list_menu.append(skin_blue_menu);
    //var skin_road_menu =
    //    $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
    //        .append("<a href='javascript:void(0);' data-skin-menu='skin-menu-road' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
    //            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: url(\"bizmodules/adminlte/dist/img/skin-bg/road2.png\");'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
    //            + "</a>");
    //skins_list_menu.append(skin_road_menu);

    var skin_purple_menu =
        $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
            .append("<a href='javascript:void(0);' data-skin-menu='skin-menu-purple' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px;' class='bg-purple-active'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                + "</a>");
    skins_list_menu.append(skin_purple_menu);
    var skin_green_menu =
        $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
            .append("<a href='javascript:void(0);' data-skin-menu='skin-menu-green' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px;' class='bg-green-active'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                + "</a>");
    skins_list_menu.append(skin_green_menu);
    var skin_red_menu =
        $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
            .append("<a href='javascript:void(0);' data-skin-menu='skin-menu-red' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px;background:#832320'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                + "</a>");
    skins_list_menu.append(skin_red_menu);
    /*var skin_yellow_menu =
     $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
     .append("<a href='javascript:void(0);' data-skin-menu='skin-menu-yellow' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
     + "<div><span style='display:block; width: 20%; float: left; height: 20px;' class='bg-yellow-active'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
     + "</a>");
     skins_list_menu.append(skin_yellow_menu);*/
    demo_menuBg.append("<h4 class='control-sidebar-heading'>菜单背景</h4>");
    demo_menuBg.append(skins_list_menu);

    tab_pane.append(demo_menuBg);


    //-----------------------------------------------------------------页面换背景色-----------------------------------------------------------------
    var demo_content_bg = $("<div />");
    var skins_list_content = $("<ul />", {"class": 'list-unstyled clearfix'});

    var skin_gray_content =
        $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
            .append("<a href='javascript:void(0);' data-skin-content='linear-gradient(to bottom, #ffffff, #f6f6f6, #f1f1f2)' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f4f5f7;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: linear-gradient(to bottom, #ffffff, #f6f6f6, #f1f1f2);'></span></div>"
                + "</a>");
    skins_list_content.append(skin_gray_content);
    var skin_blue_content =
        $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
            .append("<a href='javascript:void(0);' data-skin-content='#d9eef9' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f4f5f7;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #a2dffe;'></span></div>"
                + "</a>");
    skins_list_content.append(skin_blue_content);
    var skin_purple_content =
        $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
            .append("<a href='javascript:void(0);' data-skin-content='#e8e8fb' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f4f5f7;' ></span><span style='display:block; width: 80%; float: left; height: 20px;background: #b8b4ff;'></span></div>"
                + "</a>");
    skins_list_content.append(skin_purple_content);
    var skin_green_content =
        $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
            .append("<a href='javascript:void(0);' data-skin-content='#e9fdf5' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f4f5f7;' ></span><span style='display:block; width: 80%; float: left; height: 20px;background: #b8fade'></span></div>"
                + "</a>");
    skins_list_content.append(skin_green_content);
    var skin_red_content =
        $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
            .append("<a href='javascript:void(0);' data-skin-content='#d2d6de' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #eee;' ></span><span style='display:block; width: 80%; float: left; height: 20px;background: #d2d6de' ></span></div>"
                + "</a>");
    skins_list_content.append(skin_red_content);
    var skin_yellow_content =
        $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
            .append("<a href='javascript:void(0);' data-skin-content='#fdf5e7' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f4f5f7;' ></span><span style='display:block; width: 80%; float: left; height: 20px;background: #ffdda4'></span></div>"
                + "</a>");
    skins_list_content.append(skin_yellow_content);
    //var skin_crissXcross_content =
    //    $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
    //        .append("<a href='javascript:void(0);' data-skin-content='url(\"bizmodules/adminlte/dist/img/skin-bg/crissXcross.png\")' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
    //            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f4f5f7;' ></span><span style='display:block; width: 80%; float: left; height: 20px;background: url(\"bizmodules/adminlte/dist/img/skin-bg/crissXcross.png\")'></span></div>"
    //            + "</a>");
    //skins_list_content.append(skin_crissXcross_content);
    //var skin_transp_content =
    //    $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
    //        .append("<a href='javascript:void(0);' data-skin-content='url(\"bizmodules/adminlte/dist/img/skin-bg/transp_bg.png\")' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
    //            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f4f5f7;' ></span><span style='display:block; width: 80%; float: left; height: 20px;background: url(\"bizmodules/adminlte/dist/img/skin-bg/transp_bg.png\")'></span></div>"
    //            + "</a>");
    //skins_list_content.append(skin_transp_content);


    demo_content_bg.append("<h4 class='control-sidebar-heading'>页面背景</h4>");
    demo_content_bg.append(skins_list_content);

    tab_pane.append(demo_content_bg);


    //-----------------------------------------------------------------推荐搭配-----------------------------------------------------------------
    var demo_settings_color = $("<div />");

    var skins_settings_color = $("<ul />", {"class": 'list-unstyled clearfix'});
    var skin_blue_setting =
        $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
            .append("<a href='javascript:void(0);' data-color-setting='skin-blue;skin-menu-light;linear-gradient(to bottom, #ffffff, #f6f6f6, #f1f1f2)' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 10px; background: #367fa9;'></span><span class='bg-light-blue' style='display:block; width: 80%; float: left; height: 10px;'></span></div>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #fff;' ></span><span style='display:block; width: 80%; float: left; height: 20px;background:linear-gradient(to bottom, #ffffff, #f6f6f6, #f1f1f2);'></span></div>"
                + "</a>");
    skins_settings_color.append(skin_blue_setting);
    var skin_purple_setting =
        $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
            .append("<a href='javascript:void(0);' data-color-setting='skin-purple;skin-menu-purple;#fdf5e7' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 10px;' class='bg-purple-active'></span><span class='bg-purple' style='display:block; width: 80%; float: left; height: 10px;'></span></div>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #434474;' ></span><span style='display:block; width: 80%; float: left; height: 20px;background:#e8e8fb;' ></span></div>"
                + "</a>");

    skins_settings_color.append(skin_purple_setting);

    var skin_green_setting =
        $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
            .append("<a href='javascript:void(0);' data-color-setting='skin-green;skin-menu-green;#fdf5e7' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 10px;'  class='bg-green-active'></span><span class='bg-green' style='display:block; width: 80%; float: left; height: 10px;'></span></div>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #276148;' ></span><span style='display:block; width: 80%; float: left; height: 20px;background:#fdf5e7'></span></div>"
                + "</a>");
    skins_settings_color.append(skin_green_setting);

    var skin_red_setting =
        $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
            .append("<a href='javascript:void(0);' data-color-setting='skin-red;skin-menu-red;#fdf5e7' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div><span style='display:block; width: 20%; float: left; height: 10px;'  class='bg-red-active'></span><span class='bg-red' style='display:block; width: 80%; float: left; height: 10px;'></span></div>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #832320;' ></span><span style='display:block; width: 80%; float: left; height: 20px;background:#fdf5e7'></span></div>"
                + "</a>");
    skins_settings_color.append(skin_red_setting);

    demo_settings_color.append("<h4 class='control-sidebar-heading'>推荐搭配</h4>");
    demo_settings_color.append(skins_settings_color);

    tab_pane.append(demo_settings_color);


    $("div.controlSideBar.tab-content").append(tab_pane);
    $("#homeTabButton").click();
    setup();
    // change_layout('fixed');

    /**
     * Toggles layout classes
     *
     * @param String cls the layout class to toggle
     * @returns void
     */
    function change_layout(cls) {
        $("body").toggleClass(cls);
        AdminLTE.layout.fixSidebar();
        //Fix the problem with right sidebar and layout boxed
        if (cls == "layout-boxed")
            AdminLTE.controlSidebar._fix($(".control-sidebar-bg"));
        if ($('body').hasClass('fixed') && cls == 'fixed') {
            AdminLTE.pushMenu.expandOnHover();
            AdminLTE.layout.activate();
        }
        AdminLTE.controlSidebar._fix($(".control-sidebar-bg"));
        AdminLTE.controlSidebar._fix($(".control-sidebar"));
    }

    /**
     * Replaces the old skin with the new skin
     * @param String cls the new skin class
     * @returns Boolean false to prevent link's default action
     */
    function change_skin(cls) {
        $.each(my_skins, function (i) {
            $("body").removeClass(my_skins[i]);
        });

        $("body").addClass(cls);
        store('skin', cls);
        return false;
    }

    /**
     *菜单背景
     * */
    function change_skin_menu(cls) {
        //if(color=='#fff'){
        //    $('.sidebar-mini.sidebar-collapse .sidebar-menu > li > a > span').css('color', '#444');
        //    $('.sidebar-mini.sidebar-collapse .main-sidebar').css('border-right', '1px solid lightgrey');
        //}else{
        //    $('.sidebar-mini.sidebar-collapse .sidebar-menu > li > a > span').css('color', '#fff');
        //    $('.sidebar-mini.sidebar-collapse .main-sidebar').css('border-right', '0px');
        //}
        //$("aside.main-sidebar").css('background-color', color);
        //
        //store('skin_menu', color);
        //if(cls){
        $.each(my_skins, function (i) {
            $("body").removeClass(my_skins_menue[i]);
        });
        $("body").addClass(cls);
        store('skin_menu', cls);
        //}
        return false;
    }

    /**
     *页面背景
     * */
    function change_skin_content(cls) {
        $('.content-wrapper > .nav-tabs-custom > .tab-content').css('background', cls);
        store('skin_content', cls);
        return false;
    }

    /**
     *推荐搭配
     * */
    function change_skin_setting(cls) {
        var colorInfo = cls.split(';');
        //var colorInfo = [];
        //while (index != -1) {
        //    colorInfo.push(cls.substring(0, index));
        //    cls = cls.substring(index + 1);
        //    index = cls.indexOf(';');
        //}
        change_skin(colorInfo[0]);
        change_skin_menu(colorInfo[1]);
        change_skin_content(colorInfo[2]);
        return false;
    }


    /**
     * Store a new settings in the browser
     *
     * @param String name Name of the setting
     * @param String val Value of the setting
     * @returns void
     */
    function store(name, val) {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem(name, val);
        } else {
            window.alert('Please use a modern browser to properly view this template!');
        }
    }

    /**
     * Get a prestored setting
     *
     * @param String name Name of of the setting
     * @returns String The value of the setting | null
     */
    function get(name) {
        if (typeof (Storage) !== "undefined") {
            return localStorage.getItem(name);
        } else {
            window.alert('Please use a modern browser to properly view this template!');
        }
    }

    /**
     * Retrieve default settings and apply them to the template
     *
     * @returns void
     */
    function setup() {
        var tmp = get('skin');
        var tmp_menu = get('skin_menu');
        var tmp_content = get('skin_content');

        if (tmp && $.inArray(tmp, my_skins))
            change_skin(tmp);
        if (tmp_menu)
            change_skin_menu(tmp_menu);
        if (tmp_content)
            change_skin_content(tmp_content);

        //Add the change skin listener
        $("[data-skin]").on('click', function (e) {
            e.preventDefault();
            change_skin($(this).data('skin'));
        });

        //菜单背景切换监听
        $("[data-skin-menu]").on('click', function (e) {
            e.preventDefault();
            change_skin_menu($(this).data('skin-menu'));
        });

        //页面背景切换监听
        $("[data-skin-content]").on('click', function (e) {
            e.preventDefault();
            change_skin_content($(this).data('skin-content'));
        });

        //推荐搭配切换监听
        $("[data-color-setting]").on('click', function (e) {
            e.preventDefault();
            change_skin_setting($(this).data('color-setting'));
        });

        //Add the layout manager
        $("[data-layout]").on('click', function () {
            change_layout($(this).data('layout'));
        });

        $("[data-controlsidebar]").on('click', function () {
            change_layout($(this).data('controlsidebar'));
            var slide = !AdminLTE.options.controlSidebarOptions.slide;
            AdminLTE.options.controlSidebarOptions.slide = slide;
            if (!slide)
                $('.control-sidebar').removeClass('control-sidebar-open');
        });

        $("[data-sidebarskin='toggle']").on('click', function () {
            var sidebar = $(".control-sidebar");
            if (sidebar.hasClass("control-sidebar-dark")) {
                sidebar.removeClass("control-sidebar-dark")
                sidebar.addClass("control-sidebar-light")
            } else {
                sidebar.removeClass("control-sidebar-light")
                sidebar.addClass("control-sidebar-dark")
            }
        });

        $("[data-enable='expandOnHover']").on('click', function () {
            $(this).attr('disabled', true);
            AdminLTE.pushMenu.expandOnHover();
            if (!$('body').hasClass('sidebar-collapse'))
                $("[data-layout='sidebar-collapse']").click();
        });

        // Reset options
        if ($('body').hasClass('fixed')) {
            $("[data-layout='fixed']").attr('checked', 'checked');
        }
        if ($('body').hasClass('layout-boxed')) {
            $("[data-layout='layout-boxed']").attr('checked', 'checked');
        }
        if ($('body').hasClass('sidebar-collapse')) {
            $("[data-layout='sidebar-collapse']").attr('checked', 'checked');
        }

    }
})(jQuery, $.AdminLTE);
