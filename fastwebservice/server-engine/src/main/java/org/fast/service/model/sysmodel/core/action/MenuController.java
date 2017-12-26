package org.fast.service.model.sysmodel.core.action;

import org.fast.service.domain.ActionBody;
import org.fast.service.domain.ResultBody;
import org.fast.service.model.sysmodel.core.service.intf.MenuManager;
import org.fast.service.sys.exception.Error;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * Description:  菜单加载相关接口
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/12/25
 */
@Controller
@RequestMapping("/menu/")
public class MenuController {
    @Autowired
    private MenuManager menuManager;

    @RequestMapping("load.action")
    public ResponseEntity loadMenusCJ(@RequestBody ActionBody actionBody, HttpServletRequest request, HttpServletResponse response) {
        //todo 接收前台参数，根据用户权限过滤菜单
        Map data = actionBody.getDataBody();
        Map resultMap = menuManager.loadMenus();
        return new ResponseEntity<ResultBody>(new ResultBody("loadMenu", "success", resultMap, null), HttpStatus.OK);
    }

    @RequestMapping("loadpage.action")
    public String loadMenuPage(@RequestBody ActionBody actionBody, HttpServletRequest request, HttpServletResponse response) {
        Map params = actionBody.getDataBody();
        String pagePath = params.get("pagePath").toString();
        return pagePath;

    }
}
