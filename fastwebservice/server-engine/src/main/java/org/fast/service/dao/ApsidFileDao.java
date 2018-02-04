package org.fast.service.dao;

import org.fast.service.domain.ApsidFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Description:  org.fast.web.dao
 * Copyright: © 2017 FanLei. All rights reserved.
 * Company: NULL
 *
 * @author FL
 * @version 1.0
 * @timestamp 2018/2/4
 */
public interface ApsidFileDao extends JpaRepository<ApsidFile, String> {

    @Query(value = "select * from apsid_file where filetype = ?1 order by creattime desc limit ?2,?3", nativeQuery = true)
    public List findByFiletype(String filetype, Integer start, Integer end);

    @Query(value = "select * from apsid_file order by creattime desc limit ?1,?2", nativeQuery = true)
    public List findAllByUuidIsNotNull(Integer start, Integer end);
}
