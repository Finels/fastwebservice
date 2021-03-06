package org.fast.service.model.sysmodel.core.service.intf;

import org.springframework.data.domain.Page;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * Description:  BillcardinoutManager
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/11/28
 */
public interface UserServiceIntf {

    public String getUserByUsername(String username);

    public Map doLogin(Map inMap, HttpServletRequest request);

    public List doQuery(Integer page, Integer size);

    public List doQuery(String starttime, String endtime, Integer page, Integer size);

    public Integer doQueryCount();

    public Integer doQueryCount(String starttime, String endtime);
}
