package org.fast.service.model.sysmodel.core.action;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.fast.service.domain.FastUser;
import org.fast.service.domain.ResultBody;
import org.fast.service.model.sysmodel.core.service.intf.UserServiceIntf;
import org.fast.service.sys.config.SpringContextUtil;
import org.fast.service.sys.exception.BizException;
import org.fast.service.sys.exception.Error;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Description:  HomeController
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/10/3
 */
@Controller
@Transactional
@RequestMapping("/home/")
public class HomeController {

    @Autowired
    private UserServiceIntf userService;

    @Autowired
    private SpringContextUtil contextUtil;

    private Logger logeger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private SqlSessionFactory sessionFactory;

//    @RequestMapping("/")
//    public String home(HttpServletRequest request, HttpServletResponse response) {
//        return "index";
//    }

    @RequestMapping(value = "login.action")
    @ResponseBody
    public ResponseEntity<ResultBody> login(@RequestBody FastUser loginUser, HttpServletRequest request, HttpServletResponse response) {
        request = (MultipartHttpServletRequest) request;
        MultiValueMap fileMap = ((MultipartHttpServletRequest) request).getMultiFileMap();
        SqlSession session = sessionFactory.openSession();

        String currentUser = userService.getUserByUsername(loginUser.getUsername());
//        FastUserDao sessionDao = session.getMapper(FastUserDao.class);
//        FastUser currentUser1 = sessionDao.getUser(loginUser.getUsername());
        List files = (List) fileMap.get("file");
        MultipartFile file = (MultipartFile) files.get(0);
        File realFile = new File(request.getSession().getServletContext().getRealPath("/") + File.separator + file.getOriginalFilename());
        try {
            file.transferTo(realFile);
        } catch (IOException e) {
            e.printStackTrace();
            throw new BizException("文件写入失败");
        }
        Map resultMap = new HashMap<>();
        resultMap.put("signature", "test123");
        return new ResponseEntity<ResultBody>(new ResultBody("logined", "success", resultMap, request.getContextPath()), HttpStatus.OK);

    }

    @RequestMapping("save.action")
    public void doSave(@RequestBody FastUser user, HttpServletRequest request, HttpServletResponse response) {
        user.setUuid("123123");
//        repository.save(user);
        try {
            response.sendRedirect("/index.jsp");
            return;
        } catch (IOException e) {
            e.printStackTrace();
            throw new BizException("未知错误");
        }
    }


    @ExceptionHandler({BizException.class})
    public ResponseEntity exception(BizException e, HttpServletRequest request) {
        return new ResponseEntity<Error>(new Error("warning", "用户校验失败，请重新登录", request.getContextPath()), HttpStatus.NON_AUTHORITATIVE_INFORMATION);
    }
}
