package org.fast.service.model.sysmodel.fileupload.service.impl;

import org.apache.commons.collections.ListUtils;
import org.fast.service.dao.ApsidFileDao;
import org.fast.service.dao.FastFileRepository;
import org.fast.service.domain.FastFile;
import org.fast.service.model.sysmodel.fileupload.service.intf.FileUploadManager;
import org.fast.service.util.StringUtil;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
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
    private ApsidFileDao fileDao;
    @Autowired
    private EntityManagerFactory emf;

    @Override
    public List doQuery(Integer start, Integer end) {
        EntityManager em = emf.createEntityManager();
        Query query = em.createNativeQuery("select A.*,concat(B.firstname,' ',B.middlename,' ',B.lastname) as username from apsid_file A left join apsid_user B on B.uuid = A.userid order by A.createtime desc limit ?1,?2");
        query.setParameter(1, start);
        query.setParameter(2, end);
        query.unwrap(SQLQuery.class).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        List<Map> dataList = query.getResultList();
//        return fileDao.findAllByUuidIsNotNull(start, end);
        return dataList;
    }

    @Override
    public List doQuery(String fileType, Integer start, Integer end) {
        EntityManager em = emf.createEntityManager();
        Query query = em.createNativeQuery("select A.*,concat(B.firstname,' ',B.middlename,' ',B.lastname) as username from apsid_file A left join apsid_user B on B.uuid = A.userid where A.filetype = ?1 order by A.createtime desc limit ?2,?3");
        query.setParameter(1, fileType);
        query.setParameter(2, start);
        query.setParameter(3, end);
        query.unwrap(SQLQuery.class).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        List<Map> dataList = query.getResultList();
//        return fileDao.findByFiletype(fileType, start, end);
        return dataList;
    }

    @Override
    public Integer doQueryCount() {
        EntityManager em = emf.createEntityManager();
        Query query = em.createNativeQuery("select count(uuid) from apsid_file");
        Object i = query.getSingleResult();
        return i == null ? 0 : Integer.parseInt(i.toString());
    }

    @Override
    public Integer doQueryCount(String fileType) {
        EntityManager em = emf.createEntityManager();
        Query query = em.createNativeQuery("select count(uuid) from apsid_file where filetype = ?1 ");
        query.setParameter(1, fileType);
        Object i = query.getSingleResult();
        return i == null ? 0 : Integer.parseInt(i.toString());
    }
}
