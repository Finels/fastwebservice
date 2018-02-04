package org.fast.service.model.sysmodel.fileupload.action;

import org.fast.service.dao.ApsidFileDao;
import org.fast.service.domain.ActionBody;
import org.fast.service.domain.ApsidFile;
import org.fast.service.domain.ResultBody;
import org.fast.service.model.sysmodel.fileupload.service.intf.FileUploadManager;
import org.fast.service.sys.exception.SysException;
import org.fast.service.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Description:  文件上传下载action
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/12/29
 */
@Controller
@RequestMapping("/file/")
public class FileController {
    @Autowired
    private FileUploadManager fileUploadManager;

    @RequestMapping("query.action")
    public ResponseEntity query(@RequestBody ActionBody actionBody, HttpServletRequest request, HttpServletResponse response) {
        Map params = actionBody.getDataBody();
        Map resultMap = new HashMap();
        List dataList;
        Integer count;
        //获取前台传入的分页参数
        Integer start = Integer.parseInt(params.get("start").toString());
        Integer limit = Integer.parseInt(params.get("limit").toString());
        if (start > 0) {
            start = (start - 1) * limit;
        }

        Object selectFileType = params.get("selectFileType");
        if (StringUtil.isEmpty(selectFileType)) {
            dataList = fileUploadManager.doQuery(start, start + limit);
            count = fileUploadManager.doQueryCount();
        } else {
            dataList = fileUploadManager.doQuery(selectFileType.toString(), start, start + limit);
            count = fileUploadManager.doQueryCount(selectFileType.toString());
        }
        resultMap.put("rows", dataList);
        resultMap.put("total", count);
        return new ResponseEntity<ResultBody>(new ResultBody("file query", "success", resultMap, ""), HttpStatus.OK);
    }
}
