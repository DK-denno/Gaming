/*! Selectric ϟ v1.8.5 (2014-10-02) - git.io/tjl9sQ - Copyright (c) 2014 Leonardo Santos - Dual licensed: MIT/GPL */
!function(e){"use strict";var t="selectric",s="Input Items Open Disabled TempShow HideSelect Wrapper Hover Responsive Above Scroll",i=".sl",o={onChange:function(t){e(t).change()},maxHeight:300,keySearchTimeout:500,arrowButtonMarkup:'<b class="button">&#x25be;</b>',disableOnMobile:!0,openOnHover:!1,expandToItemText:!1,responsive:!1,preventWindowScroll:!0,inheritOriginalWidth:!1,customClass:{prefix:t,postfixes:s,camelCase:!0},optionsItemBuilder:"{text}"},n={add:function(e,t,s){this[e]||(this[e]={}),this[e][t]=s},remove:function(e,t){delete this[e][t]}},a={replaceDiacritics:function(e){for(var t="40-46 50-53 54-57 62-70 71-74 61 47 77".replace(/\d+/g,"\\3$&").split(" "),s=t.length;s--;)e=e.toLowerCase().replace(RegExp("["+t[s]+"]","g"),"aeiouncy".charAt(s));return e},format:function(e){var t=arguments;return(""+e).replace(/{(\d+|(\w+))}/g,function(e,s,i){return i&&t[1]?t[1][i]:t[s]})},nextEnabledItem:function(e,t){for(;e[t=(t+1)%e.length].disabled;);return t},previousEnabledItem:function(e,t){for(;e[t=(t>0?t:e.length)-1].disabled;);return t},toDash:function(e){return e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()},triggerCallback:function(s,i){var o=i.element,l=i.options["on"+s];e.isFunction(l)&&l.call(o,o,i),n[s]&&e.each(n[s],function(){this.call(o,o,i)}),e(o).trigger(t+"-"+a.toDash(s),i)}},l=e(document),r=e(window),c=function(n,c){function d(t){if($.options=e.extend(!0,{},o,$.options,t),$.classes={},$.element=n,a.triggerCallback("BeforeInit",$),$.options.disableOnMobile&&L)return void($.disableOnMobile=!0);C(!0);var i=$.options.customClass,l=i.postfixes.split(" "),r=R.width();e.each(s.split(" "),function(e,t){var s=i.prefix+l[e];$.classes[t.toLowerCase()]=i.camelCase?s:a.toDash(s)}),x=e("<input/>",{"class":$.classes.input,readonly:L}),k=e("<div/>",{"class":$.classes.items,tabindex:-1}),T=e("<div/>",{"class":$.classes.scroll}),D=e("<div/>",{"class":i.prefix,html:$.options.arrowButtonMarkup}),y=e('<p class="label"/>'),I=R.wrap("<div>").parent().append(D.prepend(y),k,x),A={open:v,close:m,destroy:C,refresh:u,init:d},R.on(A).wrap('<div class="'+$.classes.hideselect+'">'),e.extend($,A),$.options.inheritOriginalWidth&&r>0&&I.width(r),p()}function p(){$.items=[];var s=R.children(),o="<ul>",n=s.filter(":selected").index();H=S=~n?n:0,(E=s.length)&&(s.each(function(t){var s=e(this),i=s.html(),n=s.prop("disabled"),l=$.options.optionsItemBuilder;$.items[t]={value:s.val(),text:i,slug:a.replaceDiacritics(i),disabled:n},o+=a.format('<li class="{1}">{2}</li>',e.trim([t==H?"selected":"",t==E-1?"last":"",n?"disabled":""].join(" ")),e.isFunction(l)?l($.items[t],s,t):a.format(l,$.items[t]))}),k.append(T.html(o+"</ul>")),y.html($.items[H].text)),D.add(R).add(I).add(x).off(i),I.prop("class",[$.classes.wrapper,R.prop("class").replace(/\S+/g,t+"-$&"),$.options.responsive?$.classes.responsive:""].join(" ")),R.prop("disabled")?(I.addClass($.classes.disabled),x.prop("disabled",!0)):(j=!0,I.removeClass($.classes.disabled).on("mouseenter"+i+" mouseleave"+i,function(t){e(this).toggleClass($.classes.hover),$.options.openOnHover&&(clearTimeout($.closeTimer),"mouseleave"==t.type?$.closeTimer=setTimeout(m,500):v())}),D.on("click"+i,function(e){Y?m():v(e)}),x.prop({tabindex:q,disabled:!1}).on("keypress"+i,h).on("keydown"+i,function(e){h(e),clearTimeout($.resetStr),$.resetStr=setTimeout(function(){x.val("")},$.options.keySearchTimeout);var t=e.keyCode||e.which;t>36&&41>t&&b(a[(39>t?"previous":"next")+"EnabledItem"]($.items,S))}).on("focusin"+i,function(e){x.one("blur",function(){x.blur()}),Y||v(e)}).on("oninput"in x[0]?"input":"keyup",function(){x.val().length&&e.each($.items,function(e,t){return RegExp("^"+x.val(),"i").test(t.slug)&&!t.disabled?(b(e),!1):void 0})}),R.prop("tabindex",!1),O=e("li",k.removeAttr("style")).click(function(){return b(e(this).index(),!0),!1})),a.triggerCallback("Init",$)}function u(){a.triggerCallback("Refresh",$),p()}function h(e){var t=e.keyCode||e.which;13==t&&e.preventDefault(),/^(9|13|27)$/.test(t)&&(e.stopPropagation(),b(S,!0))}function f(){var e=k.closest(":visible").children(":hidden"),t=$.options.maxHeight;e.addClass($.classes.tempshow);var s=k.outerWidth(),i=D.outerWidth()-(s-k.width());!$.options.expandToItemText||i>s?W=i:(k.css("overflow","scroll"),I.width(9e4),W=k.width(),k.css("overflow",""),I.width("")),k.width(W).height()>t&&k.height(t),e.removeClass($.classes.tempshow)}function v(s){a.triggerCallback("BeforeOpen",$),s&&(s.preventDefault(),s.stopPropagation()),j&&(f(),e("."+$.classes.hideselect,"."+$.classes.open).children()[t]("close"),Y=!0,B=k.outerHeight(),M=k.height(),x.val("").is(":focus")||x.focus(),l.on("click"+i,m).on("scroll"+i,g),g(),$.options.preventWindowScroll&&l.on("mousewheel"+i+" DOMMouseScroll"+i,"."+$.classes.scroll,function(t){var s=t.originalEvent,i=e(this).scrollTop(),o=0;"detail"in s&&(o=-1*s.detail),"wheelDelta"in s&&(o=s.wheelDelta),"wheelDeltaY"in s&&(o=s.wheelDeltaY),"deltaY"in s&&(o=-1*s.deltaY),(i==this.scrollHeight-M&&0>o||0==i&&o>0)&&t.preventDefault()}),I.addClass($.classes.open),w(S),a.triggerCallback("Open",$))}function g(){f(),I.toggleClass($.classes.above,I.offset().top+I.outerHeight()+B>r.scrollTop()+r.height())}function m(){if(a.triggerCallback("BeforeClose",$),H!=S){a.triggerCallback("BeforeChange",$);var e=$.items[S].text;R.prop("selectedIndex",H=S).data("value",e),y.html(e),a.triggerCallback("Change",$)}l.off(i),I.removeClass($.classes.open),Y=!1,a.triggerCallback("Close",$)}function b(e,t){$.items[e].disabled||(O.removeClass("selected").eq(S=e).addClass("selected"),w(e),t&&m())}function w(e){var t=O.eq(e).outerHeight(),s=O[e].offsetTop,i=T.scrollTop(),o=s+2*t;T.scrollTop(o>i+B?o-B:i>s-t?s-t:i)}function C(e){j&&(k.add(D).add(x).remove(),!e&&R.removeData(t).removeData("value"),R.prop("tabindex",q).off(i).off(A).unwrap().unwrap(),j=!1)}var x,k,T,D,y,I,O,S,H,B,M,W,E,A,$=this,R=e(n),Y=!1,j=!1,L=/android|ip(hone|od|ad)/i.test(navigator.userAgent),q=R.prop("tabindex");d(c)};e.fn[t]=function(s){return this.each(function(){var i=e.data(this,t);i&&!i.disableOnMobile?""+s===s&&i[s]?i[s]():i.init(s):e.data(this,t,new c(this,s))})},e.fn[t].hooks=n}(jQuery);

// wheretobuy

ATVI.components.wheretobuy = ATVI.components.wheretobuy || {};
(function($, ATVI) {

    var where = ATVI.components.wheretobuy;

    var registry = ATVI.utils.createRegistry();
    var unique = 0;
    var sku;
    var cc;

    var countryCodes = where.countryCodes = {
        "United States": "US",
        "Canada": "CA",
        "Deutschland": "DE",
        "France": "FR",
        "Australia": "AU",
        "United Kingdom": "UK",
        "Italia": "IT",
        "Espana": "ES",
        "España": "ES"
    };

    where.init = function($el, config) {

        var reg = registry.register($el);
        var context = reg.context;

        context.wrapper = $el;
        context.config = config;
        context.status = {
            bundles: undefined, regions: undefined, platforms: undefined, retailers: undefined
        };
        context.listsObj = {};
        buildContextLists(context);
        setStatusHandlers(context);

        setupRetailersList(context);
        setupButtons(context);
        where.updateImage(context, context.config.data.wtb.rows);

        setDefaults(context);
    };

    var setDefaults = function (context) {
        var defaults = context.config.opts.defaults;
        var query = ATVI.utils.getQueryParameters(true);
        if(query.bundles) defaults.bundles = query.bundles;
        if(query.platforms) defaults.platforms = query.platforms;
        if(query.regions) defaults.regions = query.regions;
        // allows passing a comma-separated list of regions as default; should pick the first one it that exists in the data
        var split = (defaults.regions || "").trim().split(/\s*,\s*/);

        if(split.length > 0 && split[0]) {
            defaults.regions = split[0];
            var allRegions = getAllRegions(context);
            for(var i = split.length - 1; i >= 0; i--) {
                var r = split[i].toLowerCase();
                for(var j = 0; j < allRegions.length; j++) {
                    var reg = allRegions[j];
                    if(reg && reg.toLowerCase() == r) {
                        defaults.regions = reg;
                        break;
                    }
                }
            }
        }
        where.useValues(context, defaults);
    };

    var getAllRegions = function(context) {
        return context.config.data.wtb.regions.map(function(o) { return o.id; });
    };

    var getArrayOfSelections = function (context) {
        //return context.wrapper.find("*[class^='selection-type-']").map(function(elem){ return $(this).attr("class").match(/selection-type-(\w+)/)[1];})
        return context.wrapper.find(".wtb-field").map(function() {
            return {
                type: this.className.match(/selection-type-(\w+)/)[1],
                $el: $(this)
            };
        });
    };

    var buildContextLists = function (context) {
        var $el = context.wrapper, lo = context.listsObj;
        var listItems = getArrayOfSelections(context);
        for(var i = 0; i < listItems.length; i++) {
            var item = listItems[i];
            lo[item.type] = lo[item.type] || [];
            var listType = getListType(item.$el);
            var list = buildContextList(context, item.$el, listType, item.type);
            item.$el.append(list.$el);
            lo[item.type].push(list);

            if(listType == "selectbox") where.onSelectboxCreate(context, list.$el, list);
        }
    };

    var buildContextList = function(context, $el, listType, field) {
        var selectionLists = context.config.data.wtb;
        var selList = selectionLists[field] = where.processSelectionList(context, field, selectionLists[field]) || selectionLists[field];

        var list = where.listBuilderUtils[listType](context, selList || [], $el, field);
        list.field = field;
        return list;
    };

    var getListType = function($list) {
        if($list.hasClass("selectbox")) return "selectbox";
        if($list.hasClass("radio")) return "radio";
        return "list";
    };

    var setStatusHandlers = function (context) {
        var status = context.status;
        var data = context.config.data.wtb;

        var listsObj = context.listsObj;
        var setupOnChangeForType = function(type) {
            if(!listsObj.hasOwnProperty(type) || type == "retailers") return;
            var arr = listsObj[type];
            for(var i = 0; i < arr.length; i++) {
                arr[i].onChange(function(ev) {
                    ev = ev || {};
                    ev.type = type;
                    handleSelectionChange(ev);
                });
            }
        };

        var handleSelectionChange = function(ev) {
            updateStatus(context, ev.type, ev.value);
            var possibleRows = where.widenPossibleRows(context, ev.type);
            where.updateForPossibleRows(context, possibleRows);
            where.updateAnalyticsObject(context);
            where.sendStatusEvent(context, ev);
        };

        for(var type in listsObj) {
            setupOnChangeForType(type);
        }

    };

    var setupRetailersList = function (context) {
        var robjs = context.listsObj.retailers;
        for(var i = 0; i < robjs.length; i++) {
            var list = robjs[i];
            list.updateElems([]);
            list.onChange(function(ev) {
                /*
                var newVal = list.getValue();
                if(newVal) newVal = newVal.trim();
                */
                var newVal = ev.value;
                
                where.updateButtonLink(context, newVal);
                if(ev) {
                    ev.value = ev.text || ev.value;
                    ev.oldValue = ev.oldText || ev.oldValue;
                }
                where.updateAnalyticsObject(context);
                where.sendStatusEvent(context, ev);
            });
        }
    };

    var setupButtons = function(context) {
        context.wrapper.find(".wtb-button").click(function(e) {
            where.onWtbButtonClick(e, context, $(this));
        });
    };

    where.onWtbButtonClick = function(e, context, $this) {
        where.sendButtonClickEvent(context, $this);
        var href = $this.attr("href");

        if(!href || href == "#") e.preventDefault();
        if(context.skuMode) where.launchExistingPswtbModal(context.lastSku, context);
    };

    where.launchExistingPswtbModal = function(sku, context) {
        var pc = getPswtbContainer(sku, context);
        if(pc) pc.find("a").last().click();
    };

    var getPriorityList = function(context, exclude) {
        var opts = context.config.opts;
        opts.priority = opts.priority || ["bundles", "regions", "platforms"];

        return opts.priority.filter(function(element) { 
            return element != exclude;
        });
    };

    var updateStatus = function(context, field, value) {
        context.status[field] = value;
        var arr = context.listsObj[field] || [];
        for(var i = 0; i < arr.length; i++) {
            arr[i].setValue(value);
        }
        where.onStatusUpdate(context, field);
    };

    var getSelectionListType = function (selection) {
        return getSelectionListWrapper(selection).attr("class").match(/selection-type-(\w*)?/)[1];
    };

    var returnPossibleRows = function(context) {
        var status = context.status;
        var dataRows = context.config.data.wtb.rows;
        var ret = dataRows.slice(0);
        for(var field in status) {
            if(!status.hasOwnProperty(field)) continue;
            if(status[field]) ret = ret.filter(function(row) {
                return row[field] == status[field];
            });
        }
        return ret;
    };

    /*
    // TODO - include this functionality

    var setPosssibleOptions = function (status, rows) {
        for(var item in status) {
            if(!status.hasOwnProperty(item) || item == "img" || item == "retailers") continue;            
            //if(status.hasOwnProperty(item) && item != "img" && item != "retailers") {            
            $(".selection-type-" + item).find(".possible").removeClass("possible");

            if(status[item] != undefined || !$(".selection-type-" + item).length) continue;

            $(".selection-type-" + item).find(":checked").removeAttr("checked");
            for(var i = 0; i < rows.length; i++) {
                if(rows[i][item] != null && rows[i][item].length) {
                    var currItem = rows[i][item].replace(" ", "-").toLowerCase(); 
                    var sel = $("." + currItem);

                    if( !$("." + currItem).length) 
                        sel = $("[value=" + currItem + "]");  // TODO remove global query
                    setSelectedAs($(sel), "possible");
                }
            }
        }
    };
    */

    var buildRetailerList = function (context, rows) {
        var w = context.wrapper;
        var listsObj = context.listsObj;
        var bundle = (listsObj.bundles) ? context.status.bundles : true,
            region = (listsObj.regions) ? context.status.regions : true,
            platform = (listsObj.platforms) ? context.status.platforms : true;

        var elems = [];
        var skuElems = [];
        
        if(bundle && region && platform) {
            for( var i = 0; i < rows.length; i++) {
                var retailer = rows[i].retailer;
                
                if((retailer.name || "").trim().toLowerCase() == "sku") {
                    skuElems.push({ id: retailer.link, text: retailer.name, tags: retailer.notes });
                }
                else {
                    elems.push({ id: retailer.link, text: retailer.name, tags: retailer.notes });
                }
            }
        }

        if(skuElems.length) {
            w.addClass("sku-mode");
            context.skuMode = true;
            elems = [];
            var cc = countryCodes[region];
            var sku = cc + "_" + skuElems[0].id;

            if(context.lastSku != sku && window.pswtb) {

                context.lastSku = sku;
                var pswtbContainer = getPswtbContainer(sku, context);

                if(pswtbContainer.hasClass("initialized")) {

                    if(window.console) console.log("using SKU: " + sku);

                } else {

                    if(window.console) console.log("initiating SKU: " + sku);
                    pswtbContainer.addClass("initialized");

                    var psOpts = {
                        widgetConfigurationId: '6dc7a46b-228b-47b8-b320-afcc72f5c2f1',
                        sku: sku,
                        container: pswtbContainer[0]
                    };
                    var psCookie = (ATVI.utils.getCookie("PS_CTID", true) || "").trim();
                    if(psCookie) psOpts.customTrackingId = psCookie;

                    pswtb.loader.show(psOpts);
                }
            }

        } else {
            w.removeClass("sku-mode");
            context.skuMode = false;
        }

        var v;
        var robjs = context.listsObj.retailers;
        for(var i = 0; i < robjs.length; i++) {
            robjs[i].updateElems(elems);
            v = v || robjs[i].getValue();
        }

        if(elems.length) {
            where.onPopulatedRetailers(context);
        } else {
            where.onEmptyRetailers(context);
        }

        where.updateButtonLink(context, v);
    };

    var getPswtbContainer = function(sku, context) {
        if(!sku) return;
        var cs = where.pswtbContainers = where.pswtbContainers || {};
        if(cs[sku]) return cs[sku];
        if(!context) return;
        cs[sku] = $("<div>").addClass("pswtb-container").appendTo(context.wrapper);
        return cs[sku];
    };

    where.buildRetailerList = buildRetailerList;

    var lb = where.listBuilderUtils = {};

    lb.list = function (context, elems) {
        var lis, ret = lb.generic(context, "list", elems);
        var $listWrapper = ret.$el = $("<ul>");

        ret.updateElems = function() {
            $listWrapper.html("");
            var elems = ret.elems;
            for(var i = 0; i < elems.length; i++) {
                var elemClass = elems[i].id.toLowerCase().replace(" ", "-");
                var li = $("<li>").addClass("possible " + elemClass).appendTo($listWrapper);
                $('<a>', { class: elemClass + " atvi-no-instrument"}).html(elems[i].text).attr("href", "#").appendTo(li);
            }
            lis = $listWrapper.find("li");
            lis.find("a").click(function(e) {
                e.preventDefault();
                var $this = $(this);
                var ev = {
                    original: e,
                    wrapper: $listWrapper,
                    target: $this,
                    oldValue: ret.getValue(),
                    oldText: ret.getText()
                };
                ret.setValueIndex(lis.index($this.parent()), ev);
            });

        };

        ret.readValue = function() {
            var ind = lis.index(lis.filter(".selected"));
            if(ind >= 0) return ret.elems[ind].id;
        };

        ret.updateView = function() {
            lis.removeClass("selected");
            var i = ret.getValueIndex();
            if(i >= 0) lis.eq(i).addClass("selected");
        };

        ret.updateElems(elems);

        return ret;
    };

    lb.selectbox = function (context, elems, wrapper, field) {
        var ret = lb.generic(context, "select", elems);
        var $selectWrapper = ret.$el = $("<select>");
        var includeDefaultOption = wrapper.hasClass("withdefault");

        ret.buildFromElems = function() {
            $selectWrapper.html("");
            var elems = ret.elems;
            if(elems.length == 0) {
                $("<option>", {value: "blank"}).appendTo($selectWrapper);
            } else {
                if(includeDefaultOption) {
                    $("<option>", {class: "possible", value: ""}).html(context.config.opts.defaultText[field] || "").appendTo($selectWrapper);
                }
                for(var i = 0; i < elems.length; i++) {
                    $("<option>", {class: "possible", value: elems[i].id}).html(elems[i].text).appendTo($selectWrapper);
                }
            }
        };

        ret.readValue = function() {
            return $selectWrapper.val();
        };
        ret.updateView = function() {
            var v = ret.getValue();
            var sv = $selectWrapper.val();
            if(!v && (!sv || sv == "blank")) return;
            if(v == sv) return;
            $selectWrapper.val(v);
            where.onSelectboxUpdate(context, ret.$el, ret);
        };
        $selectWrapper.on("change", function(e) {
            var ev = {
                original: e,
                wrapper: $selectWrapper,
                target: $selectWrapper,
                oldValue: ret.getValue(),
                oldText: ret.getText()
            };
            var sv = ret.readValue();
            if(sv == "blank") sv = null;
            ret.setValue(sv, ev);
        });

        ret.updateElems(elems);

        return ret;
    };

    lb.radio = function (context, elems) {
        var ret = lb.generic(context, "radio", elems);
        var $selectWrapper = ret.$el = $('<div>', {class: "radio-container"});
        var radioName = "wtb-radio-" + (unique++);
        var radioInputs;

        ret.buildFromElems = function() {
            $selectWrapper.html("");
            radioElems = null;
            var elems = ret.elems;
            for(var i = 0; i < elems.length; i++) {
                var className = elems[i].id.toLowerCase().replace(" ", "-");
                var inp = $("<input>", {type: "radio", name: radioName, class: className }).after(elems[i].text);
                var radioElem = $("<label>", {class: "possible " + className }).append(inp);
                radioElem.appendTo($selectWrapper);
            }
            radioInputs = $selectWrapper.find("input");

            radioInputs.on("change", function(e) {
                var $this = $(this);
                var ev = {
                    original: e,
                    wrapper: $selectWrapper,
                    target: $this,
                    oldValue: ret.getValue(),
                    oldText: ret.getText()
                };
                var rv = ret.readValue();
                ret.setValue(rv, ev);
            });
        };

        ret.readValue = function() {
            if(!radioInputs) return null;
            var checked = radioInputs.filter(":checked");
            if(!checked.length) return null;
            return ret.elems[radioInputs.index(checked)].id;
        };

        ret.updateView = function() {
            var rv = ret.readValue();
            var v = ret.getValue();
            if(rv == v) return;
            var vi = ret.getValueIndex();
            if(vi < 0) radioInputs.filter(":checked").prop("checked", false);
            else radioInputs.eq(vi).prop("checked", true);
        };
        
        ret.updateElems(elems);

        return ret;
    };

    lb.generic = function(context, type, elems) {
        var ret = {type: type, elems: elems}, index = -1, val, changeQueue = [];
        ret.getValue = function() { return val; };
        ret.getValueIndex = function() { return index; };
        ret.setValue = function(v, triggerEv) {

            if(!v || v == val) return;
          
            var m = -1;
            for(var i = 0; i < ret.elems.length; i++) {
                if(ret.elems[i].id == v) {
                    m = i;
                    break;
                }
            }
           
            if(m == -1 && v) return;
            ret.setValueIndex(m, triggerEv);
        };
        ret.setValueIndex = function(i, triggerEv) {
            if(i >= ret.elems.length || i < -1 || i == index) return;
            index = i;
            val = i == -1 ? null : ret.elems[i].id;
            ret.updateView();
            if(triggerEv) {
                triggerEv.value = val;
                triggerEv.text = ret.getText();
                ret.triggerChange(triggerEv);
            }
        };
        ret.getText = function() {
            var i = ret.getValueIndex();
            if(i < 0 || i >= (ret.elems || []).length) return "";
            return ret.elems[i].text || "";
        };
        ret.findText = function(t) {
            var a = ret.elems || [];
            for(var i = 0; i < a.length; i++) {
                if(a[i].text == t) return i;
            }
            return -1;
        };
        ret.onChange = function(c) {
            changeQueue.push(c);
        };
        ret.triggerChange = function(ev) {
            for(var i = 0; i < changeQueue.length; i++) changeQueue[i](ev);
        };
        ret.updateView = function() {};
        ret.updateElems = function(elems) {
            ret.elems = elems;
            var curr = ret.getValue();
            var currText = ret.getText();
            ret.setValue();
            ret.buildFromElems(true);
            ret.setValue(ret.readValue());
            if(curr) ret.setValue(curr);
            if(currText) {
                var ti = ret.findText(currText);
                if(ti >= 0) ret.setValueIndex(ti);
            }
            if(ret.$el) elems.length ? ret.$el.removeClass("empty") : ret.$el.addClass("empty");
            if(ret.type == "select") {
                where.onSelectboxUpdate(context, ret.$el, ret);
            }
        };
        return ret;
    };

    where.useValues = function(context, d) {
        var listsObj = context.listsObj;
        for(var field in d) {
            if(!d.hasOwnProperty(field)) continue;
            updateStatus(context, field, d[field]);
            var v = null, arr = listsObj[field] || [];
            for(var i = 0; i < arr.length; i++) {
                v = v || arr[i].getValue();
            }
            updateStatus(context, field, v);
        }
        where.updateForPossibleRows(context, where.widenPossibleRows(context));
        where.updateButtons(context);
    };

    where.widenPossibleRows = function(context, excluded) {
        var possibleRows = returnPossibleRows(context);
        if(context.widenSelection) {
            var priorityList = getPriorityList(context, excluded);
            while(possibleRows.length == 0 && priorityList.length) {
                updateStatus(context, priorityList.pop(), null);
                possibleRows = returnPossibleRows(context);
            }
        }
        return possibleRows;
    };

    where.updateForPossibleRows = function(context, possibleRows) {
        where.updateImage(context, possibleRows);
        //setPosssibleOptions(status, possibleRows);
        buildRetailerList(context, possibleRows);
    };

    where.updateImage = function (context, rows) {
        if(!rows || !rows.length) return;
        var imgRoot = context.config.opts.imageRootDirectory || "";
        var endslash = imgRoot.charAt(imgRoot.length - 1) == "/" ? '' : '/';
        var url = imgRoot + endslash + rows[0].img;
        var imgs = context.wrapper.find(".product-img");

        imgs.filter(".background").css("background-image", "url('" + url + "')");
        imgs.not(".background").html('<img src="' + url + '">');
    };

    where.updateButtons = function(context) {
        var v = where.scanComponentValues(context, "retailers").value;
        where.updateButtonLink(context, v);
    };

    where.updateButtonLink = function (context, url) {
        var $button = context.wrapper.find(".wtb-button");

        if(context.skuMode) {
            $button.attr("target", "").attr("href", "#").removeClass("no-retailer");
        } else {
            if(url != null) $button.attr("target", "_blank").attr("href", url).removeClass("no-retailer");
            else $button.attr("target", "").attr("href", "#").addClass("no-retailer");            
        }
    };

    where.scanComponentValues = function(context, field) {
        var arr = context.listsObj[field];
        if(!arr) return {};
        for(var i = 0; i < arr.length; i++) {
            var v = arr[i].getValue();
            if(v) return {
                value: v,
                text: arr[i].getText()
            };
        }
        return {};
    };

    where.getContext = function($el) {
        return registry.get($el);
    };

    where.updateAnalyticsObject = function(context) {
        var dd = window.digitalData;
        if(!dd || !context || !context.wrapper) return;

        var format = function(s) {
            return (s || "").trim().toLowerCase().replace(/\s+/g, "-");
        };
        var prod = {};
        var attr = prod.attributes = {};
        var info = prod.productInfo = {};
        var status = context.status || {};
        info.productName = format(context.wrapper.attr("data-product-name") || "default");
        attr.platform = format(status.platforms);
        var retailerLink = context.wrapper.find(".selection-type-retailers select").val();
        if(retailerLink) attr.vendor = format(context.wrapper.find(".selection-type-retailers select option:selected").text()) || retailerLink;
        info.productID = format(status.bundles);
        dd.product = prod;
    };

    where.sendStatusEvent = function(context, ev) {
        var status = context.status;
        ev = ev || {};
        var data = {};
        if(ev.value) data.value = ev.value;
        if(ev.oldValue) data.old_value = ev.oldValue;
        if(ev.type) data.field = ev.type;
        var details = ATVI.analytics.findComponentId(ev.target ? ev.target : context.wrapper);
        where.sendAnalyticsEvent(context, "wheretobuy-status-update", details, data);
    };

    where.sendButtonClickEvent = function(context, $el) {
        var details = ATVI.analytics.findComponentId($el);
        where.updateAnalyticsObject(context);
        where.sendAnalyticsEvent(context, "wtb-button-click", details, {
            button_text: $el.text().trim()
        });
    };

    where.sendAnalyticsEvent = function(context, type, details, data) {
        var status = context.status;
        data.bundle = status.bundles || "";
        var retailerData = where.scanComponentValues(context, "retailers");
        data.retailer = retailerData.text || "";
        data.retailerLink = retailerData.value || "";
        data.region = status.regions || "";
        data.platform = status.platforms || "";
        ATVI.analytics.sendEvent(type, details, data);
    };

    where.onEmptyRetailers = function(context) {
        var er = context.wrapper.find(".empty-retailers");
        if(!er.length) return;
        var arr = context.listsObj.retailers || [];
        for(var i = 0; i < arr.length; i++) {
            arr[i].$el.parents(".selectbox").first().hide();
        }
        if(context.skuMode) er.hide()
        else er.show();

    };

    where.onPopulatedRetailers = function(context) {
        var arr = context.listsObj.retailers || [];
        for(var i = 0; i < arr.length; i++) {
            arr[i].$el.parents(".selectbox").first().show();
        }
        context.wrapper.find(".empty-retailers").hide();
    };

    where.cleanText = function(el) {
        var $el = $(el);
        var div = $('<div>').html($el.html());
        $el.text(div.text());
    };

    where.onSelectboxCreate = function(context, $el, listObj) {
        console.log($el);
        $el.find("option").each(function() {
            where.cleanText(this);
        });
    };
    where.onSelectboxUpdate = function(context, $el, listObj) {
        $el.find("option").each(function() {
            where.cleanText(this);
        });
    };

    where.onStatusUpdate = function(context, field) {};

    where.processSelectionList = function (context, key, list) {
        return list;
    };

})(jQuery, ATVI);


var BO4 = BO4 || {};
BO4.buy = {};

(function($, BO4) {

	var wtb = BO4.buy,
        where = ATVI.components.wheretobuy,
        badCombos = [];

    wtb.basicInit = function() {


        ATVI.library.withDependency("wheretobuy", function() {

            where.onSelectboxCreate = function(context, $el, listObj) {
                $(function() {
                    $el.selectric({ 
                        disableOnMobile: false,
                        optionsItemBuilder: function(itemData) {
                            return '<span data-option-item-id="' + itemData.value + '"></span>' + itemData.text;
                        },
                        onRefresh: function() {
                            filterPlatforms();
                            wtb.filterSpecialBundles(context);
                        }
                    });

                    checkForLonelyOptions(context);
                });

            };

            where.onStatusUpdate = function(con, f) {
                if (f == 'regions') wtb.filterSpecialBundles(con);
                if (f != 'bundles') return;
            };

            where.onSelectboxUpdate = function(context, $el, listObj) {
                wtb.refreshSelectBox(context, $el);
                if($(".editions-entry select").length) {
					var bundleId = $(".editions-entry select").val(),
                        $els = $('.bundle-content-container');
                    $els.hide().filter(function() {
						return $(this).data('bundle-content-id') == bundleId;
                    }).show();
                }
            };

            where.processSelectionList = function(context, field, arr) {
                if(!context.fieldsSorted) {
                    context.fieldsSorted = true;
                    sortFields(context);
                    sortRows(context);
                }
            };

            where.onPopulatedRetailers = function(context) {
				var arr = context.listsObj.retailers || [];
                if (arr[0].elems.length == 0 || arr[0].elems[0].id === '#unavailable') {
					context.wrapper.find('.retailers-entry, .select-label.retailers').hide();
                    context.wrapper.find('.retailer-coming-soon').removeClass('hidden');
                    context.wrapper.find('.order-button').addClass('unavailable');
                    return;
                } else {
					context.wrapper.find('.retailers-entry, .select-label.retailers').show();
					context.wrapper.find('.retailer-coming-soon').addClass('hidden');
                    context.wrapper.find('.order-button').removeClass('unavailable');
                }

        		for(var i = 0; i < arr.length; i++) {
            		arr[i].$el.parents(".selectbox").first().show();
        		}
        		context.wrapper.find(".empty-retailers").hide();
            };

            where.onEmptyRetailers = function(context) {
                checkEmptyRetailers(context);
                var er = context.wrapper.find(".empty-retailers");
                if(!er.length) return;
                var arr = context.listsObj.retailers || [];
                for(var i = 0; i < arr.length; i++) {
                    arr[i].$el.parents(".selectbox").first().hide();
                }
                if(context.skuMode) er.hide()
                else er.show();

            };

            where.updateForPossibleRows = function(context, possibleRows) {
                where.updateImage(context, possibleRows);
                where.buildRetailerList(context, possibleRows);
                checkForLonelyOptions(context);
            };

            where.updateButtonLink = function (context, url) {
                var $button = context.wrapper.find(".wtb-button");

                if(context.skuMode) {
                    $button.attr("target", "").attr("href", "#").removeClass("no-retailer");
                } else {
                    if(url != null) $button.attr("target", "_blank").attr("href", url).removeClass("no-retailer");
                    else $button.attr("target", "").attr("href", "#").addClass("no-retailer");            
                }

                if (!context.skuMode) {
                    checkForLonelyOptions(context);
                }
            };

        });


    };

    var checkEmptyRetailers = function(context) {
        if (context.skuMode && context.lastSku) return;
		if($(".selection-type-retailers .selectricHideSelect option").length == 0) {
            context.wrapper.find('.retailers-entry, .select-label.retailers').hide();
            context.wrapper.find('.retailer-coming-soon').removeClass('hidden');
            context.wrapper.find('.order-button').addClass('unavailable');
            return;
        } else {
            context.wrapper.find('.retailers-entry, .select-label.retailers').show();
            context.wrapper.find('.retailer-coming-soon').addClass('hidden');
            context.wrapper.find('.order-button').removeClass('unavailable');
        }
    }

    var sortFields = function(context) {
        var obj = context.config.data.wtb;

        var bundleOrder = ["x", "digital-standard", "standard"];
        var platformOrder = ["x", "ps4", "xboxone", "pc"];

        var getSorter = function(arr) {
            var index = function(o) {
                return arr.indexOf(o.id) || 100;
            };
            return function(a, b) {
                return index(a) - index(b);
            };
        };

        obj.bundles.sort(getSorter(bundleOrder));
        obj.platforms.sort(getSorter(platformOrder));
    };

    var sortRows = function(context) {
        var rows = context.config.data.wtb.rows;

        for(var i = 0; i < rows.length; i++) {
            rows[i].initialIndex = i;
        }

        rows.sort(function(a, b) {
            if(a.bundles == "standard" && b.bundles == "standard") {
                return a.retailer.name > b.retailer.name ? 1 : -1;
            }
            return a.initialIndex > b.initialIndex ? 1 : -1;
        });
    };

    wtb.refreshSelectBox = function(context, $el) {
        $(function() {
            $el.selectric("refresh");
            if ($el.parents('.editions-entry').length) {
                filterPlatforms(context);
            }
        });
    };

    wtb.getCurrentEdition = function(context) {
        var con = context || where.getContext($(".atvi-wheretobuy"));
        return con.status.bundles ? con.status.bundles.replace(/ /g, "-") : "";
    };

    wtb.filterSpecialBundles = function(context, $el) {
        if ($el && $el.hasClass('empty')) return;
		var rows = context.config.data.wtb.rows,
            bundles = context.listsObj.bundles[0].elems,
            options = context.wrapper.find('.editions-entry .selectricItems li'),
            i;
        options.removeClass('hidden');
        for (i = 0; i < bundles.length; i++) {
			var thisBundle = bundles[i].id,
                thisRegion = context.status.regions || context.config.opts.defaults.regions,
                newBundleArr;
            newBundleArr = $.grep(rows, function(item, j) {
				return (item.regions == thisRegion && item.bundles == thisBundle);
            });
            if (newBundleArr.length) continue;
            else {
				var targetOption;
                targetOption = options.filter(function() {
					return $(this).find('span').data('option-item-id') == thisBundle;
                });
                if (targetOption.length) targetOption.addClass('hidden');
            }
        }
    };

    var filterPlatforms = function(context) {
        var currentEdition = wtb.getCurrentEdition(context),
            platformsEls = $('.platforms-entry .selectricItems li'),
            obj = badCombos,
            targetEditions = wtb.getEditionsToFilter(obj),
            i, j;

        if (!obj.length) return;

        for (i = 0; i < targetEditions.length; i++) {
            if (currentEdition == targetEditions[i]) {
                for (j = 0; j < obj.length; j++) {
                    if (obj[j].edition == currentEdition) {
                        platformsEls.removeClass('hidden').each(function() {
                            var thisEl = $(this),
                                thisPlatform = thisEl.text().toLowerCase().replace(/\W+/g, " ").trim();
                            if (thisPlatform.indexOf('playstation') > -1) {
                                if (thisPlatform.indexOf('4') > -1) thisPlatform = 'ps4';
                            }
                            if (thisPlatform.indexOf('xbox one') > -1) thisPlatform = 'xbox one';
                            if (obj[j].platforms.indexOf(thisPlatform) > -1) {
                                thisEl.addClass('hidden');
                            }
                        });
                    } 
                }
                return false;
            } else {
                platformsEls.removeClass('hidden');
            }
        }
    };

    var checkForLonelyOptions = function(context) {
        var obj = context.listsObj;

        $.each(obj, function() {
            var thisNode = $(this),
                fieldName = thisNode[0].field,
                elems = thisNode[0].elems,
                len = thisNode[0].elems.length;

            if (fieldName === 'retailers' && len === 1) {
                var url = context.listsObj.retailers[0].elems[0].id,
                    selectWrapper = context.wrapper.find('.select-label.retailers').next('.selectricWrapper');

                selectWrapper.find('select').prop('selectedIndex', 1).selectric('refresh');
                wtb.updateButtonLonelyRetailer(context, url);
            }
        });
    };

    wtb.updateButtonLonelyRetailer = function(context, url) {
		var $button = context.wrapper.find(".wtb-button");

        if(context.skuMode) {
            $button.attr("target", "").attr("href", "#").removeClass("no-retailer");
        } else {
            if(url != null) $button.attr("target", "_blank").attr("href", url).removeClass("no-retailer");
            else $button.attr("target", "").attr("href", "#").addClass("no-retailer");            
        }
    };

    wtb.getEditionsToFilter = function(obj) {
        var filteredArray = [];
        if (obj) {
            $.each(obj, function() {
                filteredArray.push($(this)[0].edition);
            });
            return filteredArray;
        }
    };


    wtb.basicInit();

})(jQuery, BO4);
