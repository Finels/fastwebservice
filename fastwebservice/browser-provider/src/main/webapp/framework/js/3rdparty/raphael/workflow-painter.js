(function (b) {
    var a = {};
    a.config = {
        editable: true,
        lineHeight: 15,
        basePath: "",
        rect: {
            attr: {
                id: '',
                x: 10,
                y: 10,
                width: 100,
                height: 50,
                r: 5,
                fill: "90-#fff-#C0C0C0",
                stroke: "#000",
                "stroke-width": 1

            },
            showType: "image&text",
            type: "state",
            name: {text: "state", "font-style": "italic"},
            text: {text: "状态", "font-size": 13},
            margin: 5,
            props: [],
            img: {}
        },
        path: {
            attr: {
                path: {path: "M10 10L100 100", stroke: "#BFBFBF", fill: "none", "stroke-width": 1},
                arrow: {path: "M10 10L10 10", stroke: "#BFBFBF", fill: "#BFBFBF", "stroke-width": 1, radius: 4},
                fromDot: {width: 5, height: 5, stroke: "#fff", fill: "#000", cursor: "move", "stroke-width": 1},
                toDot: {width: 5, height: 5, stroke: "#fff", fill: "#000", cursor: "move", "stroke-width": 1},
                bigDot: {width: 5, height: 5, stroke: "#fff", fill: "#000", cursor: "move", "stroke-width": 1},
                smallDot: {width: 5, height: 5, stroke: "#fff", fill: "#000", cursor: "move", "stroke-width": 1}
            },
            text: {text: "{to}", cursor: "move", background: "#000"},
            textPos: {x: -10, y: -10},
            props: {
                /*
                 text: {
                 name: "text", label: "显示", value: "", editor: function () {
                 return new a.editors.textEditor()
                 }
                 },
                 name: {
                 name: "text", label: "显示2", value: "", editor: function () {
                 return new a.editors.textEditor()
                 }
                 }*/
            }
        },
        tools: {
            attr: {left: 10, top: 10}, pointer: {}, path: {}, states: {}, save: {
                onclick: function (c) {
                    alert(c)
                }, rollback: {
                    /*onclick:function(e){
                     alert(e)
                     }*/
                }
            }
        },
        props: {attr: {top: 10, right: 30}, props: {}},
        restore: "",
        activeRects: {rects: [], rectAttr: {stroke: "#ff0000", "stroke-width": 1}},
        historyRects: {rects: [], pathAttr: {path: {stroke: "#00ff00"}, arrow: {stroke: "#00ff00", fill: "#00ff00"}}},
        boderHoverColor: '#FF8080',
        changeHistoryColor: null,
        changeBoderHoverColor: null,
        historyColor: 'red'
    };
    a.util = {
        formatText: function (ele, text) {
            var textBr = text.split('<br>');
            if (text && text != '' && textBr.length > 1) {
                var
                    texts = '',
                    x = ele.attr('x'),
                    y = Number(ele.attr('y')) - ( (textBr.length - 1) * 15);
                //改变文字排版
                b.each(textBr, function (i, v) {

                    if (v.length > 0) {
                        if (i == 0) {
                            texts += '<tspan x="' + x + '" y="' + y + '" dy="15" >' + v + '</tspan>';
                        } else {
                            texts += '<tspan x="' + x + '"   dy="15" >' + v + '</tspan>';
                        }
                    }
                });

                if (texts) {
                    b(ele[0]).html(texts);
                }
            }
        },
        isLine: function (g, f, e) {
            var d, c;
            if ((g.x - e.x) == 0) {
                d = 1
            } else {
                d = (g.y - e.y) / (g.x - e.x)
            }
            c = (f.x - e.x) * d + e.y;
            if ((f.y - c) < 10 && (f.y - c) > -10) {
                f.y = c;
                return true
            }
            return false
        }, center: function (d, c) {
            return {x: (d.x - c.x) / 2 + c.x, y: (d.y - c.y) / 2 + c.y}
        }, nextId: (function () {
            var c = 0;
            return function () {
                return ++c
            }
        })(), connPoint: function (j, d) {
            var c = d, e = {x: j.x + j.width / 2, y: j.y + j.height / 2};
            var l = (e.y - c.y) / (e.x - c.x);
            l = isNaN(l) ? 0 : l;
            var k = j.height / j.width;
            var h = c.y < e.y ? -1 : 1, f = c.x < e.x ? -1 : 1, g, i;
            if (Math.abs(l) > k && h == -1) {
                g = e.y - j.height / 2;
                i = e.x + h * j.height / 2 / l
            } else {
                if (Math.abs(l) > k && h == 1) {
                    g = e.y + j.height / 2;
                    i = e.x + h * j.height / 2 / l
                } else {
                    if (Math.abs(l) < k && f == -1) {
                        g = e.y + f * j.width / 2 * l;
                        i = e.x - j.width / 2
                    } else {
                        if (Math.abs(l) < k && f == 1) {
                            g = e.y + j.width / 2 * l;
                            i = e.x + j.width / 2
                        }
                    }
                }
            }
            return {x: i, y: g}
        }, arrow: function (l, k, d) {
            var g = Math.atan2(l.y - k.y, k.x - l.x) * (180 / Math.PI);
            var h = k.x - d * Math.cos(g * (Math.PI / 180));
            var f = k.y + d * Math.sin(g * (Math.PI / 180));
            var e = h + d * Math.cos((g + 120) * (Math.PI / 180));
            var j = f - d * Math.sin((g + 120) * (Math.PI / 180));
            var c = h + d * Math.cos((g + 240) * (Math.PI / 180));
            var i = f - d * Math.sin((g + 240) * (Math.PI / 180));
            return [k, {x: e, y: j}, {x: c, y: i}]
        }
    };
    function getprevElement(ele, scope) {
        //获取 rect
        if (scope != 'path' && ele) {
            if (ele.tagName && ele.tagName == 'rect') {
                return $(ele);
            } else if ((ele.context && ele.context.tagName == 'rect')) {
                return ele;
            } else {
                return getprevElement(ele.context ? ele.context.previousSibling : ele.previousSibling);
            }
        }
    }

    a.rect = function (p, m) {
        var u = this, g = "rect" + a.util.nextId(), E = b.extend(true, {}, a.config.rect, p), C = m, t, e, n, f, x, v;
        t = C.rect(E.attr.x, E.attr.y, E.attr.width, E.attr.height, E.attr.r, E.attr.fill).hide().attr(E.attr);

        //e = C.image(a.config.basePath + E.img.src, E.attr.x + E.img.width / 2, E.attr.y + (E.attr.height - E.img.height) / 2, E.img.width, E.img.height).hide();
        var imgX = E.img.attr == null ? 0 : E.img.attr.x, imgY = E.img.attr == null ? 0 : E.img.attr.y;
        //b(e[0]).attr('x',imgX);
        //b(e[0]).attr('y',imgY);
        e = C.image(a.config.basePath + E.img.src, imgX, imgY, Number(E.img.height)).hide();
        e.attr('height', Number(E.img.height));
        //n = C.text(E.attr.x + E.img.width + (E.attr.width - E.img.width) / 2, E.attr.y + a.config.lineHeight / 2, E.name.text).hide().attr(E.name);
        n = C.text(0, 0, E.name.text).hide().attr(E.name);
        f = C.text(E.attr.x + E.img.width + (E.attr.width - E.img.width) / 2, E.attr.y + (E.attr.height - a.config.lineHeight) / 2 + a.config.lineHeight, E.text.text).hide().attr(E.text);
        //b(f[0]).attr('x',E.text.x);
        //b(f[0]).attr('y',E.text.y);
        t.drag(function (r, o) {
            A(r, o)
        }, function () {
            z()
        }, function () {
            l()
        });
        e.drag(function (r, o) {
            A(r, o)
        }, function () {
            z()
        }, function () {
            l()
        });
        n.drag(function (r, o) {
            A(r, o)
        }, function () {
            z()
        }, function () {
            l()
        });
        f.drag(function (r, o) {
            A(r, o)
        }, function () {
            z()
        }, function () {
            l()
        });
        var A = function (F, r) {
            if (!a.config.editable) {
                return
            }
            var o = (x + F);
            var G = (v + r);
            q.x = o - E.margin;
            q.y = G - E.margin;
            B()
        };
        var z = function () {
            x = t.attr("x");
            v = t.attr("y");
            t.attr({opacity: 0.5});
            e.attr({opacity: 0.5});
            f.attr({opacity: 0.5})
        };
        var l = function () {
            t.attr({opacity: 1});
            e.attr({opacity: 1});
            f.attr({opacity: 1})
        };
        var s, i = {}, h = 5, q = {
            x: E.attr.x - E.margin,
            y: E.attr.y - E.margin,
            width: E.attr.width + E.margin * 2,
            height: E.attr.height + E.margin * 2
        };
        s = C.path("M0 0L1 1").hide();
        i.t = C.rect(0, 0, h, h).attr({fill: "#000", stroke: "#fff", cursor: "s-resize"}).hide().drag(function (r, o) {
            D(r, o, "t")
        }, function () {
            k(this.attr("x") + h / 2, this.attr("y") + h / 2, "t")
        }, function () {
        });
        i.lt = C.rect(0, 0, h, h).attr({
            fill: "#000",
            stroke: "#fff",
            cursor: "nw-resize"
        }).hide().drag(function (r, o) {
            D(r, o, "lt")
        }, function () {
            k(this.attr("x") + h / 2, this.attr("y") + h / 2, "lt")
        }, function () {
        });
        i.l = C.rect(0, 0, h, h).attr({fill: "#000", stroke: "#fff", cursor: "w-resize"}).hide().drag(function (r, o) {
            D(r, o, "l")
        }, function () {
            k(this.attr("x") + h / 2, this.attr("y") + h / 2, "l")
        }, function () {
        });
        i.lb = C.rect(0, 0, h, h).attr({
            fill: "#000",
            stroke: "#fff",
            cursor: "sw-resize"
        }).hide().drag(function (r, o) {
            D(r, o, "lb")
        }, function () {
            k(this.attr("x") + h / 2, this.attr("y") + h / 2, "lb")
        }, function () {
        });
        i.b = C.rect(0, 0, h, h).attr({fill: "#000", stroke: "#fff", cursor: "s-resize"}).hide().drag(function (r, o) {
            D(r, o, "b")
        }, function () {
            k(this.attr("x") + h / 2, this.attr("y") + h / 2, "b")
        }, function () {
        });
        i.rb = C.rect(0, 0, h, h).attr({
            fill: "#000",
            stroke: "#fff",
            cursor: "se-resize"
        }).hide().drag(function (r, o) {
            D(r, o, "rb")
        }, function () {
            k(this.attr("x") + h / 2, this.attr("y") + h / 2, "rb")
        }, function () {
        });
        i.r = C.rect(0, 0, h, h).attr({fill: "#000", stroke: "#fff", cursor: "w-resize"}).hide().drag(function (r, o) {
            D(r, o, "r")
        }, function () {
            k(this.attr("x") + h / 2, this.attr("y") + h / 2, "r")
        }, function () {
        });
        i.rt = C.rect(0, 0, h, h).attr({
            fill: "#000",
            stroke: "#fff",
            cursor: "ne-resize"
        }).hide().drag(function (r, o) {
            D(r, o, "rt")
        }, function () {
            k(this.attr("x") + h / 2, this.attr("y") + h / 2, "rt")
        }, function () {
        });
        var D = function (F, r, G) {
            if (!a.config.editable) {
                return
            }
            var o = _bx + F, H = _by + r;
            switch (G) {
                case"t":
                    q.height += q.y - H;
                    q.y = H;
                    break;
                case"lt":
                    q.width += q.x - o;
                    q.height += q.y - H;
                    q.x = o;
                    q.y = H;
                    break;
                case"l":
                    q.width += q.x - o;
                    q.x = o;
                    break;
                case"lb":
                    q.height = H - q.y;
                    q.width += q.x - o;
                    q.x = o;
                    break;
                case"b":
                    q.height = H - q.y;
                    break;
                case"rb":
                    q.height = H - q.y;
                    q.width = o - q.x;
                    break;
                case"r":
                    q.width = o - q.x;
                    break;
                case"rt":
                    q.width = o - q.x;
                    q.height += q.y - H;
                    q.y = H;
                    break
            }
            B('drag');
        };
        var k = function (r, o, F) {

            _bx = r;
            _by = o
        };

        b([t.node, f.node, n.node, e.node]).bind("click", function () {
            // TODO 节点点击事件
            if (!a.config.editable) {
                return
            }
            w();
            var o = b(C).data("mod");
            switch (o) {
                case"pointer":
                    break;
                case"path":
                    var r = b(C).data("currNode");
                    if (r && r.getId() != g && r.getId().substring(0, 4) == "rect") {
                        b(C).trigger("addpath", [r, u])
                    }
                    break
            }

            b(C).trigger("click", [u, b(this)]);
            b(C).data("currNode", u);
            return false
        });
        // console.log(b([t.node, f.node, n.node, e.node]));
        /*b([t.node])*/
        //TODO 给节点加上ID E.attr.id
        if (E.attr.id) {
            b(t.node).attr('id', E.attr.id);
            b(f.node).attr('id', E.attr.id + 'Text1');
            b(n.node).attr('id', E.attr.id + 'Text2');
            b(e.node).attr('id', E.attr.id + "Img");
        }
        b([t.node, f.node, n.node, e.node]).hover(function (location) {
            // TODO 节点hover事件

            var bthis = b(this);
            var rect = getprevElement(bthis);
            if (rect != '') {
                if ($.isArray(rect)) {
                    rect = rect[0];
                }

                rect.attr('oldColor', rect.attr('stroke'));
                rect.attr('stroke', a.config.boderHoverColor);
                a.config.tools.rollback.showWin(rect, location, null);
            }
        }, function (location) {
            var bthis = b(this);
            var rect = getprevElement(bthis);
            if (rect != '') {
                if ($.isArray(rect)) {
                    rect = rect[0];
                }
                rect.attr('stroke', rect.attr('oldColor'));
                a.config.tools.rollback.showWin(bthis, location, rect);
            }

        });
        var j = function (o, r, bthis) {
            if (!a.config.editable) {
                return
            }
            if (r.getId() == g) {
                b(C).trigger("showprops", [E.props, r, bthis])
            } else {
                d()
            }
        };
        b(C).bind("click", j);
        var c = function (o, F, r, bthis, scope) {

            //改变属性
            var name = F.attr('name'),
                value = F.val();
            if (r.getId() == g) {
                var rect = getprevElement(b(f.node));
                switch (name) {
                    case 'text':
                        f.attr({text: value});
                        a.util.formatText(f, value);
                        break;
                    case 'textX':
                        f.attr({x: Number(value)});
                        break;
                    case 'textY':
                        f.attr({y: Number(value)});
                        break;
                    case 'textFontSize':
                        if ('global' == scope) {
                            $('#myflow text').css('font-size', value + 'px')
                            b('[name="' + name + '"]').val(value);
                        }
                        f.attr({'font-size': value + "px"});
                        break;
                    case 'img':
                        var img = rect.next();
                        img.attr('href', value)
                        break;
                    case 'imgWidth':
                        var img = rect.next();
                        img.width(Number(value))
                        break;
                    case 'imgHeight':
                        var img = rect.next();
                        img.height(Number(value))
                        break;
                    case 'imgX':
                        var img = rect.next();
                        b(img[0]).attr('x', Number(value))
                        break;
                    case 'imgY':
                        var img = rect.next();
                        b(img[0]).attr('y', Number(value))
                        break;
                    case 'stroke-width':
                        if ('global' == scope) {
                            $('#myflow rect').attr(name, value).css(name, value)
                            b('[name="' + name + '"]').val(value);
                        }
                        rect.css(name, value).attr(name, value);

                        break;
                    case 'cursorColor':
                        //改变鼠标悬浮颜色
                        a.config.boderHoverColor = value;
                        a.config.changeBoderHoverColor(value);
                        break;
                    case 'historyColor':
                        //改变走过的颜色
                        a.config.changeHistoryColor(value);
                        a.config.historyColor = value;
                        // a.config.boderHoverColor = value;
                        break;
                    default:
                        var val = value;
                        if($.isNumeric(value)){
                            val = Number(value);
                        }
                        if ('global' == scope) {
                            $('#myflow rect').attr(name, val)
                            b('[name="' + name + '"]').val(val);
                        }

                        E.attr[name] = val;
                        B();
                        rect.attr(name, val);
                        rect.attr('oldColor', val);
                        //a.config.rect.attr.fill = 'blue';

                        break;
                }
                var changeData = {
                    states: {}
                }
            }
        };
        b(C).bind("textchange", c);
        function y(isDrag) {
            // var G = Number(b(t[0]).attr('width')) + E.margin * 2, o = Number(b(t[0]).attr('height')) + E.margin * 2
            var G = E.attr.width + E.margin * 2,
                o = E.attr.height + E.margin * 2
            if( isDrag == 'drag' ){
                G = q.width + E.margin * 2,
                    o = q.height + E.margin * 2
            }
            // console.log(G);
            return "M" + q.x + " " + q.y + "L" + q.x + " " + (q.y + o) + "L" + (q.x + G) + " " + (q.y + o) + "L" + (q.x + G) + " " + q.y + "L" + q.x + " " + q.y
        }

        function w() {
            s.show();
            for (var o in i) {
                i[o].show()
            }
        }

        function d() {
            s.hide();
            for (var o in i) {
                i[o].hide()
            }
        }

        function B(isDrag) {
            // var F =  q.x + E.margin, r = q.y + E.margin, G = Number(b(t[0]).attr('width')), o = Number(b(t[0]).attr('height'));
            var F = q.x + E.margin, r = q.y + E.margin,
                G = E.attr.width,
                o = E.attr.height;
            if( isDrag == 'drag' ){
                G = q.width,
                    o = q.height
            }

            // debugger
            t.attr({x: F, y: r, width: G, height: o});
            var imgWidth = Number(b(e[0]).attr('width')) || b(e[0]).width();
            var imgHeight = Number(b(e[0]).attr('height')) || b(e[0]).height();
            switch (E.showType) {
                case"image":
                    e.attr({x: F + (G - imgWidth) / 2, y: r + (o - imgHeight) / 2}).show();
                    break;
                case"text":
                    t.show();

                    f.attr({x: F + G / 2, y: r + o / 2}).show();
                    break;
                case"image&text":
                    t.show();
                    //n.attr({x: F + E.img.width + (G - E.img.width) / 2, y: r + a.config.lineHeight / 2}).show();
                    f.attr({
                        x: F + imgWidth + (G - imgWidth) / 2,
                        y: r + (o - a.config.lineHeight) / 2 + a.config.lineHeight
                    }).show();
                    e.attr({x: F + imgWidth / 2, y: r + (o - imgHeight) / 2}).show();
                    break
            }

            //修改选中边框的位置及大小
            var tmpG = G + E.margin * 2;
            var tmpO = o + E.margin * 2;
            i.t.attr({x: q.x + tmpG / 2 - h / 2, y: q.y - h / 2});
            i.lt.attr({x: q.x - h / 2, y: q.y - h / 2});
            i.lb.attr({x: q.x - h / 2, y: q.y - h / 2 + tmpO});
            i.rt.attr({x: q.x - h / 2 + tmpG, y: q.y - h / 2});
            i.l.attr({x: q.x - h / 2, y: q.y - h / 2 + tmpO / 2});

            i.rb.attr({x: q.x - h / 2 + tmpG, y: q.y - h / 2 + tmpO});
            i.b.attr({x: q.x - h / 2 + tmpG / 2, y: q.y - h / 2 + tmpO});
            i.r.attr({x: q.x - h / 2 + tmpG, y: q.y - h / 2 + tmpO / 2});

            s.attr({path: y(isDrag)});
            var bbox = {
                x: F,
                y: r,
                width: tmpG,
                height: tmpO
            }
            // 改变大小
            b(C).trigger("rectresize", [u,bbox]);
            $('#myflow_props [name="width"]').val(G );
            $('#myflow_props [name="height"]').val(o);
            a.util.formatText(f, f.attr('text'));
        }

        this.toJson = function () {
            var r = '{"type":"' + E.type + '","text":{';
            var textInfo = b('#' + f[0].id);
            b.each(f.attrs, function (key, value) {
                if ("text" == key) {
                    if (Scdp.ObjUtil.isNotEmpty(textInfo.text())) {
                        r += '"' + key + '":' + '"' + f.attr('text') + '",';
                    }
                } else if ("font" != key) {
                    if (b.isNumeric(textInfo.attr(key))) {
                        r += '"' + key + '":' + Number(textInfo.attr(key)) + ',';
                    } else {
                        r += '"' + key + '":' + '"' + textInfo.attr(key) + '",';
                    }
                }
            });

            if (r.substring(r.length - 1, r.length) == ',') {
                r = r.substring(0, r.length - 1)
            }
            r += '},';
            //图片
            r += '"img":{'
            var img = b('#' + E.attr.id + 'Img');
            b.each(E.img, function (key, value) {
                if (key == 'src') {
                    r += '"' + key + '":' + '"' + img.attr('href') + '",';
                } else if (key != 'attr') {
                    var v = img[0].style[key] != "" ? Number(img[0].style[key]) : 0;
                    var v1 = img.attr(key) != "" ? Number(img.attr(key)) : 0;
                    var val = v1 == 0 ? v : v1;
                    r += '"' + key + '":' + val + ',';

                }
            });
            r += '"attr":{' + '"x":' + Number(img.attr('x')) + ',"y":' + Number(img.attr('y')) + '}'
            if (r.substring(r.length - 1, r.length) == ',') {
                r = r.substring(0, r.length - 1)
            }
            r += '}, "attr":{';
            //"x":';
            //+ Math.round(t.attr('x')) + ', "y":' + Math.round(t.attr('y')) + ', "width":' + Math.round(t.attr('width')) + ', "height":' + Math.round(t.attr('height')) ;
            var attrs = t.attrs;
            var rect = b('#' + E.attr.id);
            b.each(attrs, function (key, value) {
                if (b.isNumeric(rect.attr(key))) {
                    r += '"' + key + '":' + Number(rect.attr(key)) + ',';
                } else {
                    r += '"' + key + '":' + '"' + rect.attr(key) + '",';
                }
            })
            r += '"id":"' + E.attr.id + '"';
            if (r.substring(r.length - 1, r.length) == ',') {
                r = r.substring(0, r.length - 1)
            }
            r = r + '}, "props":{';
            for (var o in E.props) {
                r += '"' + o + '":{"value":"' + E.props[o].value + '"},'
            }
            if (r.substring(r.length - 1, r.length) == ',') {
                r = r.substring(0, r.length - 1)
            }
            r += '}}';
            return r
        };
        this.restore = function (o) {
            var r = o;
            E = b.extend(true, E, o);
            var aAttr = {};
            b.each(r.text, function (key, value) {
                aAttr[key] = value;
            });

            B();
            f.attr(aAttr);
            a.util.formatText(f, E.text.text);
        };
        this.getBBox = function () {
            return q
        };
        this.getId = function () {
            return g
        };
        this.remove = function () {
            t.remove();
            f.remove();
            n.remove();
            e.remove();
            s.remove();
            for (var o in i) {
                i[o].remove()
            }
        };
        this.text = function () {
            return f.attr("text")
        };
        this.attr = function (o) {
            if (o) {
                t.attr(o)
            }
        };
        B()
    };
    a.path = function (q, n, u, e) {
        var v = this, z = n, B = b.extend(true, {}, a.config.path), i, t, f, h = B.textPos, y, w, k = u, s = e,
            g = "path" + a.util.nextId(), x;

        function p(G, H, D, L) {

            var F = this, M = G, r, o = D, O = L, K, I, N = H;
            switch (M) {
                case"from":
                    r = z.rect(H.x - B.attr.fromDot.width / 2, H.y - B.attr.fromDot.height / 2, B.attr.fromDot.width, B.attr.fromDot.height).attr(B.attr.fromDot);
                    break;
                case"big":
                    r = z.rect(H.x - B.attr.bigDot.width / 2, H.y - B.attr.bigDot.height / 2, B.attr.bigDot.width, B.attr.bigDot.height).attr(B.attr.bigDot);
                    break;
                case"small":
                    r = z.rect(H.x - B.attr.smallDot.width / 2, H.y - B.attr.smallDot.height / 2, B.attr.smallDot.width, B.attr.smallDot.height).attr(B.attr.smallDot);
                    break;
                case"to":
                    r = z.rect(H.x - B.attr.toDot.width / 2, H.y - B.attr.toDot.height / 2, B.attr.toDot.width, B.attr.toDot.height).attr(B.attr.toDot);
                    break
            }
            if (r && (M == "big" || M == "small")) {
                r.drag(function (Q, P) {
                    C(Q, P)
                }, function () {
                    J()
                }, function () {
                    E()
                });
                var C = function (R, Q) {
                    var P = (K + R), S = (I + Q);
                    F.moveTo(P, S)
                };
                var J = function () {
                    if (M == "big") {
                        K = r.attr("x") + B.attr.bigDot.width / 2;
                        I = r.attr("y") + B.attr.bigDot.height / 2
                    }
                    if (M == "small") {
                        K = r.attr("x") + B.attr.smallDot.width / 2;
                        I = r.attr("y") + B.attr.smallDot.height / 2
                    }
                };
                var E = function () {
                }
            }
            this.type = function (P) {
                if (P) {
                    M = P
                } else {
                    return M
                }
            };
            this.node = function (P) {
                if (P) {
                    r = P
                } else {
                    return r
                }
            };
            this.left = function (P) {
                if (P) {
                    o = P
                } else {
                    return o
                }
            };
            this.right = function (P) {
                if (P) {
                    O = P
                } else {
                    return O
                }
            };
            this.remove = function () {
                o = null;
                O = null;
                r.remove()
            };
            this.pos = function (P) {
                if (P) {
                    N = P;
                    r.attr({x: N.x - r.attr("width") / 2, y: N.y - r.attr("height") / 2});
                    return this
                } else {
                    return N
                }
            };
            this.moveTo = function (Q, T) {
                this.pos({x: Q, y: T});
                switch (M) {
                    case"from":
                        if (O && O.right() && O.right().type() == "to") {
                            O.right().pos(a.util.connPoint(s.getBBox(), N))
                        }
                        if (O && O.right()) {
                            O.pos(a.util.center(N, O.right().pos()))
                        }
                        break;
                    case"big":
                        if (O && O.right() && O.right().type() == "to") {
                            O.right().pos(a.util.connPoint(s.getBBox(), N))
                        }
                        if (o && o.left() && o.left().type() == "from") {
                            o.left().pos(a.util.connPoint(k.getBBox(), N))
                        }
                        if (O && O.right()) {
                            O.pos(a.util.center(N, O.right().pos()))
                        }
                        if (o && o.left()) {
                            o.pos(a.util.center(N, o.left().pos()))
                        }
                        var S = {x: N.x, y: N.y};
                        if (a.util.isLine(o.left().pos(), S, O.right().pos())) {
                            M = "small";
                            r.attr(B.attr.smallDot);
                            this.pos(S);
                            var P = o;
                            o.left().right(o.right());
                            o = o.left();
                            P.remove();
                            var R = O;
                            O.right().left(O.left());
                            O = O.right();
                            R.remove()
                        }
                        break;
                    case"small":
                        if (o && O && !a.util.isLine(o.pos(), {x: N.x, y: N.y}, O.pos())) {
                            M = "big";
                            r.attr(B.attr.bigDot);
                            var P = new p("small", a.util.center(o.pos(), N), o, o.right());
                            o.right(P);
                            o = P;
                            var R = new p("small", a.util.center(O.pos(), N), O.left(), O);
                            O.left(R);
                            O = R
                        }
                        break;
                    case"to":
                        if (o && o.left() && o.left().type() == "from") {
                            o.left().pos(a.util.connPoint(k.getBBox(), N))
                        }
                        if (o && o.left()) {
                            o.pos(a.util.center(N, o.left().pos()))
                        }
                        break
                }
                m(true);
            }
        }

        function j() {
            var D, C, E = k.getBBox(), F = s.getBBox(), r, o;
            r = a.util.connPoint(E, {x: F.x + F.width / 2, y: F.y + F.height / 2});
            o = a.util.connPoint(F, r);
            D = new p("from", r, null, new p("small", {x: (r.x + o.x) / 2, y: (r.y + o.y) / 2}));
            D.right().left(D);
            C = new p("to", o, D.right(), null);
            D.right().right(C);
            this.toPathString = function () {
                if (!D) {
                    return ""
                }
                var J = D, I = "M" + J.pos().x + " " + J.pos().y, H = "";
                while (J.right()) {
                    J = J.right();
                    I += "L" + J.pos().x + " " + J.pos().y
                }
                var G = a.util.arrow(J.left().pos(), J.pos(), B.attr.arrow.radius);
                H = "M" + G[0].x + " " + G[0].y + "L" + G[1].x + " " + G[1].y + "L" + G[2].x + " " + G[2].y + "z";
                return [I, H]
            };
            this.toJson = function () {
                var G = '[', H = D;
                while (H) {
                    if (H.type() == "big") {
                        G += '{"x":' + H.pos().x + ',"y":' + H.pos().y + '},'
                    }
                    H = H.right()
                }
                if (G.substring(G.length - 1, G.length) == ",") {
                    G = G.substring(0, G.length - 1)
                }
                G += ']';
                return G
            };
            this.restore = function (H) {
                var I = H, J = D.right();
                try {
                    for (var G = 0; G < I.length; G++) {
                        J.moveTo(I[G].x, I[G].y);
                        J.moveTo(I[G].x, I[G].y);
                        J = J.right()
                    }
                } catch (e) {
                    console.log(e)

                }
                this.hide()
            };
            this.fromDot = function () {
                return D
            };
            this.toDot = function () {
                return C
            };
            this.midDot = function () {
                var H = D.right(), G = D.right().right();
                while (G.right() && G.right().right()) {
                    G = G.right().right();
                    H = H.right()
                }
                return H
            };
            this.show = function () {
                var G = D;
                while (G) {
                    G.node().show();
                    G = G.right()
                }
            };
            this.hide = function () {
                var G = D;
                while (G) {
                    G.node().hide();
                    G = G.right()
                }
            };
            this.remove = function () {
                var G = D;
                while (G) {
                    if (G.right()) {
                        G = G.right();
                        G.left().remove()
                    } else {
                        G.remove();
                        G = null
                    }
                }
            }
        }

        B = b.extend(true, B, q);
        i = z.path(B.attr.path.path).attr(B.attr.path);
        t = z.path(B.attr.arrow.path).attr(B.attr.arrow);
        x = new j();
        x.hide();
        var pathText = B.text.text == '{to}' ? '' : B.text.text;
        f = z.text(0, 0, B.text.text).attr(B.text).attr({
            text: B.text.text.replace("{from}",
                k.text()).replace("{to}", pathText == '✚' || pathText == '×' ? '' : pathText)
        });
        //debugger
        f.drag(function (r, o) {
            if (!a.config.editable) {
                return
            }
            f.attr({x: y + r, y: w + o})
            a.util.formatText(f, f.attr('text'));
        }, function () {
            y = f.attr("x");
            w = f.attr("y")
        }, function () {
            var o = x.midDot().pos();
            h = {x: f.attr("x") - o.x, y: f.attr("y") - o.y}
        });
        //先给path加上id
        if (B.id) {
            b([f.node]).attr('id', B.id + "Text")
            b([i.node]).attr('id', B.id);
            b([t.node]).attr('id', B.id + "arrow");
            b([i.node]).attr('pathFrom', B.pathFrom);
            b([i.node]).attr('from', B.from);
            b([i.node]).attr('pathTo', B.pathTo);
            b([i.node]).attr('to', B.to);
        }

        m();
        b([i.node, t.node]).hover(function () {
            var bthis = b(this);
            var path = '';
            if (bthis.context.previousSibling.nodeName == 'path') {
                path = b(bthis.context.previousSibling)
            } else if (bthis.context.nextSibling.nodeName == 'path') {
                path = b(bthis.context.nextSibling)
            }
            // var rect = getprevElement(bthis);
            bthis.attr('oldColor', bthis.attr('stroke'));
            bthis.attr('stroke', a.config.boderHoverColor);
            path.attr('oldColor', path.attr('stroke'));
            path.attr('stroke', a.config.boderHoverColor);

        }, function () {
            var bthis = b(this);
            // var rect = getprevElement(bthis);
            var path = '';
            if (bthis.context.previousSibling.nodeName == 'path') {
                path = b(bthis.context.previousSibling)
            } else if (bthis.context.nextSibling.nodeName == 'path') {
                path = b(bthis.context.nextSibling)
            }
            bthis.attr('stroke', bthis.attr('oldColor'));
            path.attr('stroke', path.attr('oldColor'));
        });
        b([i.node, t.node]).bind("click", function () {
            if (!a.config.editable) {
                return
            }
            b(z).trigger("click", [v, b(this)]);
            b(z).data("currNode", v);
            return false
        });
        var l = function (r, C, bthis) {
            if (!a.config.editable) {
                return
            }
            if (C && C.getId() == g) {
                x.show();
                b(z).trigger("showprops", [B.props, v, bthis, f])
            } else {
                x.hide()
            }
            var o = b(z).data("mod");
            switch (o) {
                case"pointer":
                    break;
                case"path":
                    break
            }
        };
        b(z).bind("click", l);
        var A = function (o, r) {
            if (!a.config.editable) {
                return
            }
            if (r && (r.getId() == k.getId() || r.getId() == s.getId())) {
                b(z).trigger("removepath", v)
            }
        };
        b(z).bind("removerect", A);
        var d = function (C, D, box) {
            //改变大小事件
            if (!a.config.editable) {
                return
            }
            if (k && k.getId() == D.getId()) {
                var o;
                if (x.fromDot().right().right().type() == "to") {
                    o = {x: s.getBBox().x + s.getBBox().width / 2, y: s.getBBox().y + s.getBBox().height / 2}
                } else {
                    o = x.fromDot().right().right().pos()
                }
                // var r = a.util.connPoint(k.getBBox(), o);
                var r = a.util.connPoint(box, o);
                x.fromDot().moveTo(r.x, r.y);
                m(true)
            }
            if (s && s.getId() == D.getId()) {

                var o;
                if (x.toDot().left().left().type() == "from") {
                    o = {x: k.getBBox().x + k.getBBox().width / 2, y: k.getBBox().y + k.getBBox().height / 2}
                } else {
                    o = x.toDot().left().left().pos()
                }
                // var r = a.util.connPoint(s.getBBox(), o);
                var r = a.util.connPoint(box, o);
                x.toDot().moveTo(r.x, r.y);
                m(true)
            }
        };
        b(z).bind("rectresize", d);
        var c = function (r, o, C, bthis, scope) {

            if (bthis && C.getId() == g) {
                // f.attr({text: o})
                var name = o.attr('name'),
                    value = o.val(),
                    path;
                if (bthis.context.previousSibling.nodeName == 'path') {
                    path = b(bthis.context.previousSibling)
                } else if (bthis.context.nextSibling.nodeName == 'path') {
                    path = b(bthis.context.nextSibling)
                }
                switch (name) {
                    case 'stroke-width':
                        bthis.css(name, value).attr(name, value);
                        path.css(name, value).attr(name, value);
                        if ('global' == scope) {
                            $('#myflow path').css(name, value).attr(name, value);
                            b('[name="' + name + '"]').val(value);
                        }
                        break;
                    case 'title':
                        f.attr('text', value);
                        a.util.formatText(f, value);
                        break;
                    case 'img':
                        var img = rect.next();
                        img.attr('href', value)
                        break;
                    case 'cursorColor':
                        //改变鼠标悬浮颜色
                        a.config.boderHoverColor = value;
                        a.config.changeBoderHoverColor(value);
                        break;
                    default:
                        bthis.attr(name, value);
                        path.attr(name, value);
                        if ('global' == scope) {
                            $('#myflow path').attr(name, value)
                            b('[name="' + name + '"]').val(value);
                        }
                        break;
                }

            }
        };
        b(z).bind("textchange", c);
        this.from = function () {
            return k
        };
        this.to = function () {
            return s
        };
        this.toJson = function () {
            var r = '{"from":"' + k.getId() + '","to":"' + s.getId() + '",' + ' "pathFrom":"' + B.pathFrom + '","pathTo":"' + B.pathTo + '",' + ' "dots":' + x.toJson() + ',"text":{"text":"' + f.attr('text') + '"},"textPos":{"x":' + h.x + ',"y":' + h.y + '}, ';
            r += '"id":"' + B.id + '","props":{';
            var path = b('#' + B.id);
            if (r.substring(r.length - 1, r.length) == ',') {
                r = r.substring(0, r.length - 1)
            }
            r += '},"attr":{';
            b.each(B.attr, function (key, value) {
                r += '"' + key + '":{'
                var rect = b('#' + key.id);
                b.each(value, function (subkey, subvalue) {
                        if (path.attr(subkey)) {
                            if (b.isNumeric(subvalue)) {
                                r += '"' + subkey + '":' + Number(path.attr(subkey)) + ','
                            } else {
                                r += '"' + subkey + '":"' + path.attr(subkey) + '",'
                            }
                        }
                    }
                )
                if (r.substring(r.length - 1, r.length) == ',') {
                    r = r.substring(0, r.length - 1)
                }
                r += "},"
            })
            if (r.substring(r.length - 1, r.length) == ',') {
                r = r.substring(0, r.length - 1)
            }
            r += '}}';
            return r
        };
        this.restore = function (o) {
            var r = o;
            B = b.extend(true, B, o);
            x.restore(r.dots);
        };
        this.remove = function () {
            x.remove();
            i.remove();
            t.remove();
            f.remove();
            try {
                b(z).unbind("click", l)
            } catch (o) {
            }
            try {
                b(z).unbind("removerect", A)
            } catch (o) {
            }
            try {
                b(z).unbind("rectresize", d)
            } catch (o) {
            }
            try {
                b(z).unbind("textchange", c)
            } catch (o) {
            }
        };
        function m(isDrag) {
            var r = x.toPathString(), o = x.midDot().pos();
            //i 是直线
            var pAttr = {};
            if (q.props && isDrag) {
                var path = b('#' + q.id);
                b.each(q.props, function (key, value) {
                    if (key != 'title') {
                        if (key == 'stroke-width') {
                            pAttr[key] = path.css(key);
                        } else {
                            pAttr[key] = path.attr(key);
                        }

                    }
                });
            }
            pAttr.path = r[0];
            i.attr(pAttr);
            //t 是箭头
            t.attr({path: r[1]});
            //f 是文字
            f.attr({x: o.x + h.x, y: o.y + h.y})
            a.util.formatText(f, B.text.text);
        }

        this.getId = function () {
            return g
        };
        this.text = function () {
            return f.attr("text")
        };
        this.attr = function (o) {
            if (o && o.path) {
                i.attr(o.path)
            }
            if (o && o.arrow) {
                t.attr(o.arrow)
            }
        }
    };
    a.props = function (h, f) {
        var j = this,
            c = b("#myflow_props").hide().draggable({handle: "#myflow_props_handle"}).resizable().css(a.config.props.attr).bind("click", function () {
                //e.stopPropagation()
                return true;
            }), tl = c.find("table.local"), tg = c.find('table.global'), g = f, i;
        //tl 当前table tg 全局属性
        var d = function (n, m, o, bthis, pathText) {

            if (i && i.getId() == o.getId()) {
                return
            }
            i = o;
            b(tl).find(".editor").each(function () {
                var k = b(this).data("editor");
                if (k) {
                    k.destroy()
                }
            });
            tl.html('');
            tg.html('');
            if (bthis) {
                c.show();
                if (tl.parent().is(':hidden'))
                    tl.parent().removeClass('hidden');
                if (!tg.parent().is(':hidden')) {
                    tg.parent().addClass('hidden');
                }
                for (var l in m) {
                    var scope = m[l].scope;
                    if (m[l].editor) {

                        if (scope && (scope == 'global' || scope.indexOf('&global') > -1 )) {
                            // tg.append('<tr><th ><div  class="ui-widget-header">全局属性</div></th></tr>');
                            tg.append("<tr><th>" + m[l].label + '</th><td><div id="g' + l + '" class="editor"></div></td></tr>');
                            m[l].editor().init(m, l, 'g' + l, o, g, m[l].type, 'global', bthis, '100%')
                        }
                        if (scope != 'global') {
                            tl.append("<tr><th>" + m[l].label + '</th><td><div id="l' + l + '" class="editor"></div></td></tr>');
                            if (m[l].name instanceof Array) {
                                $.each(m[l].name, function (index, record) {
                                    m[l].editor().init(m, l, 'l' + l, o, g, m[l].type, scope, bthis, '48%', record, index, pathText)
                                });
                            } else {
                                m[l].editor().init(m, l, 'l' + l, o, g, m[l].type, scope, bthis, '100%', null, null, pathText)
                            }
                        }


                    }
                }
            } else {
                c.hide();
            }

        };
        b(g).bind("showprops", d)
    };
    a.editors = {
        textEditor: function () {
            var d, e, c, g, name, node;
            this.init = function (i, h, m, l, j, type, scope, bthis, width, recordName, index, pathText) {
                d = i;
                e = h;
                c = /*(scope && (scope == 'global' || scope == '&global') > -1 )? 'g' + m : 'l' +*/ m;
                // c = (scope &&  scope == '&global' )? 'l' + m : 'l' + m;
                g = l;
                name = i[h].name;

//  生成输入框
                if (recordName) {
                    name = recordName;
                }
                var blank = index && index == 1 ? 'class="gap"' : '';
                var edit = b('<input type="' + type + '" name="' + name + '"' + blank + ' style="width:' + width + ';"/>' + blank);
                node = getprevElement(bthis, scope);
                if (name != 'text' && bthis.context.tagName != 'path') {
                    if (node) {
                        edit.val(node.attr(name));
                        if (name == 'stroke') {
                            edit.val(node.attr('oldcolor'));
                        } else if (name == 'img') {
                            var href = node.next().attr('href');
                            edit.val(href == 'about:blank' ? '' : href);
                        } else if (name == 'imgWidth') {
                            edit.val(Number(node.next().attr('width')) || node.next().width());
                        } else if (name == 'imgHeight') {
                            edit.val(Number(node.next().attr('height')) || node.next().height());
                        } else if (name == 'imgX') {
                            edit.val(node.next().attr('x'));
                        } else if (name == 'imgY') {
                            edit.val(node.next().attr('y'));
                        }

                    }
                } else if (bthis && bthis.context && bthis.context.tagName == 'path') {
                    if (name == 'stroke') {
                        edit.val(bthis.attr('oldcolor'));
                    } else if (name == 'stroke-width') {
                        edit.val(bthis.attr(name))
                    } else if (name == 'title') {
                        // var textId = '#' + bthis.attr('id') + 'Text';
                        //debugger
                        edit.val(pathText.attr('text'));

                    }
                }
                if (name == 'cursorColor') {
                    edit.val(a.config.boderHoverColor);
                } else if (name == 'historyColor') {
                    edit.val(a.config.historyColor);
                }
                else if (name == 'text') {
                    edit.val(g.text());
                } else if (name == 'textX') {
                    edit.val(node.next().next().next().attr('x'));
                }
                else if (name == 'textY') {
                    edit.val(node.next().next().next().attr('y'));
                } else if (name == 'textFontSize') {
                    edit.val(Number
                    (node.next().next().next().css('fontSize')));
                }

                edit.change(function () {
                    i[e].value = b(this).val();
                    b(j).trigger("textchange", [b(this), g, bthis, scope])
                }).appendTo("#" + c);


                b("#" + c).data("editor", this)
            };
            this.destroy = function () {
                //b("#" + c + " input").each(function () {
                //    d[e].value = b(this).val();
                //    b(f).trigger("textchange", [b(this), g])
                //})
            }
        }
    };
    a.init = function (x, r) {
        //width And height
        var v = r.width, e = r.height, y = Raphael(x, v * 1, e * 1), q = {}, g = {};
        b.extend(true, a.config, r);

        /*b(document).keydown(function (i) {
         if (!a.config.editable) {
         return
         }
         if (i.keyCode == 46) {
         删除元素
         var j = b(y).data("currNode");
         if (j) {
         if (j.getId().substring(0, 4) == "rect") {
         b(y).trigger("removerect", j)
         } else {
         if (j.getId().substring(0, 4) == "path") {
         b(y).trigger("removepath", j)
         }
         }
         b(y).removeData("currNode")
         }

         }
         });*/
        b(document).on('click', '#myflow', function (e) {
            b(y).data("currNode", null);
            b(y).trigger("click", {
                getId: function () {
                    return "00000000"
                }
            });

            b(y).trigger("showprops", [a.config.props.props, {
                getId: function () {
                    return "00000000"
                }
            }])
        });
        var w = function (c, i) {
            if (!a.config.editable) {
                return
            }
            if (i.getId().substring(0, 4) == "rect") {
                q[i.getId()] = null;
                i.remove()
            } else {
                if (i.getId().substring(0, 4) == "path") {
                    g[i.getId()] = null;
                    i.remove()
                }
            }
        };
        b(y).bind("removepath", w);
        b(y).bind("removerect", w);
        b(y).bind("addrect", function (j, c, k) {
            var i = new a.rect(b.extend(true, {}, a.config.tools.states[c], k), y);
            q[i.getId()] = i
        });
        var f = function (i, k, j) {
            var c = new a.path({}, y, k, j);
            g[c.getId()] = c
        };
        b(y).bind("addpath", f);
        b(y).data("mod", "point");
        if (a.config.editable) {
            b("#myflow_tools").draggable({handle: "#myflow_tools_handle"}).css(a.config.tools.attr);
            b("#myflow_tools .node").hover(function () {
                b(this).addClass("mover")
            }, function () {
                b(this).removeClass("mover")
            });
            b("#myflow_tools .selectable").click(function () {
                b(".selected").removeClass("selected");
                b(this).addClass("selected");
                b(y).data("mod", this.id)
            });
            b("#myflow_tools .state").each(function () {
                b(this).draggable({helper: "clone"})
            });
            b(x).droppable({
                accept: ".state", drop: function (c, i) {
                    b(y).trigger("addrect", [i.helper.attr("type"), {
                        attr: {
                            x: i.helper.offset().left,
                            y: i.helper.offset().top
                        }
                    }])
                }
            });
            b("#myflow_save").click(function () {
                var i = '{"states":{';

                for (var c in q) {
                    if (q[c]) {
                        i += '"' + q[c].getId() + '":' + q[c].toJson() + ','
                    }
                }
                if (i.substring(i.length - 1, i.length) == ',') {
                    i = i.substring(0, i.length - 1)
                }
                i += '},"paths":{';
                for (var c in g) {
                    if (g[c]) {
                        i += '"' + g[c].getId() + '":' + g[c].toJson() + ','
                    }
                }
                if (i.substring(i.length - 1, i.length) == ',') {
                    i = i.substring(0, i.length - 1)
                }
                i += '},"props":{"props":{';

                for (var c in a.config.props.props) {
                    i += '"' + c + '":{"value":"' + a.config.props.props[c].value + '"},'
                }
                if (i.substring(i.length - 1, i.length) == ',') {
                    i = i.substring(0, i.length - 1)
                }
                i += '}}}';
                a.config.tools.save.onclick(i)
            });
            b("#myflow_rollback").click(function () {
                // a.config.tools.rollback.onclick();
            });
            new a.props({}, y)
        }
        if (r.restore) {
            var B = r.restore;
            var z = {};
            if (B.states) {
                for (var s in B.states) {
                    var d = new a.rect(b.extend(true, {}, a.config.tools.states[B.states[s].type], B.states[s]), y);
                    d.restore(B.states[s]);
                    z[s] = d;
                    q[d.getId()] = d
                }
            }
            if (B.paths) {
                for (var s in B.paths) {
                    var n = new a.path(b.extend(true, {}, a.config.tools.path, B.paths[s]), y, z[B.paths[s].from], z[B.paths[s].to]);
                    n.restore(B.paths[s]);
                    g[n.getId()] = n

                }
            }
        }
        var A = a.config.historyRects, l = a.config.activeRects;
        if (A.rects.length || l.rects.length) {
            var m = {}, z = {};
            for (var h in g) {
                if (!z[g[h].from().text()]) {
                    z[g[h].from().text()] = {rect: g[h].from(), paths: {}}
                }
                z[g[h].from().text()].paths[g[h].text()] = g[h];
                if (!z[g[h].to().text()]) {
                    z[g[h].to().text()] = {rect: g[h].to(), paths: {}}
                }
            }
            for (var u = 0; u < A.rects.length; u++) {
                if (z[A.rects[u].name]) {
                    z[A.rects[u].name].rect.attr(A.rectAttr)
                }
                for (var t = 0; t < A.rects[u].paths.length; t++) {
                    if (z[A.rects[u].name].paths[A.rects[u].paths[t]]) {
                        z[A.rects[u].name].paths[A.rects[u].paths[t]].attr(A.pathAttr)
                    }
                }
            }
            for (var u = 0; u < l.rects.length; u++) {
                if (z[l.rects[u].name]) {
                    z[l.rects[u].name].rect.attr(l.rectAttr)
                }
                for (var t = 0; t < l.rects[u].paths.length; t++) {
                    if (z[l.rects[u].name].paths[l.rects[u].paths[t]]) {
                        z[l.rects[u].name].paths[l.rects[u].paths[t]].attr(l.pathAttr)
                    }
                }
            }
        }
    };
    b.fn.myflow = function (c) {
        return this.each(function () {
            a.init(this, c)
            if (a.config.editable) {
                document.getElementById("myflow_props").style.visibility = 'visible';
                document.getElementById("myflow_save").style.visibility = 'visible';
                //document.getElementById("myflow_rollback").style.visibility='visible';
            }
        })
    };
    b.myflow = a
})(jQuery);