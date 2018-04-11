package org.fast.service.model.sysmodel.core.action;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.fast.service.domain.ActionBody;
import org.fast.service.domain.FastUser;
import org.fast.service.domain.ResultBody;
import org.fast.service.model.sysmodel.core.service.intf.UserServiceIntf;
import org.fast.service.util.ExcelUtil;
import org.fast.service.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
import java.io.IOException;
import java.io.OutputStream;
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
            List dataList = userService.doQuery(starttime.toString(), endtime.toString(), start, start + limit);
            count = userService.doQueryCount(starttime.toString(), endtime.toString());
            resultMap.put("rows", dataList);
        } else {
            List dataList = userService.doQuery(start, start + limit);
            count = userService.doQueryCount();
            resultMap.put("rows", dataList);
        }

        resultMap.put("total", count);
        return new ResponseEntity<ResultBody>(new ResultBody("user query", "success", resultMap, ""), HttpStatus.OK);
    }

    /**
     * 导出全部信息为Excel
     *
     * @return
     */
    @RequestMapping("export.action")
    @ResponseBody
    public String exportXLS(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String[] titles = {"code", "cacode", "firstname", "middlename", "lastname", "position", "institution", "city", "country", "address", "email"};
        String fileName = "userInfo" + ".xls";
        String sheetName = "userInfo";
        List<Map> dataList = userService.doQuery(0, 999999);
        String[][] content = new String[dataList.size()][titles.length];
        for (int i = 0; i < dataList.size(); i++) {
            for (int j = 0; j < titles.length; j++) {
                Map data = dataList.get(i);
                String target = titles[j];
                String dataStr = data.get(target) == null ? "" : data.get(target).toString();
                content[i][j] = dataStr;
            }
        }
        HSSFWorkbook ws = ExcelUtil.getHSSFWorkbook(sheetName, titles, content, null);
        response.setHeader("content-disposition", "attachment;filename=" + fileName);
        OutputStream os = response.getOutputStream();
        ws.write(os);
        os.flush();
        os.close();
        return null;
    }
}
