package org.fast.service.model.sysmodel.fileupload.service.impl;

import org.apache.commons.collections.ListUtils;
import org.fast.service.dao.FastFileRepository;
import org.fast.service.domain.FastFile;
import org.fast.service.model.sysmodel.fileupload.service.intf.FileUploadManager;
import org.fast.service.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

/**
 * Description:  FileUploadManagerImpl
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/12/29
 */

@Service
@Transactional
public class FileUploadManagerImpl implements FileUploadManager {

    @Autowired
    private FastFileRepository fileRepository;

    @Autowired
    Environment env;

    private String FILE_CURRENT_PATH;

    @Override
    public void upload(InputStream inputStream) {
    }

    @Override
    public void upload(File file) {
    }

    @Override
    public void upload(HttpServletRequest request, Map paramsMap) throws IOException {
        this.FILE_CURRENT_PATH = env.getProperty("file_path");
        String fileName = paramsMap.get("fileName").toString();
        this.upload(request, fileName);
    }

    @Override
    public Map downloadByAll() {
        Map out = new HashMap<>();
        List dataList = fileRepository.findByUuidNotNull();
        out.put("data", dataList);
        return out;
    }

    private String renameFile(String originalName) {
        return UUID.randomUUID().toString().replaceAll("-", "") + originalName.substring(originalName.lastIndexOf("."), originalName.length());
    }

    public void upload(HttpServletRequest request, String fileName) throws IOException {
        String rootPath = request.getSession().getServletContext().getRealPath("/");
        rootPath = rootPath.replace("fastwebservice", "files");
        String filePath = rootPath + File.separator + FILE_CURRENT_PATH;
        File baseFile = new File(filePath);
        if (!baseFile.exists()) {
            baseFile.mkdirs();
        }
        Map<String, MultipartFile> fileMap = ((MultipartRequest) request).getFileMap();
        for (Map.Entry<String, MultipartFile> mfile : fileMap.entrySet()) {
            MultipartFile file = mfile.getValue();
            if (file != null) {
                String fileRealName = this.renameFile(file.getOriginalFilename());
                File localFile = new File(baseFile.getAbsoluteFile() + File.separator + fileRealName);
                file.transferTo(localFile);
                //生成记录保存到数据库中，记录文件位置和相关关联关系
                fileRepository.save(new FastFile() {{
                    setUuid(UUID.randomUUID().toString().replaceAll("-", ""));
                    setFilename(StringUtil.isEmpty(fileName) ? file.getOriginalFilename() : fileName);
                    setCreateTime(new Date());
                    setPath(FILE_CURRENT_PATH.replaceAll(File.separator + File.separator, "/") + File.separator + fileRealName);
                }});

            }
        }
    }
}
