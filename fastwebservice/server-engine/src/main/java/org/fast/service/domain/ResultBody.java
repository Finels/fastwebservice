package org.fast.service.domain;

import java.util.Map;

/**
 * Description:  http请求响应体
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/11/3
 */
public class ResultBody {
    private String apiName;
    private String resultCode;
    private Map resultBody;
    private String redirectUrl;

    public ResultBody(String apiName, String resultCode, Map resultBody, String redirectUrl) {
        this.apiName = apiName;
        this.resultCode = resultCode;
        this.resultBody = resultBody;
        this.redirectUrl = redirectUrl;
    }

    public String getApiName() {
        return apiName;
    }

    public void setApiName(String apiName) {
        this.apiName = apiName;
    }

    public String getResultCode() {
        return resultCode;
    }

    public void setResultCode(String resultCode) {
        this.resultCode = resultCode;
    }

    public Map getResultBody() {
        return resultBody;
    }

    public void setResultBody(Map resultBody) {
        this.resultBody = resultBody;
    }

    public String getRedirectUrl() {
        return redirectUrl;
    }

    public void setRedirectUrl(String redirectUrl) {
        this.redirectUrl = redirectUrl;
    }
}
