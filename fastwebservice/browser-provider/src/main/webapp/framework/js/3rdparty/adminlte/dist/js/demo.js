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
    "skin-red",
    "skin-yellow",
    "skin-purple",
    "skin-green",
    "skin-blue-light",
    "skin-black-light",
    "skin-red-light",
    "skin-yellow-light",
    "skin-purple-light",
    "skin-green-light",
    "skin-scdp"
  ];

  //Create the new tab
  //var tab_pane = $("<div />", {
  //  "id": "control-sidebar-theme-demo-options-tab",
  //  "class": "tab-pane active"
  //});

  //Create the tab button
  //var tab_button = $("<li />", {"class": "active"})
  //    .html("<a href='#control-sidebar-theme-demo-options-tab' data-toggle='tab'>"
  //    + "<i class='fa fa-wrench'></i>"
  //    + "</a>");

  //Add the tab button to the right sidebar tabs
  //$("[href='#control-sidebar-home-tab']")
  //    .parent()
  //    .before(tab_button);

  //Create the menu
  var demo_settings = $("<div />");

  //Layout options
  demo_settings.append(
      "<h4 class='control-sidebar-heading'>"
      + Scdp.I18N.LAYOUT_OPTION
      + "</h4>"
        //Fixed layout
      + "<div class='form-group'>"
      + "<label class='control-sidebar-subheading'>"
      + "<input type='checkbox' data-layout='fixed' class='pull-right'/> "
      + Scdp.I18N.FIXED_LAYOUT
      + "</label>"
      + "<p>" + Scdp.I18N.FIXED_LAYOUT_DESC + "</p>"
      + "</div>"
        //Boxed layout
      + "<div class='form-group'>"
      + "<label class='control-sidebar-subheading'>"
      + "<input type='checkbox' data-layout='layout-boxed'class='pull-right'/> "
      + Scdp.I18N.BOXED_LAYOUT
      + "</label>"
      + "<p>" + Scdp.I18N.ACTIVE_BOXED_LAYOUT + "</p>"
      + "</div>"
        //Sidebar Toggle
      + "<div class='form-group'>"
      + "<label class='control-sidebar-subheading'>"
      + "<input type='checkbox' data-layout='sidebar-collapse' class='pull-right'/> "
      + Scdp.I18N.TOGGLE_SIDEBAR
      + "</label>"
      + "<p>" + Scdp.I18N.TOGGLE_LEFT_SIDEBAR + "</p>"
      + "</div>"
        //Sidebar mini expand on hover toggle
      + "<div class='form-group'>"
      + "<label class='control-sidebar-subheading'>"
      + "<input type='checkbox' data-enable='expandOnHover' class='pull-right'/> "
      + Scdp.I18N.EXPAND_SIDEBAR
      + "</label>"
      + "<p>" + Scdp.I18N.EXPAND_SIDEBAR_DESC + "</p>"
      + "</div>"
        //Control Sidebar Toggle
      + "<div class='form-group'>"
      + "<label class='control-sidebar-subheading'>"
      + "<input type='checkbox' data-controlsidebar='control-sidebar-open' class='pull-right'/> "
      + Scdp.I18N.SHOW_RIGHT_SLIDEBAR
      + "</label>"
      + "<p>" + Scdp.I18N.SHOW_SLIDE + "</p>"
      + "</div>"
        //Control Sidebar Skin Toggle
      + "<div class='form-group'>"
      + "<label class='control-sidebar-subheading'>"
      + "<input type='checkbox' data-sidebarskin='toggle' class='pull-right'/> "
      + Scdp.I18N.RIGHT_SLIDEBAR_COLOR
      + "</label>"
      + "<p>" + Scdp.I18N.CHANGE_RIGHT_SLIDEBAR_COLOR + "</p>"
      + "</div>"
  );
  var skins_list = $("<ul />", {"class": 'list-unstyled clearfix'});

  //Dark sidebar skins
  var skin_blue =
      $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-blue' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
          + "<div><span style='display:block; width: 20%; float: left; height: 7px; background: #367fa9;'></span><span class='bg-light-blue' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
          + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
          + "</a>"
          + "<p class='text-center no-margin'>蓝色</p>");
  var skin_black =
      $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-black' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
          + "<div style='box-shadow: 0 0 2px rgba(0,0,0,0.1)' class='clearfix'><span style='display:block; width: 20%; float: left; height: 7px; background: #fefefe;'></span><span style='display:block; width: 80%; float: left; height: 7px; background: #fefefe;'></span></div>"
          + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
          + "</a>"
          + "<p class='text-center no-margin'>黑色</p>");
  skins_list.append(skin_black);
  var skin_purple =
      $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-purple' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
          + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-purple-active'></span><span class='bg-purple' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
          + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
          + "</a>"
          + "<p class='text-center no-margin'>紫色</p>");
  skins_list.append(skin_purple);
  var skin_green =
      $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-green' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
          + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-green-active'></span><span class='bg-green' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
          + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
          + "</a>"
          + "<p class='text-center no-margin'>绿色</p>");
  skins_list.append(skin_green);
  var skin_red =
      $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-red' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
          + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-red-active'></span><span class='bg-red' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
          + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
          + "</a>"
          + "<p class='text-center no-margin'>红色</p>");
  skins_list.append(skin_red);
  var skin_yellow =
      $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-yellow' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
          + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-yellow-active'></span><span class='bg-yellow' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
          + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
          + "</a>"
          + "<p class='text-center no-margin'>黄色</p>");
  skins_list.append(skin_yellow);

  //Light sidebar skins
  var skin_blue_light =
      $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-blue-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
          + "<div><span style='display:block; width: 20%; float: left; height: 7px; background: #367fa9;'></span><span class='bg-light-blue' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
          + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
          + "</a>"
          + "<p class='text-center no-margin' style='font-size: 12px'>淡蓝</p>");
  skins_list.append(skin_blue_light);
  var skin_black_light =
      $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-black-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
          + "<div style='box-shadow: 0 0 2px rgba(0,0,0,0.1)' class='clearfix'><span style='display:block; width: 20%; float: left; height: 7px; background: #fefefe;'></span><span style='display:block; width: 80%; float: left; height: 7px; background: #fefefe;'></span></div>"
          + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
          + "</a>"
          + "<p class='text-center no-margin' style='font-size: 12px'>灰色</p>");
  skins_list.append(skin_black_light);
  var skin_purple_light =
      $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-purple-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
          + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-purple-active'></span><span class='bg-purple' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
          + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
          + "</a>"
          + "<p class='text-center no-margin' style='font-size: 12px'>淡紫</p>");
  skins_list.append(skin_purple_light);
  var skin_green_light =
      $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-green-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
          + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-green-active'></span><span class='bg-green' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
          + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
          + "</a>"
          + "<p class='text-center no-margin' style='font-size: 12px'>淡绿</p>");
  skins_list.append(skin_green_light);
  var skin_red_light =
      $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-red-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
          + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-red-active'></span><span class='bg-red' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
          + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
          + "</a>"
          + "<p class='text-center no-margin' style='font-size: 12px'>淡红</p>");
  skins_list.append(skin_red_light);
  var skin_yellow_light =
      $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
          .append("<a href='javascript:void(0);' data-skin='skin-yellow-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
          + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-yellow-active'></span><span class='bg-yellow' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
          + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
          + "</a>"
          + "<p class='text-center no-margin' style='font-size: 12px;'>淡黄</p>");
  skins_list.append(skin_yellow_light);
    var skin_scdp =
        $("<li />", {style: "float:left; width: 33.33333%; padding: 5px;"})
            .append("<a href='javascript:void(0);' data-skin='skin-scdp' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
                + "<div class='bg-gradient-1' style='height: 7px'><span style='display:block; width: 20%; float: left; height: 7px;' ></span><span style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
                + "<div><span style='display:block; width: 20%; float: left; height: 20px;' class='bg-gradient-8'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
                + "</a>"
                + "<p class='text-center no-margin' style='font-size: 12px;'>scdp</p>");
    skins_list.append(skin_scdp);


  demo_settings.append("<h4 class='control-sidebar-heading'>皮肤</h4>");
  demo_settings.append(skins_list);

  demo_settings.append("<div style='color: white;display: inline-block;width: 100%;padding: 5px 0px;'><div style='font-size: 15px;width: 70%;display: inline-block'>头部样式</div><div style='width: 30%;display: inline-block'><a class='clear-header'>清除样式</a></div></div>");
  var header_list = $("<ul />", {"class": 'list-unstyled clearfix'});
  var headerStyle = '<div class="theme-color-wrapper clearfix headerstyle"> '
      + ' <a class="tooltip-button set-adminheader-style bg-gradient-1" data-header-bg="bg-gradient-1 font-inverse" title="" href="javascript:void(0);" data-original-title="Gradient 1">Gradient 1</a>'
      + ' <a class="tooltip-button set-adminheader-style bg-gradient-2" data-header-bg="bg-gradient-2 font-inverse" title="" href="javascript:void(0);" data-original-title="Gradient 2">Gradient 2</a>'
      + ' <a class="tooltip-button set-adminheader-style bg-gradient-3" data-header-bg="bg-gradient-3 font-inverse" title="" href="javascript:void(0);" data-original-title="Gradient 3">Gradient 3</a>'
      + ' <a class="tooltip-button set-adminheader-style bg-gradient-4" data-header-bg="bg-gradient-4 font-inverse" title="" href="javascript:void(0);" data-original-title="Gradient 4">Gradient 4</a>'
      + ' <a class="tooltip-button set-adminheader-style bg-gradient-5" data-header-bg="bg-gradient-5 font-inverse" title="" href="javascript:void(0);" data-original-title="Gradient 5">Gradient 5</a>'
      + ' <a class="tooltip-button set-adminheader-style bg-gradient-6" data-header-bg="bg-gradient-6 font-inverse" title="" href="javascript:void(0);" data-original-title="Gradient 6">Gradient 6</a>'
      + ' <a class="tooltip-button set-adminheader-style bg-gradient-7" data-header-bg="bg-gradient-7 font-inverse" title="" href="javascript:void(0);" data-original-title="Gradient 7">Gradient 7</a>'
      + ' <a class="tooltip-button set-adminheader-style bg-gradient-8" data-header-bg="bg-gradient-8 font-inverse" title="" href="javascript:void(0);" data-original-title="Gradient 8">Gradient 8</a>'
      + ' </div>';
    demo_settings.append(headerStyle);

    demo_settings.append("<div style='color: white;display: inline-block;width: 100%;padding: 5px 0px;'><div style='font-size: 15px;width: 70%;display: inline-block'>侧边菜单样式</div><div style='width: 30%;display: inline-block'> <a class='clear-side'>清除样式</a></div></div>");
    var sideStyle = '<div class="theme-color-wrapper clearfix sidestyle"> '
        + ' <a class="tooltip-button set-adminheader-style bg-gradient-1" data-header-bg="bg-gradient-1 font-inverse" title="" href="javascript:void(0);" data-original-title="Gradient 1">Gradient 1</a>'
        + ' <a class="tooltip-button set-adminheader-style bg-gradient-2" data-header-bg="bg-gradient-2 font-inverse" title="" href="javascript:void(0);" data-original-title="Gradient 2">Gradient 2</a>'
        + ' <a class="tooltip-button set-adminheader-style bg-gradient-3" data-header-bg="bg-gradient-3 font-inverse" title="" href="javascript:void(0);" data-original-title="Gradient 3">Gradient 3</a>'
        + ' <a class="tooltip-button set-adminheader-style bg-gradient-4" data-header-bg="bg-gradient-4 font-inverse" title="" href="javascript:void(0);" data-original-title="Gradient 4">Gradient 4</a>'
        + ' <a class="tooltip-button set-adminheader-style bg-gradient-5" data-header-bg="bg-gradient-5 font-inverse" title="" href="javascript:void(0);" data-original-title="Gradient 5">Gradient 5</a>'
        + ' <a class="tooltip-button set-adminheader-style bg-gradient-6" data-header-bg="bg-gradient-6 font-inverse" title="" href="javascript:void(0);" data-original-title="Gradient 6">Gradient 6</a>'
        + ' <a class="tooltip-button set-adminheader-style bg-gradient-7" data-header-bg="bg-gradient-7 font-inverse" title="" href="javascript:void(0);" data-original-title="Gradient 7">Gradient 7</a>'
        + ' <a class="tooltip-button set-adminheader-style bg-gradient-8" data-header-bg="bg-gradient-8 font-inverse" title="" href="javascript:void(0);" data-original-title="Gradient 8">Gradient 8</a>'
        + ' </div>';
    demo_settings.append(sideStyle);
    //tab_pane.append(demo_settings);
  $("#control-sidebar-home-tab").append(demo_settings);
  $("#homeTabButton").click();

  setup();

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
     * 改变头部样式
     * @param cls
     */
  function changeHeaderStyle(cls) {
        $(".main-header").removeClass("bg-gradient-1 bg-gradient-2 bg-gradient-3 bg-gradient-4 bg-gradient-5 bg-gradient-6 bg-gradient-7 bg-gradient-8 font-inverse");
        $(".main-header").addClass(cls);
  }
    /**
     * 改变菜单样式
     * @param cls
     */
  function changeSideStyle(cls) {
        $(".main-sidebar").removeClass("bg-gradient-1 bg-gradient-2 bg-gradient-3 bg-gradient-4 bg-gradient-5 bg-gradient-6 bg-gradient-7 bg-gradient-8 font-inverse");
        $(".main-sidebar").addClass(cls);
  }
  /**
   * Retrieve default settings and apply them to the template
   *
   * @returns void
   */
  function setup() {
    var tmp = get('skin');
    if (tmp && $.inArray(tmp, my_skins))
      change_skin(tmp);
    var headerS = get("headerstyle");
    if(headerS && headerS != "") {
        changeHeaderStyle(headerS);
    }
    var sideS = get("sidestyle");
    if(sideS && sideS != "") {
        changeSideStyle(sideS);
    }
    //Add the change skin listener
    $("[data-skin]").on('click', function (e) {
      e.preventDefault();
      change_skin($(this).data('skin'));
      window.location.reload();
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

    $(".headerstyle").children("a").on("click", function (e) {
        e.preventDefault();
       $(this).addClass("active").siblings().removeClass("active");
       var bgCls = $(this).data("headerBg");
       changeHeaderStyle(bgCls);
       store('headerstyle', bgCls);
    });
    $(".sidestyle").children("a").on("click", function (e) {
        e.preventDefault();
      $(this).addClass("active").siblings().removeClass("active");
        var bgCls = $(this).data("headerBg");
        changeSideStyle(bgCls);
        store('sidestyle', bgCls);
    });

    $(".clear-header").on("click",function (e) {
        e.preventDefault();
        $(".main-header").removeClass("bg-gradient-1 bg-gradient-2 bg-gradient-3 bg-gradient-4 bg-gradient-5 bg-gradient-6 bg-gradient-7 bg-gradient-8 font-inverse");
        store('headerstyle', "");
    });
    $(".clear-side").on("click",function (e) {
        e.preventDefault();
        $(".main-sidebar").removeClass("bg-gradient-1 bg-gradient-2 bg-gradient-3 bg-gradient-4 bg-gradient-5 bg-gradient-6 bg-gradient-7 bg-gradient-8 font-inverse");
        store('sidestyle', "");
    })
  }
})(jQuery, $.AdminLTE);
