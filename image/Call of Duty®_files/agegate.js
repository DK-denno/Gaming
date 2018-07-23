
// agegate

ATVI.components.agegate = {};
(function($, ATVI) {

    var init = function(){
		agegate.agegateKeyEventHandler();
    }

    var agegate = ATVI.components.agegate;

    var registry = ATVI.utils.createRegistry();

    agegate.expireTime = 2 * 60 * 60 * 1000;

    agegate.getContext = function($el) {
		return registry.get($el);
    };

    agegate.purgeContext = function($el) {
		return registry.purge($el);
    };

    agegate.purgeAllContexts = function() {
		registry.purgeAll();
    };

    agegate.register = function($el, config) {

		var context = registry.get($el);
        if(context) return context;

        var reg = registry.register($el);
        context = reg.context;

        var w = reg.$el;
        context.wrapper = w;
        context.config = config;
        context.callbacks = [];
        context.failureCallbacks = [];
        context.form = w.find(".form");
        context.fields = w.find(".fields");
        context.day = w.find(".day-input");
        context.month = w.find(".month-input");
        context.year = w.find(".year-input");
        context.feedback = w.find(".feedback-message");
        context.invalidMessage = w.find(".invalid-date");
        context.failureMessage = w.find(".failure");

        var years = Math.floor(config.minimumAge);
        var days = (config.minimumAge - years) * 365;
        var date = new Date(new Date().getTime() - days * 1000 * 60 * 60 * 24);
        date.setYear(date.getFullYear() - years);
        context.minDate = date;

        context.verifyAge = function() {
			return verifyAge(context);
        };

        context.button = w.find(".submit").click(function(e) {
            var result = agegate.attemptVerification(context);
			if(result != "success" || !context.successUrl) e.preventDefault();
        });

        context.year.on('keypress', function(e) {
            if(e.keyCode == 13 ) var result = agegate.attemptVerification(context);
        });


        context.reposition = function() {
			agegate.reposition(context);
        };

        $(function() {
            context.form.css("opacity", 0);
            setTimeout(function() {
				context.form.fadeTo(300, 1);
                context.reposition();
            }, 100);
        });
        $(window).resize(context.reposition);

        return context;
    };

    agegate.engage = function($el, opts) {
        var context = registry.get($el);
        if(opts.callback) context.callbacks.push(opts.callback);
        if(opts.failure) context.failureCallbacks.push(opts.failure);
        if(opts.successUrl) {
            context.button.attr("href", opts.successUrl).attr("target", "_blank");
            context.successUrl = opts.successUrl;
        }

        if(context.config.disabled || ATVI.browser.isBot) {
			agegate.agegateMet(context);
            return;
        }

        agegate.tryFromCookie(context, true);
    };

    agegate.tryFromCookie = function(context, hideImmediately) {
		var cookie = (ATVI.utils.getCookies(true).agegate || "");
        var stripped = cookie.replace(/(^\"+)|(\"+$)/g, "");
		if(stripped) {
            var date = new Date(stripped);
            if(date.getTime() <= context.minDate.getTime()) {
                if(hideImmediately) context.wrapper.hide();
				agegate.agegateMet(context);
            } else {
                context.fields.hide();
				agegate.agegateFailed(context);
            }
        }
    };

    agegate.attemptVerification = function(context) {
        if(context.alreadyFailed) return "failure";
		var result = agegate.verifyAge(context);
        switch(result) {
            case "success":
                agegate.agegateMet(context);
                agegate.tryAllExcept(context);
                break;
            case "failure":
                context.alreadyFailed = true;
                agegate.agegateFailed(context);
                agegate.tryAllExcept(context);
                break;
            case "invalid":
				context.invalidMessage.show();
                context.failureMessage.hide();
                context.feedback.slideDown();
                break;
        }

        return result;
    };

    agegate.verifyAge = function(context) {
        var d = context.day.val();
        var m = context.month.val();
        var y = context.year.val();

        var date = new Date();
        m = safeParseInt(m);
        if(!m || m < 1 || m > 12) return "invalid";

        y = safeParseInt(y);
        if(!y || y < 1900 || y > date.getFullYear()) return "invalid";

        date.setMonth(m - 1);
		date.setYear(y);

        d = safeParseInt(d);
        if(!d || d < 1 || d > getDaysInMonth(date)) return "invalid";
        date.setDate(d);
		date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);

        ATVI.utils.setCookie("agegate", date.toUTCString(), {
            expireDate: agegate.expireTime
        });

        return context.minDate.getTime() >= date.getTime() ? "success" : "failure";
    };

    var getDaysInMonth = function(date) {
		return new Date(date.getYear(), date.getMonth() + 1, 0).getDate();
    };

    var safeParseInt = function(t) {
        try {
			return parseInt(t);
        } catch(e) {}
    }

    agegate.tryAllExcept = function(context) {
		agegate.doAllExcept(context, agegate.tryFromCookie);
    };

    agegate.doAllExcept = function(context, func) {
        var s = registry.store;
        for(var c in s) {
			if(!s.hasOwnProperty(c) || s[c] == context) continue;
            func(s[c]);
        }
    };

    agegate.agegateMet = function(context) {
        context.status = "success";
        context.wrapper.fadeTo(300, 0, function() {
			context.wrapper.hide();
        });
		var arr = context.callbacks;
        while(arr.length) {
			arr.shift()(context);
        }
    };

    agegate.agegateFailed = function(context) {
        context.status = "failed";
		context.button.fadeOut(200);
        context.feedback.slideDown();
        context.invalidMessage.hide();
        context.failureMessage.show();
        var arr = context.failureCallbacks;
        while(arr.length) {
			arr.shift()(context);
        }
    };

    agegate.reposition = function(context) {
		var ho = context.wrapper.height();
        var hi = context.form.height();
        context.form.css("top", Math.max((ho - hi) * .5, 0));
    };

    agegate.repositionAll = function() {
        var s = registry.store;
        for(var id in s) {
			if(!s.hasOwnProperty(id)) continue;
			agegate.reposition(s[id]);
        }
    };

    agegate.agegateKeyEventHandler = function(){
        $month = $(".month-input")
        $day = $(".day-input")
        $year = $(".year-input")
        
        $month.on("focus", function(e) {$month.val("");});
        $day.on("focus", function(e) {$day.val("");});
        $year.on("focus", function(e) {$year.val("");});
        
        $month.on("keyup", function(e) {
            if($month.val().length >= 2) {
                
                $day[0].select();
                
            } 
        });
        
        $day.on("keyup", function(e) {
            if($day.val().length >= 2) {
                
                $year[0].select();
                
            } 
        });
        
        $day.on("keydown", function(e){
            if($day.val().length== 0 && e.keyCode == 8){
                $month[0].select();
            }
        });
        
        $year.on("keydown", function(e) {
            if($year.val().length == 0 && e.keyCode == 8) {
                $day[0].select();
            }
		});
    }

    $(init);

})(jQuery, ATVI);


ATVI.library.registerLibrary("agegate");

