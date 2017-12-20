package org.fast.service.model.sysmodel.security.service.intf;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Description:  安全相关类
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/12/20
 */
public interface SecurityManager {
    /**
     * 生成RSA密钥对，并持久化到数据库
     *
     * @return
     */
    public Map generateRsaKey(HttpServletRequest request);

    /**
     * 验证RSA密钥对
     */
    public String decryptByPrivateKey(String key, String data) throws Exception;
}
