webpackJsonp([1],{113:function(t,e){},114:function(t,e){},115:function(t,e){},116:function(t,e){},144:function(t,e,i){i(115);var n=i(16)(i(59),i(149),"data-v-737c6c54",null);t.exports=n.exports},145:function(t,e,i){i(116);var n=i(16)(i(60),i(150),null,null);t.exports=n.exports},146:function(t,e,i){i(113);var n=i(16)(i(61),i(147),"data-v-0b9b0cff",null);t.exports=n.exports},147:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"window",style:t.getStyle()},[i("div",{ref:"header",staticClass:"header"},[i("span",{staticClass:"title"},[t._v(t._s(t.title))]),t._v(" "),i("a",{staticClass:"close-video no-drag",attrs:{title:"Close"},on:{click:function(e){e.preventDefault(),t.requestClose(e)}}},[t._v("close")])]),t._v(" "),i("div",{staticClass:"content"},[t._t("default")],2),t._v(" "),i("div",{ref:"left",staticClass:"left resize"}),t._v(" "),i("div",{ref:"right",staticClass:"right resize"}),t._v(" "),i("div",{ref:"top",staticClass:"top resize"}),t._v(" "),i("div",{ref:"bottom",staticClass:"bottom resize"}),t._v(" "),i("div",{ref:"leftTop",staticClass:"left-top resize"}),t._v(" "),i("div",{ref:"rightTop",staticClass:"right-top resize"}),t._v(" "),i("div",{ref:"leftBottom",staticClass:"left-bottom resize"}),t._v(" "),i("div",{ref:"rightBottom",staticClass:"right-bottom resize"})])},staticRenderFns:[]}},148:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("graph-view",{staticClass:"visualization",attrs:{graph:t.currentGraph},on:{selected:t.onVideoSelected}}),t._v(" "),i("form",{attrs:{id:"searchForm"},on:{submit:function(e){e.preventDefault(),t.searchFormSubmitHandler(e)}}},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.searchString,expression:"searchString"}],attrs:{type:"text",id:"searchString",placeholder:"Enter YouTube search query",autofocus:""},domProps:{value:t.searchString},on:{input:function(e){e.target.composing||(t.searchString=e.target.value)}}}),t._v(" "),i("input",{attrs:{type:"submit",id:"startSearch",title:"Start visualization",value:"Show Graph"}})]),t._v(" "),i("div",{attrs:{id:"log"}}),t._v(" "),i("video-preview",{attrs:{videoId:t.selectedVideo},on:{close:t.closeVideo}}),t._v(" "),i("div",{staticClass:"footer"},[i("a",{staticClass:"about-link",on:{click:function(e){e.preventDefault(),t.showAbout=!0}}},[t._v("About")])]),t._v(" "),i("div",{attrs:{id:"copyText"}},[t._v("(C) 2012 Andrei Kashcha")]),t._v(" "),t.showAbout?i("div",{attrs:{id:"about"}},[i("h2",[t._v("About Yasiv")]),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),i("a",{staticClass:"primary-action close-about",attrs:{href:"#",title:"Close this message"},on:{click:function(e){e.preventDefault(),t.showAbout=!1}}},[t._v("Close")])]):t._e()],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{"text-align":"left"}},[i("p",[t._v("This web site shows related videos from YouTube.")]),t._v(" "),i("p",[t._v('Enter a search term in the box above, and press the "Show Graph" button.')]),t._v(" "),i("p",[t._v("Each icon is a YouTube video. Each connection means that videos are related (according to YouTube).")]),t._v(" "),i("p",[i("a",{attrs:{href:"https://twitter.com/anvaka"}},[t._v("Andrei Kashcha")])])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ul",[i("li",[i("a",{attrs:{href:"https://github.com/anvaka/yasiv-youtube"}},[t._v("GitHub")])]),t._v(" "),i("li",[i("a",{attrs:{href:"https://twitter.com/#!/yasivcom"}},[t._v("Twitter")])]),t._v(" "),i("li",[i("a",{attrs:{href:"http://www.facebook.com/pages/Yasiv/234739739945193"}},[t._v("Facebook")])]),t._v(" "),i("li",[i("a",{attrs:{href:"mailto:anvaka@yasiv.com"}},[t._v("Contact")])])])}]}},149:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("svg",[i("g",{ref:"scene"},[i("g",t._l(t.edges,function(e){return i("path",{attrs:{stroke:"#999","data-from":e.fromId,"data-to":e.toId,d:t.computeLinkPath(e),"marker-end":"url(#Triangle)"}})})),t._v(" "),i("g",t._l(t.nodes,function(t){return i("image",{staticClass:"video-thumbnail",attrs:{width:"60",height:"45","data-id":t.id,"xlink:href":t.data.imageUrl,x:t.pos.x-30,y:t.pos.y-22.5}})})),t._v(" "),i("g",[t.tooltip.visible?i("text",{attrs:{"text-anchor":"middle",x:t.tooltip.x,y:t.tooltip.y}},[t._v(t._s(t.tooltip.text))]):t._e()])]),t._v(" "),i("defs",[i("marker",{attrs:{id:"Triangle",viewBox:"0 0 10 10",refX:"5",refY:"5",markerUnits:"strokeWidth",markerWidth:"10",markerHeight:"5",orient:"auto"}},[i("path",{attrs:{d:"M 0 0 L 10 5 L 0 10 z"}})])])])])},staticRenderFns:[]}},150:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("window",{directives:[{name:"show",rawName:"v-show",value:t.videoId,expression:"videoId"}],attrs:{title:t.title},on:{close:t.closeVideo}},[i("div",{attrs:{id:"player"}})])},staticRenderFns:[]}},46:function(t,e,i){i(114);var n=i(16)(i(58),i(148),null,null);t.exports=n.exports},49:function(t,e,i){"use strict";var n=i(68),o=i.n(n),s=i(69),r=i.n(s),a=i(44),c=i.n(a),u=function(){function t(){o()(this,t),this.canceled=!1,this.progressComplete=!1,this.events=c()({})}return r()(t,[{key:"cancel",value:function(){this.canceled=!0}},{key:"complete",value:function(t){this.progressComplete=!0,this.update(t)}},{key:"onProgress",value:function(t,e){this.events.on("progress",t,e)}},{key:"update",value:function(t){this.events.fire("progress",t)}},{key:"isCanceled",value:function(){return this.canceled}},{key:"isCompleted",value:function(){return this.progressComplete}}]),t}();e.a=u},50:function(t,e,i){"use strict";function n(t,e,i){function n(t){return e(t)}function r(t){if(!(t.touches.length>1)){if(!(new Date-c>o)){var e=t.changedTouches[0],i=e.pageX-u.x,r=e.pageY-u.y;i*i+r*r<s&&n(t)}}}function a(t){1===t.touches.length&&(c=new Date,u={x:t.touches[0].pageX,y:t.touches[0].pageY})}var c=void 0,u=void 0;return t.addEventListener("click",n,i),t.addEventListener("touchend",r,i),t.addEventListener("touchstart",a,i),function(){t.removeEventListener("click",n),t.removeEventListener("touchend",r),t.removeEventListener("touchstart",a)}()}e.a=n;var o=300,s=25},51:function(t,e,i){"use strict";function n(t,e){function i(){u(),v(),t.removeEventListener("mousedown",r),t.removeEventListener("touchstart",d)}function n(){m||(m=document.createElement("div"),m.classList.add("drag-overlay"),m.style.left="0",m.style.top="0",m.style.right="0",m.style.bottom="0",m.style.position="fixed",m.style.position="fixed",m.style.zIndex="42"),document.body.appendChild(m)}function o(){m&&document.body.removeChild(m)}function r(t){if(!t.target.classList.contains("no-drag")){if(w)return t.stopPropagation(),!1;n();if(1===t.button&&null!==window.event||0===t.button)return g=t.clientX,y=t.clientY,document.addEventListener("mousemove",a),document.addEventListener("mouseup",c),!1}}function a(t){if(!w){var i=t.clientX-g,n=t.clientY-y;g=t.clientX,y=t.clientY,e(i,n)}}function c(){s.release(),u()}function u(){document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",c),o()}function d(t){if(1===t.touches.length)return h(t,t.touches[0])}function h(t){if(!t.target.classList.contains("no-drag")){t.stopPropagation(),t.preventDefault();var e=t.touches[0];g=e.clientX,y=e.clientY,l()}}function l(){w||(w=!0,document.addEventListener("touchmove",p),document.addEventListener("touchend",f),document.addEventListener("touchcancel",f))}function f(t){t.touches.length>0?(g=t.touches[0].clientX,y=t.touches[0].clientY):(w=!1,v())}function v(){document.removeEventListener("touchmove",p),document.removeEventListener("touchend",f),document.removeEventListener("touchcancel",f)}function p(t){if(1===t.touches.length){t.stopPropagation();var i=t.touches[0],n=i.clientX-g,o=i.clientY-y;g=i.clientX,y=i.clientY,e(n,o)}}var m=void 0,g=void 0,y=void 0,w=!1;return function(){t.addEventListener("mousedown",r),t.addEventListener("touchstart",d)}(),{dispose:i}}function o(t){return t.stopPropagation(),!1}e.a=n;var s=function(){function t(t){n=window.document.onselectstart,s=window.document.ondragstart,window.document.onselectstart=o,i=t,i.ondragstart=o}function e(){window.document.onselectstart=n,i&&(i.ondragstart=s)}var i=void 0,n=void 0,s=void 0;return{capture:t,release:e}}()},52:function(t,e,i){"use strict";function n(t){var e=t.pos.to,i=t.pos.from;return{from:o(i.x-a.width/2,i.y-a.height/2,i.x+a.width/2,i.y+a.height/2,i.x,i.y,e.x,e.y)||i,to:o(e.x-a.width/2,e.y-a.height/2,e.x+a.width/2,e.y+a.height/2,e.x,e.y,i.x,i.y)||e}}function o(t,e,i,n,o,s,a,c){return r()(t,e,t,n,o,s,a,c)||r()(t,n,i,n,o,s,a,c)||r()(i,n,i,e,o,s,a,c)||r()(i,e,t,e,o,s,a,c)}var s=i(117),r=i.n(s);e.a=n;var a={width:60,height:45}},53:function(t,e,i){"use strict";function n(t){function e(t,e){e.isCanceled()||(t?(e.update("Searching related videos..."),p=t,p.isPinned=!0,p.isRoot=!0,l(o(p),p),i.i(c.b)(p,10,function(t){n(t,e)},function(){e.complete("Could not find related videos")})):e.complete("No videos found for your request"))}function n(t,e){if(!e.isCanceled()){var i=t.items;i&&0!==i.length||e.complete(),m.beginUpdate();for(var n=0;n<i.length;++n){var r=i[n];l(o(r),r),v(o(r),o(p)),r.level=0}m.endUpdate(),e.update("Found "+i.length+" related videos. Searching more..."),s(i,e)}}function s(t,e){if(!e.isCanceled()){0===t.length&&e.complete();var n=t.shift();if(n.level>=u)return void e.complete();i.i(c.b)(n,h,function(i){if(!e.isCanceled()){var r=i.items,a=o(n);m.beginUpdate();for(var c=0;c<r.length;++c){var u=r[c],h=o(u),f=m.getNode(h);!f&&c<d&&(l(h,u),u.level=n.level+1,t.push(u),f=u),!m.hasLink(h,a)&&f&&v(h,a)}m.endUpdate(),e.update("Found "+m.getNodesCount()+" videos. Searching more..."),s(t,e)}},function(){e.update("Could not find related videos for one video. Skipping this one and searching for more..."),s(t,e)})}}function l(t,e){m.addNode(t,f(e))}function f(t){return{isPinned:t.isPinned,imageUrl:t.snippet.thumbnails.medium.url,title:t.snippet.title}}function v(t,e){var i=m.getNode(t),n=m.getNode(e);i&&n&&m.addLink(t,e)}var p=void 0,m=r()({uniqueLinkIds:!1}),g=new a.a;return i.i(c.a)(t,function(t){e(t.items&&t.items[0],g)},function(){g.complete("No video found for your request")}),{progress:g,graph:m}}function o(t){return t.id.videoId}var s=i(120),r=i.n(s),a=i(49),c=i(56);e.a=n;var u=1,d=10,h=15},54:function(t,e,i){"use strict";function n(t){return new s.a(function(e,i){function n(){e(this.responseText)}var o=new XMLHttpRequest;o.addEventListener("load",n),o.addEventListener("error",i),o.open("GET",t),o.send()})}var o=i(67),s=i.n(o);e.a=n},55:function(t,e,i){"use strict"},56:function(t,e,i){"use strict";function n(t){return t.key=f,t.type="video",h()(t).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])}).join("&")}function o(t,e,o,s){var r=n(e);if(0===r.length)throw new Error("Invalid request arguments");var a=t+(-1===t.indexOf("?")?"?":"&")+r;return i.i(l.a)(a).then(function(t){o(JSON.parse(t))}).catch(function(t){console.log("Caught error",t),s(t)})}function s(t,e,i){return o(v+"search",t,e,i)}function r(t,e,i,n){return s(u()({part:"snippet",q:t,maxResults:10},n),e,i)}function a(t,e,i,n){return s({part:"snippet",maxResults:"number"==typeof e?e:10,relatedToVideoId:t.id.videoId},i,n)}var c=i(64),u=i.n(c),d=i(66),h=i.n(d),l=i(54);e.a=r,e.b=a;var f="AIzaSyAb3ea-42-gpQf0-p9XdHbY30jI4ntqPNI",v="https://www.googleapis.com/youtube/v3/"},57:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(47),o=i(46),s=i.n(o);n.a.config.productionTip=!1,new n.a({el:"#app",template:"<App/>",components:{App:s.a}})},58:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(140),o=i.n(n),s=i(144),r=i.n(s),a=i(145),c=i.n(a),u=(i(55),i(53)),d=o()();e.default={name:"app",data:function(){var t=d.get("q")||"";return{request:null,logMessage:"",searchString:t,showAbout:0===t.length,selectedVideo:null}},created:function(){d.onChange(this.onQueryChange,this),this.startSearch()},computed:{currentGraph:function(){if(this.request)return this.request.graph}},methods:{closeVideo:function(){this.selectedVideo=null},searchFormSubmitHandler:function(){d.set({q:this.searchString}),this.startSearch()},onVideoSelected:function(t){this.selectedVideo=t},onQueryChange:function(){this.searchString=d.get("q"),this.startSearch()},startSearch:function(){var t=d.get("q");t&&(this.request&&this.request.progress.cancel(),this.showAbout=!1,this.request=i.i(u.a)(t))}},components:{GraphView:r.a,VideoPreview:c.a}}},59:function(t,e,i){"use strict";function n(t){if(t&&t.classList.contains("video-thumbnail"))return t.getAttribute("data-id")}function o(t,e,i){c()(t.querySelectorAll(e)).forEach(i)}function s(t){return function(e){return e.classList.add(t)}}function r(t){return function(e){return e.classList.remove(t)}}Object.defineProperty(e,"__esModule",{value:!0});var a=i(62),c=i.n(a),u=i(134),d=i.n(u),h=i(118),l=i.n(h),f=i(52),v=i(50);e.default={name:"GraphView",props:["graph"],data:function(){return{nodes:[],edges:[],tooltip:{visible:!1,text:"",x:0,y:0}}},watch:{graph:function(t,e){e&&this.disposeGraph(),this.initializeGraph(t)}},mounted:function(){var t=this.$refs.scene;this.zoomHandle=d()(t,{bounds:!0});var e=this.$el.getBoundingClientRect();this.zoomHandle.moveTo(e.width/2,e.height/2),this.initEvents(t),this.initializeGraph(this.graph)},methods:{handleMouseEnter:function(t){var e=n(t.target);if(e){this.clearHighligh(),o(this.$refs.scene,'path[data-from="'+e+'"], path[data-to="'+e+'"]',s("hl"));var i=this.graph.getNode(e).data.title,r=this.layout.getNodePosition(e);this.showTooltip(r,i)}},handleMouseClick:function(t){var e=n(t.target);e&&this.$emit("selected",e)},showTooltip:function(t,e){var i=this.tooltip;i.text=e,i.x=t.x,i.y=t.y-21,i.visible=!0},handleMouseLeave:function(){this.clearHighligh(),this.tooltip.visible=!1},clearHighligh:function(){o(this.$refs.scene,".hl",r("hl"))},computeLinkPath:function(t){var e=i.i(f.a)(t),n=e.from,o=e.to,s="M";return s+=Math.round(n.x)+","+Math.round(n.y),s+="L"+Math.round(o.x)+","+Math.round(o.y)},onGraphChanged:function(t){var e=this;this.iterations=0,t.forEach(function(t){if("add"!==t.changeType)throw new Error("Not implemented");t.node&&e.addNode(t.node),t.link&&e.addLink(t.link)}),this.frame()},addNode:function(t){var e=t.id,i=t.data,n=this.layout.getNodePosition(e);this.nodes.push({pos:n,id:e,data:i})},addLink:function(t){var e=t.id,i=t.fromId,n=t.toId,o=this.layout.getLinkPosition(e);this.edges.push({pos:o,fromId:i,toId:n})},disposeGraph:function(){this.graph&&(this.graph.off("changed",this.onGraphChanged,this),this.nodes=[],this.edges=[],this.graph=null),this.layout&&(this.layout.dispose(),this.layout=null),this.layoutLoop&&(cancelAnimationFrame(this.layoutLoop),this.layoutLoop=null)},initEvents:function(t){t.addEventListener("mouseenter",this.handleMouseEnter.bind(this),!0),t.addEventListener("mouseleave",this.handleMouseLeave.bind(this),!0),this.clapDispose=i.i(v.a)(t,this.handleMouseClick.bind(this),!0)},initializeGraph:function(t){var e=this;if(t){this.layout=l()(t,{springLength:80,springCoeff:4e-4,dragCoeff:.05,gravity:-50,theta:.5}),this.nodes=[],this.edges=[];var i=t;i.forEachNode(function(t){e.addNode(t)}),i.forEachLink(function(t){e.addLink(t)}),this.graph.on("changed",this.onGraphChanged,this),this.boundFrame=this.frame.bind(this),this.frame()}},frame:function(){this.layout&&(this.layout.step(),this.iterations+=1,(this.layout.lastMove>20||this.iterations<100)&&(this.layoutLoop=requestAnimationFrame(this.boundFrame)))}},destroyed:function(){this.zoomHandle&&this.zoomHandle.dispose(),this.disposeGraph(),this.clapDispose&&this.clapDispose()}}},60:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(146),o=i.n(n);e.default={name:"VideoPreview",props:["videoId"],mounted:function(){this.videoId&&this.play(this.videoId)},data:function(){return{title:"Video Preview"}},components:{Window:o.a},watch:{videoId:function(t){this.play(t)}},methods:{closeVideo:function(){this.$emit("close")},play:function(t){var e=this;this.player&&(this.player.destroy(),this.player=null),t&&(this.player=new YT.Player("player",{height:"100%",width:"100%",videoId:t,events:{onReady:function(){var t=e.player.getVideoData();e.title=t.title,e.player.playVideo()}}}))}}}},61:function(t,e,i){"use strict";function n(){return[{name:"header",update:function(t,e,i){return{cX:t.cX+e,cY:t.cY+i}}},{name:"right",update:function(t,e){return{cWidth:t.cWidth+e}}},{name:"left",update:function(t,e){return{cX:t.cX+e,cWidth:t.cWidth-e}}},{name:"top",update:function(t,e,i){return{cY:t.cY+i,cHeight:t.cHeight-i}}},{name:"bottom",update:function(t,e,i){return{cHeight:t.cHeight+i}}},{name:"leftBottom",update:function(t,e,i){return{cX:t.cX+e,cWidth:t.cWidth-e,cHeight:t.cHeight+i}}},{name:"rightBottom",update:function(t,e,i){return{cHeight:t.cHeight+i,cWidth:t.cWidth+e}}},{name:"leftTop",update:function(t,e,i){return{cY:t.cY+i,cX:t.cX+e,cHeight:t.cHeight-i,cWidth:t.cWidth-e}}},{name:"rightTop",update:function(t,e,i){return{cY:t.cY+i,cHeight:t.cHeight-i,cWidth:t.cWidth+e}}}]}function o(t,e){var i=window.getComputedStyle(t);e.cX=s(i.left),e.cY=s(i.top),e.cHeight=s(i.height),e.cWidth=s(i.width)}function s(t){return t?a()(t,10):0}Object.defineProperty(e,"__esModule",{value:!0});var r=i(63),a=i.n(r),c=i(51);e.default={name:"Window",props:["title","width","height","x","y","noDrag"],data:function(){return{moved:!1,cWidth:this.width||420,cHeight:this.height||290,cX:this.x||0,cY:this.y||0}},mounted:function(){var t=this;o(this.$el,this);var e=n().map(function(e){return i.i(c.a)(t.$refs[e.name],function(i,n){var o=e.update(t,i,n);void 0!==o.cX&&o.cX>=0&&(t.cX=o.cX),void 0!==o.cY&&o.cY>=0&&(t.cY=o.cY),void 0!==o.cWidth&&o.cWidth>=300&&(t.cWidth=o.cWidth),void 0!==o.cHeight&&o.cHeight>=240&&(t.cHeight=o.cHeight),t.moved=!0})});this.drags=e},destroyed:function(){this.drags&&this.drags.forEach(function(t){return t.dispose()})},methods:{getStyle:function(){if(this.moved)return{left:this.cX+"px",top:this.cY+"px",width:this.cWidth+"px",height:this.cHeight+"px"}},requestClose:function(){this.$emit("close",this)}}}}},[57]);
//# sourceMappingURL=app.f21ad1593549894ab297.js.map