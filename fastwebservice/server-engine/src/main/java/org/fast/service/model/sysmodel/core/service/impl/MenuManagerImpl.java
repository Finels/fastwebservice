package org.fast.service.model.sysmodel.core.service.impl;

import org.fast.service.dao.FastMenuRepository;
import org.fast.service.model.sysmodel.core.service.intf.MenuManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Description:  MenuManagerImpl
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/12/25
 */
@Service
public class MenuManagerImpl implements MenuManager {
    @Autowired
    private FastMenuRepository repository;

    @Override
    public Map loadMenus() {
        Map out = new HashMap<>();
        List dataList = repository.findByUuidNotNull();
        out.put("data", dataList);
        return out;
    }
}
