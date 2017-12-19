    <%@ page language="java" contentType="text/html; charset=utf-8"
             pageEncoding="utf-8"%>
        <%@ page import="com.csnt.scdp.bizmodules.helper.cs.Uploader " %>
    <%@ page import="com.csnt.scdp.framework.helper.SysconfigHelper" %>
    <%@ page import="com.csnt.scdp.bizmodules.attributes.CommonAttribute" %>

    <%
    request.setCharacterEncoding("utf-8");
	response.setCharacterEncoding("utf-8");
    Uploader up = new Uploader(request);
    up.setSavePath(SysconfigHelper.getProperty(CommonAttribute.TEXTPICTURE_FILE_PATH));
//    up.setSavePath("bizmodules/images/upload");
    String[] fileType = {".gif" , ".png" , ".jpg" , ".jpeg" , ".bmp"};
    up.setAllowFiles(fileType);
    up.setMaxSize(10000); //单位KB
    up.upload();

    String callback = request.getParameter("callback");

    String result = "{\"name\":\""+ up.getFileName() +"\", \"originalName\": \""+ up.getOriginalName() +"\", \"size\": "+ up.getSize() +", \"state\": \""+ up.getState() +"\", \"type\": \""+ up.getType() +"\", \"url\": \""+ up.getUrl() +"\"}";

    result = result.replaceAll( "\\\\", "\\\\" );

    if( callback == null ){
        response.getWriter().print( result );
    }else{
        response.getWriter().print("<script>"+ callback +"(" + result + ")</script>");
    }
    %>
