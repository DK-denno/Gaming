
/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */

!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(k(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function i(a,b){return h(a,b,!0)}function j(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&h(d,c)}function k(a,b){return function(){return a.apply(b,arguments)}}function l(a,b){return typeof a==kb?a.apply(b?b[0]||d:d,b):a}function m(a,b){return a===d?b:a}function n(a,b,c){g(r(b),function(b){a.addEventListener(b,c,!1)})}function o(a,b,c){g(r(b),function(b){a.removeEventListener(b,c,!1)})}function p(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function q(a,b){return a.indexOf(b)>-1}function r(a){return a.trim().split(/\s+/g)}function s(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function t(a){return Array.prototype.slice.call(a,0)}function u(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];s(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function v(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ib.length;){if(c=ib[g],e=c?c+f:b,e in a)return e;g++}return d}function w(){return ob++}function x(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function y(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){l(a.options.enable,[a])&&c.handler(b)},this.init()}function z(a){var b,c=a.options.inputClass;return new(b=c?c:rb?N:sb?Q:qb?S:M)(a,A)}function A(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&yb&&d-e===0,g=b&(Ab|Bb)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,B(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function B(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=E(b)),e>1&&!c.firstMultiple?c.firstMultiple=E(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=F(d);b.timeStamp=nb(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=J(h,i),b.distance=I(h,i),C(c,b),b.offsetDirection=H(b.deltaX,b.deltaY),b.scale=g?L(g.pointers,d):1,b.rotation=g?K(g.pointers,d):0,D(c,b);var j=a.element;p(b.srcEvent.target,j)&&(j=b.srcEvent.target),b.target=j}function C(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===yb||f.eventType===Ab)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function D(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Bb&&(i>xb||h.velocity===d)){var j=h.deltaX-b.deltaX,k=h.deltaY-b.deltaY,l=G(i,j,k);e=l.x,f=l.y,c=mb(l.x)>mb(l.y)?l.x:l.y,g=H(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function E(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:lb(a.pointers[c].clientX),clientY:lb(a.pointers[c].clientY)},c++;return{timeStamp:nb(),pointers:b,center:F(b),deltaX:a.deltaX,deltaY:a.deltaY}}function F(a){var b=a.length;if(1===b)return{x:lb(a[0].clientX),y:lb(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:lb(c/b),y:lb(d/b)}}function G(a,b,c){return{x:b/a||0,y:c/a||0}}function H(a,b){return a===b?Cb:mb(a)>=mb(b)?a>0?Db:Eb:b>0?Fb:Gb}function I(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function J(a,b,c){c||(c=Kb);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function K(a,b){return J(b[1],b[0],Lb)-J(a[1],a[0],Lb)}function L(a,b){return I(b[0],b[1],Lb)/I(a[0],a[1],Lb)}function M(){this.evEl=Nb,this.evWin=Ob,this.allow=!0,this.pressed=!1,y.apply(this,arguments)}function N(){this.evEl=Rb,this.evWin=Sb,y.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function O(){this.evTarget=Ub,this.evWin=Vb,this.started=!1,y.apply(this,arguments)}function P(a,b){var c=t(a.touches),d=t(a.changedTouches);return b&(Ab|Bb)&&(c=u(c.concat(d),"identifier",!0)),[c,d]}function Q(){this.evTarget=Xb,this.targetIds={},y.apply(this,arguments)}function R(a,b){var c=t(a.touches),d=this.targetIds;if(b&(yb|zb)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=t(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return p(a.target,i)}),b===yb)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ab|Bb)&&delete d[g[e].identifier],e++;return h.length?[u(f.concat(h),"identifier",!0),h]:void 0}function S(){y.apply(this,arguments);var a=k(this.handler,this);this.touch=new Q(this.manager,a),this.mouse=new M(this.manager,a)}function T(a,b){this.manager=a,this.set(b)}function U(a){if(q(a,bc))return bc;var b=q(a,cc),c=q(a,dc);return b&&c?cc+" "+dc:b||c?b?cc:dc:q(a,ac)?ac:_b}function V(a){this.id=w(),this.manager=null,this.options=i(a||{},this.defaults),this.options.enable=m(this.options.enable,!0),this.state=ec,this.simultaneous={},this.requireFail=[]}function W(a){return a&jc?"cancel":a&hc?"end":a&gc?"move":a&fc?"start":""}function X(a){return a==Gb?"down":a==Fb?"up":a==Db?"left":a==Eb?"right":""}function Y(a,b){var c=b.manager;return c?c.get(a):a}function Z(){V.apply(this,arguments)}function $(){Z.apply(this,arguments),this.pX=null,this.pY=null}function _(){Z.apply(this,arguments)}function ab(){V.apply(this,arguments),this._timer=null,this._input=null}function bb(){Z.apply(this,arguments)}function cb(){Z.apply(this,arguments)}function db(){V.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function eb(a,b){return b=b||{},b.recognizers=m(b.recognizers,eb.defaults.preset),new fb(a,b)}function fb(a,b){b=b||{},this.options=i(b,eb.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=z(this),this.touchAction=new T(this,this.options.touchAction),gb(this,!0),g(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function gb(a,b){var c=a.element;g(a.options.cssProps,function(a,d){c.style[v(c.style,d)]=b?a:""})}function hb(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var ib=["","webkit","moz","MS","ms","o"],jb=b.createElement("div"),kb="function",lb=Math.round,mb=Math.abs,nb=Date.now,ob=1,pb=/mobile|tablet|ip(ad|hone|od)|android/i,qb="ontouchstart"in a,rb=v(a,"PointerEvent")!==d,sb=qb&&pb.test(navigator.userAgent),tb="touch",ub="pen",vb="mouse",wb="kinect",xb=25,yb=1,zb=2,Ab=4,Bb=8,Cb=1,Db=2,Eb=4,Fb=8,Gb=16,Hb=Db|Eb,Ib=Fb|Gb,Jb=Hb|Ib,Kb=["x","y"],Lb=["clientX","clientY"];y.prototype={handler:function(){},init:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(x(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&o(this.element,this.evEl,this.domHandler),this.evTarget&&o(this.target,this.evTarget,this.domHandler),this.evWin&&o(x(this.element),this.evWin,this.domHandler)}};var Mb={mousedown:yb,mousemove:zb,mouseup:Ab},Nb="mousedown",Ob="mousemove mouseup";j(M,y,{handler:function(a){var b=Mb[a.type];b&yb&&0===a.button&&(this.pressed=!0),b&zb&&1!==a.which&&(b=Ab),this.pressed&&this.allow&&(b&Ab&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:vb,srcEvent:a}))}});var Pb={pointerdown:yb,pointermove:zb,pointerup:Ab,pointercancel:Bb,pointerout:Bb},Qb={2:tb,3:ub,4:vb,5:wb},Rb="pointerdown",Sb="pointermove pointerup pointercancel";a.MSPointerEvent&&(Rb="MSPointerDown",Sb="MSPointerMove MSPointerUp MSPointerCancel"),j(N,y,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Pb[d],f=Qb[a.pointerType]||a.pointerType,g=f==tb,h=s(b,a.pointerId,"pointerId");e&yb&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ab|Bb)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Tb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Ub="touchstart",Vb="touchstart touchmove touchend touchcancel";j(O,y,{handler:function(a){var b=Tb[a.type];if(b===yb&&(this.started=!0),this.started){var c=P.call(this,a,b);b&(Ab|Bb)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}});var Wb={touchstart:yb,touchmove:zb,touchend:Ab,touchcancel:Bb},Xb="touchstart touchmove touchend touchcancel";j(Q,y,{handler:function(a){var b=Wb[a.type],c=R.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:tb,srcEvent:a})}}),j(S,y,{handler:function(a,b,c){var d=c.pointerType==tb,e=c.pointerType==vb;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(Ab|Bb)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Yb=v(jb.style,"touchAction"),Zb=Yb!==d,$b="compute",_b="auto",ac="manipulation",bc="none",cc="pan-x",dc="pan-y";T.prototype={set:function(a){a==$b&&(a=this.compute()),Zb&&(this.manager.element.style[Yb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){l(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),U(a.join(" "))},preventDefaults:function(a){if(!Zb){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=q(d,bc),f=q(d,dc),g=q(d,cc);return e||f&&c&Hb||g&&c&Ib?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var ec=1,fc=2,gc=4,hc=8,ic=hc,jc=16,kc=32;V.prototype={defaults:{},set:function(a){return h(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=Y(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=Y(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=Y(a,this),-1===s(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=Y(a,this);var b=s(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(c.options.event+(b?W(d):""),a)}var c=this,d=this.state;hc>d&&b(!0),b(),d>=hc&&b(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=kc)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(kc|ec)))return!1;a++}return!0},recognize:function(a){var b=h({},a);return l(this.options.enable,[this,b])?(this.state&(ic|jc|kc)&&(this.state=ec),this.state=this.process(b),void(this.state&(fc|gc|hc|jc)&&this.tryEmit(b))):(this.reset(),void(this.state=kc))},process:function(){},getTouchAction:function(){},reset:function(){}},j(Z,V,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(fc|gc),e=this.attrTest(a);return d&&(c&Bb||!e)?b|jc:d||e?c&Ab?b|hc:b&fc?b|gc:fc:kc}}),j($,Z,{defaults:{event:"pan",threshold:10,pointers:1,direction:Jb},getTouchAction:function(){var a=this.options.direction,b=[];return a&Hb&&b.push(dc),a&Ib&&b.push(cc),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Hb?(e=0===f?Cb:0>f?Db:Eb,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Cb:0>g?Fb:Gb,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return Z.prototype.attrTest.call(this,a)&&(this.state&fc||!(this.state&fc)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),j(_,Z,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&fc)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),j(ab,V,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[_b]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ab|Bb)&&!f)this.reset();else if(a.eventType&yb)this.reset(),this._timer=e(function(){this.state=ic,this.tryEmit()},b.time,this);else if(a.eventType&Ab)return ic;return kc},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===ic&&(a&&a.eventType&Ab?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=nb(),this.manager.emit(this.options.event,this._input)))}}),j(bb,Z,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[bc]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&fc)}}),j(cb,Z,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Hb|Ib,pointers:1},getTouchAction:function(){return $.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Hb|Ib)?b=a.velocity:c&Hb?b=a.velocityX:c&Ib&&(b=a.velocityY),this._super.attrTest.call(this,a)&&c&a.direction&&a.distance>this.options.threshold&&mb(b)>this.options.velocity&&a.eventType&Ab},emit:function(a){var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),j(db,V,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[ac]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&yb&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ab)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||I(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=ic,this.tryEmit()},b.interval,this),fc):ic}return kc},failTimeout:function(){return this._timer=e(function(){this.state=kc},this.options.interval,this),kc},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==ic&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),eb.VERSION="2.0.4",eb.defaults={domEvents:!1,touchAction:$b,enable:!0,inputTarget:null,inputClass:null,preset:[[bb,{enable:!1}],[_,{enable:!1},["rotate"]],[cb,{direction:Hb}],[$,{direction:Hb},["swipe"]],[db],[db,{event:"doubletap",taps:2},["tap"]],[ab]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var lc=1,mc=2;fb.prototype={set:function(a){return h(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?mc:lc},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&ic)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===mc||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(fc|gc|hc)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof V)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(s(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return g(r(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return g(r(a),function(a){b?c[a].splice(s(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&hb(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&gb(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},h(eb,{INPUT_START:yb,INPUT_MOVE:zb,INPUT_END:Ab,INPUT_CANCEL:Bb,STATE_POSSIBLE:ec,STATE_BEGAN:fc,STATE_CHANGED:gc,STATE_ENDED:hc,STATE_RECOGNIZED:ic,STATE_CANCELLED:jc,STATE_FAILED:kc,DIRECTION_NONE:Cb,DIRECTION_LEFT:Db,DIRECTION_RIGHT:Eb,DIRECTION_UP:Fb,DIRECTION_DOWN:Gb,DIRECTION_HORIZONTAL:Hb,DIRECTION_VERTICAL:Ib,DIRECTION_ALL:Jb,Manager:fb,Input:y,TouchAction:T,TouchInput:Q,MouseInput:M,PointerEventInput:N,TouchMouseInput:S,SingleTouchInput:O,Recognizer:V,AttrRecognizer:Z,Tap:db,Pan:$,Swipe:cb,Pinch:_,Rotate:bb,Press:ab,on:n,off:o,each:g,merge:i,extend:h,inherit:j,bindFn:k,prefixed:v}),typeof define==kb&&define.amd?define(function(){return eb}):"undefined"!=typeof module&&module.exports?module.exports=eb:a[c]=eb}(window,document,"Hammer");

window.ATVI = window.ATVI || {};
ATVI.components = ATVI.components || {};


// patches

if(!window.console) window.console = {};
if(!console.log) console.log = function() {};

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt) {
        var len  = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0) from += len;
        for (; from < len; from++) {
            if (from in this && this[from] === elt) return from;
        }
        return -1;
    };
}


// atvi-utils

(function($, ATVI) {

    var utils = ATVI.utils = {};
	var cookieMap, queryMap, idCounter = 0;

    utils.renderTemplate = function(template, fieldData, prefix, suffix) {
        prefix = prefix || "{{";
        suffix = suffix || "}}";
        var ret = template;
        for(var field in fieldData) {
            ret = ret.replace(new RegExp(prefix + field + suffix, "g"), fieldData[field]);
        }
        return ret;
    };

	utils.getCookies = function(update) {
        if(!cookieMap || update) {
            cookieMap = {};
            var i, cookies = document.cookie.split(";");
            for (i = 0; i < cookies.length; i++) {
                var index = cookies[i].indexOf('=');
                var x = cookies[i].substr(0, index);
                var y = cookies[i].substr(index + 1);
                x = x.replace(/^\s+|\s+$/g, '');
                if(x) cookieMap[x] = unescape(y);
            }
        }
        return cookieMap;
    };

    utils.getCookie = function(c, update) {
		return this.getCookies(update)[c];
    };

	utils.setCookie = function(name, value, opts) {
        var value = escape(value);
        opts = opts || {};

        value += ";path=" + (opts.path || "/");

		if(opts.domain) value += ";domain=" + opts.domain;

        var t = typeof opts.maxAge;
        if(t == "number" || t == "string") value += ";max-age=" + opts.maxAge;

        var e = opts.expireDate;
        if(typeof e == "number") e = new Date((new Date()).getTime() + e * 1000);
        if(e) value += ';expires=' + e.toUTCString();

		if(opts.secure) value += ";secure";

        document.cookie = name + '=' + value;
        cookieMap = null;
    };

    utils.getQueryParameters = function(update) {
        if(!queryMap || update) {
            queryMap = {};
            var q = window.location.href;
            var ind = q.indexOf("?");
            q = (ind >= 0) ? q.substring(ind + 1) : "";
            ind = q.indexOf("#");
            if(ind >= 0) q = q.substring(0, ind);
            q = q.split("&");
            for(var i = 0; i < q.length; i++) {
                p = q[i].split("=");
                if(p[0]) queryMap[p[0]] = p[1] ? decodeURIComponent(p[1]) : p[1];
            }
        }
        return queryMap;
    };

    utils.getQueryParameter = function(p, update) {
        return this.getQueryParameters(update)[p];
    };

    utils.uniqueId = function($els) {
        $els = $($els);
        var prefix = "atvi-unique-" + (new Date().getTime()) + "-";
        $els.each(function() {
            if(this.id) return;
            var id;
            while(!id || $("#" + id).length) {
                id = prefix + (idCounter++);
            }
            this.id = id;
        });
        return $els;
    };

    utils.parseUrl = function(url) {
        if(!url) return;
        var ret = {originalUrl: url};
        var m = url.match(/^(([^\/:]+:)?\/\/)?(.*)$/);
        if(m[1]) ret.protocol = m[2] || window.location.protocol;
        else {
            ret.protocol = "http:";
            var domainNeeded = true;
        }
        url = m[3];
        if(!url) return;
        m = url.match(/^(([\w-]+(\.[\w-]+)*)(:0*([1-9][0-9]*))?)?(\/.*)?$/);
        ret.host = m[1];
        if(!ret.host && domainNeeded) return;
        ret.domain = m[2];
        ret.port = parseInt(m[5] || 0) || undefined;
        ret.usedPort = ret.port || ret.protocol == "http:" ? 80 : 443;
        url = m[6];
		var ind = url.indexOf("#");
        if(ind >= 0) {
            ret.hash = url.substring(ind);
            ret.hashValue = ret.hash(1);
            url = url.substring(0, ind);
        }
        ind = url.indexOf("?");
        if(ind >= 0) {
			ret.query = url.substring(ind);
            var p = ret.queryParameters = {};
            var params = ret.query.substring(1).split("&");
            for(var i = 0; i < params.length; i++) {
				var e = params[i].split("=");
                if(e[0]) {
                    var name = e.shift();
					params[name] = e.join("+"); 
                }
            }
            url = url.substring(0, ind);
        }
        return ret;
    };

    utils.localeRegex = /^\/(\w\w(\/\w\w)?)($|\/.*$)/;
    utils.locales = {
        en: "en_us",
        da: "da_dk",
        en_uk: "en_gb",
        mx: "es_mx",
        pt: "br_pt",
        jp: "ja_jp"
    };

    utils.parseLocalizedPath = function(path) {
        var m = path.match(utils.localeRegex);
        var n = m ? m[3] || "/" : path || "/";
        var lp = m ? m[1] : "";
        var loc = (lp || "en").replace(/(\w\w)\/(\w\w)/, "$2_$1");
        loc = utils.locales[loc] || loc;
        loc = loc.replace(/^(\w\w)$/, "$1_$1");
        if(lp) lp = "/" + lp;
        return {
            normalized: n,
            locPart: lp,
            locale: loc,
            region: loc.substring(3),
            language: loc.substring(0, 2)
        };
    };

    utils.base64Map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    utils.decodeBase64 = function(inp) {
        var map = utils.base64Map;
        var ret = "";
        var in1, in2, in3, in4, out1, out2, out3, i = 0;

        inp = inp.replace(/[^a-zA-Z0-9\+\/\=]/g, "");
        do {
            in1 = map.indexOf(inp.charAt(i++) || "=");
            in2 = map.indexOf(inp.charAt(i++) || "=");
            in3 = map.indexOf(inp.charAt(i++) || "=");
            in4 = map.indexOf(inp.charAt(i++) || "=");

            out1 = (in1 << 2) | (in2 >> 4);
            out2 = ((in2 & 15) << 4) | (in3 >> 2);
            out3 = ((in3 & 3) << 6) | in4;

            ret = ret + String.fromCharCode(out1);
            if (in3 != 64) ret = ret + String.fromCharCode(out2);
            if (in4 != 64) ret = ret + String.fromCharCode(out3);
        } while (i < inp.length);

        return ret;
    };

    utils.createRegistry = (function() {

        var register = function(r, $el, obj, cl) {
			var id;
            if(typeof $el == "string") id = $el;
            else {
                $el = resolve($el, cl);
                if(!$el.length) return null;
				id = $el[0].id;
            }
            var c = r.store[id];
            if(!c) {
                c = r.store[id] = obj || {};
            }
            return {
                $el: $el,
                context: c
            };
        };

        var get = function(r, $el, cl) {
            var id = typeof $el == "string" ? $el : resolve($el, cl)[0].id;
			return r.store[id];
        };

        var getAll = function(r) {
            var ret = [];
            for(var id in r.store) {
                if(r.store.hasOwnProperty(id)) ret.push({id: id, context: r.store[id]});
            }
            return ret;
        };

        var purge = function(r, $el, cl) {
            var id = typeof $el == "string" ? $el : resolve($el, cl)[0].id;
            var a = r.store[id];
            r.store[id] = null;
			delete r.store[id];
            return !!a;
        };

        var purgeAll = function(r) {
			for(var id in r.store) {
                if(r.store.hasOwnProperty(id)) {
                    r.store[id] = null;
                    delete r.store[id];
                }
            }
        };

        var resolve = function($el, cl) {
            if(cl && !$el.hasClass(cl)) {
                var c = $el.find("." + cl);
                if(c.length) $el = c.first();
                else {
					c = $el.parents("." + cl);
                    if(c.length) $el = c.first();
                }
            }
            return utils.uniqueId($el);
        };

        return function(reqClass) {
			var r = {
                store: {},
                register: function($el, obj) {
                    return register(r, $el, obj, reqClass);
                },
                get: function($el) {
					return get(r, $el, reqClass);
                },
                purge: function($el) {
					return purge(r, $el, reqClass);
                },
                getAll: function() {
                    return getAll(r);
                },
                purgeAll: function() {
					return purgeAll(r);
                }
    	    };
            return r;
        };

    })();

    utils.createReadyQueue = function(arr, alwaysAfter) {

		var ready = false;
        var queue = [];
        var onReady = function(callback) {
            if(ready) {
				if(alwaysAfter) setTimeout(callback, 0);
                else callback();
            }
            else queue.push(callback);
        };

        var events = arr.slice(0);
        
        var processQueue = function() {
            while(queue.length) queue.shift()();
        };
        
        var trigger = function(ev) {
            for(var i = 0; i < events.length; i++) {
                if(events[i] == ev) {
                    events.splice(i, 1);
                    break;
                }
            }
            if(!events.length) {
                ready = true;
                processQueue();
            }
        };

        var add = function(ev) {
			events.push(ev);
            ready = false;
        };

        return {
            on: onReady,
            trigger: trigger,
            add: add,
            get: function() { return events.slice(0); }
        };
    };

})(jQuery, ATVI);


// cookies banner for ATVI V2 sites
(function() {

    var initCookies = function() {

        if(typeof ATVI.utils.getCookie("atvi-cookie") == "undefined") { //If atvi-cookie cookie exists ...

            var banner = $(".atvi-cookie-disclaimer"); //get div container
            if(banner.length) { //if div container is in the DOM
                banner.addClass("show"); //add class "show" to animate banner up
            }

            var btn = banner.find("button, .close-cookies"); //get close button
            btn.click(function(e){
                banner.removeClass("show"); //remove "show" class to animate banner down
                ATVI.utils.setCookie("atvi-cookie", true, {expireDate: (3600 * 24 * 365)}); //when user clicks close button, set cookie to expire in a  year
            });
        } 
    };

    $(initCookies); //init when DOM is loaded 
})();


(function($, ATVI) {

    var lib = ATVI.library = {};

    var dependencies = {
        jScrollPane: "basic-ui"
    };

    var loaded = {};
    var onLoadHandlers = {};
    var loading = {};

    lib.registerLibrary = function(n) {
		loaded[n] = true;
		getOnLoadQueue(n).trigger("load");
        var q = loading[n] || [];
        while(q.length) {
			q.shift()();
        }
    };

    lib.loadDependencies = function() {
        for(var i = 0; i < arguments.length; i++) {
			lib.withDependency(arguments[i]);
        }
    };

    lib.withDependency = function(deps, callback) {
        var i, library, types = "";
        if($.isArray(deps)) {
			var evs = [];
            for(i = 0; i < deps.length; i++) {
                var dep = deps[i];
                var depName = typeof dep == "object" ? dep.name : dep;
				if(evs.indexOf(depName) >= 0) continue;
                var library = dependencies[depName] || depName;
                if(loaded[library]) continue;
                evs.push(dep);
            }
            if(!evs.length) {
				if(callback) callback();
                return;
            }
			var q = ATVI.utils.createReadyQueue(evs);
            if(callback) q.on(callback);
            for(i = 0; i < evs.length; i++) {
                var cb = (function(l) {
                    return function() {
                        q.trigger(l);
                    };
                })(evs[i]);
                lib.withDependency(evs[i], cb);
            }
			return;
        }

        if(typeof deps == "object") {
            var o = deps;
            depName = o.name;
            types = o.types;
        } else {
            depName = deps;
        }
		library = dependencies[depName] || depName;
        if(loaded[library]) {
			if(callback) callback();
            return;
        }

		var a = loading[library];
        if(!a) {
            var doLoad = true;
        	a = loading[library] = [];
        }
        if(callback) a.push(callback);
        if(doLoad) loadLibrary(library, types);
    };

    var loadLibrary = function(libName, types) {
        var urlBase = "/etc/designs/atvi-ui-v2/clientlibs/" + libName;
        if(types != "css")
            $.ajax({
                dataType: "script",
                cache: true,
                url: urlBase + ".js"
            });
        if(types != "js")
            $("<link>")
                .appendTo($('head'))
                .attr({type : 'text/css', rel : 'stylesheet'})
                .attr('href', urlBase + '.css');
    };

    var getOnLoadQueue = function(dep) {
		if(!onLoadHandlers[dep]) onLoadHandlers[dep] = ATVI.utils.createReadyQueue(["load"]);
		return onLoadHandlers[dep];
    };

    lib.onDependencyLoad = function(dep, handler) {
		getOnLoadQueue(dep).on(handler);
    };

})(jQuery, ATVI);

// browser
(function() {
    var b = ATVI.browser = {};
    b.hasPointerEvents = !!window.PointerEvent;
    b.hasTouchEvents = 'ontouchend' in document;
    b.isTouch = b.hasPointerEvents || b.hasTouchEvents;

    var ua = navigator.userAgent;
	b.isAndroid = !!ua.match(/Android/i);
    b.isAndroidMobile = b.isAndroid && !!ua.match(/Mobile/i);
    b.isAndroidTablet = b.isAndroid && !b.isAndroidMobile;
    b.isBlackberry = !!ua.match(/BlackBerry/i);
	b.isIPhone = !!ua.match(/iPhone/i);
    b.isIPad = !!ua.match(/iPad/i);
    b.isIPod = !!ua.match(/iPod/i);
    b.isIos = b.isIPhone || b.isIPad || b.isIPod;
	b.isOperaMini = !!ua.match(/Opera Mini/i);
	b.isIeMobile = !!ua.match(/IEMobile/i);

    b.isBot = !!ua.match(/googlebot|yahoo|msnbot|bingbot|slurp|teoma/i);

    b.isPhone = b.isAndroidMobile || b.isBlackberry || b.isIPhone || b.isIPod || b.isOperaMini || b.isIeMobile;
    b.isTablet = b.isAndroidTablet || b.isIPad;

})();


// analytics

ATVI.analytics = ATVI.analytics || {};
(function($, ATVI) {

	var ana = ATVI.analytics;

    ana.siteId = "cms-generic";
    ana.ns_site = "dev";
	ana.prefixesToStrip = [];
    ana.homePageFilename = "home";
    ana.inited = false;

    ana.init = function() {
        ana.$body = $("body");
        ana.setupPageLoad();
        var go = function() {
            ana.inited = true;
	        //ana.setupClickHandlers($("body"));
        };

        if(window.ssobar && ssobar.onReady) ssobar.onReady(go);
        else go();
    };

    ana.setupClickHandlers = function(root) {
        if(!ana.inited) return;
        /*
        root = $(root);
        this.setupTaggedElements(root);
        this.setupLinks(root);
        */
    };

    ana.stripPathPrefixes = function(path) {
        var ret = path;
        for(var i = 0; i < this.prefixesToStrip.length; i++) {
            ret = ret.replace(new RegExp("^" + this.prefixesToStrip[i] + "(/.*)?$"), "$1");
        }
        return ret;
    };

    ana.splitPath = function(path, includeFileExtension) {
        var ret = path.replace(/^\//, "").replace(/\/$/, "");
        if(!includeFileExtension) ret = ret.replace(/(.*)\.\w+$/, "$1");
        ret = ret.replace(/\./g, '_').replace(/\/+/g, '.');
        if(ret.length == 0) ret = this.homePageFilename;
        return ret.split('.');
    };

    ana.getSiteData = function() {
        var sitename = ana.siteId;
        var locPathname = ana.stripPathPrefixes(window.location.pathname);
        var parsed = ATVI.utils.parseLocalizedPath(locPathname);
        locPathname = ana.stripPathPrefixes(parsed.normalized);
        locPathname = ana.splitPath(locPathname);

        var hierarchy = [];
        var i = locPathname.length - 4;
        if(i < 0) i = 0;
        var top = sitename;
        for(; i < locPathname.length; i++) {
            top += "." + locPathname[i];
            hierarchy.push(top);
        }
        
        while(hierarchy.length < 4) {
            hierarchy.push(top);
        }

        return {
            csName: top,
            csSection: hierarchy[0],
            csSubSection: hierarchy[1],
            csCtitle: hierarchy[2],
            csCtype: hierarchy[0],
            csPathLocale: parsed.locale
        };
    };
    
    ana.setupPageLoad = function() {
        if (location.hostname.indexOf("activision") == -1  && location.hostname.indexOf("guitarhero") == -1) {
            var cookies = ATVI.utils.getCookies(true);
            var instr = {};
            if(cookies.ATVI_INSTRUMENT) {
                try {
                    instr = JSON.parse(cookies.ATVI_INSTRUMENT);
                } catch(e) {
                    instr = {};
                }
            }

            var siteData = this.getSiteData();
            
            var prevPage = instr.page;
            instr.page = siteData.csName;
            
            var pageData = {
                site: this.siteId,
                language: cookies.ACT_SSO_LOCALE || "en_US",
                "name": siteData.csName,
                previous_page: prevPage,
                c_type: siteData.csCtype,
                c_title: siteData.csCtitle,
                section: siteData.csSection,
                sub_section: siteData.csSubSection,
                path_locale: siteData.csPathLocale
            };
            
            var eventCookie = cookies.ACT_SSO_EVENT;
            if(eventCookie) {
                eventCookie = eventCookie.replace(/^\"(.*)\"$/, "$1");
                if(instr.event != eventCookie) {
                    instr.event = eventCookie;
                    eventCookie = eventCookie.split(":");
                    if(eventCookie[0])
                        pageData.sso_event = eventCookie[0];
                }
            }
    
            //ATVI.utils.setCookie("ATVI_INSTRUMENT", JSON.stringify(instr));
            //this.sendData(pageData);
        }
    };

    ana.setupTaggedElements = function(root) {
        /*
        var self = this;
		root.find(".atvi-instrument").click(function() {
            var classes = this.className.split(/\s+/);
            var className;

            for(i in classes) {
                if(classes[i].indexOf("atvi-instrument-") >= 0) {
                    className = classes[i];
                    className = className.substring("atvi-instrument-".length);
                    break;
                }
            }

            if(className) {

                var $this = $(this);
                var id = ana.findComponentId($this);
                var strippedId = id.replace(/^(.+)-analytics-suffix-.*$/, "$1");

                var data = {
                    action_type: className,
                    action_details: strippedId,
                    ns_type: "hidden"
                };

                var go = function() {
					ana.sendData(data);
                };

                if(ana.customData[className]) {
					if(!ana.customData[className]($this, data, go)) go();
                } else go();
            }
        });
        */
    };

    // add to this for component handling
    ana.customData = {}
	// e.g.
    ana.customData.wheretobuy = ana.customData.wheretobuy ||function($el, data) {};

    ana.setupLinks = function(root) {

        root.find("a").not(".atvi-instrument").not(".atvi-no-instrument").click(function() {
            
            var href = this.href;
            var $this = $(this);
            
            var data = {
                action_type: "atvi-anchor",
                href: href,
                ns_type: "hidden"
            };
            
            var detail = "";
            var id = ana.findComponentId($this);
            if(id) {
                var strippedId = id.replace(/^(.+)-analytics-suffix-.*$/, "$1");
                detail += strippedId + ": ";
            }
            var linkText = $this.text().substring(0, 30);
            if(linkText.length >= 30) linkText += "...";
            detail += linkText;
            data.action_details = detail;
            
            //ana.sendData(data);
            
        });
    };

    ana.findComponentId = function($el, selector) {
		var id = $el.attr("id");
        if(id && !$el.hasClass("ignore-id")) return id;
        var i, p = $el.parents(selector);
        for(i = 0; i < p.length; i++) {
            id = p[i].id;
			if(id && !p.eq(i).hasClass("ignore-id")) return id;
        }
		return "";
    };

    ana.sendEvent = function(actionType, actionDetails, params) {
        var data = {
            action_type: actionType,
            action_details: actionDetails,
            ns_type: "hidden"
        };
        params = params || {};
        for(var i in params) {
            if(!params.hasOwnProperty(i)) continue;
            data[i] = params[i];
        }
        //this.sendData(data);

        var ev = document.createEvent("CustomEvent");
        ev.initCustomEvent("atviInstrumentEvent", true, true, { type: actionType, details: actionDetails, data: data });
        document.body.dispatchEvent(ev);
    };

    ana.sendData = function (data) {
        /**
        var loc = 'http' + (document.location.href.charAt(4) == 's' ? 's://sb' : '://b') + '.scorecardresearch.com/p?c1=2&c2=14880931';
        
        // common values
        data.visitorID = this.getVisitorId();
        data.anonVisitorID = this.getAnonVisitorId();
        data.ns__t = "" + new Date().getTime();
        data.ns_c = document.characterSet || document.defaultCharset || "";
        data.c8 = document.title;
        data.c7 = document.location.href || document.URL;
        data.c9 = document.referrer;
        
        if(ATVI.uxTest && ATVI.uxTest.campaigns) {
            var campaigns = ATVI.uxTest.campaigns;
            var campaignNames = [], campaignIds = [];
            var recipeNames = [], recipeIds = [];
            var offerNames = [], offerIds = [];
            var mboxNames = [];
            for(var i = 0; i < campaigns.length; i++) {
                campaignNames.push(campaigns[i].campaignName);
                campaignIds.push(campaigns[i].campaignId);
                recipeNames.push(campaigns[i].recipeName);
                recipeIds.push(campaigns[i].recipeId);
                offerNames.push(campaigns[i].offerName);
                offerIds.push(campaigns[i].offerId);
                mboxNames.push(campaigns[i].mboxName);
            }
            data.campaignName = campaignNames.join(",");
            data.campaignId = campaignIds.join(",");
            data.recipeName = recipeNames.join(",");
            data.recipeId = recipeIds.join(",");
            data.offerName = offerNames.join(",");
            data.offerId = offerIds.join(",");
            data.mboxName = mboxNames.join(",");
        }
        
        var cookies = ATVI.utils.getCookies(true);
        if(cookies.comScore) data.comScore = cookies.comScore; 
        
        data.ns_site = ATVI.pageEnv == "prod" ? (this.ns_site || "dev") : "dev";
        
        for(var i in data) {
            loc += "&" + i + "=" + encodeURIComponent(data[i]);
        }
        
        if (loc.length > 2048) {
            var s = loc.substr(0, 2040).lastIndexOf("&");
            loc = (loc.substring(0, s) + "&ns_cut=" + encodeURIComponent(loc.substring(s + 1))).substr(0, 2048);
        }

        if(!ana.$container) ana.$container = $('<div>').css({height: 0, width: 0, overflow: "hidden"}).appendTo(ana.$body);
        	$('<div>').css({height: 0, width: 0, overflow: "hidden"}).appendTo(ana.$container)
        	.append('<img src="' + loc + '" height="1" width="1" alt="*" />' );
        **/
    };

    ana.getVisitorId = function() {
        var c = ATVI.utils.getCookies(true);

        var s = c.ACT_SSO_COOKIE || c.s_ACT_SSO_COOKIE; 

        if(s) {
            var dec = ATVI.utils.decodeBase64(s);
            var index = dec.indexOf(":");
            if(index >= 0) dec = dec.substring(0, index);
            return dec;
        }

        return this.getAnonVisitorId();
    };

    ana.getAnonVisitorId = function() {

        var c = ATVI.utils.getCookies(true);
        if(c.ATVI_VISITOR_ID) return c.ATVI_VISITOR_ID;

        var date = new Date();
        var anonId = "anon-" + date.getTime() + "-" + Math.random();

        date.setTime(date.getTime() + 5 * 356 * 24 * 60 * 60000);
        ATVI.utils.setCookie("ATVI_VISITOR_ID", anonId, date);

        return anonId;
    };


    $(function() {
        ana.init();
    });

})(jQuery, ATVI);


// touch

ATVI.touch = {};
(function($, ATVI) {

    var touch = ATVI.touch;
	var touchDist = ATVI.browser.isPhone ? 35 : 60;

    touch.onSimpleHorizontal = function($el, opts) {

        var h = opts.hammer || Hammer($el[0], { swipe_velocity: opts.swipeVelocity || .2 });
        
        h.on("swipeleft swiperight dragleft dragright dragend dragstart", function(ev) {
			var t = ev.type, dx = Math.abs(ev.deltaX), dy = Math.abs(ev.deltaY) + .1, rat = dx / dy, dt = ev.deltaTime;

            if(t != "dragstart" && t != "dragend") {
                ev.preventDefault();
            }

            if(t == "dragleft" && opts.dragLeft) opts.dragLeft(ev);
            if(t == "dragright" && opts.dragRight) opts.dragRight(ev);
            if(t == "dragstart" && opts.dragStart) opts.dragStart(ev);
            if(t == "dragend" && opts.dragEnd) opts.dragEnd(ev);

            if((t == "dragleft" && dx > touchDist && rat > 2 && dt < 700) || t == "swipeleft") {
                if(opts.swipeLeft) opts.swipeLeft(ev);
                //ev.stopDetect();
            }
            if((t == "dragright" && dx > touchDist && rat > 2 && dt < 700) || t == "swiperight") {
                if(opts.swipeRight) opts.swipeRight(ev);
                //ev.stopDetect();
            }
        });

        return {
            hammerObj: h
        };
    };

})(jQuery, ATVI);

