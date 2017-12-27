package org.fast.service.interceptor;

import org.apache.tomcat.util.codec.binary.Base64;
import org.fast.service.sys.exception.BizException;
import org.fast.service.sys.exception.Warn;
import org.fast.service.util.CryptUtil;
import org.fast.service.util.JsonUtil;
import org.fast.service.util.StringUtil;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.Date;
import java.util.Map;

/**
 * Description:  UserTokenInterceptor请求验证拦截，由于基于spring框架，因此选择Interceptor来拦截请求而不是filter
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/10/27
 */
public class UserTokenInterceptor implements HandlerInterceptor {


    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
        Cookie[] cookies = httpServletRequest.getCookies();
        String signature = "";
        for (Cookie cookie : cookies) {
            if (("signature").equals(cookie.getName())) {
                signature = cookie.getValue();
            }
        }

        if (StringUtil.isNotEmpty(signature)) {

            //AES解密并验证signature
            byte[] a = CryptUtil.aesDecrypt(Base64.decodeBase64(signature), "fd8e73027e6211e7".getBytes("utf-8"));
            long clientTimestamp = new Long(new String(a));
            //如果token时间戳与服务器当前时间相差小于{半小时}，则验证通过
            if (clientTimestamp > 0 && new Date().getTime() - clientTimestamp < 1800000) {
                return true;
            }
        }
        String c = JsonUtil.serialize(new Warn("check token", "warn", "登录信息验证失败，请重新登录", "/"));
        httpServletResponse.setCharacterEncoding("UTF-8");
        httpServletResponse.setHeader("Content-type", "application/json;charset=UTF-8");
        httpServletResponse.setStatus(403);
        PrintWriter writer = httpServletResponse.getWriter();
        writer.append(c);
        writer.close();
        return false;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws BizException {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
