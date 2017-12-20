package org.fast.service.model.sysmodel.security.service.impl;

import org.apache.tomcat.util.codec.binary.Base64;
import org.fast.service.dao.FastUserRepository;
import org.fast.service.dao.RsaKeyRepository;
import org.fast.service.domain.RsaKey;
import org.fast.service.model.sysmodel.security.service.intf.SecurityManager;
import org.fast.service.sys.exception.SysException;
import org.fast.service.util.RSAUtil;
import org.fast.service.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Description:  SecurityManagerImpl
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/12/20
 */
@Service
@Transactional
public class SecurityManagerImpl implements SecurityManager {

    @Autowired
    private RsaKeyRepository repository;

    @Override
    public Map generateRsaKey(HttpServletRequest request) {
        Map<String, Object> keyMap = null;
        String publicKey = null, privateKey = null;
        try {
            keyMap = RSAUtil.initKey();
            publicKey = RSAUtil.getPublicKey(keyMap);
            privateKey = RSAUtil.getPrivateKey(keyMap);
        } catch (Exception e) {
            e.printStackTrace();
            throw new SysException("密钥生成失败");
        }
        //保存到session中
        request.getSession().setAttribute("privateKey", privateKey);
        final String finalPublicKey = publicKey;
        Map out = new HashMap<String, Object>() {{
            put("publicKey", finalPublicKey);
        }};
        return out;
    }

    @Override
    public String decryptByPrivateKey(String key, String data) throws Exception {

        if (StringUtil.isNotEmpty(key)) {
            byte[] decodedData = RSAUtil.decryptByPrivateKey(Base64.decodeBase64(data), key);
            String result = new String(decodedData);
            return result;
        }
        return null;
    }
}
