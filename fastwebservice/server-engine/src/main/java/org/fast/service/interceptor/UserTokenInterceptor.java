package org.fast.service.interceptor;

import org.fast.service.sys.exception.BizException;
import org.fast.service.util.StringUtil;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
        return false;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws BizException {
        Map postMap = httpServletRequest.getParameterMap();
        Object signature = postMap.get("signature");
        if (StringUtil.isEmpty(signature)) {
            throw new BizException("用户信息校验失败，请重新登录");
        }
    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
