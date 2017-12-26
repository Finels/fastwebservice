package org.fast.service.dao;

import org.fast.service.domain.FastMenu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Description:  菜单操作DAO类
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/12/25
 */
public interface FastMenuRepository extends JpaRepository<FastMenu, String> {
    /**
     * 查询所有菜单
     *
     * @return
     */
    public List<FastMenu> findByUuidNotNull();
}
