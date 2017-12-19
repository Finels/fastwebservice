$.extend($.fn.datagrid.methods, {
    columnMoving: function (jq,notUsemCustomScrollbar) {//notUsemCustomScrollbar true 不使用mCustomScrollbar滚动条  false或者不写则使用
        return jq.each(function () {
            $('.datagrid-pager.pagination').pagination({
                layout:['list','sep','first','prev','links','next','last','sep','refresh'],
                links:8
            });
            //if(!notUsemCustomScrollbar){
            //    //添加滚动条
            //    $(this).siblings().children('.datagrid-body').mCustomScrollbar({ axis:"xy"});
            //}
            $('.datagrid-cell').attr('title','可拖动列');
            var target = this;
            var cells = $(this).datagrid('getPanel').find('div.datagrid-header td[field]');
            cells.draggable({
                revert: true,
                cursor: 'move',
                edge: 5,
                proxy: function (source) {
                    var p = $('<div class="bg-olive tree-node-proxy tree-dnd-no" style="position:absolute;border-radius:6px;"/>').appendTo('body');
                    p.html($(source).text());
                    p.hide();
                    return p;
                },
                onBeforeDrag: function (e) {
                    e.data.startLeft = $(this).offset().left;
                    e.data.startTop = $(this).offset().top;
                },
                onStartDrag: function () {
                    $(this).draggable('proxy').css({
                        left: -10000,
                        top: -10000
                    });
                },
                onDrag: function (e) {
                    $(this).draggable('proxy').show().css({
                        left: e.pageX + 15,
                        top: e.pageY + 15
                    });
                    return false;
                }
            }).droppable({
                accept: 'td[field]',
                onDragOver: function (e, source) {
                    $(source).draggable('proxy').removeClass('tree-dnd-no').addClass('tree-dnd-yes');
                    $(this).css('border-left', '4px solid #3c8dbc');
                },
                onDragLeave: function (e, source) {
                    $(source).draggable('proxy').removeClass('tree-dnd-yes').addClass('tree-dnd-no');
                    $(this).css('border-left', 0);
                },
                onDrop: function (e, source) {
                    $(this).css('border-left', 0);
                    var fromField = $(source).attr('field');
                    var toField = $(this).attr('field');
                    setTimeout(function () {
                        moveField(fromField, toField);
                        $(target).datagrid();
                        $(target).datagrid('columnMoving');
                    }, 0);
                }
            });

            // move field to another location
            function moveField(from, to) {
                var columns = $(target).datagrid('options').columns;
                var cc = columns[0];
                var c = _remove(from);
                if (c) {
                    _insert(to, c);
                }

                function _remove(field) {
                    for (var i = 0; i < cc.length; i++) {
                        if (cc[i].field == field) {
                            var c = cc[i];
                            cc.splice(i, 1);
                            return c;
                        }
                    }
                    return null;
                }
                function _insert(field, c) {
                    var newcc = [];
                    for (var i = 0; i < cc.length; i++) {
                        if (cc[i].field == field) {
                            newcc.push(c);
                        }
                        newcc.push(cc[i]);
                    }
                    columns[0] = newcc;
                }
            }
        });
    }
});