package org.fast.service.dao;

import org.fast.service.domain.FastFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Map;

/**
 * Description:  文件上传下载DAO
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/12/29
 */
public interface FastFileRepository extends JpaRepository<FastFile, String> {

    public List<FastFile> findByUuidNotNull();

}
