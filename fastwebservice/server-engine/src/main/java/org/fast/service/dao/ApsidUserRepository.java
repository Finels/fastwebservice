package org.fast.service.dao;

import org.fast.service.domain.ApsidUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Map;

/**
 * Description:  网站注册用户数据访问对象
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2018/1/19
 */
public interface ApsidUserRepository extends JpaRepository<ApsidUser, String> {

    //    @Query(value = "select a from ApsidUser a order by a.creattime desc")
    public List<ApsidUser> findByUuidIsNotNull();

    //    @Query(value = "select * from apsid_user where creattime between ?1 and ?2 order by creattime desc limit ?3,?4",nativeQuery = true)
    public List<ApsidUser> findByCreattimeBetween(String starttime, String endtime);

}
