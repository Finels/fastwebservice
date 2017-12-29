package org.fast.service.model.sysmodel.fileupload.action;

import org.fast.service.domain.ActionBody;
import org.fast.service.domain.ResultBody;
import org.fast.service.model.sysmodel.fileupload.service.intf.FileUploadManager;
import org.fast.service.sys.exception.SysException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
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
public class FileAction {

    private FileUploadManager uploadManager;

    @RequestMapping("downloadAll.action")
    public ResponseEntity<ResultBody> downloadAll() {

        return new ResponseEntity<ResultBody>(new ResultBody("download file", "success", uploadManager.downloadByAll(), null), HttpStatus.OK);
    }

    @RequestMapping("upload.action")
    public ResponseEntity upload(@RequestBody ActionBody actionBody, HttpServletRequest request, HttpServletResponse response) {
        Map params = actionBody.getDataBody();
        try {
            uploadManager.upload(request, params);
        } catch (IOException e) {
            e.printStackTrace();
            throw new SysException("upload file", "error", "系统错误，请联系管理员", "could not create file in the current dirs,cause the io stream may be null,to check the stack trace prints for more detail.");
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}
