package org.fast.service.model.sysmodel.core.service.impl;

import org.apache.tomcat.util.codec.binary.Base64;
import org.fast.service.dao.FastUserRepository;
import org.fast.service.domain.FastUser;
import org.fast.service.model.sysmodel.core.service.intf.UserServiceIntf;
import org.fast.service.sys.exception.BizException;
import org.fast.service.sys.exception.SysException;
import org.fast.service.util.BeanUtil;
import org.fast.service.util.CryptUtil;
import org.fast.service.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.fast.service.model.sysmodel.security.service.intf.SecurityManager;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Map;

/**
 * Description:  BillcardinoutManager
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/11/28
 */
public class UserServiceImpl implements UserServiceIntf {

    @Autowired
    private FastUserRepository userRepository;

    @Autowired
    private SecurityManager encryptManager;

    @Cacheable(value = "redisCache", key = "#method+'_'+#username")
    public String getUserByUsername(String username) {
        System.out.print("excute jpa @query function!");
        return "hahaxx";
    }

    @Override
    public String doLogin(Map inMap, HttpServletRequest request) {
        try {
            FastUser loginUser = (FastUser) BeanUtil.mapToObject(inMap, FastUser.class);
            String username = loginUser.getUsername();
            String encryptPassword = loginUser.getPassword();
            String privateKey = (String) request.getSession().getAttribute("privateKey");
            String password = encryptManager.decryptByPrivateKey(privateKey, encryptPassword);
            if (StringUtil.isNotEmpty(password)) {
                FastUser currentUser = userRepository.findByUsername(username);
                if (currentUser.getPassword().equals(password)) {
                    //密码匹配，登录成功，返回验证签名，之后的每次请求都需要验证该签名
                    String currenToken = new Date().getTime() + "";//token目前只包含时间戳
                    byte[] a = CryptUtil.aesEncrypt(currenToken.getBytes("utf-8"), "fd8e73027e6211e7".getBytes("utf-8"));
                    return Base64.encodeBase64String(a);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new SysException("发生了一个错误，请稍后重试");
        }
        return null;
    }
}
