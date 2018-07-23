
// fullscreen

ATVI.fullscreen = {};
(function() {

    var fs = ATVI.fullscreen;
	fs.supported = false;

    var prefixes = "webkit moz o ms".split(" ");

	if (document.cancelFullScreen) {
        fs.supported = true;
        fs.prefix = "";
    } else {
        for(var i = 0; i < prefixes.length; i++) {
            if(document[prefixes[i] + "CancelFullScreen"]) {
				fs.prefix = prefixes[i];
                fs.supported = true;
                break;
            }
        }
    }

    var fullScreenApi = { 
        supportsFullScreen: false,
        isFullScreen: function() {}, 
        requestFullScreen: function() {false}, 
        cancelFullScreen: function() {},
        fullScreenEventName: '',
        prefix: ''
    };

    fs.request = function($el) {
        if(fs.supported) return $($el)[0][fs.prefix ? fs.prefix + "RequestFullScreen" : "requestFullscreen"]();
    };

    fs.cancel = function($el) {
        if(fs.supported) document[fs.prefix ? fs.prefix + "CancelFullScreen" : "cancelFullscreen"]();
    };

    fs.getFullscreenElement = function() {
        if(fs.supported) return document[fs.prefix ? fs.prefix + "FullscreenElement" : "fullscreenElement"];
    };

    fs.isFullScreen = function() {
        if(!fs.supported) return false;
		if(fs.prefix == "webkit") return document.webkitIsFullScreen;
        else if(fs.prefix) return document[fs.prefix + "FullScreen"];
        return document.fullScreen;
    };

    fs.isElFullscreen = function($el) {
        var fse = fs.getFullscreenElement();
        if(!fse) return null;
		return $($el).is(fse);
    };

    fs.onChange = function(f) {
		$(document).on(fs.prefix + "fullscreenchange", f);
    };

    fs.onError = function(f) {
		$(document).on(fs.prefix + "fullscreenerror", f);
    };

})();


/*! jQuery TubePlayer - v1.1.6 - 2013-06-04
* https://github.com/nirvanatikku/jQuery-TubePlayer-Plugin
* Copyright (c) 2013 Nirvana Tikku; Licensed MIT
* updated by SSO Ben
*/
(function(e){"use strict";
//function t(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=0|16*Math.random(),a="x"==e?t:8|3&t;return a.toString(16)})}
var counter=0;
function t(){counter++;return ""+counter}
var a=".tubeplayer",r="jquery-youtube-tubeplayer",n="opts"+a,o={inited:!1,ytplayers:{},inits:[],iframeScriptInited:!1,State:{UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5},Error:{BAD_INIT:0,INVALID_PARAM:2,NOT_FOUND:100,NOT_EMBEDDABLE:101,CANT_PLAY:150}};e.tubeplayer={events:{},TubePlayer:o},e.tubeplayer.defaults={afterReady:function(){},stateChange:function(t){var a=this.onPlayer;return function(r){var n=e("#"+t).parent();switch("object"==typeof r&&(r=r.data),r){case o.State.UNSTARTED:return a.unstarted[t].call(n);case o.State.ENDED:return a.ended[t].call(n);case o.State.PLAYING:return a.playing[t].call(n);case o.State.PAUSED:return a.paused[t].call(n);case o.State.BUFFERING:return a.buffering[t].call(n);case o.State.CUED:return a.cued[t].call(n);default:return null}}},onError:function(t){var a=this.onErr;return function(r){var n=e("#"+t).parent();switch("object"==typeof r&&(r=r.data),r){case o.Error.BAD_INIT:case o.Error.INVALID_PARAM:return a.invalidParameter[t].call(n);case o.Error.NOT_FOUND:return a.notFound[t].call(n);case o.Error.NOT_EMBEDDABLE:case o.Error.CANT_PLAY:return a.notEmbeddable[t].call(n);default:return a.defaultError[t].call(n)}}},qualityChange:function(t){var a=this;return function(r){var n=e("#"+t).parent();return"object"==typeof r&&(r=r.data),a.onQualityChange[t].call(n,r)}},onQualityChange:{},onPlayer:{unstarted:{},ended:{},playing:{},paused:{},buffering:{},cued:{}},onErr:{defaultError:{},notFound:{},notEmbeddable:{},invalidParameter:{}}};var l={width:425,height:355,allowFullScreen:"true",initialVideo:"DkoeNLuMbcI",start:0,preferredQuality:"auto",showControls:!0,showRelated:!1,playsinline:!1,annotations:!0,autoPlay:!1,autoHide:!0,loop:0,theme:"dark",color:"red",showinfo:!1,modestbranding:!0,
protocol:window.location.protocol.replace(/:$/,''),
wmode:"transparent",swfobjectURL:"ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js",loadSWFObject:!1,allowScriptAccess:"always",playerID:"tubeplayer-player-container",iframed:!0,onPlay:function(){},onPause:function(){},onStop:function(){},onSeek:function(){},onMute:function(){},onUnMute:function(){},onPlayerUnstarted:function(){},onPlayerEnded:function(){},onPlayerPlaying:function(){},onPlayerPaused:function(){},onPlayerBuffering:function(){},onPlayerCued:function(){},onQualityChange:function(){},onError:function(){},onErrorNotFound:function(){},onErrorNotEmbeddable:function(){},onErrorInvalidParameter:function(){}};e.fn.tubeplayer=function(t,r){var n=e(this),l=typeof t;return 0===arguments.length||"object"===l?n.each(function(){o.init(e(this),t)}):"string"===l?n.triggerHandler(t+a,r!==void 0?r:null):void 0};var i=function(e){return function(t,a){var r=o.getPkg(t);if(r.ytplayer){var n=e(t,a,r);return n===void 0&&(n=r.$player),n}return r.$player}};e.tubeplayer.getPlayers=function(){return o.ytplayers},o.init=function(i,d){if(i.hasClass(r))return i;var y=e.extend({},l,d);y.playerID+="-"+t(),i.addClass(r).data(n,y);for(var s in u)i.bind(s+a,i,u[s]);return o.initDefaults(e.tubeplayer.defaults,y),e("<div></div>").attr("id",y.playerID).appendTo(i),o.initPlayer(i,y),i},o.getPkg=function(e){var t=e.data,a=t.data(n),r=o.ytplayers[a.playerID];return{$player:t,opts:a,ytplayer:r}},o.iframeReady=function(t){return o.inits.push(function(){
new YT.Player(t.playerID,
{videoId:t.initialVideo,
width:t.width,
height:t.height,
playerVars:{
autoplay:t.autoPlay?1:0,
autohide:t.autoHide?1:0,
controls:t.showControls?1:0,
loop:t.loop?1:0,
playlist:t.loop?t.initialVideo:"",
rel:t.showRelated?1:0,
fs:t.allowFullScreen?1:0,
wmode:t.wmode,
showinfo:t.showinfo?1:0,
modestbranding:t.modestbranding?1:0,
iv_load_policy:t.annotations?1:3,
start:t.start,
theme:t.theme,
color:t.color,
playsinline:t.playsinline,
html5:t.attemptHTML5
},events:{onReady:function(a){o.ytplayers[t.playerID]=a.target;var n=e(a.target.getIframe()).parents("."+r);e.tubeplayer.defaults.afterReady(n)},onPlaybackQualityChange:e.tubeplayer.defaults.qualityChange(t.playerID),onStateChange:e.tubeplayer.defaults.stateChange(t.playerID),onError:e.tubeplayer.defaults.onError(t.playerID)}})}),o.inits.length>=1&&!o.inited?function(){for(var e=0;o.inits.length>e;e++)o.inits[e]();o.inited=!0}:(o.inited&&o.inits.pop()(),window.onYouTubePlayerAPIReady)},o.initDefaults=function(e,t){var a=t.playerID,r=e.onPlayer;r.unstarted[a]=t.onPlayerUnstarted,r.ended[a]=t.onPlayerEnded,r.playing[a]=t.onPlayerPlaying,r.paused[a]=t.onPlayerPaused,r.buffering[a]=t.onPlayerBuffering,r.cued[a]=t.onPlayerCued,e.onQualityChange[a]=t.onQualityChange;var n=e.onErr;n.defaultError[a]=t.onError,n.notFound[a]=t.onErrorNotFound,n.notEmbeddable[a]=t.onErrorNotEmbeddable,n.invalidParameter[a]=t.onErrorInvalidParameter},o.initPlayer=function(e,t){t.iframed?o.initIframePlayer(e,t):o.initFlashPlayer(e,t)},
o.initIframePlayer=function(e,t){if(!o.iframeScriptInited){var a=document.createElement("script");
a.src=t.protocol+"://www.youtube.com/iframe_api";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(a,r),o.iframeScriptInited=!0}
window.onYouTubePlayerAPIReady=o.iframeReady(t)},o.initFlashPlayer=function(t,a){a.loadSWFObject?(a.swfobjectURL=a.swfobjectURL.replace("http://",""),a.swfobjectURL=a.swfobjectURL.replace("https://",""),a.swfobjectURL=a.protocol+"://"+a.swfobjectURL,
e.getScript(a.swfobjectURL,o.init_flash_player(a))):o.init_flash_player(a)()},o.init_flash_player=function(t){return function(){if(!window.swfobject)return alert("YouTube Player couldn't be initialized. Please include swfobject."),void 0;
var a=["//www.youtube.com/v/"];a.push(t.initialVideo),a.push("?&enablejsapi=1&version=3"),a.push("&playerapiid="+t.playerID),a.push("&rel="+(t.showRelated?1:0)),a.push("&autoplay="+(t.autoPlay?1:0)),a.push("&autohide="+(t.autoHide?1:0)),
a.push("&loop="+(t.loop?1:0)),a.push("&playlist="+(t.loop?t.initialVideo:"")),
a.push("&controls="+(t.showControls?1:0)),a.push("&showinfo="+(t.showinfo?1:0)),a.push("&modestbranding="+(t.modestbranding?1:0)),a.push("&iv_load_policy="+(t.annotations?1:3)),a.push("&start="+t.start),a.push("&theme="+t.theme),a.push("&color="+t.color),a.push("&playsinline="+t.playsinline),a.push("&fs="+(t.allowFullScreen?1:0)),window.swfobject.embedSWF(a.join(""),t.playerID,t.width,t.height,"8",null,null,{allowScriptAccess:t.allowScriptAccess,wmode:t.wmode,allowFullScreen:t.allowFullScreen},{id:t.playerID}),window.onYouTubePlayerReady=function(t){var a=document.getElementById(t),n=t.replace(/-/g,""),l=e.tubeplayer.defaults;
e.tubeplayer.events[n]={stateChange:l.stateChange(t),error:l.onError(t),qualityChange:l.qualityChange(t)},a.addEventListener("onStateChange","$.tubeplayer.events."+n+".stateChange"),a.addEventListener("onError","$.tubeplayer.events."+n+".error"),a.addEventListener("onPlaybackQualityChange","$.tubeplayer.events."+n+".qualityChange"),o.ytplayers[t]=a;var i=e(a).parents("."+r);
e.tubeplayer.defaults.afterReady(i)}}},o.getVideoIDFromURL=function(e){e=e||"";var t=e.indexOf("?"),a=e.substring(t,e.length),r=a.indexOf("v=");if(r>-1){var n=a.indexOf("&",r);return-1===n&&(n=a.length),a.substring(r+"v=".length,n)}return""};var u={opts:i(function(e,t,a){return a.opts}),cue:i(function(e,t,a){a.ytplayer.cueVideoById(t,0,a.opts.preferredQuality)}),play:i(function(e,t,a){"object"==typeof t?a.ytplayer.loadVideoById(t.id,t.time,a.opts.preferredQuality):t!==void 0?a.ytplayer.loadVideoById(t,0,a.opts.preferredQuality):a.ytplayer.playVideo(),a.opts.onPlay(t)}),pause:i(function(e,t,a){a.ytplayer.pauseVideo(),a.opts.onPause(a)}),stop:i(function(e,t,a){a.ytplayer.stopVideo(),a.opts.onStop(a)}),seek:i(function(e,t,a){if(/:/.test(t)){var r=t.split(":").reverse();t=0;for(var n=0;r.length>n;n++)t+=Math.pow(60,n)*(0|r[n])}a.ytplayer.seekTo(t,!0),a.opts.onSeek(t)}),mute:i(function(e,t,a){a.$player.attr("data-prev-mute-volume",a.ytplayer.getVolume()),a.ytplayer.mute(),a.opts.onMute(a)}),
unmute:i(function(e,t,a){a.ytplayer.unMute(),a.ytplayer.setVolume(a.$player.attr("data-prev-mute-volume")||50),a.opts.onUnMute()}),isMuted:i(function(e,t,a){return a.ytplayer.isMuted()}),volume:i(function(e,t,a){return void 0===t?a.ytplayer.getVolume()||0:(a.ytplayer.setVolume(t),a.$player.attr("data-prev-mute-volume",a.ytplayer.getVolume()),void 0)}),quality:i(function(e,t,a){return void 0===t?a.ytplayer.getPlaybackQuality():(a.ytplayer.setPlaybackQuality(t),void 0)}),playbackRate:i(function(e,t,a){return void 0===t?a.ytplayer.getPlaybackRate():(a.ytplayer.setPlaybackRate(t),void 0)}),data:i(function(e,t,a){var r={},n=a.ytplayer;return r.videoLoadedFraction=n.getVideoLoadedFraction(),r.bytesLoaded=n.getVideoBytesLoaded(),r.bytesTotal=n.getVideoBytesTotal(),r.startBytes=n.getVideoStartBytes(),r.state=n.getPlayerState(),r.currentTime=n.getCurrentTime(),r.duration=n.getDuration(),r.videoURL=n.getVideoUrl(),r.videoEmbedCode=n.getVideoEmbedCode(),r.videoID=o.getVideoIDFromURL(r.videoURL),r.availableQualityLevels=n.getAvailableQualityLevels(),r.availablePlaybackRates=n.getAvailablePlaybackRates(),r}),
videoId:i(function(e,t,a){return o.getVideoIDFromURL(a.ytplayer.getVideoUrl())}),size:i(function(t,a,r){a!==void 0&&a.width&&a.height&&(r.ytplayer.setSize(a.width,a.height),e(r.ytplayer).css(a))}),destroy:i(function(t,l,i){i.$player.removeClass(r).data(n,null).unbind(a).html(""),delete o.ytplayers[i.opts.playerID];var u=e.tubeplayer.defaults,d=["unstarted","ended","playing","paused","buffering","cued"];return e.each(d,function(e,t){delete u.onPlayer[t][i.opts.playerID]}),d=["defaultError","notFound","notEmbeddable","invalidParameter"],e.each(d,function(e,t){delete u.onErr[t][i.opts.playerID]}),delete u.onQualityChange[i.opts.playerID],delete e.tubeplayer.events[i.opts.playerID],"destroy"in i.ytplayer&&i.ytplayer.destroy(),e(i.ytplayer).remove(),null}),player:i(function(e,t,a){return a.ytplayer})}})(jQuery);


// atvi-video

ATVI.components.video = {};
(function($, ATVI) {

    var video = ATVI.components.video;
    var registry = ATVI.utils.createRegistry("atvi-video");
    var ytEventHandlers = {};

    video.defaultDisplayTemplate = '<span class="title">{{title}}</span> <span class="duration">{{duration}}</span>';

    var init = function() {
		hackTubeplayerEvents();
    };

    var hackTubeplayerEvents = function() {
		["stateChange"].forEach(hackTubeplayerEvent);
    };

	var hackTubeplayerEvent = function(ev) {
		var orig = $.tubeplayer.defaults[ev];
        var handlers = ytEventHandlers[ev] = [];
        $.tubeplayer.defaults[ev] = function(id) {
            var o = orig.call(this, id);
            return function(r) {
                o.call(this, r);
                handlers.forEach(function(h) { h(r, id); });
            };
        };
    };

    video.addYtEventHandler = function(ev, h) {
		var a = ytEventHandlers[ev];
        if(a) a.push(h);
    };

    video.init = function($el, opts) {
        var context = registry.get($el);
        if(context) return context;

        var reg = registry.register($el);
        context = reg.context;

        var w = reg.$el;
        context.wrapper = w;
        context.initialHtml = w.find(".player-part").html();
        context.opts = opts;
        context.requestedQuality = opts.preferredQuality || "default";

        video.verifiedInit(context);
        video.onInit(context);
        return context;
    };

    video.verifiedInit = function(context) {
        if(context.opts.display) video.setupDisplay(context);
		video.desktopInit(context);
        video.onInit(context);
        return context;
    };

    video.desktopInit = function(context) {
	    setupContext(context);
		buildControlsObject(context);
		setupControls(context);
        initPlayer(context);
    };

    video.getContext = function($elOrId) {
        return registry.get($elOrId);
    };

    video.purgeContext = function($elOrId) {
		return registry.purge($elOrId);
    };

    video.purgeAllContexts = function() {
		registry.purgeAll();
    };

    var buildControlsObject = function(context) {
        var c = context.controls = {};
		var w = c.wrapper = context.wrapper.find(".controls");
		c.playButton = w.find(".play.button");
		c.pauseButton = w.find(".pause.button");
        c.sdhdButton = w.find(".sd-hd.button");
		c.fullscreenButton = w.find(".fullscreen.button");
        c.clock = w.find(".clock");
        c.currentTime = c.clock.find(".current");
        c.totalTime = c.clock.find(".total");
        c.timeSlider = w.find(".time-slider");
        c.timeSliderLoaded = c.timeSlider.find(".loaded");
		c.timeSliderCurrent = c.timeSlider.find(".filled");
        c.speakerButton = w.find(".speaker.button");
        c.volumeSlider = w.find(".volume-slider");
        c.volumeSliderFilled = c.volumeSlider.find('.filled');

        var totalTime = 1, loadedTime = 0;

        c.setPlaying = function(playing) {
            if(playing) {
                context.wrapper.addClass("playing");
                context.hasPlayed = true;
            } else {
                context.wrapper.removeClass("playing");
            }
            context.playing = playing;
        };

        c.setClock = function(current, total, loaded) {
			c.currentTime.text(video.formatTime(current));
            if(total) {
                totalTime = total;
                c.totalTime.text(video.formatTime(total));
            }

            var currentFrac = current / Math.max(current, totalTime || 1);
			c.timeSliderCurrent.css("width", (currentFrac * 100) + "%");

            c.timeSliderLoaded.css("width", ((loaded || 0) * 100) + "%");
        };

        c.setVolume = function(level) {
            if(level <= 0) {
				this.setMuted(true);
                level = 0;
            } else {
                this.setMuted(false);
            }
            if(level > 1) level = 1;

            context.currentVolume = level;
            updateVolumeSlider();
        };

        var updateVolumeSlider = function() {
            var h = context.muted ? 0 : context.currentVolume * 100;
            c.volumeSliderFilled.css("height", h + "%");
        };

        c.setMuted = function(muted) {
			if(muted) context.wrapper.addClass("muted");
            else {
                context.wrapper.removeClass("muted");
                if(context.currentVolume < .1) context.currentVolume = .1;
            }
            context.muted = muted;
            updateVolumeSlider();
        };

    };

    var setupContext = function(context) {
        context.currentVolume = 1;
		context.player = context.wrapper.find(".player");
        context.isControllable = false;
        context.commandQueue = [];

        context.play = function(arg) {
            if(arg) {
                if(typeof arg == "string") {
                    context.youtubeId = arg;
                } else if(typeof arg == "object") {
					arg.id = arg.id || context.youtubeId;
                    arg.time = arg.time || 0;
                } else {
					arg = null;
                }
            }
        	executeCommand(context, "play", arg);
        };

        context.pause = function() {
            executeCommand(context, "pause");
        };

        context.seek = function(arg) {
            executeCommand(context, "seek", arg);
        };

        context.volume = function(arg) {
			return executeCommand(context, "volume", arg);
        };

        context.mute = function(arg) {
            executeCommand(context, arg ? "mute" : "unmute");
        };

        context.cue = function(arg) {
            updateExternalLink(context, "https://www.youtube.com/watch?v=" + arg);
            context.youtubeId = arg;
			return executeCommand(context, "cue", arg);
        };
        context.setReady = function(ready) {
			if(ready) setReady(context);
            else context.playerReady = false;
        };
        context.reset = function() {
			return reset(context);
        };

        context.eventHandlers = [];
        context.onEvent = function(h) {
			context.eventHandlers.push(h);
        };
        context.triggerEvent = function(e) {
			for(var i = 0; i < context.eventHandlers.length; i++) context.eventHandlers[i](e);
        };


        if(context.opts.muted) context.mute(true);

        video.setupControlDisplay(context);
    };

    var setupControls = function(context) {
		var c = context.controls, w = context.wrapper, p = context.player;
        c.playButton.click(function() {
			context.play();
        });

        c.pauseButton.click(function() {
            console.log("VIDEO PAUSE");
            context.pause()
        });

        var tsi = c.timeSlider.find(".inner");

        c.timeSlider.click(function(e) {
            var t, x = e.clientX - tsi.offset().left;
            var w = tsi.width();
            if(x < 0) x = 0;
            else if(x > w) x = w;

            var doSeek = function() {
			    t = (x / w) * (context.duration || 30);
				context.seek(t);
            };

            if(context.hasPlayed) doSeek();
            else {
                var oldSeek = context.cuedSeek;
                context.cuedSeek = doSeek;
                if(oldSeek) return; 
                var test = function() {
                    if(!context.duration) return;
					if(interval) clearInterval(interval);
                    context.pause();
                    context.cuedSeek();
                };
                var interval = setInterval(test, 50);
                test();                
                context.play();
            }

        });

        c.sdhdButton.click(function() {
            if(context.hd) {
				w.removeClass("hd");
                p.tubeplayer("quality", "medium");
            } else {
                w.addClass("hd");
 				p.tubeplayer("quality", "hd720");
            }
			context.hd = !context.hd;
        });

		var vsi = c.volumeSlider.find(".inner");

        c.volumeSlider.click(function(e) {
            var y = e.pageY - vsi.offset().top;
            var h = vsi.height();
            var p = (1 - y / h);

            if(p < 0) p = 0;
            else if(p > 1) p = 1;
            if(p > 0 && context.muted) context.mute(false);
			context.volume(p * 100);
            c.setVolume(p);
        });

        c.speakerButton.click(function() {
			context.mute(!context.muted);
        });

        c.fullscreenButton.click(function(e) {
            var cancel = video.onFullscreenClick(context, e);
            if(cancel === false) return;
            handleFullscreenCommand(context, "toggle");
        });

        var fs = ATVI.fullscreen;
        fs.onChange(function(e) {
            var isMe = context.wrapper.is(e.originalEvent.target);
            if(!isMe) return;
            if(fs.isFullScreen()) {
                w.addClass("fullscreen");
                video.onFullscreenEvent(context, true, e);
            }
            else {
                w.removeClass("fullscreen");
                video.onFullscreenEvent(context, false, e);
            }
        });

        context.fullscreenType = video.chooseFullscreenType(context);
        if(!fs.supported && context.fullscreenType == "screen") context.fullscreenType = "browser";

        var po = context.playingOverlay = context.wrapper.find(".playing-overlay");
        po.click(function() {
			context.pause();
        });
        po.on("touchstart", function() {
			video.onHovering(context);
        });
    };

    var executeCommand = function(context, command, arg) {
        console.log("executeCommand", context);
        if(!context.isControllable) return;
        var comm = function() {
        	context.player.tubeplayer(command, arg);
        }
        if(context.playerReady) comm();
        else context.commandQueue.push(comm);
    };

    var initPlayer = function(context) {
        context.isControllable = true;
        var c = {}, controls = context.controls;
        var opts = context.opts;
        c.width = "100%";
        c.height = "100%";
        c.showControls = 0;
        c.allowFullScreen = "false";
		context.youtubeId = c.initialVideo = opts.youtubeId;
        if(opts.start) c.start(opts.start);
        c.preferredQuality = context.requestedQuality;
        c.attemptHTML5 = 1; 			// attempt to force html5 
        c.modestbranding = true;

        c.onPlay = c.onPlayerPlaying = function(id) {
            console.log("onPlay");
            controls.setPlaying(true);
            context.triggerEvent({type: "play"});
			updateQuality();
        };
		c.onPause = c.onPlayerPaused = function(id) {
            controls.setPlaying(false);
            context.triggerEvent({type: "pause"});
        };

        c.onStop = function(id) {
			controls.setPlaying(false);
            context.triggerEvent({type: "stop"});
        };

        c.onSeek = function(time) {
            controls.setClock(time);
            context.triggerEvent({type: "seek", time: time});
        };

        c.onMute = function() {
			controls.setMuted(true);
            context.triggerEvent({type: "mute"});
        };
        c.onUnMute = function() {
            controls.setMuted(false);
            context.triggerEvent({type: "unmute"});
        };
        c.onPlayerBuffering = c.onPlayerCued = function() {
			updateQuality();
        };

        var updateQuality = function() {
            var q = context.player.tubeplayer("quality");
            if(q != context.requestedQuality) context.player.tubeplayer("quality", context.requestedQuality);
        };

        context.player.tubeplayer(c);

        context.dataInterval = setInterval(function() {
            var data = context.player.tubeplayer("data");
            if(!data) return;
            controls.setClock(data.currentTime, data.duration, data.videoLoadedFraction);
            context.currentTime = data.currentTime;
            if(data.duration) context.duration = data.duration;
            context.videoUrl = data.videoUrl;
        }, 250);

        video.setupPlayerType(context);
    };

    var handleFullscreenCommand = function(context, command) {

        var fs = ATVI.fullscreen;

		var isFull = fs.isFullScreen() || context.isFullBrowser;
		var targetFull;
        if(command == "enter") targetFull = true;
        else if(command == "exit") targetFull = false;
        else targetFull = !isFull;
		if(targetFull == isFull) return;

		if(!targetFull) {
            if(context.fullscreenType == "screen") video.exitFullscreenMode(context);
            else video.exitFullBrowserMode(context);
            context.isFullBrowser = false;
        } else {
            if(context.fullscreenType == "screen") video.enterFullscreenMode(context);
            else {
                video.enterFullBrowserMode(context);
                context.isFullBrowser = true;
            }
        }
    };

    video.setupPlayerType = function(context) {
        if(ATVI.browser.isPhone) {
			context.wrapper.addClass("use-external-link");
        }
    };

    video.formatTime = function(totalSec) {
		totalSec = Math.round(totalSec || 0);
        var min = Math.floor(totalSec / 60);
        var sec = "0" + (totalSec - min * 60);
        return min + ":" + sec.replace(/^(.*(..))$/, "$2");
    };

    video.setupDisplay = function(context) {
		var disp = context.opts.display;
        var template = disp.template || video.defaultDisplayTemplate;
        context.wrapper.find(".display").html(ATVI.utils.renderTemplate(template, disp)).addClass("present");
    };

    video.chooseFullscreenType = function(context) {
        if(ATVI.browser.isTablet || ATVI.browser.isPhone) return "browser";
        else return "screen";
    };

    video.enterFullscreenMode = function(context) {
        ATVI.fullscreen.request(context.wrapper);
    };

    video.exitFullscreenMode = function(context) {
		ATVI.fullscreen.cancel();
    };

	video.enterFullBrowserMode = function(context) {
        var h = $("html");
        context.htmlOverflow = h.css("overflow");
        h.css("overflow", "hidden");
		context.wrapper.addClass("fullbrowser");
    };

    video.exitFullBrowserMode = function(context) {
        $("html").css("overflow", context.htmlOverflow);
		context.wrapper.removeClass("fullbrowser");
    };

    video.setupControlDisplay = function(context) {
		context.wrapper.mousemove(function() {
			video.onHovering(context);
        });
    };

    video.onHovering = function(context) {
		var w = context.wrapper;

        if(context.hoverTimeout) clearTimeout(context.hoverTimeout);
        else w.addClass("hovered");

        context.hoverTimeout = setTimeout(function() {
            w.removeClass("hovered");
            context.hoverTimeout = null;
        }, 2000);

        if(context.cursorHoverTimeout) clearTimeout(context.cursorHoverTimeout);
        else w.addClass("show-cursor");

        context.cursorHoverTimeout = setTimeout(function() {
            w.removeClass("show-cursor");
            context.cursorHoverTimeout = null;
        }, 3000);
    };

    video.onInit = function(context) {};
	video.onReset = function(context) {};

    video.onFullscreenClick = function(context, ev) {};
    video.onFullscreenEvent = function(context, isFull, ev) {};

    // initialize the tubeplayer plugin
    $.tubeplayer.defaults.afterReady = function(p) {
        var parent = p.parents(".atvi-video");
        if(parent.length > 0){
            var context = video.getContext(parent);
            console.log("tubeplayer player ready");
            setReady(context);
        }
    };

    var setReady = function(context) {
		var q = context.commandQueue;
        while(q.length) q.shift()();
        context.playerReady = true;
    };

    var reset = function(context) {
		var html = context.initialHtml;
        var $el = context.wrapper.find(".player-part");
        var opts = context.opts;
        clearInterval(context.dataInterval);
        registry.purge($el);
		$el.html(html);
        var context = video.init($el, opts);

        ATVI.analytics.setupClickHandlers($el);
        video.onReset(context);
        return context;
    };

    var updateExternalLink = function(context, url) {
		context.wrapper.find(".external-link").attr("href", url);
    };

    $(init);

})(jQuery, ATVI);


ATVI.library.registerLibrary("video");

