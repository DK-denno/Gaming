/*! Selectric ϟ v1.8.5 (2014-10-02) - git.io/tjl9sQ - Copyright (c) 2014 Leonardo Santos - Dual licensed: MIT/GPL */
!function(e){"use strict";var t="selectric",s="Input Items Open Disabled TempShow HideSelect Wrapper Hover Responsive Above Scroll",i=".sl",o={onChange:function(t){e(t).change()},maxHeight:300,keySearchTimeout:500,arrowButtonMarkup:'<b class="button">&#x25be;</b>',disableOnMobile:!0,openOnHover:!1,expandToItemText:!1,responsive:!1,preventWindowScroll:!0,inheritOriginalWidth:!1,customClass:{prefix:t,postfixes:s,camelCase:!0},optionsItemBuilder:"{text}"},n={add:function(e,t,s){this[e]||(this[e]={}),this[e][t]=s},remove:function(e,t){delete this[e][t]}},a={replaceDiacritics:function(e){for(var t="40-46 50-53 54-57 62-70 71-74 61 47 77".replace(/\d+/g,"\\3$&").split(" "),s=t.length;s--;)e=e.toLowerCase().replace(RegExp("["+t[s]+"]","g"),"aeiouncy".charAt(s));return e},format:function(e){var t=arguments;return(""+e).replace(/{(\d+|(\w+))}/g,function(e,s,i){return i&&t[1]?t[1][i]:t[s]})},nextEnabledItem:function(e,t){for(;e[t=(t+1)%e.length].disabled;);return t},previousEnabledItem:function(e,t){for(;e[t=(t>0?t:e.length)-1].disabled;);return t},toDash:function(e){return e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()},triggerCallback:function(s,i){var o=i.element,l=i.options["on"+s];e.isFunction(l)&&l.call(o,o,i),n[s]&&e.each(n[s],function(){this.call(o,o,i)}),e(o).trigger(t+"-"+a.toDash(s),i)}},l=e(document),r=e(window),c=function(n,c){function d(t){if($.options=e.extend(!0,{},o,$.options,t),$.classes={},$.element=n,a.triggerCallback("BeforeInit",$),$.options.disableOnMobile&&L)return void($.disableOnMobile=!0);C(!0);var i=$.options.customClass,l=i.postfixes.split(" "),r=R.width();e.each(s.split(" "),function(e,t){var s=i.prefix+l[e];$.classes[t.toLowerCase()]=i.camelCase?s:a.toDash(s)}),x=e("<input/>",{"class":$.classes.input,readonly:L}),k=e("<div/>",{"class":$.classes.items,tabindex:-1}),T=e("<div/>",{"class":$.classes.scroll}),D=e("<div/>",{"class":i.prefix,html:$.options.arrowButtonMarkup}),y=e('<p class="label"/>'),I=R.wrap("<div>").parent().append(D.prepend(y),k,x),A={open:v,close:m,destroy:C,refresh:u,init:d},R.on(A).wrap('<div class="'+$.classes.hideselect+'">'),e.extend($,A),$.options.inheritOriginalWidth&&r>0&&I.width(r),p()}function p(){$.items=[];var s=R.children(),o="<ul>",n=s.filter(":selected").index();H=S=~n?n:0,(E=s.length)&&(s.each(function(t){var s=e(this),i=s.html(),n=s.prop("disabled"),l=$.options.optionsItemBuilder;$.items[t]={value:s.val(),text:i,slug:a.replaceDiacritics(i),disabled:n},o+=a.format('<li class="{1}">{2}</li>',e.trim([t==H?"selected":"",t==E-1?"last":"",n?"disabled":""].join(" ")),e.isFunction(l)?l($.items[t],s,t):a.format(l,$.items[t]))}),k.append(T.html(o+"</ul>")),y.html($.items[H].text)),D.add(R).add(I).add(x).off(i),I.prop("class",[$.classes.wrapper,R.prop("class").replace(/\S+/g,t+"-$&"),$.options.responsive?$.classes.responsive:""].join(" ")),R.prop("disabled")?(I.addClass($.classes.disabled),x.prop("disabled",!0)):(j=!0,I.removeClass($.classes.disabled).on("mouseenter"+i+" mouseleave"+i,function(t){e(this).toggleClass($.classes.hover),$.options.openOnHover&&(clearTimeout($.closeTimer),"mouseleave"==t.type?$.closeTimer=setTimeout(m,500):v())}),D.on("click"+i,function(e){Y?m():v(e)}),x.prop({tabindex:q,disabled:!1}).on("keypress"+i,h).on("keydown"+i,function(e){h(e),clearTimeout($.resetStr),$.resetStr=setTimeout(function(){x.val("")},$.options.keySearchTimeout);var t=e.keyCode||e.which;t>36&&41>t&&b(a[(39>t?"previous":"next")+"EnabledItem"]($.items,S))}).on("focusin"+i,function(e){x.one("blur",function(){x.blur()}),Y||v(e)}).on("oninput"in x[0]?"input":"keyup",function(){x.val().length&&e.each($.items,function(e,t){return RegExp("^"+x.val(),"i").test(t.slug)&&!t.disabled?(b(e),!1):void 0})}),R.prop("tabindex",!1),O=e("li",k.removeAttr("style")).click(function(){return b(e(this).index(),!0),!1})),a.triggerCallback("Init",$)}function u(){a.triggerCallback("Refresh",$),p()}function h(e){var t=e.keyCode||e.which;13==t&&e.preventDefault(),/^(9|13|27)$/.test(t)&&(e.stopPropagation(),b(S,!0))}function f(){var e=k.closest(":visible").children(":hidden"),t=$.options.maxHeight;e.addClass($.classes.tempshow);var s=k.outerWidth(),i=D.outerWidth()-(s-k.width());!$.options.expandToItemText||i>s?W=i:(k.css("overflow","scroll"),I.width(9e4),W=k.width(),k.css("overflow",""),I.width("")),k.width(W).height()>t&&k.height(t),e.removeClass($.classes.tempshow)}function v(s){a.triggerCallback("BeforeOpen",$),s&&(s.preventDefault(),s.stopPropagation()),j&&(f(),e("."+$.classes.hideselect,"."+$.classes.open).children()[t]("close"),Y=!0,B=k.outerHeight(),M=k.height(),x.val("").is(":focus")||x.focus(),l.on("click"+i,m).on("scroll"+i,g),g(),$.options.preventWindowScroll&&l.on("mousewheel"+i+" DOMMouseScroll"+i,"."+$.classes.scroll,function(t){var s=t.originalEvent,i=e(this).scrollTop(),o=0;"detail"in s&&(o=-1*s.detail),"wheelDelta"in s&&(o=s.wheelDelta),"wheelDeltaY"in s&&(o=s.wheelDeltaY),"deltaY"in s&&(o=-1*s.deltaY),(i==this.scrollHeight-M&&0>o||0==i&&o>0)&&t.preventDefault()}),I.addClass($.classes.open),w(S),a.triggerCallback("Open",$))}function g(){f(),I.toggleClass($.classes.above,I.offset().top+I.outerHeight()+B>r.scrollTop()+r.height())}function m(){if(a.triggerCallback("BeforeClose",$),H!=S){a.triggerCallback("BeforeChange",$);var e=$.items[S].text;R.prop("selectedIndex",H=S).data("value",e),y.html(e),a.triggerCallback("Change",$)}l.off(i),I.removeClass($.classes.open),Y=!1,a.triggerCallback("Close",$)}function b(e,t){$.items[e].disabled||(O.removeClass("selected").eq(S=e).addClass("selected"),w(e),t&&m())}function w(e){var t=O.eq(e).outerHeight(),s=O[e].offsetTop,i=T.scrollTop(),o=s+2*t;T.scrollTop(o>i+B?o-B:i>s-t?s-t:i)}function C(e){j&&(k.add(D).add(x).remove(),!e&&R.removeData(t).removeData("value"),R.prop("tabindex",q).off(i).off(A).unwrap().unwrap(),j=!1)}var x,k,T,D,y,I,O,S,H,B,M,W,E,A,$=this,R=e(n),Y=!1,j=!1,L=/android|ip(hone|od|ad)/i.test(navigator.userAgent),q=R.prop("tabindex");d(c)};e.fn[t]=function(s){return this.each(function(){var i=e.data(this,t);i&&!i.disableOnMobile?""+s===s&&i[s]?i[s]():i.init(s):e.data(this,t,new c(this,s))})},e.fn[t].hooks=n}(jQuery);
var WWII = WWII || {};
WWII.wtbmodule =  {};

(function($, WWII) {

    var wtb = WWII.wtbmodule,
        where = ATVI.components.wheretobuy;

    var badCombos = [

    ];

    wtb.basicInit = function() {

        ATVI.library.withDependency("wheretobuy", function() {

            where.onSelectboxCreate = function(context, $el, listObj) {
                $(function() {
                    $el.selectric({ 
                        disableOnMobile: false,
                        onRefresh: function() {
                            filterPlatforms();
                        }
                    });

                    checkForLonelyOptions(context);
                    checkUrlEdition();
                });

            };

            where.onStatusUpdate = function(con, f) {
                if (f != 'bundles') return;
            };

            where.onSelectboxUpdate = function(context, $el, listObj) {
                wtb.refreshSelectBox(context, $el);
            };

            where.processSelectionList = function(context, field, arr) {
                if(!context.fieldsSorted) {
                    context.fieldsSorted = true;
                    sortFields(context);
                    sortRows(context);
                }
            };

/*
            where.onPopulatedRetailers = function(context) {
                var arr = context.listsObj.retailers || [];

                for(var i = 0; i < arr.length; i++) {
                    arr[i].$el.parents(".selectbox").first().show();
                }

                context.wrapper.find(".empty-retailers").hide();
            };
*/
            ////////
            where.onPopulatedRetailers = function(context) {
				var arr = context.listsObj.retailers || [];

                if (arr[0].elems[0].id === '#unavailable') {
					context.wrapper.find('.wtb-select.retailers-entry').hide();
                    context.wrapper.find('.wtb-select.retailer-coming-soon').removeClass('hidden');
                    context.wrapper.find('.order-button').addClass('unavailable');
                    return;
                } else {
					context.wrapper.find('.wtb-select.retailers-entry').show();
					context.wrapper.find('.wtb-select.retailer-coming-soon').addClass('hidden');
                    context.wrapper.find('.order-button').removeClass('unavailable');
                }

        		for(var i = 0; i < arr.length; i++) {
            		arr[i].$el.parents(".selectbox").first().show();
        		}
        		context.wrapper.find(".empty-retailers").hide();
            };

            where.onEmptyRetailers = function(context) {

                if(!context.wrapper.find('.wtb-select.retailer-coming-soon').hasClass('hidden')) {
					context.wrapper.find('.wtb-select.retailers-entry').show();
					context.wrapper.find('.wtb-select.retailer-coming-soon').addClass('hidden');
                    context.wrapper.find('.order-button').removeClass('unavailable'); 
                } else context.wrapper.find('.wtb-select.retailers-entry').hide();

                var er = context.wrapper.find('.empty-retailers');
                if(!er.length) return;
                var arr = context.listsObj.retailers || [];
                for(var i = 0; i < arr.length; i++) {
                    arr[i].$el.parents(".selectbox").first().hide();
                }
                if(context.skuMode) er.hide()
                else er.show();
            };
            //////////////////////////

            where.updateForPossibleRows = function(context, possibleRows) {
                where.updateImage(context, possibleRows);
                where.buildRetailerList(context, possibleRows);
                checkForLonelyOptions(context);
            };

            $(setupInitialValues);
        });

        //$(setupAnalytics);

    };

    var sortFields = function(context) {
        var obj = context.config.data.wtb;

        var bundleOrder = ["x", "digital-deluxe", "digital-standard", "standard", "pro-edition"];
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
            updateEditionsDescriptions($el);
            if ($el.parents('.selection-type-bundles').length) {
                filterPlatforms();
            }
        });
    };

    wtb.getCurrentEdition = function() {
        var con = where.getContext($(".atvi-wheretobuy"));
        return con.status.bundles.replace(/ /g, "-");
    };

    var filterPlatforms = function() {
        var currentEdition = wtb.getCurrentEdition(),
            platformsEls = $('.selection-type-platforms .selectricItems li'),
            obj = badCombos,
            targetEditions = wtb.getEditionsToFilter(obj),
            i, j;

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
                var url = context.listsObj.retailers[0].elems[0].id;

                context.wrapper.find('.retailers-entry select').prop('selectedIndex', 1).selectric('refresh');

                where.updateButtonLink(context, url);
            }
        });
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

    var updateEditionsDescriptions = function($el) {
        var target = wtb.getCurrentEdition(),
            editionsSet1 = $('.buy-column-two .edition-container'),
            editionsSet2 = $('.buy-bottom-inner .edition-container'),
            platformsEls = $('.selection-type-platforms .selectricItems li');

        if (target) {
            editionsSet1.each(function() {
                var editionId = $(this).data('edition'),
                    thisEdition = $(this);
                if (target === editionId) {
                    //if (thisEdition.parent().is(':hidden')) return;
                    if (thisEdition.hasClass('visible')) return;
                    editionsSet1.removeClass('visible');
                    thisEdition.addClass('visible');
                    $(".disclaimer-container").removeClass('visible');
                    $(".disclaimer-container[data-edition='" + editionId + "']").addClass('visible');
                }
            });
            editionsSet2.each(function() {
                var editionId = $(this).data('edition'),
                    thisEdition = $(this);
                if (target === editionId) {
                    //if (thisEdition.parent().is(':hidden')) return;
                    if (thisEdition.hasClass('visible')) return;
                    editionsSet2.removeClass('visible');
                    thisEdition.addClass('visible');
                    $(".disclaimer-container").removeClass('visible');
                    $(".disclaimer-container[data-edition='" + editionId + "']").addClass('visible');
                }
            });
        } else return;
    };

    var setupInitialValues = function() {
        var values = getTargetingValues() || {};

        var qPlatform = ATVI.utils.getQueryParameter("platform");
        var qBundle = ATVI.utils.getQueryParameter("bundle");

        if(qPlatform) values.platforms = qPlatform;
        if(qBundle) values.bundles = qBundle;

        $(".atvi-wheretobuy").each(function() {
            setInitialValues($(this), values);
        });
    };

    var getTargetingValues = function() {
        if(!window.WWII || !WWII.targeting) return;
        if(!WWII.targeting.isTargeted()) return;

        var values = {};
        var pp = WWII.targeting.getPrimaryPlatform();
        //if(pp == "xbl") values.platforms = "xboxone";
        /*if(pp == "psn")*/ values.platforms = "ps4"; 

        return values;
    };

    var setInitialValues = function($el, values) {
        var con = ATVI.components.wheretobuy.getContext($el);
        ATVI.components.wheretobuy.useValues(con, values);
    };

    var checkUrlEdition = function() {
        if(window.location.search.length) {
            if(window.location.search.indexOf("digital-deluxe") > 0) {
                $(".selection-type-bundles .selectricItems .selectricScroll ul li:eq(2)").click();
            }
            else if(window.location.search.indexOf("digital-standard") > 0) {
                $(".selection-type-bundles .selectricItems .selectricScroll ul li:eq(3)").click();
            }
            else if(window.location.search.indexOf("standard") > 0) {
                $(".selection-type-bundles .selectricItems .selectricScroll ul li:eq(4)").click();
            } 
            else if(window.location.search.indexOf("pro-edition") > 0) {
                $(".selection-type-bundles .selectricItems .selectricScroll ul li:eq(5)").click();
            }
            else if(window.location.search.indexOf("seasonpass") > 0) {
                $(".selection-type-bundles .selectricItems .selectricScroll ul li:eq(1)").click();
            }
            else if(window.location.search.indexOf("dlc1") > 0) {
                $(".selection-type-bundles .selectricItems .selectricScroll ul li:eq(0)").click();
            }
        } 
    };

})(jQuery, WWII);


// hub news json
var HUB = HUB || {};
HUB.newsJson = {};

(function($, HUB) {

    var locales = {

        "US" : "en",
        "UK" : "en_gb",
        "CA" : "en_ca",
        "AU" : "en_au",
        "FR" : "fr",
        "ES" : "es",
        "IT" : "it",
        "DE" : "de",
        "MX" : "es_mx",
        "NZ" : "en_nz",
        "BR" : "pt_br",
        "SE" : "sv",
        "NL" : "nl",
        "DK" : "da",
        "NO" : "no",
        "FI" : "fi",
        "RU" : "ru",
        "PL" : "pl",
        "JA" : "ja",
        "AR" : "ar",
        "CN" : "zh_cn",
        "TW" : "zh_tw",
        "KO" : "ko",
        "BE" : "nl_be",
        "IS" : "is",
        "ZA" : "en_za",
        "PT" : "pt"

    };

    var init = function() {

        getLocaleCode();

    };

    var getLocaleCode = function() {

        var classes, locale, code;

        var timer = setInterval(function() {

            var flag = $(".atvi-instrument-locale-menu-button");

            if(flag.length) {

				clearInterval(timer);
				classes = $(".atvi-instrument-locale-menu-button").attr("class").split(/\s/);

                locale = classes[classes.length - 1];
                code = locales[locale];

                //load json once locale code has been determined
                loadJson(code);

            }

        }, 10);

    };

    var loadJson = function(code) {

		var path = "/content/atvi/callofduty/call-of-duty-news/web/" + code + "/news-touts.js";

        $.getJSON(path, function(result){

            var data = result;

            HUB.newsJson.data = data;

            $("body").trigger("newsJson");

        });
 
    };

	$(init);

})(jQuery, HUB);


// hub-hero
var HUB = HUB || {};
HUB.homeHero = {};

(function($, HUB) {

    var desktopMode = true;
	var curSlide;
	
    var init = function() {
		console.log("init hero");
        //HUB.homeCountdown.init();
        detectMode();
        initHero();
        initIntel();
    };

    var detectMode = function() {
		if(window.innerWidth >= 1024) {
            if(!desktopMode) desktopMode = true;
        } else {
            if(desktopMode) desktopMode = false;
        }
    };

    var initIntel = function() {

        $(".intel-container").click(function() {

			var url = $(this).find("a").attr("href");
            window.open(url, "_self");

        });

    };

    var initHero = function() {

        COD.news.get(function(res) {

			var totalNews = HUB.homeHero.data = res;
            var selectedNews = HUB.homeHero.selected;

            var $dContainer = $(".hero.desktop .hero-images");
			
            for(var i = 0; i < selectedNews.length; i++) {

                var prop = selectedNews[i].trim();

				var entryObj = res[prop];
                if(entryObj) createFullTout(entryObj);
            }
			
			creationComplete();
        });

    };

    var createFullTout = function(obj) {

		//is tout a video
		var videoProp = "";
        var isVideo = false;
        if(obj.youtubeId != "") {
            videoProp = "video-tout";
            isVideo = true;
        }

		//does video tout play inline
        var ctaPlayInline = "";
		var playInline = false;
        if(obj.ctaPlayInline == "yes") {
			ctaPlayInline = "playinline-cta";
			playInline = true;
		}
		
		//does custom inner cta play inline video. only applies to hero
		var heroCustomCtaPlayInline = "";
		var customCtaPlayInline = false;
        if(obj.codHubHeroCtaPlayInline == "yes") {
			heroCustomCtaPlayInline = "custom-playinline";
			customCtaPlayInline = true;
		}

        //custom hero?
        var customHero = false;
        var customHeroTag = "";
        if(obj.heroCustomImgSrc != "" || obj.heroCustomText != "") {
        	customHero = true;
            customHeroTag = "custom-hero";
        }
		
        //start desktop hero touts ///////////////////////////////////////////////////////////////////////

        var dToutTemplate = "";

        dToutTemplate += "<div class='hero-tout home-tout " + videoProp + " " + obj.toutType + " " + obj.newEntry + "'>"; //full-hero-tout

            if(obj.newEntry != "" || obj.newEntry == "old") dToutTemplate += "<div class='new-tag'><p>" + obj.newEntryText + "</p></div>";
            dToutTemplate += "<div class='tout-icon'></div>";
            dToutTemplate += "<div class='tout-overlay'></div>";
            dToutTemplate += "<div class='tout-category'>" + obj.subHeadline + "</div>";
            dToutTemplate += "<div class='tout-title'><h3>" + obj.headline + "</h3></div>";

        	if(isVideo && playInline) {
            	dToutTemplate += "<div class='tout-cta playinline-cta'><a href='#' data-ytid='" + obj.youtubeId + "'>" + obj.ctaLabel + "</a></div>";
            }
        	else {
                if(obj.ctaLabel != "") {
            		dToutTemplate += "<div class='tout-cta'><a href='" + obj.ctaLink + "'>" + obj.ctaLabel + "</a></div>";
            	}
        	}

        dToutTemplate += "</div>";

        $(".hero.desktop .hero-touts").append(dToutTemplate);
		
		//end desktop hero touts ///////////////////////////////////////////////////////////////////////
		
		//start desktop hero slides ///////////////////////////////////////////////////////////////////////
    
        var dHeroSlideTemplate = "";

        if(!isVideo) {
			dHeroSlideTemplate += "<div class='hero-img " + customHeroTag + "' style='background: url(" + obj.desktopHeroImgSrc + ") center center no-repeat; background-size: cover;'>";
				if(customHero) {
					dHeroSlideTemplate += "<div class='hero-custom-inner'>";
						if(obj.heroCustomImgSrc != "") dHeroSlideTemplate += "<div class='hero-custom-img'><img src='" + obj.heroCustomImgSrc + "' alt='' /></div>";
                    	if(obj.heroCustomText2 != "")   dHeroSlideTemplate += "<div class='hero-custom-text-mid'>" + obj.heroCustomText2 + "</div>";
						if(obj.heroCustomText != "")   dHeroSlideTemplate += "<div class='hero-custom-text'>" + obj.heroCustomText + "</div>";
					dHeroSlideTemplate += "</div>";
				} else {
                    if(obj.ctaLabel != "") {
            			dToutTemplate += "<div class='tout-cta'><a href='" + obj.ctaLink + "'>" + obj.ctaLabel + "</a></div>";
            		}
				}

			dHeroSlideTemplate += "</div>";
        }
        else {

			dHeroSlideTemplate = "<div class='hero-img video " + customHeroTag + "' data-ytid='" + obj.youtubeId + "' style='background: url(" + obj.desktopHeroImgSrc + ") center center no-repeat; background-size: cover;'>";
				if(customHero) {
					dHeroSlideTemplate += "<div class='hero-custom-inner'>";
						if(obj.heroCustomImgSrc != "") dHeroSlideTemplate += "<div class='hero-custom-img'><img src='" + obj.heroCustomImgSrc + "' alt='' /></div>";
                    	if(obj.heroCustomText2 != "")   dHeroSlideTemplate += "<div class='hero-custom-text-mid'>" + obj.heroCustomText2 + "</div>";
						if(obj.heroCustomText != "")   dHeroSlideTemplate += "<div class='hero-custom-text " + heroCustomCtaPlayInline + "'>" + obj.heroCustomText + "</div>";
					dHeroSlideTemplate += "</div>";
				}
			
			dHeroSlideTemplate += "</div>";
        }

        $(".hero.desktop .hero-images").append(dHeroSlideTemplate);
		
		//end desktop hero touts ///////////////////////////////////////////////////////////////////////
        
        //tablet mobile/////////////////////////////////////////////////////////////////////////////////////////////////////////////

        var mToutTemplate = "";

        mToutTemplate += "<div class='hero-tout mobile-tout home-tout " + videoProp + " " + obj.toutType + " " + obj.newEntry + " " + customHeroTag + "'>"; //start hero tout

        	mToutTemplate += "<div class='tout-media'>"; //start tout media
        		mToutTemplate += "<div class='tout-media-bg'>";
        			mToutTemplate += "<div class='hero-img bg-tablet' style='background: url(" + obj.tabletHeroImgSrc + ") center center no-repeat; background-size: cover;'></div>";
					mToutTemplate += "<div class='hero-img bg-mobile' style='background: url(" + obj.mobileHeroImgSrc + ") center center no-repeat; background-size: cover;'></div>";
        		mToutTemplate += "</div>";

        		mToutTemplate += "<div class='tout-media-content'>"; //content

                if(!isVideo) {
                    if(customHero) {
                        mToutTemplate += "<div class='hero-custom-inner'>";
                            if(obj.heroCustomImgSrc != "") mToutTemplate += "<div class='hero-custom-img'><img src='" + obj.heroCustomImgSrc + "' alt='' /></div>";
							if(obj.heroCustomText2 != "")  mToutTemplate += "<div class='hero-custom-text-mid'>" + obj.heroCustomText2 + "</div>";
                        	if(obj.heroCustomText != "")   mToutTemplate += "<div class='hero-custom-text'>" + obj.heroCustomText + "</div>";
                        mToutTemplate += "</div>";
                    } else {
                        if(obj.ctaLink != "") {
                        	mToutTemplate += "<a href='" + obj.ctaLink + "'></a>";
                        }
                    }
                    
                }
                else { 
                    
                    mToutTemplate += "<div class='m-video-container'><div class='m-hero-video-close'>+</div>" + obj.videoHtml + "</div>";
    
                    mToutTemplate += "<div class='hero-img video' data-ytid='" + obj.youtubeId + "'>";
                        if(customHero) {
                            mToutTemplate += "<div class='hero-custom-inner'>";
                                if(obj.heroCustomImgSrc != "") mToutTemplate += "<div class='hero-custom-img'><img src='" + obj.heroCustomImgSrc + "' alt='' /></div>";
								if(obj.heroCustomText2 != "")  mToutTemplate += "<div class='hero-custom-text-mid'>" + obj.heroCustomText2 + "</div>";
                            	if(obj.heroCustomText != "")   mToutTemplate += "<div class='hero-custom-text " + heroCustomCtaPlayInline + "'>" + obj.heroCustomText + "</div>";
                            mToutTemplate += "</div>";
                        }
                
                    mToutTemplate += "</div>"; //end content
                }

        		mToutTemplate += "</div>";
    
        	mToutTemplate += "</div>"; //end tout media


        	mToutTemplate += "<div class='tout-info'>"; //start tout info
				if(obj.newEntry != "") mToutTemplate += "<div class='new-tag'><p>" + obj.newEntryText + "</p></div>";
				mToutTemplate += "<div class='tout-icon'></div>";
				mToutTemplate += "<div class='tout-category'>" + obj.subHeadline + "</div>";
				mToutTemplate += "<div class='tout-title'><h3>" + obj.headline + "</h3></div>";
	
    			if(isVideo && playInline) {
        			mToutTemplate += "<div class='tout-cta playinline-cta'><a href='#' data-ytid='" + obj.youtubeId + "'>" + obj.ctaLabel + "</a></div>";
                }
    			else { 
                    if(obj.ctaLabel != "") {
        				mToutTemplate += "<div class='tout-cta'><a href='" + obj.ctaLink + "'>" + obj.ctaLabel + "</a></div>";
                    }
         		} 
	
			mToutTemplate += "</div>"; //end tout info

		mToutTemplate += "</div>"; //end hero tout
    
        $(".hero.mobile").append(mToutTemplate);
		
		//end mobile////////////////////////////////////////////////////////////////////////////

    }

    /**************** 4-2018 Test ******************************/

    var initTest6202018 = function() {

        /*if($(".hero-images").hasClass("test-1b")) {
                
            $(".hero-images .hero-img:eq(0)").attr("style", "background: url(/content/dam/atvi/callofduty/cod-news/hero-images/cod-bo4-tout-zombies.jpg) center center no-repeat; background-size: cover;"); 
            $(".hero.mobile .hero-tout:eq(0) .bg-tablet").attr("style", "background: url(/content/dam/atvi/callofduty/cod-news/hero-images/cod-bo4-tout-zombies-mobile.jpg) center center no-repeat; background-size: cover;"); 
            $(".hero.mobile .hero-tout:eq(0) .bg-mobile").attr("style", "background: url(/content/dam/atvi/callofduty/cod-news/hero-images/cod-bo4-tout-zombies-mobile.jpg) center center no-repeat; background-size: cover;");
        }*/
        
        if($(".hero-images").hasClass("test-2b")) {
            
			$(".hero-images .hero-img:eq(1)").attr("style", "background: url(/content/dam/atvi/callofduty/cod-news/hero-images/cod-bo4-tout-mp.jpg) center center no-repeat; background-size: cover;"); 
            $(".hero.mobile .hero-tout:eq(1) .bg-tablet").attr("style", "background: url(/content/dam/atvi/callofduty/cod-news/hero-images/cod-bo4-tout-mp-mobile.jpg) center center no-repeat; background-size: cover;"); 
            $(".hero.mobile .hero-tout:eq(1) .bg-mobile").attr("style", "background: url(/content/dam/atvi/callofduty/cod-news/hero-images/cod-bo4-tout-mp-mobile.jpg) center center no-repeat; background-size: cover;");
            
        }

        if($(".hero-images").hasClass("test-3b")) {
            
			$(".hero-images .hero-img:eq(1)").attr("style", "background: url(/content/dam/atvi/callofduty/cod-news/hero-images/cod-bo4-tout-pc.jpg) center center no-repeat; background-size: cover;"); 
            $(".hero.mobile .hero-tout:eq(1) .bg-tablet").attr("style", "background: url(/content/dam/atvi/callofduty/cod-news/hero-images/cod-bo4-tout-pc-mobile.jpg) center center no-repeat; background-size: cover;"); 
            $(".hero.mobile .hero-tout:eq(1) .bg-mobile").attr("style", "background: url(/content/dam/atvi/callofduty/cod-news/hero-images/cod-bo4-tout-pc-mobile.jpg) center center no-repeat; background-size: cover;");
            
        }

    }

    /****************HTML5 VIDEO MODE FUNCTIONS*****************/

    var initHTML5Video = function () {

		var $desktopSlide = $(".desktop .hero-images-container .hero-images .hero-img").eq(2);
        var $mobileTout = $(".mobile .mobile-tout").eq(2).find(".tout-media-bg");


		//check if the hero is html5 mode
        if ($(".hero-container").hasClass("html5-video-mode")) {
			loadVideoTemplate($desktopSlide, $mobileTout);

        }

    }

    var loadVideoTemplate = function ($desktopContext, $mobileContext) {

        var videoDesktopTemplate = "";
        var videoMobileTemplate = "";
        var videoOptions = "playsinline autoplay muted preload"
        var posterDesktop = "/content/dam/atvi/callofduty/cod-news/hero/cod-hub-tout-blitzkrieg-web-v2.jpg";
        var posterMobile = "/content/dam/atvi/callofduty/cod-news/hero/cod-hub-tout-blitzkrieg-mobile-v2.jpg";

        //video sources for desktop/mobile

        var desktopVideo = "https://www.activision.com/cdn/videos/blitzkrieg-1900-500.mp4";
        var mobileVideo = "https://www.activision.com/cdn/videos/blitzkrieg-800-450.mp4";

		//build video template
        videoDesktopTemplate = "<video" + " " + videoOptions + " " + "poster='" + posterDesktop +"'><source src='" + desktopVideo + "'type='video/mp4'" + "></video>"
		mobileDesktopTemplate = "<video" +" " + videoOptions + " " + "loop" +" " + "poster='" + posterMobile +"'><source src='" + mobileVideo + "'type='video/mp4'" + "></video>"

        //append to first carousel slide and first hero tout
		$desktopContext.prepend(videoDesktopTemplate);
        $mobileContext.prepend(mobileDesktopTemplate);

        //add html5-video class to hero-tout
        $(".desktop .hero-tout").filter(":eq(2)").addClass("html5-video");

        //mobile style adjustments
        $(".mobile .mobile-tout").filter(":eq(2)").find(".tout-media-bg").css("overflow","hidden");
        $(".mobile .mobile-tout").filter(":eq(2)").find(".tout-media-bg video").css("width", "100%");
		$(".mobile .mobile-tout").filter(":eq(2)").find(".tout-media-bg .hero-img").hide();

    }

    /************END HTML5 VID MODE FUNCTIONS*******************/




    var creationComplete = function() {

		//initHTML5Video();
		initTest6202018(); 
		initDesktopHeroCarousel();
		initMobileHeroTouts();
        initEqualHeroToutHeights();
        initAnimation();
        //initCustomHeroText();
        //HUB.homeCountdown.init();
        resize();

    };

    var timerInterval;

    var initDesktopHeroCarousel = function() {

        var $heroVideo = $(".hero.desktop .hero-video");

        var $heroImgs = $(".hero.desktop .hero-img");
        $heroImgs.filter(":eq(0)").addClass("active"); //init first hero img

        var $touts = $(".hero.desktop .hero-tout");
        $touts.filter(":eq(0)").addClass("active"); //init first tout

        //Auto rotate

        var transitionSeconds = 5000;
        //var timerInterval;

        function initRotation() {

			timerInterval = setInterval(function() {

                //touts
                var $curSlide = $touts.filter(".active");
                var $nextSlide = $curSlide.next(".hero-tout");
                if($nextSlide.length <= 0) $nextSlide = $touts.filter(":eq(0)");

                gotoHeroTout($nextSlide);

                //hero imgs
                var $curImg = $heroImgs.filter(".active");
                var $nextImg = $curImg.next(".hero-img");
                if($nextImg.length <= 0) $nextImg = $heroImgs.filter(":eq(0)");

                gotoHeroImg($nextImg);

            }, transitionSeconds);

        }

        //Tout Click
        $touts.click(function() {

            if($(this).hasClass("active") && $(this).hasClass("video-tout")) return;

            //pauses video

            $(".hero.desktop").removeClass("video-mode");
            $(".hero.desktop .hero-video-container .button.pause").click();
            //HUB.core.scrollToTarget($("body"), 0);

            if(!$(this).hasClass("active")) {
                clearInterval(timerInterval)
                var idx = $(this).index();
				gotoHeroTout($(this));
                gotoHeroImg($heroImgs.filter(":eq(" + idx + ")"));

                //give video loop attribute if in html5 video mode

                if($(this).hasClass("html5-video")){
					 $(".desktop .hero-images-container .hero-images .hero-img").eq(2).find("video").attr("loop", true);
                    $(".desktop .hero-images-container .hero-images .hero-img").eq(2).find("video")[0].play();
                }

                //initRotation();  
            }

        });

        //Desktop Close video
        $(".hero-video-close").click(function() {
			$(".hero.desktop").removeClass("video-mode");
            $(".hero.desktop .hero-video-container .button.pause").click();
             HUB.core.scrollToTarget($("body"), 0);
        });

        //Hero Video CTA Click
        var $video = $(".hero-video-container .atvi-video");
		var $videoTout = $(".hero.desktop .hero-img.video, .hero-custom-text.custom-playinline a, .hero.desktop .tout-cta.playinline-cta a"); 

        $videoTout.click(function() {

			var ytId = $(this).data("ytid");
            if(typeof ytId === 'undefined') return;
            var ag = isAgeGateDisabled(ytId);
			playDesktopHeroVideo(ytId, ag);

        });


        /*************HTML5 VIDEO MODE ROTATION*****************/

        function autoPlayRotation () {

			var $desktopSlide = $(".desktop .hero-images-container .hero-images .hero-img");
			var $heroContainer = $(".hero-container");

            if($heroContainer.hasClass("html5-video-mode")){

                $desktopSlide.each(function(){

                    if($(this).find("video").length){

                        $(this).find("video")[0].addEventListener("ended", function(event){

                            var $curSlide = $touts.filter(".active");
                            var $nextSlide = $curSlide.next(".hero-tout");
    
                            gotoHeroTout($nextSlide);
    
                            var $curImg = $heroImgs.filter(".active");
                            var $nextImg = $curImg.next(".hero-img");
    
                            gotoHeroImg($nextImg);
    
                            initRotation();
    
                        });
                    }

                });

			} else {

                //default rotation
				initRotation();
            } 

        }

        /*************END HTML5 VIDEO ROTATION******************/


        //initRotation();
        autoPlayRotation();

    };
	
	var isAgeGateDisabled = function(ytid) {
		
		var ag;
		
		for(var i = 0; i < HUB.homeHero.selected.length; i++) {

			var prop = HUB.homeHero.selected[i].trim();
			var entryObj = HUB.homeHero.data[prop];
            if(entryObj.youtubeId == ytid) {
				ag = entryObj.disableAgeGate;
            }
		}
		
		return ag;
	};

    var playDesktopHeroVideo = function(ytId, ag) {

        var $videoContainer = $(".hero.desktop .hero-video-container");

        var vidContext = ATVI.components.video.getContext($videoContainer.find(".atvi-video"));
        vidContext.cue(ytId);	

		if(ag == "istrue") {
			$videoContainer.find(".atvi-video .agegate").hide();
            $videoContainer.find(".button.play").click();
		} else {

			var cookie = ATVI.utils.getCookie("agegate");

            if(cookie == null) {
                $videoContainer.find(".atvi-video .agegate").show();
			} else {
				$videoContainer.find(".atvi-video .agegate").hide();
				$videoContainer.find(".button.play").click();
			}
		}
        
        $(".hero.desktop").addClass("video-mode");
        clearInterval(timerInterval);
        //$(".hero-custom-inner").css("display", "none");
        //HUB.core.scrollToTarget($(".hero-container"), -80);

    };

    var gotoHeroTout = function($el) {

        var $touts = $(".hero.desktop .hero-tout");
		$touts.removeClass("active");
        $el.addClass("active");

    };

    var gotoHeroImg = function($el) {

		var $heroImgs = $(".hero.desktop .hero-img");
        $heroImgs.removeClass("active");
        $el.addClass("active");

        //play video when you go to the tout
        if($el.find("video").length) {
            clearInterval(timerInterval);
            $el.find("video")[0].load();
            $el.find("video")[0].play();
        }

    };

    var initEqualHeroToutHeights = function() {

        var maxHeight = 0;
        var $touts = $(".hero.desktop .hero-tout");
        $touts.attr("style","");

        $touts.each(function(){
           if ($(this).height() > maxHeight) maxHeight = $(this).height();
        });

        $touts.height(maxHeight);

    };

    var initAnimation = function() {

		$(".hero.desktop .hero-touts").addClass("ready");

    };

    var initMobileHeroTouts = function() {

		var $mTout = $(".hero.mobile .hero-tout.video-tout");

        $mTout.find(".tout-cta.playinline-cta a, .hero-img.video").click(function(e) {

			e.preventDefault();

			var ytId = $(this).data("ytid");
            var ag = isAgeGateDisabled(ytId);

            playMobileHeroVideo($(this), ytId, ag);

        });

        //Mobile Close video
        $(".m-hero-video-close").click(function() {
			$(".hero.mobile .tout-media").removeClass("active");
            $(".hero.mobile .m-video-container .button.pause").click();
        });

    };

    var playMobileHeroVideo = function($el, ytId, ag) {

        var $parent = $el.closest(".home-tout");

        $parent.find(".m-video-container").addClass("active");
        $parent.find(".tout-media").addClass("active");

        if(ag == "istrue") {
			$parent.find(".atvi-video .agegate").hide();
            $parent.find(".button.play").click();
		} else {

			var cookie = ATVI.utils.getCookie("agegate");

            if(cookie == null) {
                $parent.find(".atvi-video .agegate").show();
			} else {
				$parent.find(".atvi-video .agegate").hide();
				$parent.find(".button.play").click();
			}
		}

    };

    var initCustomHeroText = function() {

        var $poLinks = $(".hero-tout:eq(0) a, .hero-tout:eq(2) a, .cd-inner-content");

        $poLinks.click(function(e) {

			e.preventDefault();
			e.stopImmediatePropagation();
            HUB.core.scrollToTarget($(".buy-container"), -100);

        });

    };

    var resize = function() {

        $(window).resize(function() {

			initEqualHeroToutHeights();

            if(window.innerWidth >= 1024) {
                if(!desktopMode) {
                    desktopMode = true;

                    $(".hero.mobile .m-video-container .controls .pause").click();
                }
            } else {
                if(desktopMode) {
                    desktopMode = false;

                    $(".hero-video-close").click();
                }
            }

        });

    };


    $(init);

})(jQuery, HUB);



// hub-intel
var HUB = HUB || {};
HUB.homeIntel = {};

(function($, HUB) {


    var init = function() {

        if(!$("body").hasClass("sso-logged-in")) {

			//unauthenticated

            var vI = ATVI.utils.getCookie("HUB_VISITOR");
			var date = new Date();
            var hubId = "anon-" + date.getTime() + "-" + Math.random();

            date.setDate(date.getDate() + 7);
    
            if(typeof vI === "undefined") {
                ATVI.utils.setCookie("HUB_VISITOR", hubId, date); 

                $(".intel-description .new-v").show();
                $(".intel-description .old-v").hide();
            } else {
				$(".intel-description .new-v").hide();
            	$(".intel-description .old-v").show();
            }

        } else {

            //authenticated
            $(".intel-description .new-v").hide();
            $(".intel-description .old-v").show();

        }

    };


    $(init);

})(jQuery, HUB);


// hub-news
var HUB = HUB || {};
HUB.homeNews = {};

(function($, HUB) {

    var init = function() {
		console.log("Init HUB News");
        initNews();
    };

    var initNews = function() {

        COD.news.get(function(res) {

			var totalNews = res;
            var selectedNews = HUB.homeNews.selected;

            var $container = $(".news-container .news-touts-container .news-touts-inner");
            COD.news.createNews($container, selectedNews, totalNews, function() {
				creationComplete();
            });
        });

    };

    var creationComplete = function() {
        if(window.innerWidth >= 1024) initEqualNewsToutHeights();
        loadMoreNews();
        $(window).load(function() {
			HUB.core.initHashtag("news", $(".news-container"));
        });
        //toutCustom();
        resize(); 
    };

    var toutCustom = function() {

        var $tout = $(".news-touts-inner .news-tout").filter(":eq(0)");
        $tout.find(".tout-cta a").click(function(e) {
			e.preventDefault();
            HUB.core.scrollToTarget($(".buy-container"),-100);
        });

    };

    var loadMoreNews = function() {

        var $allTouts = $(".news-tout");
        var $newsTouts = $allTouts.not(":eq(0), :eq(1), :eq(2)");
        $newsTouts.hide();

        //load more 

        var $loadMore = $(".news-load-more a");

        if($allTouts.length <= 3) $loadMore.hide();

        $loadMore.click(function(e) {

			e.preventDefault();

            $loadMore.fadeOut(function() {
				$newsTouts.fadeIn();
            });

        });

        $(window).load(function() {

			//news height
            if($(".stackla-widget").height() > $(".news-touts-container").height()) {
                $newsTouts.show();
                $loadMore.parent().hide();
            }

        });

    };

    var initEqualNewsToutHeights = function() {

        var maxHeight = 0;
        var $touts = $(".news-container .news-tout").not(":first-of-type");
        $touts.find(".tout-info").attr("style","");

        $touts.each(function(){
           if ($(this).find(".tout-info").outerHeight() > maxHeight) maxHeight = $(this).find(".tout-info").outerHeight();
        });

        $touts.find(".tout-info").outerHeight(maxHeight);

    };

    var resize = function() {

        $(window).resize(function() {

			if(window.innerWidth >= 1024) initEqualNewsToutHeights();
            else $(".news-container .news-tout .tout-info").attr("style", "");

        });

    };

    $(init);

})(jQuery, HUB);




(function($, HUB) {

    var init = function() {

        $(".order-button a").click(function() {

			var selectedEdition = $(".buy-container .editions-entry .selection-type-bundles li.selected").html();
            console.log("ORDER BUTTON CLICKED, SELECTED EDITION: " + selectedEdition);
            //mboxTrack('orderButtonClick','selectedEdition='+ selectedEdition);

			mboxTrack("buyButton","gameEdition=" + selectedEdition);
        });

    };

    $(window).load(init);

})(jQuery, HUB);



(function($, WWII) {

    var preload = function(){
		WWII.wtbmodule.basicInit();
    }

    var init = function() {

		initScroll();

        $(window).scroll(function() {

			var curScrollTop = $(window).scrollTop();
            var curWindowHeight = $(window).height();
            var headerHeight = $(".header-container").height();

            var $entry = $(".buy-container");

            if(curScrollTop >= ($entry.position().top - headerHeight - (curWindowHeight/2)) && curScrollTop <= $entry.position().top + ($entry.height() * .75)) {
                $entry.addClass("ready");
            } else {
                $entry.removeClass("ready");
            }


        });

    };

    var initScroll = function() {

        var headerHeight = $(".top-game-menu").height();

		var curScrollTop = $(window).scrollTop();
        var curWindowHeight = $(window).height();
        
        var $entry = $(".buy-container");
        
        if(curScrollTop >= ($entry.position().top - headerHeight - (curWindowHeight/2)) && curScrollTop <= $entry.position().top + ($entry.height() * .75)) {
            $entry.addClass("ready");
        } else {
            $entry.removeClass("ready");
        }

    };

	preload();

    //$(init);

})(jQuery, WWII);


 var COD = COD || {};

(function($, COD) {

	COD.news = COD.news || {};
	
    COD.news.get = function(callback) {
		var newsUrl = "/content/atvi/callofduty/call-of-duty-news/web/" + ATVI.pageLocale.toLowerCase() + "/news-touts.js";
		$.ajax({
			url: newsUrl,
			dataType: "json",
			success: function(res) {
                callback(res)
			}
		});
	}

    COD.news.createNews = function($container, selectedNews, totalNews, callback) {

		for(var i = 0; i < selectedNews.length; i++) {

            var prop = selectedNews[i].trim();
            var entryObj = totalNews[prop];
            COD.news.createEntry(entryObj, $container);
        }

        COD.news.playInlineVideos($container);
        COD.news.videoTouts($container);
        //COD.news.ageGates($container);
        callback();

    }

    COD.news.createEntry = function(obj, $container) {

        var blurbProp = "no-blurb";
        var isBlurb = false;
        if(obj.shortBlurb != "") {
            blurbProp = "";
            isBlurb = true;
        } 

        var videoProp = "";
        var isVideo = false;
        if(obj.youtubeId != "") {
            videoProp = "video-tout";
            isVideo = true;
        }

        var ctaPlayInline = "";
        if(obj.ctaPlayInline == "yes") ctaPlayInline = "playinline-cta";

        var ctaModal = "";
        if(obj.ctaModal == "yes") ctaModal = "modal-cta";

        var isCtaLink = false;
        if(obj.ctaLink != "") {
			isCtaLink = true;
        }

        var toutTemplate = "";

        toutTemplate += "<div class='news-tout home-tout " + obj.toutType + " " + blurbProp + " " + videoProp + "'>"; //full-hero-tout

        		toutTemplate += "<div class='tout-media'>";

        			//if no video
        			if(!isVideo) {
            			toutTemplate += "<div class='tout-thumbnail' style='background: url(" + obj.desktopNewsImgSrc + ") center center no-repeat; background-size: cover;'><a href='" + obj.ctaLink + "'></a></div>";
    				}
        			else {
                        toutTemplate += "<div class='tout-thumbnail video'>";
                        	toutTemplate += "<div class='tout-thumbnail-video-preview' style='background: url(" + obj.desktopNewsImgSrc + ") center center no-repeat; background-size: cover;'>";
                        	toutTemplate += "</div>";
                        	toutTemplate += "<div clss='tout-video'>" + obj.videoHtml + "</div>";
                        toutTemplate += "</div>";
                    }
 
        		toutTemplate += "</div>";
				toutTemplate += "<div class='tout-info'>";
        			toutTemplate += "<div class='tout-title'><h3>" + obj.headline + "</h3></div>";
        			if(isBlurb)   toutTemplate += "<div class='tout-description'>" + obj.shortBlurb + "</div>"; 
        			if(isCtaLink) toutTemplate += "<div class='tout-cta " + ctaPlayInline + " " + ctaModal + "'><a href='" + obj.ctaLink + "'>" + obj.ctaLabel + "</a></div>";
        			toutTemplate += "<div class='tout-expand'></div>";
				toutTemplate += "</div>";

        	toutTemplate += "</div>"; //end news-tout

        $container.append(toutTemplate); 

    }

    COD.news.videoTouts = function($container) {

		var $touts= $container.find(".video-tout");

        $touts.find(".tout-thumbnail-video-preview").click(function() {

			$(this).hide();

            var $ageGate = $(this).closest(".video-tout").find(".agegate");

            var cookie = ATVI.utils.getCookie("agegate");

            if(cookie != null && cookie.length > 5) { //if user passed agegate

                $(this).closest(".video-tout").find(".agegate").hide();
                $(this).closest(".video-tout").find(".play.button").click(); 

            } else { //if user has not passed agegate

				if($ageGate.length) { //if agegate is required but user has not passed it
                    $(this).closest(".video-tout").find(".agegate").show();
                } else if($ageGate.length <= 0) { //if agegate is not required
                    $(this).closest(".video-tout").find(".play.button").click();
                }


            }

        });


    };

    COD.news.ageGates = function($container) {

        var $newsVideos= $container.find(".atvi-video");

        $newsVideos.each(function() {

            var $ageGate = $(this).find(".atvi-agegate");
			var context = ATVI.components.agegate.getContext($ageGate);

            $ageGate.find(".submit").click(function() {

                var $video = $(this).closest(".atvi-video");

                if(context.status == "success") {
                    $video.find(".controls-container .play").click();
                }

            });

        });

    }

    COD.news.playInlineVideos = function($container) {

		var $newsVideos= $container.find(".video-tout");


        $newsVideos.find(".tout-cta.playinline-cta a").on("click", function(e) {
			e.preventDefault();

            var that = $(this).closest(".video-tout");
            that.find(".tout-thumbnail-video-preview").hide();

            if(that.find(".atvi-agegate").length) {
                var cookie = ATVI.utils.getCookie("agegate");
                if(cookie != null && cookie.length > 5) {
                    that.find(".atvi-video .controls-container .play").click();
                }
            } else {
				that.find(".atvi-video .controls-container .play").click();
            }
        });
    }


})(jQuery, COD);



