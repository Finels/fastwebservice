package org.fast.service.model.sysmodel.core.service.intf;

import javax.servlet.http.HttpServletRequest;
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

    public String doLogin(Map inMap, HttpServletRequest request);
}
