var Namespace = new Object();

Namespace.register = function(path){
    var arr = path.split(".");
    var ns = "";
    for(var i=0;i<arr.length;i++){
        if(i>0) ns += ".";
        ns += arr[i];
        eval("if(typeof(" + ns + ") == 'undefined') " + ns + " = new Object();");
    }
}
Namespace.register("Scdp");
Namespace.register("Scdp.Const");
Namespace.register("Scdp.ObjUtil");
Namespace.register("Scdp.MathUtil");
Namespace.register("Scdp.DateUtil");
Namespace.register("Scdp.CookieUtil");
Namespace.register("Scdp.CacheUtil");
Namespace.register("Scdp.CommUtil");
Namespace.register("Scdp.DebugUtil");
Namespace.register("Scdp.CryptUtil");
Namespace.register("Scdp.StrUtil");
Namespace.register("Scdp.ArrayUtil");
Namespace.register("Scdp.I18N");
Namespace.register("Scdp.Utils");
Namespace.register("Scdp.Msg");
Namespace.register("Scdp.WorkFlow");
Namespace.register("Scdp.RSA");
Namespace.register("Scdp.RSA.ServerKey");
Namespace.register("Scdp.RSA.ClientKey");
Namespace.register("Scdp.MsgUtil");
Namespace.register("Scdp.TreeUtil");

Scdp.Const.PACKAGE_VERSION = 1;
Scdp.Const.SHORT_DATE_FORMAT = 1;
Scdp.Const.LONG_DATE_FORMAT = 2;
Scdp.Const.BUSINESS_DATE_FORMAT = 3;
//
Scdp.Const.AJAX_TIMEOUT = 300000;
//
Scdp.Const.MSGBOX_DEFAULT_WIDTH = 350;
Scdp.Const.MSGBOX_DEFAULT_HEIGHT = 150;
//
Scdp.Const.FORM_FIELD_LABEL_DEFAULT_WIDTH = 100;
Scdp.Const.FORM_FIELD_LABEL_ALIGN = 'left';
//
Scdp.Const.JDEC_DEFAULT_DECIMAL_LENGTH = 2;
//
Scdp.Const.IFIELD_READONLY_STYLE = false;
//
Scdp.Const.CONTENT_PANEL_MIN_WIDTH = 880;
Scdp.Const.CONTENT_PANEL_MIN_HEIGHT = 530;
//
Scdp.Const.IFIELD_READONLY_STYLE = false;
//
Scdp.Const.CACHE_TYPE_COMBO_STORE = 'CACHE_TYPE_COMBO_STORE';
Scdp.Const.CACHE_TYPE_INFO_LAYOUT = 'CACHE_TYPE_INFO_LAYOUT';
Scdp.Const.CACHE_TYPE_SYS_MENU = 'CACHE_TYPE_SYS_MENU';
Scdp.Const.CACHE_CODEGENE_TABLES = 'CACHE_CODEGENE_TABLES';
Scdp.Const.CACHE_CRUD_TREE_ACTION = 'CACHE_CRUD_TREE_ACTION';
Scdp.Const.CACHE_JQGRID_COLUMN_DEF = 'CACHE_JQGRID_COLUMN_DEF';
Scdp.Const.CACHE_MODULE_VIEW_HISTORY = 'CACHE_MODULE_VIEW_HISTORY';
Scdp.Const.CACHE_MODULE_TAB = 'CACHE_MODULE_TAB';
Scdp.Const.CACHE_ACTIVE_MODULE = 'CACHE_ACTIVE_MODULE';
Scdp.Const.CACHE_ACTIVE_MODULE_KEY = 'ACTIVE_MODULE';

Scdp.Const.JSON_ACTION = 'controller/json.action';
Scdp.Const.POST_ACTION = 'controller/post.action';
Scdp.Const.FREEMARKER_LOAD_PAGE = 'controller/loadpage.action';
Scdp.Const.COMMON_LOADPAGE = 'common-loadpage';

Scdp.Const.LANGUAGE_ID_STORE_DATA = [
    {code: 'en_US', codedesc: 'English'},
    {code: 'zh_CN', codedesc: '中文'}
];

Scdp.Const.SYSTEM_LANGUAGE_ID = 'SYSTEM_LANGUAGE_ID';
Scdp.Const.MAXIMUM_MAINFRAME = 'MAXIMUM_MAINFRAME';
Scdp.Const.LOGIN_TIME_MILLIS = 'LOGIN_TIME_MILLIS';

Scdp.Const.USER_ID = 'userId';
Scdp.Const.USER_UUID = 'userUuid';
Scdp.Const.USER_NAME = 'userName';
Scdp.Const.USER_NEED_MODIFY_PASS = 'userNeedModifyPass';
Scdp.Const.USER_LOCALE_ID = 'localeId';
Scdp.Const.USER_COMPANY_UUID = 'companyUuid';
Scdp.Const.USER_COMPANY_CODE = 'companyCode';
Scdp.Const.USER_COMPANY_NAME = 'companyName';
Scdp.Const.USER_DEPARTMENT_UUID = 'departmentUuid';
Scdp.Const.USER_DEPARTMENT_CODE = 'departmentCode';
Scdp.Const.USER_DEPARTMENT_NAME = 'departmentName';
Scdp.Const.USER_COUNTRY_CODE = 'countryCode';
Scdp.Const.USER_CITY_CODE = 'cityCode';
Scdp.Const.USER_CURRENCY_CODE = 'currencyCode';
Scdp.Const.USER_WEEK_START = 'weekStart';
Scdp.Const.USER_DECIMAL_SEPARATOR = 'decimalSeparator';
Scdp.Const.USER_THOUSAND_SEPARATOR = 'thousandSeparator';

Scdp.Const.USER_PRIVILEGES = 'userPrivileges';
Scdp.Const.USER_TOKEN = 'userToken';

Scdp.Const.USER_SYSTEM_TITLE = 'systemTitle';
Scdp.Const.USER_SYSTEM_LOGO = 'systemLogo';
Scdp.Const.USER_ISADMIN = 'isAdmin';
Scdp.Const.USER_EXPAND = 'userExpand';
Scdp.Const.USER_DATA_ARRAY = [
    Scdp.Const.USER_ID,
    Scdp.Const.USER_UUID,
    Scdp.Const.USER_NAME,
    Scdp.Const.USER_NEED_MODIFY_PASS,
    Scdp.Const.USER_TOKEN,
    Scdp.Const.USER_COMPANY_UUID,
    Scdp.Const.USER_COMPANY_CODE,
    Scdp.Const.USER_COMPANY_NAME,
    Scdp.Const.USER_DEPARTMENT_UUID,
    Scdp.Const.USER_DEPARTMENT_CODE,
    Scdp.Const.USER_DEPARTMENT_NAME,
    Scdp.Const.USER_PRIVILEGES,
    Scdp.Const.USER_COUNTRY_CODE,
    Scdp.Const.USER_CITY_CODE,
    Scdp.Const.USER_CURRENCY_CODE,
    Scdp.Const.USER_WEEK_START,
    Scdp.Const.USER_DECIMAL_SEPARATOR,
    Scdp.Const.USER_THOUSAND_SEPARATOR,
    Scdp.Const.USER_ISADMIN,
    Scdp.Const.USER_EXPAND
];
Scdp.Const.USER_INFO_KEYS =Scdp.Const.USER_DATA_ARRAY.concat([
    Scdp.Const.CACHE_TYPE_SYS_MENU,
    Scdp.Const.USER_SYSTEM_TITLE,
    Scdp.Const.USER_SYSTEM_LOGO
]);

Scdp.Const.VERIFY_TYPE_MOBILE = 'mobile';
Scdp.Const.VERIFY_TYPE_MAIL = 'mail';


/*-------------------------------------------------------------------*/
/*-------------------------------------------------------------------*/
/*-------------------------------------------------------------------*/

//
Scdp.Const.QUERY_CONDITION_HISTORY_CACHE_SIZE = 10;
//
Scdp.Const.MAX_ALLOWED_OPEN_MODULES = 10;

//
Scdp.Const.UI_INFO_STATUS_NEW = 'NEW';
Scdp.Const.UI_INFO_STATUS_MODIFY = 'MODIFY';
Scdp.Const.UI_INFO_STATUS_VIEW = 'VIEW';
Scdp.Const.UI_INFO_STATUS_NULL = 'NULL';
//
Scdp.Const.EVERY_PAGE_RECORDS = 'EVERY_PAGE_RECORDS';


Scdp.Const.GRID_EVERY_PAGE_SHOW_RECORDS_DEFAULT = 20;
Scdp.Const.COMMON_QUERY_IGNORECASE_DEFAULT = false;
Scdp.Const.COMMON_QUERY_MULTISORT_DEFAULT = false;
Scdp.Const.COMMON_QUERY_LOCAL_SORT_DEFAULT = true;

Scdp.Const.LOGIN_COMPANY_CACHE = 'LOGIN_COMPANY_CACHE';
Scdp.Const.LOGIN_USER_CACHE = 'LOGIN_USER_CACHE';
Scdp.Const.LOGIN_PASSWORD_CACHE = 'LOGIN_PASSWORD_CACHE';
Scdp.Const.LOGIN_COMPANY_CACHE_CHECK = 'LOGIN_COMPANY_CACHE_CHECK';
Scdp.Const.LOGIN_USER_CACHE_CHECK = 'LOGIN_USER_CACHE_CHECK';
Scdp.Const.LOGIN_PASSWORD_CACHE_CHECK = 'LOGIN_PASSWORD_CACHE_CHECK';
Scdp.Const.LOGIN_RSA_STORE_KEY_CACHE = 'LOGIN_RSA_KEY_PAIR_CACHE';
Scdp.Const.FUZZY_QUERY_TERM_CACHE = 'FUZZY_QUERY_TERM_CACHE';
Scdp.Const.COMMON_QUERY_IGNORE_CASE_CACHE = 'COMMON_QUERY_IGNORE_CASE_CACHE';
Scdp.Const.COMMON_QUERY_MULTI_SORT_CACHE = 'COMMON_QUERY_MULTI_SORT_CACHE';
Scdp.Const.COMMON_QUERY_PAGE_SIZE_CACHE = 'COMMON_QUERY_PAGE_SIZE_CACHE';
Scdp.Const.COMMON_QUERY_RESULT_COLUMN_CACHE = 'COMMON_QUERY_RESULT_COLUMN_CACHE';
Scdp.Const.COMMON_QUERY_RESULT_COLUMN_DEFAULT_SORT_CACHE = 'COMMON_QUERY_RESULT_COLUMN_DEFAULT_SORT_CACHE';
Scdp.Const.COMMON_QUERY_EXCEL_EXPORT_CACHE = 'COMMON_QUERY_EXCEL_EXPORT_CACHE';
Scdp.Const.COMMON_QUERY_PAGE_DESIGN_CLASS_NAME_CACHE = 'COMMON_QUERY_PAGE_DESIGN_CLASS_NAME_CACHE';
Scdp.Const.COMMON_MAINFRAME_ACCORDING_DEFAULT_CACHE = 'COMMON_MAINFRAME_ACCORDING_DEFAULT_CACHE';
Scdp.Const.NAVIGATION_BAR_DEFAULT_WIDTH_CACHE = 'NAVIGATION_BAR_DEFAULT_WIDTH_CACHE';
Scdp.Const.BUILD_ID_CACHE = 'BUILD_ID_CACHE';
Scdp.Const.NAVIGATION_BAR_DEFAULT_COLLAPSE = false;
Scdp.Const.EDIT_PANEL_DEFAUL_HEIGHT = 'EDIT_PANEL_DEFAUL_HEIGHT';

Scdp.Const.THEME_SKIN_COLOR_COOKIE = 'THEME_SKIN_COLOR_COOKIE';
//Javascript data type
Scdp.Const.DATA_TYPE_UNDEFINED = 'undefined';
Scdp.Const.DATA_TYPE_NUMBER = 'number';
Scdp.Const.DATA_TYPE_STRING = 'string';
Scdp.Const.DATA_TYPE_BOOLEAN = 'boolean';
Scdp.Const.DATA_TYPE_OBJECT = 'object';
Scdp.Const.DATA_TYPE_FUNCTION = 'function';

//Form Component Name
Scdp.Const.COMPONENT_JTEXT = 'JText';
Scdp.Const.COMPONENT_JAUTOTEXT = 'JAutoText';
Scdp.Const.COMPONENT_JTEXTAREA = 'JTextArea';
Scdp.Const.COMPONENT_JINT = 'JInt';
Scdp.Const.COMPONENT_JDEC = 'JDec';
Scdp.Const.COMPONENT_JCUR = 'JCur';
Scdp.Const.COMPONENT_JCHECK = 'JCheck';
Scdp.Const.COMPONENT_JDATE = 'JDate';
Scdp.Const.COMPONENT_JDATETIME = 'JDatetime';
Scdp.Const.COMPONENT_JTIME = 'JTime';
Scdp.Const.COMPONENT_JHIDDEN = 'JHidden';
Scdp.Const.COMPONENT_JDISPLAY = 'JDisplay';
Scdp.Const.COMPONENT_JHTML = 'JHtml';
Scdp.Const.COMPONENT_JIMG = 'JImg';
Scdp.Const.COMPONENT_JFILE = 'JFile';
Scdp.Const.COMPONENT_JTRIGGER = 'JTrigger';
Scdp.Const.COMPONENT_JCombo = 'JCombo';
Scdp.Const.COMPONENT_JCHECKGROUP = 'JCheckGroup';
Scdp.Const.COMPONENT_JRADIOGROUP = 'JRadioGroup';
Scdp.Const.QUERY_CONDITION_OPTBTN_WIDTH = 32;
Scdp.Const.QUERY_CONDITION_DEFAULT_OPT = '^';
Scdp.Const.QUERY_CONDITION_FORCE_ENABLE = false;
Scdp.Const.QUERY_CONDITION_OPERATORS = [
    {code: '~', text: Scdp.I18N.QC_OPERATOR_INCLUDE},
    {code: '!~', text: Scdp.I18N.QC_OPERATOR_NOT_INCLUDE},
    {code: '=', text: Scdp.I18N.QC_OPERATOR_EQUAL},
    {code: '!=', text: Scdp.I18N.QC_OPERATOR_NOT_EQUAL},
    {code: '^', text: Scdp.I18N.QC_OPERATOR_STARTSWITH},
    {code: '!^', text: Scdp.I18N.QC_OPERATOR_NOT_STARTSWITH},
    {code: '$', text: Scdp.I18N.QC_OPERATOR_ENDSWITH},
    {code: '!$', text: Scdp.I18N.QC_OPERATOR_NOT_ENDSWITH}
];
Scdp.Const.QC_OPT_IGNORE_XTYPES = ['JFromTo', 'JBolCombo', 'JCheck'];

Scdp.Const.COMPONENT_JBUTTON = 'JButton';
//container
Scdp.Const.CONTAINER_JPANEL = 'JPanel';
Scdp.Const.CONTAINER_JFIELDSET = 'JFieldSet';
Scdp.Const.CONTAINER_JFORM = 'JForm';
Scdp.Const.CONTAINER_JTAB = 'JTab';
Scdp.Const.CONTAINER_JMENU = 'JMenu';
Scdp.Const.CONTAINER_JTREE = 'JTree';

Scdp.Const.REPORT_PRINT_ACTION = 'REPORT_PRINT';

Scdp.Const.DEFAULT_CRUD_FUNCTION = [
    {funcCid: 'queryPanel->queryBtn', funcCode: '', funcDesc: 'Search'},
    {funcCid: 'queryPanel->addNew1Btn', funcCode: '', funcDesc: 'Add New'},
    {funcCid: 'editPanel->addNew2Btn', funcCode: '', funcDesc: 'Add New'},
    {funcCid: 'editPanel->copyAddBtn', funcCode: '', funcDesc: 'Copy Add'},
    {funcCid: 'editPanel->modifyBtn', funcCode: '', funcDesc: 'Modify'},
    {funcCid: 'editPanel->deleteBtn', funcCode: '', funcDesc: 'Delete'},
    {funcCid: 'queryPanel->batchDelBtn', funcCode: '', funcDesc: 'Batch Delete'},
    {funcCid: 'queryPanel->exportBtn', funcCode: '', funcDesc: 'Export XLS'}
];

Scdp.Const.ENCRYPT_SALT = 'sMarT cLOud dEveLoPmEnT plAtForM';
Scdp.Const.RSA_EXPIRE_THRESHOLD = 5;

Scdp.Const.LOGIN_HIS_MARK_AB = 'LOGIN_HIS_MARK_AB';
Scdp.Const.USING_UTC = 'USING_UTC';

Scdp.Const.LOGIN_TIMEOUT_NOTIFY_TIME = 5;

Scdp.Const.QUERY_TOOLBAR_EXTBTN_LEFT_ALIGN = false;

Scdp.Const.TOTP = 'GSNT44D7Q2O72EC6';

Scdp.Const.RESTRICT_SYSADMIN = true;

Scdp.Const.LOGO_URL = 'framework/images/product/cs_logo.png';
Scdp.Const.LOGO_URL_2 = 'framework/images/mainframe/sy_logo.png';

//Scdp.MainFrameEvents = new Ext.util.Observable();
//Scdp.MainFrameEvents.addEvents('ready', 'beforeModuleOpen', 'afterLogin');

Scdp.Const.REPORT_FORM_ID_CTL_CID = 'formId';
Scdp.Const.REPORT_FORM_ATTACH_CTL_CID = 'formAttach';
Scdp.Const.REPORT_DEFAULT_PRINT_METHOD = 'pdf';
Scdp.Const.REPORT_DEFAULT_PRINT_INTERVAL = 2000;
Scdp.Const.REPORT_MAX_PREVIEW_CONCURRENT = 5;
Scdp.Const.REPORT_DEFAULT_EMAIL_FORMAT = 'PDF';
Scdp.Const.CACHE_TYPE_SCHEME = 'CACHE_TYPE_SCHEME';
Scdp.Const.SCHEME_DEFAULT_VALUE = '*';
Scdp.Const.SCHEME_DEFAULT_SUBTYPE = '*';
Scdp.Const.AUTO_RESIZE_QUERY_GRID_COLUMN = false;
Scdp.Const.AUTO_RESIZE_GRID_COLUMN = false;
Scdp.Const.AUTO_RESIZE_JGRIDFIELD_COLUMN = true;
Scdp.Const.FORM_GRID_FIELD_QUERY_DELAY = 500;


Scdp.Const.ROLE_USER_DATA_FILTER_PREFIX = 'SCDP_ROLE_DATA_FILTER_USER_';
Scdp.Const.HIDE_BATCH_DEL_BTN_IN_QUERY_PANEL = false;

Scdp.Const.NETWORK_DELAY_THRESHOLD_GOOD = 150;
Scdp.Const.NETWORK_DELAY_THRESHOLD_NORMAL = 300;

Scdp.Const.DECIMAL_SEPARATOR_PLACEHOLDER = '&|';
Scdp.Const.THOUSAND_SEPARATOR_PLACEHOLDER = '&+';
Scdp.Const.MAINPAGE_MENU_CODE = "M_SCDP_MAINPAGE";
Scdp.Const.ABSTRACT_CRUD_VIEW_1_EDITTOOLBAR_DOCKWAY = "bottom";
Scdp.Const.ABSTRACT_CRUD_VIEW_2_EDITTOOLBAR_DOCKWAY = "top";
Scdp.Const.ABSTRACT_CRUD_VIEW_3_EDITTOOLBAR_DOCKWAY = "top";

Scdp.Const.MENU_TYPE_CTL = "MENU_ITEM_CTL";
Scdp.Const.MENU_TYPE_URL = "MENU_ITEM_URL";
Scdp.Const.MENU_TYPE_DIR = "MENU_DIR";

Scdp.Const.COMMON_QUERY_ACTION = "biz-common-query"; //公共查询actionName
Scdp.Const.COMMON_ORG_TREE_ACTION = "biz-common-org-tree"; //公共所有组织机构树actionName
Scdp.Const.COMMON_OWNER_TREE_ACTION = "biz-common-owner-tree"; //公共路公司组织机构树actionName
Scdp.Const.COMMON_OWNER_LEVEL_TREE_ACTION = "biz-common-owner-level-tree"; //指定等级的公共路公司组织机构树actionName
Scdp.Const.COMMON_REPAIR_TREE_ACTION = "biz-common-repair-tree"; //公共维护单位组织机构树actionName
Scdp.Const.COMMON_MANAGE_ROAD_ACTION = "biz-common-manage-road-tree"; //指定等级的公共清分前路段组织机构树actionName
Scdp.Const.COMMON_MANAGE_ROAD_COMBOBOX_ACTION = "biz-common-manage-road-list"; //指定等级的公共清分前路段组织机构列表actionName

Scdp.Const.COMMON_MENU_QUERY_ACTION = "biz-common-menu-query"; //菜单查询actionName
Scdp.Const.WORKFLOW_QUERY_COMMENT_ACTION = "workflow-query-comment-action"; //工作流操作记录查询actionName
Scdp.Const.WORKFLOW_CANCEL_ACTION = "workflow-baseaction-cancel";          //工作流撤销actionName
Scdp.Const.WORKFLOW_LOADUSER_ACTION = "workflow-baseaction-loaduser";    //工作流加载用户actionName
Scdp.Const.WORKFLOW_REFRESH_ACTION = "workflow-baseaction-refresh";    //工作流刷新actionName
Scdp.Const.WORKFLOW_REJECT_ACTION = "workflow-baseaction-reject";    //工作流驳回actionName
Scdp.Const.WORKFLOW_SUBMIT_ACTION = "workflow-baseaction-submit";    //工作流提交actionName

Scdp.Const.dataGridHeight = 550;
Scdp.Const.dataGridPageSize = 15;
Scdp.Const.dataGridPageList = [10, 15, 20, 30, 40, 50];
Scdp.Const.EXPORT_EXCEL_FILE_NAME_PATTEN = '{module}';

Scdp.Const.ORG_TYPE_MATRIX = {
    'R': ['R', 'C'],
    'C': ['R', 'C'],
    'D': ['C', 'D', 'O'],
    'O': ['C', 'O'],
    'V': ['R', 'C', 'D', 'O']
};
Scdp.Const.ACTION_TYPE ={
    'MODIFY':0,
    'ADD':1,
    'ADD_MODIFY':2,
    'NULL':-1
}

