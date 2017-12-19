/**
 * 框架基础模块
 */
// 王令 用户反馈信息
Scdp.Loader.setPath('SYSFeedback', 'bizmodules/modules/sys/usercenter/feedback');
Scdp.Loader.setPath('SYSSingleFeedback', 'bizmodules/modules/sys/usercenter/feedback');
Scdp.Loader.setPath('SYSReplyFeedback', 'bizmodules/modules/sys/usercenter/feedback');

Scdp.Loader.setPath('Index', 'bizmodules/modules/cs/basedata');
/**
 * ↑↑↑↑大数据分析js注册写在上面↑↑******↓↓收费运营js注册写在下面↓↓↓
 */
//何国庆 首页
Scdp.Loader.setPath('Index', 'bizmodules/modules/cs/basedata');
//薛晨阳 资产管理界面
Scdp.Loader.setPath('AssetManagement', 'bizmodules/modules/cs/interior/assetmanagement');
//薛晨阳 站务管理界面
Scdp.Loader.setPath('StationManagement', 'bizmodules/modules/cs/interior/stationmanagement');
//邓富云 谈心计划管理界面
Scdp.Loader.setPath('ChatPlanManagement', 'bizmodules/modules/cs/interior/chatplanmanagement');
//何国庆 谈心管理统计
Scdp.Loader.setPath('ChatManagementCount', 'bizmodules/modules/cs/interior/chatplanmanagement');
//mcg 人员出勤记录界面
Scdp.Loader.setPath('PersonAttendance', 'bizmodules/modules/cs/tollstaff/attendance/personattendance');

//mcg 人员计划出勤记录界面
Scdp.Loader.setPath('PersonAttenceUsershift', 'bizmodules/modules/cs/tollstaff/attendance/personattendance');


//mcg 人员出勤记录查询界面
Scdp.Loader.setPath('QueryPersonAttendance', 'bizmodules/modules/cs/tollstaff/attendance/personattendance');

//马春光 人员出勤记录界面，只有特殊角色使用
Scdp.Loader.setPath('PersonAttendanceAdmin', 'bizmodules/modules/cs/tollstaff/attendance/personattendance');


//邓富云 人员基本信息界面
Scdp.Loader.setPath('UserBaseInfo', 'bizmodules/modules/cs/tollstaff/userinfo');
//马春光 离职员工信息展示界面
//UserLeaveInfo.view.queryuserinfoleaveView
Scdp.Loader.setPath('UserLeaveInfo', 'bizmodules/modules/cs/tollstaff/userinfo');

//罗婷婷 员工信息展示界面
Scdp.Loader.setPath('ShowUserInfo', 'bizmodules/modules/cs/tollstaff/userinfo');

//何国庆 人员分析统计界面
Scdp.Loader.setPath('UserAnalyseCount', 'bizmodules/modules/cs/tollstaff/userinfo');
//何国庆 人员出勤分析界面
Scdp.Loader.setPath('PersonAttendanceAnalyse', 'bizmodules/modules/cs/tollstaff/attendance/personattendance');
//王令 考勤调班申请界面
Scdp.Loader.setPath('Addadjustshift', 'bizmodules/modules/cs/tollstaff/attendance/adjustshift');

//mcg 考勤调班申请界面
Scdp.Loader.setPath('Addchangeshift', 'bizmodules/modules/cs/tollstaff/attendance/adjustshift');

//王令 考勤调班审批界面
Scdp.Loader.setPath('Checkadjustshift', 'bizmodules/modules/cs/tollstaff/attendance/adjustshift');
//王令 考勤调班查询界面
Scdp.Loader.setPath('Queryadjustshift', 'bizmodules/modules/cs/tollstaff/attendance/adjustshift');
//王令 考勤请假申请界面
Scdp.Loader.setPath('Addaskleave', 'bizmodules/modules/cs/tollstaff/attendance/askleave');
//王令 考勤请假审批界面
Scdp.Loader.setPath('Checkaskleave', 'bizmodules/modules/cs/tollstaff/attendance/askleave');
//王令 考勤请假查询界面
Scdp.Loader.setPath('Queryaskleave', 'bizmodules/modules/cs/tollstaff/attendance/askleave');
//付尧 管理处信息录入界面
Scdp.Loader.setPath('Managementinput', 'bizmodules/modules/cs/orgbaseinfo/managementinput');
//王令 排班模板设置
Scdp.Loader.setPath('Setshift', 'bizmodules/modules/cs/tollstaff/attendance/shiftmanage');
//付尧 路公司信息录入界面
Scdp.Loader.setPath('Companyinput', 'bizmodules/modules/cs/orgbaseinfo/companyinput');
//马春光 服装基本信息管理
Scdp.Loader.setPath('Basicinfomangage', 'bizmodules/modules/cs/tollstaff/clothes/basicinfomangage');
//马春光 年限基本信息管理
Scdp.Loader.setPath('Lifeinfomangage', 'bizmodules/modules/cs/tollstaff/clothes/lifeinfomangage');
//马春光 路公司服装采购管理
Scdp.Loader.setPath('Roadpurchasemangage', 'bizmodules/modules/cs/tollstaff/clothes/roadpurchasemangage');
//马春光 服装发放管理
Scdp.Loader.setPath('Roadsentoutmangage', 'bizmodules/modules/cs/tollstaff/clothes/roadsentoutmangage');
//马春光 收费站服装发放管理
Scdp.Loader.setPath('Stationsentoutmangage', 'bizmodules/modules/cs/tollstaff/clothes/stationsentoutmangage');
//马春光 初始化收费员服装管理
Scdp.Loader.setPath('Initemployeeclothes', 'bizmodules/modules/cs/tollstaff/clothes/initemployeeclothes');


//刘力菲 echarts迁徙图
Scdp.Loader.setPath('Echartsmap', 'bizmodules/modules/cs/echartsmap');
//马春光 服装领用管理
Scdp.Loader.setPath('Takeclothes', 'bizmodules/modules/cs/tollstaff/clothes/takeclothes');
//马春光 库存情况分析
Scdp.Loader.setPath('Stockquery', 'bizmodules/modules/cs/tollstaff/clothes/stockquery');
//马春光 服装配备情况分析
Scdp.Loader.setPath('Emclothes', 'bizmodules/modules/cs/tollstaff/clothes/emclothes');
//付尧 服务区信息录入界面
Scdp.Loader.setPath('Restareainput', 'bizmodules/modules/cs/orgbaseinfo/restareainput');
//付尧 路段信息录入界面
Scdp.Loader.setPath('Roadinput', 'bizmodules/modules/cs/orgbaseinfo/roadinput');
//何国庆 组织机构关系树图展示界面
Scdp.Loader.setPath('OrgRelationship', 'bizmodules/modules/cs/orgbaseinfo/OrgRelationship');
//付尧 职能部门信息录入界面
Scdp.Loader.setPath('Departmentinput', 'bizmodules/modules/cs/orgbaseinfo/departmentinput');
//付尧 隧管所信息录入界面
Scdp.Loader.setPath('Tunnelmanagementinput', 'bizmodules/modules/cs/orgbaseinfo/tunnelmanagementinput');
//付尧 隧道信息录入界面
Scdp.Loader.setPath('Tunnelinput', 'bizmodules/modules/cs/orgbaseinfo/tunnelinput');
//马春光 涵洞信息录入界面
Scdp.Loader.setPath('Culvertinput', 'bizmodules/modules/cs/orgbaseinfo/culvertinput');
//付尧 收费站信息录入界面
Scdp.Loader.setPath('Stationinput', 'bizmodules/modules/cs/orgbaseinfo/stationinput');
//王令 组织机构管理页面
Scdp.Loader.setPath('ManagementOrgTree', 'bizmodules/modules/cs/orgbaseinfo/managementorgtree');
//王令 轨道图页面
Scdp.Loader.setPath('NetMap', 'bizmodules/modules/cs/newroadnetmap/netmap');
//彭湃 星评管理界面
Scdp.Loader.setPath('StarManagement', 'bizmodules/modules/cs/tollstaff/starmanagement');
//彭湃 星评查询界面
Scdp.Loader.setPath('StarSearch', 'bizmodules/modules/cs/tollstaff/starmanagement');
//何国庆 星评统计界面
Scdp.Loader.setPath('StarEchar', 'bizmodules/modules/cs/tollstaff/starmanagement');
//彭湃 职务信息管理
Scdp.Loader.setPath('PositionTitleInput', 'bizmodules/modules/cs/orgbaseinfo/positiontitleinput');
//彭湃 职称信息管理
Scdp.Loader.setPath('PositionInput', 'bizmodules/modules/cs/orgbaseinfo/positioninput');
//彭湃 线路编码管理
Scdp.Loader.setPath('LineInput', 'bizmodules/modules/cs/orgbaseinfo/lineinput');
//彭湃 路段信息录入界面
Scdp.Loader.setPath('Roadinput', 'bizmodules/modules/cs/orgbaseinfo/roadinput');
//彭湃 隧管所信息录入界面
Scdp.Loader.setPath('Tunnelmanagementinput', 'bizmodules/modules/cs/orgbaseinfo/tunnelmanagementinput');
//彭湃 隧道信息录入界面
Scdp.Loader.setPath('Tunnelinput', 'bizmodules/modules/cs/orgbaseinfo/tunnelinput');
//彭湃 系统编码录入界面
Scdp.Loader.setPath('SystemCodeInput', 'bizmodules/modules/cs/orgbaseinfo/systemcodeinput');
//彭湃 班组排班界面
Scdp.Loader.setPath('StationShift', 'bizmodules/modules/cs/tollstaff/attendance/stationshift');
//彭湃 基础重要文档管理界面
Scdp.Loader.setPath('FileManagement', 'bizmodules/modules/cs/interior/filemanagement');
//彭湃 收费站收费员服装信息查询
Scdp.Loader.setPath('StationClothes', 'bizmodules/modules/cs/tollstaff/clothes/emclothes');
//彭湃 收费公路项目统计数据录入
Scdp.Loader.setPath('RoadInComeInput', 'bizmodules/modules/cs/paymentroad/roadincomeinput');
//彭湃 桥梁信息录入
Scdp.Loader.setPath('Bridge', 'bizmodules/modules/cs/orgbaseinfo/bridge');
//彭湃 基础数据大、小类
Scdp.Loader.setPath('BaseData', 'bizmodules/modules/cs/basedata');
//彭湃 通行异常卡管理
Scdp.Loader.setPath('ICCardLose', 'bizmodules/modules/cs/paymanagement/iccardlose');
//彭湃 收费员当班工作记录单查询
Scdp.Loader.setPath('TollWorkReportedSearch', 'bizmodules/modules/cs/paymanagement/tollWorkReported/tollworkreported');
//彭湃 纸卷扎帐页面
Scdp.Loader.setPath('PaperCheck', 'bizmodules/modules/cs/paymanagement/billcardcheck/papercheck');
//彭湃 收费站废票管理
Scdp.Loader.setPath('InvalidManage', 'bizmodules/modules/cs/paymanagement/invalidmanage');
//彭湃 应急纸卷统计
Scdp.Loader.setPath('ToPmPaper', 'bizmodules/modules/cs/paymanagement/topmpaper');
//付尧 培训计划制定界面
Scdp.Loader.setPath('Trainplan', 'bizmodules/modules/cs/interior/trainplan/trainplan');
//付尧 培训计划落实界面
Scdp.Loader.setPath('Plantodo', 'bizmodules/modules/cs/interior/trainplan/plantodo');
//付尧 组织机构树弱化版
Scdp.Loader.setPath('ManagementOrgTreeLimit', 'bizmodules/modules/cs/orgbaseinfo/managementorgtreelimit');
//付尧 收费公路项目基础数据
Scdp.Loader.setPath('PaymentroadBaseinfo', 'bizmodules/modules/cs/paymentroad/roadbaseinfo');
//付尧 收费公路项目统计分析数据
Scdp.Loader.setPath('PaymentroadIncomeinfo', 'bizmodules/modules/cs/paymentroad/roadanalysis');
//夏铃涛 收费员工统计模块
Scdp.Loader.setPath('Stationshift', 'bizmodules/modules/cs/tollstaff/stationshift/');
//付尧 收费站班组排班情况查询
Scdp.Loader.setPath('Stationshiftquery', 'bizmodules/modules/cs/tollstaff/attendance/stationshiftquery');

//王令  大数据人员信息管理
Scdp.Loader.setPath('AddUserInfo', 'bizmodules/modules/cs/orgbaseinfo/userinfo');
//王令  大数据人员信息查询
Scdp.Loader.setPath('SelectbdUserInfo', 'bizmodules/modules/cs/orgbaseinfo/userinfo');
//王令  大数据人员明细信息
Scdp.Loader.setPath('ShowbdUserInfo', 'bizmodules/modules/cs/orgbaseinfo/userinfo');

//马泽腾 测试页面
Scdp.Loader.setPath('ToastrTest', 'bizmodules/modules/toastrtest/');

//谭根源  EXCEL模板下载页面
Scdp.Loader.setPath('ExcelDownload', 'bizmodules/modules/cs/orgbaseinfo/exceldownload/');

//廖洪琳 消息中心
Scdp.Loader.setPath('Messagecenter', 'bizmodules/modules/cs/basedata/messagecenter/');


//付尧 收费设施设备使用年限设置页面
Scdp.Loader.setPath('ServiceLifeSet', 'bizmodules/modules/cs/interior/assetmanagement');

//马泽腾 调拨查询页面
Scdp.Loader.setPath('BillDeployQuery', 'bizmodules/modules/cs/paymanagement/billcardinout/billDeployQuery');
//马泽腾 票据调拨页面
Scdp.Loader.setPath('TicketInOut', 'bizmodules/modules/cs/paymanagement/billcardinout/ticketinout');
//马泽腾 纸卷调拨页面
Scdp.Loader.setPath('ScrollInOut', 'bizmodules/modules/cs/paymanagement/billcardinout/scrollInOut');
//马泽腾 IC卡调拨页面
Scdp.Loader.setPath('IcCardDeploy', 'bizmodules/modules/cs/paymanagement/billcardinout/icCardDeploy');
//马泽腾 扎帐页面
Scdp.Loader.setPath('TicketCheck', 'bizmodules/modules/cs/paymanagement/billcardcheck/ticketCheck');
//马泽腾 IC卡赔偿款扎帐页面
Scdp.Loader.setPath('IcTicketCheck', 'bizmodules/modules/cs/paymanagement/billcardcheck/icticketcheck');

//罗婷婷 收费任务定义
Scdp.Loader.setPath('chargetaskdefine', 'bizmodules/modules/cs/paymanagement/chargetaskmanage/chargetaskdefine');
//罗婷婷 收费任务统计分析
Scdp.Loader.setPath('ChargeTaskAnalysis', 'bizmodules/modules/cs/paymanagement/chargetaskmanage/chargetaskanalysis');
//罗婷婷 收费员当班工作记录单填报
Scdp.Loader.setPath('TollWorkReported', 'bizmodules/modules/cs/paymanagement/tollWorkReported/tollworkreported');

//马春光 收费站车道收入统计图表
Scdp.Loader.setPath('laneincome', 'bizmodules/modules/cs/paymanagement/paystaticreport/income');

//马春光 收费站清分收入统计图表
Scdp.Loader.setPath('clearincome', 'bizmodules/modules/cs/paymanagement/paystaticreport/income');


//马春光 路段清分收入统计图表1
Scdp.Loader.setPath('clearroadincome', 'bizmodules/modules/cs/paymanagement/paystaticreport/income');


//马春光 收 费 站 道 口 减 免 车 金 额（图表）
Scdp.Loader.setPath('lanederateinconme', 'bizmodules/modules/cs/paymanagement/paystaticreport/decreate');//只需要记录到文件夹下即可


//马春光 收 费 站 道 口 减 免 车 流量 出口（图表）
Scdp.Loader.setPath('stationderateflow', 'bizmodules/modules/cs/paymanagement/paystaticreport/decreate');//只需要记录到文件夹下即可


//马春光 路 段 清 分 减 免 车 金 额（图表）
Scdp.Loader.setPath('roadclearderateinconme', 'bizmodules/modules/cs/paymanagement/paystaticreport/decreate');//只需要记录到文件夹下即可


//马春光 收 费 站 清 分 减 免 车 金 额（图表）
Scdp.Loader.setPath('stationclearderateinconme', 'bizmodules/modules/cs/paymanagement/paystaticreport/decreate');//只需要记录到文件夹下即可

//马春光 收费站进、出站道口车流量报表
Scdp.Loader.setPath('stationinletoutletflow', 'bizmodules/modules/cs/paymanagement/paystaticreport/flow');


//马春光 收费站MTC进、出站道口客车类型车流量报表
Scdp.Loader.setPath('stationMTCinletoutletflow', 'bizmodules/modules/cs/paymanagement/paystaticreport/flow');


//马春光 收费站ETC进、出站道口客车类型车流量报表
Scdp.Loader.setPath('stationETCinletoutletflow', 'bizmodules/modules/cs/paymanagement/paystaticreport/flow');


//马春光 收费站MTC进、出站道口货车类型车流量报表
Scdp.Loader.setPath('stationtruckMTCinletoutletflow', 'bizmodules/modules/cs/paymanagement/paystaticreport/flow');


//马春光 收费站ETC进、出站道口货车类型车流量报表
Scdp.Loader.setPath('stationtruckETCinletoutletflow', 'bizmodules/modules/cs/paymanagement/paystaticreport/flow');


//马春光 收 费 站 系 统 内 堵 漏 增 收 金 额 报 表
Scdp.Loader.setPath('stationtollincome', 'bizmodules/modules/cs/paymanagement/paystaticreport/increaseincome');


//马春光 收 费 站 系 统 内 堵 漏 增 收 金 额 报 表
Scdp.Loader.setPath('roadtollincome', 'bizmodules/modules/cs/paymanagement/paystaticreport/increaseincome');


//马春光 路段工作车卡登记管理
Scdp.Loader.setPath('roadworkcardregistmanage', 'bizmodules/modules/cs/paymanagement/roadworkcardregistmanage/roadworkcardregistmanage');


//马春光 管理身份类卡片管理
Scdp.Loader.setPath('mcardsmanage', 'bizmodules/modules/cs/paymanagement/cardsmangage/mcardsmanage');

Scdp.Loader.setPath('PayFinereport', 'bizmodules/modules/cs/paymanagement/payfinereport');
Scdp.Loader.setPath('cardCirculationQuery', 'bizmodules/modules/cs/paymanagement/cardsmangage/cardcirculationquery');

//罗婷婷 路公司IC通行卡扎帐
Scdp.Loader.setPath('RoadIcCardVerification', 'bizmodules/modules/cs/paymanagement/billcardcheck/iccardcheck');
//罗婷婷 收费站IC通行卡扎帐
Scdp.Loader.setPath('StationIcCardVerification', 'bizmodules/modules/cs/paymanagement/billcardcheck/iccardcheck');
//罗婷婷 管理处IC通行卡扎帐
Scdp.Loader.setPath('AdminIcCardVerification', 'bizmodules/modules/cs/paymanagement/billcardcheck/iccardcheck');
//罗婷婷 IC卡赔偿款登记
Scdp.Loader.setPath('IcCardAmendRegister', 'bizmodules/modules/cs/paymanagement/icticketreport');
//付尧 收费站车道管理
Scdp.Loader.setPath('LaneManagement', 'bizmodules/modules/cs/paymanagement/lanemanagement');

//刘力菲 应急录入
Scdp.Loader.setPath('AddEmergency', 'bizmodules/modules/cs/paymanagement/emergency/addemergency');
//刘力菲 应急查询
Scdp.Loader.setPath('QueryEmergency', 'bizmodules/modules/cs/paymanagement/emergency/queryemergency');

//王令 培训信息查询
Scdp.Loader.setPath('Planselect', 'bizmodules/modules/cs/interior/trainplan/plantselect');
//王令 落实培训信息查询
Scdp.Loader.setPath('DoPlanselect', 'bizmodules/modules/cs/interior/trainplan/plantselect');
//罗婷婷 川高排班模式设置
Scdp.Loader.setPath('CgSetshift', 'bizmodules/modules/cs/tollstaff/attendance/shiftmanage');
//罗婷婷 收费站排班设置
Scdp.Loader.setPath('StationSetShift', 'bizmodules/modules/cs/tollstaff/attendance/shiftmanage');
//罗婷婷 在用服装信息查询
Scdp.Loader.setPath('InuseClothesQuery', 'bizmodules/modules/cs/tollstaff/clothes/emclothes');
//马泽腾 组织机构展示界面 收费站
Scdp.Loader.setPath('OrgmaintStation', 'bizmodules/modules/cs/orgbaseinfo/orgmaint/orgmaintstation');
//马泽腾 组织机构展示界面 管理处
Scdp.Loader.setPath('OrgmaintManagement', 'bizmodules/modules/cs/orgbaseinfo/orgmaint/orgmaintmanagement');
//罗婷婷 组织机构展示界面 路公司
Scdp.Loader.setPath('Orgmaint', 'bizmodules/modules/cs/orgbaseinfo/orgmaint/orgmaint');
//罗婷婷 组织机构展示界面 川高公司
Scdp.Loader.setPath('CgOrgmaint', 'bizmodules/modules/cs/orgbaseinfo/orgmaint/cgorgmaint');


//王令 人员信息调度
Scdp.Loader.setPath('MoveUserInfo', 'bizmodules/modules/cs/tollstaff/userinfo');

//刘力菲 访问统计
Scdp.Loader.setPath('VisitStatistics', 'bizmodules/modules/cs/basedata/visitstatistics');
//杜万江 操作历史记录查询
Scdp.Loader.setPath('OptHistory', 'bizmodules/modules/cs/paymanagement/opthistory');
//杜万江 个人信息展示界面
Scdp.Loader.setPath('UserInfo', 'bizmodules/modules/cs/basedata/userinfo');
//罗婷婷 人员服装尺寸信息管理
Scdp.Loader.setPath('ClothesSize', 'bizmodules/modules/cs/tollstaff/clothes/clothessize');
//罗婷婷 卡票券扎帐
Scdp.Loader.setPath('billCardCheck', 'bizmodules/modules/cs/paymanagement/billcardcheck/billcardcheck');
//付尧 收费站长短款查询
Scdp.Loader.setPath('longshortAnaysis', 'bizmodules/modules/cs/paymanagement/longshortanaysis');
//付尧 IC卡赔偿款调配
Scdp.Loader.setPath('icticketinout', 'bizmodules/modules/cs/paymanagement/billcardinout/icticketinout');
//罗婷婷 考勤管理顶班登记
Scdp.Loader.setPath('ReplaceShiftRegister', 'bizmodules/modules/cs/tollstaff/attendance/adjustshift');
//马泽腾 绿通档案管理
Scdp.Loader.setPath('ArchivesManagement', 'bizmodules/modules/cs/greenpassmanagement/archivesmanagement');
Scdp.Loader.setPath('ArchivesCheck', 'bizmodules/modules/cs/greenpassmanagement/archivescheck');
// //马泽腾 绿通车统计
// Scdp.Loader.setPath('GreenPassAnalysis', 'bizmodules/modules/cs/greenpassmanagement/greenpassanalysis');
//马泽腾 货物分类管理
Scdp.Loader.setPath('GoodsClassificationManage', 'bizmodules/modules/cs/greenpassmanagement/goodsclassificationmanage');
//付尧 收费业务初始数据录入
Scdp.Loader.setPath('Initial', 'bizmodules/modules/cs/paymanagement/initial');
//付尧 票据损溢稽核
Scdp.Loader.setPath('ticketLose', 'bizmodules/modules/cs/paymanagement/ticketlose');

/******************************************************资产经营*****************************************************************/

//马泽腾 录入车辆相关数据
Scdp.Loader.setPath('AddVehicleInfo', 'bizmodules/modules/am/vehiclemanagement/vehicleinfomanage/addvehicleinfo');
//马泽腾 查询车辆相关数据
Scdp.Loader.setPath('QueryVehicleInfo', 'bizmodules/modules/am/vehiclemanagement/vehicleinfomanage/queryvehicleinfo');
//马泽腾 车辆详情页面
Scdp.Loader.setPath('VehicleDetailInfo', 'bizmodules/modules/am/vehiclemanagement/vehicleinfomanage/vehicledetailinfo');
//马泽腾 车辆借出管理
Scdp.Loader.setPath('VehicleLendingManage', 'bizmodules/modules/am/vehiclemanagement/vehiclestatemanage/vehiclelendingmanage');
//马泽腾 车辆归还管理
Scdp.Loader.setPath('VehicleReturnManage', 'bizmodules/modules/am/vehiclemanagement/vehiclestatemanage/vehiclereturnmanage');
//马泽腾 查询车辆变动信息
Scdp.Loader.setPath('QueryVehicleChangeInfo', 'bizmodules/modules/am/vehiclemanagement/vehiclechangeinfomanage/queryvehiclechangeinfo');
//马泽腾 录入车辆变动信息
Scdp.Loader.setPath('AddVehicleChangeInfo', 'bizmodules/modules/am/vehiclemanagement/vehiclechangeinfomanage/addvehiclechangeinfo');

//马泽腾 车辆统计管理
Scdp.Loader.setPath('VehicleCountManage', 'bizmodules/modules/am/vehiclemanagement/vehiclecountmanage');
//马泽腾 车辆统计管理
Scdp.Loader.setPath('VehicleCountManage', 'bizmodules/modules/am/vehiclemanagement/vehiclecountmanage');

//谭根源 录入房屋相关数据
Scdp.Loader.setPath('AddBuildingsInfo', 'bizmodules/modules/am/buildingsassetmanage/buildingsinfomanage/addbuildingsinfo');
//谭根源 查询房屋相关数据
Scdp.Loader.setPath('QueryBuildingsInfo', 'bizmodules/modules/am/buildingsassetmanage/buildingsinfomanage/querybuildingsinfo');

//谭根源 录入高速公路相关数据
Scdp.Loader.setPath('AddHighwayInfo', 'bizmodules/modules/am/highwayassetmanage/highwayassetinfomanage/addhighwayinfo');
//谭根源 查询高速公路相关数据
Scdp.Loader.setPath('QueryHighwayInfo', 'bizmodules/modules/am/highwayassetmanage/highwayassetinfomanage/queryhighwayinfo');

//马泽腾 录入机器机械设备信息
Scdp.Loader.setPath('AddMechanicalEquipment', 'bizmodules/modules/am/mechanicalequipmentmanage/addmechanicalequipment');
//马泽腾 查询机器机械设备信息
Scdp.Loader.setPath('QueryMechanicalEquipment', 'bizmodules/modules/am/mechanicalequipmentmanage/querymechanicalequipment');

//马泽腾 录入土地相关信息
Scdp.Loader.setPath('AddLandInfo', 'bizmodules/modules/am/landmanagement/addlandinfo');
//马泽腾 查询土地相关信息
Scdp.Loader.setPath('QueryLandInfo', 'bizmodules/modules/am/landmanagement/querylandinfo');

//马泽腾 录入金融资产相关数据
Scdp.Loader.setPath('AddFinancialAssetsInfo', 'bizmodules/modules/am/financialassetsmanage/financialassetsinfomanage/addfinancialassetsinfo');
//马泽腾 查询金融资产相关数据
Scdp.Loader.setPath('QueryFinancialAssetsInfo', 'bizmodules/modules/am/financialassetsmanage/financialassetsinfomanage/queryfinancialassetsinfo');

/******************************************************资产经营*****************************************************************/
//付尧 问题反馈
Scdp.Loader.setPath('FeedbackIdeas', 'bizmodules/modules/cs/feedback');
//马泽腾 查询问题反馈
Scdp.Loader.setPath('QueryFeedBack', 'bizmodules/modules/sys/usercenter/feedback');
//票据冠名管理
Scdp.Loader.setPath('ticketrode', 'bizmodules/modules/cs/paymanagement/ticketrode');
//绿通业务报表
Scdp.Loader.setPath('greenpassreport', 'bizmodules/modules/cs/greenpassmanagement/greenpassreport');
//马泽腾 绿通车历史信息查询
Scdp.Loader.setPath('QueryGreenPassHistory', 'bizmodules/modules/cs/greenpassmanagement/querygreenpasshistory');
//马泽腾 faq发布
Scdp.Loader.setPath('FAQPublish', 'bizmodules/modules/sys/faq/faqpublish');
//马泽腾 faq查询
Scdp.Loader.setPath('FAQContentSearch', 'bizmodules/modules/sys/faq/faqcontentsearch');
//马泽腾 绿通车货物来向统计分析
Scdp.Loader.setPath('GoodsComeToAnalysis', 'bizmodules/modules/cs/greenpassmanagement/greenpassanalysis/goodscometoanalysis');
//马泽腾 绿通车流量来向统计分析
Scdp.Loader.setPath('GPFlowDirectionAnalysis', 'bizmodules/modules/cs/greenpassmanagement/greenpassanalysis/gpflowdirectionanalysis');
//付尧 清分收入任务完成情况统计分析
Scdp.Loader.setPath('taskAnaysis', 'bizmodules/modules/cs/paymanagement/incomeanaysis');
//付尧 巡查记录查询
Scdp.Loader.setPath('reviewSearch', 'bizmodules/modules/cs/paymanagement/dailyreview/reviewsearch');
//付尧 终端设备管理
Scdp.Loader.setPath('appaccessManage', 'bizmodules/modules/sys/appaccess');
//mcg 路公司年收费任务定义
Scdp.Loader.setPath('RoadYearChargeTaskDefine', 'bizmodules/modules/cs/paymanagement/roadchargetaskmanage/roadyearchargetaskdefine');

//mcg 路公司年收费任务定义
Scdp.Loader.setPath('RoadTaskToStation', 'bizmodules/modules/cs/paymanagement/roadchargetaskmanage/roadyearchargetaskdefine');


//mcg 路公司年收费任务定义
Scdp.Loader.setPath('MnagementChargeTask', 'bizmodules/modules/cs/paymanagement/roadchargetaskmanage/managementchargetask');
//马春光 收费任务分析
Scdp.Loader.setPath('Chargetaskanalysis', 'bizmodules/modules/cs/paymanagement/roadchargetaskmanage/chargetaskanalysis');
//马春光 收费任务分析
Scdp.Loader.setPath('Managechargetaskanalysis', 'bizmodules/modules/cs/paymanagement/roadchargetaskmanage/chargetaskanalysis');


//马春光 收费任务记录查看
Scdp.Loader.setPath('Chargetasklist', 'bizmodules/modules/cs/paymanagement/roadchargetaskmanage/chargetasklist');


//马春光 收费任务完成录入
Scdp.Loader.setPath('Chargetaskcompin', 'bizmodules/modules/cs/paymanagement/roadchargetaskmanage/chargetaskcompin');


//马春光 收费任务确认
Scdp.Loader.setPath('Chargtaskmakesure', 'bizmodules/modules/cs/paymanagement/roadchargetaskmanage/chargtaskmakesure');


//马春光 收费任务分析 收费站
Scdp.Loader.setPath('Stationchargetaskanalysis', 'bizmodules/modules/cs/paymanagement/roadchargetaskmanage/chargetaskanalysis');

//马泽腾 日常巡查查询
Scdp.Loader.setPath('DailyInspectionQuery', 'bizmodules/modules/cs/paymanagement/dailyinspectionmanagement');

//用户权限管理
Scdp.Loader.setPath('UserRole', 'bizmodules/modules/sys/userrole');
