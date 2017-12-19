<%@ page import="org.fast.service.sys.exception.BizException" %>
<%@ page import="org.fast.service.util.StringUtil" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="org.fast.service.util.JsonUtil" %>
<%@ page import="java.util.HashMap" %>
<%
    BizException exception = (BizException) request.getAttribute("actionMessages");
    String strMessage = exception.getExceptionMsg();
    String errorCode = exception.getErrorCode();
    if (StringUtil.isEmpty(errorCode)) {
        errorCode = "2";
    }
    strMessage = StringUtil.replaceAll(strMessage, "\"", "\\&quot;");
    PrintWriter writer = response.getWriter();
    HashMap outMap = new HashMap();
    outMap.put("errorcode", errorCode);
    outMap.put("bizexception", strMessage);
    outMap.put("error", strMessage);
    //outMap.put("message", strMessage);
    writer.write(JsonUtil.serialize(outMap));
    writer.close();
%>