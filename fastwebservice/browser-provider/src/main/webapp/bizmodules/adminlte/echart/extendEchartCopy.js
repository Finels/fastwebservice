/**
 Description:  本js是在echart的基础上做了一个扩展，能自动为用户生成，横向坐标选择，以及数据grid
 * Copyright: © 2016 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author luoxiaojian(qinchengshiyu@foxmail.com)
 * @version 1.2
 * @timestamp 2016-10-25 15:30:57
 */
var extendEchartCopy={};
var seriesPool={};
/**
 * 初始化报表的方法
 * @param divId 报表div的ID
 * @param echartOptions echart的配置选项可参考百度配置，仅仅具有数据加载时需要键值对的区别
 * @returns extendEchart数据包（echartPackage），在数据加载时有用：{gridId:数据表格的id,csntchart:echart报表对象，option:echart的当前配置，lenend:echart图例，grid:easyui datagrid对象}
 */
extendEchartCopy.initEchart=function (divId,echartOptions,discptions) {
    var finalresult={}
    //设置id
    finalresult.gridId="#"+divId+"_extendEchart_gridTable";
    finalresult.divId=divId;
    //计算div高度
    var totalHeight=$("#"+divId).height();
    var contentDivHeight=(totalHeight-30)*0.6;
    var gridDivHeight=(totalHeight-30)*0.20;
    debugger;
    //动态生成div
    var mianDivHtml= "<div style='width: 100%;' id='"+divId+"_extendEchart_explaneDiv'></div>"+
                     "<div style='width: 100%;min-height: 50px;background-color:#fff ' id='"+divId+"_extendEchart_controlDiv'></div>" +
                     "<div style='width: 100%;height:"+contentDivHeight+"px;' id='"+divId+"_extendEchart_contentDiv'></div>"+
                     "<div style='width: 90%;margin-right: 5%;margin-left: 5%'><table style='width: 100%;height:"+gridDivHeight+"px;' id='"+divId+"_extendEchart_gridTable'></table></div>";

    //动态生成说明
    var explaneHtml="<ul style='text-align: left;margin-left: 5%;color: #3c8dbc'>";
    for (var index in discptions){
        explaneHtml+="<li>"+discptions[index]+"</li>";
    }
    explaneHtml+="</ul>"
    $("#"+divId).html(mianDivHtml);
    $("#"+divId+"_extendEchart_explaneDiv").html(explaneHtml);
    var lxjEchart=echarts.init($("#"+divId+"_extendEchart_contentDiv")[0]);
    //解析echartOptions里面的数据
    var series=echartOptions.series;
    // oldSeries=JSON.parse(JSON.stringify( series ));
    //采用juqery的深度克隆
     var oldSeries=$.extend(true,{}, series);
    //放入缓存池
    seriesPool[divId]=oldSeries;
    oldSeries=extendEchartCopy.formatObjectToArray(oldSeries);
    finalresult.oldSeries=oldSeries;
    //解析series的数据
    for(var index in series){
        series[index].data=extendEchartCopy.getValueArrayByJson(series[index].data);

    }
    var legend={};
    var legendDatas=[];
    if(echartOptions.legend!=null){
        legend=echartOptions.legend;
    }else{
        for(var index in series){
            legendDatas.push(series[index].name);
        }
        legend.x="right";
        legend.data=legendDatas;
    }
    var yAxis=null;
    var xAxis=null;
    if(echartOptions.xAxis!=null||echartOptions.yAxis!=null){
        xAxis={};
        yAxis={};
    }
    if(echartOptions.xAxis!=null){
        xAxis=$.extend(true,{},echartOptions.xAxis);
        xAxis.data=extendEchartCopy.getValueArrayByJson(echartOptions.xAxis.data);
        xAxis.axisLabel={'interval':0};
        // xAxis.nameGap=17;
    }
    if(echartOptions.yAxis!=null){
        yAxis=echartOptions.yAxis;
    }
    var tooltip={};
    if(echartOptions.tooltip!=null){
        tooltip=echartOptions.tooltip;
    }
    var dataZoom=null;
    if(echartOptions.dataZoom!=null){
        dataZoom=echartOptions.dataZoom;
    }
    var title=null;
    if(echartOptions.title!=null){
        title=echartOptions.title;
    }
    var textStyle=null;
    if(echartOptions.textStyle!=null){
        textStyle=echartOptions.textStyle;
    }
    var color=null;
    if(echartOptions.color!=null){
        color=echartOptions.color;
    }
    var gridConfig=null;
    if(echartOptions.grid!=null){
        gridConfig=echartOptions.grid;
    }
    var options={
        title:title,
        xAxis:xAxis,
        yAxis:yAxis,
        legend: legend,
        series:series,
        textStyle:textStyle,
        tooltip:tooltip,
        dataZoom:dataZoom,
        grid:gridConfig
    };
    //设置颜色
    if(null!=color){
        options.color=color;
    }
    finalresult.option=options;
    lxjEchart.setOption(options);

    //根据xAlies定义显示内容
    if(echartOptions.xAxis!=null&&echartOptions.xAxis.data!=null){
        var controlDivHtml="<div style='text-align: left'>";
        var columns=echartOptions.xAxis.data;
        $.each(columns,function(name,value) {
            controlDivHtml+='<label style="cursor:pointer;font-weight: normal;font-family: \'microsoft yahei\', Microsoft YaHei, STXihei, SimHei, SimSun, sans-serif"><input class="'+divId+'lxj_checkbox" style="margin-left: 40px;margin-top: 8px;height: 20px;width: 20px;padding: 0 5px 0 0;"  type="checkbox" checked id="divId_checkbox_'+name+'" />'+value+' </label>';
        });
        $("#"+divId+"_extendEchart_controlDiv").html(controlDivHtml);
    }
    var datacolumns={};
    if(echartOptions.xAxis!=null&&echartOptions.xAxis.data!=null){
        datacolumns=extendEchartCopy.getCloumnsByJson(echartOptions.xAxis.data);
    }else if(echartOptions.columns!=null){
        datacolumns=extendEchartCopy.getCloumnsByJson(echartOptions.columns);
    }
    //定义数据datagrid
    var grid=$("#"+divId+"_extendEchart_gridTable").datagrid({
        height: gridDivHeight,
        autoRowHeight: true,
        pagination: false,
        sortOrder: 'desc',
        remoteSort: false,
        singleSelect: true,
        fitColumns:true,
        columns:datacolumns
    });
    //加载datagrid数据
    $("#"+divId+"_extendEchart_gridTable").datagrid("loadData",extendEchartCopy.getGriddataByJson(oldSeries,null,echartOptions.columns));

    //返回grid
    finalresult.grid=grid;
    var newseries=$.extend(true,{}, oldSeries);
    newseries=extendEchartCopy.formatObjectToArray(newseries);
    $("."+divId+"lxj_checkbox").on("click",function () {
       var a= $("."+divId+"lxj_checkbox").not("input:checked");
        var newarray =JSON.parse(JSON.stringify( columns ));
        // var newseries=series.slice(0);
        newseries=$.extend(true,{}, oldSeries);
        newseries=extendEchartCopy.formatObjectToArray(newseries);
        // for(var index in newseries){
        //     //重新赋值数据
        //     newseries[index].data=series[index].data.slice(0);
        // }
        a.each(function(i){
            var hideName=$(this).attr("id").substring($(this).attr("id").lastIndexOf("_")+1);

            // newarray.delete(index);
            delete newarray[hideName];

            for(var suffix in newseries){
                var datas=newseries[suffix].data;
                //移除数据
                // datas.delete(index);
                delete datas[hideName];
            }
        });
        var newseries_copy=$.extend(true,{}, newseries);
        newseries_copy=extendEchartCopy.formatObjectToArray(newseries_copy);
        for(var index in newseries_copy){
            newseries_copy[index].data=extendEchartCopy.getValueArrayByJson(newseries_copy[index].data);
        }
        var newOption={
            xAxis:{
                data:extendEchartCopy.getValueArrayByJson(newarray)
            },
            title:title,
            legend: legend,
            yAxis:yAxis,
            series:newseries_copy,
            textStyle:textStyle,
            tooltip:tooltip,
            dataZoom:dataZoom,
            grid:gridConfig
        };
        //设置颜色
        if(null!=color){
            newOption.color=color;
        }
        //为echart重新加载数据
        lxjEchart.setOption(newOption,true);
        finalresult.option=newOption;
        //为grid重新加载数据

        //定义数据datagrid
       $("#"+divId+"_extendEchart_gridTable").datagrid({
            columns:extendEchartCopy.getCloumnsByJson(newarray)
        });
        $("#"+divId+"_extendEchart_gridTable").datagrid("loadData",extendEchartCopy.getGriddataByJson(newseries,legend,echartOptions.columns));
    });
    //监听图例按钮
    lxjEchart.on('legendselectchanged',function (data) {
        legend.selected=data.selected;
        var datacolumns=null;
        if(echartOptions.columns!=null){
            datacolumns=echartOptions.columns;
        }
        //为grid重新加载数据
        $("#"+divId+"_extendEchart_gridTable").datagrid("loadData",extendEchartCopy.getGriddataByJson(oldSeries,legend,datacolumns));
    });
    finalresult.csntchart=lxjEchart;
    return finalresult;
}
extendEchartCopy.getValueArrayByJson=function (jsonData) {
    if(!(jsonData instanceof Array)){
        if(jsonData!=null){
            var result=[];
            $.each(jsonData,function(name,value) {
                result.push(value);
            });
            return result;
        }
    }else{
        //按数组方式解析
        return jsonData;
    }

}
extendEchartCopy.getCloumnsByJson=function (jsonData) {
    if(jsonData!=null){
        var result=[];
        var innerData=[]
        var num=extendEchartCopy.getJsonLength(jsonData);
        var pecent;
        if(num<15){
            var pecent=1000/(extendEchartCopy.getJsonLength(jsonData)+1);
        }else{
            pecent="150px";
        }

        // pecent=pecent+"%";
        innerData.push({"title":"系列","field":"csntTitle","width":pecent,"formatter": function (value, rowData, rowIndex) {
            return "<span style='color: #47d2ee'><i class='fa fa-fw fa-cube'></i></span> "+value;
        }});
        $.each(jsonData,function(name,value) {
            innerData.push({"title":value,"field":name,"width":pecent});
        });
        result.push(innerData);
        return result;
    }

}
extendEchartCopy.getGriddataByJson=function (jsonData,legend,columnsData) {
    if(jsonData!=null){
        var result={};
        var rows=[];
        var a={};
        if(legend!=null&&legend.selected!=null){
            a=legend.selected;
        };
        for(var index in jsonData){
            //判断是对象
            if(!(jsonData[index].data instanceof Array)) {
                var temp = JSON.parse(JSON.stringify(jsonData[index].data));
                var title = jsonData[index].name;
                temp.csntTitle = title;
                if (null != a[title] && !a[title]) {
                    continue;
                }
                rows.push(temp);
                //判断是数组
            }else{
                var temp={};
                var title = jsonData[index].name;
                temp.csntTitle = title;
                if (null != a[title] && !a[title]) {
                    continue;
                }
                for(var j in jsonData[index].data){
                    var field=extendEchartCopy.getNameByValueOfJson(columnsData,jsonData[index].data[j].name);
                    temp[field]=jsonData[index].data[j].value;
                }
                rows.push(temp);
            }
        }
        result.total=rows.length;
        result.rows=rows;
        return result;
    }
}
extendEchartCopy.getNameByValueOfJson=function(jsonData,value){
    var result=null;
    $.each(jsonData,function(name,revalue) {
        if(revalue==value){
            result=name;
        }
    });
    return result;
}
extendEchartCopy.getJsonLength=function(jsonData){
    var result=null;
    $.each(jsonData,function(name,value) {
        result++;
    });
    return result;
}
/**
 * 将对象转化为数组
 * @param obejct
 */
extendEchartCopy.formatObjectToArray=function(obejct){
        var arr = [];
        for(var item in obejct){
            arr.push(obejct[item]);
        }
        return arr;
}
/**
 * 动态为echart加载数据
 * @param echartPackage 初始化echart时返回的数据
 * @param series 数据系列
 * @param isOverwrite 是否覆盖原数据
 * @param xAlies x轴数据名
 */
extendEchartCopy.loadData=function(echartPackage,series,isOverwrite,xAlies){
    //为echart重新加载数据
    var options=echartPackage.option;
    var myChart=echartPackage.csntchart;
    var gridId=echartPackage.gridId;
    var divId=echartPackage.divId;
    var legend=options.legend;
    //覆盖值
       for(var index in series){
           $.each(series[index],function (name,value) {
               seriesPool[divId][index][name]=value;

           })

       }
       var alies=null
       if(xAlies!=null){
           alies=xAlies;
       }
    if(isOverwrite){
            var a= $(".lxj_checkbox").not("input:checked");
            var newarray =JSON.parse(JSON.stringify(alies.data));
             var  newseries=$.extend(true,{}, seriesPool[divId]);
            newseries=extendEchartCopy.formatObjectToArray(newseries);
            a.each(function(i){
                var hideName=$(this).attr("id").substring($(this).attr("id").lastIndexOf("_")+1);
                delete newarray[hideName];
                for(var suffix in newseries){
                    var datas=newseries[suffix].data;
                    delete datas[hideName];
                }
            });

        var grid=$(gridId).datagrid({
            columns:extendEchartCopy.getCloumnsByJson(newarray)
        });
        $(gridId).datagrid("loadData",extendEchartCopy.getGriddataByJson(newseries,legend));

        for(var index in newseries){
            newseries[index].data=extendEchartCopy.getValueArrayByJson(newseries[index].data);
        }
        options.series=newseries;
        if(alies!=null){
            options.xAxis.data=extendEchartCopy.getValueArrayByJson(alies.data);;
        }
        myChart.setOption(options,true);
    }else{
        var a= $(".lxj_checkbox").not("input:checked");
        var newarray =JSON.parse(JSON.stringify(alies.data));
        var  newseries=$.extend(true,{}, seriesPool[divId]);
        newseries=extendEchartCopy.formatObjectToArray(newseries);
        a.each(function(i){
            var hideName=$(this).attr("id").substring($(this).attr("id").lastIndexOf("_")+1);
            delete newarray[hideName];
            for(var suffix in newseries){
                var datas=newseries[suffix].data;
                delete datas[hideName];
            }
        });

        var grid=$(gridId).datagrid({
            columns:extendEchartCopy.getCloumnsByJson(newarray)
        });
        $(gridId).datagrid("loadData",extendEchartCopy.getGriddataByJson(newseries,legend));

        for(var index in newseries){
            newseries[index].data=extendEchartCopy.getValueArrayByJson(newseries[index].data);
        }
        options.series=newseries;
        if(alies!=null){
            options.xAxis.data=extendEchartCopy.getValueArrayByJson(alies.data);
        }
        myChart.setOption(options);
    }
}