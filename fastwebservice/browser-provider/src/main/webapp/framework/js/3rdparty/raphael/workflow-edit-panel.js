(function ($) {
    var myflow = $.myflow;
    var props = {
        text: {
            name: 'text', label: '显示文字', value: '', type:'text', editor: function () {
                return new myflow.editors.textEditor();
            }
        },
        textX: {
            name: ['textX',"textY"], label: '文字X/Y轴', value: '', type:'number', editor: function () {
                return new myflow.editors.textEditor();
            }
        },
        //textY: {
        //    name: 'textY', label: '文字Y轴', value: '', type:'number', editor: function () {
        //        return new myflow.editors.textEditor();
        //    }
        //},
        textFontSize: {
            name: 'textFontSize', label: '文字大小', value: '', type:'number', scope:'&global', editor: function () {
                return new myflow.editors.textEditor();
            }
        },

        stroke: {
            name: 'stroke', label: '边框颜色', value: '', type:'color',scope:'&global', editor: function () {
                return new myflow.editors.textEditor();
            }
        },
        'stroke-width': {
            name: 'stroke-width', label: '边框宽度', value: '1', type:'number', scope:'&global', editor: function () {
                return new myflow.editors.textEditor();
            }
        },
        fill: {
            name: 'fill', label: '填充颜色', value: '', type:'color',scope:'&global', editor: function () {
                return new myflow.editors.textEditor();
            }
        },
        width: {
            name: ['width','height'], label: '宽度/高度', value: '', type:'number', editor: function () {
                return new myflow.editors.textEditor();
            }
        },
        //height: {
        //    name: 'height', label: '高度', value: '', type:'number', editor: function () {
        //        return new myflow.editors.textEditor();
        //    }
        //},
        img: {
            name: 'img', label: '图片路径', value: '', type: 'text', editor: function () {
                return new myflow.editors.textEditor();
            }
        },
        imgWidth: {
            name:[ 'imgWidth','imgHeight'], label: '图片宽度/高度', value: '', type: 'number', editor: function () {
                return new myflow.editors.textEditor();
            }
        },
        //imgHeight: {
        //    name: 'imgHeight', label: '图片高度', value: '', type: 'number', editor: function () {
        //    return new myflow.editors.textEditor();
        //    }
        //},
        imgX: {
            name: ['imgX','imgY'], label: '图片X轴/Y轴', value: '', type: 'number', editor: function () {
                return new myflow.editors.textEditor();
            }
        },
        //imgY: {
        //    name: 'imgY', label: '图片Y轴', value: '', type: 'number', editor: function () {
        //        return new myflow.editors.textEditor();
        //    }
        //},
        cursorColor:{
            name: 'cursorColor', label: '鼠标悬浮颜色', value: '', type: 'color', scope:'global', editor: function () {
                return new myflow.editors.textEditor();
            }
        },
        pastColor:{
            name: 'historyColor', label: '已走过的节点和线的颜色', value: '', type: 'color', scope:'global', editor: function () {
                return new myflow.editors.textEditor();
            }
        }
    }
    $.extend(true, myflow.config.rect, {
        attr: {
            r: 8,
            fill: '#F6F7FF',
            stroke: '#03689A',
            "stroke-width": 2
        }
    });
    var pathProps = {
        stroke: {
            name: 'stroke', label: '线条颜色', value: '', type: 'color', scope: 'path&global', editor: function () {
                return new myflow.editors.textEditor();
            }
        },
        title: {
            name: 'title', label: '提示内容', value: '', type: 'text', scope: 'path', editor: function () {
                return new myflow.editors.textEditor();
            }
        },
        'stroke-width': {
            name: 'stroke-width',
            label: '线条宽度',
            value: '',
            type: 'number',
            scope: 'path&global',
            editor: function () {
                return new myflow.editors.textEditor();
            }
        },
        cursorColor: {
            name: 'cursorColor',
            label: '鼠标悬浮颜色',
            value: '',
            type: 'color',
            scope: 'global',
            editor: function () {
                return new myflow.editors.textEditor();
            }
        }
    };
    $.extend(true, myflow.config.props.props, props);
    $.extend(true, myflow.config.path.props, pathProps);


    $.extend(true, myflow.config.tools.states, {
        start: {
            // showType: 'text',
            type: 'start',
            name: {text: ''},
            text: {text: ''},
            img: {src: '', width: 0, height: 0},
            attr: {width: 50, heigth: 50},
            props: props
        },
        end: {
            // showType: 'text',
            type: 'end',
            name: {text: ''},
            text: {text: ''},
            img: {src: '', width: 0, height: 0},
            attr: {width: 0, heigth: 0},
            props: props
        },
        'end-cancel': {
            // showType: 'image',
            type: 'end-cancel',
            name: {text: ''},
            text: {text: ''},
            img: {src: '', width: 0, height: 0},
            attr: {width: 50, heigth: 50},
            props: props
        },
        'end-error': {
            showType: 'text',
            type: 'end-error',
            name: {text: ''},
            text: {text: '', "font-size": 30},
            img: {src: '', width: 0, height: 0},
            attr: {width: 25, heigth: 25},
            props: props
        },
        state: {
            //showType: 'text',
            type: 'state',
            name: {text: ''},
            text: {text: ''},
            img: {src: '', width: 0, height: 0},
            props: props
        },
        fork: {
            //showType: 'text',
            type: 'fork',
            name: {text: ''},
            text: {text: '', "font-size": 30},
            img: {src: '', width: 0, height: 0},
            attr: {width: 25, heigth: 25},
            props: props
        },
        join: {
            //showType: 'text',
            type: 'join',
            name: {text: ''},
            text: {text: '', "font-size": 30},
            img: {src: '', width: 0, height: 0},
            attr: {width: 25, heigth: 25},
            props: props
        },
        task: {
            //showType: 'text',
            type: 'task',
            name: {text: ''},
            text: {text: ''},
            img: {src: '', width: 0, height: 0},
            props: props
        }
    });
})(jQuery);