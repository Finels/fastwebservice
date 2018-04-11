package org.fast.service.model.sysmodel.core.service.impl;

import org.apache.tomcat.util.codec.binary.Base64;
import org.fast.service.dao.ApsidUserRepository;
import org.fast.service.dao.FastUserRepository;
import org.fast.service.domain.ApsidUser;
import org.fast.service.domain.FastUser;
import org.fast.service.model.sysmodel.core.service.intf.UserServiceIntf;
import org.fast.service.sys.exception.BizException;
import org.fast.service.sys.exception.SysException;
import org.fast.service.util.BeanUtil;
import org.fast.service.util.CryptUtil;
import org.fast.service.util.StringUtil;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.fast.service.model.sysmodel.security.service.intf.SecurityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Description:  UserServiceImpl
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/11/28
 */
@Transactional
public class UserServiceImpl implements UserServiceIntf {

    @Autowired
    private FastUserRepository userRepository;

    @Autowired
    private ApsidUserRepository apsidUserRepository;

    @Autowired
    private SecurityManager encryptManager;

    @Autowired
    private EntityManagerFactory emf;

    @Cacheable(value = "redisCache", key = "#method+'_'+#username")
    public String getUserByUsername(String username) {
        System.out.print("excute jpa @query function!");
        return "hahaxx";
    }

    @Override
    public Map doLogin(Map inMap, HttpServletRequest request) {
        Map out = new HashMap<>();
        FastUser loginUser = null;
        try {
            loginUser = (FastUser) BeanUtil.mapToObject(inMap, FastUser.class);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SysException("login", "fail", "系统错误，请联系管理员", "BeanUtil execute fail,mapToObject error!");
        }
        String username = loginUser.getUsername();
        String encryptPassword = loginUser.getPassword();
        String privateKey = (String) request.getSession().getAttribute("privateKey");
        String password = null;
        try {
            password = encryptManager.decryptByPrivateKey(privateKey, encryptPassword);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SysException("login", "fail", "系统错误，请联系管理员", "RSA:decrypt the password fail,please check the Rsa key or stackTrace prints!");
        }
        if (StringUtil.isNotEmpty(password)) {
            FastUser currentUser = userRepository.findByUsername(username);
            if (currentUser == null) {
                throw new BizException("login", "fail", "账号不存在", HttpStatus.UNAUTHORIZED);
            }
            if (currentUser.getPassword().equals(password)) {
                //密码匹配，登录成功，返回验证签名，之后的每次请求都需要验证该签名
                String currenToken = new Date().getTime() + "";//token目前只包含时间戳
                byte[] a = new byte[0];
                try {
                    a = CryptUtil.aesEncrypt(currenToken.getBytes("utf-8"), "fd8e73027e6211e7".getBytes("utf-8"));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                    throw new SysException("login", "fail", "系统错误，请联系管理员", "AES:encrypt the token string failed,check the stackTrace prints!");
                }
                out.put("token", Base64.encodeBase64String(a));
                out.put("user", currentUser);
                return out;
            } else {
                throw new BizException("login", "fail", "密码错误，请重试", HttpStatus.UNAUTHORIZED);
            }
        } else {
            throw new SysException("login", "fail", "解密错误，请刷新页面重试", "RSA:decrypted the password string is null,check the stackTrace prints or contact client to report");
        }

    }

    @Override
    public List doQuery(Integer start, Integer end) {
        EntityManager em = emf.createEntityManager();
        Query query = em.createNativeQuery("select a.*,b.cacode from apsid_user a left join apsid_file b on b.userid = a.uuid order by creattime desc limit ?1,?2");
        query.setParameter(1, start);
        query.setParameter(2, end);
//        List<ApsidUser> dataList = apsidUserRepository.findAllByCreattimeWithLimit(starttime, endtime, start, end);
        query.unwrap(SQLQuery.class).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        List<Map> dataList = query.getResultList();
        query.getResultList();
        em.close();
        return dataList;
    }

    @Override
    public List doQuery(String starttime, String endtime, Integer start, Integer end) {
        EntityManager em = emf.createEntityManager();
        Query query = em.createNativeQuery("select * from apsid_user where creattime between ?1 and ?2 order by creattime desc limit ?3,?4");
        query.setParameter(1, starttime);
        query.setParameter(2, endtime);
        query.setParameter(3, start);
        query.setParameter(4, end);
//        List<ApsidUser> dataList = apsidUserRepository.findAllByCreattimeWithLimit(starttime, endtime, start, end);
        query.unwrap(SQLQuery.class).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        List<Map> dataList = query.getResultList();
        query.getResultList();
        em.close();
        return dataList;
    }

    @Override
    public Integer doQueryCount() {
        EntityManager em = emf.createEntityManager();
        Query query = em.createNativeQuery("select count(uuid) from apsid_user");
        Object i = query.getSingleResult();
        em.close();
        return i == null ? 0 : Integer.parseInt(i.toString());
    }

    @Override
    public Integer doQueryCount(String starttime, String endtime) {
        EntityManager em = emf.createEntityManager();
        Query query = em.createNativeQuery("select count(uuid) from apsid_user where creattime between ?1 and ?2");
        query.setParameter(1, starttime);
        query.setParameter(2, endtime);
        Object i = query.getSingleResult();
        em.close();
        return i == null ? 0 : Integer.parseInt(i.toString());
    }
}
