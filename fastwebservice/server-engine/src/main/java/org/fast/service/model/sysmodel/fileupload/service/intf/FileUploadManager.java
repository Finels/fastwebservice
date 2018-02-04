package org.fast.service.model.sysmodel.fileupload.service.intf;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
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
     * 查询文件列表，所有文件，带分页参数
     */
    public List doQuery(Integer start, Integer end);

    /**
     * 查询文件列表，带文件类型查询参数和分页参数
     */
    public List doQuery(String fileType, Integer start, Integer end);

    /**
     * 查询记录条数
     *
     * @return
     */
    public Integer doQueryCount();

    public Integer doQueryCount(String fileType);
}
