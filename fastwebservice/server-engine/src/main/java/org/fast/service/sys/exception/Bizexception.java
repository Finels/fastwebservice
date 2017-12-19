package org.fast.service.sys.exception;

import java.util.HashMap;
import java.util.Map;

/**
 * Description:  BizException
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/12/19
 */
public class BizException extends RuntimeException {
    private String exceptionKey;
    private String exceptionMsg;
    private String errorCode;
    private Map contextMap;

    public BizException(String exceptionKey) {
        super(new Exception());
        this.exceptionKey = exceptionKey;
        this.exceptionMsg = "";
        this.contextMap = new HashMap();
    }

    public BizException(String exceptionKey, Map contextMap) {
        super(new Exception());
        this.exceptionKey = exceptionKey;
        this.exceptionMsg = "";
        this.contextMap = contextMap;
    }

    public BizException(String exceptionKey, Throwable t) {
        super(t);
        this.exceptionKey = exceptionKey;
        this.exceptionMsg = "";
        this.contextMap = new HashMap();
    }

    public BizException(String exceptionKey, Map contextMap, Throwable t) {
        super(t);
        this.exceptionKey = exceptionKey;
        this.exceptionMsg = "";
        this.contextMap = contextMap;
    }

    public String getExceptionKey() {
        return this.exceptionKey;
    }

    public void setExceptionKey(String exceptionKey) {
        this.exceptionKey = exceptionKey;
    }

    public Map getContextMap() {
        return this.contextMap;
    }

    public void setContextMap(Map contextMap) {
        this.contextMap = contextMap;
    }

    public String getExceptionMsg() {
        return this.exceptionMsg;
    }

    public void setExceptionMsg(String exceptionMsg) {
        this.exceptionMsg = exceptionMsg;
    }

    public String getErrorCode() {
        return this.errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }
}