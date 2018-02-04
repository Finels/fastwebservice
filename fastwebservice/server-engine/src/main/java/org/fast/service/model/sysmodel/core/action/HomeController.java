package org.fast.service.model.sysmodel.core.action;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.fast.service.domain.ActionBody;
import org.fast.service.domain.FastUser;
import org.fast.service.domain.ResultBody;
import org.fast.service.model.sysmodel.core.service.intf.UserServiceIntf;
import org.fast.service.sys.config.SpringContextUtil;
import org.fast.service.sys.exception.BizException;
import org.fast.service.sys.exception.Error;
import org.fast.service.sys.exception.SysException;
import org.fast.service.sys.exception.Warn;
import org.fast.service.util.BeanUtil;
import org.fast.service.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Description:  登录HomeController
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/10/3
 */
@ControllerAdvice
@Transactional
@RequestMapping("/home/")
public class HomeController {

    @Autowired
    private UserServiceIntf userService;

    @Autowired
    private SpringContextUtil contextUtil;

    private Logger logeger = LoggerFactory.getLogger(this.getClass());



    /**
     * 登录请求处理器
     *
     * @param actionBody
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "login.action")
    @ResponseBody
    public ResponseEntity<ResultBody> login(@RequestBody ActionBody actionBody, HttpServletRequest request, HttpServletResponse response) {
        Map resultMap = new HashMap<>();
        Map params = actionBody.getDataBody();
        Map data = userService.doLogin(params, request);
        //将token写入客户端浏览器的cookie中
        Cookie cookie = new Cookie("signature", data.get("token").toString());
        cookie.setPath("/");
        response.addCookie(cookie);
        //将用户名返回便于前台缓存
        resultMap.put("username", ((FastUser) data.get("user")).getNickname());
        String redirctUrl = "/bizmodules/jsp/mainframe_light.jsp";
        return new ResponseEntity<ResultBody>(new ResultBody("login", "success", resultMap, redirctUrl), HttpStatus.OK);
    }


    @ExceptionHandler({BizException.class})
    public ResponseEntity exception(BizException e, HttpServletRequest request) {
        return new ResponseEntity<Warn>(new Warn(e.getApiName(), e.getErrorCode(), e.getExceptionMsg(), request.getContextPath()), e.getHttpStatus());
    }

    @ExceptionHandler({SysException.class})
    public ResponseEntity exception(SysException e, HttpServletRequest request) {
        return new ResponseEntity<Error>(new Error(e.getApiName(), e.getExceptionKey(), e.getExceptionMsg(), e.getStackMsg(), request.getContextPath()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
