<%@ page import="org.fast.service.sys.exception.SysException" %>
<%@ page import="org.fast.service.util.StringUtil" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="org.fast.service.util.JsonUtil" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    SysException exception = (SysException) request.getAttribute("actionMessages");
    String strMessage = exception.getExceptionMsg();
    String strStackMsg = exception.getStackMsg();
    strMessage = StringUtil.replaceAll(strMessage, "\"", "\\&quot;");
    PrintWriter writer = response.getWriter();
    HashMap outMap = new HashMap();
    outMap.put("errorcode", 1);
    outMap.put("sysexception", strMessage);
    outMap.put("stack", strStackMsg);
    outMap.put("error", strMessage);
    //outMap.put("message", strMessage);
    writer.write(JsonUtil.serialize(outMap));
    writer.close();
%>