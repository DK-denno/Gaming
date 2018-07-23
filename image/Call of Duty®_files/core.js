var ATVI = ATVI || {};

(function(ATVI, $) {

    ATVI.sso = ATVI.sso || {};

    ATVI.sso.getSSO = function(callback, error) {
        callback = typeof callback === 'function' ? callback : function(ssobar) {};
        error = typeof error === 'function' ? error : function(err) {};

        if (typeof(ssobar) === 'object' && ssobar.user && ssobar.user.identities && ssobar.getLoginUrl) {
            $.extend(ATVI.sso, ssobar);
            ATVI.sso.loading = false;
            callback(ssobar);
            return;
        }

        ATVI.sso.loading = true;
        var timeout = setTimeout(function() {
            ATVI.sso.getSSO(callback, error);
        }, 500);
    };

    ATVI.sso.getUnoId = function() {
        var sso = ATVI.utils.getCookie("ACT_SSO_COOKIE");
        if (!sso) return;
        var decodedString = ATVI.utils.decodeBase64(sso);
        if (!decodedString || typeof(decodedString) !== 'string') return;
        return decodedString.split(':')[0];
    };

})(ATVI, jQuery);



// hub-fonts

(function() {

    WebFontConfig = {
        google: { families: [ 'Arvo:400,700', 'Electrolize::latin', 'Open+Sans+Condensed:300,700:latin', 'Open+Sans:300,400,700:latin' ] }
    };

    (function() {
        var wf = document.createElement('script');
        wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0]; 
        s.parentNode.insertBefore(wf, s);
    })();
})();


// hub-core

var HUB = window.HUB || {};

(function(IW, $) {

    if(HUB.core) return;
    var core = HUB.core = {};
    HUB.data = {};

	var historyPoppable, popstateHandlers = [];

    var init = function() {
		$(postload);
        preload();
    };

    var preload = function() {
		setupHistory();
    };

    var postload = function() {
        //HUB.menu.init(); 
        if(core.postloadCallback) core.postloadCallback();
    }; 


    var setupHistory = function() {
		$(window).bind("popstate", function() {
			if(!historyPoppable) return;

            popstateHandlers.forEach(function(f) { f() });

            var ls = ATVI.components.localeSelector;
            if(ls) ls.updateAll();

            // analytics
            ATVI.analytics.setupPageLoad();
        });
    };

    HUB.core.changeUrl = function(url, title, replace) {

        if(!window.history.pushState) return false;
        historyPoppable = true;

        // do url change
        if(replace) {
			history.replaceState({}, title, url);
        } else {
        	history.pushState({}, title, url);
        }
        document.title = title;

        // update components
        var ls = ATVI.components.localeSelector;
        if(ls) ls.updateAll();

    };

    HUB.core.addPopstateHandler = function(f) {
		popstateHandlers.push(f);
    };

    //helpers

    HUB.core.scrollToTarget = function($target, delta) {
		$('html, body').stop().animate({
	        'scrollTop': $target.offset().top + delta
	    }, 1000);
    };

    HUB.core.initHashtag = function(hashtag, $target) {

		var hash = window.location.hash.substring(1);

        if(hash == hashtag) {

            $('html,body').animate({
                scrollTop: $target.offset().top - 100
            }, 1000);

        }

    };

    HUB.core.translateY = function($el, posY) {

		$el.css("-webkit-transform", "translate3d(0," + posY + "px,0)");
        $el.css("-moz-transform", "translate3d(0," + posY + "px,0)");
        $el.css("-ms-transform", "translate3d(0," + posY + "px,0)");
        $el.css("-o-transform", "translate3d(0," + posY + "px,0)");
        $el.css("transform", "translate3d(0," + posY + "px,0)");

    };

    HUB.core.timeSince = function(unixDate) {

		var seconds = Math.floor(((new Date().getTime()/1000) - unixDate));
        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hrs";
        }
        interval = Math.floor(seconds / 60); 
        if (interval > 1) {
            return interval + " mins";
        }

        return Math.floor(seconds) + " seconds";

    };

    init();

})(HUB, jQuery);




// hub-window

(function($, HUB) {

    if(HUB.window) return;
    var win = HUB.window = {};

    var $window, $body, $html, state;
    var firstHandlers = [], secondHandlers = [];
    var isFirefox = !!navigator.userAgent.match(/firefox/i);
    var isIe = !!navigator.userAgent.match(/msie/i) || !!navigator.userAgent.match(/rv:11.0/i);
    var cssProps = {};

    var init = function() {
        setVars();
        setupAnimationLoop();
        setupEventHandlers();
    };

    var setVars = function() {
		win.$window = $window = $(window);
        win.$body = $body = $(document.body);
        win.$html = $html = $("html");
        win.state = state = { t: -1 };
        readState(false);
    };

    var setupAnimationLoop = function() {

        var raf = window.requestAnimationFrame ||
        		  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame ||
                  window.msRequestAnimationFrame ||
                  function() {};

        var timeout, currTime = 0, lastTimestamp = Date.now();

        var processFrame = function(t) {
            var i;
            currTime = t;
            lastTimestamp = Date.now();
            readState(true);
            state.dt = state.t < 0 ? -1 : t - state.t;
            state.t = t;

            for(i = 0; i < firstHandlers.length; i++) firstHandlers[i](state);
            for(i = 0; i < secondHandlers.length; i++) secondHandlers[i](state);

            state.wheelEvent = null;
            raft(processFrame);
        };

        var raft = win.rafWithTimeout = function(f) {
            var done = false;
            raf(function(t) {
				if(done) return;
                done = true;
                f(t);
            });
            if(timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            timeout = setTimeout(function() {
                if(done) return;
                done = true;
                handleTimeout(f);
            }, 66);
        };

        var handleTimeout = function(f) {
            var t = currTime + Date.now() - lastTimestamp;
            f(t);
        };
        
        raft(processFrame);
    };

    win.registerHandlers = function(first, second) {
		if(first) firstHandlers.push(first);
        if(second) secondHandlers.push(second);
    };

    var readState = function(setDeltas) {
		var w = $window.width();
        var h = $window.height();
		var scroll = window.pageYOffset || document.documentElement.scrollTop;

        if(setDeltas) {
			state.widthChanged = (w != state.w);
            state.heightChanged = (h != state.h);
            state.sizeChanged = state.widthChanged || state.heightChanged;
            state.scrollChanged = scroll != state.scroll;
            state.anyChanged = state.scrollChanged || state.sizeChanged;
        }

        state.w = w;
        state.h = h;
        state.scroll = scroll;
    };

    var setupEventHandlers = function() {
        $window.on("mousewheel DOMMouseScroll wheel", function(e) {
			state.wheelEvent = e;
        });
    };

    win.findProp = function(prop, cssProp) {
        var key = prop + "/" + cssProp;
        if(cssProps[key]) return cssProps[key];

        cssProp = cssProp || prop;
		var tp, jstp, prefixes = ["ms", "webkit", "moz"];
		var tester = document.createElement("div");
		var s = tester.style;
        if(prop in s) {
            jstp = tp = prop;
        }
		else {
            var upperCased = prop[0].toUpperCase() + prop.substring(1);
            for(var i = 0; i < prefixes.length; i++) {
				var n = prefixes[i] + "Transform";
                if(n in s) {
                    jstp = n;
                    tp = "-" + prefixes[i] + cssProp;
                }
			}
		}
        cssProps[key] = {
            css: tp,
            js: jstp
        };
        return cssProps[key];
    };

    win.scrollTo = function (y, time, opts) {

        var delay = opts.delay,
            beginCallback = opts.begin,
        	callback = opts.done,
            easing = opts.easing;

        if(typeof y == "object") {
			y = y.offset().top;
        }
		var $el = isFirefox || isIe ? $html || $("html") : $body || $("body");

        if(!time) {
            $el.scrollTop(y);
        } else {

            if(delay) HUB.animate.add("window-scroll", delay, {});

            var startY;

			var step = function(s, obj) {
                $el.scrollTop(startY + (y - startY) * obj.index);
            };

			var animOpts = {
                begin: function(s, obj) {
                    if(beginCallback) beginCallback();
					startY = $el.scrollTop();
					step(s, obj);
                },
                step: step,
                done: function(s, obj) {
					$el.scrollTop(y);
                    if(callback) callback();
                }
            };
            if(easing) animOpts.easing = easing;

            HUB.animate.add("window-scroll", time, animOpts);
        }
    };

    win.cancelScroll = function(finishCurrent) {
		HUB.animate.clear("window-scroll", finishCurrent);
    };

    $(init);

})(jQuery, HUB);


// hub-animate

(function($, HUB) {

    if(HUB.animate) return;
    
    var anim = HUB.animate = {};
    var queues = {}, keyList = [];

    var init = function() {

        HUB.window.registerHandlers(null, processFrame);
    };

    var processFrame = function(s) {
        for(var key in queues) {
            var leftover = 0;
			while(queues[key]) {
            	var q = queues[key];
                if(!q.length) {
                    removeKey(key);
                    break;
                }
                var obj = q[0];
                var justStarting = false;
                if(!obj.started) {
                    obj.started = true;
                    justStarting = true;
                    obj.t += leftover;
                    obj.index = obj.length ? obj.t / obj.length : 0;
                    if(obj.easing) obj.index = obj.easing(obj.index);
                    if(obj.begin) obj.begin(s, obj);
                }

                if(!justStarting) obj.t += s.dt;

                if(obj.t >= obj.length) {
                    leftover = obj.t - obj.length;
                    obj.finished = true;
                    obj.index = 1;
                    if(obj.done) obj.done(s, obj);
                    q.shift();
                    if(!q.length) removeKey(key);
                    continue;
                } else if(!justStarting) {
                	obj.index = obj.t / obj.length;
                    if(obj.easing) obj.index = obj.easing(obj.index);
                    if(obj.step) obj.step(s, obj);
                }
                break;
            }
        }
    };

    var addKey = function(key) {
		if(queues[key]) return queues[key];
        var ret = queues[key] = [];
        keyList.push(key);
        return ret;
    };

    var removeKey = function(key) {
		delete queues[key];
        var i = keyList.indexOf(key);
        if(i >= 0) keyList.splice(i, 1);
    };

    anim.add = function(key, len, funcs) {
		var q = queues[key];
        if(!queues[key]) q = addKey(key);
        var obj = { t: 0, started: false, finished: false, length: len || 0, index: 0 };
        obj.begin = funcs.begin || funcs.step;
        obj.step = funcs.step;
        obj.done = funcs.done || funcs.step;
        if(typeof funcs.easing == "string") obj.easing = easings[funcs.easing];
        else obj.easing = funcs.easing;
        q.push(obj);
    };

    anim.clear = function(key, finishCurrent) {
		var q = queues[key];
        if(!q || !q.length) return;
        if(finishCurrent && q[0].done) {
            q[0].index = 1;
            q[0].t = q[0].length;
            q[0].done(BO.window.state, q[0]);
        }
        removeKey(key);
    };

    var easings = anim.easings = {};

    easings.inOutQuad = function(x) {
		if(x <= 0) return 0;
        if(x >= 1) return 1;
        if(x < .5) return 2 * x * x;
        var i = (1 - x);
        return 1 - 2 * i * i;
    };

    $(init);

})(jQuery, HUB);


var HUB = HUB || {};
HUB.wtb =  {};

(function($, HUB) {

    var wtb = HUB.wtb,
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
                        },
                        onChange: function() {
							console.log("I changed!");
                        }
                    });

                    checkForLonelyOptions(context);
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

            where.onPopulatedRetailers = function(context) {
                var arr = context.listsObj.retailers || [];

                for(var i = 0; i < arr.length; i++) {
                    arr[i].$el.parents(".selectbox").first().show();
                }

                context.wrapper.find(".empty-retailers").hide();
            };

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

        var bundleOrder = ["x", "standard", "digital-deluxe", "season-pass", "legacy", "legacy-pro"];
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
            editions = $('.edition-container'),
            platformsEls = $('.selection-type-platforms .selectricItems li');

        if (target) {
            editions.each(function() {
                var editionId = $(this).data('edition'),
                    thisEdition = $(this);
                if (target === editionId) {
                    //if (thisEdition.parent().is(':hidden')) return;
                    if (thisEdition.hasClass('visible')) return;
                    editions.removeClass('visible');
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
        if(!window.AW || !AW.targeting) return;
        if(!AW.targeting.isTargeted()) return;

        var values = {};
        var pp = AW.targeting.getPrimaryPlatform();
        //if(pp == "xbl") values.platforms = "xboxone";
        /*if(pp == "psn")*/ values.platforms = "ps4"; 

        return values;
    };

    var setInitialValues = function($el, values) {
        var con = ATVI.components.wheretobuy.getContext($el);
        ATVI.components.wheretobuy.useValues(con, values);
    };


})(jQuery, HUB);


