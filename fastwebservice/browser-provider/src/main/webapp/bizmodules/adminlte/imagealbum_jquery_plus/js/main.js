/**
 * Description:本js是用来初始化可旋转的相册监听的;相册要求要有一个div
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author luoxiaojian(qinchengshiyu@foxmail.com)
 * @timestamp 2017/01/10.
 */
function initAlbumView() {
    //获得控制台信息
  var console = window.console || { log: function () {} };
    //获得相册ul对象
  var $images = $('.docs-pictures');
    //通用处理方法
  var handler = function (e) {
        console.log(e.type);
      };
  var showHandler=function () {
      try{
      //相册显示回调
       // albumShow();
      }catch(err) {
        console.log("无相册展示回调函数");
      }
  };
  var hideHandler=function () {
    try {
   //相册隐藏回调
    //  albumHide();
    }catch(err) {
      console.log("无相册隐藏回调函数");
    }
  };
  var options = {
        // inline: true,
        url: 'data-original',
        build: handler,
        built: handler,
        show: handler,
        shown: handler,
        hide: handler,
        hidden: handler,
        zIndex:210001
      };
  //初始化相册并添加监听
  $images.on({
    'build.viewer': handler,
    'built.viewer': handler,
    'show.viewer': showHandler,
    'shown.viewer': handler,
    'hide.viewer': handler,
    'hidden.viewer': hideHandler
  }).viewer(options);
}
