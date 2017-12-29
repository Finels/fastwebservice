package org.fast.service.model.sysmodel.fileupload.service.intf;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

/**
 * Description:  文件上传下载管理
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/12/29
 */
public interface FileUploadManager {

    /**
     * 文件上传
     */
    public void upload(InputStream inputStream);

    public void upload(File file);

    public void upload(HttpServletRequest request, Map paramsMap) throws IOException;

    /**
     * 读取文件表中的所有文件，并获取所有文件的下载链接
     */
    public Map downloadByAll();
}
