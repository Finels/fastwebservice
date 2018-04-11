package org.fast.service.model.sysmodel.fileupload.action;

import org.apache.commons.lang3.time.DateUtils;
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
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

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
    private final String serverUrl = "/web/apache-tomcat-8.0.47/webapps/files/";
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

    /**
     * 打包下载所有文件
     *
     * @param request
     * @param response
     * @return
     */
    @RequestMapping("download.action")
    public ResponseEntity downloadAll(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("content-disposition", "attachment;filename=" + "files.zip");
        ZipOutputStream zipOutputStream = new ZipOutputStream(response.getOutputStream());
        List<Map> dataList = fileUploadManager.doQuery(0, 99999);
        for (Map data : dataList) {
            File srcFile = new File(serverUrl + data.get("filepath"));
            String rnCode = data.get("rncode").toString();
            String caCode = data.get("cacode").toString();
            zipOutputStream.putNextEntry(new ZipEntry("CA" + caCode + "-RN" + rnCode + "-" + srcFile.getName()));
            InputStream in = new FileInputStream(srcFile);
            int len = 0;
            byte[] buffer = new byte[1024];
            while ((len = in.read(buffer)) > 0) {
                zipOutputStream.write(buffer, 0, len);
            }
            in.close();
            zipOutputStream.closeEntry();
        }
        zipOutputStream.close();
        return new ResponseEntity<ResultBody>(new ResultBody("file download", "success", null, ""), HttpStatus.OK);
    }
}
