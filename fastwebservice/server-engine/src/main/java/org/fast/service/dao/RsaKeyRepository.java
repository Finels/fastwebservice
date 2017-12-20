package org.fast.service.dao;

import org.fast.service.domain.FastUser;
import org.fast.service.domain.RsaKey;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Description:  SecurityRepository
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/12/20
 */
public interface RsaKeyRepository extends JpaRepository<RsaKey, String> {
    /**
     * 根据公钥查找对象
     * @param publicKey
     * @return
     */
    public FastUser findByPublicKey(String publicKey);


}
