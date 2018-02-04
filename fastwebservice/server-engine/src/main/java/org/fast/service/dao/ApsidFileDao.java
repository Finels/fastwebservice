package org.fast.service.dao;

import org.fast.service.domain.ApsidFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

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

    @Query(value = "select A.*,concat(B.firstname,' ',B.middlename,' ',B.lastname) as username from apsid_file A left join apsid_user B on B.uuid = A.userid where A.filetype = ?1 order by A.createtime desc limit ?2,?3", nativeQuery = true)
    public List<ApsidFile> findByFiletype(String filetype, Integer start, Integer end);

    @Query(value = "select A.*,concat(B.firstname,' ',B.middlename,' ',B.lastname) as username from apsid_file A left join apsid_user B on B.uuid = A.userid order by A.createtime desc limit ?1,?2", nativeQuery = true)
    public List<ApsidFile> findAllByUuidIsNotNull(Integer start, Integer end);
}
