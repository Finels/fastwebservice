package org.fast.service.model.sysmodel.core.action;

import org.fast.service.domain.ActionBody;
import org.fast.service.domain.FastUser;
import org.fast.service.domain.ResultBody;
import org.fast.service.model.sysmodel.core.service.intf.UserServiceIntf;
import org.fast.service.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Description:  BillcardinoutManager
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2018/1/19
 */
@Controller
@Transactional
@RequestMapping("/user/")
public class UserQueryController {
    @Autowired
    private UserServiceIntf userService;

    /**
     * 用户信息查询
     *
     * @param actionBody
     * @param request
     * @param response
     * @return
     */
    @RequestMapping(value = "query.action")
    @ResponseBody
    public ResponseEntity<ResultBody> query(@RequestBody ActionBody actionBody, HttpServletRequest request, HttpServletResponse response) {
        Map resultMap = new HashMap<>();
        List dataList;
        Integer count;
        Map params = actionBody.getDataBody();
        Integer start = Integer.parseInt(params.get("start").toString());
        Integer limit = Integer.parseInt(params.get("limit").toString());
        if (start > 0) {
            start = (start - 1) * limit;
        }

        //获取时间查询条件
        Object starttime = params.get("starttime");
        Object endtime = params.get("endtime");
        if (StringUtil.isNotEmpty(starttime) && StringUtil.isNotEmpty(endtime)) {
            dataList = userService.doQuery(starttime.toString(), endtime.toString(), start, start + limit);
            count = userService.doQueryCount(starttime.toString(), endtime.toString());
        } else {
            dataList = userService.doQuery(start, start + limit);
            count = userService.doQueryCount();
        }
        resultMap.put("rows", dataList);
        resultMap.put("total", count);
        return new ResponseEntity<ResultBody>(new ResultBody("login", "success", resultMap, ""), HttpStatus.OK);
    }
}
