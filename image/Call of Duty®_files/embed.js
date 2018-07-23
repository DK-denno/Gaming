(function(window){
  var tgbEmbed = window.tgbEmbed;
  if (!tgbEmbed) {
    tgbEmbed = {
      domain: window.tagboardDomain || "https://embed.tagboard.com",
      modalFrm: null,
      frames: [],

      con: {
        log: function(s){console.log(s);},
        warn: function(s){console.warn?console.warn(s):console.log(s);},
        error: function(s){console.error?console.error(s):console.log(s);}
      },

      insertIFrame: function _insertIFrame(div, embedId, preview, nostats) {
        var ifrm = document.createElement("IFRAME"),
            frameID = tgbEmbed.frames.length + 1,
            frameURL = tgbEmbed.domain + "/" + embedId;

        if(preview) {
          frameURL += '?preview=true';
        }

        if(nostats) {
          var prefix = preview ? '&' : '?';
          frameURL += prefix + 'nostats=true';
        }

        frameURL +=  "#id=" + frameID;

        ifrm.setAttribute("src", frameURL);
        ifrm.setAttribute("onload", "tgbEmbed.frameLoaded(" + frameID + ")");
        ifrm.setAttribute("class", "tagboard-iframe");
        ifrm.setAttribute("tgb-frame-id", frameID);
        ifrm.name="tagboard";
        ifrm.setAttribute("style", "border:0; width:100%; height:100%");
        ifrm.setAttribute("title", "Tagboard Embed");
        ifrm.setAttribute("scrolling", "no");

        div.appendChild(ifrm);
        return ifrm;
      },

      frameLoaded: function _frameLoaded(frame_id) {
        if (tgbEmbed.modalFrm) {
          tgbEmbed.modalFrm.contentWindow.postMessage('tgbPingFrames', tgbEmbed.domain);
        }

        tgbEmbed.execForFrames(function(ifrm){
          ifrm.contentWindow.postMessage('location:' + JSON.stringify(window.location), tgbEmbed.domain);
          ifrm.contentWindow.postMessage('height?', tgbEmbed.domain);
        }, frame_id);
      },

      execForFrames: function _execForFrame(func, frame_id) {
        tgbEmbed.frames.some(function(ifrm){
          var match = ifrm.getAttribute('tgb-frame-id') == frame_id;
          if (!frame_id || match) {
            func(ifrm);
            return frame_id ? true : false;
          }
          return false;
        });
      },

      createModalIframe: function _createModalIframe() {
        if (document.getElementsByName('tagboard-modal').length) { return; }

        var ifrm = document.createElement("iframe"),
            style = document.createElement('style'),
            css = '.tgb-noscroll { overflow: hidden; }';

        ifrm.setAttribute("src", tgbEmbed.domain + "/embed-modal");
        ifrm.setAttribute("class", "tagboard-modal");
        ifrm.name="tagboard-modal";
        ifrm.setAttribute("style", "border:0!important; position:fixed!important; top:0!important; left:0!important; width:100%!important; height:100%!important; z-index:999999!important; display:none; visibility:hidden;");
        ifrm.setAttribute("scrolling", "no");
        ifrm.setAttribute("title", "Tagboard Post Details");

        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));

        document.getElementsByTagName('head')[0].appendChild(style);
        document.getElementsByTagName("body")[0].appendChild(ifrm);
        tgbEmbed.modalFrm = ifrm;
      },

      setFrameHeight: function _setFrameHeight(height, frame_id){
        tgbEmbed.execForFrames(function(ifrm){
            var prev = parseInt(ifrm.style.height, 10),
              newHeight = height;

            ifrm.style.height = newHeight + "px";
        }, frame_id);
      },

      handleFrameMessage: function _handleFrameMessage(e) {
        var body, iframe;

        if (e.origin == tgbEmbed.domain) {
          var dataObj = {};
          e.data.split('&').forEach(function(e){
            var d = e.split(':');
            dataObj[d[0]] = d.length > 1 ? d[1] : d[0];
          });

          if (dataObj.height) {
            tgbEmbed.setFrameHeight(parseInt(dataObj.height), dataObj.frame_id);
          }

          if (e.data === "needsModalFrame" && !tgbEmbed.modalFrm) {
            tgbEmbed.createModalIframe();
          } 

          if (e.data === "tgbShowModalIframe") {
            body = document.getElementsByTagName("body")[0],
            iframe = document.getElementsByClassName('tagboard-modal')[0];

            iframe.style.display = 'block';
            iframe.style.visibility = 'visible';
            body.classList.add('tgb-noscroll');
          }

          if (e.data === "tgbHideModalIframe") {
            body = document.getElementsByTagName("body")[0],
            iframe = document.getElementsByClassName('tagboard-modal')[0];

            iframe.style.display = 'none';
            iframe.style.visibility = 'hidden';
            body.classList.remove('tgb-noscroll');
          }

          if(e.data.indexOf('tgbRemoveIframe') === 0) {
            var id = e.data.substr(e.data.indexOf(':')+1),
                element = document.querySelector("iframe[tgb-frame-id='" + id + "']");
            element.parentNode.removeChild(element);
          }
        }
      },

      initializeFrames: function _initializeFrames() {
        var elems = document.getElementsByClassName('tagboard-embed');
        for (var i = 0; i < elems.length; ++i) {
          var div = elems[i],
              eid = div.getAttribute('tgb-embed-id'),
              noStats =  div.getAttribute('tgb-no-stats') == 'true',
              previewMode = div.getAttribute('tgb-preview-mode') == 'true';

          if ((div.nodeName === 'DIV') && eid && !div.getAttribute('tgb-built-iframe')) {
            tgbEmbed.frames.push(tgbEmbed.insertIFrame(div, eid, previewMode, noStats));
            div.setAttribute('tgb-built-iframe', "1");
          }
        }
      }
    };

    window.tgbEmbed = tgbEmbed;

    window.addEventListener('message', tgbEmbed.handleFrameMessage, false);
  }

  window.tgbEmbed.initializeFrames();

})(window);
