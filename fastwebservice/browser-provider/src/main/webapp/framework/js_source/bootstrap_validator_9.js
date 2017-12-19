/**
 * Created by lxj on 2016-10-02.
 */

$(document).ready(function() {
    if(!$.fn.bootstrapValidator) {
        return;
    }
    (function($) {
        $.fn.initFormValidator = function (options) {
            var tempOptions = options || {};
            //var modalDialog = $(this).parents(".modal-dialog");
            if(Scdp.ObjUtil.isEmpty(tempOptions.excluded)) {
                tempOptions.excluded = [':disabled'];
            }
            var defaultOptions = {
                message: 'This value is not valid',
                feedbackIcons: {
                    valid: '',
                    invalid: '',
                    validating: ''
                }};
            var newOptions = $.extend({}, defaultOptions, tempOptions);

            $(this).bootstrapValidator(newOptions);
            var formEle = this;
            if(tempOptions.submitButtons) {
                $(tempOptions.submitButtons, this).on("click", function(e){
                    $(formEle).data('bootstrapValidator').validate();
                    if($(formEle).data('bootstrapValidator').isValid()) {
                    } else {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }
                });
                if(Scdp.ObjUtil.isEmpty(formEle.prop("action"))) {
                    $(formEle).data('bootstrapValidator').defaultSubmit = function(){};
                }
            }

            var data    = $(this).data('scdpValidator');
            if (!data) {
                data = new ScdpValidator(this);
                $(this).data('scdpValidator', data);
            }
            return data;
        };

        function ScdpValidator(form) {
            this.$form   = $(form);
        };
        ScdpValidator.prototype = {
            constructor: ScdpValidator,
            /**
             *  field name can be itemId, id, name
             *  vArry is array , format like [stringLength:{options}, notEmpty]
             * @param name
             * @param vArr
             */
            addField: function (name, vArr, inOption) {
                var option ={};
                try {
                    if(inOption) {
                        option = $.extend({}, inOption);
                    }
                    if(!option.validators) {
                        option.validators = {};
                    }
                    if(name) {
                        if(vArr && $.isArray(vArr)) {
                            $.each(vArr, function(i,str) {
                                if(str) {
                                    var index = str.indexOf(":");
                                    var validator = null;
                                    var validatorOptionStr = null;
                                    if(index == -1) {
                                        validator = str;
                                    } else {
                                        validator = str.substring(0,index);
                                        validatorOptionStr = str.substring(index + 1);
                                    }

                                    if(validator) {
                                        validator = Scdp.StrUtil.trim(validator);
                                        option.validators[validator] ={};
                                        if(validatorOptionStr) {
                                            validatorOptionStr = Scdp.StrUtil.trim(validatorOptionStr);
                                            var validateOption = eval('('+validatorOptionStr +')');
                                            option.validators[validator] = validateOption;
                                        }
                                    }
                                }
                            });
                        }
                        var comp = this.$form.getCmp(name);
                        if(comp && comp.length > 0 ) {
                            var me = this;
                            var xtype = comp.attr("xtype");
                            if("bCheckBox" === xtype) {
                                comp.on('ifChanged', function(e) {
                                    me.$form
                                        // Mark the field as not validated
                                        .bootstrapValidator('updateStatus', name, 'NOT_VALIDATED')
                                        // Validate field
                                        .bootstrapValidator('validateField', name);
                                });
                            } else if("bRadioGroup" === xtype) {
                                var codeType = comp.attr("codeType");
                                var groupName = name + '_' + codeType;
                                if(Scdp.ObjUtil.isEmpty(codeType)) {
                                    groupName = name + '_' + "radio";
                                }
                                name = groupName;
                                $("[name='"+ groupName +"']", me.$form).on('ifChanged', function(e) {
                                    me.$form
                                        // Mark the field as not validated
                                        .bootstrapValidator('updateStatus', name, 'NOT_VALIDATED')
                                        // Validate field
                                        .bootstrapValidator('validateField', name);
                                });
                                option.onError = function(e, data) {
                                    var parentDiv = $(data.element).parents("div[xtype='bRadioGroup']");
                                    if(parentDiv && parentDiv.length > 0 ) {
                                        parentDiv.after($("i.form-control-feedback",parentDiv));
                                    }
                                };
                                option.onSuccess = function(e, data) {
                                    var parentDiv = $(data.element).parents("div[xtype='bRadioGroup']");
                                    if(parentDiv && parentDiv.length > 0 ) {
                                        parentDiv.after($("i.form-control-feedback",parentDiv));
                                    }
                                }
                            } else if("bCheckGroup" === xtype) {
                                var codeType = comp.attr("codeType");
                                var groupName = name + '_' + codeType;
                                if(Scdp.ObjUtil.isEmpty(codeType)) {
                                    groupName = key + '_' + "checkbox";
                                }
                                name = groupName;
                                $("[name='"+ groupName +"']", me.$form).on('ifChanged', function(e) {
                                    me.$form
                                        // Mark the field as not validated
                                        .bootstrapValidator('updateStatus', name, 'NOT_VALIDATED')
                                        // Validate field
                                        .bootstrapValidator('validateField', name);
                                });
                                option.onError = function(e, data) {
                                    var parentDiv = $(data.element).parents("div[xtype='bCheckGroup']");
                                    if(parentDiv && parentDiv.length > 0 ) {
                                        parentDiv.after($("i.form-control-feedback",parentDiv));
                                    }
                                };
                                option.onSuccess = function(e, data) {
                                    var parentDiv = $(data.element).parents("div[xtype='bCheckGroup']");
                                    if(parentDiv && parentDiv.length > 0 ) {
                                        parentDiv.after($("i.form-control-feedback",parentDiv));
                                    }
                                }
                            } else if("bDate" === xtype ||"bDateTime" === xtype) {
                                option.trigger ="input change";
                            }
                        }
                        //if(!option.onError) {
                        //    option.onError = function(e, data) {
                        //        $(data.element).next("i.glyphicon-remove").hover(function(){
                        //            var xtype = comp.attr("xtype");
                        //            if(Scdp.ObjUtil.isNotEmpty(xtype)) {
                        //                comp.sotValue(null);
                        //            } else {
                        //                comp.val(null);
                        //            }
                        //
                        //        });
                        //    }
                        //}
                        this.$form.data('bootstrapValidator').addField(name, option);
                    }
                } catch(error) {
                    Scdp.DebugUtil.logInfo(error)
                }
            },

            validate: function() {
                this.$form.data('bootstrapValidator').validate();
            },
            isValid: function () {
                return this.$form.data('bootstrapValidator').isValid();
            },
            resetForm: function() {
                this.$form.data('bootstrapValidator').resetForm();
            }
        }
    }(window.jQuery));

    $.fn.bootstrapValidator.validators.pwdsame = {
        html5Attributes: {
            message: 'message',
            field: 'field'
        },

        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value === '') {
                return true;
            }

            var fields  = options.field.split(','),
                isValid = false;

            for (var i = 0; i < fields.length; i++) {
                var compareWith = validator.getFieldElements(fields[i]);
                if (compareWith == null || compareWith.length === 0) {
                    continue;
                }

                var compareValue = compareWith.val();
                if (value === compareValue) {
                    isValid = true;
                    validator.updateStatus(compareWith, validator.STATUS_VALID, 'pwdsame');
                } else if(compareValue === '' || compareValue === null) {
                    isValid = true;
                } else if (compareValue !== '') {
                    validator.updateStatus(compareWith, validator.STATUS_INVALID, 'pwdsame');
                }
            }

            return isValid;
        }
    };
});