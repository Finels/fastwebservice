package org.fast.service.model.sysmodel.security.action;

import org.fast.service.domain.ResultBody;
import org.fast.service.model.sysmodel.security.service.intf.SecurityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.util.Map;

/**
 * Description:  生成密钥对
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/12/20
 */
@Controller
@RequestMapping("/security/")
public class GenerateClientKeyAction {
    @Autowired
    private SecurityManager manager;

    @RequestMapping(value = "key.action")
    @ResponseBody
    public ResponseEntity<ResultBody> getKey(HttpServletRequest request, HttpServletResponse response) {
        Map out = manager.generateRsaKey(request);
        return new ResponseEntity<ResultBody>(new ResultBody("getKey", "success", out, request.getContextPath()), HttpStatus.OK);
    }
}
