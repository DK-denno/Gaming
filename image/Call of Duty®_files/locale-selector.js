
// locale-selector
ATVI.components.localeSelector = {};
(function($, ATVI) {

    var locsel = ATVI.components.localeSelector;
	var registry = ATVI.utils.createRegistry("atvi-locale-selector");

    locsel.init = function($el, config) {
        var context = registry.get($el);
        if(context) return context;

		cleanConfig(config);

        var reg = registry.register($el);
        context = reg.context;

        var w = reg.$el;
        context.wrapper = w;
        context.config = config;
		context.menu = w.find(".locale-menu");
        context.button = w.find(".current");
        context.closeButton = w.find(".close-button");
        context.update = function() {
			update(context);
        };

        context.button.click(function(e) {
			e.preventDefault();
            if(context.isOpen) closeMenu(context);
            else openMenu(context);
        });

        context.closeButton.click(function(e) {
			e.preventDefault();
            closeMenu(context);
        });

        w.click(function(e) {
			e.stopPropagation();
        });

        $("body").click(function() {
			closeMenu(context);
        });

        setupLinkClickHandler(context);

        return context;

    };

    locsel.getContext = function($el) {
		return registry.get($el);
    };

    locsel.updateAll = function() {
        var s = registry.store;
        for(var i in s) {
            if(!s.hasOwnProperty(i)) continue;
			update(s[i]);
        }
    };

    var cleanConfig = function(config) {
		var roots = config.localeRoots;
        for(var r in roots) {
			if(!roots.hasOwnProperty(r)) continue;
            roots[r] = roots[r].replace(/\/__STUB$/, "");
        };
    };

    var update = function(context) {
        var roots = context.config.localeRoots;
        var localePathPart = context.config.localePathPart || context.config.locale;
        context.menu.find(".locale-link").each(function() {
			var $this = $(this);
            var li = $this.parent();
            if(li.hasClass("selected") || li.hasClass("default")) return;
			var loc = getLocaleFromClasses(li);
            if(!loc) return;
            var locRoot = roots[localePathPart];
            var relPath = location.pathname.replace(locRoot, "");
            $this.attr("href", roots[loc] + relPath + (location.search || ""));
        });

    };

    var getLocaleFromClasses = function($el) {
		var c = ($el[0].className || "").trim().split(/\s+/);
        for(var i = 0; i < c.length; i++) {
			if(c[i].indexOf("loc-") == 0) return c[i].substring(4);
        }
    };

    var openMenu = function(context) {
        if(context.isOpen) return;
		context.isOpen = true;
        var styleObj = locsel[context.config.style];
        if(styleObj) styleObj.openMenu(context);
        else context.menu.show();
        context.wrapper.addClass("open");
    };

    var closeMenu = function(context) {
        if(!context.isOpen) return;
		context.isOpen = false;
        var styleObj = locsel[context.config.style];
        if(styleObj) styleObj.closeMenu(context);
        else context.menu.hide();
        context.wrapper.removeClass("open");       
    };

    var setupLinkClickHandler = function(context) {
        context.menu.find(".locale-link").click(function(e) {
			var $link = $(this);
            var loc = getLocaleFromClasses($link.parent());
            var shouldCancel = locsel.onLinkClick(context, $link, loc);
            if(shouldCancel) e.preventDefault();
        });
    };

    locsel.default = {
        openMenu: function(context) {
			context.menu.slideDown(400);
        },
        closeMenu: function(context) {
			context.menu.slideUp(400);
        }
    };

    locsel.onLinkClick = function(context, $link, locale) {};

})(jQuery, ATVI);


ATVI.library.registerLibrary("locale-selector");

